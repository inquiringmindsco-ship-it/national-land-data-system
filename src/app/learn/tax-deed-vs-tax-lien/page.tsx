import Link from 'next/link';

export default function TaxDeedVsTaxLienPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Link href="/learn" className="text-gray-400 hover:text-white text-sm flex items-center gap-1 mb-1">← Learn Center</Link>
        <h1 className="text-4xl font-black text-white mb-6">Tax Deed vs. Tax Lien</h1>
        <p className="text-gray-400 mb-8">Two very different ways the government recovers unpaid property taxes — and what each means for you as a buyer.</p>

        <div className="space-y-8">
          <section className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-emerald-400 mb-3">The Core Difference</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-950/40 border border-blue-900 rounded-lg p-4">
                <div className="text-blue-300 font-bold text-lg mb-2">Tax Lien</div>
                <p className="text-gray-300 text-sm">The government sells a lien certificate to investors. You pay the taxes owed, and the property owner still owes you money — with interest. You don&apos;t own the property.</p>
              </div>
              <div className="bg-amber-950/40 border border-amber-900 rounded-lg p-4">
                <div className="text-amber-300 font-bold text-lg mb-2">Tax Deed</div>
                <p className="text-gray-300 text-sm">The government forecloses on the property and sells the deed directly. You buy the actual property — sometimes at a steep discount, sometimes as-is.</p>
              </div>
            </div>
          </section>

          <section className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-emerald-400 mb-3">Tax Lien — How It Works</h2>
            <p className="text-gray-300 leading-relaxed mb-4">When a property owner fails to pay property taxes, the county places a lien on the property. The lien is typically sold at a public auction to the lowest bidder (the bidder who&apos;s willing to accept the smallest interest rate or premium).</p>
            <ul className="space-y-2">
              {[
                'You pay the delinquent taxes — typically 12–18% annual interest (varies by state)',
                'The property owner has a redemption period (usually 1–3 years) to pay you back with interest',
                'If they don&apos;t redeem, the lien certificate transfers to you — you don&apos;t automatically own the property',
                'In some states, you can eventually foreclose if they don&apos;t redeem',
                'Your return is the interest paid by the homeowner — not appreciation in the property value',
              ].map(item => (
                <li key={item} className="flex gap-3 text-gray-300 text-sm"><span className="text-blue-400">→</span> {item}</li>
              ))}
            </ul>
          </section>

          <section className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-amber-400 mb-3">Tax Deed — How It Works</h2>
            <p className="text-gray-300 leading-relaxed mb-4">If taxes remain unpaid long enough, the government can foreclose — just like a mortgage lender. The property is sold at a tax deed auction, and the winning bidder gets the deed. This is direct ownership.</p>
            <ul className="space-y-2">
              {[
                'You buy the property outright — not a lien, not a loan, actual title',
                'Auctions are typically for the tax debt amount — properties can sell for 20–70% below market value',
                'You own the property when the auction ends — subject to redemption periods in some states',
                'Redemption periods vary: some states give homeowners 6 months to buy it back, some give none',
                'You inherit whatever problems the property has — liens, squatters, code violations',
              ].map(item => (
                <li key={item} className="flex gap-3 text-gray-300 text-sm"><span className="text-amber-400">→</span> {item}</li>
              ))}
            </ul>
          </section>

          <section className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-emerald-400 mb-3">Missouri Specifically</h2>
            <p className="text-gray-300 leading-relaxed mb-3">Missouri uses both tax lien and tax deed mechanisms, depending on the county and situation:</p>
            <div className="grid grid-cols-1 gap-3">
              <div className="bg-black/30 rounded-lg p-3">
                <span className="text-white font-semibold">St. Louis City (Land Tax Sale)</span>
                <p className="text-gray-400 text-sm">St. Louis runs an annual land tax sale through the Collector of Revenue. Delinquent properties are offered to investors — buyers pay back taxes plus a penalty and receive a lien. The redemption period is generally 1 year.</p>
              </div>
              <div className="bg-black/30 rounded-lg p-3">
                <span className="text-white font-semibold">St. Louis County</span>
                <p className="text-gray-400 text-sm">St. Louis County properties can go through both tax sale (lien) and collector&apos;s auction (deed). Properties that don&apos;t sell at collector&apos;s auction can eventually transfer to the Land Reutilization Authority (LRA) — the city land bank.</p>
              </div>
              <div className="bg-black/30 rounded-lg p-3">
                <span className="text-white font-semibold">LRA Properties</span>
                <p className="text-gray-400 text-sm">The LRA acquires tax-delinquent properties and sells them to investors at below-market prices. LRA sales are deeds — you get title. This is generally the cleanest path for St. Louis land investors.</p>
              </div>
            </div>
          </section>

          <section className="bg-red-950/40 border border-red-900 rounded-xl p-6">
            <h2 className="text-xl font-bold text-red-400 mb-3">⚠ Common Mistakes to Avoid</h2>
            <ul className="space-y-3">
              {[
                { mistake: 'Assuming you automatically own the property after buying a lien', fix: 'You don\'t — you\'re a creditor. You only own it if they don\'t redeem.' },
                { mistake: 'Ignoring the redemption period', fix: 'Missouri allows redemption — the owner can come back and pay you with interest at any time during this window.' },
                { mistake: 'Not researching existing liens', fix: 'Federal and state tax liens, mortgage liens, and mechanic\'s liens all survive a tax sale in most cases.' },
                { mistake: 'Bidding too much at auction', fix: 'Your profit is the interest spread — not the property appreciation. Never bid more than you can earn back with interest.' },
              ].map(item => (
                <li key={item.mistake} className="flex gap-3">
                  <span className="text-red-400 font-bold mt-0.5">✗</span>
                  <div>
                    <span className="text-white font-medium text-sm">{item.mistake}</span>
                    <p className="text-emerald-400 text-xs mt-0.5">✓ {item.fix}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-emerald-400 mb-3">Which Is Better for Investors?</h2>
            <p className="text-gray-300 leading-relaxed mb-4">Both have their place. Tax liens offer lower capital requirements and a defined return — but tax deeds offer actual ownership and potentially much higher returns.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-blue-400 font-semibold mb-2">Choose Tax Lien when:</p>
                <ul className="space-y-1 text-gray-400">
                  <li>• You have limited capital</li>
                  <li>• You want a predictable return</li>
                  <li>• You don&apos;t want to manage property</li>
                  <li>• You prefer passive income</li>
                </ul>
              </div>
              <div>
                <p className="text-amber-400 font-semibold mb-2">Choose Tax Deed when:</p>
                <ul className="space-y-1 text-gray-400">
                  <li>• You want actual ownership</li>
                  <li>• You have renovation/development experience</li>
                  <li>• You can handle the complexity</li>
                  <li>• You want the highest potential return</li>
                </ul>
              </div>
            </div>
          </section>

          <div className="flex gap-4">
            <Link href="/deals" className="inline-block px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-colors">Browse St. Louis Deals →</Link>
            <Link href="/learn/what-is-a-tax-sale" className="inline-block px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-xl transition-colors">What Is a Tax Sale →</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
