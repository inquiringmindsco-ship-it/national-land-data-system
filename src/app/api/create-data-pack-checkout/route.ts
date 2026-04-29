import { NextRequest, NextResponse } from 'next/server';

const STRIPE_KEY = process.env.STRIPE_SECRET_KEY ?? '';
const BASE64_KEY = Buffer.from(STRIPE_KEY + ':').toString('base64');
const BASE_URL = (process.env.NEXT_PUBLIC_BASE_URL ?? 'https://national-land-data-system-delta.vercel.app').trim();

const DATA_PACK_PRICE_CENTS = 29_00;

async function stripePost(path: string, body: Record<string, string>) {
  const res = await fetch(`https://api.stripe.com/v1${path}`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${BASE64_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(body).toString(),
    signal: AbortSignal.timeout(10000),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message ?? 'Stripe error');
  return data;
}

export async function POST(request: NextRequest) {
  try {
    const { listingId, listingAddress, listingSource } = await request.json();
    if (!listingId) {
      return NextResponse.json({ error: 'Missing listingId' }, { status: 400 });
    }

    const session = await stripePost('/checkout/sessions', {
      'mode': 'payment',
      'line_items[0][price_data][currency]': 'usd',
      'line_items[0][price_data][unit_amount]': String(DATA_PACK_PRICE_CENTS),
      'line_items[0][price_data][product_data][name]': 'Property Data Pack',
      'line_items[0][price_data][product_data][description]': `Complete acquisition guide for: ${listingAddress || listingId}. Includes owner info, minimum bid, step-by-step procedure, required forms, and county contact.`,
      'line_items[0][quantity]': '1',
      'metadata[listingId]': listingId,
      'metadata[listingAddress]': listingAddress || '',
      'metadata[listingSource]': listingSource || '',
      'metadata[packType]': 'single_property',
      'success_url': `${BASE_URL}/data-pack/${listingId}?session_id={CHECKOUT_SESSION_ID}`,
      'cancel_url': `${BASE_URL}/deals?cancelled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[create-data-pack-checkout]', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
