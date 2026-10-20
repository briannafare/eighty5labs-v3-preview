import React from 'react';
import { INDUSTRY_FAQS } from '../../seo/faqs';
import { IndustryPage, IndustryPageData } from './IndustryTemplate';

const data: IndustryPageData = {
  slug: 'realestate',
  label: 'Real Estate',
  sub: 'Agents · Teams · Brokerages',
  heroH1: <>The First Agent to Respond<br />Gets the Client.</>,
  heroCopy: "You're showing homes and closing transactions. eighty5labs makes sure every lead gets an instant response — even when you can't pick up the phone.",
  problemTitle: 'The Real Estate Lead Problem',
  problemBody: [
    "Real estate is a speed sport. A buyer or seller who reaches out to three agents is going to work with whoever responds first — not necessarily the most qualified. But agents are out showing homes, in closing meetings, and managing deals. Monitoring every incoming call and inquiry in real time is not realistic. And when a lead hits voicemail at 7pm, they don't leave a message. They call the next agent.",
    "Visibility is the other half of the problem. AI search is changing how buyers and sellers discover agents. When someone asks ChatGPT \"best real estate agent in [neighborhood]\" or Gemini \"who should I use to sell my home in [city],\" the platforms are looking at review profiles, content depth, and GBP optimization to make recommendations. Most agents have none of that infrastructure in place.",
    "And then there's the referral engine — the single most valuable business development asset in real estate. Most agents manage it manually, which means inconsistently. Past clients hear from you around the holidays if you remember. Sphere of influence gets touched when you have time. eighty5labs runs all of it on autopilot.",
  ],
  stats: [
    { value: '24/7', label: 'call answering, even at midnight' },
    { value: 'Fast', label: 'lead response' },
    { value: 'Auto', label: 'referral follow-up' },
  ],
  systems: [
    { name: 'Voice AI', desc: "Answers every inbound call instantly and captures buyer and seller lead details — after hours, weekends, during showings. Every lead qualified and logged before you ever know it came in." },
    { name: 'Conversation AI', desc: "Engages website visitors immediately, captures buyer/seller intent, and follows up via SMS and email until they're ready to book a consultation." },
    { name: 'Reviews AI', desc: "Automates review requests after every closing via SMS. Builds your Google rating, Map Pack ranking, and AI search authority — consistently, without you asking." },
    { name: 'Content AI', desc: "Creates optimized neighborhood pages, GBP posts, and FAQ content that gets you found on Google Maps and recommended by AI search for local real estate queries." },
    { name: 'Workflow AI', desc: "Keeps your past client and sphere-of-influence database warm with anniversary touches, market updates, and referral asks — running automatically on schedule." },
    { name: 'Funnel AI', desc: "Builds high-converting landing pages for buyer consultations, seller valuations, and listing promos — with every lead flowing directly to your CRM and calendar." },
  ],
  bullets: [
    "Answers every inbound call and captures buyer and seller leads instantly — after hours, weekends, always",
    "Follows up with every lead right away via AI-powered text and email",
    "Creates and optimizes content that gets your services found on Google and recommended by AI search",
    "Automates review collection after every closing to build your Map Pack ranking and AI search authority",
    "Keeps your database warm with past client campaigns that run without you touching anything",
    "Builds landing pages for buyer consultations, pre-approval offers, and listing promos",
  ],
  boldClose: "The referral business you've built is a goldmine. eighty5labs makes sure you're actually mining it.",
  faqTitle: 'Questions About eighty5labs for Real Estate',
  faqs: INDUSTRY_FAQS.realestate,
  ctaTitle: "See Where You're Losing Real Estate Leads",
  ctaBody: "Free AI Visibility Audit — we'll show you your Google Maps position, review velocity, and AI search visibility against your top competitors in your market.",
  accentColor: '#1B4FFF',
};

export default function RealEstatePage() {
  return <IndustryPage data={data} />;
}
