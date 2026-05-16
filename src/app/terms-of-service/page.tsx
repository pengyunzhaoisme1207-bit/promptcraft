import Link from 'next/link';
import type { Metadata } from 'next';
import { absoluteUrl, SITE_NAME } from '@/lib/site';

export const metadata: Metadata = {
  title: `Terms of Service | ${SITE_NAME}`,
  description: 'PromptCraft terms of service covering prompt usage, advertising, external links, content accuracy, and site policies.',
  alternates: { canonical: absoluteUrl('/terms-of-service') },
  openGraph: {
    title: `Terms of Service | ${SITE_NAME}`,
    description: 'PromptCraft terms of service covering prompt usage, advertising, external links, content accuracy, and site policies.',
    url: absoluteUrl('/terms-of-service'),
    siteName: SITE_NAME,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: `Terms of Service | ${SITE_NAME}`,
    description: 'PromptCraft terms of service covering prompt usage, advertising, external links, content accuracy, and site policies.',
  },
};

export default function TermsOfServicePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
      <p className="mt-2 text-sm text-gray-500">Last updated: May 2026</p>
      <div className="mt-8 space-y-6 text-gray-700">
        <h2 className="text-xl font-semibold text-gray-900">Use of This Website</h2>
        <p>PromptCraft (&quot;the Site&quot;) provides a free library of AI prompts. You may use the prompts found on this site for personal or commercial purposes. No account or registration is required.</p>

        <h2 className="text-xl font-semibold text-gray-900">Advertising</h2>
        <p>This site displays advertisements served by Google AdSense. Google and its partners may use cookies to serve ads based on your browsing behavior. By using this site, you consent to the use of these cookies. For more details, see our <Link href="/cookie-policy" className="text-blue-600 hover:text-blue-800">Cookie Policy</Link> and <Link href="/privacy" className="text-blue-600 hover:text-blue-800">Privacy Policy</Link>.</p>

        <h2 className="text-xl font-semibold text-gray-900">Content Accuracy</h2>
        <p>While we strive to provide high-quality prompts, we make no warranties regarding the accuracy or completeness of the content. AI models evolve rapidly, and prompt effectiveness may vary depending on the model version and context.</p>

        <h2 className="text-xl font-semibold text-gray-900">External Links</h2>
        <p>Our website may contain links to third-party websites. We have no control over the content of these sites and accept no responsibility for them.</p>

        <h2 className="text-xl font-semibold text-gray-900">Intellectual Property</h2>
        <p>The design, layout, and original content of this website are protected by copyright. The prompts are provided under a permissive license for personal and commercial use.</p>

        <h2 className="text-xl font-semibold text-gray-900">Changes</h2>
        <p>We reserve the right to modify these terms at any time. Continued use of the site after changes constitutes acceptance of the new terms.</p>

        <h2 className="text-xl font-semibold text-gray-900">Contact</h2>
        <p>For questions about these terms, please <a href="/contact" className="text-blue-600 hover:text-blue-800">contact us</a>.</p>
      </div>
    </div>
  );
}
