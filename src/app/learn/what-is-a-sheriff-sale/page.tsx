import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'What Is a Sheriff Sale? — National Land Data System',
  description: 'How court-ordered property auctions work, who runs them, and what buyers need to understand before bidding.',
}

export default function SheriffSalePage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/learn" className="text-gray-400 hover:text-white text-sm flex items-center gap-1 mb-1">← Learn Center</Link>
          <h1 className="text-2xl font-bold">What Is a Sheriff Sale?</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 text-sm text-gray-400 mb-8">
          <span className="px-2 py-0.5 bg-gray-800 rounded-full text-xs">Foundation</span>
          <span>6 min read</span>
          <span>Beginner</span>
        </div>

        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 mb-8">
          <h2 className="text-xl font-bold text-emerald-400 mb-4">The Short Version</h2>
          <p className="text-gray-300 leading-relaxed">
            A sheriff sale is a public auction where a sheriff's office sells property under court order to satisfy
            a judgment against the property owner. Unlike a tax sale (which is triggered by unpaid property taxes),
            a sheriff sale is triggered by a court judgment — often a foreclosure, but also mechanic's liens,
            unpaid HOA assessments, or other legal judgments. The process is public, regulated by state law,
            and typically conducted at the county courthouse.
          </p>
        </div>

        <Section title="Sheriff Sales vs. Tax Sales">
          <p>These are the two most common government land auctions — but they're legally distinct:</p>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="bg-amber-950/40 border border-amber-800/40 rounded-xl p-5">
              <h4 className="font-bold text-amber-300 mb-2">Tax Sale</h4>
              <p className="text-gray-300 text-sm">
                Triggered by unpaid property taxes. The government sells the property to collect what's owed.
                Administrative process, not court-ordered.
              </p>
            </div>
            <div className="bg-blue-950/40 border border-blue-800/40 rounded-xl p-5">
              <h4 className="font-bold text-blue-300 mb-2">Sheriff Sale</h4>
              <p className="text-gray-300 text-sm">
                Triggered by a court judgment (foreclosure, mechanic's lien, etc.). A sheriff executes the
                court's order by selling the property at auction. Court-supervised.
              </p>
            </div>
          </div>
        </Section>

        <Section title="What Cases Lead to Sheriff Sales?">
          <ul className="list-none space-y-3">
            {[
              { title: 'Mortgage Foreclosure', desc: 'The most common type. A lender goes to court to foreclose on a property when the borrower stops making payments. The sheriff sells the property to satisfy the remaining mortgage balance.' },
              { title: 'Mechanic\'s Lien', desc: 'A contractor or supplier who wasn\'t paid for work on a property can file a lien. If not paid, they can force a sheriff sale to collect.' },
              { title: 'HOA Assessment Lien', desc: 'In many states, HOA associations can place a lien on a property for unpaid dues and assessments, and eventually force a sale.' },
              { title: 'Court Judgment', desc: 'Any money judgment against a property owner — from a lawsuit, back taxes, unpaid child support — can in some cases be enforced against real property.' },
              { title: 'Partition Action', desc: 'When co-owners of a property disagree and one wants out, a court can order the property sold and proceeds divided.' },
            ].map(({ title, desc }) => (
              <li key={title} className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
                <span className="font-semibold text-white">{title}:</span>
                <p className="text-gray-400 text-sm mt-1">{desc}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="How the Process Works">
          <ol className="list-none space-y-4">
            {[
              { step: '1', title: 'Judgment is entered', desc: 'A court rules that the defendant owes money and that money can be collected from their real property.' },
              { step: '2', title: 'Writ of execution issued', desc: 'The winning party gets a court order called a "writ of execution" directing the sheriff to levy — seize and sell — the defendant\'s property.' },
              { step: '3', title: 'Notice published', desc: 'The sheriff is required to publish notice of the sale in a newspaper (usually for 3-4 weeks) and sometimes post the property physically.' },
              { step: '4', title: 'Sale conducted', desc: 'The auction takes place at the county courthouse (or online in many states now). The highest bidder wins — provided the winning bid meets a minimum set by the court.' },
              { step: '5', title: 'Sheriff\'s deed issued', desc: 'After the sale, the sheriff issues a deed to the winning bidder. This is typically a "sheriff\'s deed" — which in most states carries limited or no warranties about title quality.' },
              { step: '6', title: 'Redemption period', desc: 'In some states, the original owner (or other lienholders) has a statutory period to redeem — buy back the property by paying the judgment plus costs and interest. If they do, the sale is reversed.' },
            ].map(({ step, title, desc }) => (
              <li key={step} className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-900/60 border border-emerald-700/50 flex items-center justify-center text-emerald-400 font-bold text-sm">{step}</span>
                <div>
                  <span className="font-semibold text-white">{title}</span>
                  <p className="text-gray-400 text-sm mt-0.5">{desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section title="Missouri & St. Louis Context">
          <p>
            In Missouri, sheriff sales are conducted at the county level. St. Louis City and St. Louis County
            both run foreclosure sales through their respective Sheriff's offices. Missouri is a "deed theory"
            state — meaning the winning bidder at a sheriff's sale receives a deed immediately, but the
            redemption period (if applicable) runs concurrently with other statutory periods.
          </p>
          <p className="mt-3">
            Missouri does allow redemption periods for some foreclosing lenders and some junior lienholders,
            but these periods are typically short (often 30-60 days for non-primary residences).
            An experienced real estate attorney is strongly recommended before bidding at any Missouri sheriff sale.
          </p>
        </Section>

        <Section title="What a Sheriff's Deed Actually Means">
          <p className="mb-4 text-gray-400">A sheriff's deed is NOT the same as a general warranty deed. Understand what you're buying:</p>
          <ul className="list-none space-y-2">
            {[
              'Most states: Sheriff\'s deed carries NO warranties about title quality — you buy what you see, or less',
              'You may be subject to redemption rights of the prior owner or junior lienholders',
              'Tenants in possession may have rights that survive the sale — even if the buyer didn\'t know they were there',
              'Junior liens (mechanics liens, HOA liens filed after the primary mortgage) may survive and become your problem',
              'You\'re usually responsible for evicting any occupants after the sale — this can take months',
            ].map(item => (
              <li key={item} className="flex items-start gap-2 text-gray-300">
                <span className="text-red-400 mt-0.5">⚠</span>
                {item}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Common Risks at Sheriff Sales">
          <ul className="list-none space-y-3">
            {[
              { label: 'Title defects', desc: 'The sheriff can only sell what the judgment debtor owns — which may be encumbered or contested. A title search before bidding is essential.' },
              { label: 'Occupied properties', desc: 'Properties sold at sheriff sale often have tenants who don\'t leave easily. Eviction is a separate legal process you\'ll have to run.' },
              { label: 'Below-market prices aren\'t guaranteed', desc: 'Properties at sheriff sale sometimes trade near market value if there are multiple bidders or the court sets a high minimum bid.' },
              { label: 'As-is condition', desc: 'The sheriff makes no representations about the physical condition of the property. You\'re buying blind.' },
              { label: 'Redemption', desc: 'In states with redemption periods, the winning bidder may have to wait months before taking possession.' },
            ].map(({ label, desc }) => (
              <li key={label} className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
                <span className="font-semibold text-white">{label}:</span>
                <p className="text-gray-400 text-sm mt-1">{desc}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="How to Bid at a Sheriff Sale">
          <ul className="list-none space-y-2">
            {[
              'Register with the sheriff\'s office before the sale — requirements vary by county',
              'Bring a cashier\'s check for the winning bid (usually immediately or within 24 hours)',
              'Know the homestead exemption rules — in many states, the judgment debtor can claim a homestead exemption that reduces what the sale can recover',
              'Research the judgment amount and any senior liens — you may be buying subject to those',
              'Attend a few sales as an observer before bidding your first time',
            ].map(item => (
              <li key={item} className="flex items-start gap-2 text-gray-300">
                <span className="text-emerald-400 mt-0.5">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </Section>

        <div className="mt-12 bg-emerald-950/30 border border-emerald-800/40 rounded-2xl p-8">
          <h3 className="text-xl font-bold mb-2">See Current St. Louis Deals</h3>
          <p className="text-gray-400 text-sm mb-4">
            Browse tax deeds, government land, and sheriff-adjacent opportunities in St. Louis — all researched and scored.
          </p>
          <Link href="/deals" className="inline-block px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-colors">
            Browse St. Louis Deals →
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
    <section className="mb-10">
      <h2 className="text-xl font-bold text-white mb-4 border-b border-gray-800 pb-2">{title}</h2>
      <div className="space-y-3 text-gray-300 leading-relaxed">{children}</div>
    </section>
  )
}
