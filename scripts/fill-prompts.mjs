import fs from 'fs';
import path from 'path';

// Load existing prompts
const dataPath = path.join('/Users/jacky.peng/prompt-site/data', 'prompts.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const prompts = data.prompts;
let id = prompts.length + 1;

function addPrompt(data) {
  const slug = data.title.toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 80);

  // Ensure unique slug
  let finalSlug = slug;
  let counter = 1;
  const existingSlugs = new Set(prompts.map(p => p.slug));
  while (existingSlugs.has(finalSlug)) {
    finalSlug = `${slug}-${counter}`;
    counter++;
  }

  prompts.push({
    id: `prompt-${String(id++).padStart(3, '0')}`,
    title: data.title,
    slug: finalSlug,
    category: data.category,
    scenario: data.scenario,
    tools: data.tools,
    difficulty: data.difficulty,
    tags: data.tags,
    prompt: data.prompt,
    when_to_use: data.when_to_use,
    bad_example: data.bad_example,
    good_example: data.good_example,
    how_to_customize: data.how_to_customize,
    advanced_version: data.advanced_version,
    related: data.related || [],
    featured: data.featured || false,
    collection: data.collection || []
  });
}

// 10 more creative writing prompts
const extraCreative = [
  { title: 'Scriptwriter Dialogue Generator', scenario: 'creative-writing', tools: ['chatgpt', 'claude'], difficulty: 'advanced', tags: ['creative', 'screenplay', 'dialogue'],
    when_to_use: 'Write authentic screenplay dialogue with subtext and character-specific voice patterns.' },
  { title: 'Blog Post Repurposing Prompt', scenario: 'writing-blog-post', tools: ['chatgpt', 'claude', 'gemini'], difficulty: 'intermediate', tags: ['blog', 'repurposing', 'content'],
    when_to_use: 'Transform one blog post into multiple content formats for different platforms.' },
  { title: 'Twitter Thread Writer', scenario: 'marketing-copy', tools: ['chatgpt', 'claude'], difficulty: 'intermediate', tags: ['twitter', 'thread', 'social-media'],
    when_to_use: 'Write an engaging Twitter thread that builds to a compelling conclusion.' },
  { title: 'YouTube Video Script Writer', scenario: 'marketing-copy', tools: ['chatgpt', 'claude', 'gemini'], difficulty: 'intermediate', tags: ['youtube', 'script', 'video'],
    when_to_use: 'Write a YouTube video script with hook, content, and call-to-action.' },
  { title: 'Podcast Episode Outline', scenario: 'writing-blog-post', tools: ['chatgpt', 'claude'], difficulty: 'beginner', tags: ['podcast', 'outline', 'audio'],
    when_to_use: 'Create a structured podcast episode outline with segments and talking points.' },
  { title: 'Webinar Presentation Writer', scenario: 'writing-blog-post', tools: ['chatgpt', 'claude'], difficulty: 'intermediate', tags: ['webinar', 'presentation', 'teaching'],
    when_to_use: 'Write a compelling webinar presentation with clear learning objectives.' },
  { title: 'Email Subject Line Generator', scenario: 'writing-emails', tools: ['chatgpt', 'claude', 'gemini'], difficulty: 'beginner', tags: ['email', 'subject-line', 'open-rate'],
    when_to_use: 'Generate high-open-rate email subject lines using proven formulas.' },
  { title: 'Landing Page Headline Writer', scenario: 'marketing-copy', tools: ['chatgpt', 'claude'], difficulty: 'beginner', tags: ['landing-page', 'headline', 'conversion'],
    when_to_use: 'Write compelling landing page headlines that capture attention immediately.' },
  { title: 'Product Naming Prompt', scenario: 'business-planning', tools: ['chatgpt', 'claude', 'gemini'], difficulty: 'intermediate', tags: ['business', 'naming', 'branding'],
    when_to_use: 'Generate creative product or brand names with available domain suggestions.' },
  { title: 'Brand Story Writer', scenario: 'marketing-copy', tools: ['chatgpt', 'claude'], difficulty: 'advanced', tags: ['brand', 'storytelling', 'identity'],
    when_to_use: 'Write a compelling brand story that connects emotionally with customers.' },
];

extraCreative.forEach(p => addPrompt({
  title: p.title, category: p.category || 'writing', scenario: p.scenario,
  tools: p.tools, difficulty: p.difficulty, tags: p.tags,
  prompt: `You are an expert professional writer. ${p.when_to_use} Context: [provide your specific details, audience, and goal]. Write content that is engaging, clear, and achieves its specific purpose.`,
  when_to_use: p.when_to_use,
  bad_example: 'Write something for me.',
  good_example: 'Well-crafted content that speaks directly to the target audience and achieves its purpose.',
  how_to_customize: 'Provide specific context, audience, and goal. The more detail, the better.',
  advanced_version: 'Write using proven frameworks specific to this content type. Include variations for A/B testing.',
  related: [], featured: false, collection: []
}));

// Write updated file
fs.writeFileSync(dataPath, JSON.stringify({ prompts }, null, 2));
console.log(`Total prompts: ${prompts.length}`);
console.log('Categories:', [...new Set(prompts.map(p => p.category))]);
console.log('Scenarios:', [...new Set(prompts.map(p => p.scenario))]);
