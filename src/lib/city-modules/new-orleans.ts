import { Listing, CityConfig, CitySource, SearchQuery, SearchResult, PROPERTY_TYPE_MAP, SUMMARY_TEMPLATES, formatCents } from '../types';

// ============================================================
// CITY MODULE TEMPLATE
// Copy this file for each new city, fill in sources + rules
// ============================================================

/*
  CITY MODULE GUIDE
  ─────────────────
  Each city module exports:
    - config: CityConfig
    - parseListing(raw: unknown): Listing | null
    - normalize(raw: unknown): Listing
    - search(query: SearchQuery, listings: Listing[]): SearchResult[]

  Parser guidelines:
    - Return null for malformed/irrelevant entries
    - Always set normalizedSummary via SUMMARY_TEMPLATES
    - Price in CENTS (integer)
    - Dates in ISO format (YYYY-MM-DD)
*/

// Example: New Orleans, LA
export const newOrleansConfig: CityConfig = {
  id: 'new-orleans',
  name: 'New Orleans',
  state: 'LA',
  timezone: 'America/Chicago',
  enabled: true,
  updateFrequencyHours: 6,
  parser: 'new-orleans',
  sources: [
    {
      name: 'Jefferson Parish Tax Sale',
      url: 'https://www.jeffersonparish.gov/finance/tax-sale',
      type: 'scraper',
    },
    {
      name: 'Orleans Parish Sheriff Sales',
      url: 'https://opsj.org/sheriff-sales',
      type: 'scraper',
    },
    {
      name: 'City of New Orleans Land Bank',
      url: 'https://nola.gov/nola/media/Property-Managment/Land-Bank/',
      type: 'scraper',
    },
  ],
};

// ============================================================
// PARSER — Jefferson Parish Tax Sale
// ============================================================
export function parseJeffersonParish(raw: Record<string, unknown>): Listing | null {
  try {
    const address = String(raw.property_address || raw.address || '');
    if (!address) return null;

    const price = parsePrice(raw.minimum_bid || raw.starting_bid);
    const auctionDate = parseDate(raw.sale_date || raw.auction_date);
    const originalLabel = String(raw.listing_type || raw.type || 'Tax Sale');

    return {
      id: `jp-${String(raw.parcel_id || raw.property_id || '').replace(/\s+/g, '-').toLowerCase()}`,
      address,
      city: 'Metairie',
      state: 'LA',
      zipCode: String(raw.zip || ''),
      propertyType: detectPropertyType(originalLabel),
      originalLabel,
      normalizedSummary: buildSummary(detectPropertyType(originalLabel), { auctionDate, price }),
      price,
      startingBid: price,
      auctionDate,
      sourceLink: String(raw.source_url || ''),
      sourceName: 'Jefferson Parish Tax Sale',
      scrapedAt: new Date().toISOString(),
      rawData: raw,
    };
  } catch {
    return null;
  }
}

// ============================================================
// PARSER — Orleans Parish Sheriff Sales
// ============================================================
export function parseOrleansSheriff(raw: Record<string, unknown>): Listing | null {
  try {
    const address = String(raw.address || raw.location || '');
    if (!address) return null;

    const price = parsePrice(raw.upset_price || raw.minimum_bid || raw.starting_bid);
    const auctionDate = parseDate(raw.sale_date || raw.auction_date);
    const originalLabel = 'Sheriff Sale';

    return {
      id: `ops-${String(raw.case_number || raw.case_no || '').replace(/\s+/g, '-').toLowerCase()}`,
      address,
      city: 'New Orleans',
      state: 'LA',
      zipCode: String(raw.zip || ''),
      propertyType: detectPropertyType(originalLabel),
      originalLabel,
      normalizedSummary: buildSummary('TAX_DEED_EQUIVALENT', { auctionDate, price }),
      price,
      startingBid: price,
      auctionDate,
      sourceLink: String(raw.notice_url || raw.source_url || ''),
      sourceName: 'Orleans Parish Sheriff Sales',
      scrapedAt: new Date().toISOString(),
      rawData: raw,
    };
  } catch {
    return null;
  }
}

// ============================================================
// PARSER — NOLA Land Bank
// ============================================================
export function parseNLOLandBank(raw: Record<string, unknown>): Listing | null {
  try {
    const address = String(raw.address || raw.location || '');
    if (!address) return null;

    const price = parsePrice(raw.price || raw.list_price || raw.amount);
    const originalLabel = 'Land Bank';
    const propertyType = 'GOVERNMENT_LAND';

    return {
      id: `nola-lb-${String(raw.id || raw.property_id || address).replace(/\s+/g, '-').toLowerCase()}`,
      address,
      city: 'New Orleans',
      state: 'LA',
      zipCode: String(raw.zip || ''),
      propertyType,
      originalLabel,
      normalizedSummary: buildSummary(propertyType, { price }),
      price,
      startingBid: null,
      auctionDate: null,
      sourceLink: String(raw.link || raw.url || ''),
      sourceName: 'City of New Orleans Land Bank',
      scrapedAt: new Date().toISOString(),
      rawData: raw,
    };
  } catch {
    return null;
  }
}

// ============================================================
// SHARED UTILITIES
// ============================================================

export function detectPropertyType(label: string): import('../types').PropertyType {
  const lower = label.toLowerCase();
  for (const [key, value] of Object.entries(PROPERTY_TYPE_MAP)) {
    if (lower.includes(key)) return value;
  }
  return 'TAX_DEED_EQUIVALENT'; // default assumption
}

export function parsePrice(value: unknown): number | null {
  if (!value) return null;
  const str = String(value).replace(/[$,\s]/g, '');
  const num = parseFloat(str);
  if (isNaN(num)) return null;
  // If it looks like dollars (not cents), convert to cents
  return num < 1000 ? Math.round(num * 100) : Math.round(num);
}

export function parseDate(value: unknown): string | null {
  if (!value) return null;
  try {
    const d = new Date(String(value));
    if (isNaN(d.getTime())) return null;
    return d.toISOString().split('T')[0];
  } catch {
    return null;
  }
}

export function buildSummary(
  type: import('../types').PropertyType,
  data: { auctionDate?: string | null; price?: number | null }
): string {
  return SUMMARY_TEMPLATES[type]({ auctionDate: data.auctionDate ?? null, price: data.price ?? null });
}

// ============================================================
// SEARCH — filter + score listings against query
// ============================================================

export function searchListings(query: SearchQuery, listings: Listing[]): SearchResult[] {
  const queryTypes = query.normalized.length > 0
    ? query.normalized
    : (Object.keys(PROPERTY_TYPE_MAP) as (keyof typeof PROPERTY_TYPE_MAP)[])
        .filter(k => query.raw.toLowerCase().includes(k))
        .map(k => PROPERTY_TYPE_MAP[k])
        .filter((v, i, a) => a.indexOf(v) === i);

  const cityLower = query.city?.toLowerCase();
  const stateLower = query.state?.toLowerCase();

  return listings
    .filter(l => {
      if (!query.includeSold && (l as any).sold) return false;
      if (cityLower && !l.city.toLowerCase().includes(cityLower)) return false;
      if (stateLower && l.state.toLowerCase() !== stateLower) return false;
      if (query.minPrice && (!l.price || l.price < query.minPrice)) return false;
      if (query.maxPrice && (!l.price || l.price > query.maxPrice)) return false;
      return true;
    })
    .map(l => {
      const matchedOn: string[] = [];
      let score = 50;

      if (queryTypes.includes(l.propertyType)) {
        score += 40;
        matchedOn.push(`type:${l.propertyType}`);
      }
      if (cityLower && l.city.toLowerCase().includes(cityLower)) {
        score += 10;
        matchedOn.push(`city:${l.city}`);
      }
      if (query.minPrice && l.price && l.price >= query.minPrice) {
        score += 5;
        matchedOn.push('price:min');
      }
      if (query.maxPrice && l.price && l.price <= query.maxPrice) {
        score += 5;
        matchedOn.push('price:max');
      }

      return { listing: l, score: Math.min(100, score), matchedOn };
    })
    .filter(r => r.score > 50)
    .sort((a, b) => b.score - a.score);
}
