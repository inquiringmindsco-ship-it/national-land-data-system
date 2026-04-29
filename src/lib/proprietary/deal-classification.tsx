import type { Listing } from '../types';
import { computeOpportunityScore } from './parcel-intelligence';

function fmtCentsLocal(c: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(c / 100);
}

export type DealType = 'FAST OPPORTUNITY' | 'LONG-TERM HOLD' | 'HIGH RISK' | 'DEVELOPMENT PLAY';

export interface UrgencyFlag {
  type: 'auction' | 'competition' | 'price_change' | 'restriction' | 'market';
  severity: 'low' | 'medium' | 'high';
  message: string;
}

export interface DealClassification {
  dealType: DealType;
  confidence: number;
  investorFit: string[];
  urgencyFlags: UrgencyFlag[];
  rationale: string;
}

export const DEAL_TYPE_CONFIG: Record<DealType, { emoji: string; color: string; description: string }> = {
  'FAST OPPORTUNITY': { emoji: 'FLASH', color: 'text-emerald-400', description: 'Close quickly, lower entry cost, faster path to ownership' },
  'LONG-TERM HOLD': { emoji: 'HOME', color: 'text-blue-400', description: 'Buy and hold for rental income, appreciation, or future development' },
  'HIGH RISK': { emoji: 'WARNING', color: 'text-red-400', description: 'Significant discount but major unknowns — verify thoroughly' },
  'DEVELOPMENT PLAY': { emoji: 'BUILD', color: 'text-purple-400', description: 'Multi-unit, commercial, or land development opportunity' },
};

function detectDealType(listing: Listing, score: ReturnType<typeof computeOpportunityScore>): DealType {
  const price = listing.price ?? listing.startingBid ?? 0;
  const hasAuction = !!listing.auctionDate;
  const zip = listing.zipCode ?? '';
  const rawText = JSON.stringify(listing.rawData ?? {}).toLowerCase();
  const label = (listing.originalLabel ?? "").toLowerCase();

  const highValueZips = ['63101', '63102', '63103', '63104', '63108', '63110', '63112', '63118'];
  const largeParcelSignals = ['lot', 'parcel', 'acre', 'land', 'structure', 'sqft'];
  const isLargeParcel = largeParcelSignals.some(s => rawText.includes(s)) && (price > 5_000_00 || highValueZips.includes(zip));

  if (highValueZips.includes(zip) && isLargeParcel && price > 5_000_00) return 'DEVELOPMENT PLAY';
  if (score.total < 40 || price === 0) return 'HIGH RISK';
  if (hasAuction && price < 1_000_000 && score.total > 65) return 'FAST OPPORTUNITY';
  if ((label.includes('lra') || label.includes('land bank')) && price < 2_000_00 && score.total > 55) return 'FAST OPPORTUNITY';
  if (price >= 5_000_00 && score.total >= 45 && !hasAuction) return 'LONG-TERM HOLD';
  if (score.total < 55) return 'HIGH RISK';
  return hasAuction ? 'FAST OPPORTUNITY' : 'LONG-TERM HOLD';
}

function detectUrgencyFlags(listing: Listing, hasAuction: boolean, score: ReturnType<typeof computeOpportunityScore>, price: number): UrgencyFlag[] {
  const flags: UrgencyFlag[] = [];
  if (hasAuction && listing.auctionDate) {
    const daysToAuction = Math.ceil((listing.auctionDate ? new Date(listing.auctionDate).getTime() : Date.now() - Date.now()) / (1000 * 60 * 60 * 24));
    if (daysToAuction <= 7) flags.push({ type: 'auction', severity: 'high', message: `Auction in ${daysToAuction} day${daysToAuction === 1 ? '' : 's'} — must act immediately` });
    else if (daysToAuction <= 30) flags.push({ type: 'auction', severity: 'medium', message: `Auction ${listing.auctionDate} — ${daysToAuction} days to research` });
  }
  if (score.total >= 80) flags.push({ type: 'competition', severity: 'high', message: 'Exceptional score — expect heavy bidding' });
  if (price > 0 && price < 500_00) flags.push({ type: 'price_change', severity: 'low', message: 'Very low price — verify total cost (fees may exceed listed price)' });
  const rawText = JSON.stringify(listing.rawData ?? {}).toLowerCase();
  if (rawText.includes('tenant') || rawText.includes('occupied') || rawText.includes('renter')) {
    flags.push({ type: 'restriction', severity: 'high', message: 'Property may be tenant-occupied — St. Louis tenant protections are strong' });
  }
  return flags;
}

export function classifyDeal(listing: Listing): DealClassification {
  const score = computeOpportunityScore(listing);
  const price = listing.price ?? listing.startingBid ?? 0;
  const hasAuction = !!listing.auctionDate;
  const dealType = detectDealType(listing, score);
  const urgencyFlags = detectUrgencyFlags(listing, hasAuction, score, price);

  let confidence = 60;
  if (listing.price) confidence += 15;
  if (listing.zipCode) confidence += 10;
  if (listing.auctionDate) confidence += 10;
  if (listing.rawData && Object.keys(listing.rawData).length > 3) confidence += 10;
  confidence = Math.min(99, confidence);

  const priceLabel = price > 0 ? `Entry: ${fmtCentsLocal(price)}` : 'Entry: TBD';
  const investorFit: string[] = (() => {
    switch (dealType) {
      case 'FAST OPPORTUNITY': return [`Wholesalers, house hackers, cash buyers`, `Ideal: ${priceLabel} | Score: ${score.total}/100`];
      case 'LONG-TERM HOLD': return [`Landlords, BRRRR investors, homeschool families`, `Entry: ${priceLabel} | Score: ${score.total}/100`];
      case 'HIGH RISK': return [`Experienced investors with construction/legal resources`, `Score: ${score.total}/100 — VERIFY BEFORE BIDDING`];
      case 'DEVELOPMENT PLAY': return [`Multi-family developers, CDOs, nonprofits`, `Entry: ${priceLabel} | Score: ${score.total}/100`];
    }
  })();

  const auctionStr = listing.auctionDate ? `, auction ${listing.auctionDate}` : '';
  let rationale = '';
  switch (dealType) {
    case 'FAST OPPORTUNITY': rationale = `${score.why} Listed at ${price > 0 ? fmtCentsLocal(price) : 'TBD'}${auctionStr}. LRA/tax sale can close in 30-60 days with minimal contingency.`; break;
    case 'LONG-TERM HOLD': rationale = `Score ${score.total}/100. ${score.why} Best for 12-36 month horizon. Hold for appreciation or rental income.`; break;
    case 'HIGH RISK': rationale = `Score ${score.total}/100. Significant unknowns. Expert investors only.`; break;
    case 'DEVELOPMENT PLAY': rationale = `Located in zip with redevelopment momentum. Listed at ${price > 0 ? fmtCentsLocal(price) : 'TBD'}. Verify zoning.`; break;
  }

  return { dealType, confidence, investorFit, urgencyFlags, rationale };
}
