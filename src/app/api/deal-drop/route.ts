import { NextResponse } from 'next/server';
import { runDealDropCycle, saveDealDrop } from '@/lib/proprietary/deal-drop';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Always generate fresh — Vercel serverless can't persist public/ writes
    const drop = runDealDropCycle(
      (await import('@/data/stlouis-listings')).STLOUIS_LISTINGS
    );
    await saveDealDrop(drop);
    return NextResponse.json(
      { drop, source: 'fresh' },
      {
        headers: {
          'cache-control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'pragma': 'no-cache',
        },
      }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[api/deal-drop]', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
