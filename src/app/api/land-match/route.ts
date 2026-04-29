// ============================================================
// API: /api/land-match
// Takes criteria JSON, returns ranked land matches
// ============================================================

import { NextRequest, NextResponse } from 'next/server';
import { LandCriteria, matchLand, OD_CRITERIA } from '@/lib/land-match';
import { STLOUIS_LISTINGS } from '@/data/stlouis-listings';
import { MISSISSIPPI_LISTINGS } from '@/data/mississippi-listings';

// In production: fetch from Supabase or scraped data
// For now: use combined dataset
const ALL_LISTINGS = [...STLOUIS_LISTINGS, ...MISSISSIPPI_LISTINGS];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Use provided criteria or default to Od's profile
    const criteria: LandCriteria = {
      ...OD_CRITERIA,
      ...body.criteria,
    };

    // Filter by state first
    const stateFiltered = ALL_LISTINGS.filter(
      l => l.state?.toUpperCase() === criteria.state.toUpperCase()
    );

    // If no state matches, include all for demo
    const listingsToSearch = stateFiltered.length > 0 ? stateFiltered : ALL_LISTINGS;

    // Run match engine
    const matches = matchLand(criteria, listingsToSearch);

    return NextResponse.json({
      success: true,
      criteria,
      totalScanned: listingsToSearch.length,
      matchCount: matches.length,
      matches: matches.slice(0, 10), // Top 10
      topMatch: matches[0] ?? null,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        error: err instanceof Error ? err.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// GET: Return default criteria + info
export async function GET() {
  return NextResponse.json({
    name: 'Land Match Engine™',
    version: '1.0',
    description: 'Find land out of thin air',
    defaultCriteria: OD_CRITERIA,
    endpoints: {
      POST: '/api/land-match',
      body: {
        criteria: 'Partial or full LandCriteria object',
      },
    },
  });
}
