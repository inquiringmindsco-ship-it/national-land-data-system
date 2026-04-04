import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not configured');
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2026-02-25.clover',
  });
}

const DATA_PACK_PRICE_CENTS = 29_00; // $29 per pack

export async function POST(request: NextRequest) {
  try {
    const { listingId, listingAddress, listingSource } = await request.json();

    if (!listingId) {
      return NextResponse.json({ error: 'Missing listingId' }, { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://national-land-data-system.vercel.app';

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: DATA_PACK_PRICE_CENTS,
            product_data: {
              name: 'Property Data Pack',
              description: `Complete acquisition guide for: ${listingAddress || listingId}. Includes owner info, minimum bid, step-by-step procedure, required forms, and county contact.`,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        listingId,
        listingAddress: listingAddress || '',
        listingSource: listingSource || '',
        packType: 'single_property',
      },
      success_url: `${baseUrl}/data-pack/${listingId}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/deals?cancelled=true`,
      payment_intent_data: {
        metadata: {
          listingId,
          packType: 'single_property',
        },
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[create-data-pack-checkout]', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
