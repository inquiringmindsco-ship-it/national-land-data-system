'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const HOURS_MAP: Record<string, number> = { supporter: 48, standard: 72, patron: 168, founder: 720 };

function SuccessContent() {
  const params = useSearchParams();
  const sessionId = params.get('session_id');
  const [status, setStatus] = useState<'verifying' | 'granted' | 'error'>('verifying');
  const [tier, setTier] = useState('standard');
  const [hours, setHours] = useState(72);

  useEffect(() => {
    if (!sessionId) { setStatus('error'); return; }

    localStorage.setItem('nlds_session_id', sessionId);
    localStorage.setItem('nlds_unlocked_at', Date.now().toString());

    fetch('/api/verify-unlock', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId }),
    })
      .then(r => r.json())
      .then(data => {
        if (data.hasAccess) {
          const t = String(data.tier ?? 'standard');
          setTier(t);
          setHours(HOURS_MAP[t] ?? 72);
          setStatus('granted');
          setTimeout(() => { window.location.href = '/deals?unlocked=1'; }, 2000);
        } else {
          setStatus('error');
        }
      })
      .catch(() => setStatus('error'));
  }, [sessionId]);

  if (status === 'verifying') return (
    <div className="text-center">
      <div className="text-5xl mb-4 animate-pulse">🔓</div>
      <h1 className="text-2xl font-black mb-2">Verifying your unlock...</h1>
      <p className="text-gray-500 text-sm">Just a moment while we confirm your access.</p>
    </div>
  );

  if (status === 'granted') return (
    <div className="text-center">
      <div className="text-6xl mb-4">✅</div>
      <h1 className="text-3xl font-black mb-2 text-emerald-400">Access Granted!</h1>
      <p className="text-gray-400 text-sm mb-2">You&apos;re unlocked. Redirecting you to all the deals...</p>
      <p className="text-gray-600 text-xs mb-6">{hours}-hour {tier} access · No subscription</p>
      <div className="bg-emerald-950 border border-emerald-800 rounded-xl p-4 mb-6 text-left max-w-sm mx-auto">
        <p className="text-emerald-300 text-sm font-medium mb-2">What&apos;s included:</p>
        <ul className="text-gray-400 text-xs space-y-1">
          <li>✓ All property listings visible</li>
          <li>✓ Full opportunity scores on every deal</li>
          <li>✓ Acquisition Pathways unlocked</li>
          <li>✓ Risk warnings and strategic insights</li>
        </ul>
      </div>
      <Link href="/deals?unlocked=1" className="inline-block px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-colors text-sm">
        Go to All Deals →
      </Link>
    </div>
  );

  return (
    <div className="text-center">
      <div className="text-5xl mb-4">⚠️</div>
      <h1 className="text-2xl font-black mb-2">Something went wrong</h1>
      <p className="text-gray-500 text-sm mb-6">We couldn&apos;t verify your unlock. Your payment went through — email us and we&apos;ll get you sorted.</p>
      <a href="/unlock" className="inline-block px-8 py-3 bg-white text-black font-bold rounded-lg text-sm">Try Again</a>
    </div>
  );
}

export default function UnlockSuccessPage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <Suspense fallback={
        <div className="text-center">
          <div className="text-5xl mb-4 animate-pulse">🔓</div>
          <h1 className="text-2xl font-black mb-2">Loading...</h1>
        </div>
      }>
        <SuccessContent />
      </Suspense>
    </main>
  );
}
