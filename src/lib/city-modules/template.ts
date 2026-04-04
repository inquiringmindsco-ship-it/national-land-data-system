/**
 * CITY MODULE TEMPLATE
 * ────────────────────
 * Copy this file to src/lib/city-modules/[city-id].ts
 * Fill in sources, parsing rules, implement the parsers.
 */

import { CityConfig, Listing, PropertyType } from '../types';

export const config: CityConfig = {
  id: '[city-id]',           // e.g. "baton-rouge"
  name: '[City Name]',       // e.g. "Baton Rouge"
  state: '[ST]',             // e.g. "LA"
  timezone: 'America/Chicago',
  enabled: false,            // Enable AFTER module is complete
  updateFrequencyHours: 12,
  parser: '[city-id]',
  sources: [
    {
      name: '[Source Name]',
      url: '[URL]',
      type: 'scraper',       // 'api' | 'scraper' | 'csv' | 'json'
    },
  ],
};

export function parseSource(raw: Record<string, unknown>): Listing | null {
  void raw;
  return null;
}
