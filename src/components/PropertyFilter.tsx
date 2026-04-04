'use client';

import { PropertyType } from '@/lib/types';

const TYPE_OPTIONS: { value: PropertyType; label: string; color: string }[] = [
  { value: 'TAX_DEED_EQUIVALENT', label: 'Tax Deed / Sheriff Sale', color: 'bg-red-900 text-red-300 border-red-700' },
  { value: 'TAX_LIEN', label: 'Tax Lien Certificate', color: 'bg-amber-900 text-amber-300 border-amber-700' },
  { value: 'GOVERNMENT_LAND', label: 'Land Bank / Gov Land', color: 'bg-blue-900 text-blue-300 border-blue-700' },
];

interface Props {
  selected: PropertyType[];
  onChange: (types: PropertyType[]) => void;
}

export function PropertyFilter({ selected, onChange }: Props) {
  function toggle(value: PropertyType) {
    if (selected.includes(value)) {
      onChange(selected.filter(t => t !== value));
    } else {
      onChange([...selected, value]);
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      <span className="text-gray-400 text-sm py-2">Filter:</span>
      {TYPE_OPTIONS.map(opt => (
        <button
          key={opt.value}
          onClick={() => toggle(opt.value)}
          className={`px-3 py-1.5 rounded-full text-sm border transition-all ${
            selected.includes(opt.value)
              ? opt.color
              : 'bg-gray-800 text-gray-400 border-gray-700 hover:bg-gray-700'
          }`}
        >
          {opt.label}
        </button>
      ))}
      {selected.length > 0 && (
        <button
          onClick={() => onChange([])}
          className="px-3 py-1.5 rounded-full text-sm bg-gray-700 text-gray-300 border border-gray-600 hover:bg-gray-600"
        >
          Clear
        </button>
      )}
    </div>
  );
}
