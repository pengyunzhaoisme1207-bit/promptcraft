import Link from 'next/link';

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold text-gray-900">PromptCraft</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/for/writing-blog-post" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                Categories
              </Link>
              <Link href="/guide/what-is-prompt-engineering" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                Guides
              </Link>
              <Link href="/generator" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                Generator
              </Link>
              <Link href="/collections/claude-code-prompts" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                Collections
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/for-tool/chatgpt"
              className="hidden sm:inline-block text-sm text-gray-600 hover:text-gray-900"
            >
              ChatGPT
            </Link>
            <Link
              href="/for-tool/claude"
              className="hidden sm:inline-block text-sm text-gray-600 hover:text-gray-900"
            >
              Claude
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
