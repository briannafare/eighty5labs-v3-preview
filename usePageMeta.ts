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
    title: `${BASE} | AI Operating System for Local Business`,
    description: 'eighty5labs closes the visibility, lead capture, and conversion gaps for local service businesses using AI. Get found in AI search. Dominate Google Maps. Never miss a call.',
  },
  '/services': {
    title: `AI Services for Local Business — Content, Voice, Reviews & Automation | ${BASE}`,
    description: 'Six AI-powered services that close every revenue gap: Content AI for search visibility, Voice AI for 24/7 call handling, Reputation AI for reviews, plus capture, workflow, and conversion automation.',
  },
  '/pricing': {
    title: `Pricing — Month-to-Month AI Plans for Local Business | ${BASE}`,
    description: 'Flexible month-to-month pricing for eighty5.OS. No long-term contracts. AI search visibility, voice AI, review automation, and marketing automation included. Free Visibility Audit available.',
  },
  '/audit': {
    title: `Free Visibility Audit — Find Your Revenue Gaps in 1 Hour | ${BASE}`,
    description: 'Get a free AI Visibility Audit showing your Map Pack position, review velocity, AI search presence, and conversion gaps vs. competitors. Results in 1 hour.',
  },
  '/industries': {
    title: `Industries We Serve — HVAC, Med Spa, Legal, Real Estate & More | ${BASE}`,
    description: 'eighty5labs serves HVAC, plumbing, dental, med spa, law firms, real estate, mortgage, and other local service businesses with industry-specific AI automation.',
  },
  '/homeservices': {
    title: `AI for HVAC & Home Services — Never Miss a Call Again | ${BASE}`,
    description: 'AI-powered tools built for HVAC, plumbing, electrical, and home service companies. Voice AI answers every call, review automation builds your reputation, and AI search gets you found.',
  },
  '/medical': {
    title: `AI for Med Spas & Medical Practices — Automate Booking & Reviews | ${BASE}`,
    description: 'HIPAA-aware AI tools for med spas, wellness clinics, and medical practices. Automate appointment booking, review management, and patient follow-up with eighty5.OS.',
  },
  '/legal': {
    title: `AI for Law Firms — Capture After-Hours Leads Automatically | ${BASE}`,
    description: 'Voice AI captures every after-hours inquiry, qualifies by practice area, and books consultations before competing firms open. Built for personal injury, family law, and criminal defense.',
  },
  '/realestate': {
    title: `AI for Real Estate Agents — Speed-to-Lead That Wins Deals | ${BASE}`,
    description: 'AI-powered lead capture and follow-up for real estate agents. Respond to inquiries in seconds, automate showing requests, and never miss a buyer or seller lead.',
  },
  '/mortgage': {
    title: `AI for Mortgage Lenders — Automate Follow-Up & Convert More Leads | ${BASE}`,
    description: 'AI automation for mortgage lenders and loan officers. Automated rate inquiries, follow-up sequences, review management, and 24/7 voice AI that qualifies borrowers.',
  },
  '/about': {
    title: `About eighty5labs — Portland AI Company for Local Business | ${BASE}`,
    description: 'eighty5labs is a Portland, Oregon-based AI company building the operating system for local service businesses. We close the visibility, capture, and conversion gaps with AI.',
  },
  '/blog': {
    title: `Blog — AI Marketing Insights for Local Business | ${BASE}`,
    description: 'Insights on AI search visibility, answer engine optimization, voice AI, review management, and marketing automation for local service businesses.',
  },
  '/glossary': {
    title: `AI Marketing Glossary — Terms & Definitions | ${BASE}`,
    description: 'Comprehensive glossary of AI marketing, AEO, GEO, voice AI, and local SEO terms. Understand the language of AI-powered business growth.',
  },
  '/resources': {
    title: `Resources — Guides, Templates & Tools for Local Business AI | ${BASE}`,
    description: 'Free guides, templates, and tools to help local service businesses leverage AI for search visibility, lead capture, and revenue growth.',
  },
  '/optin': {
    title: `Subscribe — AI Insights for Local Business | ${BASE}`,
    description: 'Get weekly AI marketing insights, strategies, and tools delivered to your inbox. Built for local service business owners.',
  },
  '/privacy': {
    title: `Privacy Policy | ${BASE}`,
    description: 'eighty5labs privacy policy. How we collect, use, and protect your data.',
  },
  '/terms': {
    title: `Terms and Conditions | ${BASE}`,
    description: 'eighty5labs terms and conditions for use of our services and website.',
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
