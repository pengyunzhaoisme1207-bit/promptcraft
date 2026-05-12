import { notFound } from 'next/navigation';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import PromptCard from '@/components/PromptCard';
import { readGuides, getGuideBySlug, getFeaturedPrompts, GuideData } from '@/lib/data';

export function generateStaticParams() {
  return readGuides().map((guide: GuideData) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return { title: 'Guide Not Found' };
  return {
    title: `${guide.title} - Complete Guide 2026 | PromptCraft`,
    description: `Learn ${guide.title.toLowerCase()} with practical examples and actionable tips.`,
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const featured = getFeaturedPrompts(6);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-gray-900">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Guides</span>
      </nav>

      <article className="prose prose-lg max-w-none">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">{guide.title}</h1>

        {guide.tags.map((tag) => (
          <span key={tag} className="mr-2 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
            {tag}
          </span>
        ))}

        <div className="mt-8 whitespace-pre-wrap text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: guide.content.replace(/\n/g, '<br/>') }} />
      </article>

      <AdSlot slot="ad-slot-middle" />

      {/* Related prompts */}
      <div className="mt-12 border-t border-gray-200 pt-8">
        <h2 className="text-xl font-bold text-gray-900">Try These Prompts</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.slice(0, 3).map((prompt) => (
            <PromptCard key={prompt.slug} prompt={prompt} />
          ))}
        </div>
      </div>
    </div>
  );
}
