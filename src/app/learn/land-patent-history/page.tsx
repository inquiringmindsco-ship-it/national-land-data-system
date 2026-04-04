import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Land Patent History & Meaning — NLDS Learn',
  description:
    'A plain-language history of how the U.S. government transferred public land to private owners — from colonial governors to the Homestead Act to the Bureau of Land Management.',
};

export default function LandPatentHistoryPage() {
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
          Learn Center &rsaquo; Property Ownership History
        </div>

        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-amber-950 border border-amber-800 rounded-full px-4 py-1.5 mb-5">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">Advanced</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
            Land Patent History & Meaning
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
            How the U.S. government transferred hundreds of millions of acres from the public domain to private citizens — and why that history still shapes your property today.
          </p>
          <div className="flex items-center gap-4 mt-5 text-gray-600 text-xs">
            <span>7 min read</span>
            <span>·</span>
            <span>Historical</span>
            <span>·</span>
            <span>Updated April 2026</span>
          </div>
        </div>

        {/* Section 1 */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-white mb-5 flex items-center gap-3">
            <span className="text-emerald-400 text-lg font-bold">01</span>
            Before the United States Existed
          </h2>
          <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6">
            <p className="text-gray-300 leading-relaxed">
              Before there was a United States, land in the colonies was granted by British colonial governors. These royal land grants — issued under the authority of the Crown — are technically the first &ldquo;land patents&rdquo; in what became America. They described parcels by natural features (rivers, ridges, trees), not by the coordinate-based system we use today.
            </p>
            <p className="text-gray-300 leading-relaxed mt-4">
              After the Revolutionary War, the new federal government inherited all that land — particularly the vast territory west of the Appalachians that the British Crown had claimed. This inherited land became the basis of what was called the <strong className="text-white">public domain</strong>: hundreds of millions of acres held in trust by the federal government, to be sold, granted, or transferred to private citizens over the following century.
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-white mb-5 flex items-center gap-3">
            <span className="text-emerald-400 text-lg font-bold">02</span>
            The Land Ordinance of 1785
          </h2>
          <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6">
            <p className="text-gray-300 leading-relaxed">
              The first major federal law describing how to survey and sell public domain land was the <strong className="text-white">Land Ordinance of 1785</strong>. Before this, there was no standard way to describe a piece of land — which made it nearly impossible to sell reliably.
            </p>
            <p className="text-gray-300 leading-relaxed mt-4">
              The ordinance created the <strong className="text-white">rectangular survey system</strong>, still used today. The land was divided into townships (6-mile squares) and ranges, and each township was subdivided into 36 sections of 640 acres each. Every parcel got a coordinate-style description — something like &ldquo;Section 16, Township 4 North, Range 7 West&rdquo; — that uniquely identifies its location.
            </p>
            <p className="text-gray-300 leading-relaxed mt-4">
              This was a significant achievement. For the first time, the federal government could sell land by the acre to anyone who could pay, with a reliable description that held up in court.
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-white mb-5 flex items-center gap-3">
            <span className="text-emerald-400 text-lg font-bold">03</span>
            The Land Ordinance of 1787
          </h2>
          <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6">
            <p className="text-gray-300 leading-relaxed">
              One year after the survey ordinance, Congress passed the <strong className="text-white">Land Ordinance of 1787</strong>, which did something more ambitious: it created the <strong className="text-white">Northwest Territory</strong> (the land that would become Ohio, Indiana, Illinois, Michigan, and Wisconsin) and established the framework for how new territories would eventually become states.
            </p>
            <p className="text-gray-300 leading-relaxed mt-4">
              The key principle was equality: any territory that reached a certain population could apply for statehood, and the new state would be admitted on the same footing as the original 13 states. This was remarkable for its time and set the legal foundation for westward expansion.
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-white mb-5 flex items-center gap-3">
            <span className="text-emerald-400 text-lg font-bold">04</span>
            The Homestead Act of 1862
          </h2>
          <div className="bg-amber-950 border border-amber-900 rounded-2xl p-6 mb-5">
            <div className="text-amber-300 text-xs font-bold uppercase tracking-widest mb-3">Signed by Abraham Lincoln, 1862</div>
            <p className="text-gray-300 text-sm leading-relaxed">
              The Homestead Act offered 160 acres of public land <em>free</em> to any settler who filed a claim, lived on the land for five years, and made improvements. The idea was straightforward: if you were willing to settle and work the land, the government would give it to you.
            </p>
          </div>
          <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6">
            <p className="text-gray-300 leading-relaxed">
              Over 270,000 homestead patents were issued. The act permanently altered American demographics — driving settlement of the Great Plains, the Midwest, and the West. Entire towns, counties, and agricultural economies were built on homestead land.
            </p>
            <p className="text-gray-300 leading-relaxed mt-4">
              To claim a homestead, a person had to be the head of a household or a adult citizen, never have borne arms against the United States, and had to physically occupy and improve the land for five continuous years. After that, they could receive the patent — the formal deed confirming ownership.
            </p>
          </div>
        </section>

        {/* Section 5 */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-white mb-5 flex items-center gap-3">
            <span className="text-emerald-400 text-lg font-bold">05</span>
            Morrill Land-Grant Acts
          </h2>
          <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6">
            <p className="text-gray-300 leading-relaxed">
              In 1862, the same year as the Homestead Act, Congress passed the <strong className="text-white">First Morrill Land-Grant Act</strong>, which gave federal land to states to fund colleges. Each state received a allotment of federal land equal to 30,000 acres for each senator and representative it had in Congress. The proceeds from selling that land were used to establish universities — specifically, agricultural and mechanical (A&M) colleges.
            </p>
            <p className="text-gray-300 leading-relaxed mt-4">
              This is the origin of the &ldquo;A&M&rdquo; in school names like Texas A&M, Cornell (Ivy League but land-grant), and dozens of other public universities. A second Morrill Act in 1890 expanded the program to states that had not yet taken full advantage of it, particularly in the South.
            </p>
            <p className="text-gray-300 leading-relaxed mt-4">
              The Morrill Acts transferred millions of acres of federal land to states. Some of those parcels are still owned by the colleges. Others were sold to private buyers and remain in private hands today.
            </p>
          </div>
        </section>

        {/* Section 6 */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-white mb-5 flex items-center gap-3">
            <span className="text-emerald-400 text-lg font-bold">06</span>
            Railroad Land Grants
          </h2>
          <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6">
            <p className="text-gray-300 leading-relaxed">
              To fund the transcontinental railroad and other major rail lines, the federal government granted massive parcels of public domain land to railroad companies — among the largest private land grants in American history.
            </p>
            <p className="text-gray-300 leading-relaxed mt-4">
              Under the Pacific Railway Acts of 1862 and 1864, for example, the Union Pacific and Central Pacific railroads received alternating sections of public land (every other section) within a strip 20 to 40 miles wide on either side of the track. This was meant to make the railroad financially viable — the railroad could sell the land to settlers to fund construction.
            </p>
            <p className="text-gray-300 leading-relaxed mt-4">
              Some railroad grants were enormous. The Union Pacific received nearly 20 million acres. The Northern Pacific received a continuous strip from the Great Lakes to the Pacific Northwest. Many private land holdings in the Midwest and West today trace back to railroad grants rather than homestead patents.
            </p>
          </div>
        </section>

        {/* Section 7 */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-white mb-5 flex items-center gap-3">
            <span className="text-emerald-400 text-lg font-bold">07</span>
            The General Land Office and BLM
          </h2>
          <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6">
            <p className="text-gray-300 leading-relaxed">
              The <strong className="text-white">General Land Office</strong> was established in 1812 to manage all federal land disposal. It ran the land offices in each territory where settlers could file claims, buy land at auction, or apply for homestead patents.
            </p>
            <p className="text-gray-300 leading-relaxed mt-4">
              In 1946, the General Land Office merged with the Grazing Service (which managed federal rangeland) to form the <strong className="text-white">Bureau of Land Management (BLM)</strong>. Today the BLM manages approximately 245 million acres — about 12% of the total land mass of the United States — concentrated in the western states.
            </p>
            <p className="text-gray-300 leading-relaxed mt-4">
              The BLM still maintains records of all the land patents issued through the General Land Office going back to 1785. Those records are publicly searchable. If your property sits on former public domain land, the BLM database can tell you who received the original patent, under what program, and when.
            </p>
          </div>
        </section>

        {/* Section 8 */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-white mb-5 flex items-center gap-3">
            <span className="text-emerald-400 text-lg font-bold">08</span>
            End of the Patent Era
          </h2>
          <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6">
            <p className="text-gray-300 leading-relaxed">
              By the early 1900s, most of the desirable public domain land had been disposed of. Homesteading continued in some areas into the 1970s, and some categories of federal land disposal (like small tract acts) continued intermittently, but the great era of land grant programs was essentially over.
            </p>
            <p className="text-gray-300 leading-relaxed mt-4">
              The federal government retains about <strong className="text-white">12% of U.S. land mass</strong> today — roughly 640 million acres — concentrated in the West. The BLM, National Park Service, U.S. Forest Service, and other agencies hold this land. It is not available for private land patent acquisition.
            </p>
          </div>
        </section>

        {/* Section 9 */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-white mb-5 flex items-center gap-3">
            <span className="text-emerald-400 text-lg font-bold">09</span>
            What This History Means for Modern Landowners
          </h2>
          <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6">
            <p className="text-gray-300 leading-relaxed mb-4">
              Your property almost certainly traces back to one of these programs. Whether it was a homestead patent in Kansas, a railroad grant in Nebraska, a cash sale at a federal land office in Oregon, or a state-era conveyance in an eastern state, the original grant is the root of your chain of title.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              Understanding which program applies to your land tells you something meaningful about its history — when it was first settled, how it was used before you, and what kind of records you should look for when researching it.
            </p>
            <p className="text-gray-300 leading-relaxed">
              The patent is not just a historical curiosity. It is the beginning of a legal chain that runs through every subsequent conveyance to the present day. A clean patent does not guarantee a clean title today, but it is the foundation everything else stands on.
            </p>
          </div>
        </section>

        {/* BLM reference */}
        <div className="bg-emerald-950 border border-emerald-900 rounded-2xl p-5 mb-12">
          <div className="text-emerald-300 text-xs font-bold uppercase tracking-widest mb-2">Official resource</div>
          <p className="text-gray-300 text-sm leading-relaxed mb-3">
            The Bureau of Land Management maintains a free, searchable database of over 4 million federal land patents issued between 1785 and today. You can search by state, county, township/range, or grantee name.
          </p>
          <a
            href="https://www.blm.gov/services/land-records/patents"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:text-emerald-300 text-sm font-medium"
          >
            BLM Land Patent Database →
          </a>
        </div>

        {/* Disclaimer */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 mb-12">
          <div className="text-white font-bold text-sm mb-2">A note on legal advice</div>
          <p className="text-gray-500 text-xs leading-relaxed">
            This module is for educational and historical context only. It is not legal advice. When acquiring property, always work with a licensed title professional or real estate attorney.
          </p>
        </div>

        {/* Next Modules */}
        <div className="border-t border-gray-800 pt-10 mb-10">
          <div className="text-gray-500 text-xs uppercase tracking-widest mb-6">Continue Learning</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/learn/title-deed-tax-sale-land-patent"
              className="bg-gray-950 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-colors group"
            >
              <div className="text-gray-600 text-xs mb-2">Next Module</div>
              <div className="text-white font-bold text-sm mb-1 group-hover:text-emerald-400 transition-colors">
                Title vs. Deed vs. Tax Sale Title vs. Land Patent
              </div>
              <div className="text-gray-500 text-xs">Understanding the different forms of ownership documents →</div>
            </Link>
            <Link
              href="/learn/how-to-research-a-parcel"
              className="bg-gray-950 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-colors group"
            >
              <div className="text-gray-600 text-xs mb-2">Next Module</div>
              <div className="text-white font-bold text-sm mb-1 group-hover:text-emerald-400 transition-colors">
                How to Research a Parcel
              </div>
              <div className="text-gray-500 text-xs">A step-by-step guide to investigating a property →</div>
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
