import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Land Knowledge Base — National Land Data System',
  description: 'Plain-language guides on tax sales, land banks, sheriff sales, land patents, and land ownership. Learn land investing step by step.',
}

const MODULES = [
  // ── ACQUISITION METHODS ──────────────────────────────────────────────
  {
    slug: 'what-is-a-tax-sale',
    icon: '📋',
    category: 'How to Acquire',
    title: 'Tax Sales — The Complete Guide',
    summary: 'What they are, how auctions work, what to watch for, and how to profit from unpaid property taxes.',
    lessons: 6,
    level: 'Intermediate',
    color: 'red',
    featured: true,
  },
  {
    slug: 'what-is-an-adjudicated-property',
    icon: '🔨',
    category: 'How to Acquire',
    title: 'Adjudicated Properties',
    summary: 'Properties the court has declared abandoned or unclaimed. A distinct category from tax sales — with its own rules, risks, and opportunities.',
    lessons: 5,
    level: 'Advanced',
    color: 'violet',
    featured: false,
  },
  {
    slug: 'what-is-a-sheriff-sale',
    icon: '⚖️',
    category: 'How to Acquire',
    title: 'Sheriff Sales — Foreclosure Auctions',
    summary: 'Properties sold by the sheriff to satisfy court judgments. Usually foreclosures. High upside — do your homework first.',
    lessons: 4,
    level: 'Advanced',
    color: 'purple',
    featured: false,
  },
  {
    slug: 'what-is-an-lra-land-bank',
    icon: '🏛️',
    category: 'How to Acquire',
    title: 'LRA & Land Banks',
    summary: 'Government entities that take title to vacant properties and sell them at deep discounts to buyers who will use them.',
    lessons: 5,
    level: 'Beginner',
    color: 'blue',
    featured: false,
  },
  {
    slug: 'land-patents-explained',
    icon: '📜',
    category: 'How to Acquire',
    title: 'Land Patents Explained',
    summary: 'The original land grant documents from the U.S. government. Historical context, what they mean for modern title research, and what they don\'t guarantee.',
    lessons: 7,
    level: 'All Levels',
    color: 'amber',
    featured: true,
  },

  // ── LAND CONCEPTS ─────────────────────────────────────────────────────
  {
    slug: 'title-deed-tax-sale-land-patent',
    icon: '⛓️',
    category: 'Land Concepts',
    title: 'Title vs Deed vs Tax Sale Title vs Land Patent',
    summary: 'A clear breakdown of the four main ways land ownership is documented — and what each means for your rights.',
    lessons: 5,
    level: 'Beginner',
    color: 'cyan',
    featured: false,
  },
  {
    slug: 'how-to-research-a-parcel',
    icon: '🔍',
    category: 'Land Concepts',
    title: 'How to Research a Parcel',
    summary: 'Step-by-step research process: who owns it, what liens exist, zoning, taxes, easements, and how to verify everything.',
    lessons: 6,
    level: 'Intermediate',
    color: 'teal',
    featured: false,
  },
  {
    slug: 'land-as-ownership-legacy',
    icon: '🏡',
    category: 'Land Concepts',
    title: 'Land as Ownership & Legacy',
    summary: 'Why land is different from every other asset class. How to think about land as a long-term holding, generational wealth, and personal freedom.',
    lessons: 4,
    level: 'All Levels',
    color: 'green',
    featured: false,
  },

  // ── ST. LOUIS SPECIFIC ───────────────────────────────────────────────
  {
    slug: 'st-louis-market',
    icon: '🗺️',
    category: 'St. Louis Focus',
    title: 'St. Louis Land Market',
    summary: 'Neighborhood-level breakdown of St. Louis land opportunities. Which areas have the best ROI, what to avoid, and market timing.',
    lessons: 6,
    level: 'All Levels',
    color: 'orange',
    featured: false,
  },

  // ── STRATEGY ─────────────────────────────────────────────────────────
  {
    slug: 'financing-land-deals',
    icon: '💰',
    category: 'Strategy',
    title: 'How to Finance Land Deals',
    summary: 'Cash is king but not required. Hard money, owner financing, partnership structures, and creative deal-making.',
    lessons: 5,
    level: 'Intermediate',
    color: 'yellow',
    featured: false,
  },
  {
    slug: 'land-risks-for-buyers',
    icon: '⚠️',
    category: 'Strategy',
    title: 'Land Risks Every Buyer Should Know',
    summary: 'Title clouds, zoning changes, environmental liabilities, holding costs, and market timing. How to identify and manage every major risk.',
    lessons: 5,
    level: 'Intermediate',
    color: 'rose',
    featured: false,
  },
]

const COLOR_MAP: Record<string, { bg: string; border: string; badge: string; text: string; badgeBg: string }> = {
  red:    { bg: 'bg-red-950/30',      border: 'border-red-800/40',    badge: 'bg-red-900/50 text-red-200',    text: 'text-red-300',    badgeBg: 'bg-red-900/30' },
  amber:  { bg: 'bg-amber-950/30',    border: 'border-amber-800/40',  badge: 'bg-amber-900/50 text-amber-200', text: 'text-amber-300',  badgeBg: 'bg-amber-900/30' },
  violet: { bg: 'bg-violet-950/30',   border: 'border-violet-800/40',badge: 'bg-violet-900/50 text-violet-200',text:'text-violet-300',badgeBg:'bg-violet-900/30' },
  purple: { bg: 'bg-purple-950/30',  border: 'border-purple-800/40',badge: 'bg-purple-900/50 text-purple-200',text:'text-purple-300',badgeBg:'bg-purple-900/30' },
  blue:   { bg: 'bg-blue-950/30',     border: 'border-blue-800/40',  badge: 'bg-blue-900/50 text-blue-200',    text: 'text-blue-300',   badgeBg: 'bg-blue-900/30' },
  cyan:   { bg: 'bg-cyan-950/30',     border: 'border-cyan-800/40',   badge: 'bg-cyan-900/50 text-cyan-200',    text: 'text-cyan-300',   badgeBg: 'bg-cyan-900/30' },
  teal:   { bg: 'bg-teal-950/30',     border: 'border-teal-800/40',   badge: 'bg-teal-900/50 text-teal-200',    text: 'text-teal-300',   badgeBg: 'bg-teal-900/30' },
  green:  { bg: 'bg-green-950/30',    border: 'border-green-800/40',  badge: 'bg-green-900/50 text-green-200',  text: 'text-green-300',  badgeBg: 'bg-green-900/30' },
  orange: { bg: 'bg-orange-950/30',   border: 'border-orange-800/40', badge: 'bg-orange-900/50 text-orange-200',text: 'text-orange-300', badgeBg: 'bg-orange-900/30' },
  emerald:{ bg: 'bg-emerald-950/30',  border: 'border-emerald-800/40',badge: 'bg-emerald-900/50 text-emerald-200',text:'text-emerald-300',badgeBg:'bg-emerald-900/30' },
  yellow: { bg: 'bg-yellow-950/30',  border: 'border-yellow-800/40',badge: 'bg-yellow-900/50 text-yellow-200',text:'text-yellow-300',badgeBg:'bg-yellow-900/30' },
  rose:   { bg: 'bg-rose-950/30',     border: 'border-rose-800/40',   badge: 'bg-rose-900/50 text-rose-200',    text: 'text-rose-300',   badgeBg: 'bg-rose-900/30' },
}

const CATEGORIES = [
  { label: 'How to Acquire', modules: MODULES.filter(m => m.category === 'How to Acquire') },
  { label: 'Land Concepts', modules: MODULES.filter(m => m.category === 'Land Concepts') },
  { label: 'St. Louis Focus', modules: MODULES.filter(m => m.category === 'St. Louis Focus') },
  { label: 'Strategy', modules: MODULES.filter(m => m.category === 'Strategy') },
]

export default function LearnPage() {
  const featured = MODULES.filter(m => m.featured)

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/" className="text-gray-400 hover:text-white transition text-sm flex items-center gap-1 mb-1">
                ← Back to NLDS
              </Link>
              <h1 className="text-2xl font-black text-white">Land Knowledge Base</h1>
              <p className="text-gray-400 text-sm">Learn land investing from the ground up</p>
            </div>
            <div className="text-right hidden sm:block">
              <span className="text-2xl font-black text-emerald-400">NLDS</span>
              <p className="text-gray-500 text-xs">Learn → Discover → Own</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* Intro */}
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <h2 className="text-4xl font-black mb-4">Land Investing, Demystified</h2>
          <p className="text-gray-400 text-base leading-relaxed">
            Most land knowledge is buried in legal jargon or sold as expensive courses.
            This is plain-language education — built from real St. Louis data, updated continuously,
            and available to every NLDS member.
          </p>
        </div>

        {/* Featured Modules */}
        {featured.length > 0 && (
          <div className="mb-14">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Start Here</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {featured.map(m => {
                const c = COLOR_MAP[m.color]
                return (
                  <Link
                    key={m.slug}
                    href={`/learn/${m.slug}`}
                    className={`${c.bg} border ${c.border} rounded-2xl p-6 hover:border-opacity-80 transition-all group`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-3xl">{m.icon}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${c.badge}`}>{m.lessons} lessons</span>
                    </div>
                    <div className={`text-xs ${c.text} font-medium mb-1 uppercase tracking-wide`}>{m.category}</div>
                    <h4 className="font-black text-lg text-white mb-2 group-hover:text-emerald-300 transition-colors">{m.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{m.summary}</p>
                    <div className="mt-4 text-sm text-emerald-400 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                      Start learning →
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        )}

        {/* All Modules by Category */}
        {CATEGORIES.map(cat => cat.modules.length > 0 && (
          <div key={cat.label} className="mb-12">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">{cat.label}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cat.modules.map(m => {
                const c = COLOR_MAP[m.color] || COLOR_MAP.blue
                return (
                  <Link
                    key={m.slug}
                    href={`/learn/${m.slug}`}
                    className={`${c.bg} border ${c.border} rounded-xl p-5 hover:border-opacity-80 transition-all group`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-xl">{m.icon}</span>
                      <div className="flex flex-col items-end gap-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${c.badge}`}>{m.level}</span>
                        <span className="text-xs text-gray-500">{m.lessons} lessons</span>
                      </div>
                    </div>
                    <h4 className="font-bold text-white mb-1.5 group-hover:text-emerald-300 transition-colors text-sm">{m.title}</h4>
                    <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">{m.summary}</p>
                  </Link>
                )
              })}
            </div>
          </div>
        ))}

        {/* Key Concepts Glossary */}
        <div className="border-t border-gray-800 pt-12 mt-4">
          <h3 className="text-xl font-black text-white mb-6">Key Terms at a Glance</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { term: 'Tax Deed', def: 'A deed issued after a property sells at a tax auction. You\'re buying the property outright — not a lien. Higher risk, potentially higher reward.', c: 'text-red-300' },
              { term: 'Tax Lien', def: 'A lien sold to collect unpaid property taxes. You\'re a creditor, not an owner. You earn interest, and can foreclose if the owner doesn\'t redeem.', c: 'text-amber-300' },
              { term: 'Adjudicated Property', def: 'Property declared abandoned or unclaimed by a court. A separate legal process from tax sales — different rules, different timelines.', c: 'text-violet-300' },
              { term: 'Sheriff Sale', def: 'Property sold by the county sheriff to satisfy a court judgment — usually a foreclosure. Title may have encumbrances.', c: 'text-purple-300' },
              { term: 'Land Patent', def: 'The original land grant document issued by the U.S. government (or state/federal agency) conveying public land to a private party.', c: 'text-amber-300' },
              { term: 'LRA', def: 'Land Reutilization Authority — a St. Louis City agency that manages surplus city-owned land and sells it at deep discounts.', c: 'text-blue-300' },
              { term: 'Chain of Title', def: 'The complete history of ownership transfers for a property, from the original grant to the current owner.', c: 'text-cyan-300' },
              { term: 'Due Diligence', def: 'The research you do before buying: title search, zoning verification, environmental check, physical inspection, and financial analysis.', c: 'text-teal-300' },
              { term: 'Opportunity Score', def: 'NLDS\'s proprietary score (0-100) for each property. Combines price, location, market trends, and risk factors.', c: 'text-emerald-300' },
              { term: 'Right of Redemption', def: 'The legal right of a property owner to reclaim property by paying back taxes + interest within a set period after a tax sale.', c: 'text-orange-300' },
            ].map(k => (
              <div key={k.term} className="bg-gray-950/60 border border-gray-800 rounded-xl p-4">
                <dt className={`font-bold ${k.c} mb-1 text-sm`}>{k.term}</dt>
                <dd className="text-gray-400 text-xs leading-relaxed">{k.def}</dd>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="border-t border-gray-800 pt-12 mt-12 text-center">
          <h3 className="text-3xl font-black mb-3">Ready to Find Real Deals?</h3>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto text-base">
            The knowledge here helps you evaluate. The NLDS platform shows you the actual opportunities —
            scored, translated, and ranked.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/deals"
              className="px-8 py-4 bg-emerald-600 text-white rounded-xl font-bold text-lg hover:bg-emerald-500 transition"
            >
              View Current Deals →
            </Link>
            <Link
              href="/unlock"
              className="px-8 py-4 bg-gray-900 border border-gray-700 text-white rounded-xl font-semibold text-lg hover:border-gray-500 transition"
            >
              Unlock Full Access
            </Link>
          </div>
        </div>
      </div>

      <footer className="border-t border-gray-800 py-6 text-center text-gray-600 text-xs">
        <p>National Land Data System™ — A Porterful Labs Product</p>
        <p className="mt-1">St. Louis, MO · Educational content only · Not legal or financial advice</p>
      </footer>
    </main>
  )
}
