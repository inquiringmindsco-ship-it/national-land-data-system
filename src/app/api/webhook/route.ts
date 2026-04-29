import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createHmac, timingSafeEqual } from 'crypto';

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

interface StripeEvent {
  id: string;
  type: string;
  data: { object: CheckoutSession };
}

async function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

function verifyStripeSignature(body: string, sig: string, secret: string): StripeEvent {
  const parts = Object.fromEntries(sig.split(',').map(p => p.split('=')));
  const timestamp = parts['t'];
  const v1 = parts['v1'];

  if (!timestamp || !v1) {
    throw new Error('Invalid signature format');
  }

  const payload = `${timestamp}.${body}`;
  const expected = createHmac('sha256', secret)
    .update(payload, 'utf8')
    .digest('hex');

  const sigBuffer = Buffer.from(v1, 'hex');
  const expectedBuffer = Buffer.from(expected, 'hex');

  if (sigBuffer.length !== expectedBuffer.length || !timingSafeEqual(sigBuffer, expectedBuffer)) {
    throw new Error('Signature mismatch');
  }

  return JSON.parse(body) as StripeEvent;
}

export async function POST(req: NextRequest) {
  const sig = req.headers.get('stripe-signature');
  const body = await req.text();
  const secret = process.env.STRIPE_WEBHOOK_SECRET ?? '';

  if (!sig || !secret) {
    console.error('[webhook] Missing signature or secret');
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 });
  }

  let event: StripeEvent;
  try {
    event = verifyStripeSignature(body, sig, secret);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    console.error('[webhook] Signature verification failed:', msg);
    return NextResponse.json({ error: `Webhook error: ${msg}` }, { status: 400 });
  }

  console.log(`[webhook] Received event: ${event.type} (id=${event.id})`);

  if (event.type === 'checkout.session.completed') {
    await handlePurchase(event.data.object);
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

    await supabase.from('nlds_events').insert({
      user_id: userId,
      event_type: 'unlock_purchase',
      event_data: { tier, city, price_cents: priceCents, session_id: sessionId },
    });

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

  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#000;color:#fff;margin:0;padding:0;"><div style="max-width:560px;margin:0 auto;padding:40px 20px;text-align:center;"><div style="font-size:20px;font-weight:900;color:#10b981;letter-spacing:-0.5px;">NLDS<span style="color:#fff;">™</span></div><h1 style="font-size:28px;font-weight:900;margin:24px 0 12px;">Access Unlocked</h1><p style="color:#9ca3af;line-height:1.7;font-size:15px;">You now have <strong style="color:#fff">${hours}-hour ${tierLabel} access</strong> to the National Land Data System for <strong style="color:#fff">${cityLabel}</strong>.</p><div style="background:#0f0f0f;border:1px solid #1f2937;border-radius:12px;padding:24px;margin:24px 0;text-align:left;"><div style="font-size:13px;font-weight:700;color:#10b981;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;">What's included</div><div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;font-size:14px;color:#d1d5db;"><span style="color:#10b981;">✓</span> All property listings in the deal set</div><div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;font-size:14px;color:#d1d5db;"><span style="color:#10b981;">✓</span> Full Parcel Intelligence scores on every deal</div><div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;font-size:14px;color:#d1d5db;"><span style="color:#10b981;">✓</span> Government Data Translator™ — plain-English explanations</div><div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;font-size:14px;color:#d1d5db;"><span style="color:#10b981;">✓</span> Acquisition Pathway™ — step-by-step next steps</div><div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;font-size:14px;color:#d1d5db;"><span style="color:#10b981;">✓</span> Deal Classification™ — opportunity type + urgency flags</div></div><a href="${baseUrl}/deals" style="display:inline-block;background:#10b981;color:#000;font-weight:700;font-size:15px;padding:14px 28px;border-radius:8px;text-decoration:none;margin:8px 0;">Browse All Deals →</a><p style="color:#6b7280;font-size:13px;margin-top:24px;">Your access expires in ${hours} hours from purchase. No subscription, ever.</p><div style="text-align:center;color:#4b5563;font-size:12px;margin-top:40px;border-top:1px solid #1f2937;padding-top:24px;">National Land Data System™ — A Porterful Labs Product</div></div></body></html>`;

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
