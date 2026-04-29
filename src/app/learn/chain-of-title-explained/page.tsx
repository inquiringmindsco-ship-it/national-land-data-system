import Link from 'next/link';

export default function ChainOfTitlePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Link href="/learn" className="text-gray-400 hover:text-white text-sm flex items-center gap-1 mb-1">← Learn Center</Link>
        <h1 className="text-4xl font-black text-white mb-6">Chain of Title Explained</h1>
        <p className="text-gray-400 mb-8">Understanding how property ownership transfers from one party to the next — and why unbroken chains matter.</p>

        <div className="space-y-8">
          <section className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-emerald-400 mb-3">What Is a Chain of Title?</h2>
            <p className="text-gray-300 leading-relaxed">A chain of title is the complete, documented history of ownership for a piece of land — starting from the original grant (or patent) and running through every subsequent transfer down to the current owner. Each link in the chain is a deed: grant deed, warranty deed, quitclaim deed, or other conveyance document.</p>
          </section>

          <section className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-emerald-400 mb-3">Why It Matters</h2>
            <p className="text-gray-300 leading-relaxed mb-4">When you buy land, you&apos;re relying on the chain being complete and clean. Any break, gap, error, or questionable transfer in the chain can become your problem — even if you had nothing to do with it.</p>
            <div className="bg-red-950/40 border border-red-900 rounded-lg p-4">
              <p className="text-red-300 text-sm font-semibold mb-2">⚠ A broken chain doesn&apos;t automatically mean you don&apos;t own the property — but it can prevent you from selling or refinancing it.</p>
              <p className="text-gray-400 text-sm">Title insurance exists precisely because chains of title are never perfect.</p>
            </div>
          </section>

          <section className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-emerald-400 mb-3">Common Chain Problems</h2>
            <ul className="space-y-3">
              {[
                { title: 'Missing deeds', desc: 'A transfer in the chain has no recorded document' },
                { title: 'Forged signatures', desc: 'A deed was signed by someone who didn\'t own the property' },
                { title: 'Undisclosed heirs', desc: 'A previous owner died, and family members claim ownership' },
                { title: 'Judgment liens', desc: 'A previous owner had debts secured against the property' },
                { title: 'Recording errors', desc: 'Wrong parcel number, misspelled name, wrong acreage' },
              ].map(item => (
                <li key={item.title} className="flex gap-3">
                  <span className="text-amber-400 mt-1">•</span>
                  <div><span className="text-white font-semibold">{item.title}:</span> <span className="text-gray-400 text-sm">{item.desc}</span></div>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-emerald-400 mb-3">How to Research a Chain</h2>
            <ol className="space-y-3">
              {[
                { step: '1', title: 'County Recorder Office', desc: 'Start here. Every county maintains records of all deeds filed for properties within its jurisdiction.' },
                { step: '2', title: 'Grantor-Grantee Index', desc: 'Search by the seller (grantor) or buyer (grantee) to pull every transfer involving the parcel.' },
                { step: '3', title: 'Plat Books', desc: 'Show how land was subdivided and named — useful for rural properties and parcels with metes-and-bounds descriptions.' },
                { step: '4', title: 'Title Search Company', desc: 'For thorough research, a professional title search walks the full chain and flags issues.' },
              ].map(item => (
                <li key={item.step} className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-emerald-700 rounded-full text-white text-xs flex items-center justify-center font-bold">{item.step}</span>
                  <div><span className="text-white font-semibold">{item.title}:</span> <span className="text-gray-400 text-sm">{item.desc}</span></div>
                </li>
              ))}
            </ol>
          </section>

          <section className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-emerald-400 mb-3">What You Can Do</h2>
            <p className="text-gray-300 leading-relaxed mb-4">If you find a break in the chain before you buy, you can often resolve it — sometimes by contacting the missing party, sometimes through a quiet title action (a court process that legally establishes ownership).</p>
            <p className="text-gray-400 text-sm">Never assume a chain is clean just because a seller says it is. Always do your own research or hire a professional.</p>
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
