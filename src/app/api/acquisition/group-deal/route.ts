import { NextRequest, NextResponse } from 'next/server';
import { STLOUIS_LISTINGS } from '@/data/stlouis-listings';
import { computeOpportunityScore } from '@/lib/proprietary/parcel-intelligence';
import { classifyDeal } from '@/lib/proprietary/deal-classification';

// GET /api/acquisition/group-deal?id=xxx — get group deal for a listing
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const listingId = searchParams.get('listing_id') ?? searchParams.get('id');

  if (!listingId) {
    return NextResponse.json({ error: 'listing_id required' }, { status: 400 });
  }

  const listing = STLOUIS_LISTINGS.find(l => l.id === listingId);

  if (!listing) {
    return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
  }

  const score = computeOpportunityScore(listing, STLOUIS_LISTINGS, 'investor');
  const deal = classifyDeal(listing);
  const dealEmoji = deal.dealType === 'FAST OPPORTUNITY' ? '⚡'
    : deal.dealType === 'LONG-TERM HOLD' ? '📈'
    : deal.dealType === 'DEVELOPMENT PLAY' ? '🏗️'
    : '⚠️';

  // Price in cents
  const price = listing.price ?? 0;
  const acquisitionFee = Math.round(price * 0.25);
  const totalCost = price + acquisitionFee;
  const maxParticipants = totalCost < 150_00 ? 5 : totalCost < 400_00 ? 7 : 10;
  const costPerPerson = Math.ceil(totalCost / maxParticipants);

  const fmt = (c: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(c / 100);

  const eligibleForGroup = score.total >= 65 && totalCost <= 1_500_00;

  return NextResponse.json({
    eligible: eligibleForGroup,
    status: eligibleForGroup ? 'forming' : 'cancelled',
    listingId: listing.id,
    listingAddress: listing.address,
    city: listing.city,
    zipCode: listing.zipCode ?? '',
    price,
    priceDisplay: price > 0 ? fmt(price) : 'TBD',
    acquisitionFeeDisplay: fmt(acquisitionFee),
    totalCost,
    totalCostDisplay: fmt(totalCost),
    maxParticipants,
    minParticipants: Math.max(3, Math.ceil(maxParticipants / 2)),
    currentParticipants: 0,
    costPerPerson,
    costPerPersonDisplay: fmt(costPerPerson),
    score,
    dealEmoji,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    summary: `Pool resources with up to ${maxParticipants} other investors. Total cost: ${fmt(totalCost)}. You contribute ${fmt(costPerPerson)} to own 1/${maxParticipants} of this asset.`,
    headline: `${dealEmoji} Group Deal: ${listing.address} — ${fmt(costPerPerson)}/person`,
    why: [
      `Score ${score}/100 — strong opportunity`,
      price > 0 ? `Listing price: ${fmt(price)}` : 'Price TBD — likely below market',
      `+${fmt(acquisitionFee)} acquisition overhead (fees, closing, holding)`,
      `Split ${maxParticipants} ways — only ${fmt(costPerPerson)} to get in`,
    ],
    howItWorks: [
      { step: 1, label: 'Join the pool', desc: 'Submit your interest below. No payment yet.' },
      { step: 2, label: 'Due diligence', desc: 'We verify title, liens, zoning, and condition.' },
      { step: 3, label: 'Collect contributions', desc: `Each of the ${maxParticipants} participants pays ${fmt(costPerPerson)}.` },
      { step: 4, label: 'Acquire the property', desc: 'We handle county filing, deed transfer, and recording.' },
      { step: 5, label: 'Co-ownership agreement', desc: `Each investor owns 1/${maxParticipants} fraction.` },
    ],
    risks: [
      'Property may have undisclosed liens or encumbrances',
      'Deal falls through if minimum participants not reached',
      'Liquidity is limited — no immediate resale market',
      'Holding costs (taxes, maintenance) accrue to all owners',
    ],
  });
}
