import React from 'react';
import { INDUSTRY_FAQS } from '../../seo/faqs';
import { IndustryPage, IndustryPageData } from './IndustryTemplate';

const data: IndustryPageData = {
  slug: 'mortgage',
  label: 'Mortgage',
  sub: 'Loan Officers · Mortgage Brokers',
  heroH1: <>Close More Loans.<br />Miss Zero Leads.</>,
  heroCopy: "The borrower comparing rates right now won't wait for a callback. eighty5labs makes sure you're the lender who responds first — and follows up last.",
  problemTitle: 'The Mortgage Lead Problem',
  problemBody: [
    "Mortgage leads are the most time-sensitive in financial services. A borrower comparing rates on a Tuesday afternoon has three tabs open and a short attention span. The lender who responds in under two minutes wins the conversation. The lender who calls back three hours later gets voicemail.",
    "AI search is changing where borrowers start their research. When someone asks ChatGPT \"what lender should I use in [city]\" or \"best mortgage broker near me,\" the platforms recommend lenders with rich content, consistent reviews, and strong Google Business Profiles. Most loan officers have none of that running.",
    "On the back end, referral partners and past clients represent the highest-quality and lowest-cost leads you'll ever get — but only if your follow-up system keeps those relationships warm consistently, not just when you remember to reach out.",
  ],
  quote: "I'm on calls closing loans all day. When a lead doesn't hear back within an hour, they've already called someone else.",
  stats: [
    { value: '100%', label: 'of calls answered, even during closings' },
    { value: '< 2 min', label: 'average lead response time' },
    { value: 'Top 3', label: 'Map Pack placement in 30–90 days' },
  ],
  systems: [
    { name: 'Voice AI', desc: "Answers every inbound call 24/7 — during closings, evenings, weekends. Captures full borrower details, qualifies by loan type, and books consultations directly into your calendar." },
    { name: 'Content AI', desc: "Creates and optimizes website content, GBP posts, and FAQ pages structured for AI search — so when borrowers ask ChatGPT or Gemini for a lender recommendation, your name comes up." },
    { name: 'Reviews AI', desc: "Automates review requests after every closing via SMS. Builds your Google rating and review velocity — the signals that drive Map Pack ranking and AI search authority." },
    { name: 'Workflow AI', desc: "Keeps your referral partner and past client database warm with automated campaigns that generate referrals on a schedule — not just when you remember to reach out." },
    { name: 'Funnel AI', desc: "Builds high-converting landing pages for pre-approval offers, rate campaigns, and purchase vs. refi funnels — with every lead flowing directly to your CRM and calendar." },
    { name: 'Conversation AI', desc: "Engages website visitors instantly and follows up via SMS and email until they're ready to move forward — so no online lead slips away after hours." },
  ],
  bullets: [
    "Answers every inbound inquiry instantly — after hours, weekends, always — and captures full borrower details automatically",
    "Follows up with every lead in under 2 minutes via AI-powered text and email so no opportunity goes cold",
    "Creates content that gets your services found on Google and recommended by AI when borrowers compare lenders",
    "Automates review collection after every closing to build your Map Pack ranking and AI search authority",
    "Keeps your past client database warm with automated campaigns that generate referrals on schedule",
    "Builds landing pages for pre-approval offers, rate campaigns, and purchase vs. refi funnels",
  ],
  boldClose: "The referral business you've built is a goldmine. eighty5labs makes sure you're actually mining it.",
  faqTitle: 'Questions About eighty5labs for Mortgage',
  faqs: INDUSTRY_FAQS.mortgage,
  ctaTitle: "See Exactly Where You're Losing Mortgage Leads",
  ctaBody: "Free AI Visibility Audit — we'll show you your Map Pack position, review velocity, and AI search visibility against your top local competitors.",
  accentColor: '#1B4FFF',
};

export default function MortgagePage() {
  return <IndustryPage data={data} />;
}
