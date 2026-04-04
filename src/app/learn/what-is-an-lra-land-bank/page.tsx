import Link from "next/link";

export const metadata = {
  title: "What Is an LRA / Land Bank? | NLDS Learn Center",
  description:
    "Learn how Land Reutilization Authorities (LRAs) and land banks work — from property acquisition to resale — with a focus on the St. Louis LRA program.",
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold text-slate-800 mb-3 pb-1 border-b border-slate-200">
        {title}
      </h2>
      <div className="text-slate-700 leading-relaxed space-y-3">{children}</div>
    </section>
  );
}

function KeyTerm({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <span>
      <strong className="text-slate-800">{term}</strong>: {children}
    </span>
  );
}

export default function WhatIsAnLraLandBankPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sticky header */}
      <header className="sticky top-0 z-10 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center">
          <Link
            href="/learn"
            className="text-sm text-slate-600 hover:text-slate-900 flex items-center gap-1 transition-colors"
          >
            <span aria-hidden>←</span>
            Learn Center
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-10">
        {/* Page header */}
        <div className="mb-10">
          <p className="text-sm font-medium text-indigo-600 uppercase tracking-wide mb-2">
            Module 1 · Foundations
          </p>
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            What Is an LRA / Land Bank?
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            A plain-language guide to Land Reutilization Authorities — what they
            are, how they work, and what it means for anyone looking to buy
            vacant or abandoned property in St. Louis.
          </p>
        </div>

        {/* Article body */}
        <article className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 md:p-8 space-y-0">

          {/* The short version */}
          <Section title="The Short Version">
            <p>
              A <strong>Land Reutilization Authority (LRA)</strong> is a public
              entity — meaning it&rsquo;s run by or on behalf of local government.
              Its job is to take ownership of properties that nobody wants: vacant
              lots, abandoned buildings, and parcels where the owner stopped paying
              property taxes.
            </p>
            <p>
              Once the LRA holds title, it sells those properties to people who
              will actually use them — someone who wants to build a home, start a
              community garden, or rehabilitate a block. The goal is to put
              problem properties back into productive use instead of letting them
              sit there, dragging down the neighborhood.
            </p>
            <p>
              Think of it as a middle layer between a property that&rsquo;s been
              abandoned or foreclosed and the next person who&rsquo;ll care for it.
            </p>
          </Section>

          {/* Land Bank vs LRA */}
          <Section title="Land Bank vs. LRA — What&rsquo;s the Difference?">
            <p>
              You&rsquo;ll hear both terms used, and they&rsquo;re closely related
              but not quite the same thing.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Land Bank</strong> is a general concept: any public or
                quasi-public entity that acquires vacant, abandoned, or
                tax-delinquent land and holds it until it can be redistributed to
                responsible owners.
              </li>
              <li>
                <strong>LRA (Land Reutilization Authority)</strong> is a specific
                type of land bank, and the term used in several states — including
                Missouri, Georgia, and Ohio. It&rsquo;s a formal legal designation,
                not just a description.
              </li>
            </ul>
            <p>
              So every LRA is a land bank, but not every land bank is called an LRA.
              In St. Louis, the formal entity is the{" "}
              <strong>St. Louis Land Reutilization Authority</strong>, commonly
              referred to as the St. Louis LRA.
            </p>
          </Section>

          {/* History */}
          <Section title="A Brief History">
            <p>
              The earliest land banks in the United States appeared in the 1970s.
              Cities like Cleveland, St. Louis, and Atlanta were dealing with
              large numbers of abandoned properties left behind by population
              decline, and local governments realized the standard real estate
              market wasn&rsquo;t going to solve the problem on its own.
            </p>
            <p>
              These programs proved that a dedicated public entity could
              successfully return blighted properties to productive use —
              sometimes at very low cost to buyers. Over time, the model spread
              to dozens of cities and counties across the country, and today
              there are land banks operating in most major U.S. cities.
            </p>
          </Section>

          {/* How LRAs acquire */}
          <Section title="How LRAs Acquire Properties">
            <p>
              LRAs don&rsquo;t go out and buy properties on the open market.
              They acquire them through a few specific channels:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Tax foreclosure:</strong> When a property owner fails to
                pay property taxes for an extended period (typically several
                years), the county can foreclose. Rather than selling it at a
                packed auction, the LRA often takes title directly.
              </li>
              <li>
                <strong>Donation from the city or county:</strong> Municipalities
                may transfer ownership of problem properties to the LRA as part
                of a blight remediation or neighborhood revitalization strategy.
              </li>
              <li>
                <strong>Purchase from the county at tax sale:</strong> Some LRAs
                attend the same tax sale events where other investors buy
                delinquent properties — but with a mission to hold and resell,
                rather than flip.
              </li>
            </ul>
          </Section>

          {/* How LRAs sell */}
          <Section title="How LRAs Sell Properties">
            <p>
              Each LRA sets its own rules for how properties go to buyers.
              Common methods include:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Application process:</strong> You submit an application
                describing what you plan to do with the property. The LRA reviews
                it and approves or denies. This is the most common method.
              </li>
              <li>
                <strong>Lottery:</strong> When demand for a property exceeds
                supply, some programs use a random lottery to select the buyer —
                especially for desirable vacant lots.
              </li>
              <li>
                <strong>Auction:</strong> A small number of LRAs sell to the
                highest bidder. This is less common for residential programs.
              </li>
            </ul>
            <p>
              The St. Louis LRA uses an application process for most properties.
            </p>
          </Section>

          {/* St. Louis specifics */}
          <Section title="St. Louis LRA — The Specifics">
            <p>
              The <strong>St. Louis Land Reutilization Authority</strong> is
              operated by the City of St. Louis. Here&rsquo;s what you&rsquo;re
              likely to encounter:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Listings:</strong> Available properties are posted at{" "}
                <Link
                  href="https://STLRealProperty.com"
                  className="text-indigo-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  STLRealProperty.com
                </Link>{" "}
                — photos, addresses, pricing, and application instructions are
                all there.
              </li>
              <li>
                <strong>Pricing:</strong> Vacant lots often go for{" "}
                <strong>$1,000 to $5,000</strong>. Properties with structures
                cost more, depending on condition and location, but are still
                typically well below market value.
              </li>
              <li>
                <strong>Owner-occupancy preference:</strong> The St. Louis LRA
                gives some preference to buyers who plan to live in the property
                (owner-occupants) over investors. If you&rsquo;re buying to
                rent or flip, that&rsquo;s still allowed in many cases, but
                owner-occupants may get first consideration.
              </li>
              <li>
                <strong>Processing time:</strong> Applications can take weeks to
                months to be reviewed and approved. Don&rsquo;t expect a same-week
                turnaround.
              </li>
            </ul>
          </Section>

          {/* Who can buy */}
          <Section title="Who Can Buy?">
            <p>
              <strong>Anyone can apply.</strong> There&rsquo;s no requirement that
              you be a St. Louis resident, a first-time homebuyer, or have a
              real estate license. Individuals, nonprofits, and businesses are
              all typically eligible.
            </p>
            <p>
              Some programs prioritize certain buyers — for example, the St. Louis
              LRA&rsquo;s owner-occupancy preference means that applicants
              planning to live in the property may get a leg up on investors
              for certain listings. Other programs have no such preference and
              evaluate all applicants equally.
            </p>
            <p>
              In all cases, you&rsquo;ll need to provide a plan for what
              you&rsquo;ll do with the property — and follow through if approved.
            </p>
          </Section>

          {/* Restrictions after purchase */}
          <Section title="Restrictions After Purchase">
            <p>
              This is one of the most important things to understand before you
              apply: <strong>buying from an LRA isn&rsquo;t like buying a house
              on the open market.</strong> There are usually strings attached.
            </p>
            <p>Common restrictions include:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Build-or-renovate timelines:</strong> You may be required
                to start construction or major renovation within a set period —
                say, 6 to 12 months — and complete it within another window.
                If you don&rsquo;t, the LRA may reclaim the property.
              </li>
              <li>
                <strong>Occupancy requirements:</strong> If you&rsquo;re buying
                a structure, some programs require you to move in and stay for
                a minimum number of years (often 3–5).
              </li>
              <li>
                <strong>Resale restrictions / right of first refusal:</strong>
                Some LRAs require that if you sell the property within a certain
                period (say, 5 years), you must offer it back to the LRA, or
                pay back some or all of the discount you received.
              </li>
            </ul>
            <p>
              These restrictions vary significantly by program and by property.
              Always read the specific terms for the listing you&rsquo;re
              applying for before committing.
            </p>
          </Section>

          {/* Advantages */}
          <Section title="Advantages">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Below-market prices:</strong> This is the main draw.
                Vacant lots for a few thousand dollars are real. Structures
                that need work are often priced far below comparable
                market-value homes.
              </li>
              <li>
                <strong>Clear title (in most cases):</strong> One of the biggest
                advantages of buying from an LRA is that they have the legal
                authority to clear back taxes and resolve liens before selling.
                This means you&rsquo;re typically getting a property with a
                clean title — something that&rsquo;s notoriously difficult to
                achieve with abandoned or tax-delinquent properties on your own.
              </li>
              <li>
                <strong>Community and government support:</strong> LRAs exist
                to stabilize neighborhoods. If your plan aligns with that goal,
                you may find local nonprofits, community development
                organizations, or city programs willing to help — with advice,
                financing, or even volunteer labor.
              </li>
            </ul>
          </Section>

          {/* Disadvantages */}
          <Section title="Disadvantages">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Slow process:</strong> From application to closing,
                expect weeks or months. It&rsquo;s not unusual for the full
                process to take 60–90 days or longer.
              </li>
              <li>
                <strong>Application requirements:</strong> You&rsquo;ll need to
                present a credible plan. Some programs require proof of
                financing, background checks, or even a construction estimate
                before approving your purchase.
              </li>
              <li>
                <strong>Resale restrictions:</strong> As described above, if you
                buy and want to sell quickly, you may face penalties or be
                required to share the profit with the LRA.
              </li>
              <li>
                <strong>Property condition:</strong> Many LRA properties are
                sold as-is. Structures may need significant repair. Vacant lots
                may have debris, overgrowth, or unknown encumbrances that
                aren&rsquo;t always visible in listing photos.
              </li>
            </ul>
          </Section>

          {/* Connection to Tax Sales */}
          <Section title="How This Connects to Tax Sales">
            <p>
              Tax sales and LRAs are closely related — they both deal with the
              same underlying problem: properties whose owners stopped paying
              taxes.
            </p>
            <p>
              In a typical tax sale, the county auctions off the right to collect
              past-due taxes on a property. The winner of the auction becomes
              the holder of a tax lien — they paid the back taxes and now have
              a claim against the property. If the original owner doesn&rsquo;t
              redeem within a redemption period, the lien holder can foreclose
              and take title.
            </p>
            <p>
              <strong>LRAs often participate in tax sales</strong> — sometimes
              bidding on liens or properties directly. When the LRA wins, it
              takes the property through its own process (which may include a
              separate resale program) rather than a traditional investor flip.
            </p>
            <p>
              So if you&rsquo;re researching tax sale properties and see that
              the LRA was the buyer, that&rsquo;s why: the LRA bought at the
              sale and will now be the entity reselling through its own program.
            </p>
          </Section>

        </article>

        {/* CTA */}
        <div className="mt-8 bg-indigo-50 border border-indigo-100 rounded-xl p-6 text-center">
          <p className="text-indigo-900 font-medium mb-3">
            Ready to browse current listings?
          </p>
          <Link
            href="/deals"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
          >
            See St. Louis LRA Deals
          </Link>
        </div>

        {/* Next module grid */}
        <div className="mt-12">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">
            Continue Learning
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/learn/what-is-a-tax-sale"
              className="group bg-white border border-slate-200 rounded-xl p-5 hover:border-indigo-200 hover:shadow-sm transition-all"
            >
              <p className="text-xs text-indigo-600 font-medium mb-1">
                Next Module
              </p>
              <p className="font-semibold text-slate-800 group-hover:text-indigo-700 transition-colors">
                What Is a Tax Deed?
              </p>
              <p className="text-sm text-slate-500 mt-1">
                Understand what a tax deed is and how it differs from a tax lien.
              </p>
            </Link>
            <Link
              href="/learn/what-is-an-adjudicated-property"
              className="group bg-white border border-slate-200 rounded-xl p-5 hover:border-indigo-200 hover:shadow-sm transition-all"
            >
              <p className="text-xs text-indigo-600 font-medium mb-1">
                Related Module
              </p>
              <p className="font-semibold text-slate-800 group-hover:text-indigo-700 transition-colors">
                What Is a Tax Lien?
              </p>
              <p className="text-sm text-slate-500 mt-1">
                Learn how tax liens work and why investors buy them.
              </p>
            </Link>
          </div>
        </div>

      </main>
    </div>
  );
}
