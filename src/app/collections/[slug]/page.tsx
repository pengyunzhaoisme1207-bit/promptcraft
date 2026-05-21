import { notFound } from 'next/navigation';
import Link from 'next/link';
import EditorialHero from '@/components/EditorialHero';
import PromptListGrid from '@/components/PromptListGrid';
import { getCollectionBySlug, readCollections, CollectionData } from '@/lib/data';

export function generateStaticParams() {
  return readCollections().map((collection: CollectionData) => ({ slug: collection.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) return { title: 'Collection Not Found' };
  const count = collection.prompts?.length || 0;
  return {
    title: `${collection.name} - ${count} Curated AI Prompts | PromptCraft`,
    description: collection.description,
  };
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) notFound();
  if (!collection.prompts || collection.prompts.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900">{collection.name}</h1>
        <p className="mt-4 text-gray-600">This collection is being populated soon. Check back later!</p>
      </div>
    );
  }

  return (
    <>
      <EditorialHero
        variant="collections"
        eyebrow={`${collection.prompts.length} curated prompts`}
        title={collection.name}
        description={collection.description}
      />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <nav className="mb-6 text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-900">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/collections" className="hover:text-gray-900">Collections</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{collection.name}</span>
        </nav>

        <PromptListGrid prompts={collection.prompts} showGrouping={false} />
      </div>
    </>
  );
}
