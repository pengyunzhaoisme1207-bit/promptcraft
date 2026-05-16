import Link from 'next/link';
import type { Metadata } from 'next';
import { absoluteUrl, SITE_NAME } from '@/lib/site';

export const metadata: Metadata = {
  title: `About | ${SITE_NAME}`,
  description: 'Learn how PromptCraft curates practical AI prompts with usage context, examples, customization notes, and advanced prompt variants.',
  alternates: { canonical: absoluteUrl('/about') },
  openGraph: {
    title: `About | ${SITE_NAME}`,
    description: 'Learn how PromptCraft curates practical AI prompts with usage context, examples, customization notes, and advanced prompt variants.',
    url: absoluteUrl('/about'),
    siteName: SITE_NAME,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: `About | ${SITE_NAME}`,
    description: 'Learn how PromptCraft curates practical AI prompts with usage context, examples, customization notes, and advanced prompt variants.',
  },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">About PromptCraft</h1>
      <div className="mt-8 space-y-6 text-gray-700">
        <p className="text-lg">
          PromptCraft is not just another prompt library. It&apos;s a <strong>prompt usage guide</strong> — designed to help you understand not just what to ask AI, but <em>why</em> it works and <em>how</em> to make it your own.
        </p>
        <h2 className="text-xl font-semibold text-gray-900">The Problem We Solve</h2>
        <p>
          Most prompt platforms just give you a list of prompts. But without understanding the context — when to use them, why they&apos;re structured that way, and how to adapt them for your specific needs — you&apos;re just copying without learning.
        </p>
        <h2 className="text-xl font-semibold text-gray-900">Our Approach</h2>
        <p>Every prompt on PromptCraft includes:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>When to use it</strong> — so you know the right context</li>
          <li><strong>Bad vs. good examples</strong> — so you can see the difference</li>
          <li><strong>Customization instructions</strong> — so you can make it your own</li>
          <li><strong>Advanced versions</strong> — so you can level up your skills</li>
        </ul>
        <h2 className="text-xl font-semibold text-gray-900">What&apos;s Inside</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>A curated prompt library</strong> across writing, coding, marketing, analysis, image generation, and more</li>
          <li><strong>11 scenario categories</strong> — organized by what you want to do, not by tool</li>
          <li><strong>6 tool-specific collections</strong> — prompts optimized for ChatGPT, Claude, Gemini, Midjourney, DALL-E, and Stable Diffusion</li>
          <li><strong>18 comprehensive guides</strong> — teaching you the principles behind effective prompting</li>
          <li><strong>Prompt Generator</strong> — an interactive tool that builds custom prompts from templates</li>
        </ul>
        <h2 className="text-xl font-semibold text-gray-900">Get Started</h2>
        <p>
          Browse <Link href="/for/writing-blog-post" className="text-blue-600 hover:text-blue-800">prompts by scenario</Link>, explore <Link href="/guide/what-is-prompt-engineering" className="text-blue-600 hover:text-blue-800">our guides</Link>, or try the <Link href="/generator" className="text-blue-600 hover:text-blue-800">prompt generator</Link>.
        </p>
      </div>
    </div>
  );
}
