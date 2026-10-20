import React from 'react';
import { INDUSTRY_FAQS } from '../../seo/faqs';
import { IndustryPage, IndustryPageData } from './IndustryTemplate';

const data: IndustryPageData = {
  slug: 'legal',
  label: 'Legal',
  sub: 'Personal Injury · Criminal Defense · Family Law · Estate Planning',
  heroH1: <>The Firm That Shows Up First<br />Wins the Client.</>,
  heroCopy: "Clients research attorneys before calling. Being first in local search and AI recommendations — combined with instant intake — is the difference between signing and losing.",
  problemTitle: 'The Legal Lead Problem',
  problemBody: [
    "Legal leads operate on a different clock than any other industry. Someone calling about a DUI arrest, a custody situation, or a personal injury isn't comparison shopping calmly — they're in crisis. They're calling multiple firms. The first attorney who responds professionally and immediately wins the retainer. If that call goes to voicemail, the case walks out the door before the tone finishes.",
    "After-hours intake is where law firms lose the most. Criminal defense, DUI, and family law inquiries are disproportionately after-hours calls — emergencies don't keep business hours. A firm that can capture, qualify, and respond to a 10pm DUI inquiry before competing firms open their doors the next morning has an enormous competitive advantage. Most firms aren't doing this.",
    "Visibility is equally high-stakes. Practice-area searches — \"personal injury lawyer in [city],\" \"DUI attorney near me,\" \"divorce lawyer [neighborhood]\" — are high-intent and high-value. AI search platforms are beginning to influence these queries in the same way Google Maps does. Firms with strong review profiles, authoritative practice-area content, and optimized GBP listings are being recommended. Most firms have none of that infrastructure running.",
  ],
  stats: [
    { value: '24/7', label: 'after-hours inquiry capture and response' },
    { value: 'Auto', label: 'lead qualification by practice area' },
    { value: 'Map Pack', label: 'visibility work for practice area keywords' },
  ],
  systems: [
    { name: 'Voice AI', desc: "Answers every inquiry immediately — 24/7. Captures case details by practice area, qualifies urgency, and schedules consultations directly into your calendar. A DUI call at 10pm gets a professional response before any competing firm is open." },
    { name: 'Content AI', desc: "Creates practice-area pages, FAQ content, and GBP posts that establish your authority in Google search and AI recommendations. Structured specifically for high-intent legal queries in your practice areas." },
    { name: 'Reviews AI', desc: "Automates review requests after case conclusions and positive client interactions. Builds your Google rating and review velocity — the signals that drive Map Pack ranking for competitive practice-area keywords." },
    { name: 'Workflow AI', desc: "Automates intake follow-up sequences for prospects who need time to decide, and keeps your referral network engaged with professional automated outreach." },
    { name: 'Conversation AI', desc: "Captures website inquiries instantly — including after hours — and follows up via SMS until consultation is booked. No case inquiry slips away because nobody was online." },
    { name: 'Funnel AI', desc: "Builds practice-area landing pages that convert paid search and organic traffic into booked consultations — with every lead flowing to your intake system immediately." },
  ],
  bullets: [
    "Answers every inquiry immediately — phone, web chat, after hours — and captures full case details before anyone on your team lifts a finger",
    "Creates practice-area content and FAQ pages that establish authority in Google search and AI recommendations",
    "Qualifies leads by practice area so your time goes to the cases worth taking",
    "Manages your Google reputation with automated review requests and professional AI-generated responses",
    "Automates intake follow-up sequences for prospects who need time to decide",
    "Builds practice-area landing pages that convert paid search traffic into booked consultations",
  ],
  boldClose: "You close cases. eighty5labs closes the gap between 'I need a lawyer' and 'I'm hiring you.'",
  faqTitle: 'Questions About eighty5labs for Legal',
  faqs: INDUSTRY_FAQS.legal,
  ctaTitle: "Find Out How Many Cases You're Losing After Hours",
  ctaBody: "Free AI Visibility Audit — we'll show you your Map Pack position, review velocity, and where competing firms are capturing inquiries you're missing.",
  accentColor: '#F59E0B',
};

export default function LegalPage() {
  return <IndustryPage data={data} />;
}
