import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Browse Prompts</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/for/writing-emails" className="text-sm text-gray-600 hover:text-gray-900">Email Writing</Link></li>
              <li><Link href="/for/writing-blog-post" className="text-sm text-gray-600 hover:text-gray-900">Blog Posts</Link></li>
              <li><Link href="/for/coding-help" className="text-sm text-gray-600 hover:text-gray-900">Coding</Link></li>
              <li><Link href="/for/image-generation" className="text-sm text-gray-600 hover:text-gray-900">Image Generation</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">By Tool</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/for-tool/chatgpt" className="text-sm text-gray-600 hover:text-gray-900">ChatGPT</Link></li>
              <li><Link href="/for-tool/claude" className="text-sm text-gray-600 hover:text-gray-900">Claude</Link></li>
              <li><Link href="/for-tool/gemini" className="text-sm text-gray-600 hover:text-gray-900">Gemini</Link></li>
              <li><Link href="/for-tool/midjourney" className="text-sm text-gray-600 hover:text-gray-900">Midjourney</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Guides</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/guide/what-is-prompt-engineering" className="text-sm text-gray-600 hover:text-gray-900">What is Prompt Engineering</Link></li>
              <li><Link href="/guide/how-to-write-better-prompts" className="text-sm text-gray-600 hover:text-gray-900">How to Write Better Prompts</Link></li>
              <li><Link href="/guide/prompt-frameworks-explained" className="text-sm text-gray-600 hover:text-gray-900">Prompt Frameworks</Link></li>
              <li><Link href="/generator" className="text-sm text-gray-600 hover:text-gray-900">Prompt Generator</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Company</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/about" className="text-sm text-gray-600 hover:text-gray-900">About</Link></li>
              <li><Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900">Contact</Link></li>
              <li><Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900">Privacy Policy</Link></li>
              <li><Link href="/submit" className="text-sm text-gray-600 hover:text-gray-900">Submit a Prompt</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} PromptCraft. The Right Prompt for Every Task.
          </p>
        </div>
      </div>
    </footer>
  );
}
