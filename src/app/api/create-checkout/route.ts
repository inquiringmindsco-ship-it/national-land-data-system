import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY ?? 'sk_test_placeholder', {
    apiVersion: '2025-01-27.acacia',
  });
}

const TIER_PRICES: Record<string, number> = {
  supporter: 500,
  standard: 1100,
  patron: 2500,
  founder: 10000,
};

const TIER_HOURS: Record<string, number> = {
  supporter: 48,
  standard: 72,
  patron: 168,
  founder: 720,
};

const CITY_LABELS: Record<string, string> = {
  'st-louis': 'St. Louis, MO',
  'new-orleans': 'New Orleans, LA',
  'houston': 'Houston, TX',
  'atlanta': 'Atlanta, GA',
  'detroit': 'Detroit, MI',
};

export async function POST(req: NextRequest) {
  try {
    const { tier = 'standard', city = 'st-louis', email, name, price_cents } = await req.json();

    let price: number;
    let hours: number;
    let productName: string;

    if (price_cents && !tier) {
      // Flexible amount: custom price
      price = Math.max(500, price_cents); // min $5
      hours = 72;
      productName = 'NLDS Unlock — Flexible Amount';
    } else {
      if (!TIER_PRICES[tier]) {
        return NextResponse.json({ error: 'Invalid tier' }, { status: 400 });
      }
      price = TIER_PRICES[tier];
      hours = TIER_HOURS[tier];
      productName = `NLDS Unlock — ${tier.charAt(0).toUpperCase() + tier.slice(1)}`;
    }

    const cityLabel = CITY_LABELS[city] ?? city;

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: email ?? undefined,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: price,
            product_data: {
              name: productName,
              description: `${hours}-hour full access to National Land Data System. ${cityLabel}. No subscription.`,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        tier: tier || 'flexible',
        city,
        hours: String(hours),
        ...(name ? { buyer_name: name } : {}),
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'}/unlock/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'}/unlock?cancelled=true`,
    });

    return NextResponse.json({ url: session.url, sessionId: session.id });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[create-checkout]', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
