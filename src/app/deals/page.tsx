// Server component wrapper — handles metadata + passes city from URL params
import { Metadata } from 'next';
import { Suspense } from 'react';
import DealsClient from './DealsClient';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Top Land Deals | National Land Data System',
  description:
    'Hidden land deals scored, translated, and ranked. Tax sales, land bank properties, and government surplus across St. Louis and New Orleans. No subscription. Pay once.',
};

export default async function TopDealsPage({
  searchParams,
}: {
  searchParams: { city?: string };
}) {
  const city = searchParams?.city ?? 'st-louis';
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <DealsClient initialCity={city} />
    </Suspense>
  );
}
