export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://prompt.next-happy.com';
export const SITE_NAME = 'PromptCraft';

export function absoluteUrl(pathname: string = '/') {
  if (pathname === '/') return SITE_URL;
  return `${SITE_URL}${pathname.startsWith('/') ? pathname : `/${pathname}`}`;
}

export function titleCaseSlug(slug: string) {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
}
