'use client';

import { getEnabledCities } from '@/lib/search';

const ALL_CITIES = [
  { id: 'all', name: 'All Cities', state: '' },
  ...getEnabledCities().map(c => ({ id: c.id, name: c.name, state: c.state })),
];

interface Props {
  selected: string;
  onChange: (id: string) => void;
}

export function CitySelector({ selected, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {ALL_CITIES.map(city => (
        <button
          key={city.id}
          onClick={() => onChange(city.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            selected === city.id
              ? 'bg-emerald-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          {city.name}
          {city.state && <span className="text-gray-400 ml-1">{city.state}</span>}
        </button>
      ))}
    </div>
  );
}
