import { Listing } from './types';

export interface ScraperResult {
  listings: Listing[];
  errors: string[];
  scrapedAt: string;
}

export interface ScraperConfig {
  name: string;
  url: string;
  type: 'api' | 'scraper' | 'csv' | 'json';
  parser: string;
  rateLimitMs?: number;
}

// ============================================================
// SCRAPER REGISTRY — maps city → scraper configs
// ============================================================

export const SCRAPER_REGISTRY: Record<string, ScraperConfig[]> = {
  'new-orleans': [
    {
      name: 'Jefferson Parish Tax Sale',
      url: 'https://www.jeffersonparish.gov/finance/tax-sale',
      type: 'scraper',
      parser: 'parseJeffersonParish',
      rateLimitMs: 5000,
    },
    {
      name: 'Orleans Parish Sheriff Sales',
      url: 'https://opsj.org/sheriff-sales',
      type: 'scraper',
      parser: 'parseOrleansSheriff',
      rateLimitMs: 5000,
    },
    {
      name: 'NOLA Land Bank',
      url: 'https://nola.gov/nola/media/Property-Managment/Land-Bank/',
      type: 'scraper',
      parser: 'parseNLOLandBank',
      rateLimitMs: 5000,
    },
  ],
  'st-louis': [
    {
      name: 'St. Louis Land Bank (LRA)',
      url: 'https://www.stlouis-mo.gov/lra-property-portal.cfm',
      type: 'scraper',
      parser: 'parseStLouisLRA',
      rateLimitMs: 5000,
    },
    {
      name: 'City of St. Louis Collector Tax Sale',
      url: 'https://www.stlouis-mo.gov/government/departments/collector/tax-sale.cfm',
      type: 'scraper',
      parser: 'parseStLouisTaxSale',
      rateLimitMs: 5000,
    },
    {
      name: 'St. Louis City Sheriff Sales',
      url: 'https://opsj.org/sheriff-sales',
      type: 'scraper',
      parser: 'parseStLouisSheriff',
      rateLimitMs: 5000,
    },
    {
      name: 'St. Louis County Tax Sale',
      url: 'https://www.stlouisco.com/your-government/administrative/departments/office-of-the-collector',
      type: 'scraper',
      parser: 'parseStLouisCountyTaxSale',
      rateLimitMs: 5000,
    },
  ],
  'baton-rouge': [
    {
      name: 'East Baton Rouge Sheriff Tax Sale',
      url: 'https://www.ebrso.org/tax-sale',
      type: 'scraper',
      parser: 'parseBatonRouge',
      rateLimitMs: 5000,
    },
  ],
  'houston': [
    {
      name: 'Harris County Tax Foreclosures',
      url: 'https://www.hctax.net/foreclosures/search',
      type: 'scraper',
      parser: 'parseHarrisCounty',
      rateLimitMs: 5000,
    },
  ],
  'atlanta': [
    {
      name: 'Fulton County Tax Sale',
      url: 'https://www.fultoncountyga.gov/tax',
      type: 'scraper',
      parser: 'parseFultonCounty',
      rateLimitMs: 5000,
    },
    {
      name: 'Atlanta Land Bank Authority',
      url: 'https://www.atlantalandbank.org/',
      type: 'scraper',
      parser: 'parseAtlantaLandBank',
      rateLimitMs: 5000,
    },
  ],
  'detroit': [
    {
      name: 'Wayne County Tax Foreclosure',
      url: 'https://www.waynecounty.com/treasurer/tax-foreclosure.aspx',
      type: 'scraper',
      parser: 'parseWayneCounty',
      rateLimitMs: 5000,
    },
    {
      name: 'Detroit Land Bank Authority',
      url: 'https://detroitlandbank.org/',
      type: 'scraper',
      parser: 'parseDetroitLandBank',
      rateLimitMs: 5000,
    },
  ],
  // ──────────────────────────────────────────────────────────────
  // MISSISSIPPI EXTENSION — Land Out of Thin Air™
  // ──────────────────────────────────────────────────────────────
  'mississippi': [
    {
      name: 'Franklin County Tax Sale',
      url: 'https://www.franklincountyms.com/tax-collector',
      type: 'scraper',
      parser: 'parseFranklinCountyTaxSale',
      rateLimitMs: 5000,
    },
    {
      name: 'Jefferson County Tax Sale',
      url: 'https://www.jeffersoncountyms.com/tax-collector',
      type: 'scraper',
      parser: 'parseJeffersonCountyTaxSale',
      rateLimitMs: 5000,
    },
    {
      name: 'Claiborne County Tax Sale',
      url: 'https://www.claibornecountyms.org/tax-collector',
      type: 'scraper',
      parser: 'parseClaiborneCountyTaxSale',
      rateLimitMs: 5000,
    },
    {
      name: 'Copiah County Tax Sale',
      url: 'https://www.copiahcounty.org/tax-collector',
      type: 'scraper',
      parser: 'parseCopiahCountyTaxSale',
      rateLimitMs: 5000,
    },
    {
      name: 'Mississippi LandWatch FSBO',
      url: 'https://www.landwatch.com/mississippi-land-for-sale',
      type: 'scraper',
      parser: 'parseLandWatchMS',
      rateLimitMs: 10000,
    },
    {
      name: 'Mississippi LandSearch Unrestricted',
      url: 'https://www.landsearch.com/unrestricted/mississippi',
      type: 'scraper',
      parser: 'parseLandSearchMS',
      rateLimitMs: 10000,
    },
  ],
};

// ============================================================
// FETCH + PARSE WORKFLOW
// ============================================================

export async function fetchAndParse(
  cityId: string,
  parserFns: Record<string, (raw: unknown) => Listing | null>
): Promise<ScraperResult> {
  const scrapers = SCRAPER_REGISTRY[cityId] ?? [];
  const allListings: Listing[] = [];
  const errors: string[] = [];

  for (const scraper of scrapers) {
    try {
      // In production: use puppeteer/cheerio for scrapers, fetch for APIs
      // For now, mark as pending real implementation
      console.log(`[scraper] Would fetch: ${scraper.url} with parser: ${scraper.parser}`);
      // const raw = await fetchSource(scraper);
      // const parser = parserFns[scraper.parser];
      // if (parser) {
      //   const parsed = parser(raw);
      //   if (parsed) allListings.push(parsed);
      // }
    } catch (err) {
      errors.push(`${scraper.name}: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  return { listings: allListings, errors, scrapedAt: new Date().toISOString() };
}

// ============================================================
// EXAMPLE PARSER — paste in city module, implement per-source
// ============================================================

export function exampleParser(raw: unknown): Listing | null {
  // TODO: Implement actual scraping logic per source
  // This is where you'd use cheerio, puppeteer, or API client
  return null;
}
