'use client';

import { useState } from 'react';
import { Listing } from '@/lib/types';
import { OpportunityScore } from '@/lib/proprietary/parcel-intelligence';
import { classifyDeal } from '@/lib/proprietary/deal-classification';
import { PropertyMapPreview } from '@/components/data-pack/PropertyMapPreview';
import { trackListingView, trackUnlockClick } from './DealsPageClient';
import { AcquisitionForm } from '@/components/acquisition/AcquisitionForm';

const fmtCents = (c: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(c / 100);

const GRADE_COLOR: Record<string, string> = {
  'Elite Deal': 'text-emerald-400',
  'Strong Opportunity': 'text-green-400',
  'Moderate': 'text-yellow-400',
  'Risky': 'text-orange-400',
  'Avoid': 'text-red-400',
};
const GRADE_BG: Record<string, string> = {
  'Elite Deal': 'bg-emerald-900 text-emerald-200',
  'Strong Opportunity': 'bg-green-900 text-green-200',
  'Moderate': 'bg-yellow-900 text-yellow-200',
  'Risky': 'bg-orange-900 text-orange-200',
  'Avoid': 'bg-red-900 text-red-200',
};
const DEAL_COLORS: Record<string, string> = {
  'FAST OPPORTUNITY': 'bg-red-900 text-red-200',
  'LONG-TERM HOLD': 'bg-blue-900 text-blue-200',
  'DEVELOPMENT PLAY': 'bg-purple-900 text-purple-200',
  'HIGH RISK': 'bg-amber-900 text-amber-200',
};
const DEAL_EMOJI: Record<string, string> = {
  'FAST OPPORTUNITY': '⚡',
  'LONG-TERM HOLD': '📈',
  'DEVELOPMENT PLAY': '🏗️',
  'HIGH RISK': '⚠️',
};
const SUBCOLORS = ['text-blue-400', 'text-purple-400', 'text-amber-400', 'text-pink-400', 'text-emerald-400'];
const SUBEMOJIS = ['$', '📍', '⚠️', '🔥', '🔧'];
const SUBWEIGHTS = [0.30, 0.20, 0.20, 0.15, 0.15];

interface Props {
  listing: Listing;
  score: OpportunityScore;
}

export function PreviewCard({ listing, score }: Props) {
  const [showAcquisition, setShowAcquisition] = useState(false);
  const classification = classifyDeal(listing);

  return (
    <div
      className="bg-gray-950 border border-gray-800 rounded-2xl overflow-hidden flex flex-col cursor-pointer"
      onClick={() => trackListingView(listing.id, listing.address, score.total, listing.zipCode)}
    >
      {/* Property map preview */}
      <PropertyMapPreview
        listing={listing}
        height={160}
      />

      {/* Card header */}
      <div className="p-5 flex-1">
        {/* Tags row */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-gray-400 font-mono bg-gray-900 px-2 py-0.5 rounded">
            {listing.zipCode}
          </span>
          <div className="flex gap-1.5">
            <span className={`text-xs px-2 py-0.5 rounded-full ${DEAL_COLORS[classification.dealType] ?? 'bg-gray-800 text-gray-400'}`}>
              {DEAL_EMOJI[classification.dealType]} {classification.dealType}
            </span>
          </div>
        </div>

        {/* Address */}
        <h3 className="text-white font-bold text-lg mb-0.5 leading-snug">{listing.address}</h3>
        <p className="text-gray-400 text-xs mb-4">{listing.city}, {listing.state}</p>

        {/* Price */}
        <div className="mb-4">
          {listing.price ? (
            <div className="text-3xl font-black text-white">{fmtCents(listing.price)}</div>
          ) : listing.startingBid ? (
            <div>
              <span className="text-gray-400 text-xs">Starting bid </span>
              <span className="text-2xl font-black text-white">{fmtCents(listing.startingBid)}</span>
            </div>
          ) : (
            <span className="text-xl text-gray-400">Price TBD</span>
          )}
          {listing.assessedValue && (
            <div className="text-xs text-gray-400 mt-0.5">
              Est. value {fmtCents(listing.assessedValue)}
            </div>
          )}
        </div>

        {/* Score + Grade */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className={`text-4xl font-black ${GRADE_COLOR[score.grade]}`}>{score.total}</span>
            <div>
              <div className={`text-xs font-bold px-2 py-0.5 rounded-full inline-block ${GRADE_BG[score.grade]}`}>
                {score.grade}
              </div>
              <div className="text-xs text-gray-400 mt-0.5">Parcel Intelligence™</div>
            </div>
          </div>
        </div>

        {/* Strategic insight summary */}
        <div className="bg-gray-900 rounded-xl p-3 mb-4 border border-gray-800">
          <div className="text-emerald-400 text-xs font-bold tracking-wider mb-1">STRATEGIC INSIGHT</div>
          <p className="text-gray-300 text-sm leading-relaxed">{score.insight.headline}</p>
          <p className="text-gray-400 text-xs mt-1 leading-relaxed line-clamp-2">{score.insight.summary}</p>
        </div>

        {/* 5 Subscore strip */}
        <div className="grid grid-cols-5 gap-1 mb-3">
          {score.subs.map((sub, i) => (
            <div key={sub.label} className="text-center bg-gray-900 rounded-lg p-2">
              <div className={`text-base font-black ${SUBCOLORS[i]}`}>{sub.value}</div>
              <div className="text-gray-400 text-xs mt-0.5">{SUBEMOJIS[i]}</div>
            </div>
          ))}
        </div>
        <div className="flex gap-0.5 px-1 mb-4">
          {score.subs.map((sub, i) => (
            <div key={sub.label} className="flex-1" style={{ height: '3px', background: sub.value >= 70 ? '#22c55e' : sub.value >= 50 ? '#eab308' : '#ef4444', borderRadius: '2px' }} />
          ))}
        </div>
        <div className="text-xs text-gray-400 text-center mb-3">Value · Location · Risk · Demand · Ease</div>

        {/* Key flags */}
        <div className="flex flex-wrap gap-1.5">
          {listing.occupancyStatus === 'vacant' && (
            <span className="text-xs bg-emerald-900 text-emerald-300 px-2 py-0.5 rounded">✓ Vacant</span>
          )}
          {listing.occupancyStatus === 'occupied' && (
            <span className="text-xs bg-amber-900 text-amber-300 px-2 py-0.5 rounded">⚠ Occupied</span>
          )}
          {listing.auctionDate && (
            <span className="text-xs bg-gray-800 text-gray-300 px-2 py-0.5 rounded">
              📅 {new Date(listing.auctionDate).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>

      {/* Locked footer */}
      <div className="border-t border-gray-800 bg-gray-900/50 px-5 py-3">
        {showAcquisition ? (
          <AcquisitionForm
            listingId={listing.id}
            listingAddress={listing.address}
            listingPriceCents={listing.price ?? undefined}
            zipCode={listing.zipCode}
            dealScore={score.total}
            variant="inline"
            triggerLabel="Get help acquiring this property"
          />
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-gray-400">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span className="text-xs">Unlock to see acquisition steps</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowAcquisition(true);
                }}
                className="text-xs text-emerald-400 hover:text-emerald-300 font-medium"
              >
                Get help ↗
              </button>
              <a
                href="/unlock"
                onClick={() => trackUnlockClick('preview-card')}
                className="text-xs text-emerald-400 hover:text-emerald-300 font-medium"
              >
                Unlock →
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
