// "Last updated" text for a page, from the git-derived dates in seo/lastmod.json.
import lastmod from './lastmod.json';

export const lastUpdated = (route: string): string => {
  const iso = (lastmod.pages as Record<string, string>)[route];
  if (!iso) return '';
  const d = new Date(iso + 'T12:00:00Z').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
  return `Last updated: ${d}`;
};
