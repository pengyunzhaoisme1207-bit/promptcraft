'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import PromptCard from '@/components/PromptCard';
import { PromptData } from '@/lib/data';

interface PromptListGridProps {
  prompts: PromptData[];
  showGrouping?: boolean;
}

const difficultyOrder = { beginner: 0, intermediate: 1, advanced: 2 };

export default function PromptListGrid({ prompts, showGrouping = true }: PromptListGridProps) {
  const [search, setSearch] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('relevant');
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(() => {
    let result = [...prompts];

    if (difficultyFilter !== 'all') {
      result = result.filter(p => p.difficulty === difficultyFilter);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.when_to_use.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q)) ||
        p.scenario.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'title') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'difficulty') {
      result.sort((a, b) => (difficultyOrder as Record<string, number>)[a.difficulty] - (difficultyOrder as Record<string, number>)[b.difficulty]);
    } else if (sortBy === 'featured') {
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [prompts, search, difficultyFilter, sortBy]);

  const displayed = showAll ? filtered : filtered.slice(0, 12);

  // Group by most common tags when showing grouped view
  const grouped = useMemo(() => {
    if (!showGrouping || search || difficultyFilter !== 'all' || showAll) return null;

    const tagCounts: Record<string, PromptData[]> = {};
    const tagged = new Set<string>();

    // Find top tags
    for (const p of prompts) {
      for (const tag of p.tags) {
        if (!tagCounts[tag]) tagCounts[tag] = [];
        tagCounts[tag].push(p);
      }
    }

    // Sort tags by count and pick top 4
    const topTags = Object.entries(tagCounts)
      .sort((a, b) => b[1].length - a[1].length)
      .slice(0, 4);

    const groups: { tag: string; prompts: PromptData[] }[] = [];
    for (const [tag, items] of topTags) {
      const unique = items.filter(p => !tagged.has(p.slug));
      if (unique.length >= 3) {
        unique.forEach(p => tagged.add(p.slug));
        groups.push({ tag, prompts: unique.slice(0, 6) });
      }
    }

    const untagged = prompts.filter(p => !tagged.has(p.slug));
    return { groups, untagged: untagged.slice(0, 12) };
  }, [prompts, search, difficultyFilter, showAll]);

  if (prompts.length === 0) return null;

  return (
    <div>
      {/* Filter Bar */}
      <div className="mb-6 flex flex-wrap items-center gap-3 rounded-xl border border-gray-200 bg-white p-4">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search prompts..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        {/* Difficulty Filter */}
        <div className="flex items-center gap-1.5">
          {['all', 'beginner', 'intermediate', 'advanced'].map(d => (
            <button
              key={d}
              onClick={() => setDifficultyFilter(d)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                difficultyFilter === d
                  ? d === 'all' ? 'bg-gray-900 text-white' :
                    d === 'beginner' ? 'bg-green-600 text-white' :
                    d === 'intermediate' ? 'bg-yellow-600 text-white' :
                    'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {d === 'all' ? 'All' : d.charAt(0).toUpperCase() + d.slice(1)}
            </button>
          ))}
        </div>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 focus:border-blue-500 focus:outline-none"
        >
          <option value="relevant">Most Relevant</option>
          <option value="featured">Featured First</option>
          <option value="title">Alphabetical</option>
          <option value="difficulty">By Difficulty</option>
        </select>

        {/* Results Count */}
        <span className="text-xs text-gray-500">
          {filtered.length} of {prompts.length} prompts
        </span>
      </div>

      {/* Grouped View (only when no filters active) */}
      {grouped && grouped.groups.length > 0 && !showAll ? (
        <>
          {grouped.groups.map(g => (
            <div key={g.tag} className="mb-8">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                  {g.tag}
                </h3>
                <span className="text-xs text-gray-400">{g.prompts.length} prompts</span>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {g.prompts.map(p => (
                  <PromptCard key={p.slug} prompt={p} />
                ))}
              </div>
            </div>
          ))}

          {grouped.untagged.length > 0 && (
            <div className="mb-8">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
                More Prompts
              </h3>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {grouped.untagged.map(p => (
                  <PromptCard key={p.slug} prompt={p} />
                ))}
              </div>
            </div>
          )}

          {filtered.length > 12 && (
            <div className="text-center">
              <button
                onClick={() => setShowAll(true)}
                className="rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-blue-300 transition-colors"
              >
                Show All {filtered.length} Prompts
              </button>
            </div>
          )}
        </>
      ) : (
        <>
          {/* Flat Grid View */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayed.map(p => (
              <PromptCard key={p.slug} prompt={p} />
            ))}
          </div>

          {!showAll && filtered.length > 12 && (
            <div className="mt-8 text-center">
              <button
                onClick={() => setShowAll(true)}
                className="rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-blue-300 transition-colors"
              >
                Show All {filtered.length} Prompts
              </button>
            </div>
          )}
        </>
      )}

      {filtered.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-lg text-gray-500">No prompts match your search.</p>
          <button
            onClick={() => { setSearch(''); setDifficultyFilter('all'); }}
            className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
