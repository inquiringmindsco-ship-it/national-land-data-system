'use client';

import { useEffect, useState } from 'react';
import { Listing } from '@/lib/types';
import { OpportunityScore } from '@/lib/proprietary/parcel-intelligence';
import { StLouisCard } from '@/components/StLouisCard';

interface Props {
  scored: { listing: Listing; score: OpportunityScore }[];
}

export function DealsGrid({ scored }: Props) {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    const check = () => {
      const hasSession = !!localStorage.getItem('nlds_session_id');
      const isTestDrive = !!sessionStorage.getItem('nlds_test_drive');
      const params = new URLSearchParams(window.location.search);
      setUnlocked(hasSession || isTestDrive || params.get('test_drive') === '1');
    };
    check();
    window.addEventListener('storage', check);
    const interval = setInterval(check, 30_000);
    return () => {
      window.removeEventListener('storage', check);
      clearInterval(interval);
    };
  }, []);

  if (unlocked) {
    return (
      <section className="max-w-6xl mx-auto px-4 pb-8">
        <div className="bg-emerald-950/30 border border-emerald-900 rounded-xl px-4 py-2 mb-6 flex items-center justify-between">
          <span className="text-emerald-400 text-sm font-medium">
            🔓 Full access unlocked — all {scored.length} deals visible
          </span>
          <a href="/unlock" className="text-gray-400 text-xs hover:text-white">View tiers →</a>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {scored.map(({ listing }) => (
            <StLouisCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-4 pb-8">
      <div className="border border-gray-800 rounded-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-white font-bold">Complete Deal Set</h2>
            <p className="text-gray-500 text-xs">{scored.length} more deals — full scores + acquisition paths</p>
          </div>
          <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            Unlock to view all {scored.length} deals
          </div>
        </div>

        {/* Blurred preview */}
        <div className="p-6 bg-black/40">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 filter blur-md select-none pointer-events-none opacity-30">
            {scored.slice(0, 6).map(({ listing }) => (
              <div key={listing.id} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                <div className="text-white font-bold text-sm mb-1">{listing.address}</div>
                <div className="text-gray-500 text-xs">{listing.city}, {listing.state}</div>
                <div className="text-gray-500 text-xs mt-2">Score: --</div>
              </div>
            ))}
          </div>
        </div>

        {/* Access overlay */}
        <div className="bg-gradient-to-t from-black via-black/90 to-transparent pt-16 pb-8 px-6 text-center">
          <div className="max-w-md mx-auto">
            <p className="text-white font-bold text-lg mb-2">
              {scored.length} more deals in the full set
            </p>
            <p className="text-gray-400 text-sm mb-5">
              Full scores, acquisition pathways, risk warnings, and strategic insights — all included with your unlock.
            </p>
            <a
              href="/unlock"
              className="inline-block px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-colors text-sm"
            >
              Unlock Full Access — $5–11
            </a>
            <p className="text-gray-400 text-xs mt-3">No subscription. One-time payment.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
