import React from 'react';
import { INDUSTRY_FAQS } from '../../seo/faqs';
import { IndustryPage, IndustryPageData } from './IndustryTemplate';

const data: IndustryPageData = {
  slug: 'homeservices',
  label: 'Home Services',
  sub: 'HVAC · Plumbing · Electrical · Roofing · Landscaping',
  heroH1: <>Every Missed Call<br />Is a Job for Your Competitor.</>,
  heroCopy: "Voice AI answers 24/7, books appointments, and follows up automatically. You never lose work to voicemail again.",
  problemTitle: 'The Home Services Lead Problem',
  problemBody: [
    "Home service leads are the most time-sensitive in local business. A homeowner whose AC fails in July isn't comparison shopping — they're calling the first number in the Map Pack that picks up. If that's not you, the call takes 30 seconds to find someone else, and you'll never know you missed it.",
    "The Map Pack itself is the battleground. Three businesses show up for every high-intent local search. Getting into those three spots requires consistent Google Business Profile management, regular posts, and a steady stream of fresh reviews. The businesses dominating local Map Pack results aren't spending more on advertising — they're just running the system better.",
    "After the click is where most money disappears. Leads come in through calls, web forms, and chat — and fall through when response is slow, follow-up is inconsistent, or estimates don't convert. A homeowner who got three quotes but didn't book immediately will go with whoever follows up first. Most contractors follow up once and move on. eighty5labs follows up automatically until they say yes or no.",
  ],
  quote: "If nobody answers when a homeowner calls, they're calling the next number before my phone stops ringing.",
  stats: [
    { value: '0', label: 'missed calls, including after hours and weekends' },
    { value: 'Top 3', label: 'Map Pack for high-intent service keywords' },
    { value: 'Auto', label: 'review requests after every completed job' },
  ],
  systems: [
    { name: 'Voice AI', desc: "Answers every call 24/7 — emergencies, after hours, weekends. Captures full job details, service type, and urgency, and books estimates directly into your calendar. No voicemail. No missed revenue." },
    { name: 'Reviews AI', desc: "Sends automated review requests via SMS after every completed job. Builds your Google rating and review velocity — the signals that drive Map Pack ranking and AI search authority." },
    { name: 'Content AI', desc: "Creates local content and GBP posts that keep you visible in Maps and AI search for high-intent queries. Structured specifically for emergency and seasonal service searches." },
    { name: 'Workflow AI', desc: "Follows up every unbooked estimate automatically at Day 1, 3, 7, and 14. Re-engages past customers for seasonal services before they think to call a competitor." },
    { name: 'Conversation AI', desc: "Engages website visitors instantly with chat, captures job details, and follows up via SMS until they book. No lead slips away because nobody was online to respond." },
    { name: 'Funnel AI', desc: "Builds landing pages for free estimates, seasonal promotions, and emergency service offers — with every lead flowing directly to your CRM and dispatch queue." },
  ],
  bullets: [
    "Answers every call — emergencies, after-hours, weekends — and dispatches or books estimates automatically",
    "Creates local content and GBP posts that keep you visible in Maps and AI search for high-intent queries",
    "Sends review requests to every completed job via text — no more asking awkwardly in person",
    "Follows up every unbooked estimate automatically until they say yes or no",
    "Re-engages past customers for seasonal services before they think to call a competitor",
    "Builds landing pages for free estimate offers and seasonal promotions",
  ],
  boldClose: "Your competitors are answering. Your reviews and your content are the reason customers choose you — or don't. eighty5labs runs both.",
  faqTitle: 'Questions About eighty5labs for Home Services',
  faqs: INDUSTRY_FAQS.homeservices,
  ctaTitle: "Find Out How Many Jobs You're Losing to the Competition",
  ctaBody: "Free AI Visibility Audit — we'll show you your Map Pack position, review velocity, and which competitors are beating you for the searches that matter most.",
  accentColor: '#84CC16',
};

export default function HomeServicesPage() {
  return <IndustryPage data={data} />;
}
