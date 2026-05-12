import { notFound } from 'next/navigation';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import PromptListGrid from '@/components/PromptListGrid';
import { getPromptsByScenario, getAllScenarios } from '@/lib/data';

export function generateStaticParams() {
  return getAllScenarios().map((scenario) => ({ scenario }));
}

export async function generateMetadata({ params }: { params: Promise<{ scenario: string }> }) {
  const { scenario } = await params;
  const label = scenario.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  return {
    title: `Best AI Prompts for ${label} - Free Templates | PromptCraft`,
    description: `Find the best AI prompts for ${label.toLowerCase()}. Each prompt includes usage tips, examples, and customization guides.`,
  };
}

const scenarioDescriptions: Record<string, string> = {
  'writing-emails': 'Discover the best AI prompts for writing professional emails, from business communication to networking. Each prompt includes tone guidance, structure tips, and customization options.',
  'writing-blog-post': 'Find the best AI prompts for creating blog posts, from topic ideation to outlines, intros, conclusions, and SEO optimization.',
  'creative-writing': 'Explore AI prompts for creative writing — story starters, character development, dialogue, scene descriptions, and more.',
  'coding-help': 'Get AI prompts for coding assistance — debugging, code generation, review, refactoring, and Claude Code workflows.',
  'data-analysis': 'Find AI prompts for data analysis, report writing, trend identification, and actionable insights from your data.',
  'marketing-copy': 'Discover AI prompts for marketing copy — ad copy, landing pages, product descriptions, social media, and email campaigns.',
  'image-generation': 'Get AI prompts for image generation — Midjourney photography, DALL-E illustrations, and Stable Diffusion art.',
  'resume-cover-letter': 'Find AI prompts for career documents — resume optimization, cover letters, interview prep, and LinkedIn profiles.',
  'learning-new-topic': 'Explore AI prompts for learning — concept explanations, study plans, flashcards, and knowledge assessment.',
  'business-planning': 'Get AI prompts for business planning — business models, market analysis, pitch decks, and financial projections.',
  'productivity-tasks': 'Find AI prompts for productivity — meeting agendas, project plans, goal setting, and personal organization.',
};

export default async function ScenarioPage({ params }: { params: Promise<{ scenario: string }> }) {
  const { scenario } = await params;
  const prompts = getPromptsByScenario(scenario);
  if (prompts.length === 0) notFound();

  const label = scenario.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  const description = scenarioDescriptions[scenario] || `Find the best AI prompts for ${label.toLowerCase()}.`;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <nav className="mb-4 text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-900">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Scenarios</span>
        </nav>
        <h1 className="text-3xl font-bold text-gray-900">Best AI Prompts for {label}</h1>
        <p className="mt-3 text-lg text-gray-600">{description}</p>
        <p className="mt-2 text-sm text-gray-500">{prompts.length} prompts available</p>
      </div>

      {/* How to write good prompts for this scenario */}
      <div className="mb-8 rounded-xl bg-blue-50 p-6 border border-blue-100">
        <h2 className="text-lg font-semibold text-blue-800">How to Write Good Prompts for {label}</h2>
        <ul className="mt-3 space-y-2 text-sm text-blue-700">
          <li>• <strong>Be specific</strong> about your audience, goal, and context</li>
          <li>• <strong>Assign a role</strong> to the AI (e.g., &quot;You are an expert...&quot;)</li>
          <li>• <strong>Define the format</strong> you want the output in</li>
          <li>• <strong>Provide examples</strong> of good output when possible</li>
        </ul>
        <Link href="/guide/how-to-write-better-prompts" className="mt-3 inline-block text-sm font-medium text-blue-600 hover:text-blue-800">
          Learn all 5 core principles →
        </Link>
      </div>

      <PromptListGrid prompts={prompts} />

      <AdSlot slot="ad-slot-middle" />

      {/* Related scenarios */}
      <div className="mt-12 border-t border-gray-200 pt-8">
        <h2 className="text-xl font-bold text-gray-900">Related Scenarios</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {['writing-emails', 'writing-blog-post', 'marketing-copy', 'coding-help'].filter(s => s !== scenario).map((s) => (
            <Link key={s} href={`/for/${s}`} className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-blue-300 hover:text-blue-600 transition">
              {s.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
