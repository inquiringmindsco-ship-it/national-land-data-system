import { CityConfig, Listing, PropertyType, PROPERTY_TYPE_MAP } from './types';

// ============================================================
// SEARCH ENGINE — normalizes user query → searches listings
// ============================================================

export interface UserSearchIntent {
  rawQuery: string;
  normalizedTypes: PropertyType[];
  city?: string;
  state?: string;
  minPrice?: number;
  maxPrice?: number;
  intent: 'browse' | 'search' | 'browse_city';
}

const INTENT_KEYWORDS: Record<string, string[]> = {
  browse: ['all', 'list', 'show me', 'browse', 'everything', 'all listings'],
  browse_city: ['in ', ' from ', ' around '],
  search: ['find', 'search', 'look for', 'looking'],
};

const TYPE_KEYWORDS: Record<string, string> = {
  'tax deed': 'TAX_DEED_EQUIVALENT',
  'tax sale': 'TAX_DEED_EQUIVALENT',
  'adjudicated': 'TAX_DEED_EQUIVALENT',
  'sheriff sale': 'TAX_DEED_EQUIVALENT',
  'foreclosure': 'TAX_DEED_EQUIVALENT',
  'cheap land': 'TAX_DEED_EQUIVALENT',
  'land auction': 'TAX_DEED_EQUIVALENT',
  'tax lien': 'TAX_LIEN',
  'lien certificate': 'TAX_LIEN',
  'land bank': 'GOVERNMENT_LAND',
  'government land': 'GOVERNMENT_LAND',
  'city land': 'GOVERNMENT_LAND',
  'surplus land': 'GOVERNMENT_LAND',
  'redevelopment': 'GOVERNMENT_LAND',
};

const PRICE_PATTERN = /\$[\d,]+(?:\.\d{2})?|\d+\s*(?:k|K|thousand|million|M)/g;

export function parseSearchIntent(raw: string): UserSearchIntent {
  const lower = raw.toLowerCase().trim();

  // Detect type
  const types = new Set<PropertyType>();
  for (const [keyword, type] of Object.entries(TYPE_KEYWORDS)) {
    if (lower.includes(keyword)) types.add(type as PropertyType);
  }

  // Detect price range
  let minPrice: number | undefined;
  let maxPrice: number | undefined;
  const priceMatches = lower.match(PRICE_PATTERN);
  if (priceMatches) {
    for (const m of priceMatches) {
      const num = parseFloat(m.replace(/[$,KkMmillion]/g, ''));
      if (m.toLowerCase().includes('k') || m.toLowerCase().includes('thousand')) {
        if (!minPrice) minPrice = num * 1000 * 100;
        else maxPrice = num * 1000 * 100;
      } else if (m.toLowerCase().includes('m') || m.toLowerCase().includes('million')) {
        if (!minPrice) minPrice = num * 1000000 * 100;
      } else {
        const cents = num * 100;
        if (cents < 100_000) { // under $100k → likely max price
          maxPrice = cents;
        } else {
          minPrice = cents;
        }
      }
    }
  }

  // Detect city/state (simple heuristic: last word or comma-separated)
  let city: string | undefined;
  let state: string | undefined;
  const cityStateMatch = lower.match(/\bin\s+([a-z\s]+?)(?:,?\s*([a-z]{2}))?$/i);
  if (cityStateMatch) {
    city = cityStateMatch[1].trim();
    state = cityStateMatch[2]?.toUpperCase();
  }

  // Detect intent
  let intent: UserSearchIntent['intent'] = 'search';
  if (INTENT_KEYWORDS.browse.some(k => lower.includes(k))) intent = 'browse';
  else if (INTENT_KEYWORDS.browse_city.some(k => lower.includes(k))) intent = 'browse_city';

  return {
    rawQuery: raw,
    normalizedTypes: Array.from(types),
    city,
    state,
    minPrice: minPrice ? Math.round(minPrice) : undefined,
    maxPrice: maxPrice ? Math.round(maxPrice) : undefined,
    intent,
  };
}

// Query string normalizer for URL params
export function buildSearchParams(intent: UserSearchIntent): URLSearchParams {
  const p = new URLSearchParams();
  if (intent.normalizedTypes.length) p.set('types', intent.normalizedTypes.join(','));
  if (intent.city) p.set('city', intent.city);
  if (intent.state) p.set('state', intent.state);
  if (intent.minPrice) p.set('minPrice', String(intent.minPrice));
  if (intent.maxPrice) p.set('maxPrice', String(intent.maxPrice));
  return p;
}

// ============================================================
// CITY REGISTRY
// ============================================================

export const CITIES: Record<string, CityConfig> = {
  'new-orleans': {
    id: 'new-orleans',
    name: 'New Orleans',
    state: 'LA',
    timezone: 'America/Chicago',
    enabled: true,
    updateFrequencyHours: 6,
    parser: 'new-orleans',
    sources: [
      { name: 'Jefferson Parish Tax Sale', url: 'https://www.jeffersonparish.gov/finance/tax-sale', type: 'scraper' },
      { name: 'Orleans Parish Sheriff Sales', url: 'https://opsj.org/sheriff-sales', type: 'scraper' },
      { name: 'NOLA Land Bank', url: 'https://nola.gov/nola/media/Property-Managment/Land-Bank/', type: 'scraper' },
    ],
  },
  'st-louis': {
    id: 'st-louis',
    name: 'St. Louis',
    state: 'MO',
    timezone: 'America/Chicago',
    enabled: true,
    updateFrequencyHours: 6,
    parser: 'st-louis',
    sources: [
      { name: 'St. Louis Land Bank (LRA)', url: 'https://www.stlouis-mo.gov/lra-property-portal.cfm', type: 'scraper' },
      { name: 'City of St. Louis Collector Tax Sale', url: 'https://www.stlouis-mo.gov/government/departments/collector/tax-sale.cfm', type: 'scraper' },
      { name: 'St. Louis City Sheriff Sales', url: 'https://opsj.org/sheriff-sales', type: 'scraper' },
      { name: 'St. Louis County Tax Sale', url: 'https://www.stlouisco.com/your-government/administrative/departments/office-of-the-collector', type: 'scraper' },
    ],
  },
  'baton-rouge': {
    id: 'baton-rouge',
    name: 'Baton Rouge',
    state: 'LA',
    timezone: 'America/Chicago',
    enabled: false,
    updateFrequencyHours: 12,
    parser: 'baton-rouge',
    sources: [
      { name: 'East Baton Rouge Sheriff', url: 'https://www.ebrso.org/tax-sale', type: 'scraper' },
    ],
  },
  'houston': {
    id: 'houston',
    name: 'Houston',
    state: 'TX',
    timezone: 'America/Chicago',
    enabled: false,
    updateFrequencyHours: 12,
    parser: 'houston',
    sources: [
      { name: 'Harris County Tax Office', url: 'https://www.hctax.net/foreclosures/search', type: 'scraper' },
    ],
  },
  'atlanta': {
    id: 'atlanta',
    name: 'Atlanta',
    state: 'GA',
    timezone: 'America/New_York',
    enabled: false,
    updateFrequencyHours: 24,
    parser: 'atlanta',
    sources: [
      { name: 'Fulton County Tax Commissioner', url: 'https://www.fultoncountyga.gov/tax', type: 'scraper' },
      { name: 'Atlanta Land Bank', url: 'https://www.atlantalandbank.org/', type: 'scraper' },
    ],
  },
  'detroit': {
    id: 'detroit',
    name: 'Detroit',
    state: 'MI',
    timezone: 'America/Detroit',
    enabled: false,
    updateFrequencyHours: 6,
    parser: 'detroit',
    sources: [
      { name: 'Wayne County Treasurer', url: 'https://www.waynecounty.com/treasurer/tax-foreclosure.aspx', type: 'scraper' },
      { name: 'Detroit Land Bank', url: 'https://detroitlandbank.org/', type: 'scraper' },
    ],
  },
};

export function getEnabledCities(): CityConfig[] {
  return Object.values(CITIES).filter(c => c.enabled);
}

export function getCityById(id: string): CityConfig | undefined {
  return CITIES[id];
}
