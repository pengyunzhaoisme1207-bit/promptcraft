import Link from 'next/link';
import type { ReactNode } from 'react';

function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /(\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)|`([^`]+)`)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    if (match[2]) {
      nodes.push(<strong key={nodes.length}>{match[2]}</strong>);
    } else if (match[3] && match[4]) {
      const href = match[4];
      const className = 'font-medium text-blue-700 underline decoration-blue-200 underline-offset-2 hover:text-blue-900';
      nodes.push(
        href.startsWith('/') ? (
          <Link key={nodes.length} href={href} className={className}>
            {match[3]}
          </Link>
        ) : (
          <a key={nodes.length} href={href} className={className} rel="noopener noreferrer" target="_blank">
            {match[3]}
          </a>
        ),
      );
    } else if (match[5]) {
      nodes.push(
        <code key={nodes.length} className="rounded bg-gray-100 px-1.5 py-0.5 text-[0.9em] text-gray-900">
          {match[5]}
        </code>,
      );
    }

    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

export default function MarkdownContent({ content }: { content: string }) {
  const lines = content.split('\n');
  const blocks: ReactNode[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    const trimmed = line.trim();

    if (!trimmed) {
      index += 1;
      continue;
    }

    if (trimmed.startsWith('```')) {
      const codeLines: string[] = [];
      index += 1;
      while (index < lines.length && !lines[index].trim().startsWith('```')) {
        codeLines.push(lines[index]);
        index += 1;
      }
      blocks.push(
        <pre key={blocks.length} className="overflow-x-auto rounded-lg bg-gray-950 p-4 text-sm leading-6 text-gray-100">
          <code>{codeLines.join('\n')}</code>
        </pre>,
      );
      index += 1;
      continue;
    }

    if (trimmed.startsWith('### ')) {
      blocks.push(
        <h3 key={blocks.length} className="mt-8 text-xl font-semibold text-gray-900">
          {renderInline(trimmed.slice(4))}
        </h3>,
      );
      index += 1;
      continue;
    }

    if (trimmed.startsWith('## ')) {
      blocks.push(
        <h2 key={blocks.length} className="mt-10 border-t border-gray-200 pt-8 text-2xl font-bold text-gray-900">
          {renderInline(trimmed.slice(3))}
        </h2>,
      );
      index += 1;
      continue;
    }

    if (trimmed.startsWith('# ')) {
      index += 1;
      continue;
    }

    if (trimmed.startsWith('> ')) {
      const quoteLines: string[] = [];
      while (index < lines.length && lines[index].trim().startsWith('> ')) {
        quoteLines.push(lines[index].trim().slice(2));
        index += 1;
      }
      blocks.push(
        <blockquote key={blocks.length} className="rounded-lg border-l-4 border-blue-500 bg-blue-50 px-5 py-4 text-gray-800">
          {quoteLines.map((quote, quoteIndex) => (
            <p key={quoteIndex} className={quoteIndex > 0 ? 'mt-3' : undefined}>
              {renderInline(quote)}
            </p>
          ))}
        </blockquote>,
      );
      continue;
    }

    if (/^- /.test(trimmed)) {
      const items: string[] = [];
      while (index < lines.length && /^- /.test(lines[index].trim())) {
        items.push(lines[index].trim().slice(2));
        index += 1;
      }
      blocks.push(
        <ul key={blocks.length} className="list-disc space-y-2 pl-6 text-gray-700">
          {items.map((item) => (
            <li key={item}>{renderInline(item)}</li>
          ))}
        </ul>,
      );
      continue;
    }

    if (/^\d+\. /.test(trimmed)) {
      const items: string[] = [];
      while (index < lines.length && /^\d+\. /.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^\d+\. /, ''));
        index += 1;
      }
      blocks.push(
        <ol key={blocks.length} className="list-decimal space-y-2 pl-6 text-gray-700">
          {items.map((item) => (
            <li key={item}>{renderInline(item)}</li>
          ))}
        </ol>,
      );
      continue;
    }

    const paragraphLines = [trimmed];
    index += 1;
    while (
      index < lines.length &&
      lines[index].trim() &&
      !/^(#{1,3} |```|> |- |\d+\. )/.test(lines[index].trim())
    ) {
      paragraphLines.push(lines[index].trim());
      index += 1;
    }

    blocks.push(
      <p key={blocks.length} className="text-gray-700">
        {renderInline(paragraphLines.join(' '))}
      </p>,
    );
  }

  return <div className="space-y-5 text-base leading-8 sm:text-lg">{blocks}</div>;
}
