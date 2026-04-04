'use client';

import { Listing } from '@/lib/types';
import { formatCents } from '@/lib/types';

const TYPE_COLORS: Record<string, { bg: string; text: string; badge: string }> = {
  TAX_DEED_EQUIVALENT: { bg: 'bg-red-950', text: 'text-red-300', badge: 'bg-red-900 text-red-200' },
  TAX_LIEN: { bg: 'bg-amber-950', text: 'text-amber-300', badge: 'bg-amber-900 text-amber-200' },
  GOVERNMENT_LAND: { bg: 'bg-blue-950', text: 'text-blue-300', badge: 'bg-blue-900 text-blue-200' },
};

const TYPE_LABELS: Record<string, string> = {
  TAX_DEED_EQUIVALENT: 'Tax Deed / Sheriff Sale',
  TAX_LIEN: 'Tax Lien',
  GOVERNMENT_LAND: 'Land Bank / Gov',
};

interface Props {
  listings: Listing[];
}

export function ListingGrid({ listings }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {listings.map(listing => {
        const colors = TYPE_COLORS[listing.propertyType] ?? TYPE_COLORS.TAX_DEED_EQUIVALENT;
        return (
          <div key={listing.id} className={`${colors.bg} border border-gray-800 rounded-xl p-5 hover:border-gray-600 transition-all`}>
            {/* Type Badge */}
            <div className="flex items-start justify-between mb-3">
              <span className={`text-xs px-2 py-1 rounded-full ${colors.badge}`}>
                {TYPE_LABELS[listing.propertyType]}
              </span>
              {listing.auctionDate && (
                <span className="text-xs text-gray-400">
                  {new Date(listing.auctionDate).toLocaleDateString()}
                </span>
              )}
            </div>

            {/* Address */}
            <h3 className="text-white font-semibold text-lg mb-1">{listing.address}</h3>
            <p className="text-gray-400 text-sm mb-3">{listing.city}, {listing.state}</p>

            {/* Summary */}
            <p className={`text-sm mb-4 ${colors.text}`}>{listing.normalizedSummary}</p>

            {/* Price */}
            <div className="border-t border-gray-800 pt-3">
              {listing.price ? (
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-white">{formatCents(listing.price)}</span>
                  {listing.startingBid && listing.startingBid !== listing.price && (
                    <span className="text-gray-500 text-sm line-through">{formatCents(listing.startingBid)}</span>
                  )}
                </div>
              ) : listing.startingBid ? (
                <div>
                  <span className="text-gray-400 text-sm">Starting bid: </span>
                  <span className="text-white font-semibold">{formatCents(listing.startingBid)}</span>
                </div>
              ) : (
                <span className="text-gray-400 text-sm">Price TBD</span>
              )}
            </div>

            {/* Source */}
            <div className="mt-3 flex items-center justify-between">
              <span className="text-gray-500 text-xs">{listing.sourceName}</span>
              {listing.sourceLink && (
                <a
                  href={listing.sourceLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 text-xs font-medium"
                >
                  View Source →
                </a>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
