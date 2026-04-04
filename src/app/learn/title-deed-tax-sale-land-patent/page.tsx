import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Title vs. Deed vs. Tax Sale Title vs. Land Patent — NLDS Learn',
  description:
    'A clear reference guide explaining the different types of property ownership documents — land patents, warranty deeds, quitclaim deeds, tax deeds, and more.',
};

export default function TitleDeedTaxSaleLandPatentPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-50 border-b border-gray-800 bg-gray-950 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/learn" className="text-gray-500 hover:text-white text-sm flex items-center gap-1.5 transition-colors">
            ← Learn Center
          </Link>
          <span className="text-xs text-gray-600">NLDS Learn</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-10">
        <div className="text-gray-600 text-xs mb-6 uppercase tracking-widest">
          Learn Center &rsaquo; Property Ownership Documents
        </div>

        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-amber-950 border border-amber-800 rounded-full px-4 py-1.5 mb-5">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">Advanced</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
            Title vs. Deed vs. Tax Sale Title vs. Land Patent
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
            A reference guide to the different documents that establish, transfer, and cloud property ownership. The type of deed you receive tells you a lot about what you are actually buying.
          </p>
          <div className="flex items-center gap-4 mt-5 text-gray-600 text-xs">
            <span>8 min read</span>
            <span>·</span>
            <span>Reference</span>
            <span>·</span>
            <span>Updated April 2026</span>
          </div>
        </div>

        {/* Key insight callout */}
        <div className="bg-emerald-950 border border-emerald-900 rounded-2xl p-6 mb-12">
          <div className="text-emerald-300 text-xs font-bold uppercase tracking-widest mb-3">Key insight</div>
          <p className="text-gray-300 leading-relaxed">
            The type of deed you receive tells you a lot about what you are actually buying. A general warranty deed from a seller with clean title is the gold standard. A quitclaim deed from a tax sale is a much riskier transaction — but may still be a good deal if the property has no actual title problems.
          </p>
        </div>

        {/* Section 1: Land Patent */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-white mb-5 flex items-center gap-3">
            <span className="text-emerald-400 text-lg font-bold">01</span>
            Land Patent
          </h2>
          <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <div className="text-white font-bold mb-1">The original grant from a sovereign government</div>
                <div className="text-gray-500 text-sm">Also called: patent · land grant</div>
              </div>
              <span className="bg-emerald-900 text-emerald-300 text-xs px-3 py-1 rounded-full font-bold flex-shrink-0">Root of title</span>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              A land patent is a formal grant issued by a sovereign government — typically the United States federal government — conveying title to a specific parcel from the public domain to a private individual. It is the &ldquo;birth certificate&rdquo; of a property: it creates title from zero, establishing the first link in the chain of title.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Land patents were the standard instrument for transferring federal land during the 19th and early 20th centuries, issued under programs like the Homestead Act, cash sales at federal land offices, and railroad grants. You rarely encounter an active land patent today as a transaction document — the property has changed hands many times since — but the patent is the historical root that everything else traces back to.
            </p>
          </div>
          <div className="mt-4 p-4 bg-gray-900 border border-gray-800 rounded-xl">
            <div className="text-white font-bold text-xs mb-1">Warranty level</div>
            <div className="flex items-center gap-2 mt-2">
              <div className="h-2 flex-1 bg-emerald-600 rounded-full" />
              <span className="text-emerald-400 text-xs font-medium">Full sovereign guarantee</span>
            </div>
            <div className="text-gray-600 text-xs mt-2">The government guarantees it owned the land and had the authority to grant it. No private warranty is involved.</div>
          </div>
        </section>

        {/* Section 2: General Warranty Deed */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-white mb-5 flex items-center gap-3">
            <span className="text-emerald-400 text-lg font-bold">02</span>
            General Warranty Deed
          </h2>
          <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <div className="text-white font-bold mb-1">The strongest form of deed</div>
                <div className="text-gray-500 text-sm">Also called: warranty deed · full warranty deed</div>
              </div>
              <span className="bg-emerald-900 text-emerald-300 text-xs px-3 py-1 rounded-full font-bold flex-shrink-0">Gold standard</span>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              A general warranty deed is the strongest and most protective deed available in a real estate transaction. The grantor (seller) guarantees title against all defects — not just defects that occurred during their ownership, but <em>all defects going back to the beginning of time</em>.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              This means that if it turns out someone else has a claim to the property that arose before the grantor even owned it, the grantor is still on the hook. The buyer has recourse against the grantor personally, not just the property.
            </p>
            <p className="text-gray-300 leading-relaxed">
              General warranty deeds are standard in most residential real estate transactions where the seller has clean title and title insurance. If you are buying at a standard sale with a general warranty deed, you are getting the most protection available.
            </p>
          </div>
          <div className="mt-4 p-4 bg-gray-900 border border-gray-800 rounded-xl">
            <div className="text-white font-bold text-xs mb-1">Warranty level</div>
            <div className="flex items-center gap-2 mt-2">
              <div className="h-2 flex-1 bg-emerald-600 rounded-full" />
              <span className="text-emerald-400 text-xs font-medium">Full warranty — all defects, all time</span>
            </div>
            <div className="text-gray-600 text-xs mt-2">Grantor is personally liable for any title defect, regardless of when it arose.</div>
          </div>
        </section>

        {/* Section 3: Special Warranty Deed */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-white mb-5 flex items-center gap-3">
            <span className="text-emerald-400 text-lg font-bold">03</span>
            Special Warranty Deed
          </h2>
          <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <div className="text-white font-bold mb-1">Limited warranty during grantor&rsquo;s ownership only</div>
                <div className="text-gray-500 text-sm">Also called: limited warranty deed</div>
              </div>
              <span className="bg-amber-900 text-amber-300 text-xs px-3 py-1 rounded-full font-bold flex-shrink-0">Moderate</span>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              A special warranty deed guarantees title only against defects that occurred <em>during the grantor&rsquo;s period of ownership</em>. The grantor makes no representations about what happened before they took title.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              This deed is common in foreclosure sales and bank-owned property (REO) transactions. When a lender forecloses, it is not in a position to guarantee that the title was clean before it acquired the property — and typically does not want that liability. A special warranty deed shifts the risk to the buyer for pre-foreclosure title problems.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Special warranty deeds are also common in some commercial transactions and estate sales. If you receive a special warranty deed, factor the increased risk into your purchase price and strongly consider title insurance.
            </p>
          </div>
          <div className="mt-4 p-4 bg-gray-900 border border-gray-800 rounded-xl">
            <div className="text-white font-bold text-xs mb-1">Warranty level</div>
            <div className="flex items-center gap-2 mt-2">
              <div className="h-2 flex-1 bg-amber-600 rounded-full" />
              <span className="text-amber-400 text-xs font-medium">Limited — defects during grantor&rsquo;s ownership only</span>
            </div>
            <div className="text-gray-600 text-xs mt-2">No protection for defects that arose before the grantor owned the property.</div>
          </div>
        </section>

        {/* Section 4: Quitclaim Deed */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-white mb-5 flex items-center gap-3">
            <span className="text-emerald-400 text-lg font-bold">04</span>
            Quitclaim Deed
          </h2>
          <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <div className="text-white font-bold mb-1">No warranties whatsoever</div>
                <div className="text-gray-500 text-sm">Also called: non-warranty deed</div>
              </div>
              <span className="bg-red-900 text-red-300 text-xs px-3 py-1 rounded-full font-bold flex-shrink-0">No protection</span>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              A quitclaim deed makes no warranties of any kind. The grantor transfers &ldquo;whatever interest they have&rdquo; in the property — which might be full ownership, a partial interest, or nothing at all. The buyer has no recourse if the grantor turns out to have no interest at all.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              Quitclaim deeds are common in family transfers (parent to child, divorce settlements), in tax sales, and in some types of estate transfers. They are frequently appropriate in low-risk situations — when everyone involved knows the title is clean and the transfer is a formality.
            </p>
            <p className="text-gray-300 leading-relaxed">
              However, when buying from a stranger, particularly at a discounted price (such as a tax sale), a quitclaim deed is a significant risk signal. It often means the grantor either does not have clean title or does not want to be responsible if problems surface later. A title search and title insurance are essential in quitclaim transactions.
            </p>
          </div>
          <div className="mt-4 p-4 bg-gray-900 border border-gray-800 rounded-xl">
            <div className="text-white font-bold text-xs mb-1">Warranty level</div>
            <div className="flex items-center gap-2 mt-2">
              <div className="h-2 flex-1 bg-red-600 rounded-full" />
              <span className="text-red-400 text-xs font-medium">None — &ldquo;whatever interest they have&rdquo;</span>
            </div>
            <div className="text-gray-600 text-xs mt-2">Buyer assumes all risk. Grantor makes no representations about the quality of title.</div>
          </div>
        </section>

        {/* Section 5: Tax Deed */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-white mb-5 flex items-center gap-3">
            <span className="text-emerald-400 text-lg font-bold">05</span>
            Tax Deed
          </h2>
          <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <div className="text-white font-bold mb-1">Issued after a government tax sale</div>
                <div className="text-gray-500 text-sm">Also called: tax sale deed · county deed</div>
              </div>
              <span className="bg-amber-900 text-amber-300 text-xs px-3 py-1 rounded-full font-bold flex-shrink-0">Varies by state</span>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              A tax deed is issued by a government entity — typically a county — following a tax sale, where the property was sold because the owner failed to pay property taxes. The tax deed represents that the government has sold the property to satisfy the tax debt.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              In many states, tax deeds carry little or no warranty about title quality. The government is not in the business of guaranteeing that the previous owner had clean title — it is simply selling its lien position. The buyer at a tax deed sale often receives only the government&rsquo;s interest, which may be subject to senior liens, mortgages, or other encumbrances that were not extinguished by the tax sale.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Most states require the buyer to accept the property &ldquo;as-is.&rdquo; Some states have redemption periods during which the former owner can reclaim the property by paying back taxes plus interest. Understanding your state&rsquo;s specific tax deed law is essential before bidding at a tax sale.
            </p>
          </div>
          <div className="mt-4 p-4 bg-gray-900 border border-gray-800 rounded-xl">
            <div className="text-white font-bold text-xs mb-1">Warranty level</div>
            <div className="flex items-center gap-2 mt-2">
              <div className="h-2 flex-1 bg-red-600 rounded-full" />
              <span className="text-red-400 text-xs font-medium">Minimal to none — typically &ldquo;as-is&rdquo;</span>
            </div>
            <div className="text-gray-600 text-xs mt-2">Government warrants only its own tax lien. Does not warrant against other title defects.</div>
          </div>
        </section>

        {/* Section 6: Sheriff's Deed */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-white mb-5 flex items-center gap-3">
            <span className="text-emerald-400 text-lg font-bold">06</span>
            Sheriff&rsquo;s Deed
          </h2>
          <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <div className="text-white font-bold mb-1">Issued after a court-ordered sale</div>
                <div className="text-gray-500 text-sm">Also called: judicial deed · court deed</div>
              </div>
              <span className="bg-amber-900 text-amber-300 text-xs px-3 py-1 rounded-full font-bold flex-shrink-0">Limited</span>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              A sheriff&rsquo;s deed is issued following a court-ordered sale — typically in foreclosure proceedings, judgment enforcement actions, or partition proceedings where a court has ordered the sale of jointly owned property.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              Like tax deeds, sheriff&rsquo;s deeds often carry limited or no warranties. The sheriff is acting as an officer of the court executing a judgment, not making representations about the quality of the title being conveyed. The buyer is expected to do their own due diligence before the sale.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Sheriff&rsquo;s deed sales are usually conducted at the county courthouse steps or online. The process, rules, and redemption periods vary significantly by state and by the type of underlying court case.
            </p>
          </div>
          <div className="mt-4 p-4 bg-gray-900 border border-gray-800 rounded-xl">
            <div className="text-white font-bold text-xs mb-1">Warranty level</div>
            <div className="flex items-center gap-2 mt-2">
              <div className="h-2 flex-1 bg-red-600 rounded-full" />
              <span className="text-red-400 text-xs font-medium">Minimal to none — court-ordered, as-is</span>
            </div>
            <div className="text-gray-600 text-xs mt-2">Sheriff or court warrants only the authority to conduct the sale. No warranty on title quality.</div>
          </div>
        </section>

        {/* Section 7: Lis Pendens */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-white mb-5 flex items-center gap-3">
            <span className="text-emerald-400 text-lg font-bold">07</span>
            Lis Pendens
          </h2>
          <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <div className="text-white font-bold mb-1">Not a deed — a legal notice of pending litigation</div>
                <div className="text-gray-500 text-sm">Also called: notice of lis pendens · notice of action</div>
              </div>
              <span className="bg-gray-700 text-gray-300 text-xs px-3 py-1 rounded-full font-bold flex-shrink-0">Notice only</span>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              A lis pendens is not a deed at all — it is a notice filed in the county land records indicating that a lawsuit affecting the property is pending. It does not itself affect ownership, but it puts anyone who might buy the property on notice that there is an ongoing legal dispute.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              If you buy property that has a lis pendens recorded against it, you take title <em>subject to</em> the outcome of that lawsuit. If the court rules against the current owner, your ownership may be affected. This is why title companies flag lis pendens filings during a title search — they represent a potential defect in the chain of title.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Lis pendens filings are common in boundary disputes, quiet title actions, foreclosure proceedings, and divorce asset divisions. They can sometimes be filed improperly or prematurely — a real estate attorney can advise whether a particular lis pendens has merit.
            </p>
          </div>
          <div className="mt-4 p-4 bg-gray-900 border border-gray-800 rounded-xl">
            <div className="text-white font-bold text-xs mb-1">Warranty level</div>
            <div className="flex items-center gap-2 mt-2">
              <div className="h-2 flex-1 bg-gray-600 rounded-full" />
              <span className="text-gray-400 text-xs font-medium">N/A — not a conveyance</span>
            </div>
            <div className="text-gray-600 text-xs mt-2">A lis pendens is a notice, not a deed. It alerts buyers to pending litigation that may affect ownership.</div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-white mb-5">Summary Comparison</h2>
          <div className="bg-gray-950 border border-gray-800 rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left text-gray-400 font-medium px-5 py-4 text-xs uppercase tracking-wider">Document</th>
                  <th className="text-left text-gray-400 font-medium px-5 py-4 text-xs uppercase tracking-wider">Who Issues</th>
                  <th className="text-left text-gray-400 font-medium px-5 py-4 text-xs uppercase tracking-wider">Warranty</th>
                  <th className="text-left text-gray-400 font-medium px-5 py-4 text-xs uppercase tracking-wider">Common Use</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                <tr>
                  <td className="px-5 py-4"><span className="text-white font-bold">Land Patent</span></td>
                  <td className="px-5 py-4 text-gray-300">Federal or state government</td>
                  <td className="px-5 py-4"><span className="bg-emerald-900 text-emerald-300 text-xs px-2 py-0.5 rounded font-bold">Full</span></td>
                  <td className="px-5 py-4 text-gray-400 text-xs">Original grant from public domain (historical)</td>
                </tr>
                <tr>
                  <td className="px-5 py-4"><span className="text-white font-bold">General Warranty Deed</span></td>
                  <td className="px-5 py-4 text-gray-300">Private party (grantor)</td>
                  <td className="px-5 py-4"><span className="bg-emerald-900 text-emerald-300 text-xs px-2 py-0.5 rounded font-bold">Full</span></td>
                  <td className="px-5 py-4 text-gray-400 text-xs">Standard residential sales with clean title</td>
                </tr>
                <tr>
                  <td className="px-5 py-4"><span className="text-white font-bold">Special Warranty Deed</span></td>
                  <td className="px-5 py-4 text-gray-300">Private party (grantor)</td>
                  <td className="px-5 py-4"><span className="bg-amber-900 text-amber-300 text-xs px-2 py-0.5 rounded font-bold">Limited</span></td>
                  <td className="px-5 py-4 text-gray-400 text-xs">Foreclosures, bank-owned properties, estates</td>
                </tr>
                <tr>
                  <td className="px-5 py-4"><span className="text-white font-bold">Quitclaim Deed</span></td>
                  <td className="px-5 py-4 text-gray-300">Private party (grantor)</td>
                  <td className="px-5 py-4"><span className="bg-red-900 text-red-300 text-xs px-2 py-0.5 rounded font-bold">None</span></td>
                  <td className="px-5 py-4 text-gray-400 text-xs">Family transfers, divorce, tax sales</td>
                </tr>
                <tr>
                  <td className="px-5 py-4"><span className="text-white font-bold">Tax Deed</span></td>
                  <td className="px-5 py-4 text-gray-300">County / government</td>
                  <td className="px-5 py-4"><span className="bg-red-900 text-red-300 text-xs px-2 py-0.5 rounded font-bold">Minimal</span></td>
                  <td className="px-5 py-4 text-gray-400 text-xs">Tax sale purchases (as-is)</td>
                </tr>
                <tr>
                  <td className="px-5 py-4"><span className="text-white font-bold">Sheriff&rsquo;s Deed</span></td>
                  <td className="px-5 py-4 text-gray-300">Court / sheriff</td>
                  <td className="px-5 py-4"><span className="bg-red-900 text-red-300 text-xs px-2 py-0.5 rounded font-bold">Minimal</span></td>
                  <td className="px-5 py-4 text-gray-400 text-xs">Court-ordered sales, judgment enforcement</td>
                </tr>
                <tr>
                  <td className="px-5 py-4"><span className="text-white font-bold">Lis Pendens</span></td>
                  <td className="px-5 py-4 text-gray-300">Plaintiff in lawsuit</td>
                  <td className="px-5 py-4"><span className="bg-gray-700 text-gray-300 text-xs px-2 py-0.5 rounded font-bold">N/A</span></td>
                  <td className="px-5 py-4 text-gray-400 text-xs">Pending litigation affecting title</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Disclaimer */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 mb-12">
          <div className="text-white font-bold text-sm mb-2">A note on legal advice</div>
          <p className="text-gray-500 text-xs leading-relaxed">
            This module is for educational reference only. It is not legal advice. The warranty levels described are general patterns — specific deed warranties vary by state law and individual transaction terms. When acquiring property, always work with a licensed title professional or real estate attorney.
          </p>
        </div>

        {/* Next Modules */}
        <div className="border-t border-gray-800 pt-10 mb-10">
          <div className="text-gray-500 text-xs uppercase tracking-widest mb-6">Continue Learning</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/learn/land-risks-for-buyers"
              className="bg-gray-950 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-colors group"
            >
              <div className="text-gray-600 text-xs mb-2">Next Module</div>
              <div className="text-white font-bold text-sm mb-1 group-hover:text-emerald-400 transition-colors">
                Land Risks Every Buyer Should Know
              </div>
              <div className="text-gray-500 text-xs">The specific risks that come with land ownership →</div>
            </Link>
            <Link
              href="/learn/how-to-research-a-parcel"
              className="bg-gray-950 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-colors group"
            >
              <div className="text-gray-600 text-xs mb-2">Next Module</div>
              <div className="text-white font-bold text-sm mb-1 group-hover:text-emerald-400 transition-colors">
                How to Research a Parcel
              </div>
              <div className="text-gray-500 text-xs">Step-by-step guide to investigating any property →</div>
            </Link>
          </div>
        </div>

        {/* Bottom nav */}
        <div className="border-t border-gray-800 pt-8 flex items-center justify-between">
          <Link href="/learn" className="text-gray-500 hover:text-white text-sm transition-colors">
            ← Back to Learn Center
          </Link>
          <Link href="/deals" className="text-emerald-400 hover:text-emerald-300 text-sm transition-colors">
            See Current Deals →
          </Link>
        </div>
      </main>
    </div>
  );
}
