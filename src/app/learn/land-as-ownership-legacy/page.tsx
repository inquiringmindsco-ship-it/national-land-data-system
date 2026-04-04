import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Land as Ownership & Legacy — NLDS Learn',
  description:
    'The case for land ownership as a form of wealth building, financial security, and generational legacy — and what NLDS is trying to do to make it more accessible.',
};

export default function LandAsOwnershipLegacyPage() {
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
          Learn Center &rsaquo; The Case for Land Ownership
        </div>

        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-amber-950 border border-amber-800 rounded-full px-4 py-1.5 mb-5">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">All Levels</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
            Land as Ownership & Legacy
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
            Land ownership is one of the oldest and most durable forms of wealth building available to ordinary people. Here is why it still matters — and what it means in practice today.
          </p>
          <div className="flex items-center gap-4 mt-5 text-gray-600 text-xs">
            <span>7 min read</span>
            <span>·</span>
            <span>Perspective</span>
            <span>·</span>
            <span>Updated April 2026</span>
          </div>
        </div>

        {/* Section 1 */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-white mb-5 flex items-center gap-3">
            <span className="text-emerald-400 text-lg font-bold">01</span>
            Land Is Different From Every Other Asset
          </h2>
          <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6">
            <p className="text-gray-300 leading-relaxed mb-4">
              Stocks exist as entries on a computer. Bonds are contracts. Cryptocurrencies are code. Land is <em>physical</em>. You can stand on it. It has a shape and a slope and neighbors and a view. It does not disappear when the market crashes. It does not break down over time. It cannot be replicated or manufactured.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              For most of human history — across virtually every civilization — land ownership was the primary measure of wealth and power. In medieval England, your social class was defined by how much land you held. In the American colonies, the right to vote was tied to land ownership in many places. Land was wealth, in the most literal sense.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              That history is not ancient. The Homestead Act — offering 160 acres free to anyone who would settle and improve it — was signed in 1862. That is within three generations of people living today. The foundational promise of the American Dream was not upward mobility through education or career advancement. It was land. A piece of ground that was yours.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Land does not expire. A well-located parcel held for 50 years — modestly improved, maintained, maybe subdivided at the right moment — becomes something entirely different from what it was when purchased. This is not speculation. It is the documented history of land ownership across every developed economy in the world.
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-white mb-5 flex items-center gap-3">
            <span className="text-emerald-400 text-lg font-bold">02</span>
            The Ownership vs. Renting Reality
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
              <div className="text-red-400 font-bold text-sm mb-4">Renting land</div>
              <div className="space-y-3">
                {[
                  'You are paying someone else\'s mortgage, not building your own equity',
                  'Subject to the landlord\'s rules about what you can and cannot do with it',
                  'One phone call away from a rent increase or a non-renewal notice',
                  'No asset to pass on — when the lease ends, you have nothing',
                  'No control over neighborhood changes, neighbor composition, or future development nearby',
                ].map((item) => (
                  <div key={item} className="flex gap-2 items-start">
                    <span className="text-red-400 flex-shrink-0 mt-0.5">—</span>
                    <p className="text-gray-400 text-xs leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-900 border border-emerald-800 rounded-2xl p-5">
              <div className="text-emerald-400 font-bold text-sm mb-4">Owning land</div>
              <div className="space-y-3">
                {[
                  'Every payment builds equity in an asset you own',
                  'You control the asset — what to do with it, when to develop it, when to sell',
                  'It is yours to hold for as long as you want, on your terms',
                  'An asset to pass to your children, grandchildren, or sell on your timeline',
                  'A tangible, finite resource that cannot be printed, copied, or diluted',
                ].map((item) => (
                  <div key={item} className="flex gap-2 items-start">
                    <span className="text-emerald-400 flex-shrink-0 mt-0.5">—</span>
                    <p className="text-gray-400 text-xs leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6">
            <p className="text-gray-300 leading-relaxed">
              Owning land outright — without a mortgage, without a landlord, without a lease renewal risk — is one of the few genuinely finite, non-replicable assets available to ordinary people. You cannot create more land. You cannot import it. You cannot print it. The total supply of land in any given location is fixed. When demand grows and supply does not, prices tend to follow.
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-white mb-5 flex items-center gap-3">
            <span className="text-emerald-400 text-lg font-bold">03</span>
            Land as Legacy
          </h2>
          <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6">
            <p className="text-gray-300 leading-relaxed mb-4">
              Land is one of the few assets that can be meaningfully passed from one generation to the next without losing its core value. A savings account that earns modest interest compounds in dollar terms. But a parcel of land compounds in <em>qualitative</em> terms.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              Consider a simple example: a one-acre parcel in a rural area, purchased today for $5,000. The original owner holds it for 30 years, maintaining it, paying taxes on it, doing nothing else. In 30 years, the area grows. A town expands. A road is built nearby. The same one-acre parcel, now properly researched and improved, is worth $25,000. It has not done anything dramatic. It has simply existed in a place that became more valuable over time.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              Now consider that same parcel passed to a child, who passes it to a grandchild, who in turn holds it another 30 years. The compounding effect is not just financial — it is developmental. Each generation that holds the land is positioned to make better use of it than the last. The first generation clears it. The second generation builds a structure. The third generation subdivides it and sells parcels to cover college costs, or holds the best parcel as a permanent family anchor.
            </p>
            <p className="text-gray-300 leading-relaxed">
              This is not a hypothetical. It is the story of how most generational wealth in the United States was built — not through stock portfolios or career advancement, but through the patient holding of land. The family farm. The small commercial lot in a growing town. The second home on a lake that was eventually paid off and then passed on.
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-white mb-5 flex items-center gap-3">
            <span className="text-emerald-400 text-lg font-bold">04</span>
            The True Cost of Not Owning
          </h2>
          <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6">
            <p className="text-gray-300 leading-relaxed mb-4">
              Rent inflation has historically outpaced wage growth in most American cities. A family paying $1,200 per month in rent at age 25 may be paying $2,400 per month at age 45 — and have nothing to show for it when they stop working.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              At age 65, most Americans have some retirement savings. Many have very little. Almost none have land assets. This is not a criticism — it reflects the reality that land ownership has been increasingly inaccessible to middle-income Americans over the past several decades, as home prices have risen faster than incomes and the path to homeownership has narrowed.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              Land ownership is one of the clearest wealth-building distinctions between middle-class families that build lasting, generational wealth and those that do not. It is not the only path. But it is one of the most durable and well-documented ones.
            </p>
            <p className="text-gray-300 leading-relaxed">
              The cost of not owning is not just financial. It is the loss of an anchor — a physical place that belongs to you, that your children can visit, that has a story. People who grew up on family land remember it their whole lives. People who did not often express a quiet regret about it.
            </p>
          </div>
        </section>

        {/* Section 5 */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-white mb-5 flex items-center gap-3">
            <span className="text-emerald-400 text-lg font-bold">05</span>
            The Practical Path Today
          </h2>
          <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6">
            <p className="text-gray-300 leading-relaxed mb-4">
              Government land programs, tax sales, and land banks represent some of the last remaining pathways where ordinary people can acquire land at below-market prices. These programs are not charity. But they exist precisely because governments — counties, cities, states — have properties on their books that cost money to hold and generate no revenue. They want these properties back in productive use.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              Tax-delinquent properties, distressed vacant lots, and properties held by land banks or redevelopment authorities are available in significant numbers in many parts of the country — particularly in post-industrial cities and rural areas that have experienced population loss.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              The barriers to acquiring these properties are not primarily capital. A tax sale parcel in rural Missouri may be available for the amount of back taxes owed — sometimes only a few hundred dollars. The real barriers are:
            </p>
            <div className="space-y-3 mb-4">
              {[
                'Knowledge: knowing which programs exist, how they work, and what the process is',
                'Due diligence: understanding the title, the zoning, and the actual condition of the property before buying',
                'Patience: government programs move slowly and have specific requirements and timelines',
                'Follow-through: many tax sale properties are not purchased because people do not complete the process',
              ].map((item) => (
                <div key={item} className="flex gap-3 items-start">
                  <span className="text-emerald-400 flex-shrink-0 mt-0.5">—</span>
                  <p className="text-gray-300 text-sm">{item}</p>
                </div>
              ))}
            </div>
            <p className="text-gray-300 leading-relaxed">
              These are knowledge barriers, not wealth barriers. Someone who spends two weeks researching a county tax sale, understanding the process, and doing basic due diligence is far better positioned to acquire land at a discount than someone with ten times the capital who does not do the research.
            </p>
          </div>
        </section>

        {/* Section 6 */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-white mb-5 flex items-center gap-3">
            <span className="text-emerald-400 text-lg font-bold">06</span>
            What NLDS Is Trying to Do
          </h2>
          <div className="bg-emerald-950 border border-emerald-900 rounded-2xl p-6 mb-5">
            <p className="text-gray-300 leading-relaxed mb-4">
              The National Land Data System is built around a straightforward observation: the programs that exist to make land accessible to ordinary people are poorly understood, difficult to navigate, and underused. Meanwhile, there are properties sitting in county inventories, tax sale rolls, and land banks right now — available at a fraction of what they would cost on the open market — that no one is buying because the process is too opaque.
            </p>
            <p className="text-gray-300 leading-relaxed">
              We are trying to close that gap. We aggregate these opportunities, research them, score them against consistent criteria, and present them clearly. We are not selling land. We are not a brokerage. We are a research and discovery platform.
            </p>
          </div>
          <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6">
            <div className="space-y-4">
              {[
                {
                  title: 'We aggregate',
                  desc: 'We pull together listings from county land banks, tax sale programs, LRAs, HUD, USDA, and other government and quasi-government sources — in one place, updated regularly.',
                },
                {
                  title: 'We research',
                  desc: 'For each property, we pull the county assessor record, check for liens, confirm zoning, look at flood zone status, and do what we can with available public records before presenting a property as a deal.',
                },
                {
                  title: 'We score',
                  desc: 'We evaluate properties on a consistent set of criteria — location, price relative to market, title clarity, zoning compatibility — so you can compare across a portfolio of deals rather than guessing at each one in isolation.',
                },
                {
                  title: 'We explain',
                  desc: 'Our Learn Center modules are built to close the knowledge gap. We want you to understand what a land patent is, what a tax deed means, what due diligence looks like — so that when you find a deal you are confident in, you know what you are looking at.',
                },
              ].map(({ title, desc }) => (
                <div key={title} className="flex gap-4">
                  <div className="flex-shrink-0 w-2 h-2 bg-emerald-400 rounded-full mt-2" />
                  <div>
                    <div className="text-white font-bold text-sm mb-1">{title}</div>
                    <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Closing Quote */}
        <section className="mb-12">
          <div className="bg-gray-950 border border-gray-800 rounded-2xl p-8 text-center">
            <p className="text-white text-2xl md:text-3xl font-black leading-snug mb-4">
              &ldquo;The best time to start building a land legacy was 30 years ago. The second best time is today.&rdquo;
            </p>
            <p className="text-gray-500 text-sm">
              Not a promise. Not a sales pitch. Just the arithmetic of patient ownership.
            </p>
          </div>
        </section>

        {/* Disclaimer */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 mb-12">
          <div className="text-white font-bold text-sm mb-2">A note on legal advice</div>
          <p className="text-gray-500 text-xs leading-relaxed">
            This module is for educational and motivational purposes only. It is not financial or legal advice. Land ownership involves real risks, costs, and obligations. All investments carry risk. Consult qualified professionals before making any land acquisition decision.
          </p>
        </div>

        {/* Next Modules */}
        <div className="border-t border-gray-800 pt-10 mb-10">
          <div className="text-gray-500 text-xs uppercase tracking-widest mb-6">Continue Learning</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/learn/land-patent-history"
              className="bg-gray-950 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-colors group"
            >
              <div className="text-gray-600 text-xs mb-2">Next Module</div>
              <div className="text-white font-bold text-sm mb-1 group-hover:text-emerald-400 transition-colors">
                Land Patent History & Meaning
              </div>
              <div className="text-gray-500 text-xs">How the U.S. government transferred public land to private owners →</div>
            </Link>
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
