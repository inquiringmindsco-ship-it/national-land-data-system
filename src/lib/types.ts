// ============================================================
// NATIONAL LAND DATA SYSTEM — CORE TYPES
// ============================================================

export type PropertyType = 'TAX_DEED_EQUIVALENT' | 'TAX_LIEN' | 'GOVERNMENT_LAND';

export interface Listing {
  id: string;
  address: string;
  city: string;
  state: string;
  zipCode?: string;
  county?: string;
  propertyType: PropertyType | string;
  originalLabel?: string;       // e.g. "Adjudicated Property"
  normalizedSummary?: string;    // e.g. "Vacant property available due to unpaid taxes"
  price: number | null;        // in cents
  startingBid: number | null;  // in cents
  auctionDate: string | null;  // ISO date
  sourceLink?: string;
  sourceName?: string;
  source?: string;
  sourceUrl?: string;
  scrapedAt?: string;
  listedAt?: string;
  // Land-specific fields
  acreage?: number;
  lotSize?: string;
  landArea?: string;
  // Enrichment fields
  neighborhood?: string;
  parcelId?: string;
  assessedValue?: number;      // cents — conservative land value estimate
  annualTaxes?: number;        // cents — annual property tax owed
  zoning?: string;
  useType?: string;
  occupancyStatus?: 'vacant' | 'occupied' | 'unknown';
  // Access & utilities
  roadAccess?: boolean;
  waterAccess?: boolean;
  utilities?: boolean;
  hasElectric?: boolean;
  hasWater?: boolean;
  hasSeptic?: boolean;
  // Financing
  ownerFinancing?: boolean;
  financingTerms?: string;
  // Location
  lat?: number;
  latitude?: number;
  lon?: number;
  longitude?: number;
  sqft?: string;
  frontage?: string;
  sideLotEligible?: boolean;
  ward?: string;
  usage?: string;
  mapEmbedUrl?: string;  // Google Maps search URL
  mapImageUrl?: string;  // Static OSM tile URL
  // Media
  images?: string[];
  tags?: string[];
  rawData?: Record<string, unknown>;
}

export interface CityConfig {
  id: string;
  name: string;
  state: string;
  timezone: string;
  sources: CitySource[];
  parser: string;
  updateFrequencyHours: number;
  enabled: boolean;
}

export interface CitySource {
  name: string;
  url: string;
  type: 'api' | 'scraper' | 'csv' | 'json';
  auth?: { type: 'none' | 'basic' | 'bearer'; credentials?: Record<string, string> };
  rateLimitMs?: number;
}

export interface SearchQuery {
  raw: string;
  normalized: PropertyType[];
  city?: string;
  state?: string;
  minPrice?: number;
  maxPrice?: number;
  includeSold?: boolean;
}

export interface SearchResult {
  listing: Listing;
  score: number;
  matchedOn: string[];
}

// ============================================================
// PROPERTY TYPE DEFINITIONS
// ============================================================

export const PROPERTY_TYPE_MAP: Record<string, PropertyType> = {
  'tax deed': 'TAX_DEED_EQUIVALENT',
  'tax sale': 'TAX_DEED_EQUIVALENT',
  'adjudicated property': 'TAX_DEED_EQUIVALENT',
  'adjudicated': 'TAX_DEED_EQUIVALENT',
  'sheriff sale': 'TAX_DEED_EQUIVALENT',
  "sheriff's sale": 'TAX_DEED_EQUIVALENT',
  'tax foreclosure': 'TAX_DEED_EQUIVALENT',
  'foreclosure sale': 'TAX_DEED_EQUIVALENT',
  'delinquent tax': 'TAX_DEED_EQUIVALENT',
  'tax lien sale': 'TAX_DEED_EQUIVALENT',
  'judicial sale': 'TAX_DEED_EQUIVALENT',
  'public auction': 'TAX_DEED_EQUIVALENT',
  'overdue tax': 'TAX_DEED_EQUIVALENT',
  'tax lien': 'TAX_LIEN',
  'lien certificate': 'TAX_LIEN',
  'tax certificate': 'TAX_LIEN',
  'lien sale': 'TAX_LIEN',
  'land bank': 'GOVERNMENT_LAND',
  'redevelopment authority': 'GOVERNMENT_LAND',
  'surplus land': 'GOVERNMENT_LAND',
  'city land': 'GOVERNMENT_LAND',
  'municipal land': 'GOVERNMENT_LAND',
  'blight removal': 'GOVERNMENT_LAND',
  'vacant property program': 'GOVERNMENT_LAND',
  'community development': 'GOVERNMENT_LAND',
  'housing authority': 'GOVERNMENT_LAND',
  'lra parcel': 'GOVERNMENT_LAND',
  'lra': 'GOVERNMENT_LAND',
};

export const SUMMARY_TEMPLATES: Record<PropertyType, (d: Partial<Listing>) => string> = {
  TAX_DEED_EQUIVALENT: (d) =>
    `Vacant property available due to unpaid taxes${d.auctionDate ? ` — auction ${d.auctionDate}` : ''}`,
  TAX_LIEN: (d) =>
    `Tax lien certificate — investor opportunity${d.price ? ` — ${formatCents(d.price)}` : ''}`,
  GOVERNMENT_LAND: (d) =>
    `City-owned land available through government program${d.price ? ` — ${formatCents(d.price)}` : ''}`,
};

export function formatCents(cents: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(cents / 100);
}
