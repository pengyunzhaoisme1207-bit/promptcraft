import fs from 'fs';
import path from 'path';

const dataPath = path.join('/Users/jacky.peng/prompt-site/data', 'prompts.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const prompts = data.prompts;
let id = prompts.length + 1;

const extra10 = [
  { title: 'Video Description Writer', scenario: 'marketing-copy', tools: ['chatgpt', 'claude'], difficulty: 'beginner', tags: ['video', 'description', 'youtube'],
    when: 'Write compelling video descriptions for YouTube or social media.' },
  { title: 'White Paper Outline Writer', scenario: 'writing-blog-post', tools: ['chatgpt', 'claude'], difficulty: 'advanced', tags: ['whitepaper', 'b2b', 'content'],
    when: 'Create a professional white paper outline with logical flow and evidence points.' },
  { title: 'Grant Proposal Writer', scenario: 'writing', scenario2: 'writing-blog-post', tools: ['chatgpt', 'claude'], difficulty: 'advanced', tags: ['grant', 'proposal', 'funding'],
    when: 'Write a compelling grant proposal with clear need statement and impact metrics.' },
  { title: 'Ebook Chapter Writer', scenario: 'writing-blog-post', tools: ['chatgpt', 'claude', 'gemini'], difficulty: 'intermediate', tags: ['ebook', 'chapter', 'long-form'],
    when: 'Write a comprehensive ebook chapter with examples, visuals suggestions, and key takeaways.' },
  { title: 'FAQ Answer Writer', scenario: 'marketing-copy', tools: ['chatgpt', 'claude', 'gemini'], difficulty: 'beginner', tags: ['faq', 'customer-service', 'content'],
    when: 'Write helpful, SEO-friendly FAQ answers that address real customer concerns.' },
  { title: 'Testimonial Request Email', scenario: 'writing-emails', tools: ['chatgpt', 'claude'], difficulty: 'beginner', tags: ['email', 'testimonial', 'feedback'],
    when: 'Request customer testimonials professionally with specific guidance.' },
  { title: 'Onboarding Email Sequence', scenario: 'writing-emails', tools: ['chatgpt', 'claude'], difficulty: 'intermediate', tags: ['email', 'onboarding', 'sequence'],
    when: 'Create a 5-email onboarding sequence that guides new users to their first success.' },
  { title: 'Code Comment Writer', scenario: 'coding-help', tools: ['chatgpt', 'claude', 'gemini'], difficulty: 'beginner', tags: ['coding', 'comments', 'documentation'],
    when: 'Add clear, helpful comments to code explaining the why, not just the what.' },
  { title: 'README.md File Generator', scenario: 'coding-help', tools: ['chatgpt', 'claude', 'gemini'], difficulty: 'beginner', tags: ['coding', 'readme', 'documentation'],
    when: 'Generate a comprehensive README.md for your project with all essential sections.' },
  { title: 'API Documentation Writer', scenario: 'coding-help', tools: ['chatgpt', 'claude'], difficulty: 'intermediate', tags: ['coding', 'api', 'documentation'],
    when: 'Write clear API documentation with endpoints, parameters, examples, and error codes.' },
];

extra10.forEach(e => {
  const slug = e.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
  const scenario = e.scenario2 || e.scenario;
  prompts.push({
    id: `prompt-${String(id++).padStart(3, '0')}`,
    title: e.title, slug,
    category: e.scenario === 'coding-help' ? 'coding' : 'writing',
    scenario,
    tools: e.tools, difficulty: e.difficulty, tags: e.tags,
    prompt: `You are an expert professional writer. ${e.when} Context: [provide your specific details, audience, and goal]. Write content that is engaging, clear, and achieves its specific purpose.`,
    when_to_use: e.when,
    bad_example: 'Write something for me.',
    good_example: 'Well-crafted content that speaks directly to the target audience and achieves its purpose.',
    how_to_customize: 'Provide specific context, audience, and goal. The more detail, the better.',
    advanced_version: 'Write using proven frameworks specific to this content type. Include variations for A/B testing.',
    related: [], featured: false, collection: []
  });
});

fs.writeFileSync(dataPath, JSON.stringify({ prompts }, null, 2));
console.log(`Total prompts: ${prompts.length}`);
