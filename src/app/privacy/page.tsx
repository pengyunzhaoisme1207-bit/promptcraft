import type { Metadata } from 'next';
import { absoluteUrl, SITE_NAME } from '@/lib/site';

export const metadata: Metadata = {
  title: `Privacy Policy | ${SITE_NAME}`,
  description: 'PromptCraft privacy policy covering static site usage, Google AdSense cookies, third-party links, and contact information.',
  alternates: { canonical: absoluteUrl('/privacy') },
  openGraph: {
    title: `Privacy Policy | ${SITE_NAME}`,
    description: 'PromptCraft privacy policy covering static site usage, Google AdSense cookies, third-party links, and contact information.',
    url: absoluteUrl('/privacy'),
    siteName: SITE_NAME,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: `Privacy Policy | ${SITE_NAME}`,
    description: 'PromptCraft privacy policy covering static site usage, Google AdSense cookies, third-party links, and contact information.',
  },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
      <p className="mt-2 text-sm text-gray-500">Last updated: May 2026</p>
      <div className="mt-8 space-y-6 text-gray-700">
        <h2 className="text-xl font-semibold text-gray-900">Information We Collect</h2>
        <p>PromptCraft is a static website. We do not collect, store, or process any personal information. We do not require accounts, login credentials, or personal data to use our prompt library.</p>

        <h2 className="text-xl font-semibold text-gray-900">Cookies</h2>
        <p>When we enable advertising through Google AdSense, third-party cookies may be set for ad personalization. Google uses cookies to serve ads based on your prior visits to this and other websites.</p>
        <p className="mt-2">Google&apos;s use of advertising cookies enables it and its partners to serve ads based on your visit to this site and/or other sites on the Internet. You may opt out of <a href="https://www.google.com/settings/ads" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">personalized advertising</a> by visiting Google Ads Settings. Additionally, you can opt out of a third-party vendor&apos;s use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info/" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">www.aboutads.info</a>.</p>

        <h2 className="text-xl font-semibold text-gray-900">Third-Party Services</h2>
        <p>We may use the following third-party services:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Google AdSense — for advertising (see <a href="https://policies.google.com/privacy" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a>)</li>
          <li>Vercel — for hosting (see <a href="https://vercel.com/legal/vercel-privacy-policy" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">Vercel Privacy Policy</a>)</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900">External Links</h2>
        <p>Our website contains links to external websites. We are not responsible for the privacy practices or content of these sites.</p>

        <h2 className="text-xl font-semibold text-gray-900">Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date.</p>

        <h2 className="text-xl font-semibold text-gray-900">Contact</h2>
        <p>If you have questions about this Privacy Policy, please <a href="/contact" className="text-blue-600 hover:text-blue-800">contact us</a>.</p>
      </div>
    </div>
  );
}
