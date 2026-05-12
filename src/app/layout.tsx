import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import { absoluteUrl, SITE_NAME, SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Curated AI Prompt Library for ChatGPT & Claude | PromptCraft",
  description: "Find practical AI prompts for real work. PromptCraft curates prompts with usage notes, examples, and customization guidance for writing, coding, marketing, and more.",
  alternates: {
    canonical: absoluteUrl('/'),
  },
  openGraph: {
    title: "Curated AI Prompt Library for ChatGPT & Claude | PromptCraft",
    description: "Find practical AI prompts for real work, with examples and customization guidance.",
    url: absoluteUrl('/'),
    siteName: SITE_NAME,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: "Curated AI Prompt Library for ChatGPT & Claude | PromptCraft",
    description: "Find practical AI prompts for real work, with examples and customization guidance.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7338826858147459"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
        <Script id="website-jsonld" type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: SITE_NAME,
            url: SITE_URL,
            potentialAction: {
              '@type': 'SearchAction',
              target: `${SITE_URL}/?q={search_term_string}`,
              'query-input': 'required name=search_term_string',
            },
          })}
        </Script>
        <Header />
        <div className="flex flex-1">
          <div className="hidden lg:block">
            <Sidebar />
          </div>
          <main className="flex-1 min-w-0">{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
