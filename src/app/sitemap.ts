import { readPrompts, readGuides, readCollections, getAllScenarios, getAllTools, getAllCategories } from '@/lib/data';
import { SITE_URL } from '@/lib/site';

export default async function sitemap() {
  // Static pages
  const staticPages = [
    { url: '', changefreq: 'daily', priority: 1.0 },
    { url: '/generator', changefreq: 'weekly', priority: 0.9 },
    { url: '/guide', changefreq: 'weekly', priority: 0.8 },
    { url: '/collections', changefreq: 'weekly', priority: 0.8 },
    { url: '/about', changefreq: 'monthly', priority: 0.5 },
    { url: '/privacy', changefreq: 'monthly', priority: 0.3 },
    { url: '/cookie-policy', changefreq: 'monthly', priority: 0.3 },
    { url: '/terms-of-service', changefreq: 'monthly', priority: 0.3 },
    { url: '/contact', changefreq: 'monthly', priority: 0.3 },
    { url: '/submit', changefreq: 'monthly', priority: 0.5 },
  ];

  const prompts = readPrompts();
  const guides = readGuides();
  const collections = readCollections();
  const scenarios = getAllScenarios();
  const tools = getAllTools();
  const categories = getAllCategories();

  const promptPages = prompts.map(p => ({ url: `/prompt/${p.slug}`, changefreq: 'weekly', priority: 0.8 }));
  const scenarioPages = scenarios.map(s => ({ url: `/for/${s}`, changefreq: 'weekly', priority: 0.7 }));
  const toolPages = tools.map(t => ({ url: `/for-tool/${t}`, changefreq: 'weekly', priority: 0.7 }));
  const categoryPages = categories.map(c => ({ url: `/category/${c}`, changefreq: 'weekly', priority: 0.6 }));
  const difficultyPages = ['beginner', 'intermediate', 'advanced'].map(d => ({ url: `/difficulty/${d}`, changefreq: 'weekly', priority: 0.5 }));
  const guidePages = guides.map(g => ({ url: `/guide/${g.slug}`, changefreq: 'monthly', priority: 0.8 }));
  const collectionPages = collections.map(c => ({ url: `/collections/${c.slug}`, changefreq: 'monthly', priority: 0.7 }));

  const allPages = [
    ...staticPages,
    ...promptPages,
    ...scenarioPages,
    ...toolPages,
    ...categoryPages,
    ...difficultyPages,
    ...guidePages,
    ...collectionPages,
  ];

  return allPages.map(page => ({
    url: `${SITE_URL}${page.url}`,
    lastModified: new Date(),
    changeFrequency: page.changefreq,
    priority: page.priority,
  }));
}
