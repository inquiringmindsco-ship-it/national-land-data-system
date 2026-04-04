# National Land Data System™ — SPEC.md — Updated Apr 3, 2026
*Built: April 3, 2026 | St. Louis MVP: April 2–3, 2026 | Acquisition + Revenue Engine Added*

---

## SYSTEM ARCHITECTURE

```
FRONTEND (Next.js 14)
  Search Bar → Intent Parser → City Filter → Property Filter
  StLouisCard (enriched) | StandardCard (other cities)
         ↓
NORMALIZATION LAYER
  parseSearchIntent() → PropertyType[]
         ↓
CITY MODULES (one per city, copy template to add new)
  st-louis.ts · new-orleans.ts · baton-rouge.ts · houston.ts · atlanta.ts · detroit.ts
         ↓
SCRAPER ENGINE
  Registry: city → scraper configs → puppeteer/cheerio
```

**3 Unified Property Types** — maps all jurisdiction terms:
- `TAX_DEED_EQUIVALENT` — tax deed, tax sale, adjudicated, sheriff sale, delinquent
- `TAX_LIEN` — lien certificate, tax certificate
- `GOVERNMENT_LAND` — land bank, LRA, redevelopment authority, surplus land

---

## PROPRIETARY SYSTEMS (LICENSABLE IP)

### SYSTEM #1 — PARCEL INTELLIGENCE ENGINE™ v2.1
**File:** `src/lib/proprietary/parcel-intelligence.tsx`
**Status:** Active, v2.1 — Enhanced defensibility

**Core Formula:**
```
Opportunity Score = (Value × 0.30) + (Location × 0.20) + (Risk × 0.20) + (Demand × 0.15) + (Ease × 0.15)
```

**User-Aware Scoring** — 3 buyer profiles with reweighted formulas:
| Profile | Risk Weight | Value Weight | Ease Weight | Best For |
|---------|-------------|--------------|-------------|----------|
| Beginner | 30% | 25% | 20% | Low-complexity, LRA-only |
| Investor | 15% | 35% | 10% | Price + demand focus |
| Developer | 15% | 20% | 10% | Location + demand focus |

**Composite Signal Layer:**
| Signal | Range | Logic |
|--------|-------|-------|
| Neighborhood Momentum | 0-100 | Per-zip trend index (public reinvestment signals, TIF districts, gentrification data) |
| Scarcity Signal | 0-100 | Count of similar-priced listings in same zip (fewer = higher score) |
| Entry Barrier Score | 0-100 | Source type + auction + occupancy flags (LRA=low barrier, Sheriff Sale=high barrier) |

**Temporal Advantage Layer:**
| Signal | Logic |
|--------|-------|
| Time Sensitivity | Auction countdown → high urgency. No auction → age-based. |
| Early Discovery | Fresh listing + distant auction = high first-mover advantage |

**Strategic Insight (per listing):**
- `headline` — punchy, one-line hook
- `summary` — 2-3 sentence plain-English assessment
- `bestFor[]` — which buyer profiles this fits
- `watchOut` — the one thing that could go wrong
- `angle` — the marketing angle (e.g., "97% below market | 63120 has few similar deals")

**Proprietary defensibility:**
- 28 St. Louis zip codes have bespoke neighborhood profiles (location, momentum, demand, risk notes)
- Scarcity signal is live-data-derived (changes as listings change)
- Early Discovery signal is derived from listing age + auction timing
- User-aware reweighting creates different scores for same listing depending on buyer type
- All weights and thresholds are trade secrets

**Output structure:**
```
{ total, raw, grade, gradeEmoji, subs[], why, signals{5}, insight{headline,summary,bestFor,watchOut,angle} }
```

**Reusable:** New city = new zip profile map. Profile weights adjustable per market.

---

### SYSTEM #2 — GOVERNMENT DATA TRANSLATOR™
**File:** `src/lib/proprietary/government-translator.tsx`
**Status:** Active, extensible

Maps every official/government term to three plain-English fields:
- **What It Means** — what the term actually describes
- **Why Valuable** — why an investor should care
- **What to Watch Out For** — risks and things to verify

**Term coverage (St. Louis):**
- LRA Parcel, Tax Sale, Sheriff Sale, Adjudicated Property
- Delinquent Tax, Tax Lien Certificate, Land Bank
- Redevelopment Authority, Surplus Land, Tax Foreclosure

**Pattern:** Unknown terms are logged to console for human review → added to translation map. System gets smarter over time.

**Reusable:** Term map grows with each new city. Core patterns transferable.

---

### SYSTEM #3 — ACQUISITION PATHWAY™
**File:** `src/lib/proprietary/acquisition-pathway.tsx`
**Status:** Active, 4 pathways defined

Generates step-by-step acquisition roadmap based on property source label:

| Pathway | Trigger | Difficulty | Time |
|---------|---------|------------|------|
| **LRA Process** | LRA, Land Bank, Surplus Land | Moderate (5/10) | 6-10 weeks |
| **Tax Sale** | Tax Sale, Delinquent, Tax Foreclosure | Challenging (7/10) | 4-8 weeks |
| **Sheriff Sale** | Sheriff Sale | Expert (8/10) | 6-12 weeks |
| **Land Bank** | Land Bank application | Moderate (4/10) | 3-6 months |

Each step: action + description + time estimate + cost + optional warning notes.

**Reusable:** New city = new pathway variants (same structure). Steps parameterized by jurisdiction.

---

### SYSTEM #4 — DEAL CLASSIFICATION™
**File:** `src/lib/proprietary/deal-classification.tsx`
**Status:** Active

Tags each listing as one of four deal types:
- **FAST OPPORTUNITY** — auction imminent, low entry, quick path to ownership
- **LONG-TERM HOLD** — buy-and-hold for rental or future development
- **HIGH RISK** — significant unknowns, deep discount, expert-only
- **DEVELOPMENT PLAY** — larger parcels, redevelopment zips, multi-unit

**Output:** `{ dealType, confidence (%), investorFit[], urgencyFlags[], rationale }`

**Urgency Flags:** auction imminent, heavy competition, price change risk, tenant occupancy.

**Reusable:** Scoring logic is data-driven. Deal type thresholds adjustable per market.

---

## DATA SCHEMA

```typescript
interface Listing {
  id: string;
  address: string;
  city: string;
  state: string;           // "MO"
  zipCode?: string;
  propertyType: PropertyType;
  originalLabel: string;   // "LRA Parcel" (source terminology)
  normalizedSummary: string; // "City-controlled property..."
  price: number | null;    // CENTS
  startingBid: number | null;
  auctionDate: string | null; // ISO YYYY-MM-DD
  sourceLink: string;
  sourceName: string;
  scrapedAt: string;
  // St. Louis enrichment
  neighborhood?: string;
  parcelId?: string;
  assessedValue?: number;  // cents
  annualTaxes?: number;    // cents
  zoning?: string;
  occupancyStatus?: 'vacant' | 'occupied' | 'unknown';
  rawData?: Record<string, unknown>;
}
```

---

## ST. LOUIS MODULE

**Data Sources (St. Louis, MO):**
1. St. Louis Land Bank (LRA) — stlouis-mo.gov/lra-property-portal
2. City Collector Tax Sale — stlouis-mo.gov/collector
3. City Sheriff Sales — opsj.org
4. St. Louis County Tax Sale — stlouisco.com

**Neighborhoods covered:**
- North: Fairground, Baden, Pagedale, Northwoods, Bellefontaine Neighbors, Ferguson, Greater Ville, Walnut Park
- South: Carondelet, Bevo Mill, St. George, Southampton, Gravois Park, Shaw
- Central: Downtown, Old North, Compton Heights, Central West End, Vandeventer
- County: Florissant, Bridgeton, Black Jack

**30 Listings** active in current dataset.

---

## IP / TRADEMARK LOG

| System | Status | Defensibility |
|--------|--------|---------------|
| **PARCEL INTELLIGENCE ENGINE™** | v2.1 Active | 5-factor formula + 5 composite signals + 2 temporal signals + user-aware scoring + neighborhood profiles — trade secret |
| **GOVERNMENT DATA TRANSLATOR™** | Active | Translation database = proprietary asset |
| **ACQUISITION PATHWAY™** | Active | Step taxonomy + jurisdiction mapping = IP |
| **DEAL CLASSIFICATION™** | Active | Scoring model + investor-fit logic = trade secret |
| **NATIONAL LAND DATA SYSTEM™** | Active | Brand name + architecture = trademark |

**Next IP Action:** File intent-to-use trademark for "PARCEL INTELLIGENCE ENGINE™" and "GOVERNMENT DATA TRANSLATOR™" before public launch.

---

## MVP STATUS

| Item | Status |
|------|--------|
| Framework + types | ✅ Complete |
| St. Louis city module | ✅ Complete |
| 30 St. Louis listings | ✅ Complete |
| All 4 proprietary systems | ✅ Active |
| Enrichment UI (StLouisCard) | ✅ Active |
| Other city modules | 🔜 Next |
| Real scraping | 🔜 After other cities |
| Supabase DB | 🔜 Production phase |
| Deployment | 🔜 After refinement |

---

## SCALABILITY

**Add new city = 3 steps:**
1. Copy `src/lib/city-modules/template.ts` → `[city-id].ts`
2. Add to `SCRAPER_REGISTRY` in `scrapers.ts`
3. Set `enabled: true` in city config

**Add new property term = 1 step:**
1. Add to `TERM_TRANSLATIONS` in `government-translator.tsx`

**Add new deal type = edit deal-classification.tsx thresholds**

No city-specific code in frontend. Fully modular.

---

## REVENUE SYSTEM — PROUD-TO-PAY (Built Apr 2, 2026)

### 4 Unlock Tiers
| Tier | Price | Access | Features |
|------|-------|--------|----------|
| Supporter | $5 | 48 hrs | Full listing access |
| Standard | $11 | 72 hrs | Full access + weekly digest |
| Patron | $25 | 7 days | Priority support |
| Founder | $100 | 30 days | Founder Wall + early city access |

### User Flow
1. User on `/deals` → sees 3 free preview cards (top-scored, full analysis)
2. Scrolls past → blurred full grid → paywall CTA
3. Goes to `/unlock` → selects tier → Stripe Checkout
4. Payment succeeds → Stripe webhook fires → Supabase writes unlock record
5. Redirect to `/unlock/success` → localStorage stores `session_id`
6. Back on `/deals` → client-side gate reads localStorage → full grid revealed

### Access Gate
- **Basic (no Supabase):** localStorage `session_id` check — works immediately after payment
- **Verified (Supabase):** webhook writes to `nlds_active_access` table — server-side truth

### Pages & APIs
| Route | Purpose |
|-------|---------|
| `/deals` | Preview (3 free) + gated full grid |
| `/unlock` | Tier selection + email capture + Stripe |
| `/unlock/success` | Post-payment verification |
| `/api/create-checkout` | Stripe Checkout session creation |
| `/api/webhook` | Stripe → Supabase write |
| `/api/verify-unlock` | Access check |
| `/api/top-deals` | Auto-ranked top 5 deals JSON |

### Key Files
- `src/app/deals/page.tsx` — preview grid + gated full grid
- `src/app/unlock/page.tsx` — payment page
- `src/app/unlock/success/page.tsx` — post-payment
- `src/components/top-deals/DealsGrid.tsx` — client-side unlock gate
- `src/components/top-deals/PaywallSection.tsx` — tier selector + flexible pay
- `src/app/api/create-checkout/route.ts` — Stripe session
- `src/app/api/webhook/route.ts` — Stripe webhook
- `src/app/api/verify-unlock/route.ts` — access verification
- `src/app/api/top-deals/route.ts` — auto-ranked deals
- `supabase/schema.sql` — full DB schema
- `docs/revenue-system/copy.md` — all copy + email templates

### To Go Live
1. Add env vars to Vercel: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_BASE_URL`
2. Add Supabase env vars (optional for basic mode): `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`
3. Run `supabase/schema.sql` in Supabase dashboard
4. Configure Stripe webhook pointing to `/api/webhook`
5. Connect email provider (Resend/SendGrid) for digest emails

---

## SYSTEM #6 — MARKET INTELLIGENCE LAYER™ (Built Apr 3, 2026)

### 3 Core Outputs

**1. EmergingHotspot — per zip code:**
| Signal | Range | Source |
|--------|-------|--------|
| `demandScore` | 0-100 | Avg listing quality + listing density |
| `momentumScore` | 0-100 | Velocity (rising/stable/cooling) |
| `scarcityScore` | 0-100 | Few listings = high scarcity |
| `conversionScore` | 0-100 | Unlock rate signal |
| `overallScore` | 0-100 | Weighted composite of all 4 |

**2. ZipClassification:** `HOT` · `WARM` · `COLD` · `EMERGING`

**3. HotspotAction per zip:** `act_fast` · `unlock` · `watch`

**Deal Type Conversion Metrics:**
- Per deal type: `unlockRate`, `avgTimeOnPage`, `avgDaysToUnlock`, `topZip`, `conversionRate`
- Sorted by which deal types convert best

**Market Report aggregates:**
- `topHotspot` — #1 ranked zip
- `dealTypePerformance[]` — all 5 deal types ranked by conversion
- `emergingZones[]` — rising + emerging zips
- `coolingZones[]` — decelerating zips

**Simulation note:** Currently simulated from listing data. Replace with real Supabase analytics queries for live demand signals.

**Output location:** `EmergingHotspotsPanel.tsx` on `/deals` page, 3-tab interface (Hotspot Zones / Zip Demand / Deal Types)

---

## AUTONOMOUS DEAL DROP ENGINE™ (Built Apr 3, 2026)

### What It Does
Fully autonomous weekly cycle — no manual intervention required.

**Cron:** Every Monday at 9 AM (configurable in `vercel.json`)

### Cycle Steps
1. Scan all listings → compute opportunity scores
2. Rank by composite selection score (score + scarcity + early discovery + time sensitivity)
3. Select top 5 deals
4. Generate content: headline, one-liner, summary, best-for, watch-out, angle
5. Persist deal drop to `public/deal-drop.json` + global cache
6. Generate HTML + text email digest
7. Send to all active unlock users (or queue if no email provider configured)

### Deal Selection Formula
```
Selection Score = (Opportunity Score × 0.75) + (Scarcity × 0.10) + (Early Discovery × 0.08) + (Time Sensitivity × 0.07) + Acquisition Ease Bonus
```

### Output
- `previewDeals[0..2]` — shown free on `/deals` + email teasers
- `selectedDeals[0..4]` — behind paywall
- `DealDropReport` — avg score, top zip, scarcity insight, operator note
- Email digest — full HTML template + text version

### Operator Override
- Manual trigger: `POST /api/deal-drop/run` with `Authorization: Bearer <CRON_SECRET>`
- Operator notes when scores are low or high — signals whether to send or review

### Files
- `src/lib/proprietary/deal-drop.ts` — engine + email template generator
- `src/app/api/deal-drop/run/route.ts` — cron endpoint
- `vercel.json` — cron schedule config
- `public/deal-drop.json` — latest deal drop (generated at build)

---

## ACQUISITION SYSTEM (Built Apr 3, 2026)

### Acquisition CTA Flow
Every listing card has "Get help ↗" button that expands an inline acquisition form — no page change, no friction.

**Form fields (2 steps):**
1. **Interest step:** Budget range (5 tiers from "Under $500" to "$5,000+"), seriousness level (browsing → committed), timeline
2. **Contact step:** Name, email, phone (optional) — only shown after interest selected

**No account required. No payment required to submit.**

### Lead API
- `POST /api/acquisition/lead` — submit lead (public, no auth)
- `GET /api/acquisition/lead` — list leads (operator, Bearer token)

**Tracked fields:** name, email, phone, budget_cents, budget_display, interest_level, timeline, listing_id, zip_code, deal_score, session_id, utm params

**Lead status flow:** `new → contacted → qualified → interested → enrolled → closed`

### Group Deal Pages
- `GET /group-deal/[id]` — public group deal page for any listing
- `GET /api/acquisition/group-deal?listing_id=xxx` — group deal data

**Eligible if:** score >= 65 AND total cost <= $15,000

**Deal structure:**
- Listing price + 25% acquisition overhead = total group cost
- Split across 5-10 participants depending on total
- Cost per person: $X — what each participant pays

**Page includes:** cost breakdown, why this deal, how pooling works, risks, join CTA

### Analytics Events
New event types tracked: `acquisition_form_open`, `acquisition_form_submit`

### Supabase Schema
`supabase/acquisition-schema.sql` — run in Supabase SQL Editor:
- `nlds_acquisition_leads` — all leads
- `nlds_group_deals` — group deal structures
- `nlds_lead_activity` — activity log per lead

### Files
- `src/components/acquisition/AcquisitionForm.tsx`
- `src/components/acquisition/GroupDealCTA.tsx`
- `src/app/api/acquisition/lead/route.ts`
- `src/app/api/acquisition/group-deal/route.ts`
- `src/app/group-deal/[id]/page.tsx`
- `supabase/acquisition-schema.sql`

---

*Updated April 3, 2026 — Acquisition System Added*

---

## ACQUISITION SYSTEM (Built Apr 3, 2026)

### 1. Acquisition CTA (Every Listing Card)
- "Get help ↗" button on each PreviewCard → expands inline 2-step form
- No page navigation. No friction. No account required.

### 2. Intake Form (2 Steps)
**Step 1 — Interest:**
- Budget: Under $500 / $500–$1,500 / $1,500–$3,000 / $3,000–$5,000 / $5,000+
- Seriousness: Just browsing / Actively researching / Ready to move fast / Ready to buy now
- Timeline: ASAP / 1–3 months / 3–6 months / Flexible

**Step 2 — Contact:**
- Name + Email (required), Phone (optional)

### 3. Lead API
- `POST /api/acquisition/lead` — public, no auth
- `GET /api/acquisition/lead` — operator only (Bearer token)
- Supabase table: `nlds_acquisition_leads`
- Fields: name, email, phone, budget_cents, budget_display, interest_level, timeline, listing_id, zip_code, deal_score, session_id, utm params

### 4. Group Deal Pages
- URL: `/group-deal/[id]`
- Shows for any listing with score ≥ 65 and total cost ≤ $15,000
- Cost = listing price + 25% acquisition overhead
- Split across 5–10 participants
- Shows: cost breakdown, why this deal, 5-step process, risks, join CTA

### 5. Analytics Events
New: `acquisition_form_open`, `acquisition_form_submit`

### 6. Supabase Schema
`supabase/acquisition-schema.sql` — 3 tables:
- `nlds_acquisition_leads` — all leads
- `nlds_group_deals` — group deal tracking
- `nlds_lead_activity` — per-lead activity log

---

## ACQUISITION SYSTEM (Built Apr 3, 2026)
- Every listing card has "Get help ↗" → inline 2-step form (no page change)
- Step 1: Budget + seriousness + timeline; Step 2: Name + email
- No account required. No payment to submit.
- API: `POST /api/acquisition/lead` (public), `GET /api/acquisition/lead` (operator)
- Supabase: `nlds_acquisition_leads`, `nlds_group_deals`, `nlds_lead_activity`
- Group deal pages at `/group-deal/[id]` — eligible if score≥65 and total≤$15K
- Analytics events: `acquisition_form_open`, `acquisition_form_submit`
## AUTONOMOUS DEAL DROP ENGINE™ (Built Apr 3, 2026)
- Weekly cron: scans 30 listings, scores, selects top 5, generates content + email
- Cron config: `vercel.json` — every Monday 9 AM
- API: `POST /api/deal-drop/run` (auth required), `GET /api/deal-drop`
- Persists to `public/deal-drop.json`; global cache for serverless
## ANALYTICS + OPERATOR DAILY CHECK
- `POST /api/analytics` — all events tracked to Supabase or in-memory
- `GET /api/system-status` — revenue readiness, email status, user activity, system health
## REVENUE STATUS
- Stripe: LIVE mode ready (needs sk_live key + webhook secret)
- Email: dispatch loop built (needs RESEND_API_KEY or similar)
- Supabase: schema ready to load from `supabase/acquisition-schema.sql`
- Vercel: deploy + add env vars to activate everything

---

## LEARN CENTER (Built Apr 3, 2026)

### Land Patents Explained Module (`/learn/land-patents-explained`)
Premium educational module — 7 sections, historically grounded, legally accurate.

**Sections:**
1. What a Land Patent Is — formal definition, key legal distinction from deed
2. How Land Patents Started — timeline of major acts (1785–1900s), 1.3B acres transferred
3. Land Patent vs. Deed vs. Title Chain — comparison table + chain-of-title explanation
4. Why People Still Research Them — 6 legitimate use cases (heir property, quiet title, adverse possession, conservation, Native claims, BLM search)
5. What Land Patents Do NOT Automatically Do — myth busting (mortgage elimination, tax evasion, "free and clear" ownership claims)
6. How This Fits Into Responsible Parcel Research — 6-step research framework
7. Related Topics — 6 coming-soon modules listed

**Tone:** Clear, grounded, trustworthy, serious. No sensational framing. Disclaimer banner on every page.

### Learn Center Index (`/learn`)
- Module grid: available now + coming soon
- 9 modules planned total; Module 4 (Land Patents) live
- Links to: `/learn/land-patents-explained`

### Navigation
- Home page: "Learn" pill in header → `/learn`
- Deals page: slim nav bar with "Deals" + "Learn" + "Unlock access"
