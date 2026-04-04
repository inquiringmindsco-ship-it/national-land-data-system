'use client';

import { AcquisitionForm } from './AcquisitionForm';

interface Props {
  listingId: string;
  listingAddress: string;
  listingPriceCents?: number;
  zipCode?: string;
  score: number;
}

export function GroupDealCTA({ listingId, listingAddress, listingPriceCents, zipCode, score }: Props) {
  return (
    <div className="bg-emerald-950 border border-emerald-800 rounded-2xl p-6">
      <div className="text-center mb-6">
        <h3 className="text-white font-black text-xl mb-1">Join this group deal</h3>
        <p className="text-gray-400 text-sm">No payment now. We&apos;ll reach out to confirm your spot and walk you through next steps.</p>
      </div>
      <AcquisitionForm
        listingId={listingId}
        listingAddress={listingAddress}
        listingPriceCents={listingPriceCents}
        zipCode={zipCode}
        dealScore={score}
        variant="inline"
        triggerLabel="Join this group deal →"
      />
    </div>
  );
}
