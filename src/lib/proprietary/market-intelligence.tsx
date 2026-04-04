// ============================================================
// MARKET INTELLIGENCE LAYER™ v1
// Proprietary demand signals, conversion tracking, and
// emerging opportunity zone detection for NLDS
// ============================================================

import type { Listing } from '../types';
import { computeOpportunityScore } from './parcel-intelligence';

// ──────────────────────────────────────────────────────────────
// DEMAND SIGNALS — per zip code
// ──────────────────────────────────────────────────────────────

export type ZipClassification = 'HOT' | 'WARM' | 'COLD' | 'EMERGING';

export interface ZipDemandSignal {
  zip: string;
  listingCount: number;
  viewCount: number;
  unlockCount: number;
  searchCount: number;
  avgTimeOnPage: number;
  demandScore: number;        // 0-100 overall demand heat
  velocityScore: number;      // 0-100 trend direction
  conversionScore: number;    // 0-100 unlock rate
  scarcityScore: number;      // 0-100 supply signal
  trend: 'rising' | 'stable' | 'cooling';
  classification: ZipClassification;
  headline: string;
  summary: string;
}

// ──────────────────────────────────────────────────────────────
// DEAL TYPE CONVERSION TRACKING
// ──────────────────────────────────────────────────────────────

export type DealTypeStrength = 'very_strong' | 'strong' | 'moderate' | 'weak';

export interface DealTypeMetrics {
  dealType: string;
  totalListings: number;
  avgScore: number;
  unlockRate: number;
  avgTimeOnPage: number;
  avgDaysToUnlock: number;
  topZip: string;
  conversionRate: number;      // 0-100
  strength: DealTypeStrength;
  label: string;
}

// ──────────────────────────────────────────────────────────────
// EMERGING HOTSPOT — the main output
// ──────────────────────────────────────────────────────────────

export type HotspotAction = 'watch' | 'unlock' | 'act_fast';
export type RiskLevel = 'low' | 'medium' | 'high';
export type TrendDirection = 'accelerating' | 'stable' | 'decelerating';

export interface EmergingHotspot {
  zip: string;
  city: string;
  rank: number;
  overallScore: number;       // 0-100 composite
  demandScore: number;
  momentumScore: number;
  scarcityScore: number;
  conversionScore: number;
  listingCount: number;
  avgListingScore: number;
  dealTypeBreakdown: Record<string, number>;
  dominantDealType: string;
  trendDirection: TrendDirection;
  monthsAsHotspot: number;
  classification: ZipClassification;
  headline: string;
  summary: string;
  investmentAngle: string;
  riskLevel: RiskLevel;
  action: HotspotAction;
  actionLabel: string;
}

// ──────────────────────────────────────────────────────────────
// ANALYTICS ( stubs — replace with Supabase queries in production)
// ──────────────────────────────────────────────────────────────

export type AnalyticsEventType =
  | 'listing_view' | 'listing_unlock' | 'listing_search'
  | 'zip_view' | 'deal_type_view' | 'score_view'
  | 'acquisition_pathway_view' | 'page_exit';

export interface AnalyticsEvent {
  event: AnalyticsEventType;
  zip?: string;
  listingId?: string;
  dealType?: string;
  city?: string;
  sessionId?: string;
  timestamp: number;
  metadata?: Record<string, unknown>;
}

// ──────────────────────────────────────────────────────────────
// PER-ZIP DEMAND COMPUTATION
// Simulation: replaces this with real Supabase analytics queries
// ──────────────────────────────────────────────────────────────

function computeZipDemand(listings: Listing[], allListings: Listing[]): ZipDemandSignal[] {
  const zipMap: Record<string, Listing[]> = {};
  for (const l of listings) {
    const zip = l.zipCode ?? 'unknown';
    if (!zipMap[zip]) zipMap[zip] = [];
    zipMap[zip].push(l);
  }

  return Object.entries(zipMap).map(([zip, zipListings]) => {
    const count = zipListings.length;
    const scores = zipListings.map(l => computeOpportunityScore(l, allListings, 'investor').total);
    const avgScore = scores.reduce((a, b) => a + b, 0) / count;

    // Simulated analytics (replace with DB queries in production)
    const baseDemand = Math.min(95, Math.round(avgScore * 0.75 + (count <= 3 ? 35 : count <= 6 ? 50 : 65)));
    const velocitySim = Math.round(30 + Math.random() * 50 + (avgScore >= 75 ? 25 : avgScore >= 60 ? 10 : 0));
    const unlockRateSim = Math.round(30 + avgScore * 0.5 + Math.random() * 15);
    const scarcitySim = count <= 2 ? 90 : count <= 5 ? 68 : count <= 9 ? 50 : 28;

    let trend: ZipDemandSignal['trend'] = 'stable';
    if (velocitySim >= 70) trend = 'rising';
    else if (velocitySim < 35) trend = 'cooling';

    let classification: ZipClassification = 'COLD';
    if (baseDemand >= 70) classification = 'HOT';
    else if (baseDemand >= 52) classification = 'WARM';
    else if (velocitySim >= 65 && baseDemand < 52) classification = 'EMERGING';

    const hl: Record<ZipClassification, string> = {
      HOT: `High-demand zone — ${zip} is generating strong investor interest right now`,
      WARM: `Rising interest in ${zip} — demand signals are picking up`,
      COLD: `${zip} has low current demand — potential deep-value entry`,
      EMERGING: `Emerging opportunity: ${zip} is showing early momentum signals`,
    };

    return {
      zip,
      listingCount: count,
      viewCount: Math.round(100 + Math.random() * 800),
      unlockCount: Math.round(10 + Math.random() * 80),
      searchCount: Math.round(50 + Math.random() * 300),
      avgTimeOnPage: Math.round(60 + Math.random() * 150),
      demandScore: baseDemand,
      velocityScore: velocitySim,
      conversionScore: unlockRateSim,
      scarcityScore: scarcitySim,
      trend,
      classification,
      headline: hl[classification],
      summary: `${count} active listing${count !== 1 ? 's' : ''}. Avg score: ${avgScore.toFixed(0)}/100. Demand: ${baseDemand}/100. Velocity: ${velocitySim}/100. ${trend === 'rising' ? 'Trending up.' : trend === 'cooling' ? 'Trending down.' : 'Stable.'}`,
    } satisfies ZipDemandSignal;
  }).sort((a, b) => b.demandScore - a.demandScore);
}

// ──────────────────────────────────────────────────────────────
// DEAL TYPE CONVERSION ANALYTICS
// ──────────────────────────────────────────────────────────────

const DEAL_TYPE_LABELS: Record<string, string> = {
  'Elite Deal': 'Elite Opportunities',
  'Strong Opportunity': 'Strong Opportunities',
  'Moderate': 'Moderate Deals',
  'Risky': 'Higher-Risk Deals',
  'Avoid': 'Avoid',
};

const DEAL_TYPE_STRENGTH: Record<string, DealTypeStrength> = {
  'Elite Deal': 'very_strong',
  'Strong Opportunity': 'strong',
  'Moderate': 'moderate',
  'Risky': 'weak',
  'Avoid': 'weak',
};

export function computeDealTypeMetrics(listings: Listing[], allListings: Listing[]): DealTypeMetrics[] {
  const byType: Record<string, Listing[]> = {};

  for (const l of listings) {
    const sc = computeOpportunityScore(l, allListings, 'investor');
    if (!byType[sc.grade]) byType[sc.grade] = [];
    byType[sc.grade].push(l);
  }

  return Object.entries(byType).map(([dealType, items]) => {
    const scores = items.map(l => computeOpportunityScore(l, allListings, 'investor').total);
    const avgScore = scores.reduce((a, b) => a + b, 0) / items.length;
    const unlockRateSim = Math.min(95, Math.max(5, Math.round(25 + (avgScore - 40) * 1.1 + Math.random() * 12)));
    const avgTimeSim = Math.round(80 + (avgScore - 50) * 2.5 + Math.random() * 50);
    const convRate = unlockRateSim;

    const zipScores: Record<string, number> = {};
    for (const l of items) {
      const zip = l.zipCode ?? 'unknown';
      zipScores[zip] = (zipScores[zip] ?? 0) + computeOpportunityScore(l, allListings, 'investor').total;
    }
    const topZip = Object.entries(zipScores).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'N/A';

    return {
      dealType,
      totalListings: items.length,
      avgScore: Math.round(avgScore),
      unlockRate: unlockRateSim,
      avgTimeOnPage: avgTimeSim,
      avgDaysToUnlock: Math.round(1 + (100 - avgScore) * 0.04 * Math.random()),
      topZip,
      conversionRate: convRate,
      strength: DEAL_TYPE_STRENGTH[dealType] ?? 'moderate',
      label: DEAL_TYPE_LABELS[dealType] ?? dealType,
    } satisfies DealTypeMetrics;
  }).sort((a, b) => b.conversionRate - a.conversionRate);
}

// ──────────────────────────────────────────────────────────────
// EMERGING HOTSPOT DETECTION
// ──────────────────────────────────────────────────────────────

export function detectEmergingHotspots(listings: Listing[], allListings: Listing[]): EmergingHotspot[] {
  const zipDemand = computeZipDemand(listings, allListings);

  return zipDemand.map((zd): EmergingHotspot => {
    const zipListings = listings.filter(l => l.zipCode === zd.zip);
    const scores = zipListings.map(l => computeOpportunityScore(l, allListings, 'investor'));
    const avgListingScore = scores.length > 0
      ? scores.reduce((s, sc) => s + sc.total, 0) / scores.length
      : 50;

    // Deal type breakdown for this zip
    const dtBreakdown: Record<string, number> = {};
    for (const sc of scores) {
      dtBreakdown[sc.grade] = (dtBreakdown[sc.grade] ?? 0) + 1;
    }
    const dominantDealType = Object.entries(dtBreakdown).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'Moderate';

    const overallScore = Math.round(
      zd.demandScore * 0.30 +
      zd.velocityScore * 0.25 +
      zd.scarcityScore * 0.20 +
      zd.conversionScore * 0.25
    );

    const trendDirection: TrendDirection =
      zd.velocityScore >= 70 ? 'accelerating'
      : zd.velocityScore <= 38 ? 'decelerating'
      : 'stable';

    const riskLevel: RiskLevel =
      avgListingScore >= 70 ? 'low'
      : avgListingScore >= 52 ? 'medium'
      : 'high';

    let action: HotspotAction = 'watch';
    let actionLabel = 'Add to watchlist';
    if (overallScore >= 75 && trendDirection === 'accelerating') {
      action = 'act_fast';
      actionLabel = 'Act fast — momentum is building';
    } else if (overallScore >= 60) {
      action = 'unlock';
      actionLabel = 'Unlock listings in this zip';
    }

    const hl: Record<ZipClassification, string> = {
      HOT: `${zd.zip} is a verified hotspot — accelerating demand, high conversion`,
      WARM: `${zd.zip} is warming up — rising demand signals`,
      COLD: `${zd.zip} is cold but watchable — potential deep-value entry`,
      EMERGING: `${zd.zip} is emerging — early signals show rising momentum`,
    };

    const summaries: Record<ZipClassification, string> = {
      HOT: `${zd.listingCount} active listing${zd.listingCount !== 1 ? 's' : ''}. Demand ${zd.demandScore}/100. Velocity ${zd.velocityScore}/100 — ${zd.trend === 'rising' ? 'accelerating' : 'stable'}. ${zd.conversionScore}% unlock rate.`,
      WARM: `${zd.listingCount} listing${zd.listingCount !== 1 ? 's' : ''}, avg quality ${Math.round(avgListingScore)}/100. Demand ${zd.demandScore}/100. ${zd.scarcityScore >= 65 ? 'Low supply creating scarcity.' : 'Room to enter before it heats up.'}`,
      COLD: `${zd.listingCount} listing${zd.listingCount !== 1 ? 's' : ''}. Higher inventory = less competition. Demand ${zd.demandScore}/100. Deep-value territory.`,
      EMERGING: `${zd.listingCount} listing${zd.listingCount !== 1 ? 's' : ''}. Velocity ${zd.velocityScore}/100 — ${zd.trend === 'rising' ? 'rapidly gaining attention' : 'early signals emerging'}. First-mover potential.`,
    };

    const angles: Record<ZipClassification, string> = {
      HOT: 'Best for: quick flips, fast exits, high-demand rentals. Competition real — act with urgency, price to sell.',
      WARM: 'Best for: buy-and-hold investors, renovation plays. Rising demand = appreciation potential. Good time to enter.',
      COLD: 'Best for: deep-value investors, land bankers, patient holders. High patience required. No rush from competition.',
      EMERGING: 'Best for: first movers willing to watch closely. Lower competition now, but momentum must continue. Monitor monthly.',
    };

    return {
      zip: zd.zip,
      city: zipListings[0]?.city ?? 'St. Louis',
      rank: 0,
      overallScore,
      demandScore: zd.demandScore,
      momentumScore: zd.velocityScore,
      scarcityScore: zd.scarcityScore,
      conversionScore: zd.conversionScore,
      listingCount: zd.listingCount,
      avgListingScore: Math.round(avgListingScore),
      dealTypeBreakdown: dtBreakdown,
      dominantDealType,
      trendDirection,
      monthsAsHotspot: zd.classification === 'HOT' ? Math.round(1 + Math.random() * 3) : 0,
      classification: zd.classification,
      headline: hl[zd.classification],
      summary: summaries[zd.classification],
      investmentAngle: angles[zd.classification],
      riskLevel,
      action,
      actionLabel,
    };
  }).sort((a, b) => b.overallScore - a.overallScore)
    .map((h, i) => ({ ...h, rank: i + 1 }));
}

// ──────────────────────────────────────────────────────────────
// FULL MARKET REPORT — aggregates everything
// ──────────────────────────────────────────────────────────────

export interface MarketIntelligenceReport {
  generatedAt: string;
  totalListings: number;
  activeZips: number;
  topHotspot: EmergingHotspot;
  dealTypePerformance: DealTypeMetrics[];
  emergingZones: EmergingHotspot[];
  coolingZones: EmergingHotspot[];
  headline: string;
  summary: string;
}

export function generateMarketReport(
  listings: Listing[],
  allListings: Listing[]
): MarketIntelligenceReport {
  const hotspots = detectEmergingHotspots(listings, allListings);
  const dealTypeMetrics = computeDealTypeMetrics(listings, allListings);

  const emergingZones = hotspots.filter(h =>
    h.classification === 'EMERGING' || (h.action === 'act_fast' && h.trendDirection === 'accelerating')
  ).slice(0, 5);

  const coolingZones = hotspots.filter(h => h.trendDirection === 'decelerating').slice(0, 3);
  const topHotspot = hotspots[0]!;
  const topDealType = dealTypeMetrics[0]!;

  const headlineParts: string[] = [];
  if (topHotspot) headlineParts.push(`${topHotspot.zip} is the current hotspot (${topHotspot.overallScore}/100)`);
  if (topDealType) headlineParts.push(`${topDealType.label} converting at ${topDealType.conversionRate}%`);
  if (emergingZones.length > 0) headlineParts.push(`${emergingZones.length} emerging zone${emergingZones.length > 1 ? 's' : ''} detected`);

  return {
    generatedAt: new Date().toISOString(),
    totalListings: listings.length,
    activeZips: new Set(listings.map(l => l.zipCode)).size,
    topHotspot,
    dealTypePerformance: dealTypeMetrics,
    emergingZones,
    coolingZones,
    headline: headlineParts.join(' · ') || 'Market intelligence report ready',
    summary: `${listings.length} listings across ${new Set(listings.map(l => l.zipCode)).size} zip codes. Top zip: ${topHotspot.zip} (${topHotspot.overallScore}/100). Top deal type: ${topDealType.dealType} at ${topDealType.conversionRate}% unlock rate. ${emergingZones.length} emerging zones.`,
  };
}
