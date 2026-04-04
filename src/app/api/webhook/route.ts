import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const ACCESS_HOURS: Record<string, number> = {
  supporter: 48,
  standard: 72,
  patron: 168,
  founder: 720,
  flexible: 72,
};

interface CheckoutSession {
  id: string;
  customer: string;
  customer_email: string | null;
  payment_intent: string | null;
  amount_total: number | null;
  metadata: Record<string, string>;
}

async function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function POST(req: NextRequest) {
  const sig = req.headers.get('stripe-signature');
  const body = await req.text();
  const secret = process.env.STRIPE_WEBHOOK_SECRET ?? '';

  if (!sig || !secret) {
    console.error('[webhook] Missing signature or secret');
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 });
  }

  let event: Stripe.Event;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
    apiVersion: '2025-01-27.acacia',
  });

  try {
    event = stripe.webhooks.constructEvent(body, sig, secret);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    console.error('[webhook] Signature verification failed:', msg);
    return NextResponse.json({ error: `Webhook error: ${msg}` }, { status: 400 });
  }

  console.log(`[webhook] Received event: ${event.type} (id=${event.id})`);

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as CheckoutSession;
    await handlePurchase(session);
  }

  return NextResponse.json({ received: true, id: event.id });
}

async function handlePurchase(session: CheckoutSession) {
  const supabase = await getSupabase();
  const sessionId = session.id;
  const email = session.customer_email ?? '';
  const customerId = session.customer ?? '';
  const priceCents = session.amount_total ?? 0;
  const tier = (session.metadata?.tier ?? 'standard') as string;
  const city = (session.metadata?.city ?? 'st-louis') as string;
  const hours = ACCESS_HOURS[tier] ?? 72;
  const paymentIntentId = session.payment_intent ?? '';
  const buyerName = session.metadata?.buyer_name ?? '';

  console.log(`[webhook] Processing purchase: email=${email}, tier=${tier}, session=${sessionId}`);

  // ── Idempotency: skip if this session_id was already processed ──────────────
  if (supabase) {
    const { data: existing } = await supabase
      .from('nlds_unlocks')
      .select('id')
      .eq('stripe_session_id', sessionId)
      .maybeSingle();

    if (existing) {
      console.log(`[webhook] Session ${sessionId} already processed — skipping (idempotent)`);
      return;
    }
  }

  // ── Get or create user ────────────────────────────────────────────────────
  let userId: string | null = null;

  if (supabase) {
    const { data: existing } = await supabase
      .from('nlds_users')
      .select('id, total_paid_cents, unlock_count')
      .eq('email', email.toLowerCase().trim())
      .maybeSingle() as { data: { id: string; total_paid_cents: number; unlock_count: number } | null };

    if (existing) {
      userId = existing.id;
      await supabase.from('nlds_users').update({
        total_paid_cents: (existing.total_paid_cents ?? 0) + priceCents,
        unlock_count: (existing.unlock_count ?? 0) + 1,
        last_access_at: new Date().toISOString(),
        stripe_customer_id: customerId || undefined,
        name: buyerName || undefined,
      }).eq('id', userId);
      console.log(`[webhook] Updated existing user ${userId}, total_paid=${(existing.total_paid_cents ?? 0) + priceCents}`);
    } else {
      const { data: newUser } = await supabase.from('nlds_users').insert({
        email: email.toLowerCase().trim(),
        stripe_customer_id: customerId || undefined,
        name: buyerName || undefined,
        total_paid_cents: priceCents,
        unlock_count: 1,
        last_access_at: new Date().toISOString(),
      }).select('id').single() as { data: { id: string } | null };
      userId = newUser?.id ?? null;
      if (userId) console.log(`[webhook] Created new user ${userId}`);
    }
  } else {
    console.warn('[webhook] Supabase not configured — skipping DB writes');
  }

  // ── Record unlock ──────────────────────────────────────────────────────────
  const expiresAt = new Date(Date.now() + hours * 60 * 60 * 1000).toISOString();

  if (supabase && userId) {
    const { data: unlock } = await supabase.from('nlds_unlocks').insert({
      user_id: userId,
      tier,
      price_cents: priceCents,
      stripe_session_id: sessionId,
      stripe_payment_intent_id: paymentIntentId,
      access_hours: hours,
      expires_at: expiresAt,
      city,
    }).select('id, expires_at, tier').single() as {
      data: { id: string; expires_at: string; tier: string } | null
    };

    // ── Update active access ────────────────────────────────────────────────
    if (unlock) {
      await supabase.from('nlds_active_access').upsert(
        {
          user_id: userId,
          unlock_id: unlock.id,
          tier: unlock.tier,
          expires_at: unlock.expires_at,
          last_refreshed_at: new Date().toISOString(),
        },
        { onConflict: 'user_id' }
      );
    }

    // ── Record event for analytics ──────────────────────────────────────────
    await supabase.from('nlds_events').insert({
      user_id: userId,
      event_type: 'unlock_purchase',
      event_data: { tier, city, price_cents: priceCents, session_id: sessionId },
    });

    // ── Send welcome email ──────────────────────────────────────────────────
    if (email) {
      sendWelcomeEmail(email, tier, hours, city).catch(err =>
        console.error('[webhook] Welcome email failed:', err)
      );
    }

    console.log(`[webhook] ✅ Unlock complete for ${email}, tier=${tier}, expires=${expiresAt}`);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// EMAIL SENDING
// ─────────────────────────────────────────────────────────────────────────────

async function sendWelcomeEmail(email: string, tier: string, hours: number, city: string) {
  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    console.warn('[email] RESEND_API_KEY not set — skipping welcome email');
    return;
  }

  const fromAddress = process.env.EMAIL_FROM ?? 'NLDS <noreply@nlds.com>';
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://national-land-data-system.vercel.app';

  const tierLabel = tier.charAt(0).toUpperCase() + tier.slice(1);
  const cityLabel = city === 'st-louis' ? 'St. Louis, MO' : city;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #000; color: #fff; margin: 0; padding: 0; }
    .container { max-width: 560px; margin: 0 auto; padding: 40px 20px; }
    .header { text-align: center; margin-bottom: 32px; }
    .logo { font-size: 20px; font-weight: 900; color: #10b981; letter-spacing: -0.5px; }
    .logo span { color: #fff; }
    h1 { font-size: 28px; font-weight: 900; margin: 0 0 12px; color: #fff; }
    p { color: #9ca3af; line-height: 1.7; font-size: 15px; margin: 0 0 16px; }
    .card { background: #0f0f0f; border: 1px solid #1f2937; border-radius: 12px; padding: 24px; margin: 24px 0; }
    .card-title { font-size: 13px; font-weight: 700; color: #10b981; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px; }
    .feature { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; font-size: 14px; color: #d1d5db; }
    .feature-icon { color: #10b981; font-size: 16px; }
    .cta { display: inline-block; background: #10b981; color: #000; font-weight: 700; font-size: 15px; padding: 14px 28px; border-radius: 8px; text-decoration: none; margin: 8px 0; }
    .cta-block { text-align: center; margin: 32px 0; }
    .footer { text-align: center; color: #4b5563; font-size: 12px; margin-top: 40px; border-top: 1px solid #1f2937; padding-top: 24px; }
    .tier-badge { display: inline-block; background: #064e3b; color: #10b981; font-size: 12px; font-weight: 700; padding: 4px 12px; border-radius: 999px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">NLDS<span>™</span></div>
    </div>

    <h1>Access Unlocked</h1>
    <p>You now have <strong style="color:#fff">${hours}-hour ${tierLabel} access</strong> to the National Land Data System for <strong style="color:#fff">${cityLabel}</strong>.</p>

    <div class="card">
      <div class="card-title">What&apos;s included</div>
      <div class="feature"><span class="feature-icon">✓</span> All property listings in the deal set</div>
      <div class="feature"><span class="feature-icon">✓</span> Full Parcel Intelligence scores on every deal</div>
      <div class="feature"><span class="feature-icon">✓</span> Government Data Translator™ — plain-English explanations</div>
      <div class="feature"><span class="feature-icon">✓</span> Acquisition Pathway™ — step-by-step next steps</div>
      <div class="feature"><span class="feature-icon">✓</span> Deal Classification™ — opportunity type + urgency flags</div>
      <div class="feature"><span class="feature-icon">✓</span> Weekly Top Deals email digest</div>
    </div>

    <div class="cta-block">
      <a href="${baseUrl}/deals" class="cta">Browse All Deals →</a>
    </div>

    <p style="color:#6b7280; font-size:13px;">
      Your access expires in ${hours} hours from purchase. If you need more time, come back and unlock again — no subscription, ever.
    </p>

    <div class="footer">
      National Land Data System™ — A Porterful Labs Product<br>
      Land intelligence for serious buyers and builders.
    </div>
  </div>
</body>
</html>
`;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromAddress,
      to: email,
      subject: `✅ Access unlocked — ${cityLabel} land deals`,
      html,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Resend error: ${response.status} ${err}`);
  }

  const data = await response.json() as { id: string };
  console.log(`[email] Welcome email sent: ${data.id}`);
}
