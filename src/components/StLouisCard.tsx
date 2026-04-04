'use client';

import { Listing } from '@/lib/types';
import { computeOpportunityScore, BuyerProfile } from '@/lib/proprietary/parcel-intelligence';
import { translateListing } from '@/lib/proprietary/government-translator';
import { generateAcquisitionPathway } from '@/lib/proprietary/acquisition-pathway';
import { classifyDeal, DEAL_TYPE_CONFIG } from '@/lib/proprietary/deal-classification';
import { useState } from 'react';

const fmtCents = (c: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(c / 100);

const TYPE_COLORS: Record<string, { bg: string; badge: string }> = {
  TAX_DEED_EQUIVALENT: { bg: 'bg-red-950', badge: 'bg-red-900 text-red-200' },
  TAX_LIEN: { bg: 'bg-amber-950', badge: 'bg-amber-900 text-amber-200' },
  GOVERNMENT_LAND: { bg: 'bg-blue-950', badge: 'bg-blue-900 text-blue-200' },
};

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

const DIFFICULTY_COLOR: Record<string, string> = {
  Easy: 'text-emerald-400 bg-emerald-900',
  Moderate: 'text-yellow-400 bg-yellow-900',
  Challenging: 'text-orange-400 bg-orange-900',
  Expert: 'text-red-400 bg-red-900',
};

const SUBCOLORS = ['text-blue-400', 'text-purple-400', 'text-amber-400', 'text-pink-400', 'text-emerald-400'];
const SUBEMOJIS = ['DOLLAR', 'PIN', 'WARNING', 'FIRE', 'WRENCH'];
const SUBWEIGHTS = [0.30, 0.20, 0.20, 0.15, 0.15];

const SIGNAL_COLORS = ['text-orange-400', 'text-cyan-400', 'text-red-400', 'text-yellow-400', 'text-indigo-400'];
const SIGNAL_NAMES = ['Momentum', 'Scarcity', 'Entry Barrier', 'Time Sens.', 'Early Disc.'];

interface Props { listing: Listing; allListings?: Listing[]; }

export function StLouisCard({ listing, allListings: allListsInput }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [profile, setProfile] = useState<BuyerProfile>('investor');

  const allListings = (allListsInput && allListsInput.length > 0) ? allListsInput : [listing];
  const score = computeOpportunityScore(listing, allListings, profile);
  const translation = translateListing(listing);
  const pathway = generateAcquisitionPathway(listing);
  const classification = classifyDeal(listing);
  const colors = TYPE_COLORS[listing.propertyType] ?? TYPE_COLORS.TAX_DEED_EQUIVALENT;

  const { signals } = score;
  const signalValues = [signals.momentum, signals.scarcity, signals.entryBarrier, signals.timeSensitivity, signals.earlyDiscovery];

  return (
    <div className={`${colors.bg} border border-gray-800 rounded-xl overflow-hidden`}>
      <div className="p-5">
        {/* Header row */}
        <div className="flex items-center justify-between mb-3">
          <span className={`text-xs px-2 py-1 rounded-full ${colors.badge}`}>{listing.originalLabel}</span>
          <div className="flex items-center gap-2">
            <span className={`text-xs px-2 py-1 rounded-full bg-gray-800 ${DEAL_TYPE_CONFIG[classification.dealType].color}`}>
              {DEAL_TYPE_CONFIG[classification.dealType].emoji} {classification.dealType}
            </span>
          </div>
        </div>

        {/* Address */}
        <h3 className="text-white font-semibold text-lg mb-0.5">{listing.address}</h3>
        <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
          <span>{listing.city}, {listing.state} {listing.zipCode}</span>
          {listing.neighborhood && <><span className="text-gray-600">·</span><span>{listing.neighborhood}</span></>}
        </div>

        {/* Price + Score */}
        <div className="flex items-start justify-between mb-3">
          <div>
            {listing.price ? (
              <span className="text-4xl font-bold text-white">{fmtCents(listing.price)}</span>
            ) : listing.startingBid ? (
              <div><span className="text-gray-400 text-sm">Starting bid: </span><span className="text-2xl font-bold text-white">{fmtCents(listing.startingBid)}</span></div>
            ) : (
              <span className="text-2xl text-gray-400">Price TBD</span>
            )}
          </div>
          <div className="text-right flex-shrink-0 ml-4">
            <div className={`text-5xl font-black ${GRADE_COLOR[score.grade]}`}>{score.total}</div>
            <div className={`text-xs font-bold px-2 py-0.5 rounded-full inline-block mt-1 ${GRADE_BG[score.grade]}`}>{score.grade}</div>
          </div>
        </div>

        {/* Strategic Insight headline */}
        <div className="bg-black/30 rounded-lg p-3 mb-3 border border-gray-800">
          <div className="text-emerald-400 text-xs font-bold mb-1 tracking-wider">STRATEGIC INSIGHT</div>
          <div className="text-white font-semibold text-sm mb-1">{score.insight.headline}</div>
          <div className="text-gray-300 text-xs leading-relaxed">{score.insight.summary}</div>
          <div className="mt-2 flex flex-wrap gap-1">
            <span className={`text-xs px-2 py-0.5 rounded bg-gray-800 text-gray-300`}>
              Angle: {score.insight.angle}
            </span>
          </div>
        </div>

        {/* 5 Core subscores strip */}
        <div className="grid grid-cols-5 gap-1 mb-2">
          {score.subs.map((sub, i) => (
            <div key={sub.label} className="text-center bg-black/30 rounded-lg p-2">
              <div className={`text-lg font-black ${SUBCOLORS[i]}`}>{sub.value}</div>
              <div className="text-gray-500 text-xs">{sub.label.replace(' Score', '')}</div>
            </div>
          ))}
        </div>

        {/* 5 Signal indicators */}
        <div className="grid grid-cols-5 gap-1 mb-3">
          {signalValues.map((val, i) => (
            <div key={i} className="text-center bg-black/20 rounded-lg p-1.5">
              <div className={`text-sm font-black ${SIGNAL_COLORS[i]}`}>{val}</div>
              <div className="text-gray-600 text-xs">{SIGNAL_NAMES[i]}</div>
            </div>
          ))}
        </div>

        {/* Quick tags */}
        <div className="flex flex-wrap gap-2 mb-2">
          {listing.parcelId && <span className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded">Parcel {listing.parcelId}</span>}
          {listing.assessedValue && <span className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded">EV {fmtCents(listing.assessedValue)}</span>}
          {listing.occupancyStatus && (
            <span className={`text-xs px-2 py-0.5 rounded ${listing.occupancyStatus === 'vacant' ? 'bg-emerald-900 text-emerald-300' : listing.occupancyStatus === 'occupied' ? 'bg-amber-900 text-amber-300' : 'bg-gray-800 text-gray-400'}`}>
              {listing.occupancyStatus === 'vacant' ? 'VACANT' : listing.occupancyStatus === 'occupied' ? 'MAY BE OCCUPIED' : 'Occupancy TBD'}
            </span>
          )}
          {listing.auctionDate && <span className="text-xs bg-amber-900 text-amber-200 px-2 py-0.5 rounded font-medium">AUCTION {new Date(listing.auctionDate).toLocaleDateString()}</span>}
        </div>

        {/* Urgency flags */}
        {classification.urgencyFlags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {classification.urgencyFlags.map((flag, i) => (
              <span key={i} className={`text-xs px-2 py-0.5 rounded border ${flag.severity === 'high' ? 'text-red-300 bg-red-950 border-red-800' : flag.severity === 'medium' ? 'text-amber-300 bg-amber-950 border-amber-800' : 'text-gray-400 bg-gray-800 border-gray-700'}`}>
                {flag.severity === 'high' ? '⚠' : '•'} {flag.message}
              </span>
            ))}
          </div>
        )}

        {/* Watch out */}
        {score.insight.watchOut && (
          <div className="text-xs text-amber-400 bg-amber-950/30 border border-amber-900 rounded px-3 py-2 mb-3">
            ⚠ {score.insight.watchOut}
          </div>
        )}

        {/* Profile switcher */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-gray-500">Score for:</span>
          {(['beginner', 'investor', 'developer'] as BuyerProfile[]).map(p => (
            <button
              key={p}
              onClick={() => setProfile(p)}
              className={`text-xs px-3 py-1 rounded-full border transition-all ${
                profile === p
                  ? 'bg-emerald-700 text-white border-emerald-500'
                  : 'bg-gray-800 text-gray-400 border-gray-700 hover:bg-gray-700'
              }`}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>

        <button onClick={() => setExpanded(!expanded)} className="w-full text-center text-xs text-gray-500 hover:text-emerald-400 py-1 border-t border-gray-800 mt-2 transition-colors">
          {expanded ? '▲ Collapse' : '▼ Full analysis + signals + acquisition path'}
        </button>
      </div>

      {/* EXPANDED */}
      {expanded && (
        <div className="border-t border-gray-800 bg-black/30">

          {/* Why This Score */}
          <div className="p-4 border-b border-gray-800">
            <div className="text-emerald-400 text-sm font-bold tracking-wider mb-2">WHY THIS SCORE</div>
            <p className="text-sm text-gray-200 leading-relaxed mb-3">{score.why}</p>
            {/* Subscore breakdown */}
            <div className="space-y-2">
              {score.subs.map((sub, i) => (
                <div key={sub.label} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-14 text-center">
                    <div className={`text-lg font-black ${SUBCOLORS[i]}`}>{sub.value}</div>
                    <div className="text-gray-600 text-xs">{Math.round(SUBWEIGHTS[i] * 100)}%</div>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-gray-300 font-medium">{sub.label}</div>
                    <div className="text-xs text-gray-500 leading-relaxed">{sub.explanation}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Signal Deep Dive */}
          <div className="p-4 border-b border-gray-800">
            <div className="text-emerald-400 text-sm font-bold tracking-wider mb-3">COMPOSITE SIGNAL LAYER</div>
            <div className="space-y-3">
              <SignalBar label="Neighborhood Momentum" value={signals.momentum} color="text-orange-400" detail={`Based on zip trend data + active reinvestment signals in ${listing.zipCode}`} />
              <SignalBar label="Scarcity Signal" value={signals.scarcity} color="text-cyan-400" detail="Few similar-priced properties available in this zip right now" />
              <SignalBar label="Entry Barrier" value={signals.entryBarrier} color="text-red-400" detail={signals.entryBarrier >= 65 ? 'Complex process — not ideal for beginners' : 'Accessible acquisition path'} />
              <SignalBar label="Time Sensitivity" value={signals.timeSensitivity} color="text-yellow-400" detail={listing.auctionDate ? `${signals.timeSensitivity >= 75 ? 'AUCTION IMMINENT' : 'Auction window active'} — act soon` : 'No immediate deadline — steady research timeline'} />
              <SignalBar label="Early Discovery" value={signals.earlyDiscovery} color="text-indigo-400" detail={signals.earlyDiscovery >= 65 ? 'Low public visibility — first-mover advantage' : 'Widely viewed — expect competition'} />
            </div>
          </div>

          {/* Acquisition Pathway */}
          <div className="p-4 border-b border-gray-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-emerald-400 text-sm font-bold tracking-wider">ACQUISITION PATHWAY™</span>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-1 rounded-full ${DIFFICULTY_COLOR[pathway.difficulty]}`}>{pathway.difficulty}</span>
                <span className="text-xs text-gray-500">{pathway.difficultyScore}/10</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mb-3">{pathway.pathway} · Est. {pathway.totalTime} · {pathway.summary}</p>
            <div className="space-y-2">
              {pathway.steps.map(step => (
                <div key={step.step} className="flex gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-900 text-emerald-400 text-xs flex items-center justify-center font-bold mt-0.5">{step.step}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-200 font-medium">{step.action}</span>
                      <span className="text-xs text-gray-500">{step.timeEstimate}</span>
                    </div>
                    <p className="text-xs text-gray-400 mb-0.5">{step.description}</p>
                    {step.notes && <p className="text-xs text-amber-400 italic">{step.notes}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Government Translator */}
          <div className="p-4 border-b border-gray-800">
            <div className="text-emerald-400 text-sm font-bold tracking-wider mb-3">GOVERNMENT DATA TRANSLATOR™</div>
            <div className="space-y-3">
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">What This Means</div>
                <p className="text-sm text-gray-200">{translation.whatItMeans}</p>
              </div>
              <div>
                <div className="text-xs text-emerald-400 uppercase tracking-wider mb-1">Why It Could Be Valuable</div>
                <p className="text-sm text-gray-300">{translation.whyValuable}</p>
              </div>
              <div>
                <div className="text-xs text-red-400 uppercase tracking-wider mb-1">What to Watch Out For</div>
                <p className="text-sm text-gray-400">{translation.watchOut}</p>
              </div>
            </div>
          </div>

          {/* Footer: source */}
          <div className="p-4 flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-500 mb-1">Best for</div>
              <div className="flex flex-wrap gap-1">
                {score.insight.bestFor.map(p => (
                  <span key={p} className="text-xs bg-emerald-900 text-emerald-300 px-2 py-0.5 rounded capitalize">{p}</span>
                ))}
              </div>
            </div>
            <div className="text-right flex-shrink-0 ml-4">
              <div className="text-xs text-gray-500">{listing.sourceName}</div>
              {listing.sourceLink && (
                <a href={listing.sourceLink} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 text-xs">View Source →</a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SignalBar({ label, value, color, detail }: { label: string; value: number; color: string; detail: string }) {
  const barColor = value >= 70 ? 'bg-emerald-500' : value >= 50 ? 'bg-yellow-500' : 'bg-red-500';
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <span className={`text-xs font-bold ${color}`}>{value}</span>
          <span className="text-xs text-gray-300">{label}</span>
        </div>
        <span className="text-xs text-gray-400">{value >= 70 ? 'HIGH' : value >= 50 ? 'MED' : 'LOW'}</span>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-1.5">
        <div className={`h-1.5 rounded-full ${barColor}`} style={{ width: `${value}%` }} />
      </div>
      <div className="text-xs text-gray-400 mt-0.5">{detail}</div>
    </div>
  );
}
