import Link from 'next/link';

export default function HeirPropertyPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Link href="/learn" className="text-gray-400 hover:text-white text-sm flex items-center gap-1 mb-1">← Learn Center</Link>
        <h1 className="text-4xl font-black text-white mb-6">Heir Property Explained</h1>
        <p className="text-gray-400 mb-8">When a property owner dies without a will — or with a will that doesn&apos;t properly transfer title — ownership falls to heirs. This creates one of the most common and costly title problems in America.</p>

        <div className="space-y-8">
          <section className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-emerald-400 mb-3">What Is Heir Property?</h2>
            <p className="text-gray-300 leading-relaxed">Heir property is land that was passed to family members outside of a formal probate process. When someone dies without a will, or with a will that fails to legally transfer title (sometimes called dying &quot;intestate&quot;), the courts distribute ownership to surviving family members under state law.</p>
            <p className="text-gray-300 leading-relaxed mt-3">Each heir then owns an undivided fractional interest in the property — not a specific portion of land, but a share of the whole. This is called &quot;tenancy in common.&quot;</p>
          </section>

          <section className="bg-red-950/40 border border-red-900 rounded-xl p-6">
            <h2 className="text-xl font-bold text-red-400 mb-3">⚠ Why This Is a Serious Problem</h2>
            <p className="text-gray-300 leading-relaxed mb-3">Heir property is one of the leading causes of generational wealth loss in Black and low-income communities. Here&apos;s why:</p>
            <ul className="space-y-2">
              {[
                { issue: 'You can\'t sell without everyone\'s permission', detail: 'If 12 cousins each own 8.3% of a property, you need all 12 to sign to sell it.' },
                { issue: 'Anyone can partition-sue', detail: 'Any heir can go to court and force a physical division or forced sale of the property.' },
                { issue: 'Tax debts compound', detail: 'Property tax liens can accumulate across generations, sometimes exceeding the land\'s value.' },
                { issue: 'Squatting and adverse possession', detail: 'Unresolved heir property is vulnerable to someone occupying it and eventually claiming legal ownership.' },
              ].map(item => (
                <li key={item.issue} className="flex gap-3">
                  <span className="text-red-400 font-bold mt-0.5">✗</span>
                  <div><span className="text-white font-semibold">{item.issue}:</span> <span className="text-gray-400 text-sm">{item.detail}</span></div>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-emerald-400 mb-3">How Heir Property Develops</h2>
            <ol className="space-y-3">
              {[
                { step: '1', title: 'Original owner dies without a will', desc: 'State law divides the property among surviving family members' },
                { step: '2', title: 'Multiple heirs receive fractional interests', desc: 'Each heir becomes a co-owner without a specific portion of land' },
                { step: '3', title: 'Some heirs move away, pass away, or can\'t be found', desc: 'The pool of owners grows more complex over generations' },
                { step: '4', title: 'Property deteriorates or becomes contested', desc: 'Without clear ownership, maintenance stops and disputes begin' },
              ].map(item => (
                <li key={item.step} className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-emerald-700 rounded-full text-white text-xs flex items-center justify-center font-bold">{item.step}</span>
                  <div><span className="text-white font-semibold">{item.title}:</span> <span className="text-gray-400 text-sm">{item.desc}</span></div>
                </li>
              ))}
            </ol>
          </section>

          <section className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-emerald-400 mb-3">How to Resolve Heir Property Issues</h2>
            <ul className="space-y-3">
              {[
                { title: 'Family Agreement', desc: 'Heirs can sign an heirship affidavit and voluntarily partition the property among themselves' },
                { title: 'Quiet Title Action', desc: 'A court case to establish clear ownership — can extinguish unknown or uncooperative heirs\' claims' },
                { title: 'Partition Action', desc: 'Court-ordered division of property — either physical division or forced sale' },
                { title: 'Heirship Proceeding', desc: 'A formal probate-style proceeding to establish the correct heirs and their interests' },
              ].map(item => (
                <li key={item.title} className="flex gap-3">
                  <span className="text-emerald-400 mt-1">→</span>
                  <div><span className="text-white font-semibold">{item.title}:</span> <span className="text-gray-400 text-sm">{item.desc}</span></div>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-amber-400 mb-3">What to Watch For</h2>
            <p className="text-gray-300 leading-relaxed mb-3">When evaluating a land deal, signs that a property may be heir property include:</p>
            <ul className="space-y-2">
              {[
                'Seller is a "successor" or "estate" rather than the original owner',
                'Multiple prior transfers in a short period',
                'Property has been vacant for an extended time',
                'Deed references a probate case number',
                'Tax bills are delinquent or in the name of a deceased person',
              ].map(item => (
                <li key={item} className="flex gap-2 text-gray-400 text-sm"><span className="text-amber-400">!</span> {item}</li>
              ))}
            </ul>
          </section>

          <div className="flex gap-4">
            <Link href="/deals" className="inline-block px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-colors">Browse St. Louis Deals →</Link>
            <Link href="/learn/how-to-research-a-parcel" className="inline-block px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-xl transition-colors">How to Research a Parcel →</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
