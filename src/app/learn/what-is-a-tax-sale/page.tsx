import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'What Is a Tax Sale? — National Land Data System',
  description: 'A plain-language explanation of how tax sales work, why governments hold them, and what buyers should understand before participating.',
}

export default function WhatIsATaxSalePage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/learn" className="text-gray-400 hover:text-white text-sm flex items-center gap-1 mb-1">← Learn Center</Link>
          <h1 className="text-2xl font-bold">What Is a Tax Sale?</h1>
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
            A tax sale is a public auction where a government entity sells a property because the previous owner
            failed to pay property taxes. The winning bidder receives a lien or deed to the property — depending
            on the state — and the government uses the proceeds to recover the unpaid taxes.
          </p>
        </div>

        <Section title="Why Tax Sales Happen">
          <p>
            Every year, property owners are supposed to pay property taxes to their local government. These taxes
            fund schools, police, fire departments, road maintenance, and other public services. When an owner
            stops paying — for any number of reasons — the government has a legal mechanism to recover that debt.
            Rather than waiting indefinitely, governments are empowered to sell the property to collect what&apos;s owed.
            This is a tax sale. The process is governed by state law, and it varies significantly from state to state.
          </p>
        </Section>

        <Section title="Two Main Types of Tax Sales">
          <p className="text-gray-400 mb-4 font-medium">Tax Lien vs. Tax Deed — know which one you&apos;re buying:</p>
          <div className="bg-blue-950/40 border border-blue-800/40 rounded-xl p-5 mb-4">
            <h4 className="font-bold text-blue-300 mb-2">Tax Lien Sale</h4>
            <p className="text-gray-300 text-sm">
              The winning bidder pays the unpaid taxes and receives a lien against the property. The lien
              earns interest (set by the state), and the original owner has a set period to redeem — or buy
              back the property by paying what they owe plus interest. If they don&apos;t redeem, the lien holder
              may be able to foreclose and take title.
            </p>
            <p className="text-gray-500 text-xs mt-2">Common in: Florida, Texas, Alabama, and many other states.</p>
          </div>
          <div className="bg-red-950/40 border border-red-800/40 rounded-xl p-5">
            <h4 className="font-bold text-red-300 mb-2">Tax Deed Sale</h4>
            <p className="text-gray-300 text-sm">
              The property itself is sold outright. The winning bidder pays the unpaid taxes and receives a
              deed to the property immediately. The original owner typically has a short redemption window
              (if any), after which the buyer&apos;s title is cleaner. However, tax deed doesn&apos;t always mean
              perfect title — redemption periods, junior liens, and other encumbrances may still exist.
            </p>
            <p className="text-gray-500 text-xs mt-2">Common in: Illinois, Missouri, Iowa, and many other states.</p>
          </div>
        </Section>

        <Section title="Why Properties End Up at Tax Sales">
          <ul className="list-none space-y-2">
            {[
              'The owner passed away without a will or heirs',
              'The owner moved and abandoned the property',
              'The owner fell behind on taxes due to financial hardship',
              'The property was part of an estate with no surviving family',
              'The owner was incarcerated and lost track of the property',
              'Inherited property with unknown or unreachable heirs',
            ].map(item => (
              <li key={item} className="flex items-start gap-2 text-gray-300">
                <span className="text-emerald-400 mt-0.5">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="What Buyers Need to Understand">
          <p className="text-gray-400 mb-4">Tax sales are not like buying a home on the regular market. Before bidding, understand:</p>
          <ul className="list-none space-y-3">
            {[
              { label: 'You may not be buying clean title.', desc: 'In many states, the original owner&apos;s redemption period survives the sale. In others, junior liens stay attached even after the sale. Always research title before bidding.' },
              { label: 'You may be buying a vacant lot — or a tear-down.', desc: 'Many tax sale properties are in poor condition or have code violations. The government doesn&apos;t disclose condition.' },
              { label: 'You may owe back taxes beyond the purchase price.', desc: 'Some states allow subsequent years&apos; taxes to be tacked onto the lien. Factor this into your total cost.' },
              { label: 'You usually can&apos;t inspect the property before buying.', desc: 'Most tax sales are sold as-is, with no interior access granted prior to purchase.' },
              { label: 'Redemption periods vary widely.', desc: 'Some states give owners 1 year. Some give 3 years. Some give none. Know your state&apos;s rules.' },
            ].map(({ label, desc }) => (
              <li key={label} className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
                <span className="font-semibold text-white">{label}</span>
                <p className="text-gray-400 text-sm mt-1">{desc}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Tax Sale vs. Other Government Land Sales">
          <p>Tax sales are one category of government land disposition. Others include:</p>
          <ul className="list-none space-y-2 mt-3">
            {[
              { label: 'Land Bank Sales', desc: 'Properties acquired by a government entity through tax foreclosure and held in a land bank for redevelopment. Usually sold below market to approved buyers.' },
              { label: 'Sheriff Sales', desc: 'Court-ordered sales to satisfy a judgment against a property owner. Can include foreclosures and other types of liens.' },
              { label: 'Surplus Land Sales', desc: 'Government entities (federal, state, local) selling land they no longer need — old buildings, excess parcels, etc.' },
              { label: 'HUD / GSE Sales', desc: 'Federal Housing Administration and government-sponsored enterprises selling foreclosed properties.' },
            ].map(({ label, desc }) => (
              <li key={label} className="border border-gray-800 rounded-lg p-4">
                <span className="font-semibold text-white">{label}:</span>
                <span className="text-gray-400 text-sm ml-2">{desc}</span>
              </li>
            ))}
          </ul>
        </Section>

        <div className="mt-12 bg-emerald-950/30 border border-emerald-800/40 rounded-2xl p-8">
          <h3 className="text-xl font-bold mb-2">See St. Louis Tax Deed Deals</h3>
          <p className="text-gray-400 text-sm mb-4">Browse current St. Louis tax deeds and government land opportunities — all researched and scored.</p>
          <Link href="/deals" className="inline-block px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-colors">Browse St. Louis Deals →</Link>
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-4">
          <Link href="/learn/what-is-an-lra-land-bank" className="bg-gray-900/50 border border-gray-800 rounded-xl p-5 hover:border-emerald-700/50 transition-colors group">
            <span className="text-xs text-gray-500">Next</span>
            <h4 className="font-bold text-white group-hover:text-emerald-400 transition-colors mt-1">What Is an LRA / Land Bank? →</h4>
          </Link>
          <Link href="/learn/what-is-a-sheriff-sale" className="bg-gray-900/50 border border-gray-800 rounded-xl p-5 hover:border-emerald-700/50 transition-colors group">
            <span className="text-xs text-gray-500">Related</span>
            <h4 className="font-bold text-white group-hover:text-emerald-400 transition-colors mt-1">What Is a Sheriff Sale? →</h4>
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
