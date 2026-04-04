import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'What Is an Adjudicated Property? — National Land Data System',
  description: 'What it means when a court declares a property belongs to no one — and what you can do with it.',
}

export default function AdjudicatedPropertyPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/learn" className="text-gray-400 hover:text-white text-sm flex items-center gap-1 mb-1">← Learn Center</Link>
          <h1 className="text-2xl font-bold">What Is an Adjudicated Property?</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 text-sm text-gray-400 mb-8">
          <span className="px-2 py-0.5 bg-gray-800 rounded-full text-xs">Foundation</span>
          <span>5 min read</span>
          <span>Beginner</span>
        </div>

        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 mb-8">
          <h2 className="text-xl font-bold text-emerald-400 mb-4">The Short Version</h2>
          <p className="text-gray-300 leading-relaxed">
            An adjudicated property is one that a court has formally declared — through a legal process called
            "escheat" or "adjudication" — to belong to no individual owner. This typically happens after years
            of unpaid property taxes with no identifiable owner claiming the property. The government then takes
            title and can sell it through its own disposition process.
          </p>
        </div>

        <div className="prose prose-invert prose-lg max-w-none space-y-8">
          <Section title="The Legal Process: Escheat">
            <p>
              "Escheat" is the legal term for property reverting to the government when there are no lawful heirs
              or claimants. It applies most commonly to estates with no surviving family — but when it comes to
              real property, a simplified version of this process happens at the county tax sale level.
            </p>
            <p>
              After a certain number of years of unpaid property taxes, the county can file an "adjudication" —
              a court action declaring the property tax-defaulted and summarily vesting title in the government entity.
              At this point the property is no longer considered "owned" by anyone. It's available for the county
              to sell, demolish, or hold.
            </p>
          </Section>

          <Section title="Adjudicated vs. Tax Sale Properties">
            <p className="mb-4 text-gray-400">These terms overlap but aren't identical:</p>
            <ul className="list-none space-y-3">
              {[
                { title: 'Tax Sale Property', desc: 'A property being sold because taxes are delinquent. The owner still has legal rights (redemption periods, contest rights) during the process.' },
                { title: 'Adjudicated Property', desc: 'A property where the legal process is complete — the government has been declared the owner. The owner\'s redemption period has expired. It\'s often already in the land bank or government inventory.' },
              ].map(({ title, desc }) => (
                <li key={title} className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
                  <span className="font-semibold text-white">{title}:</span>{' '}
                  <span className="text-gray-400 text-sm">{desc}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Why Adjudicated Properties Matter">
            <p>
              For land buyers, adjudicated properties can represent genuine opportunities — properties that have
              been sitting in government inventory for months or years, with no owner, no contest, and no
              competing bidder. They often sell for a fraction of market value.
            </p>
            <p>
              However, "no owner" cuts both ways. It can mean clean title — or it can mean the county took title
              subject to encumbrances it didn't fully research. Due diligence is essential.
            </p>
          </Section>

          <Section title="States With Significant Adjudicated Property Programs">
            <p className="mb-4">Several states have formal programs specifically for adjudicated and surplus properties:</p>
            <ul className="list-none space-y-2">
              {[
                { state: 'Louisiana', program: 'Louisiana Property Assistance Agency (LPAA)', note: 'State surplus and adjudicated properties sold online.' },
                { state: 'Missouri', program: 'County Collector / Land Bank Programs', note: 'Properties with 3+ years of unpaid taxes can be deeded to the county.' },
                { state: 'Michigan', program: 'MI Thoroughbred / Tax Reverted Property Program', note: 'State auctions tax-foreclosed properties annually.' },
                { state: 'Illinois', program: 'County Treasurer Tax Sales', note: 'Annual scavenger sales for long-delinquent properties.' },
                { state: 'New York', program: 'NYC and Nassau County auctions', note: 'Properties that have gone through obscure title processes.' },
              ].map(({ state, program, note }) => (
                <li key={state} className="border border-gray-800 rounded-lg p-4">
                  <span className="font-semibold text-white">{state}:</span>{' '}
                  <span className="text-gray-400 text-sm">{program}. {note}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="What to Watch For">
            <ul className="list-none space-y-3">
              {[
                { label: 'Title gaps', desc: 'Even after adjudication, some states allow prior owners or creditors to reassert claims within a window. Research the specific state statute.' },
                { label: 'Environmental liens', desc: 'Municipal liens for things like weed cutting, demolition, or asbestos abatement sometimes survive the adjudication process.' },
                { label: 'Occupants', desc: 'A property with no owner doesn\'t mean no occupants. Squatters or tenants with lease rights can complicate possession.' },
                { label: 'Survey issues', desc: 'Properties held by a government for years may have boundary uncertainties. A survey is almost always worth the cost.' },
              ].map(({ label, desc }) => (
                <li key={label} className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
                  <span className="font-semibold text-white">{label}:</span>
                  <p className="text-gray-400 text-sm mt-1">{desc}</p>
                </li>
              ))}
            </ul>
          </Section>
        </div>

        <div className="mt-12 bg-emerald-950/30 border border-emerald-800/40 rounded-2xl p-8">
          <h3 className="text-xl font-bold mb-2">Ready to research a property?</h3>
          <p className="text-gray-400 text-sm mb-4">Our parcel research guide walks you through deed records, tax history, zoning, and liens — step by step.</p>
          <Link href="/learn/how-to-research-a-parcel" className="inline-block px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-colors">
            Research Guide →
          </Link>
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-4">
          <Link href="/learn/what-is-a-tax-sale" className="bg-gray-900/50 border border-gray-800 rounded-xl p-5 hover:border-emerald-700/50 transition-colors group">
            <span className="text-xs text-gray-500">Previous</span>
            <h4 className="font-bold text-white group-hover:text-emerald-400 transition-colors mt-1">← What Is a Tax Sale?</h4>
          </Link>
          <Link href="/learn/land-risks-for-buyers" className="bg-gray-900/50 border border-gray-800 rounded-xl p-5 hover:border-emerald-700/50 transition-colors group">
            <span className="text-xs text-gray-500">Next</span>
            <h4 className="font-bold text-white group-hover:text-emerald-400 transition-colors mt-1">Land Risks Every Buyer Should Know →</h4>
          </Link>
        </div>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-bold text-white mb-4 border-b border-gray-800 pb-2">{title}</h2>
      <div className="space-y-3 text-gray-300 leading-relaxed">{children}</div>
    </section>
  )
}
