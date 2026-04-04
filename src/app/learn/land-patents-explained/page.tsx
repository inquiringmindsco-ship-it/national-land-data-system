import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Land Patents Explained — NLDS Learn',
  description:
    'A clear, historically grounded explanation of U.S. land patents — what they are, how the patent system worked, how they differ from modern deeds, and what they can and cannot do for you today.',
}

export default function LandPatentsExplainedPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* ── Sticky Header ─────────────────────────────────────────────── */}
      <header className="border-b border-gray-800 bg-black/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link
            href="/learn"
            className="text-gray-400 hover:text-white transition text-sm flex items-center gap-1.5 w-fit"
          >
            ← Learn Center
          </Link>
        </div>
      </header>

      {/* ── Article Container ─────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-4 py-10">

        {/* Module Meta */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm px-2.5 py-1 rounded-full bg-amber-900/30 border border-amber-700/40 text-amber-300 font-medium">
              History & Title
            </span>
            <span className="text-gray-600 text-sm">7 min read</span>
          </div>
          <h1 className="text-4xl font-black text-white mb-4 leading-tight">
            Land Patents Explained
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            The original land grant documents of the United States — and what they mean for anyone researching property title today.
          </p>
        </div>

        {/* ── Disclaimer Banner ──────────────────────────────────────── */}
        <div className="bg-gray-900/60 border border-gray-700/50 rounded-xl p-4 mb-10">
          <p className="text-gray-400 text-sm leading-relaxed">
            <span className="text-white font-semibold">Disclaimer:</span> This module is for educational purposes only.
            It is not legal advice. Land patent records are historical documents; always consult a licensed real estate
            attorney or title professional for any legal matter involving your property.
          </p>
        </div>

        {/* ── Section 1: The Short Version ─────────────────────────── */}
        <Section title="The Short Version">
          <p className="text-gray-300 leading-relaxed text-base">
            A land patent is an <span className="text-white font-semibold">original grant of land from a sovereign government to a private individual</span>.
            In the United States, most land patents were issued by the federal government between the 1780s and the early 1900s,
            as the country expanded westward. A land patent is the oldest form of land title in America.
          </p>
        </Section>

        {/* ── Section 2: What a Land Patent Actually Is ───────────── */}
        <Section title="What a Land Patent Actually Is">
          <p className="text-gray-300 leading-relaxed mb-5">
            A land patent is a legal document issued by a government — originally the federal government, sometimes a state or colonial government —
            granting title to a specific parcel of land to a named individual or entity.
          </p>
          <div className="bg-amber-950/20 border border-amber-800/30 rounded-xl p-5 mb-5">
            <p className="text-amber-200 font-semibold mb-2 flex items-center gap-2">
              <span>📜</span> Think of a land patent as the &ldquo;birth certificate&rdquo; of a piece of land
            </p>
            <p className="text-gray-300 text-sm leading-relaxed">
              It is the <span className="text-white">original conveyance</span> — the very first time that land passed from public ownership
              into private hands. Once a patent is issued, the land enters the private title chain. All subsequent transfers
              happen through deeds.
            </p>
          </div>
          <p className="text-gray-300 leading-relaxed">
            The patent names the original grantee, describes the land (often by section, township, and range under the Public Land Survey System),
            and bears the signature of the issuing authority — historically a surveyor general, the Commissioner of the General Land Office,
            or the President of the United States.
          </p>
        </Section>

        {/* ── Section 3: Historical Context ───────────────────────── */}
        <Section title="Historical Context — How the Patent System Worked">
          <p className="text-gray-300 leading-relaxed mb-5">
            After the Revolutionary War, the new U.S. government owned enormous quantities of land — territories that would become
            Ohio, Indiana, Illinois, Michigan, Wisconsin, and beyond. The federal government needed to dispose of this land,
            both to generate revenue and to encourage westward settlement.
          </p>

          <h3 className="text-white font-bold mb-3 mt-8">Who Received Land Patents?</h3>
          <ul className="text-gray-300 space-y-2 mb-6">
            {[
              'Revolutionary War veterans — through bounty land warrants granted for military service',
              'Settlers who purchased directly from the federal government through cash entry',
              'State governments — granted land in exchange for ceding claims to western territories',
              'Railroad companies — vast land grant railroads received patents for miles of right-of-way and adjacent land to fund construction',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-emerald-400 mt-0.5 shrink-0">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h3 className="text-white font-bold mb-3">The General Land Office</h3>
          <p className="text-gray-300 leading-relaxed mb-6">
            The <span className="text-white font-medium">General Land Office</span> (GLO), established in 1812, managed the federal land disposal program.
            It operated land offices in each territory, accepted entries, issued receipts, and ultimately issued patents upon final payment.
            In 1946, the GLO merged with the Grazing Service to become the Bureau of Land Management (BLM), which still maintains
            the records of virtually all federal land patents today.
          </p>

          <h3 className="text-white font-bold mb-3">Common Methods of Acquisition</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {[
              { method: 'Cash Entry', desc: 'Direct purchase at the land office price (typically $1–$2/acre)' },
              { method: 'Homestead Entry', desc: 'Free patent after 5 years of residence and improvement (Homestead Act of 1862)' },
              { method: 'Military Bounty Land Warrants', desc: 'Issued to veterans; could be applied toward land purchase' },
              { method: 'Timber Culture', desc: 'Patent granted for planting trees on semi-arid land (later repealed)' },
              { method: 'Desert Land Act', desc: 'Patent issued after proving land could be irrigated' },
              { method: 'Railroad Land Grants', desc: 'Patents issued to railroad companies to fund transcontinental construction' },
            ].map(({ method, desc }) => (
              <div key={method} className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
                <p className="text-white font-semibold text-sm mb-1">{method}</p>
                <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <h3 className="text-white font-bold mb-3">The Homestead Act of 1862</h3>
          <p className="text-gray-300 leading-relaxed">
            Perhaps the most famous land disposal program, the Homestead Act granted <span className="text-white font-medium">160 acres free</span> to any settler
            who lived on the land and made improvements for five years. By the time it was repealed in 1976 (except in Alaska, where it ended in 1986),
            it had distributed over 270 million acres to an estimated 1.6 million homesteaders.
          </p>
        </Section>

        {/* ── Section 4: Land Patents vs. Modern Deeds ────────────── */}
        <Section title="Land Patents vs. Modern Deeds">
          <p className="text-gray-300 leading-relaxed mb-5">
            Understanding the difference between a patent and a deed is fundamental to understanding how American land title works.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-5">
              <div className="text-amber-300 font-bold mb-2">🏛️ Land Patent</div>
              <p className="text-white text-sm font-semibold mb-2">The Original Grant</p>
              <p className="text-gray-300 text-sm leading-relaxed">
                Transfers title <span className="text-white">from the sovereign government</span> to a private party.
                It <span className="text-white">creates</span> the title for the first time.
              </p>
            </div>
            <div className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-5">
              <div className="text-blue-300 font-bold mb-2">📋 Modern Deed</div>
              <p className="text-white text-sm font-semibold mb-2">A Subsequent Transfer</p>
              <p className="text-gray-300 text-sm leading-relaxed">
                Transfers title <span className="text-white">from one private owner to another</span>.
                It <span className="text-white">passes along</span> ownership that already exists.
              </p>
            </div>
          </div>
          <p className="text-gray-300 leading-relaxed">
            When you purchase property today, you receive a deed. That deed traces your ownership back through a chain —
            previous owner, to their predecessor, and so on — that ultimately leads either to an original land patent
            or to some other earlier grant (such as a state patent or a private conveyance from a prior occupant).
          </p>
          <p className="text-gray-300 leading-relaxed mt-4">
            Most modern properties do trace back to an original patent, but the patent itself is rarely an active legal document
            in modern transactions. It is a historical record — important for research, but not something that governs how the
            land can be used or who has authority over it today.
          </p>
        </Section>

        {/* ── Section 5: Do Land Patents Still Exist? ─────────────── */}
        <Section title="Do Land Patents Still Exist? Can You Get One?">
          <p className="text-gray-300 leading-relaxed mb-5">
            <span className="text-white font-semibold">No.</span> The federal government no longer issues land patents.
            Virtually all land in the United States has been patented at least once.
            The few remaining federal lands — national parks, forests, BLM land, military installations — are held in federal ownership
            and are not available for patenting.
          </p>
          <p className="text-gray-300 leading-relaxed mb-6">
            The BLM continues to maintain records of all patents issued, which are available through the{' '}
            <span className="text-white">LR2000 database</span> (a public online search tool) and through county recorder offices,
            which received copies of all patents issued for land within their jurisdictions.
          </p>

          {/* ⚠️ Fringe Claims Warning */}
          <div className="bg-red-950/30 border border-red-800/40 rounded-xl p-5 mb-4">
            <div className="flex items-start gap-3">
              <span className="text-red-400 text-lg mt-0.5 shrink-0">⚠️</span>
              <div>
                <p className="text-white font-bold mb-2">A Note on Unusual Legal Claims</p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  You may encounter people who argue that filing a land patent — or pointing to an original patent — grants
                  special legal rights, immunity from zoning, freedom from property taxes, or sovereignty from government regulation.
                  <span className="text-red-300 font-semibold"> Courts have consistently rejected these arguments</span>.
                  They are sometimes called &ldquo;land patent fraud&rdquo; or &ldquo;sovereign citizen&rdquo; legal theories,
                  and they do not hold up in any U.S. court. Rely on a licensed attorney, not internet theories,
                  for any real property legal question.
                </p>
              </div>
            </div>
          </div>
          <p className="text-gray-400 text-sm">
            We raise this not to alarm, but to be clear: understanding land patents is valuable for history and research.
            It is <span className="text-white">not</span> a tool for avoiding legal obligations.
          </p>
        </Section>

        {/* ── Section 6: What Land Patent Records Are Useful For ──── */}
        <Section title="What Land Patent Records Are Useful For">
          <p className="text-gray-300 leading-relaxed mb-5">
            Land patent records serve several legitimate and valuable purposes:
          </p>
          <ul className="text-gray-300 space-y-3 mb-6">
            {[
              {
                title: 'Parcel History Research',
                desc: 'Understanding when land was first granted, who received it, and under what program gives context modern deeds simply cannot provide.',
              },
              {
                title: 'Chain of Title Research',
                desc: 'Tracing the full ownership history of a property. A break or cloud in the chain often traces back to a missing or defective patent-era document.',
              },
              {
                title: 'Genealogy',
                desc: 'Patent records name the original grantees and often include biographical details — military service, residence, occupation — that are invaluable for family history research.',
              },
              {
                title: 'Boundary and Survey Disputes',
                desc: 'The original patent description (often using the PLSS section-township-range system) can help resolve modern boundary questions.',
              },
            ].map(({ title, desc }) => (
              <li key={title} className="flex items-start gap-3">
                <span className="text-emerald-400 mt-0.5 shrink-0">→</span>
                <div>
                  <span className="text-white font-semibold">{title}:</span>{' '}
                  <span className="text-gray-300">{desc}</span>
                </div>
              </li>
            ))}
          </ul>
          <h3 className="text-white font-bold mb-3">Where to Find Land Patent Records</h3>
          <ul className="text-gray-300 space-y-2">
            <li className="flex items-start gap-3">
              <span className="text-cyan-400 shrink-0">1.</span>
              <span>
                <span className="text-white font-medium">BLM LR2000 Database</span> —{' '}
                <span className="text-gray-400">
                  blm.gov LR2000 allows you to search all federal land patents by state, county, township, range, and meridian.
                  Free public access.
                </span>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-400 shrink-0">2.</span>
              <span>
                <span className="text-white font-medium">County Recorder Office</span> —{' '}
                <span className="text-gray-400">
                  Every county recorder holds copies of all patents issued for land within that county.
                  These are typically searchable by grantor/grantee name or by parcel description.
                </span>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-400 shrink-0">3.</span>
              <span>
                <span className="text-white font-medium">State Archives &amp; Historical Societies</span> —{' '}
                <span className="text-gray-400">
                  Many states have digitized patent records, particularly for homestead entries.
                  A local historical society can often help with context and interpretation.
                </span>
              </span>
            </li>
          </ul>
        </Section>

        {/* ── Section 7: Common Misconceptions ────────────────────── */}
        <Section title="Common Misconceptions">
          <p className="text-gray-300 leading-relaxed mb-6">
            Land patents generate more than their share of confusion. Here is what is accurate and what is not:
          </p>

          <div className="space-y-4">
            {[
              {
                myth: '&ldquo;A land patent means my land is free from government regulation.&rdquo;',
                fact: 'This is not true. All land in the United States — regardless of how it was originally patented — is subject to local zoning ordinances, building codes, environmental regulations, property taxes, and the government&rsquo;s power of eminent domain. The Homestead Act did not create a special class of unregulated land. Neither did any other patent program.',
                severity: 'high',
              },
              {
                myth: '&ldquo;I can file a land patent and claim sovereign immunity from courts or government authority.&rdquo;',
                fact: 'Courts have consistently rejected this. The &ldquo;land patent&rdquo; sovereign immunity theory has been examined and rejected in federal and state courts across the country. It is sometimes grouped with &ldquo;sovereign citizen&rdquo; legal theories, which have no recognized basis in U.S. law. Do not rely on these arguments in any legal proceeding.',
                severity: 'high',
              },
              {
                myth: '&ldquo;Original land patents give me better or cleaner title than modern deeds.&rdquo;',
                fact: 'Not necessarily. A land patent is simply the starting point of a chain of title. If that chain has breaks, forgeries, missing deeds, or adverse possession claims downstream, the patent alone does not fix them. Modern deeds — and a current title insurance policy — matter more in any real transaction.',
                severity: 'medium',
              },
              {
                myth: '&ldquo;If I find my land&rsquo;s original patent, I own it free and clear.&rdquo;',
                fact: 'Finding an original patent is a historical record, not a legal status. Any liens, mortgages, easements, encumbrances, or tax obligations recorded after the patent was issued are not erased by the patent itself. Title insurance and a proper title search are the tools that actually establish current ownership.',
                severity: 'medium',
              },
            ].map(({ myth, fact, severity }) => (
              <div
                key={myth}
                className={`border rounded-xl p-5 ${
                  severity === 'high'
                    ? 'bg-red-950/20 border-red-800/40'
                    : 'bg-amber-950/20 border-amber-800/40'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-red-400 text-lg shrink-0">✗</span>
                  <div>
                    <p className="text-white font-bold mb-3 text-sm uppercase tracking-wide">Myth</p>
                    <p
                      className="text-gray-200 leading-relaxed mb-4"
                      dangerouslySetInnerHTML={{ __html: myth }}
                    />
                    <div className="border-t border-gray-700/50 pt-3">
                      <p className="text-emerald-300 font-bold mb-2 text-sm uppercase tracking-wide">Fact</p>
                      <p className="text-gray-300 leading-relaxed text-sm">{fact}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Section 8: Honest Value of Land Patent Knowledge ─── */}
        <Section title="The Honest Value of Land Patent Knowledge">
          <p className="text-gray-300 leading-relaxed mb-5">
            Understanding land patents is genuinely valuable — just not for the reasons some fringe theories claim.
            Here is where the knowledge actually pays off:
          </p>

          <div className="space-y-4 mb-6">
            {[
              {
                icon: '📖',
                title: 'Historical Understanding',
                desc: 'Land patents are a fascinating window into American expansion. Reading a homestead patent from 1877 — naming a Civil War veteran, describing 160 acres in a township in Kansas — connects you to a real person and a real chapter of American history in a way no modern deed can.',
              },
              {
                icon: '🧬',
                title: 'Genealogy',
                desc: 'Patent records often name the original grantee and include details about military service, family size, or prior residence. Land entry files (the paperwork behind the patent) may include census-type information. For family historians, these are rich primary sources.',
              },
              {
                icon: '⚖️',
                title: 'Legal Research',
                desc: 'In title disputes, the patent and the early chain of title are often the key documents. A cloud on title that dates back to the 1890s still needs to be resolved today. Understanding how to read patent-era records is a legitimate professional skill for title researchers and real estate attorneys.',
              },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <span className="text-2xl shrink-0">{icon}</span>
                  <div>
                    <p className="text-white font-bold mb-1">{title}</p>
                    <p className="text-gray-300 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-5">
            <p className="text-white font-bold mb-2">What Land Patent Knowledge Is NOT For</p>
            <p className="text-gray-300 text-sm leading-relaxed">
              Land patents are <span className="text-white">not</span> a tool for making legal claims against modern governments,
              avoiding property tax obligations, asserting sovereign rights, or disputing valid zoning or regulatory authority.
              These uses are not supported by law, and relying on them can result in fines, foreclosure, or criminal charges.
              If you have a real property legal question, consult a licensed attorney in your state.
            </p>
          </div>
        </Section>

        {/* ── Key Takeaways ──────────────────────────────────────── */}
        <div className="bg-emerald-950/20 border border-emerald-800/30 rounded-xl p-6 mt-10">
          <h3 className="text-emerald-300 font-bold text-lg mb-4">Key Takeaways</h3>
          <ul className="space-y-2">
            {[
              'A land patent is the original grant of land from the sovereign (usually the federal government) to a private party.',
              'Most U.S. land patents were issued between the 1780s and early 1900s. The federal government no longer issues them.',
              'The patent is the &ldquo;birth certificate&rdquo; of a parcel. Subsequent ownership is documented through deeds.',
              'Patents are valuable historical documents for research, genealogy, and legal title work.',
              'Patent records are available through the BLM LR2000 database and county recorder offices.',
              'Be skeptical of anyone claiming a patent grants special legal rights — courts have consistently rejected these arguments.',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-200 text-sm">
                <span className="text-emerald-400 shrink-0 mt-0.5">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── CTA ───────────────────────────────────────────────── */}
        <div className="mt-10 bg-amber-950/20 border border-amber-800/30 rounded-xl p-6 text-center">
          <p className="text-amber-200 text-lg font-semibold mb-2">
            Want to understand your land&rsquo;s history?
          </p>
          <p className="text-gray-300 text-sm mb-5 leading-relaxed">
            The next module walks through how to actually find and read your property&rsquo;s patent record
            and trace the chain of title from the original grant to the present day.
          </p>
          <Link
            href="/learn/land-patent-history"
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-lg transition"
          >
            Explore Your Land&rsquo;s Patent History →
          </Link>
        </div>

        {/* ── Next Modules ────────────────────────────────────────── */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <h3 className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-5">Continue Learning</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                href: '/learn/land-patent-history',
                icon: '🔍',
                title: 'Researching a Land Patent',
                desc: 'Step-by-step guide to finding your property&rsquo;s patent record using the BLM database and county records.',
                color: 'amber',
              },
              {
                href: '/learn/title-deed-tax-sale-land-patent',
                icon: '⛓️',
                title: 'Title vs. Deed vs. Chain of Title',
                desc: 'What title actually means, how deeds work, and why the chain of ownership matters more than any single document.',
                color: 'cyan',
              },
            ].map(({ href, icon, title, desc, color }) => (
              <Link
                key={href}
                href={href}
                className={`bg-gray-900/60 border border-gray-800 rounded-xl p-5 hover:border-gray-600 transition group`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl shrink-0">{icon}</span>
                  <div>
                    <p className="text-white font-bold mb-1 group-hover:text-emerald-300 transition-colors">{title}</p>
                    <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
                <div className="mt-3 text-sm text-emerald-400 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read next →
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <footer className="border-t border-gray-800 py-6 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-600 text-xs">
            National Land Data System™ — A Porterful Labs Product
          </p>
          <p className="text-gray-700 text-xs mt-1">
            Educational content only · Not legal or financial advice · Consult a licensed professional before any property decision
          </p>
        </div>
      </footer>
    </main>
  )
}

// ── Section Component ────────────────────────────────────────────────────────
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10 first:mt-0">
      <div className="border-b border-gray-800 pb-3 mb-6">
        <h2 className="text-xl font-black text-white">{title}</h2>
      </div>
      {children}
    </section>
  )
}
