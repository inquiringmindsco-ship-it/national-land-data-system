import Link from 'next/link';

export default function QuietTitleActionsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Link href="/learn" className="text-gray-400 hover:text-white text-sm flex items-center gap-1 mb-1">← Learn Center</Link>
        <h1 className="text-4xl font-black text-white mb-6">Quiet Title Actions</h1>
        <p className="text-gray-400 mb-8">A quiet title action is a lawsuit that asks a court to officially settle a dispute over who owns a piece of property. It&apos;s often the only way to clear a broken chain of title.</p>

        <div className="space-y-8">
          <section className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-emerald-400 mb-3">What Is a Quiet Title Action?</h2>
            <p className="text-gray-300 leading-relaxed">A quiet title action — sometimes called a &quot;quiet title suit&quot; — is a legal proceeding where a court examines all claims to a piece of property and then issues a judgment establishing who has valid ownership. The &quot;quiet&quot; refers to quieting (settling) disputes or challenges to the title, not to silence.</p>
            <p className="text-gray-300 leading-relaxed mt-3">When a judge signs off on a quiet title order, that order gets recorded at the county recorder. From that point forward, the title is considered &quot;clean&quot; — all previous claims are legally extinguished, even if they don&apos;t agree.</p>
          </section>

          <section className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-emerald-400 mb-3">When You Need One</h2>
            <p className="text-gray-300 leading-relaxed mb-4">Quiet title actions are typically necessary when:</p>
            <ul className="space-y-3">
              {[
                { title: 'Heir property', desc: 'Multiple heirs with unresolved claims — you need the court to establish who legally owns what' },
                { title: 'Adverse possession', desc: 'Someone has been occupying land without permission for the statutory period — you may need a court to rule on ownership' },
                { title: 'Break in the chain of title', desc: 'A deed is missing, forged, or recorded incorrectly — a quiet title action can resolve it' },
                { title: 'Boundary disputes', desc: 'Neighbors disagree about where property lines actually fall' },
                { title: 'Old mortgage liens', desc: 'A lender that went out of business or can\'t be found still has a lien — court can extinguish it' },
                { title: 'Tax sale complications', desc: 'After a tax sale, the former owner or other lienholders may have claims that need to be cleared' },
              ].map(item => (
                <li key={item.title} className="flex gap-3">
                  <span className="text-emerald-400 mt-1">→</span>
                  <div><span className="text-white font-semibold">{item.title}:</span> <span className="text-gray-400 text-sm">{item.desc}</span></div>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-amber-400 mb-3">What It Costs and How Long It Takes</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-black/40 rounded-lg p-4">
                <div className="text-white font-bold text-2xl mb-1">$1,500 – $5,000+</div>
                <div className="text-gray-400 text-sm">Attorney fees — varies by complexity</div>
              </div>
              <div className="bg-black/40 rounded-lg p-4">
                <div className="text-white font-bold text-2xl mb-1">3 – 12 months</div>
                <div className="text-gray-400 text-sm">Timeline — depends on court docket and whether anyone contests</div>
              </div>
            </div>
            <div className="bg-amber-950/40 border border-amber-900 rounded-lg p-4">
              <p className="text-amber-300 text-sm font-semibold mb-1">💡 Factor this into your deal analysis</p>
              <p className="text-gray-400 text-sm">If you&apos;re buying a property with known title issues, get a quote from a real estate attorney before you close. It could save you thousands to know upfront rather than discover it after purchase.</p>
            </div>
          </section>

          <section className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-emerald-400 mb-3">The Process</h2>
            <ol className="space-y-3">
              {[
                { step: '1', title: 'Hire a real estate attorney', desc: 'You need an attorney who specializes in title issues — not a general practitioner' },
                { step: '2', title: 'Title search', desc: 'Attorney researches the full chain of title to identify every party with a potential claim' },
                { step: '3', title: 'File the petition', desc: 'Attorney files a quiet title petition in the county where the property is located' },
                { step: '4', title: 'Serve notice', desc: 'All identified parties must be formally served — heirs, lienholders, neighboring owners' },
                { step: '5', title: 'Waiting period', desc: 'Parties have a window to respond or contest — typically 30 days' },
                { step: '6', title: 'Court hearing', desc: 'If no one contests, a judge typically grants the quiet title order' },
                { step: '7', title: 'Record the judgment', desc: 'The order is filed with the county recorder — title is now clean' },
              ].map(item => (
                <li key={item.step} className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-emerald-700 rounded-full text-white text-xs flex items-center justify-center font-bold">{item.step}</span>
                  <div><span className="text-white font-semibold">{item.title}:</span> <span className="text-gray-400 text-sm">{item.desc}</span></div>
                </li>
              ))}
            </ol>
          </section>

          <section className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-emerald-400 mb-3">Who Can File?</h2>
            <p className="text-gray-300 leading-relaxed mb-3">Typically, the current possessor of the property — the person who is actually occupying or controlling it — can file. In some states, even someone who doesn&apos;t currently possess the property but claims an interest can file.</p>
            <p className="text-gray-400 text-sm">An attorney can advise whether you have standing to file based on your specific situation and the property in question.</p>
          </section>

          <div className="flex gap-4">
            <Link href="/deals" className="inline-block px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-colors">Browse St. Louis Deals →</Link>
            <Link href="/learn/heir-property-explained" className="inline-block px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-xl transition-colors">Heir Property →</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
