import { Metadata } from 'next';
export const dynamic = 'force-dynamic';
import { STLOUIS_LISTINGS } from '@/data/stlouis-listings';
import { TAX_SALE_LISTINGS } from '@/data/tax-sale-listings';
import { STLOUIS_COUNTY_POST3_LISTINGS } from '@/data/stlouis-county-post3';
import { computeOpportunityScore } from '@/lib/proprietary/parcel-intelligence';
import { detectEmergingHotspots, generateMarketReport } from '@/lib/proprietary/market-intelligence';
import { TopDealsHero } from '@/components/top-deals/Hero';
import { PreviewCard } from '@/components/top-deals/PreviewCard';
import { StLouisCard } from '@/components/StLouisCard';
import { DealsGrid } from '@/components/top-deals/DealsGrid';
import { EmergingHotspotsPanel } from '@/components/top-deals/EmergingHotspotsPanel';
import { WhatYouGet } from '@/components/top-deals/WhatYouGet';
import { CredibilitySection } from '@/components/top-deals/CredibilitySection';
import { RepeatVisitSection } from '@/components/top-deals/RepeatVisitSection';
import { TopDealsSchema } from '@/components/top-deals/TopDealsSchema';
import { EmailCapture } from '@/components/EmailCapture';
import { ReferralBlock } from '@/components/top-deals/ReferralBlock';
import { AccessSection } from '@/components/top-deals/AccessSection';

export const metadata: Metadata = {
  title: 'Top Land Deals — St. Louis | National Land Data System',
  description:
    'Hidden land deals in St. Louis, MO. Tax sales, LRA properties, and overlooked opportunities — scored, translated, and ranked. No subscription. Pay once.',
};

export default function TopDealsPage() {
  const ALL_LISTINGS = [...STLOUIS_LISTINGS, ...TAX_SALE_LISTINGS, ...STLOUIS_COUNTY_POST3_LISTINGS];
  const scored = ALL_LISTINGS.map(l => ({
    listing: l,
    score: computeOpportunityScore(l, ALL_LISTINGS, 'investor'),
  }));
  scored.sort((a, b) => b.score.total - a.score.total);

  // Show top 30 as the freely accessible preview set
  const FREE_PREVIEW = 30;
  const freeListings = scored.slice(0, FREE_PREVIEW);
  const remainingCount = Math.max(0, scored.length - FREE_PREVIEW);
  const totalCount = ALL_LISTINGS.length;
  const hotspots = detectEmergingHotspots(ALL_LISTINGS, ALL_LISTINGS);
  const marketReport = generateMarketReport(ALL_LISTINGS, ALL_LISTINGS);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Slim nav */}
      <div className="border-b border-gray-800 bg-black/80 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="/" className="text-white font-bold text-lg hover:text-emerald-400 transition-colors">NLDS</a>
            <a href="/deals" className="text-emerald-400 text-sm font-medium">Deals</a>
            <a href="/learn" className="text-gray-400 hover:text-white text-sm transition-colors">Learn</a>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-500">{totalCount} properties</span>
            <a href="/unlock" className="text-xs px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full transition-colors">
              Unlock All
            </a>
          </div>
        </div>
      </div>

      <TopDealsSchema deals={scored.slice(0, 5)} />
      <TopDealsHero totalCount={totalCount} />

      {/* Email capture — above the fold, primary conversion */}
      <EmailCapture />

      {/* Trust bar */}
      <div className="bg-emerald-950/40 border-y border-emerald-900/50 px-4 py-2">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-6 text-xs text-emerald-300/70">
          <span>🔍 {totalCount} properties from public records</span>
          <span>📊 Scored by Parcel Intelligence Engine™</span>
          <span>🏛️ Government data — translated</span>
        </div>
      </div>

      {/* ── FREE SECTION: Top 30 deals ─────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 pt-12 pb-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">
              St. Louis Land Opportunities
            </h2>
            <p className="text-gray-500 text-sm">
              Showing {FREE_PREVIEW} of {totalCount} — ranked by opportunity score
            </p>
          </div>
          <a
            href="/unlock"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-sm transition-colors"
          >
            Unlock all {totalCount} deals
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {freeListings.map(({ listing, score }) => (
            <StLouisCard key={listing.id} listing={listing} allListings={ALL_LISTINGS} />
          ))}
        </div>

        {/* Show count of remaining */}
        {remainingCount > 0 && (
          <div className="text-center mt-8 py-6 border-t border-gray-800">
            <p className="text-gray-400 text-sm mb-4">
              {remainingCount.toLocaleString()} more deals in the full set — scored and translated
            </p>
          </div>
        )}
      </section>

      {/* ── REMAINING DEALS — gated ────────────────────────────────── */}
      {remainingCount > 0 && (
        <DealsGrid scored={scored.slice(FREE_PREVIEW)} />
      )}

      {/* ── ACCESS SECTION ──────────────────────────────────────────── */}
      <AccessSection totalCount={totalCount} />

      {/* Referral block */}
      <ReferralBlock />

      {/* Market Intelligence */}
      <EmergingHotspotsPanel hotspots={hotspots} report={marketReport} />

      <WhatYouGet />
      <CredibilitySection />
      <RepeatVisitSection />

      <footer className="border-t border-gray-800 py-8 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-500 text-xs space-y-2">
          <p>National Land Data System™ — A Porterful Labs Product</p>
          <p>St. Louis, MO · Built {new Date().getFullYear()} · Data from public records</p>
          <div className="flex justify-center gap-4 pt-2">
            <a href="/unlock" className="text-emerald-400 hover:text-emerald-300 transition-colors">Unlock Access</a>
            <a href="/learn" className="text-gray-400 hover:text-gray-300 transition-colors">Learn</a>
            <a href="/" className="text-gray-400 hover:text-gray-300 transition-colors">Home</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
