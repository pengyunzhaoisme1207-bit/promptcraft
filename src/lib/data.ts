import fs from 'fs';
import path from 'path';

const dataDirectory = path.join(process.cwd(), 'data');

export function readPrompts(): PromptData[] {
  const filePath = path.join(dataDirectory, 'prompts.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(fileContents);
  return data.prompts;
}

export function getPromptBySlug(slug: string): PromptData | undefined {
  const prompts = readPrompts();
  return prompts.find((p: PromptData) => p.slug === slug);
}

export function getPromptsByScenario(scenario: string): PromptData[] {
  const prompts = readPrompts();
  return prompts.filter((p: PromptData) => p.scenario === scenario);
}

export function getPromptsByTool(tool: string): PromptData[] {
  const prompts = readPrompts();
  return prompts.filter((p: PromptData) => p.tools.includes(tool));
}

export function getPromptsByCategory(category: string): PromptData[] {
  const prompts = readPrompts();
  return prompts.filter((p: PromptData) => p.category === category);
}

export function getFeaturedPrompts(count: number = 6): PromptData[] {
  const prompts = readPrompts();
  return prompts.filter((p: PromptData) => p.featured).slice(0, count);
}

export function getAllScenarios(): string[] {
  const prompts = readPrompts();
  const scenarios = [...new Set(prompts.map((p: PromptData) => p.scenario))];
  return scenarios;
}

export function getAllTools(): string[] {
  const prompts = readPrompts();
  const tools = [...new Set(prompts.flatMap((p: PromptData) => p.tools))];
  return tools;
}

export function getAllCategories(): string[] {
  const prompts = readPrompts();
  const categories = [...new Set(prompts.map((p: PromptData) => p.category))];
  return categories;
}

export function getRelatedPrompts(relatedSlugs: string[], currentSlug: string, count: number = 6): PromptData[] {
  const prompts = readPrompts();
  return prompts
    .filter((p: PromptData) => relatedSlugs.includes(p.slug) && p.slug !== currentSlug)
    .slice(0, count);
}

export function readGuides(): GuideData[] {
  const filePath = path.join(dataDirectory, 'guides.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(fileContents);
  return data.guides;
}

export function getGuideBySlug(slug: string): GuideData | undefined {
  const guides = readGuides();
  return guides.find((g: GuideData) => g.slug === slug);
}

export function readCollections(): CollectionData[] {
  const filePath = path.join(dataDirectory, 'collections.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(fileContents);
  return data.collections;
}

export function getCollectionBySlug(slug: string): CollectionData | undefined {
  const collections = readCollections();
  const collection = collections.find((c: CollectionData) => c.slug === slug);
  if (collection) {
    const prompts = readPrompts();
    const promptSlugs = collection.promptSlugs || [];
    collection.prompts = prompts.filter((p: PromptData) => promptSlugs.includes(p.slug));
  }
  return collection;
}

export function readGeneratorTemplates() {
  const filePath = path.join(dataDirectory, 'generator-templates.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(fileContents);
  return data.templates;
}

export function getAllSlugs() {
  const prompts = readPrompts();
  return prompts.map((p: PromptData) => p.slug);
}

export interface PromptData {
  id: string;
  title: string;
  slug: string;
  category: string;
  scenario: string;
  tools: string[];
  difficulty: string;
  tags: string[];
  prompt: string;
  when_to_use: string;
  bad_example: string;
  good_example: string;
  how_to_customize: string;
  advanced_version: string;
  related: string[];
  featured: boolean;
  collection: string[];
}

export interface GuideData {
  id: string;
  title: string;
  slug: string;
  content: string;
  tags: string[];
}

export interface CollectionData {
  id: string;
  name: string;
  slug: string;
  description: string;
  promptSlugs: string[];
  prompts?: PromptData[];
}
