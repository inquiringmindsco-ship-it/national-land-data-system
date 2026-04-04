import { STLOUIS_LISTINGS } from '@/data/stlouis-listings';
import { TAX_SALE_LISTINGS } from '@/data/tax-sale-listings';
import { STLOUIS_COUNTY_POST3_LISTINGS } from '@/data/stlouis-county-post3';
import { computeOpportunityScore } from '@/lib/proprietary/parcel-intelligence';
import { classifyDeal } from '@/lib/proprietary/deal-classification';
import { GroupDealCTA } from '@/components/acquisition/GroupDealCTA';

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const ALL_LISTINGS = [...STLOUIS_LISTINGS, ...TAX_SALE_LISTINGS, ...STLOUIS_COUNTY_POST3_LISTINGS];
  const listing = ALL_LISTINGS.find(l => l.id === id);
  const address = listing?.address ?? 'Property';
  return {
    title: `Group Deal: ${address} — NLDS`,
    description: `Pool with other investors to acquire ${address}. See cost per person and how to join.`,
  };
}

function fmt(cents: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(cents / 100);
}

export default async function GroupDealPage({ params }: Props) {
  const { id } = await params;
  const ALL_LISTINGS = [...STLOUIS_LISTINGS, ...TAX_SALE_LISTINGS, ...STLOUIS_COUNTY_POST3_LISTINGS];
  const listing = ALL_LISTINGS.find(l => l.id === id);

  if (!listing) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Deal not found</h1>
          <p className="text-gray-400">This listing may have been removed.</p>
          <a href="/deals" className="text-emerald-400 hover:text-emerald-300 mt-4 inline-block">← Back to deals</a>
        </div>
      </div>
    );
  }

  const score = computeOpportunityScore(listing, ALL_LISTINGS, 'investor');
  const deal = classifyDeal(listing);
  const dealEmoji = deal.dealType === 'FAST OPPORTUNITY' ? '⚡'
    : deal.dealType === 'LONG-TERM HOLD' ? '📈'
    : deal.dealType === 'DEVELOPMENT PLAY' ? '🏗️'
    : '⚠️';

  const price = listing.price ?? 0;
  const acquisitionFee = Math.round(price * 0.25);
  const totalCost = price + acquisitionFee;
  const maxParticipants = totalCost < 150_00 ? 5 : totalCost < 400_00 ? 7 : 10;
  const costPerPerson = Math.ceil(totalCost / maxParticipants);
  const eligibleForGroup = score.total >= 65 && totalCost <= 1_500_00;

  const scoreColor = score.total >= 80 ? 'text-emerald-400' : score.total >= 65 ? 'text-amber-400' : 'text-red-400';

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-gray-800 bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/deals" className="text-gray-500 hover:text-white text-sm">← NLDS Deals</a>
          <span className="text-xs text-gray-600">Group Deal</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-10">

        {/* Hero */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="text-amber-400 text-xs font-bold tracking-wider uppercase mb-1">{deal.dealType}</div>
              <h1 className="text-3xl font-black text-white mb-1">{listing.address}</h1>
              <p className="text-gray-400">{listing.city}, {listing.state} {listing.zipCode}</p>
            </div>
            <div className="text-right">
              <div className={`text-4xl font-black ${scoreColor}`}>{score.total}<span className="text-xl text-gray-600">/100</span></div>
              <div className="text-gray-500 text-xs mt-1">Opportunity Score</div>
            </div>
          </div>

          {eligibleForGroup ? (
            <div className="bg-emerald-950 border border-emerald-800 rounded-xl p-5 mt-4">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full">GROUP DEAL</span>
                <span className="text-emerald-300 text-sm">{maxParticipants} spots · {fmt(costPerPerson)}/person</span>
              </div>

              <div className="mb-1.5 flex justify-between text-xs text-gray-400">
                <span>0 enrolled</span>
                <span>0%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2.5 mb-4">
                <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: '0%' }} />
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { label: 'Listing price', value: price > 0 ? fmt(price) : 'TBD', highlight: false },
                  { label: '+ Acquisition', value: price > 0 ? fmt(acquisitionFee) : 'TBD', highlight: false },
                  { label: 'You pay', value: fmt(costPerPerson), highlight: true },
                ].map(({ label, value, highlight }) => (
                  <div key={label} className={`rounded-lg p-3 text-center ${highlight ? 'bg-emerald-900/50 border border-emerald-800' : 'bg-black/50 border border-gray-800'}`}>
                    <div className={`text-xs mb-1 ${highlight ? 'text-emerald-400' : 'text-gray-500'}`}>{label}</div>
                    <div className={`font-bold ${highlight ? 'text-emerald-300 text-lg' : 'text-white'}`}>{value}</div>
                  </div>
                ))}
              </div>

              <div className="bg-black/30 rounded-lg p-3 border border-gray-800 text-center">
                <div className="text-gray-400 text-xs mb-1">Total group investment</div>
                <div className="text-white font-bold text-xl">{price > 0 ? fmt(totalCost) : 'TBD'}</div>
                <div className="text-gray-500 text-xs mt-0.5">split across {maxParticipants} participants</div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mt-4">
              <div className="text-amber-400 font-bold mb-2">⚠️ Not eligible for group purchase</div>
              <p className="text-gray-400 text-sm">
                This property is above our group acquisition threshold. Consider individual acquisition instead.
              </p>
              <a href={`/data-pack/${listing.id}`} className="text-emerald-400 hover:text-emerald-300 text-sm mt-2 inline-block">
                View full deal details →
              </a>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Why this deal */}
          <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-white font-bold text-lg mb-4">Why this deal?</h2>
            <ul className="space-y-2.5">
              {[
                `Score ${score.total}/100 — ${score.total >= 80 ? 'exceptional' : 'strong'} opportunity`,
                price > 0 ? `Listed at ${fmt(price)} — below market` : 'Below market estimate',
                `${dealEmoji} ${deal.dealType}`,
                listing.occupancyStatus === 'vacant' ? '✓ Confirmed vacant' : null,
                listing.neighborhood ? `Zip ${listing.zipCode} — ${listing.neighborhood}` : `Zip ${listing.zipCode}`,
              ].filter(Boolean).map((point, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-gray-300">
                  <span className="text-emerald-400 flex-shrink-0">✓</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* How it works */}
          <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-white font-bold text-lg mb-4">How it works</h2>
            <div className="space-y-4">
              {[
                { step: 1, label: 'Join the pool', desc: 'Submit interest below. No payment yet.' },
                { step: 2, label: 'Due diligence', desc: 'We verify title, liens, zoning.' },
                { step: 3, label: 'Collect contributions', desc: `${maxParticipants} participants pay ${fmt(costPerPerson)} each.` },
                { step: 4, label: 'Acquire property', desc: 'We handle county filing and deed transfer.' },
                { step: 5, label: 'Co-ownership', desc: `Each investor owns 1/${maxParticipants} fraction.` },
              ].map(({ step, label, desc }) => (
                <div key={step} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-emerald-900 border border-emerald-700 rounded-full flex items-center justify-center">
                    <span className="text-emerald-300 font-bold text-sm">{step}</span>
                  </div>
                  <div className="pt-1">
                    <div className="text-white font-medium text-sm">{label}</div>
                    <div className="text-gray-400 text-xs mt-0.5">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Risks */}
        <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6 mt-6">
          <h2 className="text-white font-bold text-lg mb-3">Risks to consider</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              'Property may have undisclosed liens or encumbrances',
              'Deal falls through if minimum participants not reached',
              'Liquidity is limited — no immediate resale market',
              'Holding costs (taxes, insurance) accrue to all owners',
              'County or title issues could delay or block acquisition',
              'All participants must pay on time for deal to close',
            ].map((risk, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-gray-400">
                <span className="text-red-500 flex-shrink-0">⚠</span>
                {risk}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        {eligibleForGroup && (
          <div className="mt-8">
            <GroupDealCTA
              listingId={listing.id}
              listingAddress={listing.address}
              listingPriceCents={listing.price ?? undefined}
              zipCode={listing.zipCode}
              score={score.total}
            />
          </div>
        )}

        <div className="text-center mt-8">
          <a href="/deals" className="text-gray-500 hover:text-white text-sm">← Back to all deals</a>
        </div>
      </main>
    </div>
  );
}
