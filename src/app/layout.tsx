import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Free AI Prompt Library - 1000+ Prompts for ChatGPT & Claude | PromptCraft",
  description: "Find the right prompt for any task. 1000+ free, tested prompts for writing, coding, marketing, and more. Each prompt includes usage tips and examples.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7338826858147459"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
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
