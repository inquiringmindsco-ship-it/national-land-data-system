'use client';

import { useState } from 'react';
import { trackUnlockClick } from './DealsPageClient';

interface Props {
  totalCount: number;
}

const TIER_CONFIG = [
  { id: 'supporter', price: '$5', hours: 48, label: 'Supporter', tagline: 'Perfect for browsing & researching', highlight: false },
  { id: 'standard', price: '$11', hours: 72, label: 'Standard', tagline: 'Best for active investors', highlight: true },
  { id: 'patron', price: '$25', hours: 168, label: 'Patron', tagline: 'For serious land investors', highlight: false },
];

export function AccessSection({ totalCount }: Props) {
  const [selectedTier, setSelectedTier] = useState('standard');
  const [showFlexible, setShowFlexible] = useState(false);
  const [flexibleAmount, setFlexibleAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const selected = TIER_CONFIG.find(t => t.id === selectedTier) ?? TIER_CONFIG[1]!;

  const handleCheckout = (tier?: string) => {
    const t = tier ?? selectedTier;
    setLoading(true);
    trackUnlockClick(t);
    fetch('/api/create-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tier: t, city: 'st-louis' }),
    })
      .then(r => r.json())
      .then(data => {
        if (data.url) window.location.href = data.url;
        else setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const handleFlexiblePay = () => {
    const amount = parseFloat(flexibleAmount);
    if (!amount || amount < 5) return;
    setLoading(true);
    trackUnlockClick('flexible');
    fetch('/api/create-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tier: 'flexible', city: 'st-louis', price_cents: Math.round(amount * 100) }),
    })
      .then(r => r.json())
      .then(data => {
        if (data.url) window.location.href = data.url;
        else setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  return (
    <section className="relative">
      <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-0" />

      <div className="relative bg-gray-950/80 backdrop-blur-sm py-16">

        <div className="max-w-4xl mx-auto px-4 text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-emerald-950 border border-emerald-800 rounded-full px-4 py-1.5 mb-4">
            <svg className="w-3.5 h-3.5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <span className="text-emerald-300 text-xs font-bold tracking-widest uppercase">Unlock Complete Access</span>
          </div>
          <h2 className="text-3xl font-black text-white mb-3">
            Get the complete {totalCount}+ deal set
          </h2>
          <p className="text-gray-400 text-sm max-w-xl mx-auto leading-relaxed">
            Every listing scored, translated, and ready to act on. One price, full intelligence, no subscription.
          </p>
        </div>

        {/* Blurred preview */}
        <div className="max-w-4xl mx-auto px-4 mb-12">
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 z-10 pointer-events-none" />
            <div className="blur-xl opacity-30 select-none">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
                {['2818 N Grand Blvd, 63102 — Score: 74', '2240 S 39th St, 63118 — Score: 82', '7301 Vermont St, 63111 — Score: 79'].map((hint, i) => (
                  <div key={i} className="bg-gray-800 rounded-xl p-4">
                    <div className="text-white font-bold text-sm">{hint}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Access overlay */}
            <div className="relative z-20 bg-gradient-to-t from-black via-black/95 to-transparent pt-24 pb-8 px-6">
              <div className="text-center mb-6">
                <p className="text-white font-bold text-lg mb-1">Unlock the full deal set</p>
                <p className="text-gray-400 text-sm">One-time payment. No subscription. Come back anytime.</p>
              </div>

              {/* Tier selector */}
              <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto mb-4">
                {TIER_CONFIG.map(tier => (
                  <button
                    key={tier.id}
                    onClick={() => setSelectedTier(tier.id)}
                    className={`rounded-xl p-3 text-center border transition-all ${
                      selectedTier === tier.id
                        ? 'bg-emerald-900 border-emerald-600 text-white'
                        : 'bg-gray-900 border-gray-800 text-gray-400 hover:border-gray-700'
                    }`}
                  >
                    <div className="text-xl font-black">{tier.price}</div>
                    <div className="text-xs mt-0.5 opacity-80">{tier.hours}-hr access</div>
                    <div className={`text-xs font-bold mt-1 ${selectedTier === tier.id ? 'text-emerald-300' : 'text-gray-500'}`}>{tier.label}</div>
                    {tier.highlight && <div className="text-xs text-emerald-400 mt-0.5">POPULAR</div>}
                  </button>
                ))}
              </div>

              {/* Selected tier detail */}
              <div className="max-w-lg mx-auto bg-gray-900 rounded-xl p-4 mb-4 border border-gray-800">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-white font-bold">{selected.label} Access</div>
                    <div className="text-gray-500 text-xs">{selected.tagline}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-black text-lg">{selected.price}</div>
                    <div className="text-gray-500 text-xs">{selected.hours} hours</div>
                  </div>
                </div>
                <ul className="space-y-1.5 mb-4">
                  {[
                    `All ${totalCount} property listings`,
                    'Full Parcel Intelligence scores',
                    'Government Data Translator™',
                    'Acquisition Pathway™ per deal',
                    'Deal Classification™ tags',
                    'Weekly Top Deals email digest',
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                      <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleCheckout()}
                  disabled={loading}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold rounded-lg transition-colors text-sm"
                >
                  {loading ? 'Redirecting...' : `Unlock ${selected.label} — ${selected.price} →`}
                </button>
              </div>

              {/* Flexible pay */}
              <div className="max-w-lg mx-auto text-center">
                {showFlexible ? (
                  <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
                    <p className="text-gray-300 text-sm mb-3">Pay what you can. Minimum $5.</p>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        min="5"
                        placeholder="5.00"
                        value={flexibleAmount}
                        onChange={e => setFlexibleAmount(e.target.value)}
                        className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-600"
                      />
                      <button
                        onClick={handleFlexiblePay}
                        disabled={loading}
                        className="px-6 py-2 bg-white text-black font-bold rounded-lg hover:bg-gray-100 text-sm disabled:opacity-50"
                      >
                        Pay
                      </button>
                    </div>
                    <button onClick={() => setShowFlexible(false)} className="text-gray-500 text-xs mt-2 hover:text-gray-400">
                      ← Back to standard tiers
                    </button>
                  </div>
                ) : (
                  <button onClick={() => setShowFlexible(true)} className="text-gray-500 hover:text-gray-300 text-xs transition-colors">
                    Can&apos;t afford {selected.price}?{' '}
                    <span className="text-emerald-400 underline">Pay a flexible amount →</span>
                  </button>
                )}
              </div>

              {/* Trust signals */}
              <div className="flex items-center justify-center gap-4 mt-6 text-gray-500 text-xs">
                <span>🔒 Secured by Stripe</span>
                <span>·</span>
                <span>No subscription</span>
                <span>·</span>
                <span>Come back anytime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
