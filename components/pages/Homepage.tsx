import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Reveal, Stagger } from '../ui/Reveal';
import { navigate } from '../../router';
import { VoiceAIDemo } from '../VoiceAIDemo';
import { HeroAnimation } from '../HeroAnimation';
import { RevenueCalculator } from '../RevenueCalculator';

/* ── Icons ── */
const IconArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
);
const IconSearch = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
);
const IconZap = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>
);
const IconGlobe = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
);
const IconTrending = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
);
const IconPhone = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.45 19.45 0 015.13 12.8a19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
);
const IconStar = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
);
const IconChat = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
);
const IconMap = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
);
const IconCheck = ({ color = '#14B8A6' }: { color?: string }) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
);
const IconBarChart = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
);
const IconBriefcase = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>
);
const IconHeart = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
);
const IconHome = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
);
const IconTag = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
);
const IconTool = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>
);

/* ── DATA ── */
const GAPS_DATA = [
  {
    num: '01', label: 'Get Found', color: '#4F8EF7',
    stat: '73%', statLabel: 'of buyers never scroll past the first 3 results',
    headline: "They Can't Hire You If They Can't Find You",
    body: "You're invisible on Google Maps, ChatGPT, Gemini, and Perplexity. Your competitors aren't better — they're just more findable.",
    fix: 'AI Search + GBP Optimization',
    workflow: ['Search Query', 'Listings', 'Reviews', 'Click'],
  },
  {
    num: '02', label: 'Capture the Lead', color: '#8B5CF6',
    stat: '62%', statLabel: 'of after-hours calls go unanswered',
    headline: 'They Found You — Then Went to Voicemail',
    body: "A missed call is a lost customer. Voice AI answers every inquiry instantly, 24/7 — qualifying leads and booking directly to your calendar.",
    fix: 'Voice AI + Conversation AI',
    workflow: ['Inquiry', 'AI Answers', 'Lead Captured', 'Booked'],
  },
  {
    num: '03', label: 'Convert the Lead', color: '#14B8A6',
    stat: '88%', statLabel: 'of leads require 5+ follow-ups to close',
    headline: 'You Captured Them — Then Let Them Go Cold',
    body: 'No follow-up. No nurture sequence. The lead goes cold and signs with your competitor. Workflow AI keeps every lead warm — automatically.',
    fix: 'Workflow AI + Reviews AI',
    workflow: ['Lead Captured', 'Auto Follow-up', 'Nurture', 'Closed'],
  },
];

const SERVICES = [
  { gap: '01', gapLabel: 'Get Found', gapColor: '#4F8EF7', icon: <IconSearch />, title: 'Content AI', body: 'Publishes structured content that gets your business cited by ChatGPT, Gemini, and Perplexity. Weekly GBP posts, FAQ content, and local authority pages — automated.', features: ['Weekly GBP content posts', 'AI citation optimization', 'Local authority schema markup'] },
  { gap: '01', gapLabel: 'Get Found', gapColor: '#4F8EF7', icon: <IconMap />, title: 'GBP Optimization', body: 'Full profile optimization built to dominate local Map Pack results and appear when buyers search your area.', features: ['Map Pack ranking strategy', 'Category + keyword optimization', 'Competitor gap analysis'] },
  { gap: '02', gapLabel: 'Capture the Lead', gapColor: '#8B5CF6', icon: <IconPhone />, title: 'Voice AI', body: 'Answers every inbound call 24/7. Qualifies the lead, books directly into your calendar. Zero calls to voicemail.', features: ['24/7 call answering', 'Live calendar booking', 'AI lead qualification'] },
  { gap: '02', gapLabel: 'Capture the Lead', gapColor: '#8B5CF6', icon: <IconChat />, title: 'Conversation AI', body: 'Engages website visitors the moment they land, captures leads, books appointments, follows up via SMS and email.', features: ['Instant website lead capture', 'SMS + email follow-up', 'Automated appointment booking'] },
  { gap: '03', gapLabel: 'Convert the Lead', gapColor: '#14B8A6', icon: <IconZap />, title: 'Workflow AI', body: 'Follow-up sequences, re-engagement campaigns, appointment reminders, past client touches. Runs 24/7.', features: ['Smart follow-up sequences', 'Re-engagement campaigns', 'Appointment reminders'] },
  { gap: '03', gapLabel: 'Convert the Lead', gapColor: '#14B8A6', icon: <IconStar />, title: 'Reviews AI', body: 'Requests reviews from every customer automatically. Responds within minutes. Builds the velocity Google rewards.', features: ['Automated review requests', 'AI-powered instant responses', 'Review velocity monitoring'] },
];

const INDUSTRIES = [
  { label: 'Law Firms', sub: 'Personal Injury · Criminal Defense · Family Law', route: '#/legal', icon: <IconBriefcase />,
    detail: 'A DUI call at 9pm that hits voicemail is a retainer for your competitor. Voice AI captures every after-hours inquiry, qualifies by practice area, and books consultations — before competing firms open their doors.',
    stats: [{ val: '100%', label: 'after-hours capture' }, { val: '< 2 min', label: 'intake response' }, { val: 'Top 3', label: 'Map Pack placement' }] },
  { label: 'Home Services', sub: 'HVAC · Plumbing · Electrical · Roofing', route: '#/homeservices', icon: <IconTool />,
    detail: "Every missed call is a job for your competitor. During peak season, AI answers overflow and after-hours calls, books estimates, and follows up on unbooked quotes automatically at Day 1, 3, 7, and 14.",
    stats: [{ val: '0', label: 'missed calls' }, { val: 'Auto', label: 'review requests' }, { val: '40%', label: 'more call volume handled' }] },
  { label: 'Real Estate', sub: 'Agents · Teams · Brokerages', route: '#/realestate', icon: <IconTag />,
    detail: "78% of buyers work with the first agent who responds. While you're showing homes, Voice AI answers every inquiry instantly, captures buyer intent, and keeps your sphere of influence warm on autopilot.",
    stats: [{ val: '< 2 min', label: 'lead response' }, { val: '+30%', label: 'referral business' }, { val: '24/7', label: 'coverage' }] },
  { label: 'Mortgage', sub: 'Loan Officers · Mortgage Brokers', route: '#/mortgage', icon: <IconHome />,
    detail: "The borrower comparing rates right now has three tabs open. The lender who responds in under two minutes wins the conversation. AI captures every inquiry during closings and keeps referral partners warm automatically.",
    stats: [{ val: '100%', label: 'calls answered' }, { val: '< 2 min', label: 'response time' }, { val: 'Top 3', label: 'Map Pack' }] },
  { label: 'Medical & Wellness', sub: 'Dental · Med Spa · Chiropractic · PT', route: '#/medical', icon: <IconHeart />,
    detail: "When volume spikes, the front desk can't handle calls, check-ins, and insurance simultaneously. AI captures new patient inquiries 24/7, automates review requests post-visit, and reduces no-shows with smart reminders.",
    stats: [{ val: '24/7', label: 'patient capture' }, { val: 'Auto', label: 'review requests' }, { val: '-40%', label: 'no-shows' }] },
];

const TESTIMONIALS = [
  { metric: '64%', metricLabel: 'online booking rate (vs 25% avg)', quote: 'We were at 25% online bookings. Within 90 days of deploying eighty5.OS, we hit 64%. The Voice AI alone paid for itself in the first week.', author: 'Sarah M.', role: 'Med Spa Owner, Austin TX' },
  { metric: '3.1x', metricLabel: 'lead volume increase', quote: "I was skeptical AI could handle real estate client conversations. Now I never miss a lead, even during showings. My close rate went up because I'm always the first to respond.", author: 'Marcus D.', role: 'Real Estate Agent, Phoenix AZ' },
  { metric: '0', metricLabel: 'calls to voicemail', quote: 'Peak season used to mean overwhelmed phones and missed jobs. This summer we handled 40% more call volume with zero extra staff. Every call got answered.', author: 'Tom R.', role: 'HVAC Owner, Dallas TX' },
];

const FAQS = [
  { q: 'How quickly can we go live?', a: 'Most businesses are fully deployed in 5-7 business days. Voice AI and review automation can be running within 48 hours.' },
  { q: 'Do we need to change our current systems?', a: 'No. eighty5.OS integrates with your existing CRM, calendar, and phone system. We layer on top — no rip-and-replace.' },
  { q: 'What does "AI search visibility" actually mean?', a: "When someone asks ChatGPT, Gemini, or Perplexity for a recommendation in your market, does your business appear? Our Content AI ensures it does, with structured data that AI engines can cite and recommend." },
  { q: 'Is this a long-term contract?', a: 'No. Month-to-month after any initial commitment period. We earn your business every month.' },
  { q: 'What if we already have a receptionist / answering service?', a: "Voice AI handles overflow and after-hours — it doesn't replace your team, it catches what they miss. Most businesses use it as a safety net that pays for itself in recovered leads." },
  { q: 'How is this different from other AI tools?', a: "We don't sell individual tools. eighty5.OS is a complete system that closes all three revenue gaps — visibility, capture, and conversion — with everything connected. One dashboard, one team, one system." },
];

/* ═══════════════════════════════════════════════════
   GAP CARDS — compact horizontal tabs, above fold
═══════════════════════════════════════════════════ */
const GapCards: React.FC = () => {
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>(undefined as unknown as ReturnType<typeof setInterval>);

  useEffect(() => {
    timerRef.current = setInterval(() => setActive(p => (p + 1) % 3), 4000);
    return () => clearInterval(timerRef.current);
  }, []);

  const handleClick = (i: number) => {
    setActive(i);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setActive(p => (p + 1) % 3), 4000);
  };

  const g = GAPS_DATA[active];
  const tabIcons = [
    <svg key="s" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
    <svg key="p" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.45 19.45 0 015.13 12.8a19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
    <svg key="t" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  ];

  return (
    <div style={{ width: '100%', maxWidth: 800, marginInline: 'auto' }}>
      <div style={{ display: 'flex', borderBottom: '1px solid var(--ls-border)' }}>
        {GAPS_DATA.map((gap, i) => (
          <button key={gap.num} onClick={() => handleClick(i)} style={{
            flex: 1, padding: '12px 12px 14px', background: 'transparent', border: 'none',
            borderBottom: active === i ? `2px solid ${gap.color}` : '2px solid transparent',
            cursor: 'pointer', transition: 'all 0.25s',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            <span style={{
              width: 26, height: 26, borderRadius: 7,
              background: active === i ? `${gap.color}15` : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: active === i ? gap.color : '#94A3B8', transition: 'all 0.25s', flexShrink: 0,
            }}>{tabIcons[i]}</span>
            <span style={{
              fontFamily: 'var(--fd)', fontWeight: 800, fontSize: '0.78rem',
              color: active === i ? 'var(--td1)' : '#94A3B8',
              letterSpacing: '-0.01em', transition: 'color 0.25s',
            }}>{gap.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={active} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -3 }}
          transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ padding: '22px 0 0' }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 28, alignItems: 'start' }} className="gap-card-grid">
            <div>
              <div style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: g.color, marginBottom: 6 }}>Gap {g.num} — {g.label}</div>
              <h3 style={{ fontFamily: 'var(--fd)', fontWeight: 900, fontSize: 'clamp(1.05rem, 1.6vw, 1.25rem)', color: 'var(--td1)', letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: 8 }}>{g.headline}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--td2)', lineHeight: 1.65, maxWidth: '46ch' }}>{g.body}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 12 }}>
                <div style={{ width: 16, height: 16, borderRadius: 4, background: `${g.color}1A`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <IconCheck color={g.color} />
                </div>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: g.color }}>Fixed by {g.fix}</span>
              </div>
            </div>
            <div style={{ textAlign: 'right' as const, minWidth: 110, paddingTop: 2 }}>
              <div style={{ fontFamily: 'var(--fd)', fontWeight: 900, fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', lineHeight: 1, letterSpacing: '-0.04em', color: g.color, marginBottom: 4 }}>{g.stat}</div>
              <div style={{ fontSize: '0.68rem', color: 'var(--td3)', lineHeight: 1.35, maxWidth: '15ch', marginLeft: 'auto' }}>{g.statLabel}</div>
            </div>
          </div>
          <div style={{ marginTop: 18, height: 2, background: 'var(--ls-border)', borderRadius: 1, overflow: 'hidden' }}>
            <motion.div key={`bar-${active}`} initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: 4, ease: 'linear' }} style={{ height: '100%', background: g.color, borderRadius: 1 }} />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

/* ═══════════════════════════════════════════════════
   THREE GAPS FRAMEWORK — horizontal cards with flow connectors
═══════════════════════════════════════════════════ */
const ThreeGapsFramework: React.FC = () => {
  const gapIcons = [
    <svg key="s" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
    <svg key="p" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.45 19.45 0 015.13 12.8a19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
    <svg key="t" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  ];

  return (
    <div className="gaps-framework-outer">
      {GAPS_DATA.map((gap, i) => (
        <React.Fragment key={gap.num}>
          <Reveal delay={i * 0.12}>
            <div className="gaps-framework-card card-light" style={{ borderTop: `3px solid ${gap.color}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 13, flexShrink: 0,
                  background: `${gap.color}10`, border: `1px solid ${gap.color}20`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: gap.color,
                }}>
                  {gapIcons[i]}
                </div>
                <div>
                  <div style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: gap.color, marginBottom: 3 }}>Step {gap.num}</div>
                  <div style={{ fontFamily: 'var(--fd)', fontWeight: 900, fontSize: '1.05rem', color: 'var(--td1)', letterSpacing: '-0.02em', lineHeight: 1.2 }}>{gap.label}</div>
                </div>
              </div>

              <p style={{ fontSize: '0.875rem', color: 'var(--td2)', lineHeight: 1.7, marginBottom: 22 }}>{gap.body}</p>

              <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap' as const, marginBottom: 20 }}>
                {gap.workflow.map((step, j) => (
                  <React.Fragment key={j}>
                    <div style={{
                      padding: '4px 10px', borderRadius: 6,
                      background: j === gap.workflow.length - 1 ? `${gap.color}12` : 'var(--ls1)',
                      border: `1px solid ${j === gap.workflow.length - 1 ? gap.color + '28' : 'var(--ls-border)'}`,
                      fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '0.62rem',
                      color: j === gap.workflow.length - 1 ? gap.color : 'var(--td3)',
                      whiteSpace: 'nowrap' as const,
                    }}>{step}</div>
                    {j < gap.workflow.length - 1 && (
                      <svg width="12" height="8" viewBox="0 0 12 8" style={{ flexShrink: 0 }}>
                        <path d="M1 4h8m0 0L6 1m3 3L6 7" stroke={gap.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.35" />
                      </svg>
                    )}
                  </React.Fragment>
                ))}
              </div>

              <div style={{
                display: 'flex', alignItems: 'baseline', gap: 8,
                padding: '10px 14px', borderRadius: 10,
                background: `${gap.color}06`, border: `1px solid ${gap.color}18`,
                marginBottom: 16,
              }}>
                <span style={{ fontFamily: 'var(--fd)', fontWeight: 900, fontSize: '1.5rem', lineHeight: 1, letterSpacing: '-0.04em', color: gap.color }}>{gap.stat}</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--td3)', lineHeight: 1.4 }}>{gap.statLabel}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <div style={{ width: 16, height: 16, borderRadius: 4, background: `${gap.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><IconCheck color={gap.color} /></div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: gap.color }}>Fixed by {gap.fix}</span>
              </div>
            </div>
          </Reveal>

          {i < GAPS_DATA.length - 1 && (
            <div className="gaps-framework-connector">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="15" fill="white" stroke="var(--ls-border)" strokeWidth="1"/>
                <path d="M11 16h10m0 0l-4-4m4 4l-4 4" stroke="var(--td3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

/* ═══════════════════════════════════════════════════
   SCROLL-REVEAL DEMO
═══════════════════════════════════════════════════ */
const ScrollRevealDemo: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 0.35, 0.65], [0.84, 1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0.5, 1]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.35], [24, 14]);

  return (
    <div ref={ref} style={{ padding: '0 clamp(16px, 3vw, 40px)', maxWidth: 1100, marginInline: 'auto' }}>
      <motion.div style={{
        scale, opacity, borderRadius, overflow: 'hidden',
        boxShadow: '0 4px 40px rgba(15,23,42,0.10), 0 20px 80px rgba(15,23,42,0.07), 0 2px 12px rgba(27,79,255,0.05)',
        border: '1px solid var(--ls-border)', background: '#fff', position: 'relative',
      }}>
        <div style={{ position: 'absolute', top: -40, left: '50%', transform: 'translateX(-50%)', width: '70%', height: 80, background: 'radial-gradient(ellipse, rgba(27,79,255,0.07) 0%, transparent 70%)', filter: 'blur(30px)', pointerEvents: 'none' }} />
        <HeroAnimation />
      </motion.div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════
   INDUSTRY TABS — click-to-expand detail panel
═══════════════════════════════════════════════════ */
const IndustryTabs: React.FC = () => {
  const [active, setActive] = useState(0);
  const ind = INDUSTRIES[active];

  return (
    <div>
      {/* Tab buttons */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' as const, marginBottom: 0 }}>
        {INDUSTRIES.map((item, i) => {
          const isActive = active === i;
          return (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '10px 18px',
                borderRadius: '12px 12px 0 0',
                border: `1.5px solid ${isActive ? 'var(--ls-border)' : 'transparent'}`,
                borderBottom: isActive ? '1.5px solid #fff' : '1.5px solid transparent',
                background: isActive ? '#fff' : 'transparent',
                cursor: 'pointer',
                transition: 'all 0.2s',
                position: 'relative' as const,
                zIndex: isActive ? 2 : 1,
                marginBottom: -1.5,
              }}
            >
              <span style={{
                color: isActive ? 'var(--blue)' : 'var(--td3)',
                display: 'flex', alignItems: 'center', transition: 'color 0.2s',
              }}>{item.icon}</span>
              <span style={{
                fontFamily: 'var(--fd)', fontWeight: 700,
                fontSize: '0.82rem', letterSpacing: '-0.01em',
                color: isActive ? 'var(--td1)' : 'var(--td3)',
                transition: 'color 0.2s',
              }}>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Detail panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="card-light"
          style={{ borderRadius: '0 14px 14px 14px', padding: 0, overflow: 'hidden' }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 0 }} className="hero-grid">
            {/* Left: detail content */}
            <div style={{ padding: 'clamp(24px, 3vw, 36px)' }}>
              <div style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.13em', textTransform: 'uppercase' as const, color: 'var(--blue)', marginBottom: 8 }}>{ind.sub}</div>
              <h3 style={{ fontFamily: 'var(--fd)', fontWeight: 900, fontSize: 'clamp(1.1rem, 1.8vw, 1.35rem)', color: 'var(--td1)', letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: 14 }}>{ind.label}</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--td2)', lineHeight: 1.7, marginBottom: 24, maxWidth: '52ch' }}>{ind.detail}</p>
              <motion.a
                href={ind.route}
                onClick={(e: React.MouseEvent) => { e.preventDefault(); navigate(ind.route); }}
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="btn btn-primary btn-sm"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
              >
                See {ind.label} Solutions <IconArrow />
              </motion.a>
            </div>

            {/* Right: stats sidebar */}
            <div style={{
              background: 'var(--ls1)', borderLeft: '1px solid var(--ls-border)',
              padding: 'clamp(24px, 3vw, 36px)',
              display: 'flex', flexDirection: 'column' as const, justifyContent: 'center', gap: 24,
              minWidth: 180,
            }}>
              {ind.stats.map((s, j) => (
                <div key={j}>
                  <div style={{ fontFamily: 'var(--fd)', fontWeight: 900, fontSize: '1.4rem', letterSpacing: '-0.04em', color: 'var(--blue)', lineHeight: 1 }}>{s.val}</div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--td3)', marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

/* ═══════════════════════════════════════════════════
   PLATFORM TABS — services grouped by gap
═══════════════════════════════════════════════════ */
const GAP_TABS = [
  { num: '01', label: 'Get Found', color: '#4F8EF7' },
  { num: '02', label: 'Capture the Lead', color: '#8B5CF6' },
  { num: '03', label: 'Convert the Lead', color: '#14B8A6' },
];

const PlatformTabs: React.FC = () => {
  const [activeGap, setActiveGap] = useState('01');
  const filtered = SERVICES.filter(s => s.gap === activeGap);
  const gapColor = GAP_TABS.find(g => g.num === activeGap)?.color ?? '#4F8EF7';

  return (
    <div>
      {/* Gap tab bar */}
      <div style={{ display: 'flex', gap: 0, borderBottom: '1.5px solid var(--ls-border)', marginBottom: 0 }}>
        {GAP_TABS.map(gap => {
          const isActive = activeGap === gap.num;
          return (
            <button
              key={gap.num}
              onClick={() => setActiveGap(gap.num)}
              style={{
                flex: 1,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                padding: '14px 16px',
                background: 'transparent',
                border: 'none',
                borderBottom: `2.5px solid ${isActive ? gap.color : 'transparent'}`,
                cursor: 'pointer',
                transition: 'all 0.2s',
                marginBottom: -1.5,
              }}
            >
              <span style={{
                width: 22, height: 22, borderRadius: '50%',
                background: isActive ? gap.color : 'var(--ls2)',
                color: isActive ? '#fff' : 'var(--td3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--fd)', fontSize: '0.6rem', fontWeight: 900,
                transition: 'all 0.2s', flexShrink: 0,
              }}>{gap.num}</span>
              <span style={{
                fontFamily: 'var(--fd)', fontWeight: 800,
                fontSize: '0.82rem', letterSpacing: '-0.01em',
                color: isActive ? 'var(--td1)' : 'var(--td3)',
                transition: 'color 0.2s',
              }}>{gap.label}</span>
            </button>
          );
        })}
      </div>

      {/* Service cards — always 2 per gap = balanced grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeGap}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, paddingTop: 24 }}
          className="hero-grid"
        >
          {filtered.map((svc, i) => (
            <div key={svc.title} className="card-light" style={{ height: '100%', padding: 28 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 11, flexShrink: 0,
                  background: `${gapColor}0A`, border: `1px solid ${gapColor}20`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: gapColor,
                }}>{svc.icon}</div>
                <div>
                  <div style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '1.05rem', color: 'var(--td1)', letterSpacing: '-0.02em', lineHeight: 1.3 }}>{svc.title}</div>
                </div>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--td2)', lineHeight: 1.7, marginBottom: 18 }}>{svc.body}</p>
              <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
                {svc.features.map((f, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 16, height: 16, borderRadius: 4, background: `${gapColor}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><IconCheck color={gapColor} /></div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--td2)' }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

/* ═══════════════════════════════════════════════════
   MAIN HOMEPAGE
═══════════════════════════════════════════════════ */
export const Homepage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div>

      {/* ═══════ HERO ═══════ */}
      <section style={{ background: '#fff', paddingTop: 'clamp(84px, 11vw, 130px)', paddingBottom: 0, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-10%', left: '15%', width: '50%', height: '60%', background: 'radial-gradient(circle, rgba(79,124,255,0.07) 0%, transparent 50%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '0%', right: '10%', width: '40%', height: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 50%)', pointerEvents: 'none' }} />

        <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>

          {/* Section micro-label */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: [.16,1,.3,1] }} style={{ textAlign: 'center', marginBottom: 18 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '0.64rem', letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: '#94A3B8' }}>
              <span style={{ display: 'inline-block', width: 20, height: 1, background: '#C8D5E8' }} />
              Revenue OS
              <span style={{ display: 'inline-block', width: 20, height: 1, background: '#C8D5E8' }} />
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(2.6rem, 5.5vw, 4.5rem)', fontWeight: 900, letterSpacing: '-0.055em', lineHeight: 1.04, color: 'var(--td1)', textAlign: 'center', maxWidth: '18ch', marginInline: 'auto', marginBottom: 20 }}>
            Get Found. Capture Every Lead.{' '}
            <span style={{ display: 'block', background: 'linear-gradient(120deg, #1B4FFF 0%, #5B8EFF 50%, #8B5CF6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Convert More Revenue.
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.18 }}
            style={{ textAlign: 'center', fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)', color: 'var(--td2)', lineHeight: 1.65, maxWidth: '52ch', marginInline: 'auto', marginBottom: 28 }}>
            The AI Revenue OS that helps businesses get found, capture every lead, and convert more opportunities — automatically.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.24 }}
            style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' as const, marginBottom: 8 }}>
            <motion.a href="#/audit" onClick={e => { e.preventDefault(); navigate('#/audit'); }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: '0.9375rem' }}>
              Get Your Free Revenue Audit <IconArrow />
            </motion.a>
            <motion.a href="#/services" onClick={e => { e.preventDefault(); navigate('#/services'); }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn btn-ghost-light" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: '0.9375rem' }}>
              See How It Works
            </motion.a>
          </motion.div>
          <p style={{ textAlign: 'center', fontSize: '0.7rem', color: '#94A3B8', marginBottom: 40 }}>Free · No commitment · Yours to keep regardless</p>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
            style={{ background: '#FAFBFE', border: '1px solid var(--ls-border)', borderRadius: 16, padding: 'clamp(18px, 2.5vw, 28px)' }}>
            <GapCards />
          </motion.div>
        </div>
      </section>

      {/* ═══════ PRODUCT DEMO — Large, product-dominant ═══════ */}
      <section style={{ background: '#fff', paddingTop: 64, paddingBottom: 64 }}>
        <ScrollRevealDemo />
      </section>

      {/* ═══════ PROOF STRIP ═══════ */}
      <section style={{ padding: '26px 0', background: '#FAFBFE', borderTop: '1px solid var(--ls-border)', borderBottom: '1px solid var(--ls-border)' }}>
        <div className="wrap">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'clamp(20px, 4vw, 52px)', flexWrap: 'wrap' as const }}>
            {[
              { label: 'Search visibility tools', icon: <IconGlobe /> },
              { label: 'AI voice lead capture', icon: <IconPhone /> },
              { label: 'Automated follow-ups', icon: <IconZap /> },
              { label: 'Review generation', icon: <IconStar /> },
              { label: 'Revenue tracking', icon: <IconTrending /> },
            ].map(({ label, icon }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 7, flexShrink: 0,
                  background: 'var(--ls2)', border: '1px solid var(--ls-border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--td3)',
                }}>{icon}</div>
                <span style={{ fontFamily: 'var(--fd)', fontWeight: 600, fontSize: '0.8rem', color: 'var(--td2)', whiteSpace: 'nowrap' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ THREE GAPS FRAMEWORK ═══════ */}
      <section className="section-white">
        <div className="wrap">
          <Reveal>
            <div className="section-label">The Framework</div>
            <h2 className="section-heading">The System That Closes <span style={{ color: 'var(--blue)' }}>Every Revenue Gap</span></h2>
            <p className="section-sub" style={{ marginBottom: 56 }}>Most businesses lose revenue at one of three points. eighty5labs closes all three — automatically, 24/7.</p>
          </Reveal>
          <ThreeGapsFramework />
        </div>
      </section>

      {/* ═══════ VOICE AI DEMO — text left / visual right ═══════ */}
      <section className="section-light" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-5%', right: '5%', width: '40%', height: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div className="wrap" style={{ position: 'relative' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px, 6vw, 80px)', alignItems: 'center' }} className="hero-grid">
            <div>
              <Reveal>
                <div className="section-label">Capture the Lead</div>
                <h2 className="section-heading">Every Call Answered. <span style={{ color: 'var(--blue)' }}>Every Lead Captured.</span></h2>
                <p className="section-sub" style={{ marginBottom: 28 }}>This is what happens when a customer calls your business after hours. No voicemail. No missed lead. AI answers, qualifies, and books — instantly.</p>
                <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 11, marginBottom: 32 }}>
                  {[
                    'Answers in under 2 rings, 24/7',
                    'Qualifies lead and captures contact info',
                    'Books directly to your calendar',
                    'Sends confirmation automatically',
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 18, height: 18, borderRadius: 5, background: 'rgba(139,92,246,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><IconCheck color="#8B5CF6" /></div>
                      <span style={{ fontSize: '0.875rem', color: 'var(--td2)' }}>{item}</span>
                    </div>
                  ))}
                </div>
                <motion.a href="#/audit" onClick={e => { e.preventDefault(); navigate('#/audit'); }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn btn-primary btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  See It In Action <IconArrow />
                </motion.a>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <VoiceAIDemo />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════ PLATFORM OVERVIEW ═══════ */}
      <section className="section-white" style={{ position: 'relative' }}>
        <div className="wrap">
          <Reveal>
            <div className="section-label">Revenue OS</div>
            <h2 className="section-heading">The Revenue OS <span style={{ color: 'var(--blue)' }}>Platform</span></h2>
            <p className="section-sub" style={{ marginBottom: 48 }}>Six AI systems, each targeting a specific gap. Together they form one complete revenue recovery engine.</p>
          </Reveal>

          <PlatformTabs />

          <Reveal>
            <div style={{ textAlign: 'center' as const, marginTop: 44 }}>
              <a href="#/services" onClick={e => { e.preventDefault(); navigate('#/services'); }} className="btn btn-ghost-light" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                Explore All Systems <IconArrow />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════ HOW IT WORKS ═══════ */}
      <section className="section-light">
        <div className="wrap">
          <Reveal>
            <div className="section-label">How It Works</div>
            <h2 className="section-heading">From Audit to <span style={{ color: 'var(--blue)' }}>Autopilot</span></h2>
            <p className="section-sub" style={{ marginBottom: 48 }}>Four steps. No tech headaches. Running on autopilot in days.</p>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
            {[
              { num: '01', title: 'Audit', sub: 'Free AI Visibility Audit', body: 'We map your Google Business Profile, Map Pack rank, review velocity, and AI search visibility across ChatGPT, Gemini, and Perplexity.', Icon: IconSearch },
              { num: '02', title: 'Build', sub: 'Custom eighty5.OS Setup', body: 'We configure your OS with automated workflows, missed call text-back, review sequences, calendar sync, and a Voice agent that sounds like your brand.', Icon: IconZap },
              { num: '03', title: 'Deploy', sub: 'We Manage It. You Do the Work.', body: 'Calls, texts, web chats, social messages — one system, responding in seconds, around the clock.', Icon: IconGlobe },
              { num: '04', title: 'Optimize', sub: 'Monthly Performance Review', body: 'Monthly Map Pack movement, AI visibility checks, and lead capture performance review. The system gets better every month.', Icon: IconTrending },
            ].map((step, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="card-light" style={{ height: '100%', position: 'relative', overflow: 'visible' }}>
                  <div style={{
                    position: 'absolute', top: -14, left: 24,
                    width: 28, height: 28, borderRadius: '50%',
                    background: 'var(--blue)', color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--fd)', fontWeight: 900, fontSize: '0.7rem',
                    boxShadow: '0 2px 8px rgba(27,79,255,0.30)',
                  }}>{step.num}</div>
                  <div style={{
                    width: 42, height: 42, borderRadius: 11,
                    background: 'var(--ls2)', border: '1px solid var(--ls-border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--td2)', marginBottom: 14, marginTop: 6,
                  }}>
                    <step.Icon />
                  </div>
                  <div style={{ fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'var(--blue)', marginBottom: 3 }}>{step.sub}</div>
                  <div style={{ fontFamily: 'var(--fd)', fontWeight: 800, fontSize: '0.9rem', color: 'var(--td1)', marginBottom: 8, letterSpacing: '-0.015em' }}>{step.title}</div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--td2)', lineHeight: 1.75 }}>{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ REVENUE CALCULATOR ═══════ */}
      <section className="section-dark-alt" style={{ position: 'relative' }}>
        <div className="wrap" style={{ position: 'relative' }}>
          <Reveal>
            <div className="section-label">Revenue Impact</div>
            <h2 className="section-heading">What Are Your Gaps <span style={{ color: 'var(--blue3)' }}>Costing</span> You?</h2>
            <p className="section-sub" style={{ marginBottom: 40 }}>Adjust the sliders. See the math. This is revenue you're leaving on the table every month.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div style={{ maxWidth: 520, marginInline: 'auto' }}>
              <RevenueCalculator />
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div style={{ textAlign: 'center' as const, marginTop: 52 }}>
              <p style={{ color: 'var(--t3)', fontSize: '0.9rem', marginBottom: 18 }}>Ready to recover this revenue?</p>
              <motion.a href="#/audit" onClick={e => { e.preventDefault(); navigate('#/audit'); }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                Get Your Free Revenue Audit <IconArrow />
              </motion.a>
              <p style={{ marginTop: 14, fontSize: '0.72rem', color: 'rgba(255,255,255,0.22)' }}>Free · No commitment · Takes 5 minutes</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════ INDUSTRIES ═══════ */}
      <section className="section-white">
        <div className="wrap">
          <Reveal>
            <div className="section-label">Built For Your Market</div>
            <h2 className="section-heading">Every Industry. <span style={{ color: 'var(--blue)' }}>One System.</span></h2>
            <p className="section-sub" style={{ marginBottom: 44 }}>eighty5labs is built for service businesses that win on speed, reputation, and availability.</p>
          </Reveal>
          <IndustryTabs />
          <Reveal>
            <div style={{ textAlign: 'center' as const, marginTop: 44 }}>
              <motion.a href="#/audit" onClick={e => { e.preventDefault(); navigate('#/audit'); }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                Get Your Industry-Specific Audit <IconArrow />
              </motion.a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════ TESTIMONIALS ═══════ */}
      <section className="section-light" style={{ position: 'relative' }}>
        <div className="wrap">
          <Reveal>
            <div className="section-label">Results</div>
            <h2 className="section-heading">Don't Take Our Word For It.</h2>
            <p className="section-sub" style={{ marginBottom: 44 }}>Here's what happens when local businesses close all three gaps.</p>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="card-light" style={{ height: '100%' }}>
                  <div style={{ fontFamily: 'var(--fd)', fontWeight: 900, fontSize: '1.7rem', letterSpacing: '-0.04em', marginBottom: 3, color: 'var(--blue)' }}>{t.metric}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--td3)', marginBottom: 18 }}>{t.metricLabel}</div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--td2)', lineHeight: 1.6, marginBottom: 22, fontStyle: 'italic' }}>"{t.quote}"</p>
                  <div style={{ paddingTop: 16, borderTop: '1px solid var(--ls-border)' }}>
                    <div style={{ fontWeight: 600, color: 'var(--td1)', fontSize: '0.85rem' }}>{t.author}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--td3)', marginTop: 2 }}>{t.role}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ FAQ ═══════ */}
      <section className="section-white" style={{ borderTop: 'none' }}>
        <div className="wrap" style={{ maxWidth: 740 }}>
          <Reveal>
            <div className="section-label">FAQ</div>
            <h2 className="section-heading" style={{ marginBottom: 36 }}>Questions? Answers.</h2>
          </Reveal>
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 7 }}>
            {FAQS.map((faq, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <div style={{ background: '#fff', borderRadius: 'var(--rd)', overflow: 'hidden', transition: 'border-color 0.2s', border: openFaq === i ? '1.5px solid var(--blue-border)' : '1.5px solid var(--ls-border)' }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{ width: '100%', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--td1)', fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '0.9rem', textAlign: 'left' as const, gap: 14 }}>
                    {faq.q}
                    <motion.div animate={{ rotate: openFaq === i ? 45 : 0 }} transition={{ duration: 0.2 }} style={{ flexShrink: 0 }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--td3)" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    </motion.div>
                  </button>
                  <AnimatedAnswer open={openFaq === i} answer={faq.a} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ FINAL CTA — High contrast ═══════ */}
      <section style={{
        padding: 'clamp(120px, 14vw, 180px) 0',
        background: 'linear-gradient(180deg, #05080F 0%, #080C17 40%, #05080F 100%)',
        textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '90%', maxWidth: 1000, height: 500, background: 'radial-gradient(ellipse 65% 60% at 50% 0%, rgba(27,79,255,0.22) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '60%', maxWidth: 700, height: 300, background: 'radial-gradient(ellipse 50% 50% at 50% 100%, rgba(139,92,246,0.14) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div className="wrap" style={{ position: 'relative' }}>
          <Reveal>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '0.64rem', letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.25)', marginBottom: 28 }}>
              <span style={{ display: 'inline-block', width: 20, height: 1, background: 'rgba(255,255,255,0.2)' }} />
              Get Started Free
              <span style={{ display: 'inline-block', width: 20, height: 1, background: 'rgba(255,255,255,0.2)' }} />
            </div>

            <h2 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(2.8rem, 5.5vw, 4.2rem)', fontWeight: 900, letterSpacing: '-0.052em', lineHeight: 1.04, color: '#fff', marginBottom: 16, maxWidth: '14ch', marginInline: 'auto' }}>
              Close the revenue gaps.
            </h2>
            <p style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(1.3rem, 2.5vw, 1.9rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.2, background: 'linear-gradient(120deg, #4F8EF7 0%, #8B5CF6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: 28 }}>
              Get your free revenue audit.
            </p>

            <p style={{ color: 'rgba(255,255,255,0.42)', fontSize: '1rem', lineHeight: 1.7, marginBottom: 44, maxWidth: '44ch', marginInline: 'auto' }}>
              See exactly where you're losing revenue — visibility, capture, or conversion — and get a custom recovery plan.
            </p>

            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' as const }}>
              <motion.a href="#/audit" onClick={e => { e.preventDefault(); navigate('#/audit'); }} className="btn btn-primary" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} style={{ fontSize: '1.0625rem', padding: '18px 38px' }}>
                Start Your Free Audit →
              </motion.a>
              <motion.a href="#/pricing" onClick={e => { e.preventDefault(); navigate('#/pricing'); }} className="btn btn-ghost" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} style={{ fontSize: '1.0625rem', padding: '18px 32px' }}>
                View Pricing
              </motion.a>
            </div>
            <p style={{ marginTop: 24, fontSize: '0.78rem', color: 'rgba(255,255,255,0.22)' }}>No long-term contracts · Cancel anytime · Setup in days</p>
          </Reveal>
        </div>
      </section>

    </div>
  );
};

const AnimatedAnswer: React.FC<{ open: boolean; answer: string }> = ({ open, answer }) => (
  <motion.div
    initial={false}
    animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
    transition={{ duration: 0.25, ease: 'easeInOut' }}
    style={{ overflow: 'hidden' }}
  >
    <p style={{ padding: '0 20px 18px', fontSize: '0.88rem', color: 'var(--td2)', lineHeight: 1.6 }}>{answer}</p>
  </motion.div>
);
