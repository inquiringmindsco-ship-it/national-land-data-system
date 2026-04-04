// Script to generate deal-drop.json at build time
// Run: npx tsx scripts/generate-deal-drop.ts

import { promises as fs } from 'fs';
import path from 'path';

async function generate() {
  // Dynamic import to work with tsx
  const { STLOUIS_LISTINGS } = await import('../src/data/stlouis-listings.js');
  const { runDealDropCycle } = await import('../src/lib/proprietary/deal-drop.js');

  const drop = runDealDropCycle(STLOUIS_LISTINGS);

  const outPath = path.join(process.cwd(), 'public', 'deal-drop.json');
  await fs.mkdir(path.dirname(outPath), { recursive: true });
  await fs.writeFile(outPath, JSON.stringify(drop), 'utf-8');

  console.log(`✅ Generated deal-drop.json`);
  console.log(`   Cycle: ${drop.cycleLabel}`);
  console.log(`   Preview: ${drop.previewDeals.length} deals`);
  console.log(`   Selected: ${drop.selectedDeals.length} deals`);
  console.log(`   Avg Score: ${drop.report.avgScore}/100`);
  console.log(`   Top Zip: ${drop.report.topZip}`);
  console.log(`   Operator: ${drop.report.operatorNote}`);
}

generate().catch(console.error);
