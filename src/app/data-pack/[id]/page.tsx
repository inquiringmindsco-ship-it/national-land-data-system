'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Listing } from '@/lib/types';
import { computeOpportunityScore } from '@/lib/proprietary/parcel-intelligence';
import { STLOUIS_LISTINGS } from '@/data/stlouis-listings';
import { TAX_SALE_LISTINGS } from '@/data/tax-sale-listings';
import { STLOUIS_COUNTY_POST3_LISTINGS } from '@/data/stlouis-county-post3';
import {
  MapPin, FileText, Phone, Calendar, DollarSign, Building2,
  CheckCircle, ChevronRight, ArrowLeft, CreditCard, Loader2,
  User, Home, Map, Clock, BookOpen, AlertCircle
} from 'lucide-react';

const ALL_LISTINGS = [...STLOUIS_LISTINGS, ...TAX_SALE_LISTINGS, ...STLOUIS_COUNTY_POST3_LISTINGS];

interface Props {
  listingId: string;
}

function fmt(cents: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(cents / 100);
}

function getListingById(id: string): { listing: Listing; score: ReturnType<typeof computeOpportunityScore> } | null {
  const listing = ALL_LISTINGS.find(l => l.id === id);
  if (!listing) return null;
  const score = computeOpportunityScore(listing, ALL_LISTINGS, 'investor');
  return { listing, score };
}

export default function DataPackPage({ params }: { params: Promise<{ id: string }> }) {
  const [listingId, setListingId] = useState<string>('');
  const [data, setData] = useState<{ listing: Listing; score: ReturnType<typeof computeOpportunityScore> } | null>(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const [purchased, setPurchased] = useState(false);

  useEffect(() => {
    params.then(p => {
      setListingId(p.id);
      const found = getListingById(p.id);
      setData(found);
      setLoading(false);
    });
  }, [params]);

  // Check for success ?session_id=
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('session_id')) {
      setPurchased(true);
    }
  }, []);

  async function handlePurchase() {
    if (!data) return;
    setPurchasing(true);
    try {
      const res = await fetch('/api/create-data-pack-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          listingId: data.listing.id,
          listingAddress: data.listing.address,
          listingSource: data.listing.sourceName,
        }),
      });
      const { url, error } = await res.json();
      if (error) {
        alert('Checkout error: ' + error);
        setPurchasing(false);
        return;
      }
      if (url) {
        window.location.href = url;
      }
    } catch (e) {
      alert('Something went wrong. Please try again.');
      setPurchasing(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Property not found</h1>
          <Link href="/deals" className="text-emerald-400 hover:text-emerald-300">← Back to deals</Link>
        </div>
      </div>
    );
  }

  const { listing, score } = data;
  const isPurchased = purchased || (typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('session_id'));

  // Generate data pack content based on property type
  const isLRA = listing.sourceName?.includes('LRA') || listing.propertyType === 'GOVERNMENT_LAND';
  const isSheriffSale = listing.sourceName?.includes('Sheriff') || listing.originalLabel?.includes('Sheriff');
  const isPostThird = listing.sourceName?.includes('County') && listing.rawData?.locator;
  const owner = listing.rawData?.owner as string | undefined;
  const taxNum = listing.rawData?.locator as string | undefined;
  const parcelId = listing.parcelId || taxNum;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-950">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/deals" className="flex items-center gap-2 text-gray-400 hover:text-white text-sm">
            <ArrowLeft className="w-4 h-4" /> NLDS Deals
          </Link>
          <span className="text-xs text-gray-600">Property Data Pack</span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10">
        {/* Property hero */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="text-amber-400 text-xs font-bold tracking-wider uppercase mb-1">
                {isLRA ? '🏛️ LRA Parcel' : isSheriffSale ? '⚖️ Sheriff Sale' : isPostThird ? '📋 Post-Third Sale' : '🏠 Tax Sale'}
              </div>
              <h1 className="text-3xl font-black text-white mb-1">{listing.address}</h1>
              <p className="text-gray-400">{listing.city}, {listing.state} {listing.zipCode}</p>
            </div>
            <div className={`text-4xl font-black ${score.total >= 80 ? 'text-emerald-400' : score.total >= 65 ? 'text-amber-400' : 'text-red-400'}`}>
              {score.total}<span className="text-xl text-gray-600">/100</span>
            </div>
          </div>
        </div>

        {/* Data pack contents */}
        <div className="bg-gray-950 border border-gray-800 rounded-2xl overflow-hidden mb-8">
          <div className="bg-emerald-900/30 border-b border-emerald-800 px-6 py-4">
            <h2 className="text-emerald-400 font-bold text-lg flex items-center gap-2">
              <FileText className="w-5 h-5" />
              What&apos;s in this Property Data Pack
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Everything you need to pursue this property — compiled from official sources
            </p>
          </div>

          <div className="p-6 space-y-4">
            {/* Property basics */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
                <Home className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <div className="text-white font-medium">Property basics</div>
                <div className="text-gray-400 text-sm">
                  Full address, parcel ID, neighborhood, zoning type, occupancy status
                </div>
                <div className="mt-1 text-xs text-gray-500 font-mono">{listing.parcelId || 'See below'}</div>
              </div>
            </div>

            {/* Owner info */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <div className="text-white font-medium">Owner of record</div>
                <div className="text-gray-400 text-sm">
                  {owner ? (
                    <span>From county assessor records: <strong className="text-white">{owner}</strong></span>
                  ) : (
                    <span className="text-amber-400">Owner info compiled from county records at time of purchase</span>
                  )}
                </div>
              </div>
            </div>

            {/* Financials */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-4 h-4 text-yellow-400" />
              </div>
              <div>
                <div className="text-white font-medium">Minimum bid / opening offer</div>
                <div className="text-gray-400 text-sm">
                  {listing.price && listing.price > 0 ? (
                    <span>{fmt(listing.price)} — your starting offer at {isLRA ? 'the LRA' : isSheriffSale ? 'Sheriff Auction' : 'Post-Third Sale'}</span>
                  ) : isPostThird && taxNum ? (
                    <span className="text-amber-400">Lookup Locator #{taxNum} at stlouiscountymo.gov for current minimum bid</span>
                  ) : (
                    <span className="text-amber-400">Available in pack — based on delinquent taxes owed</span>
                  )}
                </div>
              </div>
            </div>

            {/* Step by step */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
                <Map className="w-4 h-4 text-purple-400" />
              </div>
              <div>
                <div className="text-white font-medium">Step-by-step acquisition procedure</div>
                <div className="text-gray-400 text-sm">
                  {isLRA ? (
                    <span>Exact LRA purchase process: application, inspection, closing — with timelines</span>
                  ) : isSheriffSale ? (
                    <span>Sheriff sale bidding process: registration, deposit, auction day procedure</span>
                  ) : isPostThird ? (
                    <span>Post-Third Sale process: direct purchase from Collector, bid submission steps</span>
                  ) : (
                    <span>Full acquisition walkthrough for this deal type</span>
                  )}
                </div>
              </div>
            </div>

            {/* Who to contact */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
                <Phone className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <div className="text-white font-medium">Who to contact</div>
                <div className="text-gray-400 text-sm">
                  Department name, phone number, and what to say when you call about this specific property
                </div>
              </div>
            </div>

            {/* Key dates */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-4 h-4 text-orange-400" />
              </div>
              <div>
                <div className="text-white font-medium">Key dates and deadlines</div>
                <div className="text-gray-400 text-sm">
                  {listing.auctionDate ? (
                    <span>Auction date: {listing.auctionDate} — plus all submission deadlines</span>
                  ) : (
                    <span>Next sale date and all relevant deadlines for this property type</span>
                  )}
                </div>
              </div>
            </div>

            {/* Required forms */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-4 h-4 text-pink-400" />
              </div>
              <div>
                <div className="text-white font-medium">Required forms and documents</div>
                <div className="text-gray-400 text-sm">
                  Every form you need, where to download it, and how to fill it out correctly
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sample procedure preview */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-8">
          <h3 className="text-white font-bold mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-gray-400" />
            Sample: What the procedure section looks like
          </h3>
          <div className="space-y-3 text-sm">
            {isLRA ? (
              <>
                <div className="flex gap-3">
                  <span className="text-emerald-400 font-mono w-6">1.</span>
                  <span className="text-gray-300">Obtain property application from stlouis-mo.gov/lra — or request by mail from LRA office at 1520 Market St, Suite 2000</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-emerald-400 font-mono w-6">2.</span>
                  <span className="text-gray-300">Schedule property inspection with LRA coordinator — required before bid acceptance</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-emerald-400 font-mono w-6">3.</span>
                  <span className="text-gray-300">Submit bid with 10% deposit (cashier&apos;s check). Balance due at closing within 30 days.</span>
                </div>
              </>
            ) : isSheriffSale ? (
              <>
                <div className="flex gap-3">
                  <span className="text-emerald-400 font-mono w-6">1.</span>
                  <span className="text-gray-300">Register with Sheriff&apos;s office at least 5 business days before auction — bring valid ID and deposit</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-emerald-400 font-mono w-6">2.</span>
                  <span className="text-gray-300">Attend auction at St. Louis City Hall — bidding starts at upset price (delinquent taxes + costs)</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-emerald-400 font-mono w-6">3.</span>
                  <span className="text-gray-300">Pay high bid minus deposit within 24 hours. Remaining balance due within 10 days.</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex gap-3">
                  <span className="text-emerald-400 font-mono w-6">1.</span>
                  <span className="text-gray-300">Contact St. Louis County Collector at (314) 622-4210 with Locator #{taxNum || parcelId} to confirm current minimum bid</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-emerald-400 font-mono w-6">2.</span>
                  <span className="text-gray-300">Submit written offer to Collector&apos;s office — minimum bid plus any applicable fees</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-emerald-400 font-mono w-6">3.</span>
                  <span className="text-gray-300">If accepted, complete purchase within 30 days. Deed recorded at St. Louis County Recorder of Deeds.</span>
                </div>
              </>
            )}
          </div>
          <div className="mt-4 text-xs text-gray-500">
            ↑ Full procedure with exact phone numbers, form names, office addresses included in purchased pack
          </div>
        </div>

        {/* Purchase CTA */}
        {isPurchased ? (
          <div className="bg-emerald-900/30 border border-emerald-800 rounded-2xl p-6 text-center">
            <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
            <h3 className="text-emerald-400 font-bold text-xl mb-2">Purchase Complete</h3>
            <p className="text-gray-400 text-sm mb-4">
              Your property data pack is being prepared. You&apos;ll receive a download link at the email address you provided.
            </p>
            <p className="text-gray-500 text-xs">
              Questions? Email support@national-land-data-system.com
            </p>
          </div>
        ) : (
          <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6 text-center">
            <div className="text-gray-400 text-sm mb-2">One-time purchase</div>
            <div className="text-5xl font-black text-white mb-1">$29</div>
            <div className="text-gray-500 text-sm mb-6">per property · instant delivery</div>

            <button
              onClick={handlePurchase}
              disabled={purchasing}
              className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-gray-700 disabled:text-gray-400 text-white font-bold py-4 rounded-xl transition flex items-center justify-center gap-2 text-lg"
            >
              {purchasing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Redirecting to checkout...
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5" />
                  Buy Property Data Pack — $29
                </>
              )}
            </button>

            <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-emerald-500" /> Secure checkout
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-emerald-500" /> Instant delivery
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-emerald-500" /> PDF format
              </span>
            </div>

            <p className="text-gray-600 text-xs mt-4">
              Questions? Email support@national-land-data-system.com
            </p>
          </div>
        )}

        {/* Back link */}
        <div className="text-center mt-8">
          <Link href="/deals" className="text-gray-500 hover:text-white text-sm flex items-center justify-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Back to all deals
          </Link>
        </div>
      </main>
    </div>
  );
}
