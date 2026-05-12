import SearchBar from '@/components/SearchBar';
import PromptCard from '@/components/PromptCard';
import AdSlot from '@/components/AdSlot';
import Link from 'next/link';
import { readPrompts, getFeaturedPrompts, getAllScenarios } from '@/lib/data';

const scenarioConfig: Record<string, { label: string; icon: string }> = {
  'writing-emails': { label: 'Email Writing', icon: '✉️' },
  'writing-blog-post': { label: 'Blog Posts', icon: '📝' },
  'creative-writing': { label: 'Creative Writing', icon: '✨' },
  'coding-help': { label: 'Coding', icon: '💻' },
  'data-analysis': { label: 'Data Analysis', icon: '📊' },
  'marketing-copy': { label: 'Marketing', icon: '🎯' },
  'image-generation': { label: 'Image Generation', icon: '🎨' },
  'resume-cover-letter': { label: 'Resume & Cover Letter', icon: '📄' },
  'learning-new-topic': { label: 'Learning', icon: '📚' },
  'business-planning': { label: 'Business Planning', icon: '💼' },
  'productivity-tasks': { label: 'Productivity', icon: '⚡' },
};

export default function HomePage() {
  const prompts = readPrompts();
  const featured = getFeaturedPrompts(6);
  const scenarios = getAllScenarios();

  const topScenarios = [
    'writing-emails', 'writing-blog-post', 'coding-help', 'data-analysis', 'marketing-copy', 'image-generation',
  ].filter(s => scenarios.includes(s));

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Stop Getting Bad AI Results
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            The same AI model with a better prompt produces dramatically different results.
            Find the right prompt for any task — 300+ tested prompts for writing, coding, marketing, and more.
          </p>
          <div className="mt-10 flex justify-center">
            <SearchBar prompts={prompts} />
          </div>
        </div>
      </section>

      {/* Scenario Quick Links */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900">Browse by Use Case</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {topScenarios.map((slug) => {
              const config = scenarioConfig[slug];
              if (!config) return null;
              return (
                <Link
                  key={slug}
                  href={`/for/${slug}`}
                  className="flex flex-col items-center rounded-xl border border-gray-200 bg-white p-6 text-center transition hover:border-blue-300 hover:shadow-md"
                >
                  <span className="text-3xl">{config.icon}</span>
                  <span className="mt-3 text-sm font-medium text-gray-900">{config.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Ad */}
      <AdSlot slot="ad-slot-top" />

      {/* Featured Prompts */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Featured Prompts This Week</h2>
            <Link href="/" className="text-sm font-medium text-blue-600 hover:text-blue-800">
              View all →
            </Link>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((prompt) => (
              <PromptCard key={prompt.slug} prompt={prompt} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Prompts Matter */}
      <section className="border-t border-gray-200 bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold text-gray-900">Why the Right Prompt Matters</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div className="rounded-xl border border-red-200 bg-red-50 p-6">
              <h3 className="text-lg font-semibold text-red-800">Without a Good Prompt</h3>
              <p className="mt-3 text-sm text-red-700">
                <strong>Input:</strong> &quot;Write me a marketing email&quot;
              </p>
              <p className="mt-2 text-sm text-red-600">
                Generic, forgettable output that sounds like everyone else. Low open rates, no engagement.
              </p>
            </div>
            <div className="rounded-xl border border-green-200 bg-green-50 p-6">
              <h3 className="text-lg font-semibold text-green-800">With the Right Prompt</h3>
              <p className="mt-3 text-sm text-green-700">
                <strong>Input:</strong> &quot;You are a direct response copywriter. Write a personalized email for SaaS founders about our new AI feature...&quot;
              </p>
              <p className="mt-2 text-sm text-green-600">
                Specific, compelling output that speaks directly to your audience and drives action.
              </p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <Link href="/guide/how-to-write-better-prompts" className="text-sm font-medium text-blue-600 hover:text-blue-800">
              Learn the 5 core principles of better prompting →
            </Link>
          </div>
        </div>
      </section>

      {/* Browse All Categories */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900">Browse by Category</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {topScenarios.map((slug) => {
              const config = scenarioConfig[slug];
              if (!config) return null;
              const count = prompts.filter(p => p.scenario === slug).length;
              return (
                <Link
                  key={slug}
                  href={`/for/${slug}`}
                  className="rounded-lg border border-gray-200 bg-white px-4 py-4 transition hover:border-blue-300 hover:shadow-sm"
                >
                  <div className="text-sm font-medium text-gray-900">{config.icon} {config.label}</div>
                  <div className="mt-1 text-xs text-gray-500">{count} prompts</div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
