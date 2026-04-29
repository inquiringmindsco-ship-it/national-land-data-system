'use client';

import { Listing } from '@/lib/types';

const fmt = (c: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(c / 100);

const TYPE_COLORS: Record<string, { bg: string; badge: string }> = {
  TAX_DEED_EQUIVALENT: { bg: 'bg-red-950', badge: 'bg-red-900 text-red-200' },
  TAX_LIEN: { bg: 'bg-amber-950', badge: 'bg-amber-900 text-amber-200' },
  GOVERNMENT_LAND: { bg: 'bg-blue-950', badge: 'bg-blue-900 text-blue-200' },
};

export function StandardCard({
  listing,
  onViewSource,
  score,
  grade,
  gradeEmoji,
  showScore = false,
}: {
  listing: Listing;
  onViewSource?: (sourceName: string, sourceUrl: string) => void;
  score?: number;
  grade?: string;
  gradeEmoji?: string;
  showScore?: boolean;
}) {
  const colors = TYPE_COLORS[listing.propertyType] ?? { bg: 'bg-gray-900', badge: 'bg-gray-800 text-gray-200' };

  const scoreColor = score == null ? 'text-gray-500'
    : score >= 75 ? 'text-emerald-400'
    : score >= 60 ? 'text-amber-400'
    : 'text-red-400';

  const handleViewSource = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onViewSource && listing.sourceLink && listing.sourceName) {
      onViewSource(listing.sourceName, listing.sourceLink);
    } else if (listing.sourceLink) {
      window.open(listing.sourceLink, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className={`${colors.bg} border border-gray-800 rounded-xl p-5`}>
      <div className="flex items-start justify-between mb-3">
        <span className={`text-xs px-2 py-1 rounded-full ${colors.badge}`}>{listing.originalLabel}</span>
        <div className="flex items-center gap-2">
          {showScore && score != null && (
            <span className={`text-xs font-bold ${scoreColor}`}>{gradeEmoji} {score}/100</span>
          )}
          {listing.auctionDate && (
            <span className="text-xs text-gray-400">{new Date(listing.auctionDate).toLocaleDateString()}</span>
          )}
        </div>
      </div>
      <h3 className="text-white font-semibold text-lg mb-1">{listing.address}</h3>
      <p className="text-gray-400 text-sm mb-3">{listing.city}, {listing.state}</p>
      {listing.normalizedSummary && (
        <p className="text-sm text-gray-300 mb-4">{listing.normalizedSummary}</p>
      )}
      <div className="border-t border-gray-800 pt-3">
        {listing.price ? (
          <span className="text-2xl font-bold text-white">{fmt(listing.price)}</span>
        ) : listing.startingBid ? (
          <div>
            <span className="text-gray-400 text-sm">Starting bid: </span>
            <span className="text-white font-semibold">{fmt(listing.startingBid)}</span>
          </div>
        ) : (
          <span className="text-gray-400 text-sm">Price TBD</span>
        )}
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-gray-500 text-xs">{listing.sourceName}</span>
        {listing.sourceLink && (
          <button
            onClick={handleViewSource}
            className="text-emerald-400 hover:text-emerald-300 text-xs font-medium cursor-pointer"
          >
            View Source →
          </button>
        )}
      </div>
    </div>
  );
}
