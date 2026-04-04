import { NextResponse } from 'next/server';
import { loadDealDrop, runDealDropCycle, saveDealDrop } from '@/lib/proprietary/deal-drop';

export async function GET() {
  try {
    let drop = await loadDealDrop();
    if (!drop) {
      drop = runDealDropCycle(
        // Dynamic import to avoid SSR issues
        (await import('@/data/stlouis-listings')).STLOUIS_LISTINGS
      );
      await saveDealDrop(drop);
    }
    return NextResponse.json({ drop, source: 'cache' });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[api/deal-drop]', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
