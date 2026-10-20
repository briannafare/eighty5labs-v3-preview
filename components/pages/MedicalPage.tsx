import React from 'react';
import { INDUSTRY_FAQS } from '../../seo/faqs';
import { IndustryPage, IndustryPageData } from './IndustryTemplate';

const data: IndustryPageData = {
  slug: 'medical',
  label: 'Medical & Wellness',
  sub: 'Dental · Chiropractic · Med Spa · Physical Therapy',
  heroH1: <>Fill Your Schedule.<br />Automate Your Intake.</>,
  heroCopy: "Patients choose providers based on reviews and search results. eighty5.OS builds your reputation and automates appointment booking — on autopilot.",
  problemTitle: 'The Medical & Wellness Lead Problem',
  problemBody: [
    "Medical and wellness practices run on appointment volume. New patient acquisition drives growth. Patient retention drives stability. And your front desk — however capable — is being asked to do too much at once: handle check-ins, answer phones, process insurance, manage scheduling, and somehow respond to every new patient inquiry that comes in.",
    "When volume spikes, calls go to voicemail. Web inquiries sit in an inbox until someone has time. New patient follow-up doesn't happen consistently. Every one of those failures is a lost appointment — and in a high-value practice, a lost appointment chain can mean thousands in lifetime patient value.",
    "Reputation is equally important. Patients searching for a dentist, chiropractor, or med spa on Google look at reviews before they call anyone. A practice with 12 reviews and a 4.1 rating loses patients every day to competitors with 80 reviews and a 4.8. And AI search is making this worse — platforms recommend practices that appear most credible and consistent online.",
  ],
  quote: "My front desk can't handle calls, check-ins, and insurance questions all at once. New patient inquiries fall through every single day.",
  stats: [
    { value: '24/7', label: 'new patient inquiry capture, no staff required' },
    { value: 'Auto', label: 'review requests after every visit' },
    { value: 'Top 3', label: 'Google Maps for key practice area terms' },
  ],
  systems: [
    { name: 'Voice AI', desc: "Answers every call 24/7 — including during appointments when the front desk can't pick up. Captures new patient details, answers common questions, and books appointments directly into your scheduling system." },
    { name: 'Reviews AI', desc: "Automates review requests post-visit via SMS. Builds your Google rating and review velocity — the signals that drive Map Pack ranking and AI search recommendations for your practice area." },
    { name: 'Workflow AI', desc: "Sends appointment reminders that reduce no-shows, re-activates patients due for follow-up care, and runs seasonal promotion campaigns — all automatically." },
    { name: 'Content AI', desc: "Creates optimized service pages, FAQ content, and GBP posts that get your practice found in Google Maps and recommended by AI when patients search for your specialty." },
    { name: 'Conversation AI', desc: "Engages website visitors instantly, captures new patient inquiry details, and follows up via SMS until they book — so no online lead slips away after hours." },
    { name: 'Funnel AI', desc: "Builds landing pages for new patient specials, consultation offers, and seasonal promotions — with every inquiry flowing directly to your scheduling system." },
  ],
  bullets: [
    "Captures every new patient inquiry 24/7 — website chat, phone, and social — and books appointments automatically",
    "Creates optimized service and FAQ content that gets your practice found in Google and recommended by AI",
    "Automates review requests post-visit to build your Google ranking and AI search reputation",
    "Sends appointment reminders that actually reduce no-shows",
    "Re-activates patients due for follow-up care before they forget you exist",
    "Runs seasonal promotions and new patient offers without you touching a single button",
  ],
  boldClose: "Your patients trust you with their health. eighty5labs makes sure they find you first — and keeps them coming back.",
  faqTitle: 'Questions About eighty5labs for Medical & Wellness',
  faqs: INDUSTRY_FAQS.medical,
  ctaTitle: "Find Out How Many New Patients You're Missing",
  ctaBody: "Free AI Visibility Audit — we'll show you your Google Maps position, review velocity, and AI search visibility against competing practices in your area.",
  accentColor: '#A78BFA',
};

export default function MedicalPage() {
  return <IndustryPage data={data} />;
}
