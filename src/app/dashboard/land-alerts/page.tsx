'use client';

import { useState } from 'react';
import { OD_CRITERIA } from '@/lib/land-match';
import type { LandCriteria, LandMatch } from '@/lib/land-match';

export default function LandAlertsPage() {
  const [criteria, setCriteria] = useState<LandCriteria>(OD_CRITERIA);
  const [matches, setMatches] = useState<LandMatch[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function runMatch() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/land-match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ criteria }),
      });
      const data = await res.json();
      if (data.success) {
        setMatches(data.matches);
      } else {
        setError(data.error || 'Failed to run match');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">🎯 Land Match Engine™</h1>
          <p className="text-gray-400">Find land out of thin air</p>
        </div>

        {/* Criteria Panel */}
        <div className="bg-gray-900 rounded-xl p-6 mb-8 border border-gray-800">
          <h2 className="text-xl font-semibold mb-4">Your Criteria</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">State</label>
              <input
                type="text"
                value={criteria.state}
                onChange={(e) => setCriteria({ ...criteria, state: e.target.value })}
                className="w-full bg-black border border-gray-700 rounded-lg px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Max Price</label>
              <input
                type="number"
                value={criteria.maxPrice}
                onChange={(e) => setCriteria({ ...criteria, maxPrice: Number(e.target.value) })}
                className="w-full bg-black border border-gray-700 rounded-lg px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Min Acres</label>
              <input
                type="number"
                value={criteria.minAcres}
                onChange={(e) => setCriteria({ ...criteria, minAcres: Number(e.target.value) })}
                className="w-full bg-black border border-gray-700 rounded-lg px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Max Acres</label>
              <input
                type="number"
                value={criteria.maxAcres}
                onChange={(e) => setCriteria({ ...criteria, maxAcres: Number(e.target.value) })}
                className="w-full bg-black border border-gray-700 rounded-lg px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Use Case</label>
              <select
                value={criteria.useCase}
                onChange={(e) => setCriteria({ ...criteria, useCase: e.target.value as any })}
                className="w-full bg-black border border-gray-700 rounded-lg px-3 py-2 text-white"
              >
                <option value="shelter">Shelter</option>
                <option value="homestead">Homestead</option>
                <option value="farm">Farm</option>
                <option value="hunting">Hunting</option>
                <option value="investment">Investment</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Zoning</label>
              <select
                value={criteria.zoning}
                onChange={(e) => setCriteria({ ...criteria, zoning: e.target.value as any })}
                className="w-full bg-black border border-gray-700 rounded-lg px-3 py-2 text-white"
              >
                <option value="unrestricted">Unrestricted</option>
                <option value="agricultural">Agricultural</option>
                <option value="residential">Residential</option>
                <option value="any">Any</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={criteria.veteranPreference}
                onChange={(e) => setCriteria({ ...criteria, veteranPreference: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="text-sm">Veteran Programs</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={criteria.ownerFinancing === 'preferred'}
                onChange={(e) => setCriteria({ ...criteria, ownerFinancing: e.target.checked ? 'preferred' : 'any' })}
                className="w-4 h-4"
              />
              <span className="text-sm">Owner Financing</span>
            </label>
          </div>

          <button
            onClick={runMatch}
            disabled={loading}
            className="mt-6 w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? '🔍 Scanning...' : '🚀 Find My Land'}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-900/50 border border-red-700 rounded-lg p-4 mb-8 text-red-200">
            {error}
          </div>
        )}

        {/* Results */}
        {matches.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">
              🏆 {matches.length} Matches Found
            </h2>
            <div className="space-y-4">
              {matches.map((match, i) => (
                <div
                  key={i}
                  className={`rounded-xl p-6 border ${
                    i === 0
                      ? 'bg-emerald-900/20 border-emerald-600'
                      : 'bg-gray-900 border-gray-800'
                  }`}
                >
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="text-sm text-gray-400 mb-1">
                        #{i + 1} — {match.listing.city}, {match.listing.state} {match.listing.zipCode}
                      </div>
                      <div className="text-lg font-bold">
                        {match.listing.address || 'Unnamed Property'}
                      </div>
                      <div className="text-sm text-gray-400">
                        {match.listing.county} County • {match.listing.acreage} acres
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-emerald-400">
                        {match.matchScore}/100
                      </div>
                      <div className="text-sm text-gray-400">Match Score</div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    <span className="text-2xl font-bold">
                      {match.listing.price
                        ? `$${match.listing.price.toLocaleString()}`
                        : match.listing.startingBid
                        ? `From $${match.listing.startingBid.toLocaleString()}`
                        : 'Price TBD'}
                    </span>
                    {match.listing.acreage && match.listing.price && (
                      <span className="text-gray-400 ml-2">
                        (${Math.round(match.listing.price / match.listing.acreage).toLocaleString()}/acre)
                      </span>
                    )}
                  </div>

                  {/* Why Matched */}
                  <div className="mb-4">
                    <div className="text-sm font-semibold text-gray-300 mb-2">Why This Matches</div>
                    <div className="flex flex-wrap gap-2">
                      {match.whyMatched.map((reason, j) => (
                        <span
                          key={j}
                          className="bg-emerald-900/40 text-emerald-300 text-sm px-3 py-1 rounded-full"
                        >
                          {reason}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Veteran Programs */}
                  {match.veteranPrograms.length > 0 && (
                    <div className="mb-4">
                      <div className="text-sm font-semibold text-gray-300 mb-2">
                        🇺🇸 Veteran Programs Available
                      </div>
                      <ul className="text-sm text-gray-400 space-y-1">
                        {match.veteranPrograms.map((prog, j) => (
                          <li key={j}>• {prog}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Watch Outs */}
                  {match.watchOuts.length > 0 && (
                    <div className="mb-4">
                      <div className="text-sm font-semibold text-amber-300 mb-2">
                        ⚠️ Watch Out
                      </div>
                      <ul className="text-sm text-amber-400/80 space-y-1">
                        {match.watchOuts.map((warn, j) => (
                          <li key={j}>{warn}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Next Steps */}
                  <div>
                    <div className="text-sm font-semibold text-gray-300 mb-2">
                      📋 Next Steps
                    </div>
                    <ul className="text-sm text-gray-400 space-y-1">
                      {match.nextSteps.map((step, j) => (
                        <li key={j}>{step}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
