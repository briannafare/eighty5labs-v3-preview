// Per-route JSON-LD. Pure data builders, safe to run on server and client.
// Rule: describe only what the page itself shows. No Review or AggregateRating
// (there is no verifiable review source on the site).
import { PAGE_META, SITE_URL, canonicalFor, postByPath } from './routes';
import { HOME_FAQS, INDUSTRY_FAQS, PRICING_FAQS } from './faqs';
import lastmod from './lastmod.json';

type Json = Record<string, unknown>;
const CTX = 'https://schema.org';
const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;

const pageDates = lastmod.pages as Record<string, string>;
const siteModified = Object.values(pageDates).sort().pop();

// Both are published on the live site (/privacy and /optin).
const EMAIL = 'bri@eighty5labs.com';
const PHONE = '+1-503-704-3755';

const SAME_AS = [
  'https://www.facebook.com/eighty5labs/',
  'https://www.instagram.com/eighty5labs/',
  'https://www.youtube.com/@eighty5labs',
  'https://www.linkedin.com/company/eighty5labs',
  'https://x.com/eighty5labs',
];

const organization = (): Json => ({
  '@context': CTX,
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'eighty5labs',
  alternateName: 'eighty5 labs',
  url: SITE_URL,
  logo: `${SITE_URL}/icon-192.png`,
  description: 'eighty5labs is a Portland, Oregon-based AI company building the operating system for local service businesses. We close the visibility, capture, and conversion gaps with AI.',
  address: { '@type': 'PostalAddress', addressLocality: 'Portland', addressRegion: 'OR', addressCountry: 'US' },
  areaServed: { '@type': 'Country', name: 'United States' },
  founder: [
    { '@type': 'Person', name: 'David Chandler', jobTitle: 'Co-Founder — Strategy & Client Relations', url: `${SITE_URL}/about` },
    { '@type': 'Person', name: 'Bri Lindley', jobTitle: 'Co-Founder — Technology & Marketing Systems', url: `${SITE_URL}/about` },
  ],
  contactPoint: { '@type': 'ContactPoint', contactType: 'customer service', email: EMAIL, telephone: PHONE, areaServed: 'US', availableLanguage: 'English' },
  sameAs: SAME_AS,
});

const website = (): Json => ({
  '@context': CTX,
  '@type': 'WebSite',
  '@id': SITE_ID,
  name: 'eighty5labs',
  url: SITE_URL,
  publisher: { '@id': ORG_ID },
  inLanguage: 'en-US',
  ...(siteModified ? { dateModified: siteModified } : {}),
});

const localBusiness = (): Json => ({
  '@context': CTX,
  '@type': 'LocalBusiness',
  '@id': `${SITE_URL}/#localbusiness`,
  name: 'eighty5labs',
  url: SITE_URL,
  telephone: PHONE,
  email: EMAIL,
  address: { '@type': 'PostalAddress', addressLocality: 'Portland', addressRegion: 'OR', addressCountry: 'US' },
  areaServed: { '@type': 'Country', name: 'United States' },
  parentOrganization: { '@id': ORG_ID },
});

const NAMES: Record<string, string> = {
  '/services': 'Services', '/pricing': 'Pricing', '/industries': 'Industries', '/audit': 'Free Visibility Audit',
  '/homeservices': 'Home Services', '/medical': 'Medical & Wellness', '/legal': 'Legal',
  '/realestate': 'Real Estate', '/mortgage': 'Mortgage', '/about': 'About', '/blog': 'Blog',
  '/work': 'Our Work', '/glossary': 'Glossary', '/resources': 'Resources', '/optin': 'Subscribe',
  '/privacy': 'Privacy Policy', '/terms': 'Terms and Conditions',
};
const INDUSTRY_PATHS = ['/homeservices', '/medical', '/legal', '/realestate', '/mortgage'];

const breadcrumb = (pathname: string): Json => {
  const post = postByPath(pathname);
  const trail: [string, string][] = [['Home', `${SITE_URL}/`]];
  if (INDUSTRY_PATHS.includes(pathname)) trail.push(['Industries', canonicalFor('/industries')]);
  if (post) trail.push(['Blog', canonicalFor('/blog')]);
  trail.push([post ? post.title : NAMES[pathname], canonicalFor(pathname)]);
  return {
    '@context': CTX,
    '@type': 'BreadcrumbList',
    itemListElement: trail.map(([name, item], i) => ({ '@type': 'ListItem', position: i + 1, name, item })),
  };
};

const webPage = (pathname: string): Json => {
  const meta = PAGE_META[pathname];
  const dm = pageDates[pathname];
  return {
    '@context': CTX,
    '@type': 'WebPage',
    '@id': `${canonicalFor(pathname)}#webpage`,
    url: canonicalFor(pathname),
    name: meta.title,
    description: meta.description,
    isPartOf: { '@id': SITE_ID },
    publisher: { '@id': ORG_ID },
    inLanguage: 'en-US',
    ...(dm ? { dateModified: dm } : {}),
  };
};

const service = (name: string, description: string, extra: Json = {}): Json => ({
  '@context': CTX,
  '@type': 'Service',
  name,
  description,
  provider: { '@id': ORG_ID },
  areaServed: { '@type': 'Country', name: 'United States' },
  ...extra,
});

const faqPage = (faqs: { q: string; a: string }[]): Json => ({
  '@context': CTX,
  '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
});

// Descriptions are the taglines shown on /services.
const SERVICE_LIST: [string, string][] = [
  ['Content AI', 'Be the answer Google and AI give when your customers are searching.'],
  ['Reviews AI', 'Never miss a review. Never leave one unanswered. Watch your rankings climb.'],
  ['Funnel AI', 'One offer. One action. One path from click to customer.'],
  ['Voice AI', 'Never miss a call. Answer, qualify, and book — instantly.'],
  ['Conversation AI', 'Engage, qualify, and close — the moment they land. Day or night.'],
  ['Workflow AI', 'Automations that run smarter, faster, and without you touching anything.'],
];

// Plan prices as shown on /pricing (monthly, and per month when billed annually).
const PLANS: [string, number, number][] = [['Visibility', 497, 414], ['Growth', 997, 831]];
const offer = (name: string, price: number, how: string): Json => ({
  '@type': 'Offer',
  name: `${name} ${how}`,
  priceSpecification: { '@type': 'UnitPriceSpecification', price, priceCurrency: 'USD', unitText: 'MONTH' },
  url: canonicalFor('/pricing'),
});

export const jsonLdFor = (pathname: string): Json[] => {
  const meta = PAGE_META[pathname];
  if (!meta) return [];

  const post = postByPath(pathname);
  if (post) {
    return [
      {
        '@context': CTX,
        '@type': 'Article',
        '@id': `${canonicalFor(pathname)}#article`,
        headline: post.title,
        description: post.description,
        url: canonicalFor(pathname),
        mainEntityOfPage: canonicalFor(pathname),
        author: { '@type': 'Organization', name: 'eighty5labs', url: SITE_URL },
        publisher: { '@id': ORG_ID },
        datePublished: post.datePublished,
        dateModified: post.dateModified,
        inLanguage: 'en-US',
      },
      breadcrumb(pathname),
      ...(post.faqs.length ? [faqPage(post.faqs)] : []),
    ];
  }

  if (pathname === '/') {
    return [organization(), website(), localBusiness(), webPage('/'), faqPage(HOME_FAQS)];
  }

  const out: Json[] = [webPage(pathname)];
  switch (pathname) {
    case '/about':
      out.push(organization());
      break;
    case '/services':
      SERVICE_LIST.forEach(([n, d]) => out.push(service(n, d)));
      break;
    case '/pricing':
      out.push(service('eighty5labs plans', 'Month-to-month AI plans for local service businesses.', {
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'eighty5labs plans',
          itemListElement: PLANS.flatMap(([n, m, a]) => [offer(n, m, 'monthly'), offer(n, a, 'per month, billed annually')]),
        },
      }));
      out.push(faqPage(PRICING_FAQS));
      break;
    case '/audit':
      out.push(service('Free Visibility Audit', meta.description));
      break;
    case '/homeservices': out.push(service('AI for HVAC & Home Services', meta.description), faqPage(INDUSTRY_FAQS.homeservices)); break;
    case '/medical': out.push(service('AI for Med Spas & Medical Practices', meta.description), faqPage(INDUSTRY_FAQS.medical)); break;
    case '/legal': out.push(service('AI for Law Firms', meta.description), faqPage(INDUSTRY_FAQS.legal)); break;
    case '/realestate': out.push(service('AI for Real Estate Agents', meta.description), faqPage(INDUSTRY_FAQS.realestate)); break;
    case '/mortgage': out.push(service('AI for Mortgage Lenders', meta.description), faqPage(INDUSTRY_FAQS.mortgage)); break;
  }
  if (pathname !== '/') out.push(breadcrumb(pathname));
  return out;
};
