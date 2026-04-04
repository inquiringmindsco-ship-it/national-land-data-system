'use client';

import { useEffect, useState } from 'react';
import { PreviewCard } from './PreviewCard';
import { DealsGrid } from './DealsGrid';
import { EmergingHotspotsPanel } from './EmergingHotspotsPanel';
import type { OpportunityScore } from '@/lib/proprietary/parcel-intelligence';
import type { Listing } from '@/lib/types';
import type { EmergingHotspot, MarketIntelligenceReport } from '@/lib/proprietary/market-intelligence';

interface DealDropCandidate {
  listing: Listing;
  score: OpportunityScore;
  totalScore: number;
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

interface DealDrop {
  id: string;
  cycleLabel: string;
  generatedAt: string;
  totalListingsScanned: number;
  selectedDeals: DealDropCandidate[];
  previewDeals: DealDropCandidate[];
  report: {
    avgScore: number;
    topZip: string;
    emergingZone: string;
    operatorNote: string;
    actionUrgency: string;
    scarcityInsight: string;
    scanSummary: string;
    topDealType: string;
  };
}

interface DealsPageClientProps {
  hotspots: EmergingHotspot[];
  marketReport: MarketIntelligenceReport;
  totalCount: number;
}

export function DealsPageClient({ hotspots, marketReport, totalCount }: DealsPageClientProps) {
  const [dealDrop, setDealDrop] = useState<DealDrop | null>(null);
  const [loading, setLoading] = useState(true);
  const [dealDropStale, setDealDropStale] = useState(false);
  const [testDriving, setTestDriving] = useState(false);

  // Check URL for test_drive=1 (from AccessSection dev button)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('test_drive') === '1' || sessionStorage.getItem('nlds_test_drive') === '1') {
        setTestDriving(true);
      }
    }
  }, []);

  useEffect(() => {
    // Fetch current deal drop — uses server-side generated data
    fetch('/api/deal-drop')
      .then(r => r.json())
      .then(data => {
        if (data.drop) {
          setDealDrop(data.drop);
          // Check if stale (> 7 days)
          const gen = new Date(data.drop.generatedAt).getTime();
          const now = Date.now();
          if (now - gen > 7 * 24 * 60 * 60 * 1000) setDealDropStale(true);
        }
      })
      .catch(() => {/* Use server-rendered data */}
      )
      .finally(() => setLoading(false));

    // Track page view
    track('page_view', { page: '/deals' });
  }, []);

  return (
    <>
      {/* Deal Drop cycle indicator */}
      {dealDrop && (
        <div className="bg-gray-950 border-b border-gray-800 px-4 py-2">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span className="bg-emerald-900 text-emerald-300 px-2 py-0.5 rounded-full text-xs font-bold">
                LIVE
              </span>
              <span>
                Deal drop: <span className="text-white font-medium">{dealDrop.cycleLabel}</span>
                {dealDropStale && (
                  <span className="text-amber-400 ml-2">· Stale — refreshing soon</span>
                )}
              </span>
              <span>·</span>
              <span>{dealDrop.totalListingsScanned} scanned</span>
              <span>·</span>
              <span>
                Avg score: <span className="text-emerald-400 font-bold">{dealDrop.report.avgScore}/100</span>
              </span>
            </div>
            <div className="text-xs text-gray-400">
              Top zip: <span className="text-gray-400">{dealDrop.report.topZip}</span>
            </div>
          </div>
        </div>
      )}

      {/* Preview grid — from deal drop or server fallback */}
      <section className="max-w-6xl mx-auto px-4 pt-12 pb-4">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <h2 className="text-2xl font-bold text-white">
              {loading ? 'Loading...' : dealDrop ? "This Week's Top Opportunities" : "Tonight's Top Opportunities"}
            </h2>
          </div>
          <p className="text-gray-400 text-sm">
            {loading
              ? 'Selecting best deals...'
              : dealDrop
              ? 'Auto-selected by Parcel Intelligence Engine™ — highest-scoring deals this cycle'
              : 'Ranked by Parcel Intelligence Engine™ — highest-scoring deals first'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {(dealDrop?.previewDeals ?? []).length > 0
            ? dealDrop!.previewDeals.map(({ listing, score }) => (
                <PreviewCard key={listing.id} listing={listing} score={score} />
              ))
            : null /* Server renders preview cards via server component */
          }
        </div>

        {!loading && (!dealDrop || dealDrop.previewDeals.length === 0) && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Shown during initial load — server component renders these */}
          </div>
        )}

        {/* Test Drive banner */}
        {testDriving && (
          <div className="bg-amber-900/40 border border-amber-700 rounded-xl px-4 py-3 mb-6 text-center">
            <span className="text-amber-300 text-sm font-medium">
              🚗 Test Drive Mode — You&apos;re seeing the full member experience
              <button
                onClick={() => setTestDriving(false)}
                className="ml-4 text-amber-500 hover:text-amber-400 underline text-xs"
              >
                Exit test drive
              </button>
            </span>
          </div>
        )}

        <div className="text-center text-gray-500 text-xs mb-4">
          {dealDrop
            ? testDriving
              ? `All ${totalCount} deals visible — full member access`
              : `${totalCount - dealDrop.previewDeals.length} more deals in the full set`
            : `Preview. ${totalCount - 3} more deals available after unlock.`}
        </div>
      </section>
    </>
  );
}

// ──────────────────────────────────────────────────────────────
// ANALYTICS TRACKING — called from all interactive components
// ──────────────────────────────────────────────────────────────

const ANALYTICS_ENDPOINT = '/api/analytics';

export function track(
  event: string,
  data: Record<string, unknown> = {}
) {
  try {
    const sessionId = sessionStorage.getItem('nlds_session_id') ?? undefined;
    fetch(ANALYTICS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event, sessionId, ...data }),
    }).catch(() => {/* non-blocking */});
  } catch {
    // analytics failure is never visible to user
  }
}

export function trackListingView(listingId: string, address: string, score: number, zip?: string) {
  track('listing_view', { listingId, listingAddress: address, score, zip });
}

export function trackUnlockClick(tier: string) {
  track('unlock_click', { tier, page: '/deals' });
}

export function trackZipView(zip: string) {
  track('zip_view', { zip });
}

export function trackDealTypeView(dealType: string) {
  track('dealtype_view', { dealType });
}

export function trackSearch(query: string) {
  track('search', { query });
}

export function trackSignalView(signal: string, zip?: string) {
  track('signal_view', { signal, zip });
}
