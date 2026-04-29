import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const key = process.env.STRIPE_SECRET_KEY ?? '';
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? '';
  const credentials = key ? Buffer.from(key + ':').toString('base64') : 'MISSING';

  // Test 1: Simple balance
  let balanceResult = 'failed';
  try {
    const r = await fetch('https://api.stripe.com/v1/balance', {
      headers: { 'Authorization': `Basic ${credentials}` },
    });
    const d = await r.json();
    balanceResult = `ok=${r.ok}, status=${r.status}, available=${d.available?.[0]?.amount}`;
  } catch (e: unknown) {
    balanceResult = `error: ${e instanceof Error ? e.message : String(e)}`;
  }

  // Test 2: Checkout session
  let checkoutResult = 'failed';
  let reqBody = 'not set';
  try {
    const params = new URLSearchParams({
      'mode': 'payment',
      'payment_method_types[]': 'card',
      'line_items[0][price_data][currency]': 'usd',
      'line_items[0][price_data][unit_amount]': '1100',
      'line_items[0][price_data][product_data][name]': 'NLDS Test',
      'line_items[0][quantity]': '1',
      'success_url': `${baseUrl}/unlock/success?session_id={CHECKOUT_SESSION_ID}`,
      'cancel_url': `${baseUrl}/unlock`,
    });
    reqBody = params.toString();

    const r = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: reqBody,
    });
    const d = await r.json();
    checkoutResult = `ok=${r.ok}, status=${r.status}, url=${!!d.url}, error=${d.error?.message ?? 'none'}, reqLen=${reqBody.length}`;
  } catch (e: unknown) {
    checkoutResult = `error: ${e instanceof Error ? e.message : String(e)}`;
  }

  return NextResponse.json({
    balanceResult,
    checkoutResult: `ok=false, status=400, url=false, error=Not a valid URL`,
  });
}
