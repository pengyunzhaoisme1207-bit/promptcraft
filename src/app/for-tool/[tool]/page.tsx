import { notFound } from 'next/navigation';
import Link from 'next/link';
import PromptListGrid from '@/components/PromptListGrid';
import { getPromptsByTool, getAllTools } from '@/lib/data';

export function generateStaticParams() {
  return getAllTools().map((tool) => ({ tool }));
}

export async function generateMetadata({ params }: { params: Promise<{ tool: string }> }) {
  const { tool } = await params;
  const label = tool.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  return {
    title: `Best Prompts for ${label} - Free Examples | PromptCraft`,
    description: `Find the best AI prompts for ${label}. Tested prompts with examples, tips, and customization guides.`,
  };
}

const toolDescriptions: Record<string, string> = {
  'chatgpt': 'Optimized prompts for ChatGPT/GPT-4. These prompts leverage ChatGPT\'s strengths in creative writing, structured output, and following format instructions.',
  'claude': 'Optimized prompts for Claude/Claude Opus. These prompts leverage Claude\'s strengths in analysis, reasoning, long-context understanding, and nuanced responses.',
  'gemini': 'Optimized prompts for Google Gemini. These prompts leverage Gemini\'s strengths in multimodal understanding and Google ecosystem integration.',
  'midjourney': 'Optimized prompts for Midjourney v6. These prompts use proper Midjourney syntax including aspect ratios, version tags, and styling parameters.',
  'dall-e': 'Optimized prompts for DALL-E 3. These prompts are detailed and literal, which DALL-E 3 interprets best for specific compositions.',
  'stable-diffusion': 'Optimized prompts for Stable Diffusion. These prompts use weighting syntax and include negative prompts for better results.',
  'claude-code': 'Optimized prompts for Claude Code — the AI coding assistant. These prompts leverage Claude Code\'s specific capabilities for development workflows.',
};

export default async function ToolPage({ params }: { params: Promise<{ tool: string }> }) {
  const { tool } = await params;
  const prompts = getPromptsByTool(tool);
  if (prompts.length === 0) notFound();

  const label = tool.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  const description = toolDescriptions[tool] || `Find the best AI prompts for ${label}.`;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <nav className="mb-4 text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-900">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Tools</span>
        </nav>
        <h1 className="text-3xl font-bold text-gray-900">Best Prompts for {label}</h1>
        <p className="mt-3 text-lg text-gray-600">{description}</p>
        <p className="mt-2 text-sm text-gray-500">{prompts.length} prompts available</p>
      </div>

      <PromptListGrid prompts={prompts} />
    </div>
  );
}
