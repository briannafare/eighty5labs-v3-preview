import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
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
const IconEye = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
);
const IconShield = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
);
const IconTarget = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
);

/* ── Floating dot decoration ── */
const FloatingDot: React.FC<{ color: string; size: number; top: string; left: string; delay?: number }> = ({ color, size, top, left, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: [0, 0.5, 0.3, 0.5, 0], y: [0, -12, 0, 8, 0] }}
    transition={{ duration: 8, delay, repeat: Infinity, ease: 'easeInOut' }}
    style={{ position: 'absolute', width: size, height: size, borderRadius: '50%', background: color, top, left, pointerEvents: 'none', filter: 'blur(1px)' }}
  />
);

/* ── DATA ── */
const GAPS_DATA = [
  {
    num: '01', label: 'Visibility', color: '#4F8EF7',
    icon: <IconEye />,
    stat: '73%', statLabel: 'never scroll past the first 3 results',
    headline: "They Can't Hire You If They Can't Find You",
    body: "You're invisible on Google Maps, ChatGPT, Gemini, and Perplexity. Your competitors aren't better — they're just more findable.",
    fix: 'Content AI + GBP Optimization',
  },
  {
    num: '02', label: 'Reputation', color: '#818CF8',
    icon: <IconShield />,
    stat: '88%', statLabel: 'read reviews before making a decision',
    headline: 'They Find You — Then Choose Someone Else',
    body: "Weak reviews, no responses, slow velocity. They see your competitor's 4.9 stars and click away.",
    fix: 'Reviews AI',
  },
  {
    num: '03', label: 'Conversion', color: '#14B8A6',
    icon: <IconTarget />,
    stat: '62%', statLabel: 'of after-hours calls go unanswered',
    headline: 'They Chose You. Then You Lost Them.',
    body: 'The call went to voicemail. The form sat for hours. The lead moved on. Every missed touchpoint is revenue walking out the door.',
    fix: 'Voice AI + Conversation AI',
  },
];

const SERVICES = [
  { gap: '01', gapLabel: 'Visibility', gapColor: '#4F8EF7', icon: <IconSearch />, title: 'Content AI', body: 'Publishes structured content that gets your business cited by ChatGPT, Gemini, and Perplexity. Weekly GBP posts, FAQ content, and local authority pages — automated.', features: ['Weekly GBP content posts', 'AI citation optimization', 'Local authority schema markup'] },
  { gap: '01', gapLabel: 'Visibility', gapColor: '#4F8EF7', icon: <IconMap />, title: 'GBP Optimization', body: 'Full profile optimization built to dominate local Map Pack results and appear when buyers search your area.', features: ['Map Pack ranking strategy', 'Category + keyword optimization', 'Competitor gap analysis'] },
  { gap: '02', gapLabel: 'Reputation', gapColor: '#818CF8', icon: <IconStar />, title: 'Reviews AI', body: 'Requests reviews from every customer automatically. Responds within minutes. Builds the velocity Google rewards.', features: ['Automated review requests', 'AI-powered instant responses', 'Review velocity monitoring'] },
  { gap: '03', gapLabel: 'Conversion', gapColor: '#14B8A6', icon: <IconPhone />, title: 'Voice AI', body: 'Answers every inbound call 24/7. Qualifies the lead, books directly into your calendar. Zero calls to voicemail.', features: ['24/7 call answering', 'Live calendar booking', 'AI lead qualification'] },
  { gap: '03', gapLabel: 'Conversion', gapColor: '#14B8A6', icon: <IconChat />, title: 'Conversation AI', body: 'Engages website visitors the moment they land, captures leads, books appointments, follows up via SMS and email.', features: ['Instant website lead capture', 'SMS + email follow-up', 'Automated appointment booking'] },
  { gap: '03', gapLabel: 'Conversion', gapColor: '#14B8A6', icon: <IconZap />, title: 'Workflow AI', body: 'Follow-up sequences, re-engagement campaigns, appointment reminders, past client touches. Runs 24/7.', features: ['Smart follow-up sequences', 'Re-engagement campaigns', 'Appointment reminders'] },
];

const INDUSTRIES = [
  { label: 'Mortgage', sub: 'Lenders · Loan Officers', route: '#/mortgage', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
  { label: 'Real Estate', sub: 'Agents · Brokerages', route: '#/real-estate', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg> },
  { label: 'HVAC', sub: 'Contractors · Service', route: '#/hvac', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14"/></svg> },
  { label: 'Med Spa', sub: 'Aesthetics · Wellness', route: '#/medspa', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg> },
  { label: 'Legal', sub: 'Attorneys · Firms', route: '#/legal', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
];

const INDUSTRY_DESCRIPTIONS = [
  "Mortgage leads move fast and don't wait for callbacks. We make sure every inquiry is captured, followed up, and closed — while your referral engine runs on autopilot.",
  "Speed wins in real estate. The first agent to respond gets the client. eighty5.OS makes you that agent — automatically, 24/7, even when you're showing homes.",
  "Every missed call is a job for your competitor. Voice AI answers 24/7, books appointments, and follows up — so you never lose work to voicemail again.",
  "Patients choose providers based on reviews and search results. eighty5.OS builds your digital reputation and automates appointment intake — filling your schedule on autopilot.",
  "Clients research attorneys extensively before calling. Being first in local search and AI recommendations — combined with instant intake response — is the difference between signing a client and losing them.",
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
  { q: 'How is this different from other AI tools?', a: "We don't sell individual tools. eighty5.OS is a complete system that closes all three revenue gaps — visibility, reputation, and conversion — with everything connected. One dashboard, one team, one system." },
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

  return (
    <div style={{ width: '100%', maxWidth: 800, marginInline: 'auto' }}>
      {/* Tab row */}
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
            }}>{gap.icon}</span>
            <span style={{
              fontFamily: 'var(--fd)', fontWeight: 800, fontSize: '0.78rem',
              color: active === i ? 'var(--td1)' : '#94A3B8',
              letterSpacing: '-0.01em', transition: 'color 0.25s',
            }}>{gap.label}</span>
          </button>
        ))}
      </div>

      {/* Content panel */}
      <AnimatePresence mode="wait">
        <motion.div key={active} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -3 }}
          transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ padding: '22px 0 0' }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 28, alignItems: 'start' }} className="gap-card-grid">
            <div>
              <div style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: g.color, marginBottom: 6 }}>Gap {g.num}</div>
              <h3 style={{ fontFamily: 'var(--fd)', fontWeight: 900, fontSize: 'clamp(1.05rem, 1.6vw, 1.25rem)', color: 'var(--td1)', letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: 8 }}>{g.headline}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--td2)', lineHeight: 1.65, maxWidth: '46ch' }}>{g.body}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 12 }}>
                <div style={{ width: 16, height: 16, borderRadius: 4, background: `${g.color}1A`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <IconCheck color={g.color} />
                </div>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: g.color }}>Closed by {g.fix}</span>
              </div>
            </div>
            <div style={{ textAlign: 'right' as const, minWidth: 110, paddingTop: 2 }}>
              <div style={{ fontFamily: 'var(--fd)', fontWeight: 900, fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', lineHeight: 1, letterSpacing: '-0.04em', color: g.color, marginBottom: 4 }}>{g.stat}</div>
              <div style={{ fontSize: '0.68rem', color: 'var(--td3)', lineHeight: 1.35, maxWidth: '15ch', marginLeft: 'auto' }}>{g.statLabel}</div>
            </div>
          </div>
          {/* Progress bar */}
          <div style={{ marginTop: 18, height: 2, background: 'var(--ls-border)', borderRadius: 1, overflow: 'hidden' }}>
            <motion.div key={`bar-${active}`} initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: 4, ease: 'linear' }} style={{ height: '100%', background: g.color, borderRadius: 1 }} />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

/* ═══════════════════════════════════════════════════
   SCROLL-REVEAL DEMO — Amplemarket-style grow on scroll
═══════════════════════════════════════════════════ */
const ScrollRevealDemo: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 0.35, 0.65], [0.82, 1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0.6, 1]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.35], [20, 12]);

  return (
    <div ref={ref} style={{ padding: '0 clamp(16px, 3vw, 40px)', maxWidth: 1000, marginInline: 'auto' }}>
      <motion.div style={{ scale, opacity, borderRadius, overflow: 'hidden', boxShadow: '0 8px 60px rgba(15,23,42,0.12), 0 2px 20px rgba(27,79,255,0.06)', border: '1px solid var(--ls-border)', background: '#fff', position: 'relative' }}>
        {/* Subtle glow behind */}
        <div style={{ position: 'absolute', top: -40, left: '50%', transform: 'translateX(-50%)', width: '70%', height: 80, background: 'radial-gradient(ellipse, rgba(27,79,255,0.08) 0%, transparent 70%)', filter: 'blur(30px)', pointerEvents: 'none' }} />
        <HeroAnimation />
      </motion.div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════
   MAIN HOMEPAGE
═══════════════════════════════════════════════════ */
export const Homepage: React.FC = () => {
  const [activeIndustry, setActiveIndustry] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div>

      {/* ═══════ HERO — Tight, StoryBrand-aligned, gaps above fold ═══════ */}
      <section style={{ background: '#fff', paddingTop: 'clamp(84px, 11vw, 130px)', paddingBottom: 0, position: 'relative', overflow: 'hidden' }}>
        {/* Subtle floating decoration */}
        <FloatingDot color="rgba(79,142,247,0.25)" size={6} top="18%" left="8%" delay={0} />
        <FloatingDot color="rgba(129,140,248,0.2)" size={5} top="35%" left="92%" delay={2} />
        <FloatingDot color="rgba(20,184,166,0.2)" size={4} top="70%" left="5%" delay={4} />
        <FloatingDot color="rgba(79,142,247,0.15)" size={8} top="60%" left="95%" delay={1.5} />

        <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>

          {/* Eyebrow */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} style={{ textAlign: 'center', marginBottom: 14 }}>
            <span style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '0.66rem', letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: '#94A3B8' }}>
              AI Automation for Service Businesses
            </span>
          </motion.div>

          {/* H1 — two-line, clear value prop */}
          <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(2.4rem, 5.2vw, 3.8rem)', fontWeight: 900, letterSpacing: '-0.055em', lineHeight: 1.05, color: 'var(--td1)', textAlign: 'center', maxWidth: '20ch', marginInline: 'auto', marginBottom: 4 }}>
            AI-Powered Revenue Recovery
          </motion.h1>
          <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(2.4rem, 5.2vw, 3.8rem)', fontWeight: 900, letterSpacing: '-0.055em', lineHeight: 1.05, textAlign: 'center', maxWidth: '20ch', marginInline: 'auto', marginBottom: 16, background: 'linear-gradient(120deg, #1B4FFF 0%, #5B8EFF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            for Local Businesses
          </motion.h1>

          {/* Sub — grunt-test clear */}
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.18 }}
            style={{ textAlign: 'center', fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)', color: 'var(--td2)', lineHeight: 1.6, maxWidth: '54ch', marginInline: 'auto', marginBottom: 24 }}>
            Your business leaks revenue at three points — visibility, reputation, and conversion. We close all three with AI systems that run 24/7.
          </motion.p>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.24 }}
            style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' as const, marginBottom: 6 }}>
            <motion.a href="#/audit" onClick={e => { e.preventDefault(); navigate('#/audit'); }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: '0.9375rem' }}>
              Get Your Free Audit <IconArrow />
            </motion.a>
            <motion.a href="#/services" onClick={e => { e.preventDefault(); navigate('#/services'); }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn btn-ghost-light" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: '0.9375rem' }}>
              See How It Works
            </motion.a>
          </motion.div>
          <p style={{ textAlign: 'center', fontSize: '0.7rem', color: '#94A3B8', marginBottom: 32 }}>Free · No commitment · Yours to keep regardless</p>

          {/* ── THREE GAPS — ABOVE FOLD ── */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
            style={{ background: '#FAFBFE', border: '1px solid var(--ls-border)', borderRadius: 14, padding: 'clamp(16px, 2.5vw, 26px)' }}>
            <GapCards />
          </motion.div>
        </div>
      </section>

      {/* ═══════ SCROLL-REVEAL PLATFORM DEMO ═══════ */}
      <section style={{ background: '#fff', paddingTop: 48, paddingBottom: 48 }}>
        <ScrollRevealDemo />
      </section>

      {/* ═══════ AI ENGINE LOGOS BAR ═══════ */}
      <section style={{ padding: '22px 0', background: '#FAFBFE', borderTop: '1px solid var(--ls-border)', borderBottom: '1px solid var(--ls-border)' }}>
        <div className="wrap" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '0.63rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase' as const, color: '#94A3B8', marginBottom: 14 }}>Optimizing brands for</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'clamp(20px, 4.5vw, 48px)', flexWrap: 'wrap' as const }}>
            {[
              { name: 'ChatGPT', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.998 5.998 0 0 0-3.998 2.9 6.042 6.042 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.05 6.05 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.143-.08 4.778-2.758a.776.776 0 0 0 .391-.676v-6.738l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.49zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872v.024zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66v.018zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.676l-.004 6.727zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5-.005-2.999z" fill="#0F172A"/></svg> },
              { name: 'Gemini', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 24C12 18.636 8.364 14 3 12c5.364-2 9-6.636 9-12 0 5.364 3.636 10 9 12-5.364 2-9 6.636-9 12z" fill="url(#gm2)"/><defs><linearGradient id="gm2" x1="3" y1="0" x2="21" y2="24"><stop stopColor="#4285F4"/><stop offset="0.5" stopColor="#9B72CB"/><stop offset="1" stopColor="#D96570"/></linearGradient></defs></svg> },
              { name: 'Perplexity', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 2l8 6 8-6v9l-4 3v8l-4-3-4 3v-8l-4-3V2z" fill="none" stroke="#0F172A" strokeWidth="1.8" strokeLinejoin="round"/><path d="M12 8v14M4 11h16" stroke="#0F172A" strokeWidth="1.8" strokeLinecap="round"/></svg> },
              { name: 'Claude', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15.788 3.09L12.47 14.67l-1.478-4.66a.6.6 0 0 0-.39-.39L5.92 8.14l11.58-3.33a.3.3 0 0 1 .288.28zM17.042 2.022c-.69-.69-1.81-.32-1.97.65L10.92 18.92a1.2 1.2 0 0 0 .78 1.38l.12.04c.63.18 1.27-.24 1.39-.89l3.83-16.78a.3.3 0 0 0-.01-.24.3.3 0 0 0 .01-.41z" fill="#D97706"/></svg> },
              { name: 'Grok', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M2.5 6l9.5 12L21.5 6" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="18" cy="4.5" r="2" fill="#0F172A"/></svg> },
            ].map(({ name, icon }) => (
              <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 7, opacity: 0.5 }}>
                {icon}
                <span style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '0.85rem', color: '#0F172A' }}>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ THREE GAPS — Expanded ═══════ */}
      <section className="section-white" style={{ borderTop: 'none', position: 'relative' }}>
        <FloatingDot color="rgba(79,142,247,0.15)" size={6} top="10%" left="3%" delay={1} />
        <FloatingDot color="rgba(129,140,248,0.12)" size={5} top="55%" left="97%" delay={3} />
        <div className="wrap">
          <Reveal>
            <div className="section-label">The Problem</div>
            <h2 className="section-heading">Three Gaps. One System.</h2>
            <p className="section-sub" style={{ marginBottom: 48 }}>Every local business leaks revenue at the same three points. Most don't even know it's happening.</p>
          </Reveal>
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 18 }}>
            {GAPS_DATA.map((gap, i) => (
              <Reveal key={gap.num} delay={i * 0.08}>
                <div style={{
                  display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(24px, 4vw, 48px)', alignItems: 'center',
                  background: '#fff', border: '1px solid var(--ls-border)', borderRadius: 16,
                  padding: 'clamp(24px, 3.5vw, 36px)', transition: 'border-color 0.3s, box-shadow 0.3s',
                }} className="gap-deep-grid"
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${gap.color}40`; (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px ${gap.color}10`; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--ls-border)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
                >
                  <div style={{ order: i % 2 === 0 ? 0 : 1 }} className="gap-deep-text">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                      <div style={{ width: 34, height: 34, borderRadius: 9, background: `${gap.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: gap.color, flexShrink: 0 }}>{gap.icon}</div>
                      <span style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: gap.color }}>Gap {gap.num} — {gap.label}</span>
                    </div>
                    <h3 style={{ fontFamily: 'var(--fd)', fontWeight: 900, fontSize: 'clamp(1.2rem, 1.9vw, 1.5rem)', color: 'var(--td1)', letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: 10 }}>{gap.headline}</h3>
                    <p style={{ fontSize: '0.88rem', color: 'var(--td2)', lineHeight: 1.7, marginBottom: 16, maxWidth: '44ch' }}>{gap.body}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 16, height: 16, borderRadius: 4, background: `${gap.color}1A`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><IconCheck color={gap.color} /></div>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: gap.color }}>Closed by {gap.fix}</span>
                    </div>
                  </div>
                  <div style={{
                    order: i % 2 === 0 ? 1 : 0,
                    display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center',
                    background: `${gap.color}08`, border: `1px solid ${gap.color}18`, borderRadius: 14,
                    padding: 'clamp(24px, 3vw, 36px)', textAlign: 'center' as const,
                  }} className="gap-deep-stat">
                    <div style={{ fontFamily: 'var(--fd)', fontWeight: 900, fontSize: 'clamp(2.6rem, 4.5vw, 3.6rem)', lineHeight: 1, letterSpacing: '-0.05em', color: gap.color, marginBottom: 8 }}>{gap.stat}</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--td3)', lineHeight: 1.45, maxWidth: '20ch' }}>{gap.statLabel}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ VOICE AI DEMO ═══════ */}
      <section className="section-light" style={{ position: 'relative' }}>
        <FloatingDot color="rgba(20,184,166,0.15)" size={5} top="20%" left="4%" delay={2} />
        <div className="wrap">
          <Reveal>
            <div className="section-label">Voice AI</div>
            <h2 className="section-heading">Every Call Answered. <span style={{ color: 'var(--blue)' }}>Every Lead Captured.</span></h2>
            <p className="section-sub" style={{ marginBottom: 40 }}>This is what happens when a customer calls your business after hours. No voicemail. No missed lead.</p>
          </Reveal>
          <VoiceAIDemo />
        </div>
      </section>

      {/* ═══════ THE PLATFORM ═══════ */}
      <section className="section-white" style={{ position: 'relative' }}>
        <FloatingDot color="rgba(79,142,247,0.12)" size={7} top="8%" left="96%" delay={0.5} />
        <div className="wrap">
          <Reveal>
            <div className="section-label">The Platform</div>
            <h2 className="section-heading">Six AI Systems. <span style={{ color: 'var(--blue)' }}>One OS.</span></h2>
            <p className="section-sub" style={{ marginBottom: 44 }}>Every component targets one gap. Together they form a complete revenue recovery system.</p>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: 14 }}>
            {SERVICES.map((svc, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="card-light" style={{ height: '100%', cursor: 'default' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: `linear-gradient(135deg, ${svc.gapColor}18, ${svc.gapColor}08)`, border: `1px solid ${svc.gapColor}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: svc.gapColor, flexShrink: 0, boxShadow: `0 2px 8px ${svc.gapColor}10` }}>{svc.icon}</div>
                    <div>
                      <div style={{ fontFamily: 'var(--fd)', fontWeight: 800, fontSize: '0.9rem', color: 'var(--td1)', letterSpacing: '-0.02em' }}>{svc.title}</div>
                      <div style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: svc.gapColor, marginTop: 2 }}>Gap {svc.gap} — {svc.gapLabel}</div>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.83rem', color: 'var(--td2)', lineHeight: 1.7, marginBottom: 14 }}>{svc.body}</p>
                  <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 7 }}>
                    {svc.features.map((f, j) => (
                      <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                        <div style={{ width: 15, height: 15, borderRadius: 4, background: `${svc.gapColor}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><IconCheck color={svc.gapColor} /></div>
                        <span style={{ fontSize: '0.78rem', color: 'var(--td2)' }}>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div style={{ textAlign: 'center', marginTop: 32 }}>
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14, position: 'relative' }}>
            {[
              { num: '01', title: 'Audit', sub: 'Free AI Visibility Audit', body: 'We map your Google Business Profile, Map Pack rank, review velocity, and AI search visibility across ChatGPT, Gemini, and Perplexity.', Icon: IconSearch },
              { num: '02', title: 'Build', sub: 'Custom eighty5.OS Setup', body: 'We configure your OS with automated workflows, missed call text-back, review sequences, calendar sync, and a Voice agent that sounds like your brand.', Icon: IconZap },
              { num: '03', title: 'Deploy', sub: 'We Manage It. You Do the Work.', body: 'Calls, texts, web chats, social messages — one system, responding in seconds, around the clock.', Icon: IconGlobe },
              { num: '04', title: 'Optimize', sub: 'Monthly Performance Review', body: 'Monthly Map Pack movement, AI visibility checks, and lead capture performance review. The system gets better every month.', Icon: IconTrending },
            ].map((step, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="card-light" style={{ height: '100%', position: 'relative', overflow: 'visible' }}>
                  {/* Step number badge */}
                  <div style={{
                    position: 'absolute', top: -14, left: 24,
                    width: 28, height: 28, borderRadius: '50%',
                    background: 'var(--blue)', color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--fd)', fontWeight: 900, fontSize: '0.7rem',
                    boxShadow: '0 2px 8px rgba(27,79,255,0.30)',
                    letterSpacing: '-0.02em',
                  }}>{step.num}</div>
                  <div style={{ width: 42, height: 42, borderRadius: 11, background: 'linear-gradient(135deg, var(--blue), #4F8EF7)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', marginBottom: 14, marginTop: 6 }}>
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
        <FloatingDot color="rgba(79,142,247,0.15)" size={6} top="15%" left="6%" delay={0} />
        <FloatingDot color="rgba(129,140,248,0.1)" size={5} top="70%" left="94%" delay={3} />
        <div className="wrap">
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
        </div>
      </section>

      {/* ═══════ INDUSTRIES ═══════ */}
      <section className="section-dark-alt" style={{ borderTop: 'none' }}>
        <div className="wrap">
          <Reveal>
            <div className="section-label">Built For Your Market</div>
            <h2 className="section-heading">Who Is eighty<span style={{ color: 'var(--blue3)' }}>5</span>labs Built For?</h2>
            <p className="section-sub" style={{ marginBottom: 36 }}>Local businesses that get found on Google — and are tired of losing customers after the click.</p>
          </Reveal>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const, marginBottom: 18 }}>
            {INDUSTRIES.map((ind, i) => (
              <motion.button key={i} onClick={() => setActiveIndustry(i)} whileTap={{ scale: 0.97 }}
                style={{
                  padding: '9px 16px', borderRadius: 10, fontFamily: 'var(--fd)',
                  border: activeIndustry === i ? '1.5px solid rgba(79,142,247,0.4)' : '1.5px solid rgba(255,255,255,0.08)',
                  background: activeIndustry === i ? 'rgba(79,142,247,0.12)' : 'rgba(255,255,255,0.03)',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 9, transition: 'all 0.2s',
                  color: activeIndustry === i ? '#93C5FD' : 'rgba(255,255,255,0.7)',
                }}
                onMouseEnter={e => { if (activeIndustry !== i) { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)'; }}}
                onMouseLeave={e => { if (activeIndustry !== i) { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'; }}}
              >
                <span style={{ color: activeIndustry === i ? '#93C5FD' : 'rgba(255,255,255,0.5)', display: 'flex' }}>{ind.icon}</span>
                <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>{ind.label}</span>
              </motion.button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={activeIndustry} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.25 }}
              style={{ background: 'linear-gradient(135deg, rgba(22,30,46,0.95) 0%, rgba(13,19,33,0.95) 100%)', border: '1px solid rgba(79,142,247,0.12)', borderRadius: 16, padding: 'clamp(24px, 3.5vw, 36px)', boxShadow: '0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.04)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: 'rgba(79,142,247,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#93C5FD' }}>{INDUSTRIES[activeIndustry].icon}</div>
                <div>
                  <span style={{ fontFamily: 'var(--fd)', fontWeight: 900, fontSize: '1.05rem', color: 'var(--t1)', letterSpacing: '-0.02em' }}>{INDUSTRIES[activeIndustry].label}</span>
                  <span style={{ display: 'block', fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>{INDUSTRIES[activeIndustry].sub}</span>
                </div>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--t2)', lineHeight: 1.7, marginBottom: 22, maxWidth: '58ch' }}>{INDUSTRY_DESCRIPTIONS[activeIndustry]}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 9, marginBottom: 24 }}>
                {[
                  { label: 'AI Search Visibility', color: '#4F8EF7' },
                  { label: 'Map Pack Optimization', color: '#4F8EF7' },
                  { label: 'Reviews AI', color: '#818CF8' },
                  { label: 'Voice AI — 24/7', color: '#14B8A6' },
                  { label: 'Instant lead follow-up', color: '#14B8A6' },
                ].map((feat, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <div style={{ width: 15, height: 15, borderRadius: 4, background: `${feat.color}1A`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><IconCheck color={feat.color} /></div>
                    <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.75)' }}>{feat.label}</span>
                  </div>
                ))}
              </div>
              <motion.a href={INDUSTRIES[activeIndustry].route} onClick={e => { e.preventDefault(); navigate(INDUSTRIES[activeIndustry].route); }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn btn-primary btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                See {INDUSTRIES[activeIndustry].label} Playbook <IconArrow />
              </motion.a>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ═══════ TESTIMONIALS ═══════ */}
      <section className="section-white" style={{ position: 'relative' }}>
        <FloatingDot color="rgba(79,142,247,0.1)" size={5} top="25%" left="95%" delay={1} />
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

      {/* ═══════ FINAL CTA ═══════ */}
      <section className="section-dark" style={{ textAlign: 'center' }}>
        <div className="wrap">
          <Reveal>
            <div style={{ background: 'linear-gradient(135deg, rgba(22,30,46,0.95) 0%, var(--bg0) 100%)', border: '1.5px solid rgba(79,142,247,0.18)', borderRadius: 'var(--rdxl)', padding: 'clamp(44px, 5.5vw, 72px) clamp(24px, 4.5vw, 72px)', position: 'relative', overflow: 'hidden', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(27,79,255,0.14) 0%, transparent 70%)', pointerEvents: 'none' }} />
              <div style={{ position: 'relative' }}>
                <div className="section-label" style={{ justifyContent: 'center' }}>Get Started Free</div>
                <h2 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.08, color: 'var(--t1)', marginBottom: 18, maxWidth: '20ch', marginInline: 'auto' }}>
                  Ready to Recover Your{' '}
                  <span style={{ background: 'linear-gradient(120deg, #4F8EF7, #5B8EFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Revenue?</span>
                </h2>
                <p style={{ color: 'var(--t3)', fontSize: '1rem', lineHeight: 1.6, marginBottom: 32, maxWidth: '48ch', marginInline: 'auto' }}>
                  See exactly where you're losing revenue — and what it would take to recover it.
                </p>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' as const }}>
                  <motion.a href="#/audit" onClick={e => { e.preventDefault(); navigate('#/audit'); }} className="btn btn-primary" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} style={{ fontSize: '0.9375rem', padding: '13px 28px' }}>
                    Start Your Free Audit →
                  </motion.a>
                  <motion.a href="#/pricing" onClick={e => { e.preventDefault(); navigate('#/pricing'); }} className="btn btn-ghost" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} style={{ fontSize: '0.9375rem', padding: '13px 26px' }}>
                    View Pricing
                  </motion.a>
                </div>
                <p style={{ marginTop: 18, fontSize: '0.78rem', color: 'var(--t4)' }}>No long-term contracts · Cancel anytime · Setup in days</p>
              </div>
            </div>
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
