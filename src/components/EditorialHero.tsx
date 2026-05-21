import type { ReactNode } from 'react';

type EditorialHeroVariant = 'home' | 'guides' | 'collections' | 'article';

const backgroundByVariant: Record<EditorialHeroVariant, string> = {
  home: '/images/editorial/hero-workspace.svg',
  guides: '/images/editorial/guide-archive.svg',
  collections: '/images/editorial/collection-table.svg',
  article: '/images/editorial/article-surface.svg',
};

const accentByVariant: Record<EditorialHeroVariant, string> = {
  home: 'border-sky-200/70 bg-sky-50/80 text-sky-900',
  guides: 'border-teal-200/70 bg-teal-50/80 text-teal-900',
  collections: 'border-amber-200/80 bg-amber-50/80 text-amber-950',
  article: 'border-slate-200/80 bg-white/70 text-slate-800',
};

interface EditorialHeroProps {
  variant: EditorialHeroVariant;
  eyebrow?: string;
  title: ReactNode;
  description: ReactNode;
  children?: ReactNode;
  centered?: boolean;
}

export default function EditorialHero({
  variant,
  eyebrow,
  title,
  description,
  children,
  centered = false,
}: EditorialHeroProps) {
  return (
    <section
      className="relative isolate overflow-hidden border-b border-slate-200/80 bg-slate-50"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.88) 42%, rgba(255,255,255,0.58) 100%), url(${backgroundByVariant[variant]})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <div
        className={`mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 ${
          centered ? 'text-center' : ''
        }`}
      >
        <div className={centered ? 'mx-auto max-w-3xl' : 'max-w-3xl'}>
          {eyebrow && (
            <p
              className={`inline-flex border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${accentByVariant[variant]}`}
            >
              {eyebrow}
            </p>
          )}
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-700 sm:text-xl">{description}</p>
          {children && <div className="mt-9">{children}</div>}
        </div>
      </div>
    </section>
  );
}
