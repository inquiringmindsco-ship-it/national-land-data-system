import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Land Risks Every Buyer Should Know — National Land Data System',
  description:
    'A practical guide to the risks involved in land purchasing — title risks, environmental hazards, zoning issues, financial considerations, and more.',
}

export default function LandRisksPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/learn" className="text-gray-400 hover:text-white text-sm flex items-center gap-1 mb-1">← Learn Center</Link>
          <h1 className="text-2xl font-bold">Land Risks Every Buyer Should Know</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 text-sm text-gray-400 mb-8">
          <span className="px-2 py-0.5 bg-gray-800 rounded-full text-xs">Risk & Research</span>
          <span>9 min read</span>
          <span>All Levels</span>
        </div>

        <div className="bg-red-950/30 border border-red-800/40 rounded-2xl p-8 mb-8">
          <h2 className="text-xl font-bold text-red-300 mb-4">The Short Version</h2>
          <p className="text-gray-300 leading-relaxed">
            Land deals — especially government land deals — can offer extraordinary value. They also come with
            real risks that are different from buying a house. Title defects, zoning surprises, environmental
            contamination, unknown occupants, and liens can turn a great deal into a costly problem.
            This module walks through every major risk category and what to do about each one.
          </p>
        </div>

        <Section title="1. Title Risks">
          <p className="mb-4">Title risk is the risk that the property doesn't actually belong to who you think it does — or that someone else has a legal claim against it.</p>
          <ul className="list-none space-y-3">
            {[
              { label: 'Chain of title gaps', desc: 'Historical deed records may have gaps, forgeries, errors in names, or unrecorded transfers. These can cloud ownership.' },
              { label: 'Undiscovered liens', desc: 'Unpaid mortgages, IRS tax liens, mechanic\'s liens from contractors, HOA assessment liens — any of these can survive a sale and become your problem.' },
              { label: 'Heirs and unknown owners', desc: 'In some states, unknown heirs of a deceased owner can come forward years later claiming inheritance rights to the property.' },
              { label: 'Adverse possession', desc: 'In some states, someone who openly occupies land for a statutory period (often 5-21 years) can claim legal ownership. This is especially relevant for rural land.' },
              { label: 'Fraud', desc: 'Seller impersonation fraud, forged deeds, and straw buyer schemes do happen. Using a title company reduces this risk.' },
            ].map(({ label, desc }) => (
              <li key={label} className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
                <span className="font-semibold text-white">{label}:</span>
                <p className="text-gray-400 text-sm mt-1">{desc}</p>
              </li>
            ))}
          </ul>
          <div className="bg-emerald-950/30 border border-emerald-800/40 rounded-lg p-4 mt-4">
            <span className="text-emerald-400 font-bold">→ How to protect yourself: </span>
            <span className="text-gray-300 text-sm">Order a title search before closing. Buy title insurance if the title company will insure the property. Research the chain of title yourself using county recorder records.</span>
          </div>
        </Section>

        <Section title="2. Physical & Environmental Risks">
          <ul className="list-none space-y-3">
            {[
              { label: 'Soil contamination', desc: 'Prior industrial use, dry cleaners, gas stations, and farms can leave heavy metals, solvents, or petroleum products in the soil. A Phase I Environmental Site Assessment identifies these risks.' },
              { label: 'Flood zone designation', desc: 'FEMA flood maps determine flood insurance requirements. Properties in Special Flood Hazard Areas (SFHAs) require mandatory flood insurance, which can cost thousands per year.' },
              { label: 'Wetlands', desc: 'The Army Corps of Engineers can restrict or prohibit development in wetlands. A wetlands delineation may be required before building permits are issued.' },
              { label: 'Underground storage tanks', desc: 'Old heating oil tanks or buried chemical tanks can cost $20,000-$50,000 to remediate. Common on old gas stations, industrial sites, and farms.' },
              { label: 'Asbestos and lead paint', desc: 'Any structure built before 1978 may contain asbestos or lead-based paint. Demolition or renovation costs increase significantly.' },
              { label: 'Buried debris', desc: 'Some properties sold cheaply have been used as dump sites over the years. Look for uneven ground, odd fills, or suspicious materials during physical inspection.' },
            ].map(({ label, desc }) => (
              <li key={label} className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
                <span className="font-semibold text-white">{label}:</span>
                <p className="text-gray-400 text-sm mt-1">{desc}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="3. Zoning & Land Use Risks">
          <ul className="list-none space-y-3">
            {[
              { label: 'Zoning doesn\'t match your intended use', desc: 'Just because land is "residential" doesn\'t mean you can build anything. Setback requirements, lot coverage limits, and height restrictions all apply.' },
              { label: 'Adjacent rezoning', desc: 'A parcel next to yours can be rezoned in the future — a quiet residential street can become a commercial corridor.' },
              { label: 'Nonconforming uses', desc: 'A property with a pre-existing use that doesn\'t meet current zoning (a "grandfathered" use) loses that status if the use is abandoned for a period — often 12-24 months.' },
              { label: 'HOA and deed restrictions', desc: 'Private restrictions can be more limiting than zoning. Some subdivisions prohibit manufactured homes, limit building sizes, or require minimum construction standards.' },
              { label: 'Special districts', desc: 'Some areas have tax increment financing districts (TIFs), community development districts (CDDs), or special assessment districts that add significant annual costs.' },
            ].map(({ label, desc }) => (
              <li key={label} className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
                <span className="font-semibold text-white">{label}:</span>
                <p className="text-gray-400 text-sm mt-1">{desc}</p>
              </li>
            ))}
          </ul>
          <div className="bg-emerald-950/30 border border-emerald-800/40 rounded-lg p-4 mt-4">
            <span className="text-emerald-400 font-bold">→ How to protect yourself: </span>
            <span className="text-gray-300 text-sm">Call the county or city planning department. Ask for the zoning, any overlay districts, and any recent rezoning petitions in the area.</span>
          </div>
        </Section>

        <Section title="4. Encroachment Risks">
          <ul className="list-none space-y-3">
            {[
              { label: 'Neighbor fences and structures crossing the line', desc: 'Very common. A neighbor\'s fence may be 5 feet onto your property. If you don\'t address it, you risk losing that strip through adverse possession.' },
              { label: 'Your structures on neighbor\'s land', desc: 'Equally common — you may have built (or a prior owner built) something that technically sits on the neighbor\'s land.' },
              { label: 'Utility easements', desc: 'Power lines, gas lines, water mains, and sewer lines often run through properties. You can\'t build on these areas and may have to grant utility companies access.' },
              { label: 'Conservation easements', desc: 'Some land has permanent conservation easements held by land trusts or government agencies that prohibit or severely restrict development.' },
              { label: 'Drainage and water rights', desc: 'Water flowing across your land may give neighbors rights. In some states, easements for natural drainage are automatic — if you alter the land, you can cause flooding downstream.' },
            ].map(({ label, desc }) => (
              <li key={label} className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
                <span className="font-semibold text-white">{label}:</span>
                <p className="text-gray-400 text-sm mt-1">{desc}</p>
              </li>
            ))}
          </ul>
          <div className="bg-emerald-950/30 border border-emerald-800/40 rounded-lg p-4 mt-4">
            <span className="text-emerald-400 font-bold">→ How to protect yourself: </span>
            <span className="text-gray-300 text-sm">Order a survey by a licensed surveyor before or immediately after closing. A boundary survey costs $300-$1,500 depending on the property size.</span>
          </div>
        </Section>

        <Section title="5. Financial Risks">
          <ul className="list-none space-y-3">
            {[
              { label: 'Higher property taxes than expected', desc: 'Government-assessed values are often below market, but after purchase, the assessed value may be updated to reflect the purchase price — increasing your annual tax bill.' },
              { label: 'Special assessments', desc: 'Some counties tack on back taxes, demolition costs, weed mowing, or infrastructure charges that aren\'t captured in the initial price.' },
              { label: 'Land loan terms', desc: 'Unlike home mortgages, land loans typically have higher interest rates (8-12%), shorter terms (5-15 years), and require more money down (20-50%).' },
              { label: 'Holding costs', desc: 'While you own the land, you\'re paying property taxes, insurance, and possibly HOA fees — with no income from the property.' },
              { label: 'Carrying costs on a long-term hold', desc: 'If you hold raw land for 10 years before building, you may have paid $5,000-$15,000 in taxes and insurance — on top of the purchase price.' },
            ].map(({ label, desc }) => (
              <li key={label} className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
                <span className="font-semibold text-white">{label}:</span>
                <p className="text-gray-400 text-sm mt-1">{desc}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="6. Market & Liquidity Risks">
          <ul className="list-none space-y-2">
            {[
              'Land is less liquid than stocks or bonds — selling can take months or years',
              'Rural land in particular can have very thin markets with few active buyers',
              'Values in rural areas can remain flat for decades',
              'Commercial development nearby can hurt rural land values just as easily as it can help them',
              'Zoning changes on adjacent properties can shift neighborhood character significantly',
            ].map(item => (
              <li key={item} className="flex items-start gap-2 text-gray-300">
                <span className="text-amber-400 mt-0.5">!</span>
                {item}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="7. Government & Legal Risks">
          <ul className="list-none space-y-3">
            {[
              { label: 'Eminent domain', desc: 'Governments can take private land for public use (highways, utilities, public buildings) with compensation. This is rare for small residential parcels but does happen.' },
              { label: 'Squatters and holdover tenants', desc: 'If someone is living on or occupying the property when you buy it, evicting them can take 3-6 months through the court system in most states.' },
              { label: 'Forfeiture risk', desc: 'In very rare cases, property connected to criminal activity can be forfeited to the government even after a legitimate sale — though proper due diligence makes this essentially unheard of.' },
              { label: 'Building permit denials', desc: 'Even if zoning allows your intended use, specific site conditions (wetlands, access, slope) can cause building permits to be denied after purchase.' },
            ].map(({ label, desc }) => (
              <li key={label} className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
                <span className="font-semibold text-white">{label}:</span>
                <p className="text-gray-400 text-sm mt-1">{desc}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Due Diligence Checklist — Before You Buy">
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
            <p className="text-gray-400 mb-4 text-sm">Work through this checklist before committing to any land purchase:</p>
            <div className="grid md:grid-cols-2 gap-2">
              {[
                '□ Get the parcel number from county assessor',
                '□ Pull deed records for the full chain of title',
                '□ Check for outstanding liens at county recorder',
                '□ Pull tax records — confirm taxes are current',
                '□ Verify zoning with county/city planning',
                '□ Check FEMA flood zone designation',
                '□ Search for easements in deed records',
                '□ Order a title search (or do it yourself)',
                '□ Get a survey of the actual boundaries',
                '□ Visit the property in person',
                '□ Talk to neighbors about the area',
                '□ Check for code violations or demolitions',
                '□ Order a Phase I Environmental if suspected',
                '□ Understand local building permit requirements',
                '□ Calculate total holding costs (taxes + insurance)',
                '□ Confirm access — is there a legal road frontage?',
              ].map(item => (
                <li key={item} className="text-gray-300 text-sm">{item}</li>
              ))}
            </div>
          </div>
        </Section>

        <div className="mt-12 bg-emerald-950/30 border border-emerald-800/40 rounded-2xl p-8">
          <h3 className="text-xl font-bold mb-2">Research a Specific Property</h3>
          <p className="text-gray-400 text-sm mb-4">
            Our parcel research guide walks through each step above in detail — with Missouri-specific resources for St. Louis properties.
          </p>
          <Link href="/learn/how-to-research-a-parcel" className="inline-block px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-colors">
            Parcel Research Guide →
          </Link>
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-4">
          <Link href="/learn/what-is-a-sheriff-sale" className="bg-gray-900/50 border border-gray-800 rounded-xl p-5 hover:border-emerald-700/50 transition-colors group">
            <span className="text-xs text-gray-500">Previous</span>
            <h4 className="font-bold text-white group-hover:text-emerald-400 transition-colors mt-1">← What Is a Sheriff Sale?</h4>
          </Link>
          <Link href="/learn/how-to-research-a-parcel" className="bg-gray-900/50 border border-gray-800 rounded-xl p-5 hover:border-emerald-700/50 transition-colors group">
            <span className="text-xs text-gray-500">Next</span>
            <h4 className="font-bold text-white group-hover:text-emerald-400 transition-colors mt-1">How to Research a Parcel →</h4>
          </Link>
        </div>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold text-white mb-4 border-b border-gray-800 pb-2">{title}</h2>
      <div className="space-y-3 text-gray-300 leading-relaxed">{children}</div>
    </section>
  )
}
