'use client';

import { useState, useEffect, useRef } from 'react';
import { track } from '@/components/top-deals/DealsPageClient';

interface AcquisitionFormProps {
  listingId?: string;
  listingAddress?: string;
  listingPriceCents?: number;
  zipCode?: string;
  dealScore?: number;
  triggerLabel?: string;
  variant?: 'button' | 'inline' | 'modal';
  groupDealContext?: boolean;
}

const BUDGET_OPTIONS = [
  { value: 'under_500', label: 'Under $500', cents: 500 },
  { value: '500_1500', label: '$500 – $1,500', cents: 1000 },
  { value: '1500_3000', label: '$1,500 – $3,000', cents: 2250 },
  { value: '3000_5000', label: '$3,000 – $5,000', cents: 4000 },
  { value: '5000_plus', label: '$5,000+', cents: 7500 },
];

const INTEREST_OPTIONS = [
  { value: 'browsing', label: 'Just browsing', emoji: '👀' },
  { value: 'researching', label: 'Actively researching', emoji: '🔍' },
  { value: 'ready', label: 'Ready to move fast', emoji: '⚡' },
  { value: 'committed', label: 'Ready to buy now', emoji: '🎯' },
];

const TIMELINE_OPTIONS = [
  { value: 'asap', label: 'ASAP' },
  { value: '1_3months', label: '1–3 months' },
  { value: '3_6months', label: '3–6 months' },
  { value: 'flexible', label: 'Flexible' },
];

export function AcquisitionForm({
  listingId,
  listingAddress,
  listingPriceCents,
  zipCode,
  dealScore,
  triggerLabel = 'Get help acquiring this property →',
  variant = 'button',
}: AcquisitionFormProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<'interest' | 'contact' | 'success'>('interest');
  const [loading, setLoading] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState('');
  const [selectedInterest, setSelectedInterest] = useState('');
  const [selectedTimeline, setSelectedTimeline] = useState('flexible');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const modalRef = useRef<HTMLDivElement>(null);
  const sessionId = useRef(
    typeof window !== 'undefined' ? (sessionStorage.getItem('nlds_session_id') ?? '') : ''
  ).current;

  // Track when user opens form
  useEffect(() => {
    if (open && listingId) {
      track('acquisition_form_open', {
        listingId,
        listingAddress,
        zipCode,
        dealScore,
      });
    }
  }, [open, listingId]);

  // Close on escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!selectedBudget) errs.budget = 'Select a budget range';
    if (!selectedInterest) errs.interest = 'Select your interest level';
    if (!name.trim()) errs.name = 'Name required';
    if (!email.trim() || !email.includes('@')) errs.email = 'Valid email required';
    return errs;
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);

    const budgetOption = BUDGET_OPTIONS.find(b => b.value === selectedBudget);

    try {
      const res = await fetch('/api/acquisition/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.trim(),
          budget_cents: budgetOption?.cents ?? 0,
          budget_display: budgetOption?.label ?? selectedBudget,
          interest_level: selectedInterest,
          timeline: selectedTimeline,
          listing_id: listingId,
          listing_address: listingAddress,
          listing_price_cents: listingPriceCents,
          zip_code: zipCode,
          deal_score: dealScore,
          session_id: sessionId,
        }),
      });

      if (res.ok) {
        setStep('success');
        track('acquisition_form_submit', {
          listingId,
          budget_display: budgetOption?.label,
          interest_level: selectedInterest,
        });
      } else {
        const data = await res.json();
        setErrors({ form: data.error ?? 'Something went wrong. Please try again.' });
      }
    } catch {
      setErrors({ form: 'Connection error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  // ── Modal ──
  if (variant === 'modal') {
    if (!open) {
      return (
        <button
          onClick={() => setOpen(true)}
          className="w-full py-3 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-lg transition-colors text-sm"
        >
          {triggerLabel}
        </button>
      );
    }
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setOpen(false)} />
        <div ref={modalRef} className="relative bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-md p-6 shadow-2xl">
          {step === 'success' ? <SuccessView address={listingAddress} /> : <FormContent />}
        </div>
      </div>
    );
  }

  // ── Inline ──
  if (variant === 'inline') {
    if (!open) {
      return (
        <button onClick={() => setOpen(true)} className="text-emerald-400 hover:text-emerald-300 text-sm font-medium underline">
          {triggerLabel}
        </button>
      );
    }
    return (
      <div className="border border-emerald-900 bg-emerald-950/30 rounded-xl p-5 my-4">
        {step === 'success' ? <SuccessView address={listingAddress} /> : <FormContent />}
      </div>
    );
  }

  // ── Button (opens inline toggle) ──
  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full py-3 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-lg transition-colors text-sm"
      >
        {triggerLabel}
      </button>
    );
  }

  return (
    <div className="border border-emerald-800 bg-gray-950 rounded-xl p-5 my-3">
      {step === 'success' ? <SuccessView address={listingAddress} /> : <FormContent />}
    </div>
  );

  function FormContent() {
    return (
      <div>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-white font-bold text-lg">Acquisition Help</h3>
          <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-gray-300 text-lg">×</button>
        </div>

        {errors.form && (
          <div className="bg-red-900/30 border border-red-800 text-red-300 rounded-lg px-4 py-2 mb-4 text-sm">
            {errors.form}
          </div>
        )}

        {step === 'interest' && <InterestStep />}
        {step === 'contact' && <ContactStep />}

        <div className="mt-4 text-center text-gray-600 text-xs">
          No spam. No obligation. We just help you acquire land.
        </div>
      </div>
    );
  }

  function InterestStep() {
    return (
      <div className="space-y-5">
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">Your budget for this type of deal?</label>
          <div className="grid grid-cols-1 gap-2">
            {BUDGET_OPTIONS.map(opt => (
              <button
                key={opt.value}
                onClick={() => setSelectedBudget(opt.value)}
                className={`text-left px-4 py-2.5 rounded-lg border text-sm transition-all ${
                  selectedBudget === opt.value
                    ? 'bg-emerald-900 border-emerald-600 text-white'
                    : 'bg-gray-900 border-gray-800 text-gray-400 hover:border-gray-700'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          {errors.budget && <p className="text-red-400 text-xs mt-1">{errors.budget}</p>}
        </div>

        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">How serious are you?</label>
          <div className="grid grid-cols-2 gap-2">
            {INTEREST_OPTIONS.map(opt => (
              <button
                key={opt.value}
                onClick={() => setSelectedInterest(opt.value)}
                className={`text-left px-3 py-2.5 rounded-lg border text-sm transition-all ${
                  selectedInterest === opt.value
                    ? 'bg-emerald-900 border-emerald-600 text-white'
                    : 'bg-gray-900 border-gray-800 text-gray-400 hover:border-gray-700'
                }`}
              >
                <span className="mr-1.5">{opt.emoji}</span>{opt.label}
              </button>
            ))}
          </div>
          {errors.interest && <p className="text-red-400 text-xs mt-1">{errors.interest}</p>}
        </div>

        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">Timeline</label>
          <div className="flex gap-2 flex-wrap">
            {TIMELINE_OPTIONS.map(opt => (
              <button
                key={opt.value}
                onClick={() => setSelectedTimeline(opt.value)}
                className={`px-3 py-1.5 rounded-full border text-xs transition-all ${
                  selectedTimeline === opt.value
                    ? 'bg-emerald-900 border-emerald-600 text-white'
                    : 'bg-gray-900 border-gray-800 text-gray-400'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => {
            const errs: Record<string, string> = {};
            if (!selectedBudget) errs.budget = 'Select a budget range';
            if (!selectedInterest) errs.interest = 'Select your interest level';
            setErrors(errs);
            if (Object.keys(errs).length === 0) setStep('contact');
          }}
          className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-colors"
        >
          Continue →
        </button>
      </div>
    );
  }

  function ContactStep() {
    return (
      <div className="space-y-4">
        <p className="text-gray-400 text-sm">
          We&apos;ll reach out within 24 hours with acquisition guidance for{' '}
          {listingAddress ? <span className="text-white font-medium">{listingAddress}</span> : 'this property'}.
        </p>

        <div>
          <label className="block text-gray-400 text-xs uppercase tracking-wider mb-1.5">Name</label>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 text-sm focus:border-emerald-700 focus:outline-none"
          />
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-gray-400 text-xs uppercase tracking-wider mb-1.5">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 text-sm focus:border-emerald-700 focus:outline-none"
          />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-gray-400 text-xs uppercase tracking-wider mb-1.5">Phone <span className="text-gray-600">(optional)</span></label>
          <input
            type="tel"
            placeholder="(555) 000-0000"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 text-sm focus:border-emerald-700 focus:outline-none"
          />
        </div>

        <div className="bg-gray-950 rounded-lg p-3 border border-gray-800">
          <div className="text-gray-400 text-xs mb-1">Selected budget</div>
          <div className="text-white font-medium text-sm">
            {BUDGET_OPTIONS.find(b => b.value === selectedBudget)?.label ?? '—'}
          </div>
          <div className="text-gray-500 text-xs mt-1">
            Interest: {INTEREST_OPTIONS.find(i => i.value === selectedInterest)?.label ?? '—'}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold rounded-lg transition-colors"
        >
          {loading ? 'Submitting...' : 'Submit →'}
        </button>

        <button onClick={() => setStep('interest')} className="w-full text-gray-500 hover:text-gray-300 text-xs py-1">
          ← Back
        </button>
      </div>
    );
  }

  function SuccessView({ address }: { address?: string }) {
    return (
      <div className="text-center py-4">
        <div className="text-4xl mb-3">🎯</div>
        <h3 className="text-white font-bold text-lg mb-2">You&apos;re in the queue!</h3>
        <p className="text-gray-400 text-sm mb-4">
          We&apos;ll reach out within 24 hours with acquisition guidance
          {address ? ` for ${address}` : ''}.
        </p>
        <div className="bg-emerald-950 border border-emerald-900 rounded-lg p-3 mb-4">
          <p className="text-emerald-300 text-xs font-medium">
            In the meantime — check your email for deal insights on this property.
          </p>
        </div>
        <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-gray-300 text-sm">
          Close
        </button>
      </div>
    );
  }
}
