import Link from 'next/link';
import { PromptData } from '@/lib/data';

interface PromptCardProps {
  prompt: PromptData;
}

const toolColors: Record<string, string> = {
  chatgpt: 'bg-green-100 text-green-800',
  claude: 'bg-purple-100 text-purple-800',
  gemini: 'bg-blue-100 text-blue-800',
  midjourney: 'bg-pink-100 text-pink-800',
  'dall-e': 'bg-red-100 text-red-800',
  'stable-diffusion': 'bg-orange-100 text-orange-800',
};

const difficultyLabels: Record<string, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};

export default function PromptCard({ prompt }: PromptCardProps) {
  return (
    <Link href={`/prompt/${prompt.slug}`} className="group block rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 line-clamp-2">
          {prompt.title}
        </h3>
        <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
          prompt.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
          prompt.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {difficultyLabels[prompt.difficulty] || prompt.difficulty}
        </span>
      </div>
      <p className="mt-2 text-sm text-gray-600 line-clamp-2">
        {prompt.when_to_use}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {prompt.tools.slice(0, 3).map((tool) => (
          <span
            key={tool}
            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${toolColors[tool] || 'bg-gray-100 text-gray-800'}`}
          >
            {tool === 'chatgpt' ? 'ChatGPT' : tool === 'claude' ? 'Claude' : tool === 'gemini' ? 'Gemini' : tool === 'midjourney' ? 'Midjourney' : tool === 'dall-e' ? 'DALL-E' : tool === 'stable-diffusion' ? 'Stable Diffusion' : tool}
          </span>
        ))}
        {prompt.tags.slice(0, 2).map((tag) => (
          <span key={tag} className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
