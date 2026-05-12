import { notFound } from 'next/navigation';
import Link from 'next/link';
import PromptListGrid from '@/components/PromptListGrid';
import { getPromptsByCategory, getAllCategories } from '@/lib/data';

export function generateStaticParams() {
  return getAllCategories().map((category) => ({ category }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const label = category.replace(/\b\w/g, (c) => c.toUpperCase());
  return {
    title: `${label} AI Prompts - Free Templates | PromptCraft`,
    description: `Browse AI prompts for ${label.toLowerCase()}. Each prompt includes usage tips, examples, and customization guides.`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const prompts = getPromptsByCategory(category);
  if (prompts.length === 0) notFound();

  const label = category.replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <nav className="mb-4 text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-900">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Categories</span>
        </nav>
        <h1 className="text-3xl font-bold text-gray-900">{label} Prompts</h1>
        <p className="mt-2 text-sm text-gray-500">{prompts.length} prompts available</p>
      </div>

      <PromptListGrid prompts={prompts} />
    </div>
  );
}
