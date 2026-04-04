import { Listing } from '@/lib/types';
import { OpportunityScore } from '@/lib/proprietary/parcel-intelligence';

interface Props {
  deals: { listing: Listing; score: OpportunityScore }[];
}

export function TopDealsSchema({ deals }: Props) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Top Land Deals — St. Louis, MO',
    description: 'Highest-scoring land investment opportunities in St. Louis, MO, ranked by the NLDS Parcel Intelligence Engine™',
    numberOfItems: deals.length,
    itemListElement: deals.map(({ listing, score }, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Product',
        name: `${listing.address}, ${listing.city} ${listing.zipCode}`,
        description: score.insight.headline,
        offers: {
          '@type': 'Offer',
          price: listing.price ? (listing.price / 100).toFixed(2) : '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          url: `/deals#deal-${listing.id}`,
        },
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
