'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Props {
  onCapture?: (email: string, name: string) => void;
  compact?: boolean;
}

export function EmailCapture({ onCapture, compact = false }: Props) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDismissed(!!localStorage.getItem('nlds_email_captured'));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) { setError('Please enter a valid email.'); return; }
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, source: 'deals_page', intent: 'researching' }),
      });
      const data = await res.json() as { success?: boolean; sessionId?: string; error?: string };

      if (data.success) {
        localStorage.setItem('nlds_email_captured', '1');
        localStorage.setItem('nlds_session_id', data.sessionId ?? '');
        setSuccess(true);
        onCapture?.(email, name);
      } else {
        setError(data.error ?? 'Something went wrong. Try again.');
      }
    } catch {
      setError('Connection error. Try again.');
    } finally {
      setLoading(false);
    }
  };

  if (dismissed || success) return null;

  if (compact) {
    return (
      <div className="bg-emerald-950/40 border border-emerald-800/50 rounded-xl px-4 py-3">
        <p className="text-emerald-300 text-sm font-medium mb-2">
          📬 Get the weekly deal drop — enter your email
        </p>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="flex-1 bg-black/40 border border-emerald-800 rounded-lg px-3 py-1.5 text-white text-xs placeholder-gray-600 focus:outline-none focus:border-emerald-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold rounded-lg transition-colors"
          >
            {loading ? '...' : 'Get Deals'}
          </button>
        </form>
        {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-emerald-950/60 via-black/80 to-black border-y border-emerald-900/50 px-4 py-8">
      <div className="max-w-3xl mx-auto text-center">
        <div className="text-4xl mb-3">📬</div>
        <h2 className="text-2xl font-black text-white mb-2">
          Your first deal is free.
        </h2>
        <p className="text-gray-400 text-sm max-w-lg mx-auto mb-5 leading-relaxed">
          Enter your email to unlock the full system — see every scored deal, acquisition pathway, and strategic breakdown. No credit card. Just real land intelligence.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="First name (optional)"
            className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-emerald-500"
          />
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-emerald-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold rounded-lg transition-colors text-sm whitespace-nowrap"
          >
            {loading ? 'Sending...' : 'Unlock Access →'}
          </button>
        </form>
        {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
        <p className="text-gray-600 text-xs mt-3">
          Weekly deal drops. Unsubscribe anytime. We don&apos;t share your email.
        </p>
      </div>
    </div>
  );
}
