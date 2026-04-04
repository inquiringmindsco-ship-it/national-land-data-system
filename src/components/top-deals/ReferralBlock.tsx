'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export function ReferralBlock() {
  const [state, setState] = useState<{
    code: string;
    link: string;
    referralCount: number;
    dealsUnlocked: number;
    nextThreshold: number;
    cta: string;
  } | null>(null);
  const [email, setEmail] = useState('');
  const [copied, setCopied] = useState(false);
  const [claiming, setClaiming] = useState(false);
  const [claimSuccess, setClaimSuccess] = useState(false);
  const [claimError, setClaimError] = useState('');

  useEffect(() => {
    // Check URL for referral code param
    const params = new URLSearchParams(window.location.search);
    const refCode = params.get('code');

    if (refCode) {
      // Claim this referral
      setClaiming(true);
      fetch('/api/referral/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: refCode }),
      })
        .then(r => r.json())
        .then(data => {
          if (data.success) setClaimSuccess(true);
          else setClaimError(data.error ?? 'Could not claim referral.');
        })
        .catch(() => setClaimError('Connection error.'))
        .finally(() => setClaiming(false));
    }

    // Load referral status
    const sessionId = sessionStorage.getItem('nlds_session_id') ?? localStorage.getItem('nlds_session_id') ?? '';
    fetch(`/api/referral?session_id=${encodeURIComponent(sessionId)}`)
      .then(r => r.json())
      .then(data => setState(data as typeof state))
      .catch(() => {/* non-critical */});
  }, []);

  const copyLink = () => {
    if (!state?.link) return;
    navigator.clipboard.writeText(state.link).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (claiming) return (
    <div className="bg-emerald-950/40 border border-emerald-800 rounded-xl px-6 py-5 text-center max-w-lg mx-auto">
      <p className="text-emerald-300 animate-pulse">Claiming your referral...</p>
    </div>
  );

  if (claimSuccess) return (
    <div className="bg-emerald-950/40 border border-emerald-800 rounded-xl px-6 py-5 text-center max-w-lg mx-auto">
      <div className="text-4xl mb-2">🎉</div>
      <h3 className="text-white font-bold text-lg mb-1">You&apos;re in!</h3>
      <p className="text-emerald-300 text-sm">Referral claimed. Welcome to NLDS.</p>
    </div>
  );

  if (!state) {
    // Not loaded yet — show generic referral invite
    return (
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-6 md:p-8">
          <div className="flex items-start gap-4 mb-4">
            <div className="text-3xl">🤝</div>
            <div>
              <h3 className="text-white font-bold text-lg mb-1">Refer friends. Unlock more deals.</h3>
              <p className="text-gray-400 text-sm">2 referrals = 3 more deals unlocked. Share your link below.</p>
            </div>
          </div>
          <Link href="/" className="inline-block text-emerald-400 hover:text-emerald-300 text-sm">
            Sign in or get your link →
          </Link>
        </div>
      </section>
    );
  }

  const progress = Math.min(state.referralCount / 2, 1);

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-6 md:p-8">

        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="text-3xl">🤝</div>
          <div className="flex-1">
            <h3 className="text-white font-bold text-lg mb-1">Refer friends. Unlock more deals.</h3>
            <p className="text-gray-400 text-sm">
              For every 2 friends who sign up using your link, we unlock 3 more deals for you — forever.
            </p>
          </div>
          {state.referralCount >= 2 && (
            <span className="text-xs bg-emerald-900 text-emerald-300 px-2 py-1 rounded-full font-bold">
              {state.referralCount} referrals
            </span>
          )}
        </div>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            <span>{state.referralCount} referral{state.referralCount !== 1 ? 's' : ''}</span>
            <span>{state.nextThreshold} more for next unlock</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div
              className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          <div className="text-center mt-2">
            <span className="text-emerald-400 font-bold text-sm">
              {state.referralCount >= 2 ? `${state.dealsUnlocked} bonus deals unlocked` : `${state.nextThreshold} away from unlocking 3 more deals`}
            </span>
          </div>
        </div>

        {/* Referral link */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            readOnly
            value={state.link}
            className="flex-1 bg-black/40 border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm font-mono truncate"
          />
          <button
            onClick={copyLink}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-sm transition-colors whitespace-nowrap"
          >
            {copied ? '✅ Copied' : '📋 Copy Link'}
          </button>
        </div>

        {/* Share buttons */}
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-gray-500 text-xs">Share via:</span>
          <a
            href={`https://twitter.com/intent/tweet?text=I%20just%20found%20${encodeURIComponent(state.link)}&text=${encodeURIComponent('Hidden land deals in St. Louis — scored, ranked, and translated at NLDS. Check it out:')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-400 hover:text-white px-3 py-1.5 bg-gray-800 rounded-full border border-gray-700 transition-colors"
          >
            𝕏 Twitter
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(state.link)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-400 hover:text-white px-3 py-1.5 bg-gray-800 rounded-full border border-gray-700 transition-colors"
          >
            f Facebook
          </a>
          <button
            onClick={() => {
              navigator.clipboard.writeText(state.link);
              // Could open email
            }}
            className="text-xs text-gray-400 hover:text-white px-3 py-1.5 bg-gray-800 rounded-full border border-gray-700 transition-colors"
          >
            ✉️ Email
          </button>
        </div>
      </div>
    </section>
  );
}
