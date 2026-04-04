import { NextRequest, NextResponse } from 'next/server';
import { STLOUIS_LISTINGS } from '@/data/stlouis-listings';
import { TAX_SALE_LISTINGS } from '@/data/tax-sale-listings';
import { STLOUIS_COUNTY_POST3_LISTINGS } from '@/data/stlouis-county-post3';
import { computeOpportunityScore } from '@/lib/proprietary/parcel-intelligence';

// GET /api/top-deals — top 5 scored deals for St. Louis
// Protected: requires Bearer auth matching DASHBOARD_SECRET or CRON_SECRET
export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization') ?? '';
  const token = auth.replace('Bearer ', '').trim();
  const secret = process.env.DASHBOARD_SECRET ?? process.env.CRON_SECRET;

  if (!secret || token !== secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const ALL_LISTINGS = [...STLOUIS_LISTINGS, ...TAX_SALE_LISTINGS, ...STLOUIS_COUNTY_POST3_LISTINGS];
    const scored = ALL_LISTINGS.map(l => ({
      listing: l,
      score: computeOpportunityScore(l, ALL_LISTINGS, 'investor'),
    }));

    scored.sort((a, b) => b.score.total - a.score.total);

    const top5 = scored.slice(0, 5);
    const now = new Date();
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay());
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    const fmtCents = (c: number) =>
      new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(c / 100);

    const deals = top5.map(({ listing, score }, i) => ({
      rank: i + 1,
      address: listing.address,
      city: `${listing.city}, ${listing.state} ${listing.zipCode}`,
      price: listing.price ? fmtCents(listing.price) : listing.startingBid ? `From ${fmtCents(listing.startingBid)}` : 'TBD',
      priceCents: listing.price ?? listing.startingBid ?? 0,
      score: score.total,
      grade: score.grade,
      headline: score.insight.headline,
      angle: score.insight.angle,
      source: listing.sourceName,
    }));

    return NextResponse.json({
      generatedAt: now.toISOString(),
      weekStart: weekStart.toISOString().split('T')[0],
      weekEnd: weekEnd.toISOString().split('T')[0],
      city: 'st-louis',
      totalListings: ALL_LISTINGS.length,
      deals,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[top-deals]', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
