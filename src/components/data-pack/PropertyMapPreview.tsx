'use client';

import { Listing } from '@/lib/types';

interface Props {
  listing: Listing;
  height?: number;
  className?: string;
}

// Get OSM tile URL for a given lat/lon at zoom 16
function getOSMTileUrl(lat: number, lon: number, zoom = 16): string {
  const x = Math.floor(((lon + 180) / 360) * Math.pow(2, zoom));
  const y = Math.floor(
    (1 - Math.log(Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180)) / Math.PI) / 2 *
    Math.pow(2, zoom)
  );
  return `https://tile.openstreetmap.org/${zoom}/${x}/${y}.png`;
}

// Build a 4-tile static map (2x2 grid centered on lat/lon)
function getStaticMapUrls(lat: number, lon: number): string[] {
  const zoom = 16;
  const x = Math.floor(((lon + 180) / 360) * Math.pow(2, zoom));
  const y = Math.floor(
    (1 - Math.log(Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180)) / Math.PI) / 2
    * Math.pow(2, zoom)
  );
  return [
    `https://tile.openstreetmap.org/${zoom}/${x}/${y - 1}.png`,
    `https://tile.openstreetmap.org/${zoom}/${x + 1}/${y - 1}.png`,
    `https://tile.openstreetmap.org/${zoom}/${x}/${y}.png`,
    `https://tile.openstreetmap.org/${zoom}/${x + 1}/${y}.png`,
  ];
}

export function PropertyMapPreview({ listing, height = 200, className = '' }: Props) {
  const hasCoords = listing.lat && listing.lon;

  if (hasCoords) {
    const tileUrls = getStaticMapUrls(listing.lat!, listing.lon!);
    const gmapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(listing.address)}`;

    return (
      <div
        className={`relative overflow-hidden rounded-t-2xl ${className}`}
        style={{ height }}
      >
        {/* 2x2 OSM tile grid */}
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
          {tileUrls.map((url, i) => (
            <img
              key={i}
              src={url}
              alt=""
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(0.75) contrast(1.1) saturate(0.7)' }}
              onError={(e) => { (e.target as HTMLImageElement).style.visibility = 'hidden'; }}
            />
          ))}
        </div>

        {/* Pin overlay — simple CSS dot */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative">
            <div className="w-5 h-5 bg-red-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full" />
            </div>
            <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-0.5 h-2.5 bg-red-500" />
          </div>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Address label */}
        <div className="absolute bottom-2 left-3 right-3">
          <div className="text-white font-semibold text-sm leading-tight drop-shadow">
            {listing.address}
          </div>
          {listing.neighborhood && (
            <div className="text-white/70 text-xs">{listing.neighborhood}</div>
          )}
        </div>

        {/* Map attribution */}
        <div className="absolute top-2 right-2">
          <span className="bg-black/50 text-white/60 text-[9px] px-1.5 py-0.5 rounded font-mono">
            OSM
          </span>
        </div>

        {/* Click to open Google Maps */}
        <a
          href={gmapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0"
          aria-label={`View ${listing.address} on Google Maps`}
        />
      </div>
    );
  }

  // No geocode — show address-based fallback
  const searchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(listing.address)}`;

  return (
    <div
      className={`relative flex flex-col items-center justify-center bg-gray-900 border-b border-gray-800 ${className}`}
      style={{ height }}
    >
      {/* Street grid background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
        }}
      />

      <div className="relative text-center px-4">
        <div className="text-3xl mb-2 opacity-30">📍</div>
        <div className="text-white font-semibold text-sm mb-1">{listing.city}</div>
        <div className="text-gray-500 text-xs font-mono">{listing.zipCode || 'St. Louis, MO'}</div>
        {listing.parcelId && (
          <div className="text-gray-600 text-xs font-mono mt-1">#{listing.parcelId}</div>
        )}
      </div>

      <a
        href={searchUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-2 right-2 text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
      >
        📍 View on Maps →
      </a>
    </div>
  );
}

// Simple map tile for compact views (e.g. list items)
export function PropertyMiniMap({ listing, className = '' }: Props) {
  if (!listing.lat || !listing.lon) {
    return (
      <div
        className={`bg-gray-800 rounded flex items-center justify-center text-gray-600 text-xs ${className}`}
      >
        📍
      </div>
    );
  }

  const url = getOSMTileUrl(listing.lat, listing.lon, 16);

  return (
    <a
      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(listing.address)}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`block relative overflow-hidden rounded ${className}`}
    >
      <img
        src={url}
        alt=""
        className="w-full h-full object-cover"
        style={{ filter: 'brightness(0.7) saturate(0.8)' }}
        onError={(e) => { (e.target as HTMLImageElement).style.visibility = 'hidden'; }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      <div className="absolute bottom-1 left-1">
        <div className="w-2 h-2 bg-red-500 rounded-full border border-white" />
      </div>
    </a>
  );
}
