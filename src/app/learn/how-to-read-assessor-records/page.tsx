import Link from 'next/link';

export default function HowToReadAssessorRecordsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Link href="/learn" className="text-gray-400 hover:text-white text-sm flex items-center gap-1 mb-1">← Learn Center</Link>
        <h1 className="text-4xl font-black text-white mb-6">How to Read Assessor Records</h1>
        <p className="text-gray-400 mb-8">Property assessor websites are free public tools that tell you who owns a property, what it&apos;s taxed on, and its recorded history. Here&apos;s how to use them.</p>

        <div className="space-y-8">
          <section className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-emerald-400 mb-3">What Assessor Records Show</h2>
            <p className="text-gray-300 leading-relaxed mb-4">Every county has an assessor who values property for tax purposes. Their records — available free online — contain a wealth of information:</p>
            <ul className="grid grid-cols-1 gap-3">
              {[
                { label: 'Owner of Record', desc: 'The name on the deed — not always the current owner if a sale hasn\'t been recorded' },
                { label: 'Parcel / Account Number', desc: 'The unique identifier for the property — critical for ordering title searches' },
                { label: 'Physical Address', desc: 'The actual street address and location' },
                { label: 'Taxable Value', desc: 'The assessed value used to calculate property taxes' },
                { label: 'Building Details', desc: 'Square footage, year built, number of rooms, construction type' },
                { label: 'Sales History', desc: 'Prior sales with dates and prices — a red flag if a property flips frequently' },
                { label: 'Tax Status', desc: 'Whether taxes are current, delinquent, or the property is tax-exempt' },
                { label: 'Zoning', desc: 'What the property can legally be used for — residential, commercial, industrial' },
              ].map(item => (
                <li key={item.label} className="flex gap-3 bg-black/30 rounded-lg p-3">
                  <span className="text-emerald-400 font-bold">{item.label}:</span>
                  <span className="text-gray-400 text-sm">{item.desc}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-emerald-400 mb-3">Missouri Assessor Resources</h2>
            <ul className="space-y-3">
              {[
                { name: 'St. Louis City Assessor', url: 'https://www.stlouis-mo.gov/government/departments/assessor/', note: 'Use the "Property Search" tool on the left sidebar' },
                { name: 'St. Louis County Assessor', url: 'https://www.sosselmo.gov/assessor/', note: 'Search by address, owner name, or parcel number' },
                { name: 'Statewide Property Tax Records', url: 'https://showmeboone.com/assessor/', note: 'Many Missouri counties have their own assessor portals' },
              ].map(item => (
                <li key={item.name} className="bg-black/30 rounded-lg p-3">
                  <div className="text-white font-semibold">{item.name}</div>
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 text-xs">{item.url}</a>
                  <p className="text-gray-500 text-xs mt-1">{item.note}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-amber-400 mb-3">Red Flags to Watch For</h2>
            <div className="grid grid-cols-1 gap-3">
              {[
                { flag: 'Owner name doesn\'t match seller', severity: 'high', desc: 'May indicate the seller doesn\'t legally own the property' },
                { flag: 'Heavy delinquency in taxes', severity: 'high', desc: 'Tax liens attach to the property — you inherit them at closing' },
                { flag: 'Exempt property being sold', severity: 'medium', desc: 'Exemptions often end when the property is sold' },
                { flag: 'Recent quitclaim deed', severity: 'medium', desc: 'Often used to clear title problems — a warning sign' },
                { flag: 'Address doesn\'t match legal description', severity: 'high', desc: 'Could indicate two properties confused — get a survey' },
                { flag: 'Value increased dramatically recently', severity: 'low', desc: 'May signal a flip — factor into your price analysis' },
              ].map(item => (
                <div key={item.flag} className="flex gap-3">
                  <span className={`flex-shrink-0 w-2 h-2 rounded-full mt-1.5 ${item.severity === 'high' ? 'bg-red-400' : item.severity === 'medium' ? 'bg-amber-400' : 'bg-gray-500'}`} />
                  <div><span className="text-white text-sm font-medium">{item.flag}</span> — <span className="text-gray-400 text-sm">{item.desc}</span></div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-emerald-400 mb-3">How to Use This for NLDS Deals</h2>
            <p className="text-gray-300 leading-relaxed mb-3">When you find a property on NLDS, cross-reference it with the assessor site to verify:</p>
            <ol className="space-y-2">
              {[
                'The listed owner matches who is selling',
                'Tax status is current or the lien amount is factored into your offer',
                'The property details match what the listing claims (sq ft, bedrooms, etc.)',
                'There are no unusual exemptions that will disappear at sale',
              ].map((item, i) => (
                <li key={i} className="flex gap-3 text-gray-300 text-sm"><span className="text-emerald-400 font-bold">{i + 1}.</span> {item}</li>
              ))}
            </ol>
          </section>

          <div className="flex gap-4">
            <Link href="/deals" className="inline-block px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-colors">Browse St. Louis Deals →</Link>
            <Link href="/learn/land-risks-for-buyers" className="inline-block px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-xl transition-colors">Land Buying Risks →</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
