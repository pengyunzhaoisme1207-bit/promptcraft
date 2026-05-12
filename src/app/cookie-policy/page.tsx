export default function CookiePolicyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">Cookie Policy</h1>
      <p className="mt-2 text-sm text-gray-500">Last updated: May 2026</p>
      <div className="mt-8 space-y-6 text-gray-700">
        <p>PromptCraft uses cookies to enhance your browsing experience and serve advertisements. This Cookie Policy explains what cookies are, how we use them, and your choices.</p>

        <h2 className="text-xl font-semibold text-gray-900">What Are Cookies</h2>
        <p>Cookies are small text files stored on your device when you visit a website. They help the site remember your preferences and understand how you interact with our content.</p>

        <h2 className="text-xl font-semibold text-gray-900">How We Use Cookies</h2>
        <p>PromptCraft itself does not set any tracking cookies. However, we use the following third-party services that may set cookies:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Google AdSense</strong> — uses the DART cookie to serve ads based on your visits to this and other websites. You can opt out of DART cookie usage by visiting the <a href="https://www.google.com/privacy/ad-partners" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">Google Ad and Content Privacy Policy</a> page.</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900">Types of Cookies Used</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Advertising Cookies:</strong> Used by Google AdSense to deliver relevant ads and measure ad performance.</li>
          <li><strong>Functional Cookies:</strong> Used by our hosting provider (Vercel) for site operation and performance.</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900">Managing Cookies</h2>
        <p>Most web browsers automatically accept cookies. You can usually configure your browser settings to prevent this. You can also delete cookies stored on your device through your browser settings.</p>
        <p>For Google&apos;s personalized ads, visit <a href="https://www.google.com/settings/ads" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">Google Ads Settings</a> to opt out.</p>

        <h2 className="text-xl font-semibold text-gray-900">Contact</h2>
        <p>If you have questions about our use of cookies, please <a href="/contact" className="text-blue-600 hover:text-blue-800">contact us</a>.</p>
      </div>
    </div>
  );
}
