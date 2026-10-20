// Writes seo/lastmod.json from git history: the date each page's source last
// changed, and the first/last commit date of each blog post file.
// If git history is not usable (shallow clone, no git), the committed file is kept.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const out = path.join(root, 'seo', 'lastmod.json');

const git = (...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();

try {
  if (git('rev-parse', '--is-shallow-repository') !== 'false') throw new Error('shallow clone');
} catch (e) {
  console.log(`lastmod: keeping committed seo/lastmod.json (${e.message})`);
  process.exit(0);
}

const P = 'components/pages/';
const industry = [`${P}IndustryTemplate.tsx`];
// Route -> source files whose change means the page's content changed.
const SOURCES = {
  '/': [`${P}Homepage.tsx`, 'components/HeroAnimation.tsx', 'components/VoiceAIDemo.tsx', 'components/RevenueCalculator.tsx'],
  '/services': [`${P}ServicesPage.tsx`],
  '/pricing': [`${P}PricingPage.tsx`],
  '/industries': [`${P}IndustriesPage.tsx`],
  '/homeservices': [`${P}HomeServicesPage.tsx`, ...industry],
  '/medical': [`${P}MedicalPage.tsx`, ...industry],
  '/legal': [`${P}LegalPage.tsx`, ...industry],
  '/realestate': [`${P}RealEstatePage.tsx`, ...industry],
  '/mortgage': [`${P}MortgagePage.tsx`, ...industry],
  '/about': [`${P}AboutPage.tsx`],
  '/blog': [`${P}BlogPage.tsx`],
  '/work': [`${P}WorkPage.tsx`],
  '/glossary': [`${P}GlossaryPage.tsx`],
  '/resources': [`${P}ResourcesPage.tsx`],
  '/audit': [`${P}AuditPage.tsx`],
  '/optin': [`${P}OptInPage.tsx`],
  '/privacy': [`${P}PrivacyPage.tsx`],
  '/terms': [`${P}TermsPage.tsx`],
};

const dates = (files) => {
  const list = git('log', '--format=%cs', '--', ...files).split('\n').filter(Boolean);
  return list.length ? { published: list[list.length - 1], modified: list[0] } : null;
};

const pages = {};
for (const [route, files] of Object.entries(SOURCES)) {
  const d = dates(files);
  if (d) pages[route] = d.modified;
}

const posts = {};
const postDir = path.join(root, 'content', 'posts');
if (fs.existsSync(postDir)) {
  for (const f of fs.readdirSync(postDir).filter((n) => n.endsWith('.md'))) {
    const d = dates([`content/posts/${f}`]);
    if (d) posts[f.replace(/\.md$/, '')] = d;
  }
}

fs.writeFileSync(out, JSON.stringify({ pages, posts }, null, 2) + '\n');
console.log(`lastmod: ${Object.keys(pages).length} pages, ${Object.keys(posts).length} posts`);
