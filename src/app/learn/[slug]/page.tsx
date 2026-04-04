'use client'

import Link from 'next/link'

// ─── ALL MODULES ─────────────────────────────────────────────────────────────
const MODULES: Record<string, {
  title: string; icon: string; category: string; estimatedRead: string;
  sections: { title: string; content: string }[];
  keyTakeaways: string[];
  relatedModules: string[];
}> = {

  // ═══════════════════════════════════════════════════════════════════════════
  // LAND PATENTS — FLAGSHIP EDUCATIONAL MODULE
  // ═══════════════════════════════════════════════════════════════════════════
  'land-patents': {
    title: 'Land Patents Explained',
    icon: '📜',
    category: 'How to Acquire',
    estimatedRead: '14 min read',
    sections: [
      {
        title: 'What a Land Patent Is',
        content: `A land patent — also called a land grant patent or government patent — is a legal document issued by a sovereign government (in the United States, historically the federal government) that transfers ownership of public land from the government to a private individual.

In plain terms: a land patent is the original deed. It is the document that says the government once owned this land, and now a specific person does.

The word "patent" in this context does not mean an invention patent. It comes from the Latin "patere," meaning "to lay open" or "to make public." A land patent was an open, public grant — a declaration that this parcel of land had been conveyed out of government ownership into private hands.

Today, when you purchase property through a conventional real estate transaction, you receive a deed (usually a warranty deed or quitclaim deed). Before that deed was the land patent — the original conveyance that started the chain of title from the government.`,
      },
      {
        title: 'How Land Patents Started in the United States',
        content: `When the United States was founded, roughly 80% of the land inside the current U.S. borders was owned by the federal government. This land was called the "public domain."

The government needed a way to transfer this land to settlers, farmers, veterans, and developers — to build the country and generate revenue. The land patent system was the mechanism.

Key historical milestones:

• 1785: The Land Ordinance of 1785 established the rectangular survey system and authorized the first public land sales. The first land patents were issued under this law.

• 1787: The Northwest Ordinance guaranteed that new territories would eventually become states, with their own land patents issued through federal channels.

• 1800s–1900s: As the country expanded westward, the Homestead Act (1862), Preemption Act (1841), Timber Culture Act (1873), and other laws allowed settlers to claim and patent public land — often for as little as $1.25 per acre after improvements.

• 1900s–present: The public domain land was largely exhausted. The patent system became dormant for most purposes.

Most land patents in the modern U.S. were issued between 1800 and 1920. After the public domain land was largely patented, the system became historical.`,
      },
      {
        title: 'What Land Patents Say vs. What They Don\'t Mean',
        content: `This is the most important section of this module, and it is why we want to be especially clear.

A land patent tells you one specific historical fact: at some point in the past, the federal government (or a state/local government acting with federal authorization) conveyed a specific parcel of land from public ownership to a named individual.

What a land patent IS:
• The original government grant in the chain of title
• A historical record of the first private conveyance of a specific parcel
• Evidence of how land left government ownership and entered private ownership
• A document that can be found in federal or state archives, county recorder offices, or the Bureau of Land Management records

What a land patent IS NOT:
• A guaranteed clear title — the original patent does not protect you from subsequent liens, encumbrances, or disputes that arose after it was issued
• A legal workaround to avoid property taxes, existing liens, or modern legal obligations
• A magical legal document that supersedes current law or current ownership records
• A guarantee that the person claiming land rights through a patent has any current legal interest in the property
• Evidence that a property currently owned by someone else can be claimed through an old patent

Some people online claim that land patents can be used to challenge modern property ownership, avoid tax obligations, or assert sovereign rights. These claims are not supported by mainstream legal precedent, have been repeatedly rejected by courts, and can expose the person making them to significant legal liability. NLDS presents land patent information purely as historical and educational content.`,
      },
      {
        title: 'Land Patent vs. Modern Deed vs. Title — What\'s the Difference?',
        content: `Understanding these three terms — and what each one does and does not do — is one of the most important foundational skills in land investing.

CHAIN OF TITLE:
Think of the ownership of a piece of land as a chain. Each link is a transfer of ownership. The chain starts with the original grant (usually a land patent) and continues through every subsequent sale, inheritance, gift, or other conveyance to the current owner. Each link is typically documented by a deed.

DEED:
A deed is the legal document used to transfer real property ownership between two private parties. The main types are:

• General Warranty Deed: The seller guarantees title against all defects, past and present. Strongest protection for the buyer.
• Special Warranty Deed: The seller guarantees title only against defects that occurred during their ownership.
• Quitclaim Deed: The seller conveys whatever interest they have — with no guarantees. Used in divorce settlements, family transfers, and some investor transactions.
• Sheriff's Deed / Tax Deed: Conveys property sold at a foreclosure or tax sale. Usually comes with encumbrances.

TITLE:
"Title" is the concept of ownership — the legal right to possess and control a property. You don't receive a physical "title" document. Title is established through the chain of deeds and the land patent at the base of that chain.

LAND PATENT:
The land patent sits at the foundation of the chain. It is the document that initiated private ownership of land that was originally government-owned. It does not, by itself, give anyone current ownership rights. It is a historical record of the first step in a long chain — not a current claim.`,
      },
      {
        title: 'Why People Still Research Land Patents Today',
        content: `If land patents are largely historical documents from 100-200 years ago, why would a modern land investor or researcher care about them?

TITLE RESEARCH AND CHAIN OF TITLE:
For any property that was originally part of the U.S. public domain — which includes most land west of the original 13 colonies — the land patent is the foundational document of the chain of title. To do a proper title search, you need to go back to the original patent. Title companies, attorneys, and lenders all require this.

UNDERSTANDING LAND HISTORY:
Knowing the land patent history helps you understand how a region was settled and developed. For researchers, genealogists, and historians, land patents are primary source documents about American expansion.

DISPUTES AND BOUNDARY ISSUES:
In some rural areas, boundary disputes trace back to how original land patents described property lines — especially before the rectangular survey system was fully implemented. Understanding the original patent can help clarify or resolve boundary questions.

FEDERAL LAND STATES:
In western states where a much larger percentage of land is still federally owned (Nevada, Utah, Arizona, etc.), understanding the land patent system helps explain why some parcels have complex patent histories. NLDS tracks patent context as part of its St. Louis parcel profiles — to give investors a complete historical picture.`,
      },
      {
        title: 'How to Research Land Patents',
        content: `If you want to find a land patent for a specific parcel, here is where to look:

BUREAU OF LAND MANAGEMENT (BLM):
The BLM manages the most comprehensive land patent database — the General Land Office Records (GLORE) system. You can search by state, county, township/range/section, or patent number:

bim.gov/land-records

COUNTY RECORDER / CLERK:
Every county has a land records office where deeds and copies of original land patents are filed. If a land patent was recorded locally, it will be in the county's direct records.

STATE ARCHIVES:
Many states have digitized their historical land patent records. Missouri's Secretary of State office has land record archives going back to the early 1800s.

TOWNSHIP, RANGE, SECTION (TRS):
To find a land patent, you need the legal description — the TRS number. In St. Louis, properties are described using the Public Land Survey System (PLSS). NLDS provides the PLSS coordinates for each parcel, which can help you cross-reference to federal patent records.

WHAT THE PATENT RECORD WILL SHOW:
• Patent number and date
• Name of the patentee (recipient of the original grant)
• Legal description (Township, Range, Section, and specific aliquot parts)
• Number of acres conveyed
• Signature of the authorizing government official
• Price paid (if any — some homestead patents were issued for "settlement and cultivation")`,
      },
      {
        title: 'How Land Patent Research Fits Into Responsible Parcel Research',
        content: `NLDS was built on the idea that understanding land fully — its history, its context, its legal status — is what separates good land investors from great ones.

Land patent research is one layer of a complete parcel research process. Here is how it fits in:

1. START WITH CURRENT OWNERSHIP: Who owns the property today? NLDS provides current ownership data as part of every parcel profile.

2. TRACE THE CHAIN OF TITLE: Work backward through the chain of deeds to the original patent, then forward through every conveyance to confirm the current owner's title is valid.

3. CHECK FOR LIENS AND ENCUMBRANCES: Mortgages, tax liens, easements, covenants, judgments. These are recorded in the county recorder's office.

4. VERIFY ZONING AND PERMITTED USE: Confirm with the county planning/zoning office that your intended use is permitted.

5. PHYSICAL INSPECTION: Drive the property. Check for structures, dumping, contamination, or encroachment.

6. ENVIRONMENTAL REVIEW: For properties with structures or industrial history, a Phase I Environmental Site Assessment is appropriate.

7. FINANCIAL ANALYSIS: Purchase price + closing costs + holding costs + improvement costs vs. estimated market value.

Land patent research supports step #2 — confirming the foundational title. It does not replace steps 1, 3, 4, 5, 6, or 7.

When all steps are done thoroughly, you have dramatically reduced your risk as a land investor. NLDS provides the data layer for steps 1, 2, and 7 — and connects you to the knowledge and tools to complete the others.`,
      },
    ],
    keyTakeaways: [
      'A land patent is the original government grant that transferred a specific parcel from public to private ownership',
      'Land patents are historical foundation documents in the chain of title — not a modern legal remedy or alternative to current title',
      'Most U.S. land west of the original colonies passed through the land patent system between 1800 and 1920',
      'Understanding land patent history is part of responsible title research — not a workaround for it',
      'Modern claims that land patents override current ownership are not supported by mainstream legal precedent and can create legal liability',
      'NLDS provides land patent context as educational and historical information to support complete parcel research',
    ],
    relatedModules: ['title-deed-chain', 'parcel-research', 'tax-sales', 'risk-management'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // TAX SALES
  // ═══════════════════════════════════════════════════════════════════════════
  'tax-sales': {
    title: 'Tax Sales — The Complete Guide',
    icon: '📋',
    category: 'How to Acquire',
    estimatedRead: '12 min read',
    sections: [
      {
        title: 'What Is a Tax Sale?',
        content: `A tax sale is a public auction where properties with delinquent property taxes are sold to the highest bidder. The winning bid must be at least equal to the back taxes owed (plus fees and costs). Any amount above that minimum is the buyer's "premium."

When a property owner fails to pay property taxes for a statutory period — typically 1 to 3 years depending on the state and county — the county has legal authority to recover the unpaid taxes by selling the property at auction.

There are two main types of tax sales:
• Tax Deed Sale: The property itself is sold. You buy the property outright. Higher risk, higher potential reward.
• Tax Lien Sale: A lien against the property is sold. You become a creditor earning interest. If the owner does not redeem, you can foreclose and take title.

Missouri (including St. Louis City and St. Louis County) primarily uses tax deed sales — meaning you are purchasing the property, not just a lien.`,
      },
      {
        title: 'How Tax Deed Auctions Work',
        content: `1. The county identifies properties with delinquent taxes after the statutory redemption period expires.
2. A notice is published in the local newspaper (minimum 30 days before the sale, per Missouri law).
3. The auction is held — in St. Louis County, typically at the County Executive Office or online via a designated platform.
4. The opening bid equals the back taxes owed plus costs and fees.
5. Bidders compete upward. The highest bidder above the opening bid wins.
6. The winner must pay immediately — usually by cashier's check or wire transfer. No financing contingency.
7. You receive a certificate of purchase. After the redemption period expires, you receive the tax deed.

MISSOURI REDEMPTION PERIOD: In Missouri, the property owner typically has 1 year from the date of the tax sale to redeem the property by paying the taxes owed plus interest. During this period, you own the certificate but cannot take possession.`,
      },
      {
        title: 'What You\'re Actually Buying',
        content: `Critical point: when you buy at a tax deed sale in Missouri, you are buying the property in its current condition — including all existing liens, mortgages, encumbrances, tenants, code violations, and environmental issues.

You are NOT buying a clear title. You are buying the property subject to:
• Existing mortgages and liens (these do not automatically go away in a Missouri tax deed sale)
• Any current tenants or occupants (eviction may be required)
• Any code violations or open permits
• Environmental contamination (you would be liable)
• Back taxes beyond what was auctioned (if the auction did not cover the full tax bill — rare but possible)

This is why due diligence before bidding is not optional. A property that looks like a $2,000 bargain can become a $40,000 liability if there are $30,000 in back taxes and $10,000 in demolition costs you did not factor in.`,
      },
      {
        title: 'Due Diligence Checklist for Tax Sales',
        content: `Before you bid at any tax deed auction:

TITLE: Run a full title search at the county recorder. Identify every lien, mortgage, easement, and encumbrance.
PHYSICAL: Inspect the property. Drive by. Walk the lot. Check for structures, squatters, dumping.
ZONING: Confirm with the county zoning office that your intended use is permitted.
ENVIRONMENTAL: For any property with structures, get a Phase I Environmental Assessment.
FINANCIAL: Calculate the full cost: bid + premium + back taxes + holding costs + renovation + resale costs.
LEGAL: Confirm the redemption period and your state's rules about existing liens after a tax deed sale.

In St. Louis: Use NLDS's Opportunity Score, which factors in location trends, price-to-ARV ratio, and neighborhood market data to help you prioritize which deals are worth the due diligence effort.`,
      },
      {
        title: 'St. Louis-Specific Notes',
        content: `St. Louis has one of the most active tax deed markets in the Midwest — driven by the city's high number of vacant properties, legacy title issues from decades of population loss, and the LRA's parallel inventory.

Key STL-specific notes:
• St. Louis City Collector's auction: Annual sale of properties with 3+ years of delinquent taxes.
• St. Louis County Collector's auction: Annual sale. Properties in incorporated municipalities have separate sales.
• LRA acts as a "safety net" for many properties — after failed tax sales, properties often transfer to the LRA, where they become available through a separate, more accessible process.
• The "northside" vs "southside" divide in St. Louis creates dramatically different risk/return profiles. NLDS's Opportunity Score uses neighborhood-level data to account for this.
• Title issues in north St. Louis can go back generations — properties with unclear heirs, estates that were never properly settled, and deed gaps from the 1940s-1970s are common.`,
      },
    ],
    keyTakeaways: [
      'Tax deed sales in Missouri mean buying the property outright, not a lien',
      'Opening bid = back taxes owed. Everything above = your premium — keep it small',
      'Missouri has a 1-year redemption period where the previous owner can reclaim the property',
      'You are buying a clouded title — always run a full title search before bidding',
      'NLDS Opportunity Scores help you filter before spending time on due diligence',
    ],
    relatedModules: ['adjudicated-properties', 'sheriff-sales', 'lra-land-banks', 'title-deed-chain'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // TITLE, DEED, CHAIN OF TITLE
  // ═══════════════════════════════════════════════════════════════════════════
  'title-deed-chain': {
    title: 'Title vs Deed vs Chain of Title',
    icon: '⛓️',
    category: 'Land Concepts',
    estimatedRead: '10 min read',
    sections: [
      {
        title: 'Title, Deed, and Chain of Title — Defined',
        content: `These three terms are the foundation of land ownership records. Understanding the difference will make every other aspect of land investing clearer.

TITLE is the legal concept of ownership — the right to possess and use a property. You don't receive a "title document" when you buy land. Instead, title is established and proven through a chain of documents stretching back to the original land patent.

DEED is the physical legal document that transfers title from one party to another. Deeds are recorded in the county land records office. The main types:
• Warranty Deed: Seller guarantees title is clear against all defects, past and present. Standard in most states.
• Special Warranty Deed: Seller only guarantees against defects that arose during their ownership period.
• Quitclaim Deed: Seller transfers whatever interest they may have, with no guarantees. Common in family transfers and investor deals.
• Sheriff's Deed / Tax Deed: Conveys property sold at a court-ordered or tax sale. Usually comes with significant encumbrances.

CHAIN OF TITLE is the complete, unbroken history of ownership transfers for a property — starting from the original land patent and continuing through every subsequent conveyance to the current owner. A "break" in the chain is a title defect.`,
      },
      {
        title: 'Why the Chain of Title Matters',
        content: `When you buy property, your title company searches the chain of title to confirm the seller has the legal right to sell to you. If the chain is broken — a deed is missing, improperly executed, or recorded in the wrong name — the title is "clouded."

A clouded title means:
• You may not have clear ownership
• Future buyers may have difficulty getting financing or title insurance
• You could face legal challenges from someone claiming prior ownership
• The property may be difficult to sell or refinance

The standard rule in most states: a buyer must have "marketable title" — a chain of title clear enough that a reasonable buyer would accept it. A title company will require breaks to be resolved — often through a quiet title lawsuit — before issuing title insurance.`,
      },
      {
        title: 'How to Read a Chain of Title',
        content: `A chain of title is read in reverse — from the current owner backward to the original patent. Each "link" is a deed:

Example (simplified):
1. LAND PATENT (1847): U.S. Government → John Smith (original 80-acre grant)
2. DEED (1882): John Smith → James Johnson (probate/estate transfer, recorded)
3. DEED (1923): James Johnson → Mary Johnson (gift to daughter, recorded)
4. DEED (1955): Mary Johnson → Robert Lee (warranty deed, recorded)
5. DEED (1998): Robert Lee → Current Owner (special warranty deed, recorded)

Each deed must be: properly executed, legally described, recorded in the county land records office, and free from dispute.

Any gap, forged signature, deed from an incapacitated person, or unrecorded conveyance can break the chain and create a title defect.`,
      },
    ],
    keyTakeaways: [
      '"Title" is the legal right to own. "Deed" is the document that transfers it. "Chain of Title" is the history of all those transfers.',
      'A break in the chain of title creates a clouded title — which can block your ability to sell, finance, or insure the property.',
      'Always do a title search before buying land — especially at tax sales, sheriff sales, or from motivated sellers.',
      'Land patents are the starting point of every chain of title for land that was once U.S. public domain.',
    ],
    relatedModules: ['land-patents', 'parcel-research', 'risk-management'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PARCEL RESEARCH
  // ═══════════════════════════════════════════════════════════════════════════
  'parcel-research': {
    title: 'How to Research a Parcel',
    icon: '🔍',
    category: 'Land Concepts',
    estimatedRead: '12 min read',
    sections: [
      {
        title: 'The 7-Step Parcel Research Process',
        content: `Every parcel of land tells a story. The researcher's job is to read that story accurately — to understand who owns it, what its history is, what its current legal and physical status is, and whether it represents a good investment.

Here is the 7-step process used by professional land investors and title researchers:

STEP 1 — IDENTIFY THE PROPERTY: Start with the address or parcel number. Get the legal description (Township/Range/Section or metes and bounds) and the parcel/tax ID number. These are your keys to everything else.

STEP 2 — CURRENT OWNERSHIP: Contact the county assessor or treasurer's office. Get the current owner's name, assessed value, tax status, and any special assessments.

STEP 3 — CHAIN OF TITLE: Go to the county recorder's office (or use online land records if available). Trace ownership backward from the current owner to the original land patent. Look for gaps, missing deeds, or questionable transfers.

STEP 4 — LIENS AND ENCUMBRANCES: Search for mortgages, tax liens, judgments, easements, covenants, and UCC filings against the property and the current owner. A title company can run this search for $200-$400.

STEP 5 — ZONING AND LAND USE: Contact the county or city planning/zoning office. Confirm zoning, permitted uses, setback requirements, and any overlay districts.

STEP 6 — PHYSICAL AND ENVIRONMENTAL: Drive the property. For properties with structures: get a Phase I Environmental Site Assessment ($500-$1,500). For vacant land: check for dumping, contamination, or encroachments.

STEP 7 — FINANCIAL ANALYSIS: Calculate your offer: purchase price + closing costs + holding costs + improvement costs + resale/marketing costs vs. estimated after-repair value (ARV) and market rent.`,
      },
      {
        title: 'What to Look For in Public Records',
        content: `COUNTY ASSESSOR RECORDS: Ownership, assessed value, parcel size, year built, tax history, exemptions, special assessments.

COUNTY RECORDER RECORDS: Deeds, mortgages, liens, easements, covenants, recorded surveys, right-of-way agreements.

COUNTY TREASURER/COLLECTOR RECORDS: Current tax status, delinquent taxes, special improvement district assessments, back taxes owed.

PLANNING/ZONING RECORDS: Current zoning, land use plan designation, pending rezonings, zoning enforcement actions, building permits.

COURT RECORDS: Pending lawsuits involving the property or owner, foreclosure proceedings, quiet title actions, bankruptcy filings.

FEDERAL/STATE DATABASES: EPA ECHO (environmental violations), FEMA flood maps, state environmental agency records, BLM/GLO records for original patent.`,
      },
    ],
    keyTakeaways: [
      'Start with the address and parcel/tax ID number — these unlock all public records.',
      'A complete title search goes back to the original land patent, not just the current owner.',
      'Always check for liens, easements, and covenants — they can dramatically affect what you can do with a property.',
      'Use NLDS parcel profiles to get the legal description and TRS coordinates — which make cross-referencing federal and state records much easier.',
    ],
    relatedModules: ['title-deed-chain', 'land-patents', 'risk-management'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ADJUDICATED PROPERTIES
  // ═══════════════════════════════════════════════════════════════════════════
  'adjudicated-properties': {
    title: 'Adjudicated Properties',
    icon: '🔨',
    category: 'How to Acquire',
    estimatedRead: '8 min read',
    sections: [
      {
        title: 'What Is an Adjudicated Property?',
        content: `An adjudicated property is a property that has been declared abandoned or unclaimed by a court of law. This is a distinct legal process from a tax sale — different rules, different timelines, and different implications for buyers.

The word "adjudicated" means a court has made a formal judgment. In the context of property, this means a judge has reviewed evidence and determined that the property meets the legal standard for abandonment — typically meaning no legitimate owner has come forward to claim it or pay associated taxes and fees.

In Louisiana (which uses the term most commonly), the Adjudicated Property process means properties that go unsold at tax sale are transferred to the state or local government's adjudication. Other states have similar concepts with different names.

In Missouri/St. Louis, the term "adjudicated" is less commonly used, but the underlying concept applies through probate court processes and escheatment proceedings.

Why it matters: Buying an adjudicated property is different from buying at a tax deed sale. The rights you acquire, the redemption periods, and the title implications all differ based on the specific state and local process.`,
      },
      {
        title: 'Adjudicated vs. Tax Sale — What\'s the Difference?',
        content: `Both involve properties with unpaid taxes. But the legal processes are different:

TAX SALE: The property is sold at auction specifically to recover unpaid property taxes. The buyer pays the back taxes and receives either a tax lien or a tax deed, depending on state law.

ADJUDICATED: The property has gone through a separate legal process — a quiet title action by the government, an escheatment proceeding, or a probate-like process for heirless estates — that formally declares the property abandoned. The government may then sell directly through its own programs.

KEY RISK with adjudicated properties: The title may still be contested. Someone who was never notified of the original proceeding — an heir, a lienholder, a prior owner — may still have a legal claim. Due diligence is especially important.`,
      },
      {
        title: 'St. Louis Context',
        content: `St. Louis has a significant inventory of adjudicated-type properties — many of which end up in the LRA system. The LRA takes properties through a combination of:
• Tax deed transfers after failed auctions
• City code enforcement actions resulting in title transfer
• Properties with complicated heir/title situations resolved through quiet title

NLDS monitors both LRA inventory and relevant auction events for adjudicated properties across the St. Louis market.`,
      },
    ],
    keyTakeaways: [
      'Adjudicated properties are declared abandoned by a court — a separate legal process from tax sales.',
      'Different states have different rules — the legal framework matters more than the terminology.',
      'Title risks on adjudicated properties can be higher because original owners/heirs may not have been properly notified.',
      'In St. Louis, many adjudicated-type properties end up in the LRA system — often the better entry point for buyers.',
    ],
    relatedModules: ['tax-sales', 'lra-land-banks', 'title-deed-chain'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SHERIFF SALES
  // ═══════════════════════════════════════════════════════════════════════════
  'sheriff-sales': {
    title: 'Sheriff Sales — Foreclosure Auctions',
    icon: '⚖️',
    category: 'How to Acquire',
    estimatedRead: '9 min read',
    sections: [
      {
        title: 'What Is a Sheriff Sale?',
        content: `A sheriff sale (also called a sheriff's auction) is a property sold by the county sheriff's office to satisfy a court judgment — almost always a foreclosure. When a lender wins a foreclosure lawsuit against a borrower, the court orders the property sold at public auction by the sheriff.

The proceeds go to paying off the lender and other lienholders in order of priority. If there is money left over, it goes to the former property owner.

Sheriff sales are different from tax sales in a key way: they are triggered by a private debt (the mortgage) rather than a public debt (property taxes). The legal process, title implications, and redemption rules are all different.`,
      },
      {
        title: 'How Sheriff Sales Work',
        content: `1. A lender files a foreclosure lawsuit after the borrower defaults on mortgage payments.
2. The court enters a judgment in favor of the lender, specifying the amount owed.
3. The sheriff schedules a foreclosure sale — usually at the county courthouse or online.
4. Notice is published in the newspaper (typically 3-4 weeks before the sale).
5. The property is sold to the highest bidder.
6. Proceeds are distributed to lienholders in order of priority.
7. The winning bidder receives a sheriff's deed.

IMPORTANT: In most states, the former owner has a statutory right of redemption — they can reclaim the property by paying the full judgment amount within a set period (often 30 days to 12 months after the sale).`,
      },
      {
        title: 'What to Watch For',
        content: `Sheriff sale properties come with specific risks:

JUNIOR LIENS: A sheriff's sale wipes out junior liens — but NOT senior liens. If a second mortgage or home equity line of credit was recorded before the foreclosing mortgage, those may survive the sale.

REDEMPTION PERIOD: In most states, the former owner can redeem the property within 30 days to a year after the sale. You do not have clear title and cannot take possession during this period.

OCCUPIED PROPERTIES: Many sheriff sale properties are occupied. You may need to go through formal eviction to take possession — which can take months and cost thousands.

POUNDING: The lender sometimes makes a credit bid (accepting the property in lieu of the full judgment). This is called "pounding" — and can make it hard for other bidders to get a deal.`,
      },
    ],
    keyTakeaways: [
      'Sheriff sales are foreclosure auctions — triggered by private debt (mortgage default), not taxes.',
      'Junior liens may survive a sheriff sale — always run a full lien search before bidding.',
      'Former owners often have redemption rights — you may not have clear title immediately after the sale.',
      'Occupied properties may require formal eviction before you can take possession.',
    ],
    relatedModules: ['tax-sales', 'title-deed-chain', 'risk-management'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LRA & LAND BANKS
  // ═══════════════════════════════════════════════════════════════════════════
  'lra-land-banks': {
    title: 'LRA & Land Banks',
    icon: '🏛️',
    category: 'How to Acquire',
    estimatedRead: '9 min read',
    sections: [
      {
        title: 'What Is a Land Bank?',
        content: `A land bank is a government or nonprofit entity that takes title to vacant, abandoned, and tax-delinquent properties — with the goal of returning them to productive use rather than holding them indefinitely.

Land banks work by acquiring problem properties — often for a fraction of their market value — and then either rehabilitating them, selling them to responsible buyers, or holding them until the market is ready for development.

The key feature of most land bank programs: they eliminate the title complications that make many distressed properties unbuyable. A good land bank has already resolved the title issues, demolition needs, or code violations that would otherwise block a sale.

St. Louis has one of the most active and well-established land bank programs in the country — the Land Reutilization Authority (LRA), founded in 1972.`,
      },
      {
        title: 'How the LRA Works in St. Louis',
        content: `The Land Reutilization Authority (LRA) operates in St. Louis City. Its inventory comes primarily from:
• Properties that failed to sell at the annual St. Louis City Collector tax sale
• Properties acquired through city code enforcement (demolition orders, vacant building registrations)
• Donations from the federal government (HUD, GSA) and private owners

The LRA sells properties through several programs:
• Steading Program: For households earning below 80% of area median income. Low purchase price, must be owner-occupied for 5+ years.
• Side Yard Program: For adjacent property owners who want to expand their lot. Very low price (typically $100-$500).
• Vacant Lot Program: For developers, community organizations, or individuals who want to purchase a vacant lot.
• Blighted Property Program: For properties that need significant rehabilitation. Lower prices but strict renovation timelines.

The LRA's advantage: title is already cleared before sale.`,
      },
      {
        title: 'How to Access LRA Properties',
        content: `LRA properties are not on the open market — they require direct engagement:

1. REGISTER: Sign up at stlouis-mo.gov/LRA for property alerts and notifications.
2. CONTACT: Call or visit the LRA to express interest in specific neighborhoods or programs.
3. ATTEND SALES: The LRA holds periodic public sales — call ahead to get on the schedule.
4. APPLY FOR PROGRAMS: Each program has specific eligibility requirements.
5. PARTNER: Real estate agents and investors who work regularly with the LRA often have the best access and most current inventory information.`,
      },
    ],
    keyTakeaways: [
      'Land banks take title to problem properties and clear the title before reselling — making them more accessible than tax sales for many buyers.',
      'The LRA is St. Louis\'s primary land bank — and one of the most established in the country.',
      'LRA properties are not on the open market — you need to register and engage directly with the agency.',
      'LRA sales typically require proof of financing or income eligibility, and renovation commitments for most programs.',
    ],
    relatedModules: ['tax-sales', 'st-louis-market', 'acquisition-pathways'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ST. LOUIS MARKET
  // ═══════════════════════════════════════════════════════════════════════════
  'st-louis-market': {
    title: 'St. Louis Land Market',
    icon: '🗺️',
    category: 'St. Louis Focus',
    estimatedRead: '11 min read',
    sections: [
      {
        title: 'St. Louis — The Nation\'s Land Investment Laboratory',
        content: `St. Louis is one of the best markets in America for land investment — and also one of the most misunderstood.

The city has a unique combination of characteristics:
• Extremely affordable land — some parcels available for under $1,000
• Large inventory of vacant and distressed properties from decades of population loss
• Active LRA program with established buying processes
• Annual tax sales with significant inventory
• Legacy title issues that scare away casual buyers — creating opportunity for those who do the research
• Growing development interest in select corridors

But St. Louis is not a homogeneous market. The difference between a good land investment and a terrible one often comes down to understanding neighborhood-level dynamics — which is exactly what NLDS's Opportunity Score system is built to capture.`,
      },
      {
        title: 'The Northside vs. Southside Divide',
        content: `St. Louis is geographically divided by an invisible line — "the Delmar Divide" — that separates the north side (predominantly Black, lower income, higher vacancy) from the south side (predominantly white, higher income, lower vacancy).

This matters enormously for land investing:

NORTH SIDE: Much cheaper land — vacant lots as low as $500-$3,000. High vacancy rates — 20-30% in some neighborhoods. Significant title issues from decades of population loss and heir property. Long-term rental demand is limited in some areas. Potential for community development partnerships, urban farms, and land banking.

SOUTH SIDE: More expensive — but still affordable compared to most major metros. Lower vacancy, more stable neighborhoods. Better rental and development potential. More competitive for acquisitions.

NLDS's Opportunity Score weights these neighborhood dynamics — so a $1,000 north side property and an $8,000 south side property might score equally if the underlying market fundamentals support it.`,
      },
    ],
    keyTakeaways: [
      'St. Louis is a land investment laboratory — affordable inventory, active programs, and complexity that scares away unprepared buyers.',
      'The Delmar Divide separates dramatically different markets — always evaluate at the neighborhood level, not city-wide.',
      'North side: cheaper, more inventory, higher risk and complexity, long-term opportunity.',
      'South side: more expensive but more stable, better for straightforward buy-and-hold or development.',
    ],
    relatedModules: ['lra-land-banks', 'acquisition-pathways', 'risk-management'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // FINANCING
  // ═══════════════════════════════════════════════════════════════════════════
  'financing-land-deals': {
    title: 'How to Finance Land Deals',
    icon: '💰',
    category: 'Strategy',
    estimatedRead: '10 min read',
    sections: [
      {
        title: 'Cash Is King — But Not Always Required',
        content: `Land is one of the few investment categories where paying cash is still the dominant acquisition method — and where paying cash produces the best deals. Many sellers (land banks, tax sales, motivated sellers) will give significant discounts for fast, cash transactions with no financing contingency.

That said, you do not always need cash:

CASH: Best price, fastest closings, simplest transactions. Recommended for properties under $20,000 where carrying costs are manageable.

HARD MONEY: Short-term loans (6-24 months) from private lenders at higher interest rates (12-18%). Used to acquire and rehabilitate property. The property serves as collateral. Good for flippers or developers.

OWNER FINANCING: The seller carries a note — you make payments directly to them. More negotiable terms. Common in land contracts.

CREATIVE FINANCING: Subject-to existing mortgage, joint ventures, equity partnerships, wholesaling, lease-options. Requires more skill and legal support.`,
      },
      {
        title: 'Tax Sale Financing Realities',
        content: `If you are buying at a tax deed auction, you typically need cash — and you need it fast. Most jurisdictions require payment in full within 24-48 hours of the winning bid, typically by cashier's check or wire transfer. No financing contingencies are allowed.

This means:
• Have your capital ready before the auction
• Know your maximum bid
• Have your due diligence done in advance
• Do not bid emotionally — stick to your numbers

For LRA purchases, the LRA typically requires proof of funds or financing pre-approval before contracting — even though closings happen 30-60 days later.`,
      },
    ],
    keyTakeaways: [
      'Cash gets the best deals at tax sales and from most land banks — have capital ready before you bid.',
      'Hard money loans work for acquisition + renovation strategies but add interest costs.',
      'Owner financing is often negotiable for land deals — especially with motivated sellers.',
      'Always have financing pre-approved before attending any auction — even LRA sales.',
    ],
    relatedModules: ['tax-sales', 'acquisition-pathways', 'risk-management'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // RISK MANAGEMENT
  // ═══════════════════════════════════════════════════════════════════════════
  'risk-management': {
    title: 'Risks Every Land Buyer Should Understand',
    icon: '⚠️',
    category: 'Strategy',
    estimatedRead: '10 min read',
    sections: [
      {
        title: 'The Five Biggest Land Investment Risks',
        content: `1. TITLE CLOUDS: Liens, encumbrances, or breaks in the chain of title that were not discovered before purchase. Can block your ability to sell, finance, or use the property. Mitigation: Always do a full title search.

2. ZONING CHANGES: The county changes zoning after you buy, restricting your intended use. Mitigation: Check current AND proposed zoning plans with the county.

3. ENVIRONMENTAL LIABILITY: Soil or groundwater contamination that you inherit as the new owner — cleanup costs can dwarf the purchase price. Mitigation: Phase I Environmental Site Assessment for any property with structures or industrial history.

4. HOLDING COSTS: Property taxes, insurance, HOA fees, and utilities accumulate while you own the property. If holding costs exceed your carrying capacity, you may be forced to sell at a loss. Mitigation: Have a 12-24 month holding budget.

5. MARKET TIMING: Land is an illiquid asset. If you need to sell in 1-2 years, you may not find a buyer at your asking price. Mitigation: Do not invest capital you cannot afford to have locked up for 3-5+ years.`,
      },
      {
        title: 'St. Louis-Specific Risks',
        content: `ST. LOUIS TITLE ISSUES: Properties in north St. Louis often have title gaps going back 40-80 years — heirs who never formally inherited, estates that were never probated, deed gaps from informal family transfers. Resolvable — but require attorney involvement and add $1,000-$5,000+ per property.

DEMOLITION COSTS: Many "cheap" St. Louis properties have dilapidated structures that cost $5,000-$30,000+ to demolish. Always factor full demo cost into your offer. NLDS's Opportunity Score includes structure condition as a factor.

CRIME AND BLIGHT: Some neighborhoods have cyclical crime and blight issues. Properties can look good on paper but become inaccessible or periodically vandalized. Drive-by inspections are essential.

SPECIAL ASSESSMENTS: Some St. Louis neighborhoods have special improvement districts — annual fees for sidewalk, lighting, or beautification improvements. These can run $100-$1,000+ per year and are attached to the property, not the owner.`,
      },
    ],
    keyTakeaways: [
      'Title clouds are the #1 risk in distressed property investing — always do a title search before buying.',
      'Environmental contamination can turn a $5K property into a $50K liability — get a Phase I assessment for any property with structures.',
      'Holding costs are silent profit killers — factor in taxes, insurance, and utilities for 12-24 months before you buy.',
      'In St. Louis, always factor demolition costs for any property with a structure — get contractor estimates before bidding.',
    ],
    relatedModules: ['tax-sales', 'title-deed-chain', 'parcel-research'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ACQUISITION PATHWAYS
  // ═══════════════════════════════════════════════════════════════════════════
  'acquisition-pathways': {
    title: 'Acquisition Pathways™ — NLDS System',
    icon: '🛤️',
    category: 'Strategy',
    estimatedRead: '7 min read',
    sections: [
      {
        title: 'What Is an Acquisition Pathway?',
        content: `An Acquisition Pathway™ is the specific route by which a property moves from its current state into your ownership. Each pathway has different rules, timelines, costs, risks, and competitive dynamics.

NLDS has identified five primary Acquisition Pathways™ for the St. Louis market:

1. TAX DEED AUCTION: Buy at the annual St. Louis County or City Collector auction. Most properties are vacant or severely distressed. Best for cash buyers who have done full due diligence.

2. LRA DIRECT PURCHASE: Buy directly from the Land Reutilization Authority through their programs. Title cleared by the LRA. Programs have income/use requirements. Best for buyers who qualify for Steading or want vacant lots.

3. ADJUDICATED/HEIR PROPERTY: Buy from heirs who inherited property through informal family transfers never formally probated. Requires attorney involvement. Best for investors with title experience.

4. MOTIVATED SELLER DIRECT: Buy directly from a property owner who needs to sell — vacant property owners who are paying taxes with no return, out-of-state heirs, etc. Most work but best terms. Best for patient investors.

5. REAL ESTATE AGENT/MLS: Buy through traditional channels. Higher prices but cleaner titles, fewer surprises. Best for buyers who want the simplest transaction with standard financing.`,
      },
    ],
    keyTakeaways: [
      'Every property has an Acquisition Pathway™ — understanding which one applies changes your strategy and negotiating position.',
      'Tax deed auctions offer the lowest entry prices but require cash, full due diligence, and acceptance of title risk.',
      'LRA direct purchases offer title-cleared properties with programs for different buyer types.',
      'Direct-from-seller acquisitions require more work but offer the best pricing flexibility and lowest competition.',
    ],
    relatedModules: ['tax-sales', 'lra-land-banks', 'st-louis-market'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LAND AS OWNERSHIP & LEGACY
  // ═══════════════════════════════════════════════════════════════════════════
  'land-ownership-legacy': {
    title: 'Land as Ownership & Legacy',
    icon: '🏡',
    category: 'Land Concepts',
    estimatedRead: '8 min read',
    sections: [
      {
        title: 'Why Land Is Different From Every Other Asset Class',
        content: `Stocks float. Cryptocurrencies disappear. Businesses fail. But land — the actual physical earth — has been the foundation of wealth for every civilization in human history.

There are four characteristics that make land uniquely valuable as an asset:

1. SCARCE: The supply of land is fixed. You cannot manufacture more land. As populations grow and urban areas expand, the relative scarcity of desirable land increases.

2. PERMANENT: Land does not depreciate the way buildings and equipment do. With proper management, land can be owned indefinitely and passed to future generations without physical degradation.

3. USABLE: Land can be used for agriculture, housing, commercial development, recreation, natural resources, or simply held as a speculative asset. Its utility is flexible over time.

4. INFLATION-HEDGED: Land has historically maintained its purchasing power through inflationary periods — because its value is tied to utility and scarcity rather than monetary policy.

This is why land ownership has been a marker of economic status, security, and power across every human society. It is the original asset.`,
      },
      {
        title: 'Land as Legacy — Passing Wealth Through Generations',
        content: `One of the most powerful aspects of land ownership is its ability to function as intergenerational wealth.

Consider: A grandparent buys a $10,000 vacant lot in St. Louis in 2005. The lot sits, costing $300/year in taxes. By 2030, the neighborhood has improved and the lot is worth $40,000. The grandparent's heirs receive it with a stepped-up basis, reducing or eliminating capital gains taxes.

Or: A family buys a 5-acre rural property. They build a modest home, start a small farm, and gradually develop it. Over 30 years, what started as a $50,000 purchase becomes a $500,000 homestead that supports three generations.

These are not get-rich-quick stories. They are slow, patient wealth-building — exactly the kind that creates actual family legacies.

NLDS is built for this long game: the person who buys a few acres at a tax sale, holds them for 20 years, and eventually passes them to the next generation as a property that was once too cheap for anyone to notice.`,
      },
    ],
    keyTakeaways: [
      'Land is the only asset class that is truly fixed in supply, permanent in nature, and immune to physical depreciation.',
      'Long-term land ownership creates intergenerational wealth — the value compounds through decades of holding.',
      'St. Louis land is affordable enough for ordinary people to build meaningful land positions that would be impossible in most major metros.',
      'NLDS\'s platform is designed for both active investors seeking deals and patient owners building long-term legacy positions.',
    ],
    relatedModules: ['st-louis-market', 'acquisition-pathways'],
  },
}

export default function LessonSlugPage({ params }: { params: { slug: string } }) {
  const module = MODULES[params.slug as keyof typeof MODULES]

  if (!module) {
    return (
      <main className="min-h-screen bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <span className="text-5xl mb-6 block">📖</span>
          <h1 className="text-2xl font-black mb-3">Module Coming Soon</h1>
          <p className="text-gray-400 mb-6">This lesson is being developed. Check back soon.</p>
          <Link href="/learn" className="text-emerald-400 hover:text-emerald-300 transition">
            ← Back to Knowledge Base
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Sticky nav */}
      <header className="border-b border-gray-800 bg-black/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/learn" className="text-gray-400 hover:text-white transition text-sm flex items-center gap-1">
                ← Knowledge Base
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500">{module.estimatedRead}</span>
              <Link href="/deals" className="text-xs px-3 py-1 bg-emerald-600 text-white rounded-full font-semibold hover:bg-emerald-500 transition">
                See Deals →
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Hero */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-3">
            <span className="text-5xl">{module.icon}</span>
            <div>
              <span className="text-xs text-emerald-400 font-semibold uppercase tracking-widest">{module.category}</span>
              <h1 className="text-3xl md:text-4xl font-black text-white">{module.title}</h1>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>{module.estimatedRead}</span>
            <span>·</span>
            <span>{module.sections.length} sections</span>
          </div>
        </div>

        {/* Section nav */}
        <nav className="bg-gray-950/60 border border-gray-800 rounded-xl p-4 mb-8">
          <h3 className="text-xs text-gray-500 font-semibold uppercase tracking-widest mb-3">In This Module</h3>
          <ol className="space-y-1">
            {module.sections.map((s, i) => (
              <li key={i}>
                <a href={`#s-${i}`} className="flex items-center gap-2 text-sm text-gray-400 hover:text-emerald-300 transition py-1">
                  <span className="w-5 h-5 rounded-full bg-gray-800 flex items-center justify-center text-xs text-gray-500 flex-shrink-0">{i + 1}</span>
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Content */}
        <div className="space-y-16">
          {module.sections.map((section, i) => (
            <section key={i} id={`s-${i}`}>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {i + 1}
                </span>
                <h2 className="text-xl md:text-2xl font-black text-white">{section.title}</h2>
              </div>
              <div className="pl-11 space-y-4">
                {section.content.split('\n\n').map((para, j) => {
                  // Numbered list (e.g., "1. Step description\n2. Next step\n3. Another")
                  if (/^\d+\.\s/.test(para.trim())) {
                    const lines = para.split('\n').filter(l => l.trim())
                    return (
                      <ol key={j} className="list-none space-y-2">
                        {lines.map((line, k) => {
                          const m = line.match(/^(\d+)\.\s+(.*)/)
                          return m ? (
                            <li key={k} className="flex gap-3 text-sm text-gray-300 leading-relaxed">
                              <span className="text-emerald-400 font-bold w-4 flex-shrink-0 mt-0.5">{m[1]}.</span>
                              <span>{m[2]}</span>
                            </li>
                          ) : null
                        })}
                      </ol>
                    )
                  }
                  // Bullet list
                  if (/^[•]/.test(para.trim())) {
                    const items = para.split('\n').filter(l => l.trim())
                    return (
                      <ul key={j} className="list-none space-y-1.5">
                        {items.map((item, k) => (
                          <li key={k} className="flex gap-3 text-sm text-gray-300 leading-relaxed">
                            <span className="text-gray-500 w-4 flex-shrink-0 mt-0.5">•</span>
                            <span>{item.replace(/^[•]\s*/, '')}</span>
                          </li>
                        ))}
                      </ul>
                    )
                  }
                  return <p key={j} className="text-gray-300 leading-relaxed text-sm">{para}</p>
                })}
              </div>
            </section>
          ))}
        </div>

        {/* Key Takeaways */}
        <div className="mt-14 bg-emerald-950/30 border border-emerald-800/40 rounded-2xl p-6">
          <h3 className="font-black text-emerald-300 mb-5 flex items-center gap-2 text-lg">
            <span>✓</span> Key Takeaways
          </h3>
          <ul className="space-y-3">
            {module.keyTakeaways.map((t, i) => (
              <li key={i} className="flex gap-3 text-sm text-gray-300">
                <span className="text-emerald-400 font-bold flex-shrink-0 w-5">{i + 1}.</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/deals" className="bg-gray-900/80 border border-gray-800 rounded-xl p-5 hover:border-emerald-600 transition group">
            <p className="text-emerald-400 font-bold mb-1 text-sm group-hover:text-emerald-300 transition">See deals now →</p>
            <p className="text-gray-400 text-xs leading-relaxed">View scored St. Louis land opportunities — each profile includes parcel history and patent context.</p>
          </Link>
          <Link href="/learn" className="bg-gray-900/80 border border-gray-800 rounded-xl p-5 hover:border-gray-600 transition group">
            <p className="text-gray-300 font-bold mb-1 text-sm group-hover:text-white transition">Continue learning →</p>
            <p className="text-gray-500 text-xs leading-relaxed">Browse all {Object.keys(MODULES).length} modules in the NLDS Knowledge Base.</p>
          </Link>
        </div>

        {/* Related */}
        {module.relatedModules && module.relatedModules.length > 0 && (
          <div className="mt-10 pt-8 border-t border-gray-800">
            <h3 className="text-sm font-bold text-gray-500 mb-4 uppercase tracking-widest">Related Modules</h3>
            <div className="flex flex-wrap gap-2">
              {module.relatedModules.map(slug => (
                <Link
                  key={slug}
                  href={`/learn/${slug}`}
                  className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-full text-sm text-gray-400 hover:border-emerald-600 hover:text-emerald-300 transition capitalize"
                >
                  {slug.replace(/-/g, ' ')}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <footer className="border-t border-gray-800 py-6 text-center text-gray-600 text-xs">
        <p>National Land Data System™ — A Porterful Labs Product</p>
        <p className="mt-1">Educational content only · Not legal or financial advice · Consult a licensed real estate attorney</p>
      </footer>
    </main>
  )
}
