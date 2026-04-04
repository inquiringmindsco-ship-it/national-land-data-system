'use client';

import { useState } from 'react';

interface Props {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const QUICK_SEARCHES = [
  'tax deed',
  'cheap land',
  'land bank',
  'sheriff sale',
  'auction',
];

export function SearchBar({ onSearch, placeholder }: Props) {
  const [value, setValue] = useState('');

  return (
    <div className="space-y-3">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && onSearch(value)}
          placeholder={placeholder ?? 'Search listings...'}
          className="w-full bg-gray-900 border border-gray-700 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
        />
        <button
          onClick={() => onSearch(value)}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Search
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {QUICK_SEARCHES.map(q => (
          <button
            key={q}
            onClick={() => { onSearch(q); }}
            className="text-xs text-gray-400 hover:text-emerald-400 border border-gray-700 hover:border-emerald-600 px-3 py-1 rounded-full transition-colors"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}
