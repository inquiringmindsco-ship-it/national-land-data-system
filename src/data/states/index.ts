// ============================================================
// STATE LISTINGS INDEX
// Combine all state listings for Land Match Engine
// ============================================================

import { MISSISSIPPI_LISTINGS } from '../mississippi-listings';
import { TEXAS_LISTINGS } from './texas-listings';
import { TENNESSEE_LISTINGS } from './tennessee-listings';
import { LOUISIANA_LISTINGS } from './louisiana-listings';
import { FLORIDA_LISTINGS } from './florida-listings';
import { MISSOURI_LISTINGS } from './missouri-listings';

export const ALL_STATE_LISTINGS = [
  ...MISSISSIPPI_LISTINGS,
  ...TEXAS_LISTINGS,
  ...TENNESSEE_LISTINGS,
  ...LOUISIANA_LISTINGS,
  ...FLORIDA_LISTINGS,
  ...MISSOURI_LISTINGS,
];

export const STATE_NAMES: Record<string, string> = {
  'MS': 'Mississippi',
  'TX': 'Texas',
  'TN': 'Tennessee',
  'LA': 'Louisiana',
  'FL': 'Florida',
  'MO': 'Missouri',
};

export const STATE_VETERAN_PROGRAMS: Record<string, string[]> = {
  'MS': [
    'USDA FSA Direct Farm Ownership Loan — 0% down for veterans',
    'Mississippi Beginning Farmer Tax-Exempt Bond Program',
    'Military Veterans Agriculture Liaison — (601) 965-5205',
  ],
  'TX': [
    'USDA FSA Direct Farm Ownership Loan — 0% down for veterans',
    'Texas Veterans Land Board (VLB) — low-interest land loans',
    'Texas Beginning Farmer Tax-Exempt Bond Program',
  ],
  'TN': [
    'USDA FSA Direct Farm Ownership Loan — 0% down for veterans',
    'Tennessee Beginning Farmer Tax-Exempt Bond Program',
  ],
  'LA': [
    'USDA FSA Direct Farm Ownership Loan — 0% down for veterans',
    'Louisiana Beginning Farmer Tax-Exempt Bond Program',
  ],
  'FL': [
    'USDA FSA Direct Farm Ownership Loan — 0% down for veterans',
    'Florida Farm to Feds Program — veteran preference',
  ],
  'MO': [
    'USDA FSA Direct Farm Ownership Loan — 0% down for veterans',
    'Missouri Beginning Farmer Tax-Exempt Bond Program',
  ],
};
