import Link from 'next/link';
import type { Metadata } from 'next';
import EditorialHero from '@/components/EditorialHero';
import { readGuides, GuideData } from '@/lib/data';
import { absoluteUrl, SITE_NAME } from '@/lib/site';

export const metadata: Metadata = {
  title: `Prompt Engineering Guides | ${SITE_NAME}`,
  description: 'Learn prompt engineering with practical guides, case studies, frameworks, examples, and workflow advice for everyday AI users.',
  alternates: { canonical: absoluteUrl('/guide') },
  openGraph: {
    title: `Prompt Engineering Guides | ${SITE_NAME}`,
    description: 'Learn prompt engineering with practical guides, case studies, frameworks, examples, and workflow advice for everyday AI users.',
    url: absoluteUrl('/guide'),
    siteName: SITE_NAME,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: `Prompt Engineering Guides | ${SITE_NAME}`,
    description: 'Learn prompt engineering with practical guides, case studies, frameworks, examples, and workflow advice for everyday AI users.',
  },
};

export default function GuidesPage() {
  const guides = readGuides();

  const principles = guides.filter(g => ['prompt-engineering', 'prompt-writing', 'principles', 'frameworks', 'basics'].some(t => g.tags.includes(t)));
  const caseStudies = guides.filter(g => g.tags.includes('case-study'));
  const advanced = guides.filter(g => g.tags.includes('advanced') && !g.tags.includes('case-study'));
  const workflow = guides.filter(g => ['organization', 'workflow', 'teams', 'collaboration'].some(t => g.tags.includes(t)));

  const remaining = guides.filter(g =>
    ![...principles, ...caseStudies, ...advanced, ...workflow].some(e => e.slug === g.slug)
  );

  const sections = [
    { title: 'Principles & Fundamentals', description: 'Learn the core concepts of prompt engineering', guides: principles },
    { title: 'Real-World Case Studies', description: 'See how real users achieve results with AI prompts', guides: caseStudies },
    { title: 'Advanced Techniques', description: 'Level up with system prompts, chain of thought, and more', guides: advanced },
    { title: 'Workflow & Organization', description: 'Build sustainable prompt practices for individuals and teams', guides: workflow },
  ].filter(s => s.guides.length > 0);

  if (remaining.length > 0) {
    sections.push({ title: 'More Guides', description: '', guides: remaining });
  }

  return (
    <>
      <EditorialHero
        variant="guides"
        eyebrow="Practical Guide Archive"
        title="Prompt Engineering Guides"
        description={`${guides.length} comprehensive guides to help you write better prompts, review AI output, and build repeatable workflows.`}
      />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <nav className="mb-4 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-900">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Guides</span>
          </nav>
        </div>

        {sections.map((section) => (
          <div key={section.title} className="mb-10">
            <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
            {section.description && <p className="mt-1 text-sm text-gray-500">{section.description}</p>}
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {section.guides.map((guide: GuideData) => (
                <Link
                  key={guide.slug}
                  href={`/guide/${guide.slug}`}
                  className="group block rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 line-clamp-2">
                      {guide.title}
                    </h3>
                    <svg className="h-4 w-4 shrink-0 text-gray-400 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                    {guide.content.replace(/[#*_|>`-]/g, '').slice(0, 120)}...
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {guide.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
