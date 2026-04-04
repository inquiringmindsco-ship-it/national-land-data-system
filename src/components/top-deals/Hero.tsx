import { Listing } from '@/lib/types';
import { OpportunityScore } from '@/lib/proprietary/parcel-intelligence';

interface Props {
  totalCount: number;
}

export function TopDealsHero({ totalCount }: Props) {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/60 via-black to-black pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 pt-16 pb-12 text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 bg-emerald-950 border border-emerald-800 rounded-full px-4 py-1.5 mb-6">
          <span className="text-emerald-400 text-xs font-bold tracking-widest uppercase">St. Louis, MO</span>
          <span className="text-gray-600 text-xs">·</span>
          <span className="text-gray-400 text-xs">{totalCount}+ properties analyzed</span>
        </div>

        {/* Main headline */}
        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
          Hidden Land Deals<br />
          <span className="text-emerald-400">in St. Louis</span>
        </h1>

        {/* Subheadline */}
        <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto mb-6 leading-relaxed">
          We track tax sales, LRA properties, and overlooked land opportunities so you can see what&apos;s actually worth your attention.
        </p>

        {/* Trust line */}
        <p className="text-gray-500 text-sm mb-8">
          {totalCount}+ properties analyzed from public sources.{' '}
          <span className="text-emerald-400 font-medium">No subscription.</span> Pay once for full access.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="#preview"
            className="w-full sm:w-auto px-8 py-3.5 bg-white text-black font-bold rounded-lg hover:bg-gray-100 transition-colors text-sm"
          >
            Preview Top Deals
          </a>
          <a
            href="/unlock"
            className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-500 transition-colors text-sm"
          >
            Unlock Full Access — $5–11
          </a>
        </div>
      </div>
    </section>
  );
}
