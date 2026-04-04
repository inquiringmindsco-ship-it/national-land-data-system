/**
 * Stripe Product Setup Script
 * Run: node scripts/setup-stripe-products.js
 * 
 * Creates all products and price tiers for CreditKlimb + NLDS
 */

const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_live_your_key_here');

const PRODUCTS = [
  // CreditKlimb
  {
    name: 'CreditKlimb™ Starter — 1 Bureau Letter',
    price: 2900,
    interval: null,
    description: 'Single dispute letter for one credit bureau',
    metadata: { app: 'creditklimb', tier: 'starter' }
  },
  {
    name: 'CreditKlimb™ Full Repair — All Letters',
    price: 4900,
    interval: null,
    description: 'Dispute letters for all 3 bureaus',
    metadata: { app: 'creditklimb', tier: 'full' }
  },
  {
    name: 'CreditKlimb™ Mail Service — We Handle It',
    price: 9900,
    interval: null,
    description: 'We print, sign, and mail all dispute letters for you',
    metadata: { app: 'creditklimb', tier: 'mail-service' }
  },
  // NLDS
  {
    name: 'NLDS Unlock — Supporter',
    price: 500,
    interval: null,
    description: '48-hour full access to National Land Data System',
    metadata: { app: 'nlds', tier: 'supporter' }
  },
  {
    name: 'NLDS Unlock — Standard',
    price: 1100,
    interval: null,
    description: '72-hour full access to National Land Data System',
    metadata: { app: 'nlds', tier: 'standard' }
  },
  {
    name: 'NLDS Unlock — Patron',
    price: 2500,
    interval: null,
    description: '168-hour full access to National Land Data System',
    metadata: { app: 'nlds', tier: 'patron' }
  },
  {
    name: 'NLDS Unlock — Founder',
    price: 10000,
    interval: null,
    description: '720-hour full access to National Land Data System',
    metadata: { app: 'nlds', tier: 'founder' }
  },
];

async function setupProducts() {
  console.log('🚀 Creating Stripe products...\n');

  const results = [];

  for (const product of PRODUCTS) {
    try {
      // Create product
      const created = await stripe.products.create({
        name: product.name,
        description: product.description,
        metadata: product.metadata,
      });

      // Create price for product
      const price = await stripe.prices.create({
        product: created.id,
        unit_amount: product.price,
        currency: 'usd',
      });

      console.log(`✅ Created: ${product.name}`);
      console.log(`   Product ID: ${created.id}`);
      console.log(`   Price ID: ${price.id}`);
      console.log('');

      results.push({
        name: product.name,
        productId: created.id,
        priceId: price.id,
        price: product.price,
      });
    } catch (err) {
      console.error(`❌ Failed: ${product.name}`);
      console.error(`   ${err.message}`);
      console.log('');
    }
  }

  // Summary
  console.log('\n📋 SUMMARY — Add these to your Vercel env vars:\n');
  console.log('# CreditKlimb');
  console.log(`STRIPE_STARTER_PRICE_ID=${results.find(r => r.name.includes('Starter'))?.priceId || ''}`);
  console.log(`STRIPE_FULL_PRICE_ID=${results.find(r => r.name.includes('Full Repair'))?.priceId || ''}`);
  console.log(`STRIPE_MAIL_SERVICE_PRICE_ID=${results.find(r => r.name.includes('Mail Service'))?.priceId || ''}`);
  console.log('');
  console.log('# NLDS');
  console.log(`NLDS_SUPPORTER_PRICE_ID=${results.find(r => r.name.includes('Supporter'))?.priceId || ''}`);
  console.log(`NLDS_STANDARD_PRICE_ID=${results.find(r => r.name.includes('Standard') && !r.name.includes('Full'))?.priceId || ''}`);
  console.log(`NLDS_PATRON_PRICE_ID=${results.find(r => r.name.includes('Patron'))?.priceId || ''}`);
  console.log(`NLDS_FOUNDER_PRICE_ID=${results.find(r => r.name.includes('Founder'))?.priceId || ''}`);

  // Save to json for reference
  const fs = require('fs');
  fs.writeFileSync('stripe-products.json', JSON.stringify(results, null, 2));
  console.log('\n💾 Saved to stripe-products.json');
}

setupProducts().catch(console.error);