import Link from 'next/link';

export default function EasementsAndRightsOfWayPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Link href="/learn" className="text-gray-400 hover:text-white text-sm flex items-center gap-1 mb-1">← Learn Center</Link>
        <h1 className="text-4xl font-black text-white mb-6">Easements & Rights of Way</h1>
        <p className="text-gray-400 mb-8">The hidden encumbrances that don&apos;t show up in listings — but can drastically affect what you can do with your land.</p>

        <div className="space-y-8">
          <section className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-emerald-400 mb-3">What Is an Easement?</h2>
            <p className="text-gray-300 leading-relaxed">An easement is a legal right to use someone else&apos;s land for a specific purpose. It runs with the land — meaning it stays in effect even after the property changes hands. If a utility company has an easement across your property, every future owner inherits that obligation.</p>
          </section>

          <section className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-emerald-400 mb-3">Common Types</h2>
            <ul className="space-y-3">
              {[
                { name: 'Utility Easement', desc: 'Power lines, gas pipes, water mains, fiber optic cables running across or under your land' },
                { name: 'Access Easement', desc: 'A driveway or road that crosses one property to reach another — common when land is landlocked' },
                { name: 'Drainage Easement', desc: 'An area set aside for water to flow across property — affects where you can build' },
                { name: 'Conservation Easement', desc: 'A voluntary agreement restricting development to protect natural resources' },
                { name: 'Easement by Necessity', desc: 'Courts grant access across land when a parcel would otherwise be unreachable' },
              ].map(item => (
                <li key={item.name} className="flex gap-3">
                  <span className="text-emerald-400 mt-1">→</span>
                  <div><span className="text-white font-semibold">{item.name}:</span> <span className="text-gray-400 text-sm">{item.desc}</span></div>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-amber-400 mb-3">Why This Matters for Land Deals</h2>
            <p className="text-gray-300 leading-relaxed mb-3">Easements don&apos;t always show up in basic listings. A property might look buildable until you discover a utility easement running right through the middle of your intended building site.</p>
            <p className="text-gray-300 leading-relaxed">Always research easements before purchasing. They affect:</p>
            <ul className="mt-2 space-y-2">
              {['Where you can build or place structures', 'Access to your property', 'What you can do with the land', 'Future resale value', 'Ability to get permits'].map(item => (
                <li key={item} className="flex gap-2 text-gray-400 text-sm"><span className="text-red-400">✗</span> {item}</li>
              ))}
            </ul>
          </section>

          <section className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-emerald-400 mb-3">How to Find Easements</h2>
            <ol className="space-y-3">
              {[
                { step: '1', title: 'Title Commitment', desc: 'When you order title insurance, the commitment lists all recorded easements and encumbrances' },
                { step: '2', title: 'County Plat Maps', desc: 'Utility and drainage easements are often shown on recorded plat maps' },
                { step: '3', title: 'Utility Companies', desc: 'Call local utilities to ask about any easements on a specific parcel' },
                { step: '4', title: 'Survey', desc: 'A professional survey will show visible easement markers and areas of concern' },
              ].map(item => (
                <li key={item.step} className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-emerald-700 rounded-full text-white text-xs flex items-center justify-center font-bold">{item.step}</span>
                  <div><span className="text-white font-semibold">{item.title}:</span> <span className="text-gray-400 text-sm">{item.desc}</span></div>
                </li>
              ))}
            </ol>
          </section>

          <section className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-emerald-400 mb-3">Can You Remove an Easement?</h2>
            <p className="text-gray-300 leading-relaxed mb-3">Sometimes. If a utility company no longer needs an easement, they may release it. Easements by necessity are harder to remove. An easement appurtenant (attached to a neighboring property) can sometimes be eliminated if the benefited parcel no longer needs access.</p>
            <p className="text-gray-400 text-sm">A real estate attorney can review whether a specific easement is removable or modifiable.</p>
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
