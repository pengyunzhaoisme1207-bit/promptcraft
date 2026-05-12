'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Fuse from 'fuse.js';
import { PromptSearchItem } from '@/lib/data';

interface SearchBarProps {
  prompts: PromptSearchItem[];
}

export default function SearchBar({ prompts }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const fuse = useMemo(
    () => new Fuse(prompts, {
      keys: [
        { name: 'title', weight: 0.4 },
        { name: 'tags', weight: 0.3 },
        { name: 'when_to_use', weight: 0.2 },
        { name: 'category', weight: 0.1 },
      ],
      threshold: 0.4,
      includeScore: true,
    }),
    [prompts]
  );

  const results = useMemo(() => {
    if (query.length < 2) return [];
    return fuse.search(query).slice(0, 8).map((result) => result.item);
  }, [query, fuse]);

  const showResults = isOpen && query.length >= 2;

  return (
    <div className="relative w-full max-w-2xl">
      <div className="relative">
        <svg
          className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(e.target.value.length >= 2);
          }}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          placeholder="Search prompts by topic, tool, or use case..."
          className="w-full rounded-xl border border-gray-300 bg-white py-4 pl-12 pr-4 text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
      </div>
      {showResults && results.length > 0 && (
        <div className="absolute z-50 mt-2 w-full rounded-xl border border-gray-200 bg-white py-2 shadow-xl">
          {results.map((prompt) => (
            <Link
              key={prompt.slug}
              href={`/prompt/${prompt.slug}`}
              className="block px-4 py-3 hover:bg-gray-50"
              onMouseDown={(e) => e.preventDefault()}
            >
              <div className="text-sm font-medium text-gray-900">{prompt.title}</div>
              <div className="mt-0.5 text-xs text-gray-500 line-clamp-1">{prompt.when_to_use}</div>
            </Link>
          ))}
        </div>
      )}
      {showResults && results.length === 0 && (
        <div className="absolute z-50 mt-2 w-full rounded-xl border border-gray-200 bg-white py-8 text-center shadow-xl">
          <p className="text-sm text-gray-500">No prompts found for &quot;{query}&quot;</p>
        </div>
      )}
    </div>
  );
}
