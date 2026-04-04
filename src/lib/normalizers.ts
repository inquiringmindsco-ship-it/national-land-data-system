import { PropertyType, PROPERTY_TYPE_MAP, SUMMARY_TEMPLATES, formatCents, Listing } from './types';

export { PROPERTY_TYPE_MAP, SUMMARY_TEMPLATES, formatCents };

// Human-readable labels
export const PROPERTY_LABELS: Record<PropertyType, string> = {
  TAX_DEED_EQUIVALENT: 'Tax Deed / Sheriff Sale',
  TAX_LIEN: 'Tax Lien Certificate',
  GOVERNMENT_LAND: 'Government / Land Bank',
};

// Normalize raw user query to types + summary
export function normalizeQuery(raw: string): { types: PropertyType[]; summary: string } {
  const lower = raw.toLowerCase().trim();
  const types = new Set<PropertyType>();

  for (const [keyword, type] of Object.entries(PROPERTY_TYPE_MAP)) {
    if (lower.includes(keyword)) types.add(type);
  }

  const typeList = Array.from(types);
  const summary = typeList.length
    ? `Showing ${typeList.map(t => PROPERTY_LABELS[t]).join(' + ')} listings`
    : 'Showing all property listings';

  return { types: typeList, summary };
}

// Format listing for display
export function formatListingSummary(listing: Listing): string {
  const parts: string[] = [];

  if (listing.price) {
    parts.push(formatCents(listing.price));
  } else if (listing.startingBid) {
    parts.push(`Starting bid: ${formatCents(listing.startingBid)}`);
  } else {
    parts.push('Price TBD');
  }

  if (listing.auctionDate) {
    parts.push(`Auction: ${listing.auctionDate}`);
  }

  return parts.join(' · ');
}

// Export all listings as CSV
export function exportToCSV(listings: Listing[]): string {
  const headers = ['Address', 'City', 'State', 'Zip', 'Type', 'Original Label', 'Summary', 'Price', 'Starting Bid', 'Auction Date', 'Source Link'];
  const rows = listings.map(l => [
    `"${l.address}"`,
    `"${l.city}"`,
    l.state,
    l.zipCode ?? '',
    l.propertyType,
    `"${l.originalLabel}"`,
    `"${l.normalizedSummary}"`,
    l.price ? formatCents(l.price) : '',
    l.startingBid ? formatCents(l.startingBid) : '',
    l.auctionDate ?? '',
    l.sourceLink,
  ].join(','));

  return [headers.join(','), ...rows].join('\n');
}
