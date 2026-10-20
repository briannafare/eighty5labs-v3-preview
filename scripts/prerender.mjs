// Post-build step: writes one static HTML file per route into dist/.
// Uses the server bundle built by `vite build --ssr` (dist-ssr/entry-server.js),
// so no headless browser and no extra dependency is needed.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = path.resolve(import.meta.dirname, '..');
const dist = path.join(root, 'dist');
const ssr = await import(pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href);
const { render, PAGE_META, NOT_FOUND_META, canonicalFor, SITE_URL, jsonLdFor } = ssr;

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const setMeta = (html, key, value, attr = 'name') => {
  const re = new RegExp(`(<meta ${attr}="${key}" content=")[^"]*(")`);
  if (!re.test(html)) throw new Error(`template is missing <meta ${attr}="${key}">`);
  return html.replace(re, (_, a, b) => a + esc(value) + b);
};

function buildPage({ routePath, meta, canonical, bodyHtml, indexable, ld }) {
  let html = template;
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(meta.title)}</title>`);
  html = setMeta(html, 'description', meta.description);
  html = setMeta(html, 'robots', indexable
    ? 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
    : 'noindex, follow');
  if (canonical) {
    html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, (_, a, b) => a + esc(canonical) + b);
    html = setMeta(html, 'og:url', canonical, 'property');
  } else {
    html = html.replace(/\s*<link rel="canonical"[^>]*>/, '').replace(/\s*<meta property="og:url"[^>]*>/, '');
  }
  html = setMeta(html, 'og:title', meta.title, 'property');
  html = setMeta(html, 'og:description', meta.description, 'property');
  html = setMeta(html, 'twitter:title', meta.title);
  html = setMeta(html, 'twitter:description', meta.description);
  const scripts = ld
    .map((b) => `    <script type="application/ld+json" data-ld>${JSON.stringify(b).replace(/</g, '\\u003c')}</script>`)
    .join('\n');
  html = html.replace('</head>', `${scripts}\n  </head>`);
  if (!html.includes('<div id="root"></div>')) throw new Error('template root not found');
  html = html.replace('<div id="root"></div>', () => `<div id="root">${bodyHtml}</div>`);
  return html;
}

const routes = Object.keys(PAGE_META);  // includes /blog/<slug> for every post file
const written = [];

for (const routePath of routes) {
  const bodyHtml = await render(routePath);
  const html = buildPage({
    routePath,
    meta: PAGE_META[routePath],
    canonical: canonicalFor(routePath),
    bodyHtml,
    indexable: !PAGE_META[routePath].noindex,
    ld: jsonLdFor(routePath),
  });
  const file = routePath === '/' ? path.join(dist, 'index.html') : path.join(dist, routePath, 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
  written.push(routePath);
}

// Real 404 page: Vercel serves dist/404.html with status 404 for unknown paths.
const notFoundBody = await render('/404');
fs.writeFileSync(
  path.join(dist, '404.html'),
  buildPage({
    routePath: '/404',
    meta: NOT_FOUND_META,
    canonical: null,
    bodyHtml: notFoundBody,
    indexable: false,
    ld: [],
  })
);

console.log(`prerendered ${written.length} routes + 404.html`);
