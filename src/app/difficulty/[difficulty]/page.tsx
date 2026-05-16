import { notFound } from 'next/navigation';
import Link from 'next/link';
import PromptListGrid from '@/components/PromptListGrid';
import { getPromptsByDifficulty } from '@/lib/data';
import { absoluteUrl, SITE_NAME } from '@/lib/site';

export function generateStaticParams() {
  return [{ difficulty: 'beginner' }, { difficulty: 'intermediate' }, { difficulty: 'advanced' }];
}

export async function generateMetadata({ params }: { params: Promise<{ difficulty: string }> }) {
  const { difficulty } = await params;
  const label = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  const description = `Browse ${difficulty.toLowerCase()} level AI prompts. Each prompt includes usage tips, examples, and customization guides.`;
  const url = absoluteUrl(`/difficulty/${difficulty}`);
  return {
    title: `${label} AI Prompts - Free Templates | PromptCraft`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${label} AI Prompts | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: `${label} AI Prompts | ${SITE_NAME}`,
      description,
    },
  };
}

export default async function DifficultyPage({ params }: { params: Promise<{ difficulty: string }> }) {
  const { difficulty } = await params;
  const prompts = getPromptsByDifficulty(difficulty);
  if (prompts.length === 0) notFound();

  const label = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <nav className="mb-4 text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-900">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Difficulty</span>
        </nav>
        <h1 className="text-3xl font-bold text-gray-900">{label} Prompts</h1>
        <p className="mt-2 text-sm text-gray-500">{prompts.length} prompts available</p>
      </div>

      <PromptListGrid prompts={prompts} showGrouping={false} />
    </div>
  );
}
