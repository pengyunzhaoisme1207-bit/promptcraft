'use client';

import { useState } from 'react';

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers or non-HTTPS
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
        copied
          ? 'bg-green-600 text-white'
          : 'bg-blue-600 text-white hover:bg-blue-700'
      }`}
    >
      {copied ? '✓ Copied!' : 'Copy Prompt'}
    </button>
  );
}
