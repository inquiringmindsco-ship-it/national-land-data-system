// ============================================================
// LAND MATCH ENGINE™ — Find Land Out of Thin Air
// Takes user criteria, scores listings, returns ranked matches
// ============================================================

import { Listing } from './types';

// ──────────────────────────────────────────────────────────────
// USER CRITERIA TYPES
// ──────────────────────────────────────────────────────────────

export interface LandCriteria {
  state: string;
  counties?: string[];
  minAcres?: number;
  maxAcres?: number;
  maxPrice?: number;
  maxPricePerAcre?: number;
  waterAccess?: 'required' | 'preferred' | 'any';
  roadAccess?: 'required' | 'preferred' | 'any';
  zoning?: 'unrestricted' | 'agricultural' | 'residential' | 'any';
  useCase?: 'homestead' | 'farm' | 'hunting' | 'investment' | 'shelter';
  veteranPreference?: boolean;
  ownerFinancing?: 'required' | 'preferred' | 'any';
  maxDistanceToTown?: number; // miles
  hasUtilities?: 'required' | 'preferred' | 'any';
  terrain?: 'flat' | 'hilly' | 'wooded' | 'cleared' | 'any';
  floodZone?: 'avoid' | 'ok' | 'any';
}

// ──────────────────────────────────────────────────────────────
// MATCH RESULT
// ──────────────────────────────────────────────────────────────

export interface LandMatch {
  listing: Listing;
  matchScore: number; // 0-100
  matchBreakdown: {
    priceScore: number;
    sizeScore: number;
    locationScore: number;
    accessScore: number;
    veteranScore: number;
    financingScore: number;
    useCaseScore: number;
  };
  whyMatched: string[];
  watchOuts: string[];
  veteranPrograms: string[];
  nextSteps: string[];
}

// ──────────────────────────────────────────────────────────────
// VETERAN PROGRAM DATABASE (Mississippi-specific)
// ──────────────────────────────────────────────────────────────

const VETERAN_PROGRAMS: Record<string, string[]> = {
  'MS': [
    'USDA FSA Direct Farm Ownership Loan — 0% down for veterans',
    'Mississippi Beginning Farmer Tax-Exempt Bond Program',
    'Military Veterans Agriculture Liaison — (601) 965-5205',
  ],
  'MO': [
    'USDA FSA Direct Farm Ownership Loan — 0% down for veterans',
    'Missouri Beginning Farmer Tax-Exempt Bond Program',
  ],
  'default': [
    'USDA FSA Direct Farm Ownership Loan — 0% down for veterans',
    'Contact your state FSA office for veteran-specific programs',
  ],
};

// ──────────────────────────────────────────────────────────────
// SCORING ENGINE
// ──────────────────────────────────────────────────────────────

export function matchLand(criteria: LandCriteria, listings: Listing[]): LandMatch[] {
  const matches: LandMatch[] = [];

  for (const listing of listings) {
    const match = scoreListing(criteria, listing);
    if (match.matchScore >= 40) { // Minimum threshold
      matches.push(match);
    }
  }

  // Sort by match score descending
  matches.sort((a, b) => b.matchScore - a.matchScore);

  return matches;
}

function scoreListing(criteria: LandCriteria, listing: Listing): LandMatch {
  const scores = {
    priceScore: scorePrice(criteria, listing),
    sizeScore: scoreSize(criteria, listing),
    locationScore: scoreLocation(criteria, listing),
    accessScore: scoreAccess(criteria, listing),
    veteranScore: scoreVeteran(criteria, listing),
    financingScore: scoreFinancing(criteria, listing),
    useCaseScore: scoreUseCase(criteria, listing),
  };

  // Weighted composite
  const weights = {
    priceScore: 0.30,
    sizeScore: 0.15,
    locationScore: 0.15,
    accessScore: 0.10,
    veteranScore: 0.15,
    financingScore: 0.10,
    useCaseScore: 0.05,
  };

  const matchScore = Math.round(
    scores.priceScore * weights.priceScore +
    scores.sizeScore * weights.sizeScore +
    scores.locationScore * weights.locationScore +
    scores.accessScore * weights.accessScore +
    scores.veteranScore * weights.veteranScore +
    scores.financingScore * weights.financingScore +
    scores.useCaseScore * weights.useCaseScore
  );

  const whyMatched = buildWhyMatched(criteria, listing, scores);
  const watchOuts = buildWatchOuts(criteria, listing);
  const veteranPrograms = criteria.veteranPreference
    ? VETERAN_PROGRAMS[listing.state] ?? VETERAN_PROGRAMS['default']
    : [];
  const nextSteps = buildNextSteps(criteria, listing, matchScore);

  return {
    listing,
    matchScore,
    matchBreakdown: scores,
    whyMatched,
    watchOuts,
    veteranPrograms,
    nextSteps,
  };
}

// ──────────────────────────────────────────────────────────────
// INDIVIDUAL SCORING FUNCTIONS
// ──────────────────────────────────────────────────────────────

function scorePrice(criteria: LandCriteria, listing: Listing): number {
  const price = listing.price ?? listing.startingBid ?? listing.assessedValue ?? 0;
  if (price === 0) return 50; // Unknown

  // Max price check
  if (criteria.maxPrice && price > criteria.maxPrice) {
    return Math.max(0, 100 - ((price - criteria.maxPrice) / criteria.maxPrice) * 100);
  }

  // Price per acre check
  const acres = listing.acreage ?? 1;
  const ppa = price / acres;
  if (criteria.maxPricePerAcre && ppa > criteria.maxPricePerAcre) {
    return Math.max(0, 100 - ((ppa - criteria.maxPricePerAcre) / criteria.maxPricePerAcre) * 100);
  }

  // Below budget = bonus
  if (criteria.maxPrice) {
    const ratio = price / criteria.maxPrice;
    if (ratio <= 0.5) return 100;
    if (ratio <= 0.75) return 90;
    if (ratio <= 1.0) return 80;
    return 60;
  }

  return 75; // No max price set, neutral
}

function scoreSize(criteria: LandCriteria, listing: Listing): number {
  const acres = listing.acreage ?? 1;

  if (criteria.minAcres && acres < criteria.minAcres) {
    return Math.max(0, 100 - ((criteria.minAcres - acres) / criteria.minAcres) * 100);
  }

  if (criteria.maxAcres && acres > criteria.maxAcres) {
    return Math.max(0, 100 - ((acres - criteria.maxAcres) / criteria.maxAcres) * 100);
  }

  // Ideal size = bonus
  const idealMin = criteria.minAcres ?? 1;
  const idealMax = criteria.maxAcres ?? 20;
  const idealMid = (idealMin + idealMax) / 2;

  if (acres >= idealMin && acres <= idealMax) {
    const closeness = 1 - Math.abs(acres - idealMid) / idealMid;
    return Math.round(70 + closeness * 30);
  }

  return 60;
}

function scoreLocation(criteria: LandCriteria, listing: Listing): number {
  let score = 70;

  // State match
  if (listing.state?.toUpperCase() === criteria.state.toUpperCase()) {
    score += 10;
  }

  // County match
  if (criteria.counties && criteria.counties.length > 0) {
    const countyMatch = criteria.counties.some(
      c => listing.county?.toLowerCase().includes(c.toLowerCase())
    );
    if (countyMatch) {
      score += 15;
    } else {
      score -= 10;
    }
  }

  // Zoning preference
  if (criteria.zoning === 'unrestricted') {
    if (listing.zoning?.toLowerCase().includes('unrestricted') ||
        listing.zoning?.toLowerCase().includes('none') ||
        listing.zoning?.toLowerCase().includes('no zoning')) {
      score += 10;
    }
  }

  return Math.min(100, score);
}

function scoreAccess(criteria: LandCriteria, listing: Listing): number {
  let score = 70;

  // Water access
  if (criteria.waterAccess === 'required') {
    if (listing.waterAccess) {
      score += 15;
    } else {
      score -= 30;
    }
  } else if (criteria.waterAccess === 'preferred') {
    if (listing.waterAccess) {
      score += 10;
    }
  }

  // Road access
  if (criteria.roadAccess === 'required') {
    if (listing.roadAccess || listing.address) {
      score += 10;
    } else {
      score -= 20;
    }
  }

  // Utilities
  if (criteria.hasUtilities === 'required') {
    if (listing.utilities) {
      score += 10;
    } else {
      score -= 20;
    }
  }

  return Math.max(0, Math.min(100, score));
}

function scoreVeteran(criteria: LandCriteria, listing: Listing): number {
  if (!criteria.veteranPreference) return 50;

  let score = 60;

  // Rural land = better for FSA loans
  if (listing.acreage && listing.acreage >= 1) {
    score += 15;
  }

  // Agricultural use = FSA prefers
  if (listing.zoning?.toLowerCase().includes('ag') ||
      listing.useType?.toLowerCase().includes('ag')) {
    score += 15;
  }

  // Unrestricted = flexibility
  if (listing.zoning?.toLowerCase().includes('unrestricted')) {
    score += 10;
  }

  return Math.min(100, score);
}

function scoreFinancing(criteria: LandCriteria, listing: Listing): number {
  if (criteria.ownerFinancing === 'required') {
    if (listing.ownerFinancing) {
      return 100;
    }
    return 0;
  }

  if (criteria.ownerFinancing === 'preferred') {
    if (listing.ownerFinancing) {
      return 90;
    }
    return 60;
  }

  return 70;
}

function scoreUseCase(criteria: LandCriteria, listing: Listing): number {
  if (!criteria.useCase) return 70;

  switch (criteria.useCase) {
    case 'shelter':
      // Small acreage, unrestricted zoning preferred
      if (listing.acreage && listing.acreage <= 5) {
        return listing.zoning?.toLowerCase().includes('unrestricted') ? 90 : 70;
      }
      return 60;

    case 'homestead':
      if (listing.acreage && listing.acreage >= 2 && listing.acreage <= 20) {
        return 85;
      }
      return 65;

    case 'farm':
      if (listing.acreage && listing.acreage >= 5) {
        return listing.zoning?.toLowerCase().includes('ag') ? 95 : 80;
      }
      return 60;

    case 'hunting':
      if (listing.acreage && listing.acreage >= 10) {
        return 85;
      }
      return 65;

    case 'investment':
      return listing.price && listing.assessedValue && listing.price < listing.assessedValue
        ? 90 : 70;

    default:
      return 70;
  }
}

// ──────────────────────────────────────────────────────────────
// RESULT BUILDERS
// ──────────────────────────────────────────────────────────────

function buildWhyMatched(
  criteria: LandCriteria,
  listing: Listing,
  scores: LandMatch['matchBreakdown']
): string[] {
  const reasons: string[] = [];

  if (scores.priceScore >= 80) {
    reasons.push(`✅ Price: ${listing.price ? `$${listing.price.toLocaleString()}` : 'Competitive pricing'}`);
  }

  if (scores.sizeScore >= 80) {
    reasons.push(`✅ Size: ${listing.acreage} acres — matches your criteria`);
  }

  if (scores.locationScore >= 80) {
    reasons.push(`✅ Location: ${listing.county}, ${listing.state}`);
  }

  if (scores.veteranScore >= 80) {
    reasons.push(`✅ Veteran-friendly: FSA loan eligible`);
  }

  if (scores.financingScore >= 80) {
    reasons.push(`✅ Owner financing available`);
  }

  if (listing.zoning?.toLowerCase().includes('unrestricted')) {
    reasons.push(`✅ Unrestricted zoning — build freely`);
  }

  return reasons;
}

function buildWatchOuts(criteria: LandCriteria, listing: Listing): string[] {
  const warnings: string[] = [];

  if (!listing.roadAccess) {
    warnings.push(`⚠️ Road access not confirmed — verify before purchase`);
  }

  if (!listing.waterAccess && criteria.waterAccess === 'preferred') {
    warnings.push(`⚠️ Water access not listed — well may be needed ($3K-$6K)`);
  }

  if (listing.occupancyStatus === 'occupied') {
    warnings.push(`⚠️ Property may be occupied — verify before closing`);
  }

  if (listing.zoning === 'unknown' || !listing.zoning) {
    warnings.push(`⚠️ Zoning status unknown — call county clerk to verify`);
  }

  if (listing.auctionDate) {
    const daysUntil = Math.ceil((new Date(listing.auctionDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    if (daysUntil <= 7) {
      warnings.push(`⏰ Auction in ${daysUntil} days — act fast`);
    }
  }

  return warnings;
}

function buildNextSteps(criteria: LandCriteria, listing: Listing, score: number): string[] {
  const steps: string[] = [];

  if (score >= 80) {
    steps.push('🔥 High match — schedule site visit this week');
    steps.push('📞 Call county clerk: verify zoning + back taxes');
  } else if (score >= 60) {
    steps.push('✅ Good match — pull title records');
    steps.push('🚗 Drive by property');
  } else {
    steps.push('📋 Moderate match — compare with other options');
  }

  if (criteria.veteranPreference) {
    steps.push('🇺🇸 Contact FSA: (601) 965-5205 — start loan pre-approval');
  }

  if (listing.ownerFinancing) {
    steps.push('💰 Owner financing — negotiate terms directly');
  }

  steps.push('📄 Pull county records: liens, easements, plat map');

  return steps;
}

// ──────────────────────────────────────────────────────────────
// QUICK MATCH API
// ──────────────────────────────────────────────────────────────

export function quickMatch(
  criteria: LandCriteria,
  listings: Listing[]
): { topMatch: LandMatch | null; allMatches: LandMatch[] } {
  const matches = matchLand(criteria, listings);
  return {
    topMatch: matches[0] ?? null,
    allMatches: matches,
  };
}

// ──────────────────────────────────────────────────────────────
// DEFAULT CRITERIA (Od's Profile)
// ──────────────────────────────────────────────────────────────

export const OD_CRITERIA: LandCriteria = {
  state: 'MS',
  counties: ['Franklin', 'Jefferson', 'Claiborne', 'Copiah'],
  minAcres: 1,
  maxAcres: 20,
  maxPrice: 25000,
  maxPricePerAcre: 5000,
  waterAccess: 'preferred',
  roadAccess: 'required',
  zoning: 'unrestricted',
  useCase: 'shelter',
  veteranPreference: true,
  ownerFinancing: 'preferred',
  hasUtilities: 'any',
  terrain: 'any',
  floodZone: 'avoid',
};

// Usage:
// import { OD_CRITERIA, matchLand } from './land-match';
// const matches = matchLand(OD_CRITERIA, listings);
