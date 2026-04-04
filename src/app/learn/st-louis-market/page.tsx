import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'St. Louis Land Market — National Land Data System',
  description: 'Neighborhood-level breakdown of St. Louis land opportunities. Which areas have the best ROI, what to avoid, and market timing.',
}

export default function StLouisMarketPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/learn" className="text-gray-400 hover:text-white text-sm flex items-center gap-1 mb-1">← Learn Center</Link>
          <h1 className="text-2xl font-bold">St. Louis Land Market</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 text-sm text-gray-400 mb-8">
          <span className="px-2 py-0.5 bg-orange-900/50 text-orange-300 rounded-full text-xs">St. Louis Focus</span>
          <span>7 min read</span>
          <span>All Levels</span>
        </div>

        <div className="bg-orange-950/30 border border-orange-800/40 rounded-2xl p-8 mb-8">
          <h2 className="text-xl font-bold text-orange-300 mb-4">The Short Version</h2>
          <p className="text-gray-300 leading-relaxed">
            St. Louis is one of the best land investment markets in America — not because of hype,
            but because of structural data: low land prices relative to other major metros,
            high distressed-property supply, a functioning land bank (LRA), and improving market fundamentals.
            This module breaks down which neighborhoods, what price points, and what to watch for.
          </p>
        </div>

        <Section title="Why St. Louis?">
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            {[
              { label: 'Low entry price', value: '$1,000–$15,000', desc: 'Vacant lots in emerging neighborhoods well below national average' },
              { label: 'High distressed supply', value: '2,000+ LRA parcels', desc: 'One of the largest land bank inventories of any major U.S. city' },
              { label: 'Improving market', value: '12-17% annual appreciation', desc: 'St. Louis neighborhoods gentrifying faster than many realize' },
              { label: 'Functioning land bank', value: 'LRA + St. Louis County', desc: 'Two programs with different rules and property types' },
            ].map(({ label, value, desc }) => (
              <div key={label} className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
                <div className="text-xs text-gray-500 mb-1">{label}</div>
                <div className="text-xl font-bold text-emerald-400">{value}</div>
                <div className="text-gray-400 text-xs mt-1">{desc}</div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Neighborhood-by-Neighborhood Breakdown">
          {[
            {
              area: 'North St. Louis City (Dwelling Ground / Walnut Park / College Hill)',
              potential: 'HIGH',
              color: 'emerald',
              desc: 'Historically undervalued. LRA has massive inventory here. Gentrification is moving north from Downtown.',
              priceRange: '$1,000–$8,000',
              risks: 'High crime, blight, slow appreciation without gentrification spillover',
              tip: 'Best for investors with 5-10 year horizons. The northward development corridor from Downtown is real.',
            },
            {
              area: 'Downtown / Near North Side',
              potential: 'MEDIUM-HIGH',
              color: 'emerald',
              desc: 'City Living push, National Geospatial-Intelligence Agency expansion, Cortex biotech corridor.',
              priceRange: '$5,000–$25,000',
              risks: 'Competition increasing. More buyers = higher prices.',
              tip: 'Act faster here. Deals that sat for 6 months in 2022 are going in weeks in 2024-2026.',
            },
            {
              area: 'South St. Louis (Bevo Mill / Carondelet / Patch)',
              potential: 'MEDIUM',
              color: 'amber',
              desc: 'Stable working-class neighborhoods. Less distressed inventory but more predictable. Lower upside, lower risk.',
              priceRange: '$5,000–$20,000',
              risks: 'Slower appreciation. Less LRA supply. Fewer dramatic turnarounds.',
              tip: 'Good for owner-users who want to build on a specific lot in a known neighborhood.',
            },
            {
              area: 'St. Louis County (North County)',
              potential: 'HIGH',
              color: 'emerald',
              desc: 'Ferguson, Jennings, Normandy — post-2014 reexamination of these markets has created buying opportunities.',
              priceRange: '$3,000–$15,000',
              risks: 'Vacancy rates, crime, uncertain municipal finance stability',
              tip: 'Normandy and surrounding areas have state-level revitalization programs active.',
            },
            {
              area: 'St. Louis County (West County)',
              potential: 'LOW',
              color: 'red',
              desc: 'Expensive. Low distressed inventory. Not where NLDS members should be looking.',
              priceRange: '$25,000–$100,000+',
              risks: 'High competition. Not the NLDS value thesis.',
              tip: 'Skip. Come back when you have $100K+ to deploy.',
            },
            {
              area: 'St. Charles County',
              potential: 'MEDIUM',
              color: 'amber',
              desc: 'Growing exurb. New construction market. Less distressed inventory, more traditional home buying.',
              priceRange: '$15,000–$40,000',
              risks: 'LRA presence is minimal. This is a standard real estate market.',
              tip: 'Good for buyers who want to build new rather than rehabilitate.',
            },
          ].map(({ area, potential, color, desc, priceRange, risks, tip }) => (
            <div key={area} className="bg-gray-900/50 border border-gray-800 rounded-xl p-5 mb-4">
              <div className="flex items-start justify-between gap-4 mb-2">
                <h4 className="font-bold text-white">{area}</h4>
                <span className={`flex-shrink-0 px-2 py-0.5 rounded-full text-xs font-bold ${
                  color === 'emerald' ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-700/50' :
                  color === 'amber' ? 'bg-amber-900/60 text-amber-300 border border-amber-700/50' :
                  'bg-red-900/60 text-red-300 border border-red-700/50'
                }`}>
                  {potential}
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-3">{desc}</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div><span className="text-gray-500">Price range: </span><span className="text-white font-semibold">{priceRange}</span></div>
                <div><span className="text-gray-500">Risk: </span><span className={`font-semibold ${color === 'red' ? 'text-red-300' : color === 'amber' ? 'text-amber-300' : 'text-emerald-300'}`}>{risks}</span></div>
              </div>
              <div className="mt-2 text-xs text-emerald-400 bg-emerald-950/30 rounded px-3 py-2">
                💡 {tip}
              </div>
            </div>
          ))}
        </Section>

        <Section title="Market Timing — When to Buy">
          <p className="mb-4">St. Louis real estate moves in cycles. Here is when specific types of properties tend to become available:</p>
          <ul className="list-none space-y-2">
            {[
              { season: 'Tax Sale Season (February–April)', desc: 'County tax sales happen annually. Properties that didn\'t sell at auction often revert to the LRA within 60-90 days.' },
              { season: 'Q4 (October–December)', desc: 'Lowest buyer competition. Motivated sellers. Some LRA bulk sales happen in fall.' },
              { season: 'Post-storm / Post-flood events', desc: 'Natural disasters create motivated sellers and discounted properties in affected neighborhoods. Watch weather events in the region.' },
              { season: 'Before major announcements', desc: 'When Cortex or NGA expansion news breaks, surrounding property values move. Buying before the announcement = maximum upside.' },
            ].map(({ season, desc }) => (
              <li key={season} className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
                <span className="font-semibold text-white text-sm">{season}:</span>
                <p className="text-gray-400 text-sm mt-1">{desc}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="What to Avoid in St. Louis">
          <ul className="list-none space-y-2">
            {[
              'Floodway properties (FEMA Zone AE/A) — insurance costs will destroy returns',
              'Superfund-adjacent land — North St. Louis has legacy industrial contamination sites',
              'Properties with IRS or state tax liens above $10,000 — payoff eliminates the deal',
              'Properties with expired demolitions filed against them — city will bill you for demo costs',
              'Tax-defaulted properties where the assessment appeal window is still open — value could reset after appeal',
            ].map(item => (
              <li key={item} className="flex items-start gap-2 text-gray-300">
                <span className="text-red-400 mt-0.5">⚠</span>
                {item}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="St. Louis LRA — Specifics">
          <p>
            The St. Louis Land Reutilization Authority (LRA) is one of the oldest and largest land banks in the country.
            Understanding how they work is essential to playing the St. Louis market.
          </p>
          <ul className="list-none space-y-2 mt-3">
            {[
              'Properties listed at STLRealProperty.com — updated weekly',
              'Most vacant lots: $1,000–$3,000',
              'Structures: $3,000–$15,000',
              'Owner-occupancy preference: 30-60 days before public sale',
              'Must occupy property for 5 years after purchase (primary residence) or pay 20% of sale price back',
              'Cash only — no financing',
            ].map(item => (
              <li key={item} className="flex items-start gap-2 text-gray-300 text-sm">
                <span className="text-emerald-400 mt-0.5">→</span>
                {item}
              </li>
            ))}
          </ul>
        </Section>

        <div className="mt-12 bg-emerald-950/30 border border-emerald-800/40 rounded-2xl p-8">
          <h3 className="text-xl font-bold mb-2">See Current St. Louis Deals</h3>
          <p className="text-gray-400 text-sm mb-4">
            Browse active LRA, tax deed, and government land opportunities in St. Louis — all scored and researched.
          </p>
          <Link href="/deals" className="inline-block px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-colors">
            Browse St. Louis Deals →
          </Link>
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-4">
          <Link href="/learn/how-to-research-a-parcel" className="bg-gray-900/50 border border-gray-800 rounded-xl p-5 hover:border-emerald-700/50 transition-colors group">
            <span className="text-xs text-gray-500">Previous</span>
            <h4 className="font-bold text-white group-hover:text-emerald-400 transition-colors mt-1">← How to Research a Parcel</h4>
          </Link>
          <Link href="/learn/land-as-ownership-legacy" className="bg-gray-900/50 border border-gray-800 rounded-xl p-5 hover:border-emerald-700/50 transition-colors group">
            <span className="text-xs text-gray-500">Next</span>
            <h4 className="font-bold text-white group-hover:text-emerald-400 transition-colors mt-1">Land as Ownership & Legacy →</h4>
          </Link>
        </div>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold text-white mb-4 border-b border-gray-800 pb-2">{title}</h2>
      <div className="space-y-3 text-gray-300 leading-relaxed">{children}</div>
    </section>
  )
}
