import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'How to Research a Parcel — NLDS Learn',
  description:
    'A practical, step-by-step guide to researching any parcel of land — from the county assessor to the recorder of deeds to a physical inspection.',
};

export default function HowToResearchAParcelPage() {
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
          Learn Center &rsaquo; Research Guide
        </div>

        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-amber-950 border border-amber-800 rounded-full px-4 py-1.5 mb-5">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">Intermediate</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
            How to Research a Parcel
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
            A practical, step-by-step guide to investigating any piece of land before you buy it. Research takes time, but it is far less expensive than a bad land deal.
          </p>
          <div className="flex items-center gap-4 mt-5 text-gray-600 text-xs">
            <span>10 min read</span>
            <span>·</span>
            <span>Practical Guide</span>
            <span>·</span>
            <span>Updated April 2026</span>
          </div>
        </div>

        {/* Intro */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 mb-12">
          <div className="text-white font-bold text-sm mb-2">How to use this guide</div>
          <p className="text-gray-400 text-sm leading-relaxed">
            These nine steps are ordered roughly from easiest and most accessible (online records) to most involved (physical inspection, survey). You do not need to complete every step for every property — calibrate to the type of transaction, the price, and what you discover as you go. Steps 1, 2, 3, and 5 are the minimum for any land purchase.
          </p>
        </div>

        {/* Step 1 */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-white mb-5 flex items-center gap-3">
            <span className="text-emerald-400 text-lg font-bold">Step 1</span>
            Start with the Address and Parcel Number
          </h2>
          <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6">
            <p className="text-gray-300 leading-relaxed mb-4">
              Every piece of land in a county has a unique identifier called a <strong className="text-white">parcel number</strong> (also called a tax ID, parcel ID, or property identification number). This is assigned by the county assessor and is the key that unlocks every other record about the property.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              Start by searching the county assessor&rsquo;s website with the street address. Most county assessors have an online property search tool — just enter the address and you will typically get the parcel number, current owner, assessed value, tax status, and sometimes a link to a property map or GIS view.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Record the parcel number. Everything else in this guide starts with that number. If the property is rural and has no street address, you can often search by the owner&rsquo;s name or by the legal description from the deed.
            </p>
          </div>
        </section>

        {/* Step 2 */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-white mb-5 flex items-center gap-3">
            <span className="text-emerald-400 text-lg font-bold">Step 2</span>
            Get the Deed Records
          </h2>
          <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6">
            <p className="text-gray-300 leading-relaxed mb-4">
              Go to the <strong className="text-white">County Recorder of Deeds</strong> (sometimes called the Recorder&rsquo;s Office or Register of Deeds). This is where every conveyance of land in the county is recorded — deeds, mortgages, liens, easements, plat maps.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              Search by parcel number or owner name and pull the recorded deeds going back as far as you can — ideally 40 to 60 years. This gives you the chain of title: the documented history of every owner.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              As you read through the deeds, note:
            </p>
            <div className="space-y-2 mb-4">
              {[
                { tag: '⚠ Quitclaim deeds', desc: 'Potential title issues — investigate why the grantor used a quitclaim instead of a warranty deed.' },
                { tag: '⏱ Transfers to relatives', desc: 'Possible estate planning or family settlements. May indicate the original owner passed away without a formal probate.' },
                { tag: '🏛 Sheriff\'s deeds or tax deeds', desc: 'Indicates the property went through a court sale or tax sale. These often mean title was broken at some point.' },
                { tag: '📋 Transfers to deceased persons', desc: 'A red flag — if the recorded owner is deceased, the transfer to the current owner may have skipped proper probate.' },
              ].map(({ tag, desc }) => (
                <div key={tag} className="flex gap-3 items-start">
                  <span className="text-gray-500 text-sm flex-shrink-0">{tag}</span>
                  <span className="text-gray-400 text-sm">{desc}</span>
                </div>
              ))}
            </div>
            <p className="text-gray-300 leading-relaxed">
              Most county recorders have an online search system. Some require a small fee per document. In St. Louis, Missouri, the St. Louis County Recorder and the St. Louis City Assessor both maintain online portals.
            </p>
          </div>
        </section>

        {/* Step 3 */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-white mb-5 flex items-center gap-3">
            <span className="text-emerald-400 text-lg font-bold">Step 3</span>
            Check Tax Records
          </h2>
          <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6">
            <p className="text-gray-300 leading-relaxed mb-4">
              The <strong className="text-white">County Treasurer</strong> or <strong className="text-white">County Assessor</strong> maintains the tax record for every parcel. This tells you whether property taxes are current, whether there are any delinquent taxes, and what the annual tax bill is.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              Look specifically for:
            </p>
            <div className="space-y-3 mb-4">
              {[
                'Current tax status: are taxes paid and current?',
                'Delinquent taxes: if taxes are past due, the county may have already sold the tax lien or be preparing to.',
                'Special assessments: some counties show these separately from the annual tax amount.',
                'Tax sale history: has the property been sold at a tax sale before? This is a red flag for title problems.',
                'Exemptions: agricultural, homestead, or other exemptions that reduce the tax bill — and what happens to those exemptions when the property transfers.',
              ].map((item) => (
                <div key={item} className="flex gap-3 items-start">
                  <span className="text-emerald-400 flex-shrink-0">—</span>
                  <p className="text-gray-300 text-sm">{item}</p>
                </div>
              ))}
            </div>
            <p className="text-gray-300 leading-relaxed">
              In Missouri, both St. Louis City and St. Louis County have online property records. Many other counties do as well. If online records are not available, visit or call the county treasurer&rsquo;s office.
            </p>
          </div>
        </section>

        {/* Step 4 */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-white mb-5 flex items-center gap-3">
            <span className="text-emerald-400 text-lg font-bold">Step 4</span>
            Check for Liens
          </h2>
          <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6">
            <p className="text-gray-300 leading-relaxed mb-4">
              Liens are legal claims against a property that must be paid off when it sells. Even if the current owner tells you there are no liens, verify it yourself.
            </p>
            <div className="space-y-4 mb-4">
              <div>
                <div className="text-white font-bold text-sm mb-2">County Recorder</div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Mechanic&rsquo;s liens (from contractors who worked on the property and were not paid), judgment liens (from court judgments), and mortgage liens are all recorded in the county land records. Search by owner name or parcel number.
                </p>
              </div>
              <div>
                <div className="text-white font-bold text-sm mb-2">IRS and Federal Liens</div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  IRS tax liens are filed with the county recorder but also appear in federal court records. Search the local county plus the federal court PACER system (Public Access to Court Electronic Records) for tax liens against the current owner. If the owner owes significant federal taxes, the IRS may have filed a lien that survives the property sale.
                </p>
              </div>
              <div>
                <div className="text-white font-bold text-sm mb-2">State Tax Liens</div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  State tax liens (from state income taxes, business taxes) are typically filed with the county recorder and may also be maintained by the state Department of Revenue. In Missouri, check with the Missouri Department of Revenue.
                </p>
              </div>
              <div>
                <div className="text-white font-bold text-sm mb-2">UCC Filings</div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  If the property owner is a business, the business may have pledged the property (or equipment on it) as collateral for a loan, resulting in a UCC (Uniform Commercial Code) filing. UCC filings are typically searched through the Secretary of State where the business is registered.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Step 5 */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-white mb-5 flex items-center gap-3">
            <span className="text-emerald-400 text-lg font-bold">Step 5</span>
            Understand Zoning and Land Use
          </h2>
          <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6">
            <p className="text-gray-300 leading-relaxed mb-4">
              Contact the <strong className="text-white">County or City Planning and Zoning Department</strong>. They can tell you:
            </p>
            <div className="space-y-3 mb-4">
              {[
                'What the current zoning is (residential, agricultural, commercial, industrial)',
                'What uses are permitted by right under that zoning',
                'What uses require a special use permit or conditional use approval',
                'What the minimum lot size requirements are',
                'What the setback requirements are from front, side, and rear property lines',
                'Whether any overlay districts apply (floodplain, historic, conservation, airport height restrictions)',
              ].map((item) => (
                <div key={item} className="flex gap-3 items-start">
                  <span className="text-emerald-400 flex-shrink-0">—</span>
                  <p className="text-gray-300 text-sm">{item}</p>
                </div>
              ))}
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              Also check whether the property is in a recorded subdivision with <strong className="text-white">covenants, conditions, and restrictions (CC&Rs)</strong>. These are private deed restrictions that are more restrictive than zoning and are enforced by a homeowners association, not the government. They are recorded in the county land records and are binding on all subsequent owners.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Review the local government&rsquo;s <strong className="text-white">comprehensive plan</strong> (also called a master plan or land use plan). This document guides future development and rezoning decisions. A property that is currently zoned residential may be in an area designated for future commercial or high-density residential development.
            </p>
          </div>
        </section>

        {/* Step 6 */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-white mb-5 flex items-center gap-3">
            <span className="text-emerald-400 text-lg font-bold">Step 6</span>
            Check for Easements and Encroachments
          </h2>
          <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6">
            <p className="text-gray-300 leading-relaxed mb-4">
              Easements are recorded legal rights for someone else to use a portion of your property. They survive the sale — the new owner inherits them. They are one of the most commonly overlooked risks in land purchases.
            </p>
            <div className="space-y-4 mb-4">
              <div>
                <div className="text-white font-bold text-sm mb-2">Utility easements</div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Most utility easements are shown on the face of the deed or on the recorded plat map for the subdivision. A utility easement across the middle of a lot may make that section of the lot effectively unusable for building. Confirm the location and width of any utility easements before purchasing.
                </p>
              </div>
              <div>
                <div className="text-white font-bold text-sm mb-2">Access easements and rights-of-way</div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  If the property is landlocked or accessed via a neighbor&rsquo;s property, there is almost certainly an access easement or right-of-way in the chain of title. Confirm its location, width, and whether it is exclusive or shared.
                </p>
              </div>
              <div>
                <div className="text-white font-bold text-sm mb-2">Conservation easements</div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  A conservation easement held by a land trust or government agency permanently restricts development and use of the land. These are recorded and binding on all future owners. Confirm whether any conservation easement affects the parcel.
                </p>
              </div>
              <div>
                <div className="text-white font-bold text-sm mb-2">Physical encroachments</div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  An encroachment is a physical object — a fence, driveway, shed, tree line — that crosses onto the property from outside. Encroachments are not always recorded in documents; they are identified by a physical survey (Step 9). If a neighbor has been using a portion of your land for decades, they may have a legal claim to it through adverse possession.
                </p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              If the property is adjacent to a state or federal highway, contact the relevant Department of Transportation — DOT projects, access management plans, and planned improvements can significantly affect property access and value.
            </p>
          </div>
        </section>

        {/* Step 7 */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-white mb-5 flex items-center gap-3">
            <span className="text-emerald-400 text-lg font-bold">Step 7</span>
            Do a Physical Inspection
          </h2>
          <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6">
            <p className="text-gray-300 leading-relaxed mb-4">
              Nothing replaces actually going to the property and looking at it with your own eyes. A physical inspection reveals things that no document search will.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              When you visit, look for:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
              {[
                { label: 'Structures', desc: 'Any buildings, barns, mobile homes, or sheds on the property — confirmed or abandoned.' },
                { label: 'Signs of occupation', desc: 'Is someone living there? Look for vehicles, utilities connected, maintained yards.' },
                { label: 'Neighbor fences on your line', desc: 'Fence lines are a common source of boundary disputes. Note where fences are relative to what you expect the line to be.' },
                { label: 'Drainage patterns', desc: 'Where does water flow during and after rain? Low-lying areas may flood or be wetlands.' },
                { label: 'Access to the property', desc: 'Is there a road or driveway? Who owns it? Is it a public road or a private easement?' },
                { label: 'Condition of adjacent properties', desc: 'Are neighboring properties well-maintained, neglected, or used for something that might affect yours?' },
                { label: 'Obvious environmental issues', desc: 'Dumping, stained soil, old tanks, dead vegetation in a pattern that might indicate contamination.' },
                { label: 'Neighborhood character', desc: 'Visit at different times of day. Is the area improving or declining?' },
              ].map(({ label, desc }) => (
                <div key={label} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                  <div className="text-white font-bold text-xs mb-1">{label}</div>
                  <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
            <p className="text-gray-300 leading-relaxed">
              Bring the plat map or legal description with you if you have it. Walk the perimeter if possible. Pay attention to how the land feels, where the high and low points are, and whether there are any obvious signs of recent activity or long-term abandonment.
            </p>
          </div>
        </section>

        {/* Step 8 */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-white mb-5 flex items-center gap-3">
            <span className="text-emerald-400 text-lg font-bold">Step 8</span>
            Order a Title Search
          </h2>
          <div className="bg-amber-950 border border-amber-900 rounded-2xl p-6 mb-5">
            <div className="text-amber-300 text-xs font-bold uppercase tracking-widest mb-3">Recommended for all land purchases</div>
            <p className="text-gray-300 text-sm leading-relaxed">
              A title search by a licensed title company or real estate attorney is the professional version of the deed research you can do yourself — more thorough, covering a longer timeframe, and using trained eyes to spot issues a layperson would miss.
            </p>
          </div>
          <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6">
            <p className="text-gray-300 leading-relaxed mb-4">
              A title search results in a <strong className="text-white">title commitment</strong> — a document that identifies all the issues the title company has found in the chain of title and all the items that will be excluded from coverage in any title insurance policy they issue.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              The title commitment is a negotiation document. The &ldquo;Schedule B&rdquo; exceptions list all the liens, easements, and other encumbrances the title company knows about. If you see something on Schedule B that is wrong or that you want removed (e.g., an old lien that should have been released), you can often negotiate with the seller to clear it before closing.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Title insurance — purchased at closing — protects you against losses from title defects that were not discovered in the search. It is a one-time premium and is strongly recommended for any land purchase where you are investing significant money.
            </p>
          </div>
        </section>

        {/* Step 9 */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-white mb-5 flex items-center gap-3">
            <span className="text-emerald-400 text-lg font-bold">Step 9</span>
            Get a Survey
          </h2>
          <div className="bg-amber-950 border border-amber-900 rounded-2xl p-6 mb-5">
            <div className="text-amber-300 text-xs font-bold uppercase tracking-widest mb-3">Recommended for raw land</div>
            <p className="text-gray-300 text-sm leading-relaxed">
              A property survey is a physical measurement of the land by a licensed land surveyor. The surveyor visits the property, locates the iron pins or monuments at each corner, measures the boundaries, and produces a plat map showing exactly where the property lines are.
            </p>
          </div>
          <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6">
            <p className="text-gray-300 leading-relaxed mb-4">
              A survey reveals several things that a title search cannot:
            </p>
            <div className="space-y-2 mb-4">
              {[
                'Physical encroachments — a neighbor\'s fence or structure that crosses the property line',
                'Whether the seller\'s understanding of the boundaries matches the legal description',
                'Access issues — whether the property actually touches a road or is entirely dependent on an easement',
                'Acreage discrepancies — the recorded acreage and the surveyed acreage sometimes differ',
              ].map((item) => (
                <div key={item} className="flex gap-3 items-start">
                  <span className="text-emerald-400 flex-shrink-0">—</span>
                  <p className="text-gray-300 text-sm">{item}</p>
                </div>
              ))}
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              Survey costs vary by location and parcel size. A survey for a small residential lot may cost $300–$600. A rural parcel of 20+ acres in a remote area may cost $1,000–$1,500 or more. The cost is almost always worth it for raw land, where boundary uncertainties are common.
            </p>
            <p className="text-gray-300 leading-relaxed">
              If the seller already has a survey (often the case if the property was recently purchased or is in a subdivision), ask for a copy. A survey is only as good as the iron pins in the ground — if the original survey pins are missing, a new survey will need to establish new monuments.
            </p>
          </div>
        </section>

        {/* Resources */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-white mb-5">Resources</h2>
          <div className="bg-gray-950 border border-gray-800 rounded-2xl overflow-hidden mb-5">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left text-gray-400 font-medium px-5 py-4 text-xs uppercase tracking-wider">Resource</th>
                  <th className="text-left text-gray-400 font-medium px-5 py-4 text-xs uppercase tracking-wider">What it does</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {[
                  {
                    name: 'BLM Land Patent Database (LR2000)',
                    href: 'https://www.blm.gov/services/land-records/patents',
                    desc: 'Search the official federal land patent records going back to 1785. Confirm the original grant for any parcel that was once part of the public domain.',
                  },
                  {
                    name: 'St. Louis City Assessor (ArchCity Portal)',
                    href: 'https://www.stlouis-mo.gov/government/departments/assessor/',
                    desc: 'St. Louis City property records — parcel lookup, assessed values, tax status, ownership history.',
                  },
                  {
                    name: 'St. Louis County Assessor',
                    href: 'https://www.stlouiscountymo.gov/st-louis-county-departments/assessor/',
                    desc: 'St. Louis County property records — search by address, owner name, or parcel ID.',
                  },
                  {
                    name: 'St. Louis County GIS Mapping',
                    href: 'https://www.stlouiscountymo.gov/st-louis-county-departments/transportation-highways/gis-maps/',
                    desc: 'Interactive GIS maps showing parcels, zoning, floodplains, and aerial imagery for St. Louis County.',
                  },
                  {
                    name: 'Missouri County Assessors Directory',
                    href: 'https://www.sos.mo.gov/assessor/',
                    desc: 'Directory of all Missouri county assessor websites and contact information.',
                  },
                  {
                    name: 'FEMA Flood Map Service Center',
                    href: 'https://msc.fema.gov',
                    desc: 'Look up any property\'s flood zone designation by address or parcel number.',
                  },
                  {
                    name: 'Missouri Secretary of State — UCC Search',
                    href: 'https://www.sos.mo.gov/business/uccsearch',
                    desc: 'Search for UCC (Uniform Commercial Code) filings — business liens that may affect commercial properties.',
                  },
                  {
                    name: 'Missouri DOR — Tax Lien Search',
                    href: 'https://dor.mo.gov',
                    desc: 'Missouri Department of Revenue — search for state tax liens against individuals or businesses.',
                  },
                ].map(({ name, href, desc }) => (
                  <tr key={name}>
                    <td className="px-5 py-4">
                      <a href={href} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 text-xs font-medium">
                        {name} →
                      </a>
                    </td>
                    <td className="px-5 py-4 text-gray-400 text-xs leading-relaxed">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-gray-600 text-xs">
            Not all Missouri counties have robust online record systems. For counties without online access, visit or call the county recorder and assessor offices in person. Most will provide information by phone.
          </p>
        </section>

        {/* Disclaimer */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 mb-12">
          <div className="text-white font-bold text-sm mb-2">A note on legal advice</div>
          <p className="text-gray-500 text-xs leading-relaxed">
            This guide is for educational purposes only. It is not legal or professional advice. Research requirements vary by location, property type, and transaction structure. A licensed title professional or real estate attorney can advise on which steps are most critical for your specific situation.
          </p>
        </div>

        {/* Next Modules */}
        <div className="border-t border-gray-800 pt-10 mb-10">
          <div className="text-gray-500 text-xs uppercase tracking-widest mb-6">Continue Learning</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <Link
              href="/learn/land-as-ownership-legacy"
              className="bg-gray-950 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-colors group"
            >
              <div className="text-gray-600 text-xs mb-2">Next Module</div>
              <div className="text-white font-bold text-sm mb-1 group-hover:text-emerald-400 transition-colors">
                Land as Ownership & Legacy
              </div>
              <div className="text-gray-500 text-xs">The long-term case for owning land →</div>
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
