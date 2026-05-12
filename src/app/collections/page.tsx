import Link from 'next/link';
import { readCollections, getFeaturedPrompts, CollectionData, PromptData } from '@/lib/data';

export default function CollectionsPage() {
  const collections = readCollections();
  const featured = getFeaturedPrompts(6);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <nav className="mb-4 text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-900">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Collections</span>
        </nav>
        <h1 className="text-3xl font-bold text-gray-900">Curated Prompt Collections</h1>
        <p className="mt-3 text-lg text-gray-600">Hand-picked prompt sets organized by role, tool, and workflow.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {collections.map((c: CollectionData) => {
          const count = c.promptSlugs?.length || 0;
          return (
            <Link
              key={c.slug}
              href={`/collections/${c.slug}`}
              className="group block rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg"
            >
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                {c.name}
              </h3>
              <p className="mt-2 text-sm text-gray-600 line-clamp-2">{c.description}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-gray-500">{count} prompts</span>
                <span className="text-sm font-medium text-blue-600 group-hover:underline">
                  Browse →
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Featured prompts */}
      {featured.length > 0 && (
        <div className="mt-12 border-t border-gray-200 pt-8">
          <h2 className="text-xl font-bold text-gray-900">Featured Prompts</h2>
          <p className="mt-2 text-gray-600">Not sure where to start? Try these top-rated prompts.</p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p: PromptData) => (
              <Link
                key={p.slug}
                href={`/prompt/${p.slug}`}
                className="group block rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg"
              >
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 line-clamp-2">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">{p.when_to_use}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.tools.slice(0, 3).map(t => (
                    <span key={t} className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                      {t}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
