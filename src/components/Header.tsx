'use client';

import { useState } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Mobile menu button */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden rounded-lg p-2 text-gray-600 hover:bg-gray-100"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <Link href="/" className="text-xl font-bold text-gray-900">
                PromptCraft
              </Link>
            </div>
            <div className="flex items-center gap-3">
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
              <Link
                href="/generator"
                className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
              >
                Generator
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-50 w-64 overflow-y-auto bg-white lg:hidden">
            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
              <span className="text-lg font-bold text-gray-900">PromptCraft</span>
              <button
                onClick={() => setSidebarOpen(false)}
                className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <Sidebar />
          </div>
        </>
      )}
    </>
  );
}
