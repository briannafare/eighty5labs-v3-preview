import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface PageMeta {
  title: string;
  description: string;
}

const BASE = 'eighty5labs';
const SITE_URL = 'https://www.eighty5labs.com';

const PAGE_META: Record<string, PageMeta> = {
  '/': {
    title: 'AI Lead Response for Real Estate Agents | eighty5labs',
    description: 'Answer every buyer and seller lead in under two minutes, day or night. Voice AI qualifies the lead and books the showing for you.',
  },
  '/services': {
    title: 'AI Services for Real Estate Agents | eighty5labs',
    description: 'Six systems on one lead record: voice AI, web chat, Google Business Profile, AI search content, review automation, and follow-up.',
  },
  '/pricing': {
    title: 'Pricing — Month-to-Month AI Plans | eighty5labs',
    description: 'Month-to-month plans for eighty5.OS, no long-term contract. Voice AI, Map Pack ranking, reviews, and automated follow-up included.',
  },
  '/audit': {
    title: 'Free Visibility Audit for Agents | eighty5labs',
    description: 'See your Google Maps position, review velocity, and whether AI search names you, benchmarked against agents in your market.',
  },
  '/industries': {
    title: 'Industries We Serve | eighty5labs',
    description: 'Built first for residential real estate, and also serving mortgage, home services, medical and wellness practices, and law firms.',
  },
  '/realestate': {
    title: 'AI for Real Estate Agents | eighty5labs',
    description: 'Voice AI answers every buyer and seller inquiry 24/7, qualifies it, and books the showing. Plus Map Pack ranking and review automation.',
  },
  '/homeservices': {
    title: 'AI for HVAC and Home Services | eighty5labs',
    description: 'Never send another service call to voicemail. AI answers overflow and after-hours calls, books estimates, and follows up on open quotes.',
  },
  '/medical': {
    title: 'AI for Med Spas and Medical Practices | eighty5labs',
    description: 'Capture new patient inquiries around the clock, automate review requests after visits, and cut no-shows with smart reminders.',
  },
  '/legal': {
    title: 'AI for Law Firms | eighty5labs',
    description: 'Capture every after-hours inquiry, qualify by practice area, and book consultations before competing firms open their doors.',
  },
  '/mortgage': {
    title: 'AI for Mortgage Lenders and Loan Officers | eighty5labs',
    description: 'The borrower comparing rates calls three lenders. Answer first, every time, and keep referral partners warm automatically.',
  },
  '/about': {
    title: 'About eighty5labs | Portland, Oregon',
    description: 'A Portland, Oregon company building the operating system local businesses actually need. Founded by people who were the client first.',
  },
  '/blog': {
    title: 'Blog — Local Search and AI Notes | eighty5labs',
    description: 'Practical notes on AI search visibility, Google Business Profile, review velocity, voice agents, and speed to lead for local business.',
  },
  '/glossary': {
    title: 'AI and Local Search Glossary | eighty5labs',
    description: 'Plain-language definitions for AEO, GEO, Map Pack, review velocity, RAG, entity optimization, and the rest of the local AI vocabulary.',
  },
  '/resources': {
    title: 'Guides, Checklists, and Tools | eighty5labs',
    description: 'Free guides and checklists on AI search visibility, Google Business Profile optimization, and lead response for local businesses.',
  },
  '/optin': {
    title: 'SMS Updates | eighty5labs',
    description: 'Join the eighty5labs SMS program for appointment updates and service alerts. Message frequency varies, reply STOP to opt out.',
  },
  '/privacy': {
    title: 'Privacy Policy | eighty5labs',
    description: 'How eighty5labs collects, uses, stores, and protects your personal information, and the choices you have about how it is used.',
  },
  '/terms': {
    title: 'Terms and Conditions | eighty5labs',
    description: 'The terms governing your use of the eighty5labs website and services, including billing, cancellation, and acceptable use.',
  },
};

const setMeta = (attr: string, value: string, isProperty = false) => {
  const selector = isProperty ? `meta[property="${attr}"]` : `meta[name="${attr}"]`;
  const el = document.querySelector(selector) as HTMLMetaElement;
  if (el) el.content = value;
};

const setCanonical = (url: string) => {
  const el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (el) el.href = url;
};

export const usePageMeta = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = PAGE_META[pathname] || PAGE_META['/'];
    const url = `${SITE_URL}${pathname === '/' ? '' : pathname}`;

    // Title
    document.title = meta.title;

    // Meta description
    setMeta('description', meta.description);

    // Canonical
    setCanonical(url + (pathname === '/' ? '/' : ''));

    // OG tags
    setMeta('og:title', meta.title, true);
    setMeta('og:description', meta.description, true);
    setMeta('og:url', url, true);

    // Twitter tags
    setMeta('twitter:title', meta.title);
    setMeta('twitter:description', meta.description);
  }, [pathname]);
};
