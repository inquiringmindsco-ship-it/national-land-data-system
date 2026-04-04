'use client';

import { useState } from 'react';
import Link from 'next/link';
import { USMap, STATES } from '@/components/USMap';
import { StandardCard } from '@/components/StandardCard';
import { MOCK_LISTINGS } from '@/data/mock-listings';
import { STLOUIS_LISTINGS } from '@/data/stlouis-listings';
import { TAX_SALE_LISTINGS } from '@/data/tax-sale-listings';
import { STLOUIS_COUNTY_POST3_LISTINGS } from '@/data/stlouis-county-post3';
import { PropertyType } from '@/lib/types';

export default function HomePage() {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<PropertyType[]>([]);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  // Combine ALL listings
  const ALL_LISTINGS = [
    ...STLOUIS_LISTINGS,
    ...TAX_SALE_LISTINGS,
    ...STLOUIS_COUNTY_POST3_LISTINGS,
    ...MOCK_LISTINGS,
  ];

  // Build state/city listing counts
  const stateData = STATES.map(state => {
    const city = state.cities[0];
    let listings: typeof ALL_LISTINGS = [];
    let source = '';
    let hasRealData = false;
    if (city?.id === 'st-louis') {
      listings = ALL_LISTINGS.filter(l => l.state === 'MO');
      source = 'St. Louis LRA · City Tax Sale · County Post-3';
      hasRealData = true;
    } else if (city?.id === 'new-orleans') {
      listings = [];
      source = 'Jefferson Parish · Orleans Sheriff · NOLA Land Bank';
      hasRealData = false;
    } else if (city?.id === 'houston') {
      listings = [];
      source = 'Harris County Tax Office';
      hasRealData = false;
    } else if (city?.id === 'atlanta') {
      listings = [];
      source = 'Fulton County · Atlanta Land Bank';
      hasRealData = false;
    } else if (city?.id === 'detroit') {
      listings = [];
      source = 'Wayne County · Detroit Land Bank';
      hasRealData = false;
    }
    return { ...state, listings, source, hasRealData };
  });

  const activeState = selectedState ? stateData.find(s => s.abbr === selectedState) : null;

  // Filter listings when searching
  let searchResults = selectedState && searchQuery
    ? ALL_LISTINGS.filter(l => {
        const q = searchQuery.toLowerCase();
        const matchState = activeState?.cities[0]?.id === 'st-louis' ? l.state === 'MO' :
                          activeState?.cities[0]?.id === 'new-orleans' ? l.city.toLowerCase().includes('orleans') :
                          activeState?.cities[0]?.id === 'houston' ? l.city.toLowerCase().includes('houston') :
                          activeState?.cities[0]?.id === 'atlanta' ? l.city.toLowerCase().includes('atlanta') :
                          activeState?.cities[0]?.id === 'detroit' ? l.city.toLowerCase().includes('detroit') : false;
        const matchQuery = l.address.toLowerCase().includes(q) ||
                           l.city.toLowerCase().includes(q) ||
                           l.normalizedSummary?.toLowerCase().includes(q) ||
                           l.originalLabel?.toLowerCase().includes(q) ||
                           l.zipCode?.toLowerCase().includes(q);
        const matchType = selectedTypes.length === 0 || selectedTypes.includes(l.propertyType);
        return matchState && matchQuery && matchType;
      })
    : [];

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/80 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-white">National Land Data System</h1>
            <Link href="/deals" className="text-xs text-emerald-400 hover:text-emerald-300 font-medium">
              Deals →
            </Link>
            <Link href="/learn" className="text-xs text-gray-400 hover:text-white transition-colors">
              Learn
            </Link>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-emerald-400">{ALL_LISTINGS.length}</span>
            <p className="text-gray-500 text-xs">properties</p>
          </div>
        </div>
      </header>

      {/* Hero: Map */}
      <section className="border-b border-gray-800 px-4 py-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-2">
              Find Land Deals Across America
            </h2>
            <p className="text-gray-400 text-sm max-w-xl mx-auto">
              We track tax sales, land banks, and government surplus in cities nationwide.
              Select a state to explore listings.
            </p>
          </div>
          <USMap />
          <div className="text-center mt-4 text-xs text-gray-600">
            Select a highlighted state · St. Louis, MO active · More cities launching
          </div>
        </div>
      </section>

      {/* State Portals */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Browse by City</h2>
          <span className="text-xs text-gray-500">{ALL_LISTINGS.length} properties in database</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stateData.map(state => {
            const city = state.cities[0];
            const isActive = city?.status === 'live';
            return (
              <div
                key={state.abbr}
                className={`block rounded-xl border p-5 ${
                  isActive
                    ? 'bg-emerald-950/30 border-emerald-800 hover:border-emerald-600 hover:bg-emerald-950/50'
                    : 'bg-gray-900/50 border-gray-800 opacity-70'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-white font-bold text-base">{state.name}</div>
                    <div className="text-gray-400 text-xs">{city?.name}</div>
                  </div>
                  {isActive ? (
                    <span className="text-xs px-2 py-0.5 bg-emerald-900 text-emerald-300 rounded-full font-bold">LIVE</span>
                  ) : (
                    <span className="text-xs px-2 py-0.5 bg-gray-800 text-gray-400 rounded-full">COMING SOON</span>
                  )}
                </div>
                {isActive ? (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 text-xs">Properties</span>
                      <span className="font-bold text-sm text-emerald-400">
                        {city?.listings.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 text-xs">Source</span>
                      <span className="text-gray-400 text-xs text-right max-w-[160px] truncate">{state.source}</span>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-800/40 border border-gray-700/50 rounded-lg p-3">
                    <p className="text-gray-400 text-xs leading-relaxed">
                      Data for <span className="text-white">{city?.name}</span> is currently being compiled.
                    </p>
                    <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                      Sign up to be notified when available →
                    </p>
                  </div>
                )}
                {isActive && (
                  <div className="mt-3 text-xs text-emerald-400 font-semibold cursor-pointer">Browse Listings →</div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Live Search */}
      {(selectedState || searchQuery) && (
        <section className="border-t border-gray-800 max-w-5xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white">
              {searchQuery ? `Search Results` : `${activeState?.name} Properties`}
            </h2>
            {selectedState && !searchQuery && (
              <button onClick={() => setSelectedState(null)} className="text-xs text-gray-500 hover:text-white">
                ← Back to all states
              </button>
            )}
          </div>

          {/* Search bar */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by address, zip, keyword..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-emerald-600"
            />
          </div>

          {/* Type filters */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {(['TAX_DEED_EQUIVALENT', 'TAX_LIEN', 'GOVERNMENT_LAND'] as PropertyType[]).map(type => (
              <button
                key={type}
                onClick={() => setSelectedTypes(prev =>
                  prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
                )}
                className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                  selectedTypes.includes(type)
                    ? 'bg-emerald-700 border-emerald-500 text-white'
                    : 'bg-gray-900 border-gray-700 text-gray-400 hover:border-gray-600'
                }`}
              >
                {type.replace(/_/g, ' ')}
              </button>
            ))}
          </div>

          {/* Results */}
          {!activeState?.hasRealData && !searchQuery ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-sm mb-2">
                {activeState?.name} data is currently being compiled.
              </p>
              <p className="text-gray-600 text-xs">
                Sign up to be notified when available →
              </p>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.slice(0, 30).map(listing => (
                <StandardCard key={listing.id} listing={listing} />
              ))}
            </div>
          ) : searchQuery ? (
            <div className="text-center py-12 text-gray-500 text-sm">
              No results for "{searchQuery}". Try a different search term.
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-sm mb-4">
                {activeState?.listings.length} properties in {activeState?.name}. Use the search bar to filter.
              </p>
              <Link
                href="/deals"
                className="inline-block px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-sm transition-colors"
              >
                View All {activeState?.name} Deals →
              </Link>
            </div>
          )}
        </section>
      )}

      {/* How it works */}
      <section className="border-t border-gray-800 max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-xl font-bold text-white mb-6 text-center">How NLDS Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              step: '01',
              title: 'Select a City',
              desc: 'Browse active markets. We currently track St. Louis, MO — with New Orleans, Houston, Atlanta, and Detroit coming soon.',
            },
            {
              step: '02',
              title: 'Browse Scored Deals',
              desc: 'Every listing is scored by our Parcel Intelligence Engine™ — price, risk, scarcity, momentum, and acquisition difficulty.',
            },
            {
              step: '03',
              title: 'Unlock Full Access',
              desc: 'Pay once ($5–$25) to unlock the complete deal set. Full scores, acquisition pathways, and plain-English translations included.',
            },
          ].map(item => (
            <div key={item.step} className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
              <div className="text-3xl font-black text-emerald-400 mb-2">{item.step}</div>
              <h3 className="text-white font-bold mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-gray-800 py-8 mt-4">
        <div className="max-w-5xl mx-auto px-4 text-center text-gray-600 text-xs space-y-2">
          <p>National Land Data System™ — A Porterful Labs Product</p>
          <div className="flex justify-center gap-4 pt-2">
            <Link href="/deals" className="text-emerald-600 hover:text-emerald-400">Deals</Link>
            <Link href="/learn" className="text-gray-500 hover:text-gray-300">Learn</Link>
            <Link href="/unlock" className="text-gray-500 hover:text-gray-300">Unlock</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
