import { notFound } from 'next/navigation';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import PromptCard from '@/components/PromptCard';
import CopyButton from '@/components/CopyButton';
import RTFView from '@/components/RTFView';
import { getPromptBySlug, readPrompts, getRelatedPrompts, getPromptCopyText } from '@/lib/data';
import { absoluteUrl, SITE_NAME, titleCaseSlug } from '@/lib/site';

export function generateStaticParams() {
  const prompts = readPrompts();
  return prompts.map((prompt) => ({ slug: prompt.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const prompt = getPromptBySlug(slug);
  if (!prompt) return { title: 'Prompt Not Found' };
  const scenarioLabel = titleCaseSlug(prompt.scenario);
  const url = absoluteUrl(`/prompt/${prompt.slug}`);
  return {
    title: `${prompt.title} - AI Prompt for ${scenarioLabel} | PromptCraft`,
    description: prompt.when_to_use,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${prompt.title} | PromptCraft`,
      description: prompt.when_to_use,
      url,
      siteName: SITE_NAME,
      type: 'article',
    },
    twitter: {
      card: 'summary',
      title: `${prompt.title} | PromptCraft`,
      description: prompt.when_to_use,
    },
  };
}

const toolColors: Record<string, string> = {
  chatgpt: 'bg-green-100 text-green-800',
  claude: 'bg-purple-100 text-purple-800',
  gemini: 'bg-blue-100 text-blue-800',
  midjourney: 'bg-pink-100 text-pink-800',
  'dall-e': 'bg-red-100 text-red-800',
  'stable-diffusion': 'bg-orange-100 text-orange-800',
};

export default async function PromptPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const prompt = getPromptBySlug(slug);
  if (!prompt) notFound();

  const related = getRelatedPrompts(prompt.related, prompt.slug, 6);
  const promptCopyText = getPromptCopyText(prompt);

  const scenarioLabel = titleCaseSlug(prompt.scenario);
  const categoryLabel = titleCaseSlug(prompt.category);
  const pageUrl = absoluteUrl(`/prompt/${prompt.slug}`);
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: absoluteUrl('/'),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: scenarioLabel,
        item: absoluteUrl(`/for/${prompt.scenario}`),
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: prompt.title,
        item: pageUrl,
      },
    ],
  };
  const promptJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: prompt.title,
    description: prompt.when_to_use,
    url: pageUrl,
    keywords: prompt.tags.join(', '),
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: absoluteUrl('/'),
    },
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbJsonLd, promptJsonLd]) }}
      />
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-gray-900">Home</Link>
        <span className="mx-2">/</span>
        <Link href={`/for/${prompt.scenario}`} className="hover:text-gray-900">{scenarioLabel}</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{prompt.title}</span>
      </nav>

      {/* Title & Tools */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{prompt.title}</h1>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          {prompt.tools.map((tool) => (
            <span key={tool} className={`rounded-full px-3 py-1 text-xs font-medium ${toolColors[tool] || 'bg-gray-100 text-gray-800'}`}>
              {tool === 'chatgpt' ? 'ChatGPT' : tool === 'claude' ? 'Claude' : tool === 'gemini' ? 'Gemini' : tool === 'midjourney' ? 'Midjourney' : tool === 'dall-e' ? 'DALL-E' : tool === 'stable-diffusion' ? 'Stable Diffusion' : tool}
            </span>
          ))}
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">{categoryLabel}</span>
          <span className={`rounded-full px-3 py-1 text-xs font-medium ${
            prompt.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
            prompt.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {prompt.difficulty.charAt(0).toUpperCase() + prompt.difficulty.slice(1)}
          </span>
          {prompt.version && (
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500 font-mono">
              {prompt.version}
            </span>
          )}
        </div>
      </div>

      {/* When to Use */}
      <div className="mb-6 rounded-xl bg-blue-50 p-5 border border-blue-100">
        <h2 className="text-sm font-semibold text-blue-800 uppercase tracking-wide">When to Use This Prompt</h2>
        <p className="mt-2 text-gray-700">{prompt.when_to_use}</p>
      </div>

      {/* RTF Structured View */}
      <RTFView role={prompt.role} task={prompt.task} format={prompt.format} />

      {/* The Prompt */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-900">Your Prompt</h2>
          <CopyButton text={promptCopyText} />
        </div>
        <pre className="whitespace-pre-wrap rounded-xl bg-gray-50 p-6 text-sm text-gray-800 border border-gray-200 font-mono leading-relaxed">
          {promptCopyText}
        </pre>
      </div>

      {/* Ad */}
      <AdSlot slot="ad-slot-result" />

      {/* Bad vs Good Example */}
      <div className="mb-6 grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-red-200 bg-red-50 p-5">
          <h3 className="text-sm font-semibold text-red-800 uppercase tracking-wide">Don&apos;t Do This</h3>
          <p className="mt-3 text-sm text-red-700 font-mono bg-red-100/50 p-3 rounded-lg">{prompt.bad_example}</p>
        </div>
        <div className="rounded-xl border border-green-200 bg-green-50 p-5">
          <h3 className="text-sm font-semibold text-green-800 uppercase tracking-wide">Do This Instead</h3>
          <p className="mt-3 text-sm text-green-700 font-mono bg-green-100/50 p-3 rounded-lg">{prompt.good_example}</p>
        </div>
      </div>

      {/* How to Customize */}
      <div className="mb-6 rounded-xl bg-amber-50 p-5 border border-amber-100">
        <h2 className="text-sm font-semibold text-amber-800 uppercase tracking-wide">How to Customize</h2>
        <p className="mt-2 text-gray-700">{prompt.how_to_customize}</p>
      </div>

      {/* Advanced Version */}
      <div className="mb-6 rounded-xl bg-purple-50 p-5 border border-purple-100">
        <h2 className="text-sm font-semibold text-purple-800 uppercase tracking-wide">Advanced Version</h2>
        <p className="mt-2 text-gray-700">{prompt.advanced_version}</p>
        <div className="mt-3">
          <CopyButton text={prompt.advanced_version} />
        </div>
      </div>

      {/* Ad */}
      <AdSlot slot="ad-slot-middle" />

      {/* Tags */}
      <div className="mb-8 flex flex-wrap gap-2">
        {prompt.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
            {tag}
          </span>
        ))}
      </div>

      {/* Related Prompts */}
      {related.length > 0 && (
        <div className="border-t border-gray-200 pt-8">
          <h2 className="text-xl font-bold text-gray-900">Related Prompts</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {related.map((p) => (
              <PromptCard key={p.slug} prompt={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
