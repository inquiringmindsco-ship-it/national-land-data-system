// ============================================================
// AUTONOMOUS DEAL DROP ENGINE™
// Runs on cron: selects top deals, generates content, preps email
// Zero-manual mode: operator intervenes only for upgrades
// ============================================================

import type { Listing } from '../types';
import { computeOpportunityScore } from './parcel-intelligence';
import { detectEmergingHotspots } from './market-intelligence';

// ──────────────────────────────────────────────────────────────
// DEAL DROP SELECTION — the "autonomous buyer" algorithm
// ──────────────────────────────────────────────────────────────

export interface DealDropCandidate {
  listing: Listing;
  score: ReturnType<typeof computeOpportunityScore>;
  // Selection scores
  totalScore: number;          // composite for ranking
  scarcityBonus: number;       // scarcity signal
  earlyDiscoveryBonus: number; // early discovery signal
  timeSensitivityBonus: number; // urgency bonus
  // Content
  headline: string;
  oneLiner: string;
  summary: string;
  bestFor: string[];
  watchOut: string;
  angle: string;
  dealType: string;
  grade: string;
  gradeEmoji: string;
}

export interface DealDropSet {
  id: string;                 // e.g. "stlouis-2026-04-07"
  generatedAt: string;
  city: string;
  state: string;
  cycleLabel: string;         // "Week of Apr 7, 2026"
  totalListingsScanned: number;
  // Preview deals (top 3 free)
  previewDeals: DealDropCandidate[];
  // All selected deals (top 5)
  selectedDeals: DealDropCandidate[];
  // Report
  report: DealDropReport;
}

export interface DealDropReport {
  scanSummary: string;
  topZip: string;
  avgScore: number;
  topDealType: string;
  scarcityInsight: string;
  emergingZone: string;
  actionUrgency: 'high' | 'medium' | 'low';
  operatorNote: string;        // note to operator if manual action needed
}

// ──────────────────────────────────────────────────────────────
// CONTENT GENERATION — per deal
// ──────────────────────────────────────────────────────────────

function generateDealContent(
  candidate: DealDropCandidate,
  rank: number
): DealDropCandidate {
  const { listing, score } = candidate;
  const fmt = (c: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(c / 100);

  const zip = listing.zipCode ?? '';
  const price = listing.price ?? listing.startingBid ?? 0;

  // Headlines
  const priceTag = price > 0 ? fmt(price) : 'TBD';
  const depthPct = score.signals.value;
  const headlineTemplates = [
    `${depthPct}% Below Market — ${listing.address}`,
    `${listing.address} — ${score.gradeEmoji} ${score.grade} — ${priceTag}`,
    `${listing.city} Deal #${rank}: ${listing.address}`,
    `${listing.zipCode} Zip Code — ${score.insight.headline}`,
  ];

  // Ranked headline: #1 gets the best, lower ranks get explanatory headlines
  const headline = rank === 1
    ? `🔥 Top Pick: ${listing.address} — ${priceTag} (${depthPct}% below market)`
    : rank === 2
    ? `${listing.address} — ${fmt(price)} in ${listing.city}`
    : `${score.insight.headline}`;

  // One-liner for email preview
  const oneLiners = [
    `${depthPct}% below market. Score: ${score.total}/100. ${score.insight.angle.split('|')[0]}.`,
    `${score.grade} — ${priceTag}. ${score.signals.momentum >= 70 ? 'High-momentum area.' : ''} ${score.signals.scarcity >= 70 ? 'Few similar deals available.' : ''}`,
    `${listing.address} (${zip}). ${listing.occupancyStatus === 'vacant' ? '✓ Vacant.' : ''} ${listing.auctionDate ? `Auction ${new Date(listing.auctionDate).toLocaleDateString()}.` : ''}`,
  ];

  // Summary paragraph for email
  const summary = `Property at ${listing.address}, ${listing.city}, MO ${zip}. ` +
    `Listed at ${priceTag} on a property worth an estimated ${fmt(listing.assessedValue ?? price * 3)}. ` +
    `${score.why}. ` +
    `${listing.occupancyStatus === 'vacant' ? 'Confirmed vacant — no tenant complications.' : listing.occupancyStatus === 'occupied' ? 'Verify occupancy before closing.' : 'Occupancy status unknown — verify before bidding.'} ` +
    `${listing.auctionDate ? `Auction date: ${new Date(listing.auctionDate).toLocaleDateString()}.` : 'No scheduled auction — standard close timeline.'}`;

  // Watch-out
  let watchOut = score.insight.watchOut;
  if (score.signals.timeSensitivity >= 80) {
    watchOut = `⏰ Auction imminent — must act within ${Math.ceil((new Date(listing.auctionDate ?? 0).getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days. Full due diligence may not be possible. ` + watchOut;
  }
  if (score.signals.earlyDiscovery >= 70) {
    watchOut += ' Low public visibility — first-mover advantage. Act before this deal gets more attention.';
  }

  // Best for
  const bestFor = score.insight.bestFor.map(p => p.charAt(0).toUpperCase() + p.slice(1));
  if (score.signals.scarcity >= 75) bestFor.push('Scarcity hunters');
  if (score.signals.momentum >= 75) bestFor.push('Momentum players');
  if (depthPct >= 80) bestFor.push('Deep-value seekers');

  // Marketing angle
  const angleParts: string[] = [];
  if (depthPct >= 70) angleParts.push(`${depthPct}% below market`);
  if (score.signals.scarcity >= 72) angleParts.push(`Fewer than 3 similar listings in ${zip}`);
  if (score.signals.momentum >= 72) angleParts.push(`High-momentum neighborhood`);
  if (score.signals.earlyDiscovery >= 68) angleParts.push('Early discovery — low competition');
  if (score.signals.ease >= 70) angleParts.push('Straightforward LRA/city process');
  if (listing.occupancyStatus === 'vacant') angleParts.push('Confirmed vacant');
  const angle = angleParts.join(' · ') || score.insight.angle;

  return {
    ...candidate,
    headline,
    oneLiner: oneLiners[rank - 1] ?? oneLiners[0]!,
    summary,
    bestFor,
    watchOut,
    angle,
    dealType: score.grade,
    grade: score.grade,
    gradeEmoji: score.gradeEmoji,
  };
}

// ──────────────────────────────────────────────────────────────
// MAIN SELECTION ALGORITHM
// ──────────────────────────────────────────────────────────────

export function runDealDropCycle(
  listings: Listing[],
  cycleLabel?: string
): DealDropSet {
  const now = new Date();
  const cycleId = `stlouis-${now.toISOString().split('T')[0]}`;
  const weekday = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  // Score all listings
  const candidates: DealDropCandidate[] = listings.map(listing => {
    const score = computeOpportunityScore(listing, listings, 'investor');

    // Composite selection score: blend of opportunity score + scarcity + early discovery + time sensitivity
    // This is different from the user-facing opportunity score — optimized for "which deals to show"
    const scarcityBonus = score.signals.scarcity * 0.10;
    const earlyDiscoveryBonus = score.signals.earlyDiscovery * 0.08;
    const timeSensitivityBonus = score.signals.timeSensitivity * 0.07;
    const acquisitionBonus = score.signals.ease >= 70 ? 5 : score.signals.ease < 50 ? -5 : 0;

    const totalScore = Math.round(
      score.total * 0.75 +           // Base opportunity (most weight)
      scarcityBonus +
      earlyDiscoveryBonus +
      timeSensitivityBonus +
      acquisitionBonus
    );

    return {
      listing,
      score,
      totalScore,
      scarcityBonus: Math.round(scarcityBonus),
      earlyDiscoveryBonus: Math.round(earlyDiscoveryBonus),
      timeSensitivityBonus: Math.round(timeSensitivityBonus),
      // Content placeholders — filled below
      headline: '',
      oneLiner: '',
      summary: '',
      bestFor: [],
      watchOut: '',
      angle: '',
      dealType: score.grade,
      grade: score.grade,
      gradeEmoji: score.gradeEmoji,
    };
  });

  // Sort by composite selection score
  candidates.sort((a, b) => b.totalScore - a.totalScore);

  // Select top 5
  const selected = candidates.slice(0, 5);

  // Generate content for each
  const selectedWithContent = selected.map((c, i) => generateDealContent(c, i + 1));

  // Preview = top 3
  const previewDeals = selectedWithContent.slice(0, 3);

  // Market intelligence
  const hotspots = detectEmergingHotspots(listings, listings);
  const topHotspot = hotspots[0];

  // Build report
  const avgScore = Math.round(selected.reduce((s, c) => s + c.totalScore, 0) / selected.length);

  const report: DealDropReport = {
    scanSummary: `Scanned ${listings.length} listings. Selected ${selected.length} top deals. Average composite score: ${avgScore}/100.`,
    topZip: topHotspot?.zip ?? selected[0]?.listing.zipCode ?? 'N/A',
    avgScore,
    topDealType: selected[0]?.dealType ?? 'Strong Opportunity',
    scarcityInsight: topHotspot?.scarcityScore
      ? `${topHotspot.zip} has ${topHotspot.scarcityScore >= 75 ? 'very low' : topHotspot.scarcityScore >= 55 ? 'moderate' : 'high'} listing inventory — ${topHotspot.scarcityScore >= 75 ? 'act fast for best selection' : topHotspot.scarcityScore >= 55 ? 'room to negotiate' : 'competition likely'}`
      : 'Market data unavailable',
    emergingZone: topHotspot?.classification === 'EMERGING'
      ? `${topHotspot.zip} is emerging — early momentum signals detected`
      : topHotspot?.classification === 'HOT'
      ? `${topHotspot.zip} is a verified hotspot (${topHotspot.overallScore}/100)`
      : `${topHotspot?.zip ?? 'N/A'} leads the current cycle`,
    actionUrgency: selected.some(c => c.score.signals.timeSensitivity >= 75)
      ? 'high'
      : selected.some(c => c.score.signals.value >= 75)
      ? 'medium'
      : 'low',
    operatorNote: avgScore >= 80 ? 'High-quality cycle — strong deals, recommend email broadcast.'
      : avgScore >= 65 ? 'Normal cycle — proceed with standard broadcast.'
      : 'Below-average scores — recommend manual review before sending.',
  };

  return {
    id: cycleId,
    generatedAt: now.toISOString(),
    city: 'St. Louis',
    state: 'MO',
    cycleLabel: cycleLabel ?? `Week of ${weekday}`,
    totalListingsScanned: listings.length,
    previewDeals,
    selectedDeals: selectedWithContent,
    report,
  };
}

// ──────────────────────────────────────────────────────────────
// EMAIL TEMPLATE GENERATOR
// ──────────────────────────────────────────────────────────────

export function generateEmailDigest(drop: DealDropSet): { subject: string; html: string; text: string } {
  const { previewDeals, cycleLabel, report } = drop;
  const fmt = (c: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(c / 100);

  const subject = `🔥 Top 5 Land Deals in St. Louis — ${cycleLabel}`;

  const dealsHtml = previewDeals.slice(0, 3).map((deal, i) => {
    const l = deal.listing;
    const price = l.price ?? l.startingBid ?? 0;
    return `
    <div style="background:#111;border:1px solid #333;border-radius:12px;padding:20px;margin-bottom:16px;">
      <div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:12px;">
        <div>
          <div style="font-size:11px;color:#666;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">DEAL ${i + 1} — ${deal.dealType.toUpperCase()}</div>
          <div style="font-size:18px;font-weight:700;color:#fff;">${l.address}</div>
          <div style="font-size:13px;color:#888;">${l.city}, MO ${l.zipCode}</div>
        </div>
        <div style="text-align:right;">
          <div style="font-size:28px;font-weight:800;color:#fff;">${l.price ? fmt(l.price) : l.startingBid ? `From ${fmt(l.startingBid)}` : 'TBD'}</div>
          <div style="font-size:12px;color:#22c55e;background:#022c2a;padding:2px 8px;border-radius:20px;display:inline-block;margin-top:4px;">${deal.score.total}/100</div>
        </div>
      </div>
      <div style="font-size:14px;color:#ccc;margin-bottom:12px;line-height:1.5;">${deal.oneLiner}</div>
      <div style="font-size:13px;color:#f59e0b;margin-bottom:8px;">⚠ ${deal.watchOut.substring(0, 120)}${deal.watchOut.length > 120 ? '...' : ''}</div>
      <div style="font-size:12px;color:#666;">Best for: ${deal.bestFor.slice(0, 3).join(', ')}</div>
      ${l.occupancyStatus === 'vacant' ? '<div style="font-size:11px;color:#22c55e;margin-top:4px;">✓ Confirmed Vacant</div>' : ''}
      ${l.auctionDate ? `<div style="font-size:11px;color:#f59e0b;margin-top:4px;">📅 Auction: ${new Date(l.auctionDate).toLocaleDateString()}</div>` : ''}
      <div style="margin-top:12px;padding-top:12px;border-top:1px solid #333;">
        <a href="${process.env.NEXT_PUBLIC_BASE_URL ?? 'https://nationallanddata.com'}/unlock" style="display:inline-block;background:#059669;color:#fff;font-size:13px;font-weight:700;padding:8px 16px;border-radius:8px;text-decoration:none;">Unlock Full Analysis →</a>
      </div>
    </div>`;
  }).join('');

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background:#000;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#fff;">
  <div style="max-width:600px;margin:0 auto;padding:20px;">
    <!-- Header -->
    <div style="text-align:center;padding:32px 0 24px;border-bottom:1px solid #1a1a1a;">
      <div style="font-size:11px;color:#666;text-transform:uppercase;letter-spacing:2px;margin-bottom:8px;">National Land Data System™</div>
      <h1 style="font-size:28px;font-weight:900;color:#fff;margin:0 0 8px;">Top 5 Land Deals</h1>
      <p style="color:#888;font-size:14px;margin:0;">St. Louis, MO · ${cycleLabel}</p>
    </div>

    <!-- Report strip -->
    <div style="background:#0a0a0a;border:1px solid #1f1f1f;border-radius:12px;padding:16px;margin:20px 0;display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;text-align:center;">
      <div>
        <div style="font-size:22px;font-weight:800;color:#22c55e;">${report.avgScore}</div>
        <div style="font-size:11px;color:#666;">Avg Score</div>
      </div>
      <div>
        <div style="font-size:22px;font-weight:800;color:#fff;">${report.topZip}</div>
        <div style="font-size:11px;color:#666;">Top Zip</div>
      </div>
      <div>
        <div style="font-size:22px;font-weight:800;color:#f59e0b;">${report.emergingZone.split('—')[0].trim()}</div>
        <div style="font-size:11px;color:#666;">Leading Zone</div>
      </div>
    </div>

    <!-- Deals -->
    <div style="margin:24px 0;">
      <div style="font-size:11px;color:#666;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;">This Week's Top 3 (Preview)</div>
      ${dealsHtml}
    </div>

    <!-- CTA -->
    <div style="background:#022c2a;border:1px solid #064e3b;border-radius:16px;padding:24px;text-align:center;margin:24px 0;">
      <div style="font-size:16px;font-weight:700;color:#fff;margin-bottom:6px;">Unlock all 5 deals — plus full acquisition analysis</div>
      <div style="font-size:13px;color:#6b7280;margin-bottom:16px;">Acquisition pathways, risk warnings, government data translation</div>
      <a href="${process.env.NEXT_PUBLIC_BASE_URL ?? 'https://nationallanddata.com'}/unlock" style="display:inline-block;background:#059669;color:#fff;font-size:15px;font-weight:700;padding:14px 28px;border-radius:10px;text-decoration:none;">
        Unlock Full Access — Pay Once from $5 →
      </a>
      <div style="margin-top:12px;font-size:11px;color:#4b5563;">No subscription. No recurring charges.</div>
    </div>

    <!-- Footer -->
    <div style="text-align:center;padding:24px 0;border-top:1px solid #1a1a1a;">
      <p style="font-size:12px;color:#4b5563;margin:0 0 8px;">You're receiving this because you unlocked NLDS.</p>
      <p style="font-size:12px;color:#4b5563;margin:0;">National Land Data System™ — A Porterful Labs Product</p>
    </div>
  </div>
</body>
</html>`;

  const text = `
TOP 5 LAND DEALS — ST. LOUIS, MO — ${cycleLabel.toUpperCase()}
${'='.repeat(50)}

${previewDeals.slice(0, 3).map((deal, i) => {
  const l = deal.listing;
  const price = l.price ?? l.startingBid ?? 0;
  return `
DEAL ${i + 1}: ${l.address}, ${l.city} ${l.zipCode}
Price: ${l.price ? fmt(l.price) : l.startingBid ? `From ${fmt(l.startingBid)}` : 'TBD'}
Score: ${deal.score.total}/100 — ${deal.dealType}
${deal.oneLiner}
${deal.watchOut.substring(0, 150)}
Best for: ${deal.bestFor.slice(0, 3).join(', ')}
${l.occupancyStatus === 'vacant' ? '✓ Vacant' : ''} ${l.auctionDate ? `📅 Auction: ${new Date(l.auctionDate).toLocaleDateString()}` : ''}

Unlock full analysis: ${process.env.NEXT_PUBLIC_BASE_URL ?? 'https://nationallanddata.com'}/unlock
`;
}).join('\n' + '-'.repeat(40) + '\n')}

---
Unlock all 5 deals + full acquisition pathways, risk warnings, and government data translations.
No subscription. Pay once from $5.
${process.env.NEXT_PUBLIC_BASE_URL ?? 'https://nationallanddata.com'}/unlock
`.trim();

  return { subject, html, text };
}

// ──────────────────────────────────────────────────────────────
// PERSISTENCE — save/load current deal drop to JSON
// In production: replace with Supabase
// ──────────────────────────────────────────────────────────────

// ──────────────────────────────────────────────────────────────
// PERSISTENCE — in-memory + optional file (serverless-safe)
// In production: Supabase handles persistence; this is a fallback
// ──────────────────────────────────────────────────────────────

// Global cache survives across requests in the same server instance
declare global {
  // eslint-disable-next-line no-var
  var __nlds_deal_drop: DealDropSet | undefined;
}

export async function saveDealDrop(drop: DealDropSet): Promise<void> {
  // Always save to global (fast, serverless-safe)
  global.__nlds_deal_drop = drop;

  // Try to persist to public JSON for CDN/static serving
  try {
    const { promises: fsp } = await import('fs');
    const publicPath = `${process.cwd()}/public/deal-drop.json`;
    await fsp.mkdir(`${process.cwd()}/public`, { recursive: true });
    await fsp.writeFile(publicPath, JSON.stringify(drop), 'utf-8');
  } catch {
    // Serverless or permission issue — global is sufficient
  }
}

export async function loadDealDrop(): Promise<DealDropSet | null> {
  // Check global first (fastest)
  if (global.__nlds_deal_drop) return global.__nlds_deal_drop;

  // Fallback: try reading from public file
  try {
    const { promises: fsp } = await import('fs');
    const publicPath = `${process.cwd()}/public/deal-drop.json`;
    const data = await fsp.readFile(publicPath, 'utf-8');
    const parsed = JSON.parse(data) as DealDropSet;
    global.__nlds_deal_drop = parsed; // populate global for next request
    return parsed;
  } catch {
    return null;
  }
}
