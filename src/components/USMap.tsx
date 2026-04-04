'use client';

import Link from 'next/link';

interface StateInfo {
  abbr: string;
  name: string;
  cities: { name: string; id: string; listings: number; status: 'live' | 'coming-soon' }[];
}

// All states with their data status
const STATES: StateInfo[] = [
  {
    abbr: 'MO',
    name: 'Missouri',
    cities: [
      { name: 'St. Louis', id: 'st-louis', listings: 1036, status: 'live' },
    ],
  },
  {
    abbr: 'LA',
    name: 'Louisiana',
    cities: [
      { name: 'New Orleans', id: 'new-orleans', listings: 0, status: 'coming-soon' },
    ],
  },
  {
    abbr: 'TX',
    name: 'Texas',
    cities: [
      { name: 'Houston', id: 'houston', listings: 0, status: 'coming-soon' },
    ],
  },
  {
    abbr: 'GA',
    name: 'Georgia',
    cities: [
      { name: 'Atlanta', id: 'atlanta', listings: 0, status: 'coming-soon' },
    ],
  },
  {
    abbr: 'MI',
    name: 'Michigan',
    cities: [
      { name: 'Detroit', id: 'detroit', listings: 0, status: 'coming-soon' },
    ],
  },
];

// Continental US outline — proper geographic shape
const US_OUTLINE = "M21,9 L27,9 L30,11 L33,11 L37,13 L42,13 L47,15 L51,17 L55,20 L58,24 L60,28 L62,32 L64,36 L66,40 L67,44 L68,48 L68,52 L67,55 L65,57 L62,58 L58,58 L54,57 L50,55 L46,52 L42,49 L38,46 L35,43 L33,40 L32,37 L32,34 L32,31 L32,28 L32,25 L31,22 L30,19 L28,16 L25,13 L22,11 L21,9 Z";

// Clean state shapes — accurate relative positions
const STATE_PATHS: Record<string, { path: string; labelX: number; labelY: number }> = {
  TX: {
    path: "M13,26 L30,26 L30,30 L38,30 L38,40 L33,44 L28,44 L22,40 L18,40 L13,36 L13,26 Z",
    labelX: 24,
    labelY: 34,
  },
  LA: {
    path: "M26,44 L33,44 L33,50 L30,53 L26,53 L23,50 L26,44 Z",
    labelX: 28.5,
    labelY: 48,
  },
  MO: {
    path: "M44,24 L56,24 L58,28 L58,36 L54,39 L46,39 L44,36 L44,24 Z",
    labelX: 51,
    labelY: 31,
  },
  GA: {
    path: "M64,36 L76,36 L78,40 L76,47 L70,49 L64,47 L62,42 L64,36 Z",
    labelX: 70,
    labelY: 42,
  },
  MI: {
    path: "M52,8 L62,8 L64,11 L63,15 L60,16 L56,15 L54,12 L52,8 Z M50,18 L58,18 L58,22 L50,22 L50,18 Z",
    labelX: 56,
    labelY: 15,
  },
};

function StateShape({ abbr, status }: { abbr: string; status: 'live' | 'coming-soon' }) {
  const state = STATE_PATHS[abbr];
  if (!state) return null;

  const isLive = status === 'live';
  const fill = isLive ? '#064e3b' : '#1f2937';
  const hoverFill = isLive ? '#065f46' : '#374151';
  const stroke = isLive ? '#10b981' : '#374151';
  const strokeWidth = isLive ? 1 : 0.5;

  return (
    <g>
      <path
        d={state.path}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        className="transition-all duration-200 cursor-pointer"
        onMouseEnter={(e) => { (e.target as SVGPathElement).style.fill = hoverFill; }}
        onMouseLeave={(e) => { (e.target as SVGPathElement).style.fill = fill; }}
      />
    </g>
  );
}

export function USMap() {
  return (
    <div className="relative w-full max-w-3xl mx-auto" style={{ aspectRatio: '85/55' }}>
      <svg viewBox="0 0 85 55" className="w-full h-full" style={{ borderRadius: '12px' }}>
        {/* Background */}
        <rect x="0" y="0" width="85" height="55" fill="#0a0a0a" rx="6" />

        {/* US outline — subtle */}
        <path d={US_OUTLINE} fill="none" stroke="#1f2937" strokeWidth="0.5" opacity="0.6" />

        {/* State shapes */}
        {STATES.map(state => (
          <StateShape
            key={state.abbr}
            abbr={state.abbr}
            status={state.cities[0]?.status ?? 'coming-soon'}
          />
        ))}

        {/* City labels */}
        {[
          { abbr: 'MO', city: 'STL', x: 51, y: 34 },
          { abbr: 'LA', city: 'NOLA', x: 28.5, y: 53.5 },
          { abbr: 'TX', city: 'HOU', x: 24, y: 26.5 },
          { abbr: 'GA', city: 'ATL', x: 70, y: 34.5 },
          { abbr: 'MI', city: 'DET', x: 56, y: 21.5 },
        ].map(({ abbr, city, x, y }) => {
          const state = STATES.find(s => s.abbr === abbr);
          const isLive = state?.cities[0]?.status === 'live';
          return (
            <g key={city}>
              <text
                x={x}
                y={y}
                textAnchor="middle"
                fontSize="3.5"
                fontWeight="700"
                fill={isLive ? '#10b981' : '#4b5563'}
                style={{ fontFamily: 'sans-serif', pointerEvents: 'none' }}
              >
                {city}
              </text>
              {isLive && (
                <circle cx={x} cy={y + 3} r="1.2" fill="#10b981" opacity="0.7" />
              )}
            </g>
          );
        })}

        {/* Legend */}
        <g transform="translate(4, 49)">
          <circle cx="2" cy="2" r="2" fill="#064e3b" stroke="#10b981" strokeWidth="0.5" />
          <text x="5" y="3.5" fontSize="3" fill="#9ca3af" style={{ fontFamily: 'sans-serif' }}>Active</text>
          <circle cx="20" cy="2" r="2" fill="#1f2937" stroke="#374151" strokeWidth="0.5" />
          <text x="23" y="3.5" fontSize="3" fill="#6b7280" style={{ fontFamily: 'sans-serif' }}>Coming Soon</text>
        </g>
      </svg>
    </div>
  );
}

export { STATES };
