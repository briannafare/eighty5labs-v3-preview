// Writes dist/sitemap.xml from the route list. lastmod comes from git history
// (seo/lastmod.json), never typed by hand. Pages marked noindex and /optin are left out.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = path.resolve(import.meta.dirname, '..');
const { PAGE_META, canonicalFor, POSTS, lastmod } = await import(pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href);

const EXCLUDE = new Set(['/optin']);
const postDates = Object.fromEntries(POSTS.map((p) => [p.path, p.dateModified]));
const routes = Object.keys(PAGE_META).filter((r) => !PAGE_META[r].noindex && !EXCLUDE.has(r));

const rows = routes.map((r) => {
  const d = postDates[r] || lastmod.pages[r];
  if (!d) throw new Error(`no lastmod for ${r}: run scripts/update-lastmod.mjs with full git history`);
  return `  <url>\n    <loc>${canonicalFor(r)}</loc>\n    <lastmod>${d}</lastmod>\n  </url>`;
});

fs.writeFileSync(
  path.join(root, 'dist', 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${rows.join('\n')}\n</urlset>\n`
);
console.log(`sitemap: ${routes.length} urls`);
