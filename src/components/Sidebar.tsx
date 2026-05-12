'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const scenarios = [
  { slug: 'writing-emails', label: 'Writing Emails' },
  { slug: 'writing-blog-post', label: 'Writing Blog Posts' },
  { slug: 'creative-writing', label: 'Creative Writing' },
  { slug: 'coding-help', label: 'Coding Help' },
  { slug: 'data-analysis', label: 'Data Analysis' },
  { slug: 'marketing-copy', label: 'Marketing Copy' },
  { slug: 'image-generation', label: 'Image Generation' },
  { slug: 'resume-cover-letter', label: 'Resume & Cover Letter' },
  { slug: 'learning-new-topic', label: 'Learning New Topics' },
  { slug: 'business-planning', label: 'Business Planning' },
  { slug: 'productivity-tasks', label: 'Productivity Tasks' },
];

const tools = [
  { slug: 'chatgpt', label: 'ChatGPT' },
  { slug: 'claude', label: 'Claude' },
  { slug: 'gemini', label: 'Gemini' },
  { slug: 'midjourney', label: 'Midjourney' },
  { slug: 'dall-e', label: 'DALL-E' },
  { slug: 'stable-diffusion', label: 'Stable Diffusion' },
];

const categories = [
  { slug: 'writing', label: 'Writing' },
  { slug: 'coding', label: 'Coding' },
  { slug: 'analysis', label: 'Analysis' },
  { slug: 'business', label: 'Business' },
  { slug: 'productivity', label: 'Productivity' },
  { slug: 'image', label: 'Image Generation' },
  { slug: 'guide', label: 'Guide' },
];

const difficulties = [
  { slug: 'beginner', label: 'Beginner' },
  { slug: 'intermediate', label: 'Intermediate' },
  { slug: 'advanced', label: 'Advanced' },
];

interface SectionProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

function Section({ title, defaultOpen = false, children }: SectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-4 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50"
      >
        {title}
        <svg
          className={`h-4 w-4 text-gray-500 transition-transform ${open ? 'rotate-90' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      {open && <div className="pb-2">{children}</div>}
    </div>
  );
}

interface SidebarCounts {
  byScenario: Record<string, number>;
  byTool: Record<string, number>;
  byCategory: Record<string, number>;
  byDifficulty: Record<string, number>;
  total: number;
}

function NavLink({ href, children, count }: { href: string; children: React.ReactNode; count?: number }) {
  const pathname = usePathname();
  const active = pathname === href || pathname?.startsWith(href + '/');
  return (
    <Link
      href={href}
      className={`flex items-center justify-between px-8 py-1.5 text-sm transition-colors ${
        active
          ? 'bg-blue-50 text-blue-700 font-medium'
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      }`}
    >
      <span>{children}</span>
      {count !== undefined && (
        <span className={`text-xs ${active ? 'text-blue-500' : 'text-gray-400'}`}>{count}</span>
      )}
    </Link>
  );
}

export default function Sidebar() {
  const [counts, setCounts] = useState<SidebarCounts | null>(null);

  useEffect(() => {
    fetch('/api/prompt-counts')
      .then((r) => r.json())
      .then((data) => setCounts(data))
      .catch(() => {});
  }, []);

  return (
    <aside className="w-64 shrink-0 border-r border-gray-200 bg-white overflow-y-auto">
      <nav className="py-2">
        <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
          Browse
        </div>
        <NavLink href="/" count={counts?.total}>All Prompts</NavLink>
        <NavLink href="/collections">Collections</NavLink>
        <NavLink href="/generator">Generator</NavLink>
        <NavLink href="/guide">Guides</NavLink>

        <Section title="By Scenario" defaultOpen={true}>
          {scenarios.map((s) => (
            <NavLink key={s.slug} href={`/for/${s.slug}`} count={counts?.byScenario[s.slug]}>
              {s.label}
            </NavLink>
          ))}
        </Section>

        <Section title="By Tool">
          {tools.map((t) => (
            <NavLink key={t.slug} href={`/for-tool/${t.slug}`} count={counts?.byTool[t.slug]}>
              {t.label}
            </NavLink>
          ))}
        </Section>

        <Section title="By Category">
          {categories.map((c) => (
            <NavLink key={c.slug} href={`/category/${c.slug}`} count={counts?.byCategory[c.slug]}>
              {c.label}
            </NavLink>
          ))}
        </Section>

        <Section title="By Difficulty">
          {difficulties.map((d) => (
            <NavLink key={d.slug} href={`/difficulty/${d.slug}`} count={counts?.byDifficulty[d.slug]}>
              {d.label}
            </NavLink>
          ))}
        </Section>
      </nav>
    </aside>
  );
}
