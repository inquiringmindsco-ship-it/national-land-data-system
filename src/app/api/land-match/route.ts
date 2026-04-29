// ============================================================
// API: /api/land-match
// Takes criteria JSON, returns ranked land matches
// ============================================================

import { NextRequest, NextResponse } from 'next/server';
import { LandCriteria, matchLand, OD_CRITERIA } from '@/lib/land-match';
import { ALL_STATE_LISTINGS } from '@/data/states';

// All listings across all states
const ALL_LISTINGS = ALL_STATE_LISTINGS;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Use provided criteria or default to Od's profile
    const criteria: LandCriteria = {
      ...OD_CRITERIA,
      ...body.criteria,
    };

    // Filter by state(s)
    let listingsToSearch = ALL_LISTINGS;
    
    if (criteria.state !== 'ALL') {
      // Single state mode
      const stateFiltered = ALL_LISTINGS.filter(
        l => l.state?.toUpperCase() === criteria.state.toUpperCase()
      );
      listingsToSearch = stateFiltered.length > 0 ? stateFiltered : ALL_LISTINGS;
    } else if (criteria.targetStates && criteria.targetStates.length > 0) {
      // Multi-state mode
      listingsToSearch = ALL_LISTINGS.filter(
        l => criteria.targetStates!.includes(l.state?.toUpperCase() ?? '')
      );
    }

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
