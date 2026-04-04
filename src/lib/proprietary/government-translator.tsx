import type { Listing, PropertyType } from '../types';

export interface Translation {
  whatItMeans: string;
  whyValuable: string;
  watchOut: string;
  officialLabel: string;
}

const TERM_TRANSLATIONS: Record<string, { meaning: string; valuable: string; watchOut: string }> = {
  'lra parcel': {
    meaning: 'City-controlled property through the Land Reutilization Authority — the city owns it and is actively selling it',
    valuable: 'LRA properties often sell at significant discounts to market. City motivated to move inventory. Usually clear title or title cure process provided.',
    watchOut: 'Properties sold as-is. May have back taxes, liens, or code violations beyond purchase price. Always verify total cost.',
  },
  'tax sale': {
    meaning: 'Property seized by the government due to unpaid property taxes. Sold to recover the unpaid tax debt.',
    valuable: 'Can be purchased well below market value. Government wants to collect the tax owed, not the property.',
    watchOut: 'Redemption period may apply — original owner can buy it back within a window. Outstanding code violations or mortgages may survive the sale.',
  },
  'sheriff sale': {
    meaning: 'Court-ordered sale of property, typically after a mortgage foreclosure judgment.',
    valuable: 'Often priced below market. Motivated seller — the court wants this resolved.',
    watchOut: 'Heavy competition from other investors. May have tenant-occupied units. Confirm property condition.',
  },
  'adjudicated property': {
    meaning: 'Property that has gone through a formal legal process and is now officially owned by the city or parish.',
    valuable: 'Clear title process usually handled by the municipality. Fastest path to ownership on government land.',
    watchOut: 'Property may have structural issues, illegal additions, or environmental problems not disclosed.',
  },
  'delinquent tax': {
    meaning: 'Property where the owner failed to pay property taxes. The government is owed money.',
    valuable: 'The owed amount becomes a lien on the property — you can buy the lien, not necessarily the property.',
    watchOut: 'Lien investing requires understanding priority positions. Senior liens must be paid first.',
  },
  'tax lien certificate': {
    meaning: 'A certificate representing a lien on a property for unpaid taxes. The investor earns interest on the lien amount.',
    valuable: 'Fixed return guaranteed by local government. Redemption periods can mean the original owner pays you back with interest.',
    watchOut: 'If the property goes to full foreclosure, lien position matters. Know where your lien sits in the priority stack.',
  },
  'land bank': {
    meaning: 'A quasi-government entity that holds vacant, abandoned, or tax-delinquent properties and resells them to redevelopers.',
    valuable: 'Land banks often have bulk pricing, flexible terms, and eliminate back taxes as part of the deal. Usually clear title provided.',
    watchOut: 'Some land banks restrict use (must build within a timeframe, must meet affordability requirements). Read the restrictions.',
  },
  'redevelopment authority': {
    meaning: 'A government body created to acquire, clean up, and resell blighted or underutilized properties to developers.',
    valuable: 'Often paired with grants, tax abatements, or favorable financing. Good for larger-scale projects.',
    watchOut: 'May have community benefit requirements, prevailing wage rules, or neighborhood approval processes.',
  },
  'surplus land': {
    meaning: 'Property the government no longer needs — surplus inventory. Can include buildings, lots, or land.',
    valuable: 'Motivated seller (government wants it off the books). Often sold at public auction or direct sale at below-market prices.',
    watchOut: 'Surplus designation may come with deed restrictions. Verify no environmental issues from prior government use.',
  },
  'foreclosure sale': {
    meaning: 'Property being sold by the lender after the borrower defaulted on mortgage payments.',
    valuable: 'Typically 10-30% below market. Lender motivated to recover as much of the loan balance as possible.',
    watchOut: 'Usually sold as-is with no disclosures. May have tenants with legal protections. Physical condition unknown.',
  },
  'tax foreclosure': {
    meaning: 'Same as a tax sale — property seized for unpaid property taxes and sold by the government.',
    valuable: 'Deep discounts possible. In St. Louis, many properties sell for under $10,000.',
    watchOut: 'Properties may be occupied. St. Louis has strong Squatters Rights culture. Verify occupancy before bidding.',
  },
};

const TYPE_TRANSLATIONS: Record<PropertyType, { meaning: string; valuable: string; watchOut: string }> = {
  TAX_DEED_EQUIVALENT: {
    meaning: 'Vacant property available due to unpaid taxes — acquired at a public tax sale',
    valuable: 'One of the deepest discounts available in real estate. Government is selling to recover unpaid taxes, not to maximize price.',
    watchOut: 'Confirm redemption period expiration. Verify total cost (back taxes + fees + potential liens). Properties often need significant rehab.',
  },
  TAX_LIEN: {
    meaning: 'A tax lien certificate purchased at auction — you are loaning the government money secured by the property',
    valuable: 'Fixed interest return set by the local government. Backed by real estate collateral. Regular payments during the lien term.',
    watchOut: 'Your return depends on the property being redeemed. If foreclosed, your lien position determines payout order.',
  },
  GOVERNMENT_LAND: {
    meaning: 'Property owned by a government entity or quasi-government land bank being resold to the public',
    valuable: 'Usually clear title, no redemption period, city motivated to sell. Often comes with bulk pricing on multiple parcels.',
    watchOut: 'Some properties have use restrictions (must build affordable housing, must occupy within 12 months). Read all deed restrictions.',
  },
};

export function translateListing(listing: Listing): Translation {
  const label = listing.originalLabel.toLowerCase();
  for (const [term, translation] of Object.entries(TERM_TRANSLATIONS)) {
    if (label.includes(term)) {
      return { whatItMeans: translation.meaning, whyValuable: translation.valuable, watchOut: translation.watchOut, officialLabel: listing.originalLabel };
    }
  }
  const typeTrans = TYPE_TRANSLATIONS[listing.propertyType];
  return { whatItMeans: typeTrans.meaning, whyValuable: typeTrans.valuable, watchOut: typeTrans.watchOut, officialLabel: listing.originalLabel };
}
