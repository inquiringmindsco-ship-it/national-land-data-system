'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function ReferralContent() {
  const params = useSearchParams();
  const code = params.get('code');
  const [status, setStatus] = useState<'loading' | 'claimed' | 'error'>('loading');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!code) { setStatus('error'); return; }
    fetch('/api/referral/claim', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    })
      .then(r => r.json())
      .then(data => {
        if (data.success) setStatus('claimed');
        else setStatus('error');
      })
      .catch(() => setStatus('error'));
  }, [code]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    setSubmitting(true);
    try {
      await fetch('/api/referral/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, email, name }),
      });
      setStatus('claimed');
    } catch {
      setStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md w-full text-center">
      {status === 'loading' && (
        <div>
          <div className="text-5xl mb-4 animate-pulse">🤝</div>
          <h1 className="text-2xl font-black mb-2">Checking your referral...</h1>
          <p className="text-gray-500 text-sm">One moment.</p>
        </div>
      )}

      {status === 'claimed' && (
        <div>
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl font-black mb-2 text-emerald-400">You&apos;re in!</h1>
          <p className="text-gray-400 text-sm mb-6 leading-relaxed">
            Your referral has been credited. Welcome to the NLDS waitlist — we&apos;ll reach out when your access is ready.
          </p>
          <Link
            href="/deals"
            className="inline-block px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-colors"
          >
            Browse Free Deals →
          </Link>
        </div>
      )}

      {status === 'error' && (
        <div>
          <div className="text-5xl mb-4">🤔</div>
          <h1 className="text-2xl font-black mb-2">Invalid referral link</h1>
          <p className="text-gray-500 text-sm mb-6">
            This link may have expired or is invalid.
          </p>
          <Link href="/deals" className="text-emerald-400 hover:text-emerald-300 text-sm">
            Browse deals without a referral →
          </Link>
        </div>
      )}
    </div>
  );
}

export default function ReferralPage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <Suspense fallback={
        <div className="max-w-md w-full text-center">
          <div className="text-5xl mb-4 animate-pulse">🤝</div>
          <h1 className="text-2xl font-black mb-2">Loading...</h1>
        </div>
      }>
        <ReferralContent />
      </Suspense>
    </main>
  );
}
