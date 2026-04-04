'use client';

import { useState } from 'react';
import type { EmergingHotspot, MarketIntelligenceReport, ZipDemandSignal } from '@/lib/proprietary/market-intelligence';

const CLASS_COLORS: Record<string, string> = {
  HOT: 'bg-red-900 text-red-200 border-red-700',
  WARM: 'bg-amber-900 text-amber-200 border-amber-700',
  COLD: 'bg-blue-900 text-blue-200 border-blue-700',
  EMERGING: 'bg-emerald-900 text-emerald-200 border-emerald-700',
};

const ACTION_COLORS: Record<string, string> = {
  act_fast: 'bg-red-700 hover:bg-red-600',
  unlock: 'bg-amber-700 hover:bg-amber-600',
  watch: 'bg-gray-700 hover:bg-gray-600',
};

const RISK_COLORS: Record<string, string> = {
  low: 'text-emerald-400',
  medium: 'text-amber-400',
  high: 'text-red-400',
};

const TREND_ICONS: Record<string, string> = {
  accelerating: '↑',
  stable: '→',
  decelerating: '↓',
};

interface Props {
  hotspots: EmergingHotspot[];
  report: MarketIntelligenceReport;
}

export function EmergingHotspotsPanel({ hotspots, report }: Props) {
  const [activeTab, setActiveTab] = useState<'hotspots' | 'zip' | 'deals'>('hotspots');

  return (
    <section className="max-w-6xl mx-auto px-4 py-12 border-t border-gray-800">
      {/* Section header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-emerald-400 text-xs font-bold tracking-widest uppercase">Market Intelligence Layer™</span>
            <span className="text-gray-500 text-xs">·</span>
            <span className="text-gray-400 text-xs">v1 Active</span>
          </div>
          <h2 className="text-2xl font-black text-white">Emerging Opportunity Zones</h2>
          <p className="text-gray-300 text-sm mt-1">{report.headline}</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl px-4 py-2 text-right">
          <div className="text-white font-black text-xl">{report.activeZips}</div>
          <div className="text-gray-400 text-xs">Active Zip Codes</div>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="flex gap-1 mb-6 bg-gray-900 p-1 rounded-xl w-fit">
        {([['hotspots', 'Hotspot Zones'], ['zip', 'Zip Demand'], ['deals', 'Deal Types']] as const).map(([tab, label]) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab ? 'bg-emerald-800 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* HOTSPOTS TAB */}
      {activeTab === 'hotspots' && (
        <div>
          {/* Top 3 hotspots — large cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {hotspots.slice(0, 3).map(h => (
              <HotspotCard key={h.zip} hotspot={h} featured />
            ))}
          </div>

          {/* Remaining hotspots — compact list */}
          <div className="space-y-2">
            {hotspots.slice(3).map(h => (
              <CompactHotspotRow key={h.zip} hotspot={h} />
            ))}
          </div>
        </div>
      )}

      {/* ZIP DEMAND TAB */}
      {activeTab === 'zip' && (
        <div className="space-y-2">
          {report.emergingZones.map((h) => (
            <ZipDemandRow key={h.zip} hotspot={h} />
          ))}
        </div>
      )}

      {/* DEAL TYPE TAB */}
      {activeTab === 'deals' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {report.dealTypePerformance.map(dt => (
            <DealTypeCard key={dt.dealType} metrics={dt} />
          ))}
        </div>
      )}
    </section>
  );
}

function HotspotCard({ hotspot, featured }: { hotspot: EmergingHotspot; featured?: boolean }) {
  return (
    <div className={`border rounded-2xl overflow-hidden ${CLASS_COLORS[hotspot.classification] ?? 'border-gray-700'}`}>
      <div className="p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-white">{hotspot.rank}</span>
            <div>
              <div className="text-white font-bold text-lg leading-none">{hotspot.zip}</div>
              <div className="text-gray-300 text-xs">{hotspot.city}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-black text-white">{hotspot.overallScore}</div>
            <div className={`text-xs font-bold px-2 py-0.5 rounded-full border ${CLASS_COLORS[hotspot.classification] ?? 'bg-gray-800'}`}>
              {hotspot.classification}
            </div>
          </div>
        </div>

        {/* Headline */}
        <p className="text-gray-200 text-sm mb-3 font-medium">{hotspot.headline}</p>

        {/* Score bars */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          {[
            { label: 'Demand', value: hotspot.demandScore },
            { label: 'Momentum', value: hotspot.momentumScore },
            { label: 'Scarcity', value: hotspot.scarcityScore },
            { label: 'Conversion', value: hotspot.conversionScore },
          ].map(({ label, value }) => (
            <div key={label} className="bg-black/30 rounded-lg p-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-gray-300 text-xs">{label}</span>
                <span className="text-white text-xs font-bold">{value}</span>
              </div>
              <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${value}%`, background: value >= 70 ? '#22c55e' : value >= 50 ? '#eab308' : '#ef4444' }} />
              </div>
            </div>
          ))}
        </div>

        {/* Listing count + dominant type */}
        <div className="flex items-center gap-2 mb-3 text-xs text-gray-300">
          <span>{hotspot.listingCount} listing{hotspot.listingCount !== 1 ? 's' : ''}</span>
          <span>·</span>
          <span>{hotspot.dominantDealType}</span>
          <span>·</span>
          <span className={RISK_COLORS[hotspot.riskLevel]}>{hotspot.riskLevel} risk</span>
          <span>·</span>
          <span>{TREND_ICONS[hotspot.trendDirection]} {hotspot.trendDirection}</span>
        </div>

        {/* Summary */}
        <p className="text-gray-300 text-xs leading-relaxed mb-3">{hotspot.summary}</p>

        {/* Action */}
        <div className="border-t border-white/10 pt-3">
          <div className="text-emerald-300 text-xs font-medium mb-1 italic">{hotspot.investmentAngle}</div>
          <a
            href={`/deals?zip=${hotspot.zip}`}
            className={`inline-block w-full text-center py-2 text-white text-xs font-bold rounded-lg transition-colors ${ACTION_COLORS[hotspot.action] ?? 'bg-gray-700'}`}
          >
            {hotspot.actionLabel}
          </a>
        </div>
      </div>
    </div>
  );
}

function CompactHotspotRow({ hotspot }: { hotspot: EmergingHotspot }) {
  return (
    <div className="bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 flex items-center gap-4">
      <div className="text-xl font-black text-gray-400 w-6 text-center">{hotspot.rank}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-white font-bold text-sm">{hotspot.zip}</span>
          <span className={`text-xs px-1.5 py-0.5 rounded border font-bold ${CLASS_COLORS[hotspot.classification] ?? 'bg-gray-800 text-gray-300 border-gray-700'}`}>
            {hotspot.classification}
          </span>
          <span className="text-gray-400 text-xs">{hotspot.listingCount} listings</span>
        </div>
        <p className="text-gray-400 text-xs truncate">{hotspot.headline}</p>
      </div>
      <div className="text-right flex-shrink-0">
        <div className="text-white font-black text-lg">{hotspot.overallScore}</div>
        <div className="text-gray-500 text-xs">{TREND_ICONS[hotspot.trendDirection]}</div>
      </div>
      <a href={`/deals?zip=${hotspot.zip}`} className={`px-3 py-1.5 text-xs font-bold rounded-lg text-white flex-shrink-0 ${ACTION_COLORS[hotspot.action] ?? 'bg-gray-700'}`}>
        {hotspot.action === 'watch' ? 'Watch' : hotspot.action === 'unlock' ? 'Unlock' : 'Act Fast'}
      </a>
    </div>
  );
}

function ZipDemandRow({ hotspot }: { hotspot: EmergingHotspot }) {
  return (
    <div className="bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 flex items-center gap-4">
      <div className="w-16 flex-shrink-0">
        <div className="text-white font-black text-lg">{hotspot.zip}</div>
        <div className="text-gray-400 text-xs">{hotspot.city}</div>
      </div>
      <div className="flex-1 grid grid-cols-4 gap-3">
        {[
          { label: 'Demand', value: hotspot.demandScore },
          { label: 'Velocity', value: hotspot.momentumScore },
          { label: 'Scarcity', value: hotspot.scarcityScore },
          { label: 'Conv.', value: hotspot.conversionScore },
        ].map(({ label, value }) => (
          <div key={label}>
            <div className="text-gray-400 text-xs mb-1">{label}</div>
            <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${value}%`, background: value >= 70 ? '#22c55e' : value >= 50 ? '#eab308' : '#ef4444' }} />
            </div>
            <div className="text-white text-xs font-bold mt-0.5">{value}</div>
          </div>
        ))}
      </div>
      <div className="text-right flex-shrink-0">
        <div className="text-white font-black text-xl">{hotspot.overallScore}</div>
        <div className={`text-xs font-bold ${CLASS_COLORS[hotspot.classification]?.split(' ')[1] ?? 'text-gray-400'}`}>
          {hotspot.classification}
        </div>
      </div>
    </div>
  );
}

function DealTypeCard({ metrics }: { metrics: { dealType: string; label: string; totalListings: number; conversionRate: number; avgScore: number; strength: string; topZip: string } }) {
  const convColor = metrics.conversionRate >= 70 ? 'text-emerald-400' : metrics.conversionRate >= 50 ? 'text-amber-400' : 'text-red-400';
  const strengthBg: Record<string, string> = {
    very_strong: 'bg-emerald-900 text-emerald-200',
    strong: 'bg-green-900 text-green-200',
    moderate: 'bg-amber-900 text-amber-200',
    weak: 'bg-red-900 text-red-200',
  };

  return (
    <div className="bg-gray-950 border border-gray-800 rounded-xl p-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="text-white font-bold text-sm">{metrics.label}</div>
          <div className="text-gray-500 text-xs">{metrics.totalListings} listings in market</div>
        </div>
        <div className={`text-2xl font-black ${convColor}`}>{metrics.conversionRate}%</div>
      </div>
      <div className="mb-2">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
          <span>Conversion rate</span>
          <span className={convColor}>{metrics.conversionRate}%</span>
        </div>
        <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full rounded-full" style={{ width: `${metrics.conversionRate}%`, background: metrics.conversionRate >= 70 ? '#22c55e' : metrics.conversionRate >= 50 ? '#eab308' : '#ef4444' }} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="bg-gray-900 rounded-lg p-2">
          <div className="text-gray-500 text-xs">Avg Score</div>
          <div className="text-white font-bold text-sm">{metrics.avgScore}</div>
        </div>
        <div className="bg-gray-900 rounded-lg p-2">
          <div className="text-gray-500 text-xs">Top Zip</div>
          <div className="text-white font-bold text-sm">{metrics.topZip}</div>
        </div>
      </div>
      <div className={`text-xs font-bold px-2 py-1 rounded-full inline-block ${strengthBg[metrics.strength] ?? 'bg-gray-800 text-gray-400'}`}>
        {metrics.strength.replace('_', ' ').toUpperCase()} CONVERSION
      </div>
    </div>
  );
}
