import type { Listing, PropertyType } from '../types';

export type DifficultyLevel = 'Easy' | 'Moderate' | 'Challenging' | 'Expert';

export interface AcquisitionStep {
  step: number;
  action: string;
  description: string;
  timeEstimate: string;
  cost: string;
  notes?: string;
}

export interface AcquisitionPathway {
  steps: AcquisitionStep[];
  totalTime: string;
  totalCost: string;
  difficulty: DifficultyLevel;
  difficultyScore: number;
  pathway: string;
  summary: string;
}

const makeLRA = (): AcquisitionPathway => ({
  steps: [
    { step: 1, action: 'Search LRA Property Portal', description: 'Find available LRA properties at stlouis-mo.gov/lra', timeEstimate: '1-2 days', cost: '$0' },
    { step: 2, action: 'Schedule Property Inspection', description: 'Physically visit the property. Exterior anytime, interior by appointment.', timeEstimate: '1-3 days', cost: '$0' },
    { step: 3, action: 'Review Title + Outstanding Liens', description: 'Order title search. Confirm all back taxes and liens disclosed.', timeEstimate: '3-7 days', cost: '$150-$400' },
    { step: 4, action: 'Submit Purchase Offer or Bid', description: 'LRA sells via sealed bid or live auction. Submit on prescribed form with minimum bid.', timeEstimate: '1 day', cost: '5% bid deposit', notes: 'Non-refundable if accepted' },
    { step: 5, action: 'Close at Title Company', description: 'If accepted, close within 30-45 days. Pay remaining balance + closing costs.', timeEstimate: '30-45 days', cost: 'Balance + 1-2% closing' },
  ],
  totalTime: '6-10 weeks',
  totalCost: 'Purchase price + 1.5-3% closing costs + title search',
  difficulty: 'Moderate',
  difficultyScore: 5,
  pathway: 'LRA Process',
  summary: 'Search -> Inspect -> Title check -> Bid/Apply -> Close',
});

const makeTaxSale = (): AcquisitionPathway => ({
  steps: [
    { step: 1, action: 'Find Upcoming Tax Sale', description: 'St. Louis City Collector holds annual tax sale. Find date + property list.', timeEstimate: 'Ongoing', cost: '$0' },
    { step: 2, action: 'Obtain Property List', description: 'Get complete list of properties going to sale. Minimum bid = back taxes owed.', timeEstimate: '1-2 weeks before sale', cost: '$0-$25' },
    { step: 3, action: 'Research Each Property', description: 'Title search, physical inspection, lien verification per property.', timeEstimate: '1-4 weeks', cost: '$150-$400/property' },
    { step: 4, action: 'Register for Auction', description: 'Register with Collector office before the sale. Government-issued ID required.', timeEstimate: 'Day of sale', cost: 'Varies' },
    { step: 5, action: 'Bid at Auction', description: 'Bid above minimum. Highest bidder wins. Must pay immediately or post deposit.', timeEstimate: 'Day of sale', cost: 'Full payment or deposit', notes: 'Non-refundable' },
    { step: 6, action: 'Receive Deed', description: 'Collector issues deed after payment clears. File with Recorder of Deeds.', timeEstimate: '2-6 weeks post-sale', cost: '$25-$50' },
  ],
  totalTime: '4-8 weeks',
  totalCost: 'Winning bid + back taxes owed + auction fees',
  difficulty: 'Challenging',
  difficultyScore: 7,
  pathway: 'Tax Sale',
  summary: 'Research -> Register -> Bid -> Pay -> Record deed',
});

const makeSheriffSale = (): AcquisitionPathway => ({
  steps: [
    { step: 1, action: 'Find Sheriff Sale Listings', description: 'St. Louis City Sheriff posts sales at opsj.org. New listings weekly.', timeEstimate: 'Ongoing', cost: '$0' },
    { step: 2, action: 'Review Court Case Documents', description: 'Obtain case number from Sheriff. Pull court records for judgment amount + redemption rights.', timeEstimate: '3-7 days', cost: '$0-$25' },
    { step: 3, action: 'Physical Inspection + Tenant Check', description: 'Verify occupancy. St. Louis has strong tenant protections. Cannot simply evict.', timeEstimate: '1-3 days', cost: '$0', notes: 'CRITICAL: Confirm occupancy status' },
    { step: 4, action: 'Title + Lien Search', description: 'Determine all liens attached. Sheriff sale wipes most but not all junior liens.', timeEstimate: '3-7 days', cost: '$200-$500' },
    { step: 5, action: 'Court Confirmation Period', description: 'Most sheriff sales require court confirmation (10-30 days). Highest bidder not final until confirmed.', timeEstimate: '2-6 weeks', cost: '$0' },
    { step: 6, action: 'Close at Sheriff Office', description: 'Pay remaining balance. Receive Sheriff deed.', timeEstimate: 'Day of confirmation', cost: 'Full payment + admin fee' },
  ],
  totalTime: '6-12 weeks',
  totalCost: 'Winning bid + deed transfer fee + potential redemption amount',
  difficulty: 'Expert',
  difficultyScore: 8,
  pathway: 'Sheriff Sale',
  summary: 'Research -> Inspect -> Court confirmation -> Pay -> Receive deed',
});

const makeLandBank = (): AcquisitionPathway => ({
  steps: [
    { step: 1, action: 'Identify Target Property', description: 'Search land bank inventory. St. Louis County and City have separate land banks.', timeEstimate: 'Ongoing', cost: '$0' },
    { step: 2, action: 'Submit Letter of Intent (LOI)', description: 'Formal letter: your interest, intended use, development plan.', timeEstimate: '1-2 weeks', cost: '$0', notes: 'Be specific. Land banks reject vague proposals.' },
    { step: 3, action: 'Complete Application', description: 'Fill out land bank application. May include site visit, financial review, timeline.', timeEstimate: '2-4 weeks', cost: '$50-$200' },
    { step: 4, action: 'Land Bank Board Approval', description: 'Board reviews. May ask for revisions. Monthly board meetings.', timeEstimate: '4-8 weeks', cost: '$0' },
    { step: 5, action: 'Execute Redevelopment Agreement', description: 'Sign with conditions: build deadline, use restrictions, affordability.', timeEstimate: '1-2 weeks', cost: '$0' },
    { step: 6, action: 'Close and Transfer', description: 'Receive deed. Start your project.', timeEstimate: '2-4 weeks', cost: 'Varies (some for $1)' },
  ],
  totalTime: '3-6 months',
  totalCost: 'Varies: $1 to market price + restrictions',
  difficulty: 'Moderate',
  difficultyScore: 4,
  pathway: 'Land Bank',
  summary: 'Find -> LOI -> Apply -> Board approval -> Agreement -> Close',
});

export function generateAcquisitionPathway(listing: Listing): AcquisitionPathway {
  const label = listing.originalLabel.toLowerCase();
  if (label.includes('lra') || label.includes('land bank') || label.includes('reutilization')) return makeLRA();
  if (label.includes('sheriff')) return makeSheriffSale();
  if (label.includes('tax sale') || label.includes('delinquent') || label.includes('tax foreclosure')) return makeTaxSale();
  if (label.includes('lien certificate') || label.includes('tax lien')) return makeTaxSale();
  switch (listing.propertyType) {
    case 'GOVERNMENT_LAND': return makeLRA();
    case 'TAX_LIEN': return makeTaxSale();
    default: return makeTaxSale();
  }
}
