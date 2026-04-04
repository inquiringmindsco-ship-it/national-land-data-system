// ============================================================
// ST. LOUIS, MO — CITY MODULE
// St. Louis Land Reutilization Authority (LRA) + Tax Delinquent
// ============================================================

import { CityConfig, Listing, PropertyType } from '../types';

// ============================================================
// CONFIGURATION
// ============================================================

export const stLouisConfig: CityConfig = {
  id: 'st-louis',
  name: 'St. Louis',
  state: 'MO',
  timezone: 'America/Chicago',
  enabled: true,
  updateFrequencyHours: 6,
  parser: 'st-louis',
  sources: [
    {
      name: 'City of St. Louis Collector Tax Sale',
      url: 'https://www.stlouis-mo.gov/government/departments/collector/tax-sale.cfm',
      type: 'scraper',
    },
    {
      name: 'St. Louis Land Bank (LRA)',
      url: 'https://www.stlouis-mo.gov/lra-property-portal.cfm',
      type: 'scraper',
    },
    {
      name: 'St. Louis County Tax Sale',
      url: 'https://www.stlouisco.com/your-government/administrative/departments/office-of-the-collector',
      type: 'scraper',
    },
    {
      name: 'St. Louis City Assessor',
      url: 'https://www.stlouis-mo.gov/assessor/',
      type: 'scraper',
    },
  ],
};

// ============================================================
// KNOWN STL VACANT PROPERTY PATTERNS
// These neighborhoods have the highest concentration of
// LRA/tax-delinquent properties in St. Louis
// ============================================================

export const STL_NEIGHBORHOODS = {
  north: [
    'Ferguson', 'Jennings', 'Pagedale', 'Vinita Park', 'Breckinridge PJ',
    'Northwoods', 'Bellefontaine Neighbors', 'Pasadena Hills', 'Glen Eagles',
    'Black Jack', 'Molton Acres', 'Wellsdale',
  ],
  south: [
    'Carondelet', 'Bevo Mill', 'St. George', 'Wilshire Park', 'Lindenwood Park',
    'Southampton', 'Ellendale', 'Clayson', 'Mount Pleasant',
  ],
  central: [
    'Downtown', 'Old North St. Louis', 'Old芋 neighborhood',
    'Benton Park', 'Compton Heights', 'Shaw', 'Tower Grove South',
    'Gravois Park', 'Carondelet', 'Mount Pleasant',
  ],
  east: [
    'French Village', 'University City', 'Pagedale',
    'Charleston', 'Baden', 'Mechanicsville',
  ],
} as const;

export const STLCITY_ZIPCODES = [
  '63101','63102','63103','63104','63106','63107','63108','63109','63110',
  '63111','63112','63113','63115','63116','63118','63120','63121','63123',
  '63125','63127','63129','63130','63133','63134','63135','63136','63137',
  '63138','63139','63140','63143','63147','63155',
] as const;

// ============================================================
// PARSERS — map raw scraped data to normalized listings
// ============================================================

export function parseStLouisLRA(raw: Record<string, unknown>): Listing | null {
  try {
    const address = String(raw.address || raw.street_address || raw.parcel_address || '');
    if (!address) return null;

    const price = parsePrice(raw.price || raw.minimum_bid || raw.opening_bid || raw.assessed_value);
    const auctionDate = parseDate(raw.auction_date || raw.sale_date || raw.tax_sale_date);
    const originalLabel = String(raw.listing_type || raw.type || 'LRA Parcel');
    const propertyType = detectPropertyType(originalLabel);

    return {
      id: `stl-lra-${String(raw.parcel_id || raw.property_id || raw.id || address).replace(/[^a-z0-9]/gi, '-').toLowerCase().slice(0, 40)}`,
      address,
      city: 'St. Louis',
      state: 'MO',
      zipCode: String(raw.zip || raw.zipcode || ''),
      propertyType,
      originalLabel,
      normalizedSummary: buildSummary(propertyType, { auctionDate, price }),
      price,
      startingBid: price,
      auctionDate,
      sourceLink: String(raw.source_url || raw.url || ''),
      sourceName: 'St. Louis Land Bank (LRA)',
      scrapedAt: new Date().toISOString(),
      rawData: raw,
    };
  } catch {
    return null;
  }
}

export function parseStLouisCountyTaxSale(raw: Record<string, unknown>): Listing | null {
  try {
    const address = String(raw.address || raw.property_address || '');
    if (!address) return null;

    const price = parsePrice(raw.minimum_bid || raw.upset_price || raw.starting_bid);
    const auctionDate = parseDate(raw.sale_date || raw.auction_date);
    const originalLabel = String(raw.type || 'County Tax Sale');

    return {
      id: `stlco-${String(raw.parcel || raw.id || address).replace(/[^a-z0-9]/gi, '-').toLowerCase().slice(0, 40)}`,
      address,
      city: 'St. Louis',
      state: 'MO',
      zipCode: String(raw.zip || ''),
      propertyType: detectPropertyType(originalLabel),
      originalLabel,
      normalizedSummary: buildSummary('TAX_DEED_EQUIVALENT', { auctionDate, price }),
      price,
      startingBid: price,
      auctionDate,
      sourceLink: String(raw.url || ''),
      sourceName: 'St. Louis County Tax Sale',
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

export function detectPropertyType(label: string): PropertyType {
  const lower = label.toLowerCase();
  if (lower.includes('land bank') || lower.includes('lra') || lower.includes('reutilization')) {
    return 'GOVERNMENT_LAND';
  }
  if (lower.includes('tax lien') || lower.includes('lien certificate')) {
    return 'TAX_LIEN';
  }
  return 'TAX_DEED_EQUIVALENT';
}

export function parsePrice(value: unknown): number | null {
  if (!value) return null;
  const str = String(value).replace(/[$,\s]/g, '');
  const num = parseFloat(str);
  if (isNaN(num)) return null;
  // Prices under $1000 likely already in dollars, over in cents
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

export function buildSummary(type: PropertyType, data: { auctionDate?: string | null; price?: number | null }): string {
  const templates: Record<PropertyType, (d: typeof data) => string> = {
    TAX_DEED_EQUIVALENT: (d) =>
      `Vacant property available due to unpaid taxes${d.auctionDate ? ` — auction ${d.auctionDate}` : ''}`,
    TAX_LIEN: (d) =>
      `Tax lien certificate — investor opportunity${d.price ? ` — ${formatCents(d.price!)}` : ''}`,
    GOVERNMENT_LAND: (d) =>
      `City-controlled property available for acquisition${d.price ? ` — ${formatCents(d.price!)}` : ''}`,
  };
  return templates[type](data);
}

export function formatCents(cents: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);
}
