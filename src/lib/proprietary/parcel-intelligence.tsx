import type { Listing } from '../types';

// ============================================================
// PARCEL INTELLIGENCE ENGINE™ v2.1
// Proprietary scoring system for land acquisition opportunities
//
// Upgrades from v2:
// - Composite Signal Layer (Momentum, Scarcity, Entry Barrier)
// - Temporal Advantage (Time Sensitivity, Early Discovery)
// - User-Aware Scoring (Beginner / Investor / Developer)
// - Strategic Insight per listing
// ============================================================

export type BuyerProfile = 'beginner' | 'investor' | 'developer';

// ──────────────────────────────────────────────────────────────
// SCORING WEIGHT SETS PER BUYER PROFILE
// ──────────────────────────────────────────────────────────────

const PROFILE_WEIGHTS: Record<BuyerProfile, { value: number; location: number; risk: number; demand: number; ease: number }> = {
  beginner: { value: 0.25, location: 0.15, risk: 0.30, demand: 0.10, ease: 0.20 },
  investor: { value: 0.35, location: 0.20, risk: 0.15, demand: 0.20, ease: 0.10 },
  developer: { value: 0.20, location: 0.30, risk: 0.15, demand: 0.25, ease: 0.10 },
};

// ──────────────────────────────────────────────────────────────
// ALL SIGNAL TYPES
// ──────────────────────────────────────────────────────────────

export interface AllSignals {
  // Core 5 subscores
  value: number;
  location: number;
  risk: number;
  demand: number;
  ease: number;
  // Composite signals
  momentum: number;
  scarcity: number;
  entryBarrier: number;
  // Temporal signals
  timeSensitivity: number;
  earlyDiscovery: number;
  // Derived total
  rawScore: number;
  adjustedScore: number;
  grade: string;
  gradeEmoji: string;
}

export interface Subscore {
  value: number;
  label: string;
  explanation: string;
}

export interface StrategicInsight {
  headline: string;
  summary: string;
  bestFor: BuyerProfile[];
  watchOut: string;
  angle: string;  // the "angle" for marketing this deal
}

export interface OpportunityScore {
  total: number;        // adjusted for buyer profile
  raw: number;          // baseline unadjusted
  grade: string;
  gradeEmoji: string;
  subs: Subscore[];
  why: string;
  signals: AllSignals;
  insight: StrategicInsight;
}

// ──────────────────────────────────────────────────────────────
// ST. LOUIS NEIGHBORHOOD DATA
// ──────────────────────────────────────────────────────────────

interface NeighborhoodProfile {
  locationScore: number;
  momentumScore: number;   // NEW: 0-100 trend signal
  demandScore: number;
  demandNotes: string;
  riskNotes: string;
  notes: string;
}

const NEIGHBORHOODS: Record<string, NeighborhoodProfile> = {
  '63107': { locationScore: 62, momentumScore: 58, demandScore: 58, demandNotes: 'North Fairground — stable residential, city investment in area', riskNotes: 'Higher vacancy than average. Title issues more common. Recommend full title search.', notes: 'North of downtown, mixed residential/commercial' },
  '63113': { locationScore: 65, momentumScore: 68, demandScore: 60, demandNotes: 'Greater Ville — active reinvestment, near Grand Center arts district', riskNotes: 'Some properties have estate/heir issues. Moderate complexity.', notes: 'Historically Black neighborhood, active revitalization' },
  '63115': { locationScore: 55, momentumScore: 50, demandScore: 52, demandNotes: 'Baden — mostly residential, limited commercial demand', riskNotes: 'Occasional environmental issues from prior industrial use nearby.', notes: 'Working-class neighborhood, slow but steady' },
  '63120': { locationScore: 58, momentumScore: 62, demandScore: 55, demandNotes: 'Northwoods/Pagedale — residential, some commercial along Florissant Rd', riskNotes: 'Elevated vacant property rate. Properties may have code violations.', notes: 'Suburban-style residential, moderate demand' },
  '63121': { locationScore: 72, momentumScore: 75, demandScore: 68, demandNotes: 'Ferguson — significant reinvestment since 2014, strong residential demand', riskNotes: 'Some post-riot redevelopment restrictions in certain blocks. Most properties clean.', notes: 'Rebuilding momentum, growing demand' },
  '63133': { locationScore: 60, momentumScore: 55, demandScore: 55, demandNotes: 'Pagedale — dense residential, close to Clayton (job center)', riskNotes: 'Many LRA properties have back-tax complications.', notes: 'Between STL and Clayton, decent location' },
  '63135': { locationScore: 68, momentumScore: 72, demandScore: 65, demandNotes: 'Ferguson — strong residential demand, new businesses on Florissant Rd', riskNotes: 'Most transactions straightforward. Code violations common — factor into rehab budget.', notes: 'Most improved north STL neighborhood since 2014' },
  '63136': { locationScore: 58, momentumScore: 52, demandScore: 60, demandNotes: 'Jennings — residential, limited new development but stable', riskNotes: 'Some properties have chronic vacancy. Higher lien burden.', notes: 'Working-class, price-sensitive market' },
  '63137': { locationScore: 65, momentumScore: 60, demandScore: 58, demandNotes: 'Bellefontaine Neighbors — stable residential, good for rentals', riskNotes: 'Generally clean titles. County properties tend to be straightforward.', notes: 'Quiet residential, landlord-friendly area' },
  '63138': { locationScore: 55, momentumScore: 48, demandScore: 50, demandNotes: 'North STL County — mostly residential, limited commercial appeal', riskNotes: 'Occasional environmental disclosures needed near railroad lines.', notes: 'Affordable but slow market' },
  '63140': { locationScore: 60, momentumScore: 52, demandScore: 52, demandNotes: 'North County — industrial/residential mix, limited new construction', riskNotes: 'Some parcels have old environmental history. Verify with Phase I.', notes: 'Transitional area' },
  '63147': { locationScore: 58, momentumScore: 55, demandScore: 55, demandNotes: 'North St. Louis City — near airport, some industrial rezoning potential', riskNotes: 'Heavier industrial history. Verify zoning allows intended use.', notes: 'Industrial-residential boundary' },
  '63109': { locationScore: 78, momentumScore: 80, demandScore: 75, demandNotes: 'South Hampton — highly desirable, excellent schools, strong resale', riskNotes: 'Prices higher here. Competition from other investors. Act fast.', notes: 'One of the most sought-after south STL neighborhoods' },
  '63111': { locationScore: 70, momentumScore: 74, demandScore: 72, demandNotes: 'Carondelet — historic homes, growing interest, near Amazon fulfillment', riskNotes: 'Historic properties may have restrictions if in historic district.', notes: 'South city, old industrial but gentrifying' },
  '63116': { locationScore: 75, momentumScore: 77, demandScore: 74, demandNotes: 'Bevo Mill/Gravois Park — diverse, high owner-occupancy, strong community', riskNotes: 'Moderate rehab costs. Properties often occupied — verify occupancy.', notes: 'Dense residential, lots of duplexes, stable' },
  '63118': { locationScore: 72, momentumScore: 82, demandScore: 70, demandNotes: 'Gravois Park/Broadway — trending neighborhood, heavy reinvestment, Airbnb demand', riskNotes: 'Fast-rising prices. Some gentrification friction. Still good upside.', notes: 'One of STL hottest neighborhoods for investors' },
  '63123': { locationScore: 68, momentumScore: 65, demandScore: 65, demandNotes: 'St. George/Lindenwood Park — stable, family-oriented, strong rental demand', riskNotes: 'Properties typically clean. County = cleaner process than city.', notes: 'Solid south county residential' },
  '63101': { locationScore: 88, momentumScore: 85, demandScore: 85, demandNotes: 'Downtown/Downtown West — heavy redevelopment, tech hiring, major investment', riskNotes: 'Highest competition. Institutional buyers active. Price accordingly.', notes: 'Heart of STL redevelopment' },
  '63102': { locationScore: 85, momentumScore: 88, demandScore: 82, demandNotes: 'Downtown — Loft district, NGA HQ going in nearby, massive growth signal', riskNotes: 'Premium pricing. Most deals are wholesale/institutional. Hard to compete at retail.', notes: 'Top-tier St. Louis location' },
  '63103': { locationScore: 82, momentumScore: 80, demandScore: 80, demandNotes: 'Downtown/Midtown — Central West End adjacent, hospital corridor, growing', riskNotes: 'Title issues more common in old buildings. Full inspection critical.', notes: 'Connected to CWE momentum' },
  '63104': { locationScore: 80, momentumScore: 78, demandScore: 78, demandNotes: 'Soulard/Benton Park — historic French neighborhood, high property values', riskNotes: 'Historic district rules apply. Must maintain exterior character. More restrictive.', notes: 'Premium historic neighborhood' },
  '63106': { locationScore: 75, momentumScore: 72, demandScore: 72, demandNotes: 'Near Downtown North — redevelopment creeping north, proximity to universities', riskNotes: 'Some blocks still rough. Scout carefully. Good deals exist but vet each one.', notes: 'Transitional but improving rapidly' },
  '63108': { locationScore: 85, momentumScore: 83, demandScore: 82, demandNotes: 'Central West End — premier STL neighborhood, medical school, Cortex tech hub', riskNotes: 'Premium prices. Very competitive. Properties move in days, not weeks.', notes: 'Most affluent STL neighborhood' },
  '63110': { locationScore: 80, momentumScore: 81, demandScore: 77, demandNotes: 'Shaw/Tower Grove South — top-rated, excellent schools, high owner demand', riskNotes: 'Competitive market. Properties rarely hit public auction below market.', notes: 'Best schools in STL, family demand extreme' },
  '63112': { locationScore: 70, momentumScore: 68, demandScore: 68, demandNotes: 'JeffVanderLou/Wesley — near Cortex, affordable for now, redevelopment pressure', riskNotes: 'Some blocks high crime. Verify specific property. Overall trend positive.', notes: 'Transitional, on the cusp of growth' },
  '63031': { locationScore: 72, momentumScore: 65, demandScore: 68, demandNotes: 'Florissant — stable working-class, good rental demand, strong resale', riskNotes: 'County transactions cleaner. Less fraud, clearer titles.', notes: 'North county anchor city' },
  '63033': { locationScore: 65, momentumScore: 60, demandScore: 62, demandNotes: 'Black Jack/Parkdale — affordable, decent schools, rental market active', riskNotes: 'Some properties have deferred maintenance. Code enforcement variable.', notes: 'Value-conscious buyers market' },
  '63043': { locationScore: 70, momentumScore: 62, demandScore: 65, demandNotes: 'Bridgeton — near airport, some industrial demand, suburban residential', riskNotes: 'Occasional environmental concerns near Lambert airport noise zones.', notes: 'Mixed-use suburban market' },

  // ── NEW ORLEANS, LA ──────────────────────────────────────────
  '70117': { locationScore: 45, momentumScore: 58, demandScore: 52, demandNotes: 'Lower Ninth Ward — historic resilience, community rebuilding momentum, cultural tourism', riskNotes: 'Storm-damage titles still unresolved on some parcels. Full title search essential. Some blighted lot consolidation.', notes: 'Post-Katrina recovery neighborhood, high emotional value, 105 NORA properties available' },
  '70119': { locationScore: 82, momentumScore: 75, demandScore: 78, demandNotes: 'Treme — historic, near French Quarter, strong short-term rental demand, cultural landmark', riskNotes: 'Historic district overlay may restrict renovations. Verify with HPC before bidding.', notes: 'Premium location adjacent to French Quarter, one of NOLAs most desirable urban neighborhoods' },
  '70122': { locationScore: 58, momentumScore: 62, demandScore: 55, demandNotes: 'Fillmore — gentrifying north of Midtown, more affordable than French Qtr, stable residential', riskNotes: 'Some parcels have deferred maintenance liens. County-level transactions cleaner than city.', notes: 'Quiet residential, good value entry into NOLA market' },
  '70126': { locationScore: 48, momentumScore: 55, demandScore: 50, demandNotes: 'Desire Area — near University Medical Center, some commercial interest, stable working-class', riskNotes: 'Higher crime blocks exist — scout specific addresses. Some lots have code violations.', notes: 'Solid value-play neighborhood near emerging medical district' },
  '70127': { locationScore: 50, momentumScore: 52, demandScore: 52, demandNotes: 'Little Woods — stable suburban residential, decent schools, good rental demand', riskNotes: 'County properties tend to have cleaner titles. Standard suburban risks.', notes: 'Family-friendly suburban NOLA, most affordable entry in Orleans Parish' },
  '70128': { locationScore: 48, momentumScore: 50, demandScore: 50, demandNotes: 'Little Woods/Pines Village — quiet residential, minimal short-term rental demand', riskNotes: 'Low risk area. Standard due diligence sufficient. Flood zone verification recommended.', notes: 'Suburban NOLA, best for long-term rental strategy' },
  '70129': { locationScore: 42, momentumScore: 45, demandScore: 40, demandNotes: 'Village De Lest/New Orleans East — more isolated, newer development, limited investor interest', riskNotes: 'Farthest from core NOLA. Verify flood zone status — parts in AE flood zone requiring flood insurance.', notes: 'Value play for buy-and-hold, longer horizon to appreciation' },
  '70114': { locationScore: 68, momentumScore: 70, demandScore: 72, demandNotes: 'Whitney/Lower Garden District — near downtown, emerging residential, strong condo demand', riskNotes: 'Condo/HOA restrictions may apply on some parcels. Verify zoning before development.', notes: 'Best value near downtown core, gentrifying rapidly' },
};

const DEFAULT_HOOD: NeighborhoodProfile = {
  locationScore: 55,
  momentumScore: 50,
  demandScore: 50,
  demandNotes: 'Standard residential area — verify local market conditions',
  riskNotes: 'Verify property-specific conditions before bidding',
  notes: 'Limited neighborhood data — recommend physical inspection',
};

// ──────────────────────────────────────────────────────────────
// ESTIMATED VALUES
// ──────────────────────────────────────────────────────────────

const EV: Record<string, number> = {
  '63107': 5_000_00, '63113': 4_000_00, '63115': 6_000_00, '63120': 3_000_00,
  '63121': 9_000_00, '63133': 5_500_00, '63135': 12_000_00, '63136': 7_000_00,
  '63137': 8_000_00, '63138': 5_000_00, '63140': 7_000_00, '63147': 4_000_00,
  '63109': 18_000_00, '63111': 14_000_00, '63116': 16_000_00, '63118': 15_000_00,
  '63123': 20_000_00, '63125': 18_000_00, '63129': 25_000_00,
  '63101': 35_000_00, '63102': 30_000_00, '63103': 25_000_00, '63104': 28_000_00,
  '63106': 20_000_00, '63108': 35_000_00, '63110': 28_000_00, '63112': 18_000_00,
  '63031': 14_000_00, '63033': 10_000_00, '63043': 16_000_00,
  // New Orleans, LA
  '70114': 28_000_00, '70117': 10_000_00, '70119': 35_000_00, '70122': 18_000_00,
  '70126': 12_000_00, '70127': 15_000_00, '70128': 14_000_00, '70129': 12_000_00,
};

function getEV(zip: string): number { return EV[zip] ?? 12_000_00; }
function getNeighborhood(zip: string): NeighborhoodProfile { return NEIGHBORHOODS[zip] ?? DEFAULT_HOOD; }

// ──────────────────────────────────────────────────────────────
// CORE SUB-SCORE CALCULATIONS
// ──────────────────────────────────────────────────────────────

function calcValue(listing: Listing): Subscore {
  const zip = listing.zipCode ?? '';
  const ev = getEV(zip);
  const price = listing.price ?? listing.startingBid ?? 0;
  const assessedValue = listing.assessedValue ?? ev;
  const useEV = Math.max(assessedValue, ev);
  const discountPct = price > 0 ? Math.max(0, Math.min(99, Math.round((1 - price / useEV) * 100))) : 50;
  const fmt = (c: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(c / 100);

  let explanation: string;
  if (discountPct >= 75) explanation = `Exceptional: ${fmt(price)} on property worth ~${fmt(useEV)} — ${discountPct}% below market. Rare depth.`;
  else if (discountPct >= 50) explanation = `${fmt(price)} vs estimated ${fmt(useEV)} — ${discountPct}% below. Strong value.`;
  else if (discountPct >= 25) explanation = `${fmt(price)} on property worth ~${fmt(useEV)} — ${discountPct}% below market. Reasonable entry.`;
  else if (discountPct >= 10) explanation = `Near-market at ${fmt(price)} — only ${discountPct}% below ${fmt(useEV)}. Slim margin.`;
  else explanation = `At or above estimated value. Limited margin — verify comps carefully.`;

  return { value: discountPct, label: 'Value Score', explanation };
}

function calcLocation(listing: Listing): Subscore {
  const zip = listing.zipCode ?? '';
  const hood = getNeighborhood(zip);
  return {
    value: hood.locationScore,
    label: 'Location Score',
    explanation: `${hood.notes} Score: ${hood.locationScore}/100. ${hood.demandNotes}`,
  };
}

function calcRisk(listing: Listing): Subscore {
  const zip = listing.zipCode ?? '';
  const hood = getNeighborhood(zip);
  const rawText = JSON.stringify(listing.rawData ?? {}).toLowerCase();
  const label = (listing.originalLabel ?? "").toLowerCase();
  let score = 65;
  const riskFactors: string[] = [];

  if (label.includes('sheriff sale')) { score -= 15; riskFactors.push('Sheriff sale — redemption risk, tenant issues likely'); }
  if (label.includes('tax foreclosure') || label.includes('delinquent')) { score -= 10; riskFactors.push('Confirm redemption period has expired'); }
  if (label.includes('adjudicated')) { score -= 5; riskFactors.push('Verify city has clear title before bidding'); }
  if (label.includes('lra') || label.includes('land bank')) { score += 10; riskFactors.push('LRA/city facilitates — lower risk'); }
  if (listing.occupancyStatus === 'occupied') { score -= 20; riskFactors.push('Tenant-occupied — 90+ day STL eviction process'); }
  if (listing.occupancyStatus === 'unknown') { score -= 10; riskFactors.push('Occupancy unknown — must verify'); }
  if (rawText.includes('severe_decline') || rawText.includes('demo_required')) { score -= 15; riskFactors.push('Demolition likely — add $5K-$20K teardown cost'); }
  if (rawText.includes('environmental') || rawText.includes('phase')) { score -= 10; riskFactors.push('Environmental concern — recommend Phase I assessment'); }
  if (rawText.includes('historic')) { score -= 5; riskFactors.push('Historic — exterior changes require approval'); }
  if (rawText.includes('back_taxes') && rawText.includes('high')) { score -= 5; riskFactors.push('Significant back taxes — confirm included in price'); }
  if (rawText.includes('lien')) { score -= 5; riskFactors.push('Lien on property — confirm lien position'); }

  score = Math.max(0, Math.min(100, score));

  let explanation: string;
  if (score >= 80) explanation = `Low risk. ${hood.riskNotes ?? 'Clean transaction expected.'}`;
  else if (score >= 60) explanation = `Moderate risk. ${riskFactors.slice(0, 2).join('. ') || 'Standard due diligence applies.'}`;
  else if (score >= 40) explanation = `High risk — ${riskFactors.slice(0, 3).join('. ') || 'Multiple factors. Expert diligence required.'}`;
  else explanation = `Very high risk — ${riskFactors.slice(0, 3).join('. ') || 'Significant complications. Advanced investors only.'}`;

  return { value: score, label: 'Risk Score', explanation };
}

function calcDemand(listing: Listing): Subscore {
  const zip = listing.zipCode ?? '';
  const hood = getNeighborhood(zip);
  const rawText = JSON.stringify(listing.rawData ?? {}).toLowerCase();
  let score = hood.demandScore;
  const factors: string[] = [];

  if (rawText.includes('duplex') || rawText.includes('double_flat')) { score = Math.min(100, score + 15); factors.push('Duplex — very high rental demand'); }
  if (rawText.includes('acre') || rawText.includes('lot_size')) { score = Math.min(100, score + 10); factors.push('Larger lot — flexible use, development upside'); }
  if (rawText.includes('commercial') || rawText.includes('storefront')) { score = Math.min(100, score + 10); factors.push('Commercial — broader buyer pool'); }
  if (rawText.includes('vacant_land') || rawText.includes('lot')) { score = Math.min(100, score + 5); factors.push('Land only — no structure risk'); }
  if (rawText.includes('redevelopment_area') || rawText.includes('gentrification')) { score = Math.min(100, score + 10); factors.push('In redevelopment zone — appreciation likely'); }
  if (rawText.includes('historic_tax_credit') || rawText.includes('incentive')) { score = Math.min(100, score + 10); factors.push('Incentive programs — boosts value significantly'); }

  score = Math.max(0, Math.min(100, score));
  const explanation = `${hood.demandNotes}. ${factors.join('. ') || 'Standard demand.'}`;

  return { value: score, label: 'Demand Score', explanation };
}

function calcEase(listing: Listing): Subscore {
  const label = (listing.originalLabel ?? "").toLowerCase();
  const hasAuction = !!listing.auctionDate;
  const rawText = JSON.stringify(listing.rawData ?? {}).toLowerCase();
  let score = 65; let explanation = '';

  if (label.includes('lra') || label.includes('land bank') || label.includes('surplus')) {
    score = 78; explanation = 'LRA/Surplus — city facilitates, title usually clear, standard close.';
  } else if (label.includes('sheriff sale')) {
    score = 45; explanation = 'Sheriff sale — court process, redemption risk, tenant complications.';
  } else if (label.includes('tax sale') || label.includes('tax foreclosure') || label.includes('delinquent')) {
    score = 55; explanation = 'Tax sale — competitive bidding, redemption may apply, total cost unclear.';
  } else if (label.includes('lien certificate') || label.includes('tax lien')) {
    score = 62; explanation = 'Tax lien — certificate purchase, redemption tracking, not direct ownership.';
  }

  if (hasAuction && score < 70) { score = Math.max(0, score - 10); explanation += ' Auction adds urgency + competition.'; }
  if (rawText.includes('501c3') || rawText.includes('nonprofit')) { score = Math.min(100, score + 15); explanation += ' Incentive programs may streamline.'; }

  return { value: Math.max(0, Math.min(100, score)), label: 'Acquisition Ease', explanation };
}

// ──────────────────────────────────────────────────────────────
// COMPOSITE SIGNALS
// ──────────────────────────────────────────────────────────────

function calcMomentum(listing: Listing, allListings: Listing[]): number {
  const zip = listing.zipCode ?? '';
  const hood = getNeighborhood(zip);
  // Count active listings in same zip
  const sameZip = allListings.filter(l => l.zipCode === zip && l.id !== listing.id && !l.id.includes('sold'));
  const listingCount = sameZip.length;
  // Momentum: neighborhood trend score, dampened if market is flooded
  const base = hood.momentumScore;
  if (listingCount === 0) return Math.min(100, base + 10); // exclusive = high momentum signal
  if (listingCount <= 3) return base; // normal
  if (listingCount <= 7) return Math.max(20, base - 10);   // crowded = dampen
  return Math.max(15, base - 20);                           // saturated = low momentum
}

function calcScarcity(listing: Listing, allListings: Listing[]): number {
  const zip = listing.zipCode ?? '';
  const price = listing.price ?? listing.startingBid ?? 0;
  if (price === 0) return 50;
  // Count similar-priced listings in same zip (within 50% price band)
  const similar = allListings.filter(l =>
    l.zipCode === zip &&
    l.id !== listing.id &&
    l.price !== null &&
    Math.abs((l.price ?? 0) - price) / price < 0.5
  );
  // Few similar = high scarcity = good for this listing
  if (similar.length === 0) return 90;  // no direct competition
  if (similar.length <= 2) return 72;
  if (similar.length <= 5) return 55;
  if (similar.length <= 10) return 38;
  return 22;
}

function calcEntryBarrier(listing: Listing): number {
  const label = (listing.originalLabel ?? "").toLowerCase();
  const hasAuction = !!listing.auctionDate;
  const rawText = JSON.stringify(listing.rawData ?? {}).toLowerCase();
  let score = 50; // baseline

  if (label.includes('sheriff sale')) { score -= 25; }
  if (label.includes('tax sale') || label.includes('delinquent')) { score -= 15; }
  if (label.includes('adjudicated') || label.includes('foreclosure')) { score -= 10; }
  if (label.includes('lra') || label.includes('land bank') || label.includes('surplus')) { score += 30; }
  if (hasAuction) { score -= 15; }
  if (rawText.includes('cash') || rawText.includes('all_cash')) { score -= 5; }
  if (rawText.includes('financing_available')) { score += 10; }

  return Math.max(5, Math.min(95, score));
}

// ──────────────────────────────────────────────────────────────
// TEMPORAL SIGNALS
// ──────────────────────────────────────────────────────────────

function calcTimeSensitivity(listing: Listing): number {
  if (!listing.auctionDate) {
    // No auction = no immediate time pressure
    const scraped = new Date(listing.scrapedAt ?? new Date().toISOString()).getTime();
    const daysSinceScraped = (Date.now() - scraped) / (1000 * 60 * 60 * 24);
    // Older listings (60+ days) = moderate urgency to act before others find them
    if (daysSinceScraped > 60) return 75;
    if (daysSinceScraped > 30) return 60;
    return 30; // freshly listed = no rush
  }

  const auction = listing.auctionDate ? new Date(listing.auctionDate).getTime() : Date.now();
  const daysTo = Math.ceil((auction - Date.now()) / (1000 * 60 * 60 * 24));

  if (daysTo <= 3) return 95;   // imminent
  if (daysTo <= 7) return 85;   // this week
  if (daysTo <= 14) return 72;  // within 2 weeks
  if (daysTo <= 30) return 58;  // within a month
  if (daysTo <= 60) return 40;  // a couple months
  return 25;                    // future auction
}

function calcEarlyDiscovery(listing: Listing): number {
  const scraped = new Date(listing.scrapedAt ?? new Date().toISOString()).getTime();
  const daysOld = (Date.now() - scraped) / (1000 * 60 * 60 * 24);
  const auction = listing.auctionDate ? listing.auctionDate ? new Date(listing.auctionDate).getTime() : Date.now() : null;
  const daysToAuction = auction ? Math.ceil((auction - Date.now()) / (1000 * 60 * 60 * 24)) : 999;

  // Low views/clicks in MLS = not widely known (proxy: days old + days to auction)
  // A fresh listing with distant auction = high discovery advantage
  let score = 50;
  if (daysOld < 7) score += 25;       // very fresh
  else if (daysOld < 30) score += 15; // recently added
  else score -= 10;                   // old listing

  if (daysToAuction > 60) score += 15;  // plenty of time = low competition to research
  else if (daysToAuction < 7) score -= 15; // urgent = others will swarm

  return Math.max(5, Math.min(95, score));
}

// ──────────────────────────────────────────────────────────────
// CLASSIFICATION
// ──────────────────────────────────────────────────────────────

function classify(total: number): { grade: string; emoji: string } {
  if (total >= 85) return { grade: 'Elite Deal', emoji: '🔥' };
  if (total >= 70) return { grade: 'Strong Opportunity', emoji: '💰' };
  if (total >= 50) return { grade: 'Moderate', emoji: '⚖️' };
  if (total >= 30) return { grade: 'Risky', emoji: '⚠️' };
  return { grade: 'Avoid', emoji: '💀' };
}

// ──────────────────────────────────────────────────────────────
// STRATEGIC INSIGHT GENERATOR
// ──────────────────────────────────────────────────────────────

function generateInsight(
  listing: Listing,
  signals: AllSignals,
  profile: BuyerProfile
): StrategicInsight {
  const zip = listing.zipCode ?? '';
  const price = listing.price ?? listing.startingBid ?? 0;
  const hood = getNeighborhood(zip);
  const fmt = (c: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(c / 100);
  const label = (listing.originalLabel ?? "").toLowerCase();

  // Headline
  let headline = '';
  if (signals.value >= 75) headline = `Deep-discount land play — ${fmt(price)} entry`;
  else if (signals.value >= 50) headline = `Value-priced property in a ${signals.location >= 70 ? 'strong' : 'developing'} area`;
  else if (signals.value < 30) headline = `Near-market property with strategic upside`;
  else headline = `Moderate entry point in an ${signals.location >= 65 ? 'established' : 'emerging'} market`;

  if (signals.scarcity >= 75 && signals.value >= 50) headline = `Scarce deal — few similar properties at this price in ${listing.zipCode}`;
  if (signals.momentum >= 78) headline = `High-momentum neighborhood — ${hood.notes.split(',')[0]}`;
  if (signals.timeSensitivity >= 80) headline = `${listing.auctionDate ? 'Auction approaching' : 'Limited-time window'} — act before visibility rises`;

  // Summary
  const growthWord = signals.momentum >= 75 ? 'up-and-coming' : signals.momentum >= 60 ? 'stabilizing' : 'established';
  const riskWord = signals.risk >= 70 ? 'low-risk, straightforward' : signals.risk >= 50 ? 'manageable' : 'complex';
  const demandWord = signals.demand >= 70 ? 'high-demand area' : 'steady-demand area';

  let summary = `This is a ${signals.value >= 60 ? 'low-cost entry' : 'price-conscious'} property in a ${growthWord} area. `;
  summary += `Acquisition risk is ${riskWord}. `;
  summary += `Located in ${hood.notes.split(',')[0]}. `;
  summary += `Best for: ${signals.demand >= 65 ? 'buy-and-hold investors, rental strategists' : 'patient holders, renovation projects'}.`;

  // Best for profiles
  let bestFor: BuyerProfile[] = [];
  if (signals.ease >= 70 && signals.risk >= 65) bestFor = ['beginner', 'investor'];
  else if (signals.demand >= 70 && signals.momentum >= 70) bestFor = ['investor', 'developer'];
  else if (signals.value >= 70) bestFor = ['investor', 'beginner'];
  else bestFor = ['investor'];

  // Adjust for profile
  if (profile === 'beginner' && signals.ease < 55) {
    summary += ' NOTE: Acquisition complexity is high — beginner buyers should bring an experienced mentor or attorney.';
  }
  if (profile === 'developer' && signals.demand < 60) {
    summary += ' NOTE: Demand signals modest — verify end-buyer demand before committing to a development project.';
  }

  // Watch out
  let watchOut = '';
  if (listing.occupancyStatus === 'occupied') watchOut = 'Property appears occupied. St. Louis tenant protections require proper eviction process — budget 90+ days.';
  else if (signals.entryBarrier >= 70) watchOut = 'High entry barrier — complex process. Not recommended as a first deal.';
  else if (signals.timeSensitivity >= 85) watchOut = 'Auction very soon — must act within days. Full due diligence may not be possible.';
  else if (signals.value < 30) watchOut = 'Near-market pricing — narrow margin. Verify comparable sales carefully before bidding.';
  else watchOut = 'Standard due diligence applies — verify title, zoning, and total acquisition cost.';

  // Angle
  const angles: string[] = [];
  if (signals.value >= 70) angles.push(`${signals.value}% below market`);
  if (signals.scarcity >= 70) angles.push(`${listing.zipCode} has few similar deals`);
  if (signals.momentum >= 75) angles.push(`${hood.notes.split(',')[0]} is trending up`);
  if (signals.earlyDiscovery >= 70) angles.push('Low public visibility — first-mover advantage');
  if (signals.ease >= 70) angles.push('Straightforward LRA/city process');
  if (listing.occupancyStatus === 'vacant') angles.push('Vacant — no tenant complications');
  const angle = angles.length > 0 ? angles.slice(0, 3).join(' | ') : 'Solid acquisition opportunity';

  return { headline, summary, bestFor, watchOut, angle };
}

// ──────────────────────────────────────────────────────────────
// WHY THIS SCORE — narrative
// ──────────────────────────────────────────────────────────────

function buildWhy(subs: Subscore[], signals: AllSignals): string {
  const [val, loc, risk, demand, ease] = subs;
  const parts: string[] = [];

  if (val.value >= 70) parts.push(`Deep discount — ${val.value}% below market`);
  else if (val.value >= 50) parts.push(`Good value — ${val.value}% below estimated`);
  else if (val.value < 25) parts.push(`Near-market price — margin is thin`);

  if (signals.momentum >= 75) parts.push(`High-momentum area (${signals.momentum}/100)`);
  else if (signals.momentum >= 60) parts.push(`Steady neighborhood`);
  else parts.push(`Slow market — plan for a longer hold`);

  if (signals.risk >= 70) parts.push(`Low acquisition risk`);
  else if (signals.risk >= 50) parts.push(`Moderate risk — standard diligence required`);
  else parts.push(`Higher complexity — expert approach needed`);

  if (signals.scarcity >= 70) parts.push(`Scarce at this price in zip ${signals.momentum >= 60 ? '(strong for you)' : ''}`);
  if (signals.timeSensitivity >= 75) parts.push(`Time-sensitive — ${signals.timeSensitivity}/100 urgency`);
  if (signals.earlyDiscovery >= 65) parts.push(`Early discovery — low competition yet`);

  return parts.join('. ');
}

// ──────────────────────────────────────────────────────────────
// MAIN COMPUTE FUNCTION
// ──────────────────────────────────────────────────────────────

export function computeOpportunityScore(
  listing: Listing,
  allListings: Listing[] = [],
  profile: BuyerProfile = 'investor'
): OpportunityScore {
  const subs: Subscore[] = [calcValue(listing), calcLocation(listing), calcRisk(listing), calcDemand(listing), calcEase(listing)];

  const weights = [0.30, 0.20, 0.20, 0.15, 0.15]; // baseline weights
  const rawScore = Math.round(subs.reduce((sum, sub, i) => sum + sub.value * weights[i], 0));

  const momentum = calcMomentum(listing, allListings);
  const scarcity = calcScarcity(listing, allListings);
  const entryBarrier = calcEntryBarrier(listing);
  const timeSensitivity = calcTimeSensitivity(listing);
  const earlyDiscovery = calcEarlyDiscovery(listing);

  // User-aware adjustment: reweight based on profile
  const pWeights = PROFILE_WEIGHTS[profile];
  const adjustedScore = Math.round(
    subs[0].value * pWeights.value +
    subs[1].value * pWeights.location +
    subs[2].value * pWeights.risk +
    subs[3].value * pWeights.demand +
    subs[4].value * pWeights.ease
  );

  const signals: AllSignals = {
    value: subs[0].value,
    location: subs[1].value,
    risk: subs[2].value,
    demand: subs[3].value,
    ease: subs[4].value,
    momentum,
    scarcity,
    entryBarrier,
    timeSensitivity,
    earlyDiscovery,
    rawScore,
    adjustedScore,
    grade: classify(adjustedScore).grade, gradeEmoji: classify(adjustedScore).emoji,
  };

  const why = buildWhy(subs, signals);
  const insight = generateInsight(listing, signals, profile);
  const { grade, emoji } = classify(adjustedScore);

  return {
    total: adjustedScore,
    raw: rawScore,
    grade,
    gradeEmoji: emoji,
    subs,
    why,
    signals,
    insight,
  };
}

// Backward-compatible alias
export { computeOpportunityScore as computeScore };
