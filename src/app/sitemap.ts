import { readPrompts, readGuides, readCollections, getAllScenarios, getAllTools } from '@/lib/data';

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://prompt.next-happy.com';

  // Static pages
  const staticPages = [
    { url: '', changefreq: 'daily', priority: 1.0 },
    { url: '/generator', changefreq: 'weekly', priority: 0.9 },
    { url: '/about', changefreq: 'monthly', priority: 0.5 },
    { url: '/privacy', changefreq: 'monthly', priority: 0.3 },
    { url: '/contact', changefreq: 'monthly', priority: 0.3 },
    { url: '/submit', changefreq: 'monthly', priority: 0.5 },
  ];

  const prompts = readPrompts();
  const guides = readGuides();
  const collections = readCollections();
  const scenarios = getAllScenarios();
  const tools = getAllTools();

  const promptPages = prompts.map(p => ({ url: `/prompt/${p.slug}`, changefreq: 'weekly', priority: 0.8 }));
  const scenarioPages = scenarios.map(s => ({ url: `/for/${s}`, changefreq: 'weekly', priority: 0.7 }));
  const toolPages = tools.map(t => ({ url: `/for-tool/${t}`, changefreq: 'weekly', priority: 0.7 }));
  const guidePages = guides.map(g => ({ url: `/guide/${g.slug}`, changefreq: 'monthly', priority: 0.8 }));
  const collectionPages = collections.map(c => ({ url: `/collections/${c.slug}`, changefreq: 'monthly', priority: 0.7 }));

  const allPages = [
    ...staticPages,
    ...promptPages,
    ...scenarioPages,
    ...toolPages,
    ...guidePages,
    ...collectionPages,
  ];

  return allPages.map(page => ({
    url: `${baseUrl}${page.url}`,
    lastModified: new Date(),
    changeFrequency: page.changefreq,
    priority: page.priority,
  }));
}
