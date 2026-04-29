// ============================================================
// CRON: Daily Land Scan + Alert
// Run: npx tsx scripts/daily-land-scan.ts
// ============================================================

async function runDailyScan() {
  console.log('🔍 Running daily land scan...');

  // Dynamic imports to work with tsx
  const { matchLand, OD_CRITERIA } = await import('../src/lib/land-match.js');
  const { MISSISSIPPI_LISTINGS } = await import('../src/data/mississippi-listings.js');
  const { STLOUIS_LISTINGS } = await import('../src/data/stlouis-listings.js');

  const ALL_LISTINGS = [...STLOUIS_LISTINGS, ...MISSISSIPPI_LISTINGS];

  console.log(`Total listings in database: ${ALL_LISTINGS.length}`);

  // Od's criteria
  const criteria = OD_CRITERIA;

  // Run match
  const matches = matchLand(criteria, ALL_LISTINGS);

  console.log(`\n📊 Results:`);
  console.log(`- Total scanned: ${ALL_LISTINGS.length}`);
  console.log(`- Matches found: ${matches.length}`);
  console.log(`- Top match score: ${matches[0]?.matchScore ?? 'N/A'}`);

  if (matches.length === 0) {
    console.log('\n✅ No new matches today.');
    return;
  }

  // Alert threshold: score >= 70
  const highMatches = matches.filter((m: any) => m.matchScore >= 70);

  if (highMatches.length === 0) {
    console.log('\n⚠️ Matches found but none above alert threshold (70).');
    console.log('Top match:', matches[0]?.listing?.address, `(${matches[0]?.matchScore})`);
    return;
  }

  console.log(`\n🔥 HIGH MATCHES (${highMatches.length}):`);
  for (const match of highMatches) {
    console.log(`\n# ${match.listing?.address || 'Unnamed'}`);
    console.log(`  Score: ${match.matchScore}/100`);
    console.log(`  Price: $${match.listing?.price?.toLocaleString() ?? match.listing?.startingBid?.toLocaleString() ?? 'TBD'}`);
    console.log(`  Acres: ${match.listing?.acreage}`);
    console.log(`  County: ${match.listing?.county}`);
    console.log(`  Why: ${match.whyMatched?.join(', ')}`);
  }

  // In production: send SMS/email via Twilio/Resend
  console.log('\n📱 ALERT: High-match properties found!');
  console.log('In production: SMS + email would be sent here.');
}

// Run if called directly
if (require.main === module) {
  runDailyScan().catch(console.error);
}

export { runDailyScan };