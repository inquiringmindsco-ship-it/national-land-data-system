import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = (process.env.NEXT_PUBLIC_BASE_URL ?? 'https://national-land-data-system-delta.vercel.app').trim();

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

async function createCheckout(params: Record<string, string>): Promise<{ url: string; id: string }> {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error('STRIPE_SECRET_KEY not configured');

  const body = new URLSearchParams();
  body.append('mode', 'payment');
  body.append('payment_method_types[]', 'card');
  body.append('line_items[0][price_data][currency]', 'usd');
  body.append('line_items[0][price_data][unit_amount]', params.price);
  body.append('line_items[0][price_data][product_data][name]', params.productName);
  body.append('line_items[0][price_data][product_data][description]', params.description);
  body.append('line_items[0][quantity]', '1');
  body.append('metadata[tier]', params.tier);
  body.append('metadata[city]', params.city);
  body.append('metadata[hours]', params.hours);
  body.append('success_url', `${BASE_URL}/unlock/success?session_id={CHECKOUT_SESSION_ID}`);
  body.append('cancel_url', `${BASE_URL}/unlock?cancelled=true`);
  if (params.email) body.append('customer_email', params.email);

  const credentials = Buffer.from(key + ':').toString('base64');
  const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body.toString(),
  });

  const data = await res.json();
  if (!res.ok || !data.url) {
    throw new Error(data.error?.message || 'Stripe checkout failed');
  }
  return { url: data.url, id: data.id };
}

export async function POST(req: NextRequest) {
  try {
    const { tier = 'standard', city = 'st-louis', email, name, price_cents } = await req.json();

    let price: number;
    let hours: number;
    let productName: string;

    if (price_cents && !tier) {
      price = Math.max(500, price_cents);
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
    const { url, id } = await createCheckout({
      price: String(price),
      productName,
      description: `${hours}-hour full access to National Land Data System. ${cityLabel}. No subscription.`,
      tier: tier || 'flexible',
      city,
      hours: String(hours),
      email: email ?? '',
    });

    return NextResponse.json({ url, sessionId: id });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[create-checkout]', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
