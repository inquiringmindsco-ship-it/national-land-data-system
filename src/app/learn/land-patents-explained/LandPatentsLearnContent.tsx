'use client';

export function LandPatentsLearnContent() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top nav */}
      <header className="border-b border-gray-800 bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/learn" className="text-gray-500 hover:text-white text-sm flex items-center gap-1.5">
            <span>←</span>
            <span>Learn Center</span>
          </a>
          <span className="text-xs text-gray-600">NLDS Learn</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="text-gray-600 text-xs mb-6 uppercase tracking-widest">
          Learn Center &rsaquo; Property Ownership History &rsaquo; Land Patents Explained
        </div>

        {/* Module header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-amber-950 border border-amber-800 rounded-full px-4 py-1.5 mb-5">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">Module 4</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
            Land Patents Explained
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
            A historically grounded, plain-language explanation of U.S. land patents — what they are, where they sit in a title chain, and what they do and do not mean for modern parcel research.
          </p>
          <div className="flex items-center gap-4 mt-5 text-gray-600 text-xs">
            <span>12 min read</span>
            <span>·</span>
            <span>Historical · Legal context</span>
            <span>·</span>
            <span>Updated April 2026</span>
          </div>
        </div>

        {/* Disclaimer banner */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 mb-10">
          <div className="flex items-start gap-3">
            <span className="text-amber-400 text-lg flex-shrink-0 mt-0.5">⚠</span>
            <div>
              <div className="text-white font-bold text-sm mb-1">Important framing before you read</div>
              <p className="text-gray-400 text-sm leading-relaxed">
                This module is for educational and historical context only. Land patents are historical documents — they do not automatically resolve title disputes, guarantee ownership, or replace professional title research. When acquiring property, always work with a licensed title professional or real estate attorney.
              </p>
            </div>
          </div>
        </div>

        {/* Section 1 */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-white mb-5 flex items-center gap-3">
            <span className="text-emerald-400 text-lg font-bold">01</span>
            What a Land Patent Is
          </h2>
          <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6">
            <p className="text-gray-300 leading-relaxed mb-4">
              A <strong className="text-white">land patent</strong> (sometimes called a <em>patent</em> in historical legal documents) is a formal grant issued by a sovereign government — typically the{' '}
              <strong className="text-white">United States federal government</strong> — conveying title to a specific parcel of land from the public domain to a private party.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              In practical terms: the government said, <em>"This land is now yours."</em> The patent is the legal document that proves it. It names the recipient, describes the land, specifies the legal authority under which it was granted, and bears the signature of the issuing authority — historically, that could be a President, a state governor, or a designated land office official.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Land patents were the original transfer documents for most of the western and southern United States during the 19th and early 20th centuries. Every parcel of land in the original public domain that passed through channels like the Homestead Act, the Preemption Act, or cash sales at federal land offices was ultimately confirmed by a land patent.
            </p>
          </div>

          {/* Historical context box */}
          <div className="bg-amber-950 border border-amber-900 rounded-2xl p-6 mt-5">
            <div className="text-amber-300 text-xs font-bold uppercase tracking-widest mb-3">Key legal distinction</div>
            <p className="text-gray-300 text-sm leading-relaxed">
              A land patent is <strong className="text-white">not the same as a deed</strong>. A deed is a private transfer between two individuals. A land patent is a grant from a sovereign body to a private party — it sits at the root of the chain of title. Every subsequent conveyance (warranty deed, quitclaim deed, etc.) traces back to that original patent.
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-white mb-5 flex items-center gap-3">
            <span className="text-emerald-400 text-lg font-bold">02</span>
            How Land Patents Started
          </h2>
          <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6">
            <p className="text-gray-300 leading-relaxed mb-4">
              After the United States acquired its initial territory — through treaties, the 1803 Louisiana Purchase, the 1848 Mexican Cession, and other acquisitions — the federal government held title to hundreds of millions of acres. This land was called the <strong className="text-white">public domain</strong>.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              The government needed a legal mechanism to transfer that land into private hands. The land patent was that mechanism. Issued under various acts of Congress, patents confirmed that an individual had met the legal requirements to claim a specific parcel.
            </p>

            <div className="border-t border-gray-800 my-5 pt-5">
              <div className="text-gray-400 text-xs uppercase tracking-widest mb-4">Major federal land grant programs</div>
              <div className="space-y-3">
                {[
                  {
                    year: '1785',
                    act: 'Land Ordinance of 1785',
                    detail: 'Established the rectangular survey system and authorized the first land sales in the Northwest Territory (Ohio, Indiana, Illinois, Michigan, Wisconsin).',
                  },
                  {
                    year: '1800s',
                    act: 'Cash Land Sales',
                    detail: 'Land sold at federal land offices at $1–$2 per acre minimum, open to any buyer who could pay.',
                  },
                  {
                    year: '1841',
                    act: 'Preemption Act',
                    detail: 'Allowed squatters who improved land to purchase it at the minimum price before it was offered publicly.',
                  },
                  {
                    year: '1862',
                    act: 'Homestead Act',
                    detail: 'Any head of household or adult citizen could claim 160 acres by settling and improving it for 5 years. Over 270,000 patents issued.',
                  },
                  {
                    year: '1862',
                    act: 'Pacific Railway Acts',
                    detail: 'Land grants to railroads to fund transcontinental railroad construction — one of the largest transfers of public land in U.S. history.',
                  },
                  {
                    year: '1877',
                    act: 'Desert Land Act',
                    detail: 'Allowed purchase of 640 acres in arid western states for $1.25/acre if irrigated within 3 years.',
                  },
                  {
                    year: '1889',
                    act: 'Omaha Multiplex / Forest Service Acts',
                    detail: 'Various state-specific and use-specific grant programs continued through the 1900s.',
                  },
                ].map(({ year, act, detail }) => (
                  <div key={act} className="flex gap-4">
                    <div className="text-emerald-400 font-bold text-sm w-12 flex-shrink-0 pt-0.5">{year}</div>
                    <div>
                      <div className="text-white font-medium text-sm">{act}</div>
                      <div className="text-gray-500 text-xs mt-0.5 leading-relaxed">{detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed">
              By the numbers: the federal government disposed of over <strong className="text-white">1.3 billion acres</strong> through patents, cash sales, and grants between 1785 and 1990. The Bureau of Land Management estimates that roughly 98% of all private land in the western United States passed through the federal land patent process at some point.
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-white mb-5 flex items-center gap-3">
            <span className="text-emerald-400 text-lg font-bold">03</span>
            Land Patent vs. Deed vs. Title Chain
          </h2>
          <div className="bg-gray-950 border border-gray-800 rounded-2xl overflow-hidden mb-5">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left text-gray-400 font-medium px-6 py-4 text-xs uppercase tracking-wider">Document</th>
                  <th className="text-left text-gray-400 font-medium px-6 py-4 text-xs uppercase tracking-wider">Issued by</th>
                  <th className="text-left text-gray-400 font-medium px-6 py-4 text-xs uppercase tracking-wider">Purpose</th>
                  <th className="text-left text-gray-400 font-medium px-6 py-4 text-xs uppercase tracking-wider">Position in chain</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                <tr>
                  <td className="px-6 py-4">
                    <span className="text-white font-bold">Land Patent</span>
                  </td>
                  <td className="px-6 py-4 text-gray-300">Federal or state government</td>
                  <td className="px-6 py-4 text-gray-300">Transfer from sovereign to private party</td>
                  <td className="px-6 py-4"><span className="bg-emerald-900 text-emerald-300 text-xs px-2 py-0.5 rounded font-bold">Root of title</span></td>
                </tr>
                <tr>
                  <td className="px-6 py-4">
                    <span className="text-white font-bold">Warranty Deed</span>
                  </td>
                  <td className="px-6 py-4 text-gray-300">Private party (grantor)</td>
                  <td className="px-6 py-4 text-gray-300">Transfer with guarantees against defects</td>
                  <td className="px-6 py-4 text-gray-400 text-xs">Conveyance #1, #2, ...</td>
                </tr>
                <tr>
                  <td className="px-6 py-4">
                    <span className="text-white font-bold">Quitclaim Deed</span>
                  </td>
                  <td className="px-6 py-4 text-gray-300">Private party (grantor)</td>
                  <td className="px-6 py-4 text-gray-300">Transfer of whatever interest exists — no guarantees</td>
                  <td className="px-6 py-4 text-gray-400 text-xs">Conveyance #1, #2, ...</td>
                </tr>
                <tr>
                  <td className="px-6 py-4">
                    <span className="text-white font-bold">Sheriff's Deed / Tax Deed</span>
                  </td>
                  <td className="px-6 py-4 text-gray-300">County / government</td>
                  <td className="px-6 py-4 text-gray-300">Transfer following court judgment or tax sale</td>
                  <td className="px-6 py-4 text-gray-400 text-xs">May skip intermediate links in chain</td>
                </tr>
                <tr>
                  <td className="px-6 py-4">
                    <span className="text-white font-bold">Title Insurance Policy</span>
                  </td>
                  <td className="px-6 py-4 text-gray-300">Insurance company</td>
                  <td className="px-6 py-4 text-gray-300">Indemnifies against losses from title defects</td>
                  <td className="px-6 py-4 text-gray-400 text-xs">Not a conveyance — a contract of indemnity</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
            <div className="text-white font-bold text-sm mb-3">Understanding the chain of title</div>
            <p className="text-gray-400 text-sm leading-relaxed">
              A title chain is the complete history of every recorded conveyance of a parcel — from the original patent through all subsequent sales, inheritances, gifts, and other transfers. Each link must be documented and free of gaps or disputes for a title to be considered "clean." Tax sales and heir property situations are common sources of chain breaks, because transfers may have occurred outside the formal recording system.
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-white mb-5 flex items-center gap-3">
            <span className="text-emerald-400 text-lg font-bold">04</span>
            Why People Still Research Land Patents
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                title: 'Heir property research',
                detail: 'In many rural areas — particularly in the South — property passed through generations without formal probate or recording. Tracing a chain of title back to the original patent is often the first step in understanding who legally owns a parcel.',
                icon: '🏚️',
              },
              {
                title: 'Quiet title actions',
                detail: 'When there is a dispute over ownership — often because of a chain break — attorneys and title researchers trace back to the patent as the unquestioned root of title to establish a baseline.',
                icon: '⚖️',
              },
              {
                title: 'Adverse possession claims',
                detail: 'Someone occupying land for a statutory period may claim ownership. Understanding the original patent and subsequent chain helps establish whether the claimant has a viable path.',
                icon: '📋',
              },
              {
                title: 'Conservation and historical research',
                detail: 'Historians, genealogists, and conservation organizations research patents to understand land grant patterns, settlement history, and the evolution of land ownership in specific regions.',
                icon: '📜',
              },
              {
                title: 'Native American land claim investigations',
                detail: 'Tracing chains of title and identifying original patents is foundational work in land claims cases involving Indigenous nations, treaty rights, and forced removal.',
                icon: '🌍',
              },
              {
                title: 'Locating original land grant records',
                detail: 'The BLM Land Patent Database is publicly searchable and can confirm the original grant date, grantee, legal authority (e.g., Homestead Act), and acreage — useful for historical interest or curiosity about a specific property.',
                icon: '🔍',
              },
            ].map(({ title, detail, icon }) => (
              <div key={title} className="bg-gray-950 border border-gray-800 rounded-xl p-5">
                <div className="text-2xl mb-2">{icon}</div>
                <div className="text-white font-bold text-sm mb-2">{title}</div>
                <p className="text-gray-400 text-xs leading-relaxed">{detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5 */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-white mb-5 flex items-center gap-3">
            <span className="text-emerald-400 text-lg font-bold">05</span>
            What Land Patents Do Not Automatically Do
          </h2>
          <div className="bg-red-950/30 border border-red-900 rounded-2xl p-6 mb-5">
            <p className="text-gray-300 leading-relaxed mb-4">
              This section addresses a persistent category of misinformation that circulates online. Some sources claim that a land patent can be used to "challenge" mortgage companies, banks, or government agencies, or that it somehow annuls modern title or property taxes. <strong className="text-white">These claims are not supported by law and have been consistently rejected by courts.</strong>
            </p>
            <p className="text-gray-300 leading-relaxed">
              A land patent is a historical document. It does not function as a legal weapon, a tax evasion mechanism, or a shortcut around modern property law.
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                myth: 'A land patent eliminates mortgage obligations',
                reality: 'A patent granted land from the government 150 years ago. It has no bearing on modern financing arrangements. A mortgage is a separate contract between a borrower and a lender, governed by modern contract law.',
              },
              {
                myth: 'A land patent proves you own the property free and clear',
                reality: 'A patent is the start of a chain, not the end. If there are liens, encumbrances, unpaid taxes, easements, or competing claims in the subsequent chain of title, those survive regardless of the original patent. A clean patent is necessary but not sufficient for clean title.',
              },
              {
                myth: 'Land patents can be used to avoid property taxes',
                reality: 'All private property is subject to taxation under state law. A historical patent does not create an exemption. Property tax obligations run with the land, not against a specific document.',
              },
              {
                myth: 'You can find a "free and clear" patent and claim the land today',
                reality: 'Land patents were issued to original claimants — those individuals or their heirs. Claiming a patent today for a property someone else holds recorded title to is not a legal acquisition method and would constitute a title dispute or potential fraud.',
              },
              {
                myth: 'Counties and courts must accept land patents as superior title',
                reality: 'Modern title law operates through the recording system. A land patent is one link — and courts look at the complete chain, not just the root. Competing claims, good-faith purchaser rules, and statutes of limitations all affect how title disputes are resolved.',
              },
            ].map(({ myth, reality }) => (
              <div key={myth} className="bg-gray-950 border border-gray-800 rounded-xl p-5">
                <div className="text-red-400 text-sm font-bold mb-2">✗ {myth}</div>
                <div className="text-gray-400 text-sm leading-relaxed">{reality}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6 */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-white mb-5 flex items-center gap-3">
            <span className="text-emerald-400 text-lg font-bold">06</span>
            How This Fits Into Responsible Parcel Research
          </h2>
          <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6">
            <p className="text-gray-300 leading-relaxed mb-4">
              Land patent research is a legitimate and valuable tool — but it is one piece of a larger picture. Responsible parcel research combines multiple document types and verification steps:
            </p>

            <div className="space-y-4 mt-5">
              {[
                {
                  step: 1,
                  label: 'Start with the land patent (root of title)',
                  desc: 'Use the BLM Land Patent Database (blm.gov) to confirm the original grant. This establishes the legal starting point for the parcel.',
                },
                {
                  step: 2,
                  label: 'Trace the chain of title forward',
                  desc: 'Work through every recorded conveyance from the patent to the present. County recorder offices maintain these records. Gaps, missing links, or transfers to deceased persons (without probate) are red flags.',
                },
                {
                  step: 3,
                  label: 'Check for liens and encumbrances',
                  desc: 'Even with a clean chain, mortgages, tax liens, mechanic\'s liens, easements, HOA liens, or judgments can cloud title. A title search or title commitment identifies these.',
                },
                {
                  step: 4,
                  label: 'Verify current ownership through county records',
                  desc: 'The county assessor and recorder should show the current recorded owner. This may differ from the person you are dealing with if there has been an unrecorded transfer.',
                },
                {
                  step: 5,
                  label: 'Check for heir property and probate issues',
                  desc: 'If the recorded owner is deceased, the property may have passed outside probate. Multiple potential heirs can create contested ownership situations — common in rural land disputes.',
                },
                {
                  step: 6,
                  label: 'Work with a licensed professional',
                  desc: 'For any acquisition, a title insurance policy and a real estate attorney\'s review are standard protection. Land patent research supports that process — it does not replace it.',
                },
              ].map(({ step, label, desc }) => (
                <div key={step} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-emerald-900 border border-emerald-700 rounded-full flex items-center justify-center">
                    <span className="text-emerald-300 font-bold text-sm">{step}</span>
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm">{label}</div>
                    <div className="text-gray-400 text-xs mt-0.5 leading-relaxed">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BLM reference */}
          <div className="bg-emerald-950 border border-emerald-900 rounded-2xl p-5 mt-5">
            <div className="text-emerald-300 text-xs font-bold uppercase tracking-widest mb-2">Official resource</div>
            <p className="text-gray-300 text-sm leading-relaxed mb-3">
              The Bureau of Land Management manages the Federal Land Patent Database — a free, searchable index of over 4 million federal land patents issued between 1785 and present.
            </p>
            <div className="flex items-center gap-2">
              <a
                href="https://www.blm.gov/services/land-records/patents"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 text-sm font-medium"
              >
                BLM Land Patents → blm.gov/services/land-records/patents
              </a>
            </div>
          </div>
        </section>

        {/* Section 7 */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-white mb-5 flex items-center gap-3">
            <span className="text-emerald-400 text-lg font-bold">07</span>
            Related Topics in the NLDS Learn Center
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: 'Chain of Title Explained',
                desc: 'How to trace ownership from the original patent to the present owner — and where chains break.',
                module: 'Module 1',
                href: '/learn/chain-of-title-explained',
                status: 'coming soon',
              },
              {
                title: 'Tax Deed vs. Tax Lien',
                desc: 'The difference between buying a property at a tax deed sale versus purchasing a tax lien certificate — and what each means for your ownership rights.',
                module: 'Module 2',
                href: '/learn/tax-deed-vs-tax-lien',
                status: 'coming soon',
              },
              {
                title: 'Heir Property: A Growing Crisis',
                desc: 'Why unprobated land transfers create clouded titles, and how to research whether a property has heir property issues.',
                module: 'Module 3',
                href: '/learn/heir-property-explained',
                status: 'coming soon',
              },
              {
                title: 'How to Read a Property Assessor\'s Record',
                desc: 'Assessor records, recorder indexes, GIS maps, and how to cross-reference them to verify parcel information.',
                module: 'Module 5',
                href: '/learn/how-to-read-assessor-records',
                status: 'coming soon',
              },
              {
                title: 'Understanding Easements and Rights-of-Way',
                desc: 'What easements are, how they appear in title records, and why they matter when evaluating a property.',
                module: 'Module 6',
                href: '/learn/easements-and-rights-of-way',
                status: 'coming soon',
              },
              {
                title: 'Quiet Title: What It Is and When You Need It',
                desc: 'A quiet title action is a court proceeding to settle competing ownership claims. Here is how it works and when it applies.',
                module: 'Module 7',
                href: '/learn/quiet-title-actions',
                status: 'coming soon',
              },
            ].map(({ title, desc, module, status }) => (
              <div key={title} className="bg-gray-950/40 border border-gray-800/60 rounded-xl p-5 opacity-60">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-600 text-xs">{module}</span>
                  <span className="text-amber-500 text-xs font-bold uppercase tracking-wide flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
                    Coming Soon
                  </span>
                </div>
                <div className="text-gray-400 font-bold text-sm mb-1.5">{title}</div>
                <p className="text-gray-600 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom nav */}
        <div className="border-t border-gray-800 pt-8 mt-8 flex items-center justify-between">
          <a href="/learn" className="text-gray-500 hover:text-white text-sm">
            ← Back to Learn Center
          </a>
          <a href="/deals" className="text-emerald-400 hover:text-emerald-300 text-sm">
            Browse current deals →
          </a>
        </div>
      </main>
    </div>
  );
}
