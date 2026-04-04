'use client';

import { useState } from 'react';

const TIER_CONFIG = [
  {
    id: 'supporter',
    price: 5,
    hours: 48,
    label: 'Supporter',
    tagline: 'Full access for 48 hours. Perfect for browsing.',
    features: ['All property listings', 'Full opportunity scores', 'Government Data Translator™', 'Weekly deal digest'],
    highlight: false,
  },
  {
    id: 'standard',
    price: 11,
    hours: 72,
    label: 'Standard',
    tagline: 'Full access for 72 hours. Come back anytime.',
    features: ['All property listings', 'Full opportunity scores', 'Government Data Translator™', 'Acquisition Pathways™', 'Weekly deal digest', 'Unlock again whenever'],
    highlight: true,
  },
  {
    id: 'patron',
    price: 25,
    hours: 168,
    label: 'Patron',
    tagline: 'Full access for 7 days. For serious investors.',
    features: ['Everything in Standard', '7-day access window', 'Priority support'],
    highlight: false,
  },
  {
    id: 'founder',
    price: 100,
    hours: 720,
    label: 'Founder',
    tagline: '30 days. Name on the Founder Wall.',
    features: ['Everything in Patron', '30-day access', 'Founder Wall', 'First access to new cities'],
    highlight: false,
  },
];

export default function UnlockPage() {
  const [selectedTier, setSelectedTier] = useState('standard');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const selected = TIER_CONFIG.find(t => t.id === selectedTier)!;

  const handleCheckout = async () => {
    if (!email) { setError('Please enter your email address.'); return; }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tier: selectedTier,
          city: 'st-louis',
          email: email.trim(),
          name: name.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-emerald-950 border border-emerald-800 rounded-full px-4 py-1.5 mb-4">
            <span className="text-emerald-400 text-xs font-bold tracking-widest uppercase">National Land Data System</span>
          </div>
          <h1 className="text-4xl font-black text-white mb-3">
            Unlock Full Access
          </h1>
          <p className="text-gray-400 text-base max-w-lg mx-auto">
            One-time payment. No subscription. No recurring charges. Pay once, get full access for the current deal set.
          </p>
        </div>

        {/* Trust banner */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 mb-8 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-500">
          <span className="flex items-center gap-1.5">🔒 Secured by Stripe</span>
          <span>·</span>
          <span>No subscription</span>
          <span>·</span>
          <span>No recurring charges</span>
          <span>·</span>
          <span>Come back anytime</span>
          <span>·</span>
          <span>Cancel whenever</span>
        </div>

        {/* Tier grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {TIER_CONFIG.map(tier => (
            <button
              key={tier.id}
              onClick={() => setSelectedTier(tier.id)}
              className={`rounded-xl p-4 text-center border transition-all ${
                selectedTier === tier.id
                  ? 'bg-emerald-900 border-emerald-600 text-white'
                  : 'bg-gray-950 border-gray-800 text-gray-400 hover:border-gray-700'
              } ${tier.highlight ? 'ring-1 ring-emerald-700' : ''}`}
            >
              {tier.highlight && (
                <div className="text-xs text-emerald-400 font-bold mb-1 tracking-wider">MOST POPULAR</div>
              )}
              <div className="text-2xl font-black">${tier.price}</div>
              <div className="text-xs text-gray-400 mt-0.5">{tier.hours}-hour access</div>
              <div className={`text-xs font-bold mt-1 ${selectedTier === tier.id ? 'text-emerald-300' : 'text-gray-500'}`}>{tier.label}</div>
            </button>
          ))}
        </div>

        {/* Selected tier detail */}
        <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6 mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-5">
            <div>
              <h2 className="text-white font-bold text-xl">{selected.label} Access</h2>
              <p className="text-gray-500 text-sm">{selected.tagline}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-black text-white">${selected.price}</div>
              <div className="text-xs text-gray-500">one-time · {selected.hours} hours</div>
            </div>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
            {selected.features.map(f => (
              <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {f}
              </li>
            ))}
          </ul>

          {/* Email capture */}
          <div className="space-y-3 mb-4">
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-emerald-600 transition-colors"
              required
            />
            <input
              type="text"
              placeholder="Name (optional)"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-emerald-600 transition-colors"
            />
          </div>

          {error && (
            <div className="bg-red-950 border border-red-800 text-red-300 text-sm rounded-lg px-4 py-2 mb-4">
              {error}
            </div>
          )}

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-colors text-sm"
          >
            {loading ? 'Redirecting to Stripe...' : `Unlock ${selected.label} — $${selected.price} →`}
          </button>

          <p className="text-center text-gray-600 text-xs mt-3">
            You&apos;ll be redirected to Stripe&apos;s secure checkout. Your card is never stored.
          </p>
        </div>

        {/* Objection handlers */}
        <div className="bg-gray-950 border border-gray-800 rounded-xl p-6 mb-6">
          <h3 className="text-white font-bold text-sm mb-4">Common Questions</h3>
          <div className="space-y-4">
            {[
              { q: 'What if I only need it once?', a: 'Then $11 gets you everything. Done. Come back and unlock again whenever you want.' },
              { q: 'Can I share access with my partner?', a: 'Each unlock is per-browser. Partners each unlock their own — it\'s only $11.' },
              { q: 'What cities are coming?', a: 'Houston, Atlanta, Detroit, New Orleans, Baton Rouge — all in development. Your unlock helps fund the next city.' },
              { q: 'I can\'t afford $11 right now.', a: 'Pay $5 as a Supporter. 48 hours of full access. No judgment.' },
            ].map(item => (
              <div key={item.q} className="border-b border-gray-800 pb-4 last:border-0 last:pb-0">
                <div className="text-white text-sm font-medium mb-1">{item.q}</div>
                <div className="text-gray-500 text-xs leading-relaxed">{item.a}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <a href="/deals" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
            ← View free preview
          </a>
        </div>
      </div>
    </main>
  );
}
