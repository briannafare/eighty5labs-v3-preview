// Post-prerender step: writes /llms.txt, /llms-full.txt and a clean markdown copy of
// every page (<route>.md, home is /index.md) into dist/. All static files.
// The markdown is converted from the prerendered <main> content, so it always matches the page.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = path.resolve(import.meta.dirname, '..');
const dist = path.join(root, 'dist');
const { PAGE_META, SITE_URL, canonicalFor, POSTS } = await import(pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href);

// ── HTML -> markdown (no dependencies) ───────────────────────────────────────
const ENT = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#x27;': "'", '&#39;': "'", '&nbsp;': ' ', '&rsquo;': '’', '&lsquo;': '‘' };
const decode = (s) => s.replace(/&(amp|lt|gt|quot|nbsp|rsquo|lsquo|#x27|#39);/g, (m) => ENT[m] ?? m);
const BLOCK = new Set(['div', 'section', 'article', 'header', 'footer', 'main', 'aside', 'p', 'ul', 'ol', 'li', 'tr', 'table', 'blockquote', 'figure', 'details', 'summary', 'dl', 'dt', 'dd']);
const SKIP = new Set(['script', 'style', 'svg', 'noscript', 'select', 'textarea', 'option', 'canvas', 'video', 'iframe']);
const VOID = new Set(['br', 'img', 'input', 'hr', 'meta', 'link', 'source', 'path']);

export function htmlToMd(html, baseUrl) {
  html = html.replace(/<!--[\s\S]*?-->/g, '');
  const out = [];
  let buf = '';
  let heading = 0;
  const lists = [];       // 'ul' | 'ol'
  const counters = [];
  let liFresh = false;
  const skipStack = [];   // tag names currently skipped
  const links = [];       // stack of { href, start }
  const re = /<(\/?)([a-zA-Z][a-zA-Z0-9]*)((?:[^>"']|"[^"]*"|'[^']*')*)>|([^<]+)/g;
  let m;

  const flush = () => {
    const text = buf.replace(/\s+/g, ' ').trim();
    buf = '';
    if (!text) return;
    if (heading) { out.push(`${'#'.repeat(heading)} ${text}`); return; }
    if (lists.length) {
      const indent = '  '.repeat(lists.length - 1);
      if (liFresh) {
        const n = counters[counters.length - 1]++;
        out.push(`${indent}${lists[lists.length - 1] === 'ol' ? `${n}.` : '-'} ${text}`);
        liFresh = false;
      } else out.push(`${indent}  ${text}`);
      return;
    }
    out.push(text);
  };

  while ((m = re.exec(html))) {
    if (m[4] !== undefined) {
      if (!skipStack.length) buf += decode(m[4]);
      continue;
    }
    const closing = m[1] === '/';
    const tag = m[2].toLowerCase();
    const attrs = m[3] || '';

    if (skipStack.length) {
      if (closing && tag === skipStack[skipStack.length - 1]) skipStack.pop();
      else if (!closing && tag === skipStack[skipStack.length - 1] && !VOID.has(tag) && !/\/\s*$/.test(attrs)) skipStack.push(tag);
      continue;
    }
    if (!closing) {
      const decorative = /aria-hidden="true"/.test(attrs);
      const isFaqButton = tag === 'button' && /aria-expanded/.test(attrs);
      if (!VOID.has(tag) && !/\/\s*$/.test(attrs) && (SKIP.has(tag) || decorative || (tag === 'button' && !isFaqButton))) {
        skipStack.push(tag);
        continue;
      }
    }

    if (/^h[1-6]$/.test(tag)) { flush(); heading = closing ? 0 : Number(tag[1]); continue; }
    if (tag === 'button') { flush(); heading = closing ? 0 : 3; continue; }
    if (tag === 'ul' || tag === 'ol') {
      flush();
      if (closing) { lists.pop(); counters.pop(); }
      else { lists.push(tag); counters.push(1); }
      continue;
    }
    if (tag === 'li') { flush(); liFresh = !closing; continue; }
    if (tag === 'br') { buf += ' '; continue; }
    if (tag === 'a') {
      if (!closing) {
        const href = (attrs.match(/href="([^"]*)"/) || [])[1];
        links.push({ href, start: buf.length });
      } else {
        const l = links.pop();
        if (l && l.href && !l.href.startsWith('#') && !l.href.startsWith('javascript')) {
          const text = buf.slice(l.start).trim();
          if (text) {
            const url = l.href.startsWith('/') ? baseUrl + l.href : l.href;
            buf = buf.slice(0, l.start) + `[${text}](${url})`;
          }
        }
      }
      continue;
    }
    if (tag === 'strong' || tag === 'b') { buf += '**'; continue; }
    if ((tag === 'td' || tag === 'th') && closing) { buf += ' | '; continue; }
    if (BLOCK.has(tag)) { flush(); continue; }
  }
  flush();

  // blank line between paragraphs, none between consecutive list lines
  const isList = (l) => /^\s*(- |\d+\. )/.test(l) || /^\s{2,}\S/.test(l);
  let md = '';
  let prev = '';
  for (const line of out.filter((l, i) => l !== out[i - 1])) {
    md += (md === '' ? '' : (isList(line) && isList(prev) ? '\n' : '\n\n')) + line.replace(/\s*\|\s*$/, '');
    prev = line;
  }
  return md + '\n';
}

// ── Pages ────────────────────────────────────────────────────────────────────
const SECTIONS = [
  ['Services', ['/services', '/audit']],
  ['Pricing', ['/pricing']],
  ['Industries', ['/industries', '/homeservices', '/medical', '/legal', '/realestate', '/mortgage']],
  ['Work', ['/work']],
  ['Blog', ['/blog', ...POSTS.map((p) => p.path)]],
  ['Glossary', ['/glossary']],
  ['Resources', ['/resources']],
  ['About', ['/about', '/privacy', '/terms']],
];
const NOT_LISTED = new Set(['/optin']);

const routes = Object.keys(PAGE_META).filter((r) => !PAGE_META[r].noindex && !NOT_LISTED.has(r));
const mdPath = (r) => (r === '/' ? '/index.md' : `${r}.md`);
const cleanTitle = (t) => t.replace(/\s*\|\s*eighty5labs$/, '');

const pages = [];
for (const r of routes) {
  const file = r === '/' ? path.join(dist, 'index.html') : path.join(dist, r, 'index.html');
  const html = fs.readFileSync(file, 'utf8');
  const main = (html.match(/<main[^>]*>([\s\S]*?)<\/main>/) || [])[1];
  if (!main) throw new Error(`no <main> in ${file}`);
  const body = htmlToMd(main, SITE_URL);
  const meta = PAGE_META[r];
  const title = cleanTitle(meta.title);
  const md = `# ${title}\n\n> ${meta.description}\n\nSource: ${canonicalFor(r)}\n\n${body}`;
  fs.mkdirSync(path.dirname(path.join(dist, mdPath(r))), { recursive: true });
  fs.writeFileSync(path.join(dist, mdPath(r)), md);
  pages.push({ route: r, title, description: meta.description, md });
}

// ── llms.txt ─────────────────────────────────────────────────────────────────
const byRoute = Object.fromEntries(pages.map((p) => [p.route, p]));
const home = byRoute['/'];
const line = (p) => `- [${p.title}](${SITE_URL}${mdPath(p.route)}): ${p.description}`;
let txt = `# eighty5labs\n\n> eighty5labs is a Portland, Oregon-based AI company that helps local service businesses get found in AI search and Google Maps, answer every call, collect reviews and follow up with leads. Plans are month-to-month.\n\nEvery page below is also available as clean markdown at the same address plus .md. The whole site in one file: ${SITE_URL}/llms-full.txt\n\n- [Home](${SITE_URL}/index.md): ${home.description}\n`;
for (const [name, rs] of SECTIONS) {
  const list = rs.map((r) => byRoute[r]).filter(Boolean);
  if (!list.length) continue;
  txt += `\n## ${name}\n\n${list.map(line).join('\n')}\n`;
}
fs.writeFileSync(path.join(dist, 'llms.txt'), txt);

// ── llms-full.txt ────────────────────────────────────────────────────────────
const order = ['/', ...SECTIONS.flatMap(([, rs]) => rs)].filter((r) => byRoute[r]);
fs.writeFileSync(path.join(dist, 'llms-full.txt'), order.map((r) => byRoute[r].md.trimEnd()).join('\n\n---\n\n') + '\n');

console.log(`ai files: ${pages.length} markdown pages, llms.txt, llms-full.txt`);
