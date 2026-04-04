import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How to Finance Land Deals — National Land Data System',
  description: 'Cash is king but not required. Hard money, owner financing, partnership structures, and creative deal-making for land acquisitions.',
}

export default function FinancingLandDealsPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/learn" className="text-gray-400 hover:text-white text-sm flex items-center gap-1 mb-1">← Learn Center</Link>
          <h1 className="text-2xl font-bold">How to Finance Land Deals</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 text-sm text-gray-400 mb-8">
          <span className="px-2 py-0.5 bg-gray-800 rounded-full text-xs">Strategy</span>
          <span>8 min read</span>
          <span>Intermediate</span>
        </div>

        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 mb-8">
          <h2 className="text-xl font-bold text-emerald-400 mb-4">The Short Version</h2>
          <p className="text-gray-300 leading-relaxed">
            Most people think you need tens of thousands in cash to buy land. You don&apos;t.
            Land financing is different from house financing — harder in some ways, easier in others.
            This module covers every legitimate financing path from cash to creative deals,
            with the pros and cons of each.
          </p>
        </div>

        <Section title="The Cash Reality">
          <p>
            Yes — cash is the most powerful form of payment in land transactions. It simplifies negotiations,
            often earns a discount, and eliminates financing risk. But cash doesn&apos;t mean
            I have $50,000 sitting in my bank account. It means: I have access to capital through
            one or more of the methods below.
          </p>
        </Section>

        <Section title="1. Hard Money Lenders">
          <p>
            Hard money lenders are private lenders who lend based on asset value rather than creditworthiness.
            They charge higher interest rates (typically 10-18%) but can close in days.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="bg-emerald-950/30 border border-emerald-800/40 rounded-xl p-4">
              <h4 className="font-bold text-emerald-300 mb-2">Pros</h4>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>-&gt; Fast approval (days, not months)</li>
                <li>-&gt; Credit score doesn&apos;t matter much</li>
                <li>-&gt; Asset value is what counts</li>
                <li>-&gt; Good for time-sensitive deals</li>
              </ul>
            </div>
            <div className="bg-red-950/30 border border-red-800/40 rounded-xl p-4">
              <h4 className="font-bold text-red-300 mb-2">Cons</h4>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>-&gt; Higher interest rates (10-18%)</li>
                <li>-&gt; Short terms (6-18 months typically)</li>
                <li>-&gt; Points and origination fees</li>
                <li>-&gt; Must have exit strategy</li>
              </ul>
            </div>
          </div>
          <p className="mt-4 text-gray-400 text-sm">
            <strong className="text-white">Best for:</strong> Flippers, developers, or buyers who need to close fast
            on a property they plan to sell or refinance within 12 months.
          </p>
        </Section>

        <Section title="2. Land Loans from Banks and Credit Unions">
          <p>
            Some banks — especially community banks and credit unions in rural areas — offer land loans.
            They typically have higher rates, shorter terms, and require more down than mortgage loans.
          </p>
          <ul className="list-none space-y-2 mt-3">
            <li>-&gt; Typical loan-to-value: 60-70% (meaning 30-40% down required)</li>
            <li>-&gt; Terms: 5-15 years typically (not 30 like a mortgage)</li>
            <li>-&gt; Interest rates: 7-12% depending on credit and down payment</li>
            <li>-&gt; Many banks require the land to be improved (road access, utilities nearby)</li>
            <li>-&gt; Community banks in rural markets are your best bet</li>
          </ul>
          <div className="bg-blue-950/30 border border-blue-800/30 rounded-lg p-4 mt-4">
            <span className="text-blue-400 font-semibold">Tip: </span>
            <span className="text-gray-400 text-sm">
              Call community banks in the county where you are buying. Ask specifically for their land loan or lot loan product.
              Big national banks do not usually offer these.
            </span>
          </div>
        </Section>

        <Section title="3. Owner Financing">
          <p>
            Owner financing means the seller carries the note — the property owner acts as the lender.
            This is extremely common in private land sales and is often the most accessible path for buyers with limited capital.
          </p>
          <div className="bg-amber-950/30 border border-amber-800/40 rounded-xl p-5 mt-4">
            <h4 className="font-bold text-amber-300 mb-2">How It Works</h4>
            <p className="text-gray-300 text-sm">
              You and the seller agree on a price, a down payment, an interest rate, and a repayment schedule.
              The seller holds the note. You make payments directly to the seller.
              You typically receive a deed — but the seller may hold a lien against the property until the note is paid off.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="bg-emerald-950/30 border border-emerald-800/40 rounded-xl p-4">
              <h4 className="font-bold text-emerald-300 mb-2">Pros</h4>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>-&gt; No bank qualification needed</li>
                <li>-&gt; Often negotiable terms</li>
                <li>-&gt; Faster closing</li>
                <li>-&gt; Can get better terms than a bank</li>
                <li>-&gt; Many motivated sellers prefer this</li>
              </ul>
            </div>
            <div className="bg-red-950/30 border border-red-800/40 rounded-xl p-4">
              <h4 className="font-bold text-red-300 mb-2">Cons</h4>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>-&gt; Seller may require balloon payment (3-5 years)</li>
                <li>-&gt; Interest rates may be higher than bank</li>
                <li>-&gt; May have due-on-sale clauses</li>
                <li>-&gt; Less regulated — read contracts carefully</li>
              </ul>
            </div>
          </div>
        </Section>

        <Section title="4. Home Equity and HELOC">
          <p>
            If you already own a home or property with equity, a Home Equity Line of Credit (HELOC)
            or home equity loan can be one of the cheapest ways to finance land.
          </p>
          <ul className="list-none space-y-2 mt-3">
            <li>-&gt; HELOC rates are typically 6-9% — far cheaper than hard money</li>
            <li>-&gt; You are borrowing against existing equity — no new lender qualification</li>
            <li>-&gt; Draw as needed (HELOC) vs. lump sum (home equity loan)</li>
            <li>-&gt; Tax deduction may be available if the loan is used for investment property</li>
          </ul>
          <div className="bg-red-950/30 border border-red-800/30 rounded-lg p-4 mt-4">
            <span className="text-red-400 font-semibold">Risk: </span>
            <span className="text-gray-400 text-sm">
              Your home is collateral. If you default, you can lose your primary residence.
              Only use this if you are confident in the land deal is returns.
            </span>
          </div>
        </Section>

        <Section title="5. Self-Directed IRA and 401(k)">
          <p>
            A self-directed IRA or solo 401(k) can invest in real estate — including land.
            The account, not you personally, purchases the asset. All returns flow back into the account tax-advantaged.
          </p>
          <ul className="list-none space-y-2 mt-3">
            <li>-&gt; Must be a self-directed IRA or solo 401(k) — not a standard retirement account</li>
            <li>-&gt; Cannot borrow from the account to purchase — must have cash in the account</li>
            <li>-&gt; All expenses and income flow through the account</li>
            <li>-&gt; Prohibited transactions with family members can disqualify the account</li>
            <li>-&gt; Powerful long-term hold strategy — land grows tax-free inside the IRA</li>
          </ul>
        </Section>

        <Section title="6. Partnership Structures">
          <p>
            If you do not have enough capital alone, partner with someone who does.
            Land deals can be structured in many ways that make sense for multiple parties.
          </p>
          <ul className="list-none space-y-3 mt-3">
            <li className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
              <span className="font-semibold text-white">Equity partnership: </span>
              <span className="text-gray-400 text-sm">You bring the deal and research; partner brings the capital. Profits split based on contribution.</span>
            </li>
            <li className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
              <span className="font-semibold text-white">Joint venture: </span>
              <span className="text-gray-400 text-sm">Formal agreement between two parties to acquire and manage land together. Roles and returns defined upfront.</span>
            </li>
            <li className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
              <span className="font-semibold text-white">Syndication: </span>
              <span className="text-gray-400 text-sm">Multiple investors pool capital to acquire a larger property. You manage; investors get returns plus a share of profits.</span>
            </li>
          </ul>
          <div className="bg-red-950/30 border border-red-800/30 rounded-lg p-4 mt-4">
            <span className="text-red-400 font-semibold">Always: </span>
            <span className="text-gray-400 text-sm">
              Use a real estate attorney to draft any partnership agreement. Verbal partnerships are how people lose money and friendships.
            </span>
          </div>
        </Section>

        <Section title="7. Government Program Financing">
          <p>
            Some state and local programs offer financing assistance for land purchases in targeted areas:
          </p>
          <ul className="list-none space-y-2 mt-3">
            <li>-&gt; <strong className="text-white">State LDA programs: </strong>Some states have Land Development Authorities that offer low-interest loans for land in specific counties.</li>
            <li>-&gt; <strong className="text-white">Land contracts: </strong>Some land banks and LRAs offer land contracts — you pay over time, title transfers after final payment.</li>
            <li>-&gt; <strong className="text-white">USDA loans: </strong>Primarily for homes with land, not raw land alone. Income limits and geographic restrictions apply.</li>
          </ul>
        </Section>

        <Section title="What Path Is Right for You?">
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
            <p className="text-gray-400 mb-4 text-sm">Answer these questions to narrow down your financing path:</p>
            <div className="space-y-3 text-sm">
              <div className="flex flex-col md:flex-row gap-2">
                <span className="font-semibold text-white md:w-1/2">Do you have existing home equity?</span>
                <span className="text-emerald-400 md:w-1/2">Yes —&gt; HELOC. No — skip to next.</span>
              </div>
              <div className="flex flex-col md:flex-row gap-2">
                <span className="font-semibold text-white md:w-1/2">Is this a time-sensitive deal?</span>
                <span className="text-emerald-400 md:w-1/2">Yes —&gt; Hard money. No — bank loan or owner financing.</span>
              </div>
              <div className="flex flex-col md:flex-row gap-2">
                <span className="font-semibold text-white md:w-1/2">Do you have a motivated seller?</span>
                <span className="text-emerald-400 md:w-1/2">Yes —&gt; Explore owner financing.</span>
              </div>
              <div className="flex flex-col md:flex-row gap-2">
                <span className="font-semibold text-white md:w-1/2">Are you planning to hold long-term (5+ years)?</span>
                <span className="text-emerald-400 md:w-1/2">Yes —&gt; Self-directed IRA or partnership.</span>
              </div>
              <div className="flex flex-col md:flex-row gap-2">
                <span className="font-semibold text-white md:w-1/2">Is land in a rural area with a local bank?</span>
                <span className="text-emerald-400 md:w-1/2">Yes —&gt; Call them about a land loan.</span>
              </div>
            </div>
          </div>
        </Section>

        <div className="mt-12 bg-emerald-950/30 border border-emerald-800/40 rounded-2xl p-8">
          <h3 className="text-xl font-bold mb-2">Ready to Find a Financed Land Deal?</h3>
          <p className="text-gray-400 text-sm mb-4">
            Browse St. Louis properties with acquisition assist options — scored, researched, and ready to evaluate.
          </p>
          <Link href="/deals" className="inline-block px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-colors">
            Browse St. Louis Deals
          </Link>
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-4">
          <Link href="/learn/land-risks-for-buyers" className="bg-gray-900/50 border border-gray-800 rounded-xl p-5 hover:border-emerald-700/50 transition-colors group">
            <span className="text-xs text-gray-500">Previous</span>
            <h4 className="font-bold text-white group-hover:text-emerald-400 transition-colors mt-1">Land Risks Every Buyer Should Know</h4>
          </Link>
          <Link href="/learn/land-as-ownership-legacy" className="bg-gray-900/50 border border-gray-800 rounded-xl p-5 hover:border-emerald-700/50 transition-colors group">
            <span className="text-xs text-gray-500">Next</span>
            <h4 className="font-bold text-white group-hover:text-emerald-400 transition-colors mt-1">Land as Ownership and Legacy</h4>
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
