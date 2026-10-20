// Blog posts: one markdown file per post in content/posts/<slug>.md.
// A card without a body does not exist; no file, no post, no URL.
import lastmod from './lastmod.json';

export interface Post {
  slug: string;
  path: string;            // /blog/<slug>
  title: string;
  description: string;
  tag: string;
  body: string;            // markdown
  datePublished: string;   // YYYY-MM-DD, from git
  dateModified: string;    // YYYY-MM-DD, from git
}

const files = import.meta.glob('../content/posts/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

const parse = (slug: string, raw: string): Post | null => {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return null;
  const fm: Record<string, string> = {};
  for (const line of m[1].split('\n')) {
    const i = line.indexOf(':');
    if (i > 0) fm[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  if (!fm.title || !fm.description || !m[2].trim()) return null;
  const dates = (lastmod.posts as Record<string, { published: string; modified: string }>)[slug];
  if (!dates) return null; // no git history yet: not published
  return {
    slug,
    path: `/blog/${slug}`,
    title: fm.title,
    description: fm.description,
    tag: fm.tag || 'Insights',
    body: m[2].trim(),
    datePublished: dates.published,
    dateModified: dates.modified,
  };
};

export const POSTS: Post[] = Object.entries(files)
  .map(([file, raw]) => parse(file.split('/').pop()!.replace(/\.md$/, ''), raw))
  .filter((p): p is Post => p !== null)
  .sort((a, b) => b.datePublished.localeCompare(a.datePublished));

export const postByPath = (pathname: string): Post | undefined => POSTS.find(p => p.path === pathname);
