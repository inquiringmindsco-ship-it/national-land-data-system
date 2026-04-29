'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { StandardCard } from '@/components/StandardCard';
import { USMap } from '@/components/USMap';
import { STLOUIS_LISTINGS } from '@/data/stlouis-listings';
import { TAX_SALE_LISTINGS } from '@/data/tax-sale-listings';
import { STLOUIS_COUNTY_POST3_LISTINGS } from '@/data/stlouis-county-post3';
import { SCORED_NOLA_LISTINGS } from '@/data/scored-nola-listings';
import { PropertyType } from '@/lib/types';

// ─── One Source of Truth: City Configs ───────────────────────────────────────
const CITY_CONFIGS = {
  'st-louis': {
    label: 'St. Louis',
    state: 'Missouri',
    abbr: 'MO',
    listings: [...STLOUIS_LISTINGS, ...TAX_SALE_LISTINGS, ...STLOUIS_COUNTY_POST3_LISTINGS],
    color: '#10b981',
    status: 'LIVE' as const,
    description: 'tax sales, land bank properties, and government surplus',
  },
  'new-orleans': {
    label: 'New Orleans',
    state: 'Louisiana',
    abbr: 'LA',
    listings: SCORED_NOLA_LISTINGS,
    color: '#f97316',
    status: 'LIVE' as const,
    description: 'NORA properties, tax sales, and adjudicated land',
  },
} as const;

type CityId = keyof typeof CITY_CONFIGS;

// ─── Lead Capture Modal ───────────────────────────────────────────────────────
function LeadModal({ sourceName, sourceUrl, onClose }: { sourceName: string; sourceUrl: string; onClose: () => void }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'view-source-modal', intent: 'property-tracker' }),
      });
    } catch {}
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-gray-900 border border-gray-700 rounded-2xl p-8 max-w-md w-full shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white text-xl">×</button>
        {submitted ? (
          <div className="text-center py-4">
            <div className="text-4xl mb-4">✅</div>
            <h3 className="text-xl font-bold text-white mb-2">You&apos;re on the list!</h3>
            <p className="text-gray-400 text-sm mb-4">
              We&apos;ll notify you when similar properties become available.
            </p>
            <a href={sourceUrl} target="_blank" rel="noopener noreferrer"
              className="block w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-center text-sm transition-colors">
              Continue to {sourceName} →
            </a>
          </div>
        ) : (
          <>
            <div className="mb-1 text-xs text-emerald-400 font-semibold tracking-wider uppercase">Leaving NLDS</div>
            <h3 className="text-xl font-bold text-white mb-2">
              You&apos;re visiting <span className="text-emerald-400">{sourceName}</span>
            </h3>
            <p className="text-gray-400 text-sm mb-5 leading-relaxed">
              This link takes you to the official government source. NLDS isn&apos;t affiliated with {sourceName}, but we can help you keep track of properties like this one.
            </p>
            <div className="bg-gray-800/60 border border-gray-700 rounded-xl p-4 mb-5">
              <p className="text-white font-semibold text-sm mb-1">🔔 Get notified about similar deals</p>
              <p className="text-gray-400 text-xs leading-relaxed">
                Sign up and we&apos;ll alert you when properties matching this criteria hit the market — before they hit the news.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input type="email" placeholder="your@email.com" value={email}
                onChange={e => setEmail(e.target.value)} required
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-emerald-500" />
              <button type="submit" disabled={loading}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold rounded-lg text-sm transition-colors">
                {loading ? 'Saving...' : 'Notify Me on Similar Deals →'}
              </button>
            </form>
            <div className="mt-4 text-center">
              <a href={sourceUrl} target="_blank" rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-300 text-xs transition-colors">
                No thanks — continue to {sourceName} →
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── City Map Component ───────────────────────────────────────────────────────
function CityMap({ city, onClick, listingCount }: { city: typeof CITY_CONFIGS[CityId]; onClick?: () => void; listingCount: number }) {
  return (
    <div className="relative w-full max-w-2xl mx-auto" style={{ aspectRatio: '4/3' }}>
      <svg viewBox="0 0 200 150" className="w-full h-full">
        <rect x="0" y="0" width="200" height="150" fill="#0a0a0a" rx="8" />
        <path
          d="M 42,14 L 158,14 L 158,22 L 162,30 L 162,44 L 160,52 L 156,58 L 152,64 L 148,70 L 144,76 L 140,80 L 138,82 L 136,84 L 130,88 L 120,90 L 108,92 L 98,90 L 88,88 L 78,86 L 68,84 L 60,80 L 52,76 L 44,70 L 38,62 L 34,52 L 32,42 L 30,32 L 28,24 L 30,14 L 42,14 Z"
          fill="#064e3b" stroke="#10b981" strokeWidth="1.5" className="transition-all duration-300"
        />
        <path
          d="M 140,80 L 148,82 L 148,92 L 148,96 L 142,96 L 136,96 L 130,94 L 126,90 L 130,88 Z"
          fill="#064e3b" stroke="#10b981" strokeWidth="1.5" className="transition-all duration-300"
        />
        <path d="M 140,80 L 142,84 L 144,90 L 144,96 L 148,96" stroke="#10b981" strokeWidth="0.5"
          strokeDasharray="1,1" fill="none" opacity="0.5" />
        <g onClick={onClick} className="cursor-pointer" style={{ pointerEvents: 'all' }}>
          <circle cx="108" cy="58" r="5" fill="#10b981" className="animate-pulse" />
          <circle cx="108" cy="58" r="10" fill="#10b981" opacity="0.2" className="animate-ping" style={{ animationDuration: '2s' }} />
          <circle cx="108" cy="58" r="2" fill="#fff" />
          <circle cx="108" cy="58" r="18" stroke="#10b981" strokeWidth="0.5" fill="none" opacity="0.3" strokeDasharray="2,2" />
        </g>
        <text x="108" y="76" textAnchor="middle" fontSize="5" fontWeight="700" fill="#10b981" style={{ fontFamily: 'sans-serif' }}>
          {city.label.toUpperCase()}, {city.abbr}
        </text>
        <text x="108" y="83" textAnchor="middle" fontSize="3.5" fill="#6b7280" style={{ fontFamily: 'sans-serif' }}>
          {listingCount.toLocaleString()}+ ACTIVE LISTINGS
        </text>
        <circle cx="108" cy="58" r="18" stroke="#10b981" strokeWidth="0.5" fill="none" opacity="0.4" strokeDasharray="2,2" />
        <text x="100" y="14" fontSize="4" fill="#4b5563" style={{ fontFamily: 'sans-serif' }}>
          {city.state.toUpperCase()}
        </text>
        <text x="4" y="145" fontSize="3" fill="#374151" style={{ fontFamily: 'sans-serif' }}>
          Sources: {city.label === 'St. Louis' ? 'St. Louis LRA · City of St. Louis Tax Sale · St. Louis County' : 'NORA · City of New Orleans · Orleans Parish Sheriff'}
        </text>
      </svg>
      <div className="absolute top-4 right-4 flex items-center gap-2 bg-emerald-900/80 border border-emerald-700 rounded-full px-3 py-1.5">
        <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
        <span className="text-emerald-300 text-xs font-semibold">LIVE DATA</span>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<PropertyType[]>([]);
  const [selectedCity, setSelectedCity] = useState<CityId>('st-louis');
  const [modal, setModal] = useState<{ sourceName: string; sourceUrl: string } | null>(null);
  const router = useRouter();

  const city = CITY_CONFIGS[selectedCity];
  const cityListings = city.listings;
  const listingCount = cityListings.length;

  const filtered = searchQuery
    ? cityListings.filter(l => {
        const q = searchQuery.toLowerCase();
        return (
          l.address.toLowerCase().includes(q) ||
          l.city.toLowerCase().includes(q) ||
          l.zipCode?.toLowerCase().includes(q) ||
          l.normalizedSummary?.toLowerCase().includes(q)
        );
      })
    : cityListings.slice(0, 6);

  const displayed = selectedTypes.length ? filtered.filter(l => selectedTypes.includes(l.propertyType as PropertyType)) : filtered;

  return (
    <main className="min-h-screen bg-black text-white pb-16">

      {/* ── HEADER (sticky, no overlap) ───────────────────────────────────── */}
      <header className="sticky top-0 z-20 bg-black/90 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-white">National Land Data System</h1>
            <Link href="/deals" className="text-xs text-emerald-400 hover:text-emerald-300 font-medium">All Deals →</Link>
            <Link href="/learn" className="text-xs text-gray-400 hover:text-white transition-colors">Learn</Link>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-emerald-400">{listingCount.toLocaleString()}</span>
            <p className="text-gray-500 text-xs">{city.label} properties</p>
          </div>
        </div>
      </header>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="border-b border-gray-800 px-4 py-10 md:py-12 scroll-mt-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-emerald-900/40 border border-emerald-700 rounded-full px-4 py-1.5 mb-4">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-emerald-300 text-xs font-semibold tracking-wider">
                LIVE · {city.label.toUpperCase()}, {city.state.toUpperCase()}
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-3">
              Find Land Deals in {city.label}
            </h2>
            <p className="text-gray-400 text-sm max-w-lg mx-auto leading-relaxed">
              We track {city.description} across {city.label}. Browse scored listings — and get notified the moment new deals drop.
            </p>
          </div>
          <CityMap city={city} onClick={() => router.push('/deals')} listingCount={listingCount} />
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link href="/deals"
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm transition-colors">
              Browse All {listingCount} Deals
            </Link>
            <a href="#browse"
              className="px-6 py-3 border border-gray-700 hover:border-gray-500 text-gray-300 font-semibold rounded-xl text-sm transition-colors">
              View by City
            </a>
          </div>
        </div>
      </section>

      {/* ── BROWSE BY CITY ────────────────────────────────────────────────── */}
      <section id="browse" className="border-b border-gray-800 px-4 py-10 scroll-mt-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-white mb-2">Browse by City</h2>
            <p className="text-gray-500 text-sm">Select a highlighted state to explore active and upcoming markets</p>
          </div>
          <USMap onSelectCity={(id: string) => setSelectedCity(id as CityId)} selectedCity={selectedCity} />
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-8">
            {(
              [
                ...Object.entries(CITY_CONFIGS).map(([id, c]) => ({
                  cityId: id as CityId,
                  city: c.label,
                  state: c.abbr,
                  count: c.listings.length,
                  status: c.status as string,
                  color: c.color,
                })),
                { cityId: 'houston' as CityId, city: 'Houston', state: 'TX', count: 0, status: 'COMING SOON', color: '#6b7280' },
                { cityId: 'atlanta' as CityId, city: 'Atlanta', state: 'GA', count: 0, status: 'COMING SOON', color: '#6b7280' },
                { cityId: 'detroit' as CityId, city: 'Detroit', state: 'MI', count: 0, status: 'COMING SOON', color: '#6b7280' },
              ]
            ).map(c => {
              const isLive = c.status === 'LIVE';
              const isSelected = selectedCity === c.cityId;
              return (
                <button
                  key={c.cityId}
                  onClick={() => isLive && setSelectedCity(c.cityId)}
                  disabled={!isLive}
                  className={`rounded-xl p-4 border text-center transition-all text-left ${
                    isLive
                      ? isSelected
                        ? 'bg-emerald-950/60 border-emerald-500 cursor-pointer'
                        : 'bg-emerald-950/30 border-emerald-800 hover:border-emerald-600 cursor-pointer'
                      : isSelected
                      ? 'bg-gray-800 border-gray-600 cursor-pointer'
                      : 'bg-gray-900 border-gray-800 opacity-60 cursor-not-allowed'
                  }`}
                >
                  <div className={`text-xs font-bold mb-1 ${isLive ? 'text-emerald-400' : 'text-gray-500'}`}>{c.status}</div>
                  <div className="text-white font-bold text-sm">{c.city}</div>
                  <div className="text-gray-500 text-xs">{c.state}</div>
                  {isLive && (
                    <div className="text-emerald-400 text-xs font-semibold mt-1">{c.count}+ listings</div>
                  )}
                  {!isLive && (
                    <div className="text-gray-600 text-xs mt-1">Data compiling</div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CITY PROFILE ─────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 py-10 scroll-mt-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white">
              {city.label}, {city.state}
            </h2>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full mt-1 inline-block"
              style={{ backgroundColor: city.color + '30', color: city.color }}>
              {city.status}
            </span>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-emerald-400">{listingCount.toLocaleString()}</span>
            <p className="text-gray-500 text-xs">active listings</p>
          </div>
        </div>

        {/* Type filters */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {(['TAX_DEED_EQUIVALENT', 'TAX_LIEN', 'GOVERNMENT_LAND'] as PropertyType[]).map(t => (
            <button
              key={t}
              onClick={() => setSelectedTypes(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                selectedTypes.includes(t)
                  ? 'bg-emerald-600 border-emerald-500 text-white'
                  : 'bg-gray-900 border-gray-700 text-gray-400 hover:border-gray-600'
              }`}
            >
              {t.replace(/_/g, ' ')}
            </button>
          ))}
          {selectedTypes.length > 0 && (
            <button onClick={() => setSelectedTypes([])} className="text-xs px-3 py-1.5 rounded-full border border-gray-700 text-gray-500 hover:text-white transition-colors">
              Clear
            </button>
          )}
        </div>

        {/* Search */}
        <div className="mb-6">
          <input type="text" placeholder={`Search by address, zip code, keyword in ${city.label}...`}
            value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-emerald-600" />
        </div>

        <p className="text-gray-500 text-xs mb-4">
          Showing {displayed.length} of {filtered.length} listings
          {selectedTypes.length > 0 && ` · ${selectedTypes.length} filter${selectedTypes.length > 1 ? 's' : ''} active`}
        </p>

        {/* Listings grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayed.length === 0 ? (
            <div className="col-span-full text-center py-16 text-gray-500">
              <div className="text-4xl mb-4">🏘️</div>
              <p className="text-white font-semibold mb-1">No listings found</p>
              <p className="text-sm">Try a different search or filter</p>
            </div>
          ) : (
            displayed.map((listing: any) => (
              <StandardCard
                key={listing.id}
                listing={listing}
                score={listing._score}
                grade={listing._grade}
                gradeEmoji={listing._gradeEmoji}
                showScore={selectedCity === 'new-orleans'}
                onViewSource={(sourceName, sourceLink) => setModal({ sourceName, sourceUrl: sourceLink })}
              />
            ))
          )}
        </div>

        {cityListings.length > 6 && (
          <div className="text-center mt-8">
            <Link href={`/deals?city=${selectedCity}`}
              className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm transition-colors inline-block">
              View All {listingCount} Listings →
            </Link>
          </div>
        )}
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <footer className="border-t border-gray-800 px-4 py-8 mt-8">
        <div className="max-w-5xl mx-auto text-center text-gray-600 text-xs">
          <p>National Land Data System — One source of truth for land deals across the US</p>
          <p className="mt-2">
            <Link href="/deals" className="text-emerald-500 hover:text-emerald-400">Browse Deals</Link>
            {' · '}
            <Link href="/learn" className="text-emerald-500 hover:text-emerald-400">Learn</Link>
            {' · '}
            <Link href="/unlock" className="text-emerald-500 hover:text-emerald-400">Unlock Full Data</Link>
          </p>
        </div>
      </footer>

      {/* Lead Modal */}
      {modal && (
        <LeadModal
          sourceName={modal.sourceName}
          sourceUrl={modal.sourceUrl}
          onClose={() => setModal(null)}
        />
      )}
    </main>
  );
}
