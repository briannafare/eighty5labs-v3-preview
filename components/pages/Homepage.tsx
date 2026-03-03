import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { Reveal, Stagger } from '../ui/Reveal';
import { navigate } from '../../router';
import { VoiceAIDemo } from '../VoiceAIDemo';
import { HeroAnimation } from '../HeroAnimation';
import { RevenueCalculator } from '../RevenueCalculator';

/* ── Animated counter ── */
const AnimatedCounter: React.FC<{ value: number; suffix?: string }> = ({ value, suffix = '' }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const dur = 2000;
    const inc = value / (dur / 16);
    const timer = setInterval(() => {
      start += inc;
      if (start >= value) { setCount(value); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, value]);
  return <span ref={ref}>{count}{suffix}</span>;
};

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
const IconCheck = ({ color = '#10B981' }: { color?: string }) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
);

/* ── DATA ── */

const SERVICES = [
  {
    gap: 'Gap 01', gapLabel: 'Visibility',
    gapColor: '#4F8EF7', gapBg: 'rgba(79,142,247,0.10)', gapBorder: 'rgba(79,142,247,0.22)',
    gradient: 'linear-gradient(135deg, #1B4FFF 0%, #4F8EF7 100%)',
    icon: <IconSearch />,
    title: 'Content AI', tagline: 'Answer Engine + Generative Engine Optimization',
    body: 'Publishes structured content that gets your business recommended by ChatGPT, Gemini, and Perplexity. Weekly GBP posts, FAQ content, and local authority pages — automated.',
    features: ['Weekly GBP content posts', 'AI citation optimization', 'Local authority schema markup'],
  },
  {
    gap: 'Gap 01', gapLabel: 'Visibility',
    gapColor: '#4F8EF7', gapBg: 'rgba(79,142,247,0.10)', gapBorder: 'rgba(79,142,247,0.22)',
    gradient: 'linear-gradient(135deg, #4F8EF7 0%, #2563EB 100%)',
    icon: <IconMap />,
    title: 'GBP Optimization', tagline: 'Google Maps dominance. Map Pack top 3.',
    body: 'Full profile optimization built to dominate local Map Pack results and appear when buyers search your area.',
    features: ['Map Pack ranking strategy', 'Category + keyword optimization', 'Competitor gap analysis'],
  },
  {
    gap: 'Gap 02', gapLabel: 'Reputation',
    gapColor: '#A78BFA', gapBg: 'rgba(167,139,250,0.10)', gapBorder: 'rgba(167,139,250,0.22)',
    gradient: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)',
    icon: <IconStar />,
    title: 'Reviews AI', tagline: 'Automated generation + instant responses',
    body: 'Requests reviews from every customer automatically. Responds to every review within minutes. Builds the velocity Google rewards.',
    features: ['Automated review requests', 'AI-powered instant responses', 'Review velocity monitoring'],
  },
  {
    gap: 'Gap 03', gapLabel: 'Conversion',
    gapColor: '#10B981', gapBg: 'rgba(16,185,129,0.10)', gapBorder: 'rgba(16,185,129,0.25)',
    gradient: 'linear-gradient(135deg, #059669 0%, #10B981 100%)',
    icon: <IconPhone />,
    title: 'Voice AI', tagline: 'Never miss a call. Book while you sleep.',
    body: 'Answers every inbound call 24/7. Qualifies the lead, books directly into your calendar. Zero calls to voicemail.',
    features: ['24/7 call answering', 'Live calendar booking', 'AI lead qualification'],
  },
  {
    gap: 'Gap 03', gapLabel: 'Conversion',
    gapColor: '#10B981', gapBg: 'rgba(16,185,129,0.10)', gapBorder: 'rgba(16,185,129,0.25)',
    gradient: 'linear-gradient(135deg, #10B981 0%, #14B8A6 100%)',
    icon: <IconChat />,
    title: 'Conversation AI', tagline: 'Web leads engaged instantly, 24/7.',
    body: 'Engages website visitors the moment they land, captures leads, books appointments, follows up via SMS and email.',
    features: ['Instant website lead capture', 'SMS + email follow-up', 'Automated appointment booking'],
  },
  {
    gap: 'Gap 03', gapLabel: 'Conversion',
    gapColor: '#10B981', gapBg: 'rgba(16,185,129,0.10)', gapBorder: 'rgba(16,185,129,0.25)',
    gradient: 'linear-gradient(135deg, #10B981 0%, #FF6B35 100%)',
    icon: <IconZap />,
    title: 'Workflow AI', tagline: 'Automations that run smarter, without you.',
    body: 'Follow-up sequences, re-engagement campaigns, appointment reminders, past client touches. Runs 24/7.',
    features: ['Smart follow-up sequences', 'Re-engagement campaigns', 'Appointment reminders'],
  },
];

const INDUSTRIES = [
  { label: 'Mortgage', sub: 'Lenders · Loan Officers', route: '#/mortgage',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
  { label: 'Real Estate', sub: 'Agents · Brokerages', route: '#/real-estate',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg> },
  { label: 'HVAC', sub: 'Contractors · Service', route: '#/hvac',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14"/></svg> },
  { label: 'Med Spa', sub: 'Aesthetics · Wellness', route: '#/medspa',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg> },
  { label: 'Legal', sub: 'Attorneys · Firms', route: '#/legal',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
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
  { q: 'How quickly can we go live?', a: 'Most businesses are fully deployed in 5–7 business days. Voice AI and review automation can be running within 48 hours.' },
  { q: 'Do we need to change our current systems?', a: 'No. eighty5.OS integrates with your existing CRM, calendar, and phone system. We layer on top — no rip-and-replace.' },
  { q: 'What does "AI search visibility" actually mean?', a: 'When someone asks ChatGPT, Gemini, or Perplexity for a recommendation in your market, does your business appear? Our Content AI ensures it does, with structured data that AI engines can cite and recommend.' },
  { q: 'Is this a long-term contract?', a: 'No. Month-to-month after any initial commitment period. We earn your business every month.' },
  { q: 'What if we already have a receptionist / answering service?', a: "Voice AI handles overflow and after-hours — it doesn't replace your team, it catches what they miss. Most businesses use it as a safety net that pays for itself in recovered leads." },
  { q: 'How is this different from other AI tools?', a: "We don't sell individual tools. eighty5.OS is a complete system that closes all three revenue gaps — visibility, reputation, and conversion — with everything connected. One dashboard, one team, one system." },
];

/* ── Gap scroll item — fades in/out as it enters viewport center ── */
const GapScrollItem: React.FC<{ gap: {
  num: string; label: string; color: string; gradientAccent: string;
  tag: string; title: string; body: string; fix: string; fixColor: string; stat: string; statLabel: string;
}; index: number }> = ({ gap, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: '-35% 0px -35% 0px' });

  return (
    <motion.div
      ref={ref}
      animate={{ opacity: isInView ? 1 : 0.22 }}
      transition={{ duration: 0.5 }}
      style={{ padding: '52px 0', borderBottom: index < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
        <div style={{
          width: 38, height: 38, borderRadius: 10,
          background: gap.gradientAccent,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 4px 16px ${gap.color}50`, flexShrink: 0,
        }}>
          <span style={{ fontFamily: 'var(--fd)', fontWeight: 900, fontSize: '0.72rem', color: '#fff', letterSpacing: '0.02em' }}>{gap.num}</span>
        </div>
        <span style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: gap.color }}>
          {gap.tag}
        </span>
      </div>

      <h3 style={{
        fontFamily: 'var(--fd)', fontWeight: 900,
        fontSize: 'clamp(1.35rem, 2.2vw, 1.75rem)',
        color: 'var(--t1)', letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: 16,
      }}>{gap.title}</h3>

      <p style={{ fontSize: '1rem', color: 'var(--t2)', lineHeight: 1.8, marginBottom: 28, maxWidth: '50ch' }}>{gap.body}</p>

      {/* Stat callout */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 16,
        background: 'rgba(255,255,255,0.04)',
        border: `1px solid ${gap.color}30`,
        borderRadius: 14, padding: '14px 20px', marginBottom: 28,
      }}>
        <span style={{
          fontFamily: 'var(--fd)', fontWeight: 900, fontSize: '1.7rem',
          background: gap.gradientAccent, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.04em', lineHeight: 1,
        }}>{gap.stat}</span>
        <span style={{ fontSize: '0.8rem', color: 'var(--t3)', lineHeight: 1.4, maxWidth: '20ch' }}>{gap.statLabel}</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
        <div style={{
          width: 20, height: 20, borderRadius: 6, background: `${gap.color}22`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <IconCheck color={gap.color} />
        </div>
        <span style={{ fontSize: '0.875rem', fontWeight: 700, color: gap.color }}>Closed by: {gap.fix}</span>
      </div>
    </motion.div>
  );
};

/* ── Interactive service tab component ── */
const ServiceTabs: React.FC = () => {
  const [active, setActive] = useState(0);
  const svc = SERVICES[active];

  return (
    <div>
      {/* Service selector tabs */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' as const, marginBottom: 24 }}>
        {SERVICES.map((s, i) => {
          const isActive = active === i;
          return (
            <motion.button
              key={i}
              onClick={() => setActive(i)}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: '7px 14px', borderRadius: 9,
                fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '0.8rem',
                border: isActive ? `1.5px solid ${s.gapColor}55` : '1.5px solid rgba(255,255,255,0.08)',
                background: isActive ? `${s.gapColor}18` : 'rgba(255,255,255,0.03)',
                color: isActive ? s.gapColor : 'rgba(255,255,255,0.5)',
                cursor: 'pointer', transition: 'all 0.18s',
                display: 'flex', alignItems: 'center', gap: 6,
              }}
            >
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: isActive ? s.gapColor : 'rgba(255,255,255,0.2)', flexShrink: 0, transition: 'background 0.2s' }} />
              {s.title}
            </motion.button>
          );
        })}
      </div>

      {/* Active service card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22 }}
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: `1px solid ${svc.gapColor}28`,
            borderRadius: 18, overflow: 'hidden',
          }}
        >
          {/* Gradient header */}
          <div style={{ background: svc.gradient, padding: '22px 28px', display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 46, height: 46, borderRadius: 12,
              background: 'rgba(255,255,255,0.18)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0,
            }}>
              {svc.icon}
            </div>
            <div>
              <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.65)', marginBottom: 3 }}>
                {svc.gap} — {svc.gapLabel}
              </div>
              <div style={{ fontFamily: 'var(--fd)', fontWeight: 900, fontSize: '1.125rem', color: '#fff', letterSpacing: '-0.025em' }}>
                {svc.title}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>{svc.tagline}</div>
            </div>
          </div>

          {/* Body */}
          <div style={{ padding: '24px 28px' }}>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.68)', lineHeight: 1.75, marginBottom: 22 }}>{svc.body}</p>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
              {svc.features.map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 22, height: 22, borderRadius: 7,
                    background: `${svc.gapColor}20`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <IconCheck color={svc.gapColor} />
                  </div>
                  <span style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.78)' }}>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

/* ══════════════════════════════════════════════════════
   MAIN HOMEPAGE COMPONENT
══════════════════════════════════════════════════════ */

export const Homepage: React.FC = () => {
  const [activeIndustry, setActiveIndustry] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Scroll-peek: hero section ref
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['end end', 'end start'] });
  const peekHeight = useTransform(scrollYProgress, [0, 0.8], ['260px', '520px']);

  const GAPS = [
    {
      num: '01', label: 'Visibility', color: '#4F8EF7',
      gradientAccent: 'linear-gradient(135deg, #1B4FFF, #4F8EF7)',
      tag: 'Gap 01 — Visibility',
      title: "They Can't Hire You If They Can't Find You",
      body: "You're invisible on Google Maps, ChatGPT, Gemini, and Perplexity. Your competitors aren't better — they're just more findable. Every day without visibility is revenue handed to someone else.",
      fix: 'Content AI + GBP Optimization', fixColor: '#4F8EF7',
      stat: '73%', statLabel: 'of buyers never scroll past the first 3 results',
    },
    {
      num: '02', label: 'Reputation', color: '#A78BFA',
      gradientAccent: 'linear-gradient(135deg, #7C3AED, #A855F7)',
      tag: 'Gap 02 — Reputation',
      title: 'They Find You and Still Choose Someone Else',
      body: "Weak reviews, no responses, slow velocity. The customer checks your rating and clicks a competitor with 4.9 stars. Your product is better — but your reputation doesn't show it.",
      fix: 'Reviews AI', fixColor: '#A78BFA',
      stat: '88%', statLabel: 'of buyers read reviews before making a purchase decision',
    },
    {
      num: '03', label: 'Conversion', color: '#10B981',
      gradientAccent: 'linear-gradient(135deg, #059669, #10B981)',
      tag: 'Gap 03 — Conversion',
      title: 'They Chose You. Then You Lost Them.',
      body: 'The call went to voicemail. The form sat unanswered for hours. The lead moved on. Every missed touchpoint is cash walking out the door — silently, every single day.',
      fix: 'Voice AI + Conversation AI', fixColor: '#10B981',
      stat: '78%', statLabel: 'of customers buy from the first business to respond',
    },
  ];

  return (
    <div>

      {/* ═══════════════════════════════════════════
          01 — HERO — centered, breathable
      ═══════════════════════════════════════════ */}
      <section ref={heroRef} style={{
        background: '#fff',
        paddingTop: 'clamp(96px, 12vw, 148px)',
        paddingBottom: '0',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Ambient background mesh */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <motion.div
            animate={{ scale: [1, 1.12, 1], opacity: [0.18, 0.32, 0.18] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute', top: '-30%', left: '-15%', width: '80%', height: '80%',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(27,79,255,0.10) 0%, rgba(124,58,237,0.06) 50%, transparent 70%)',
              filter: 'blur(80px)',
            }}
          />
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.10, 0.22, 0.10] }}
            transition={{ duration: 24, repeat: Infinity, ease: 'linear', delay: 4 }}
            style={{
              position: 'absolute', bottom: '5%', right: '-15%', width: '65%', height: '65%',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(200,255,0,0.07) 0%, rgba(255,107,53,0.05) 50%, transparent 70%)',
              filter: 'blur(80px)',
            }}
          />
        </div>

        <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>

          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}
          >
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(27,79,255,0.06)',
              border: '1px solid rgba(27,79,255,0.16)',
              borderRadius: 999, padding: '6px 16px 6px 8px',
            }}>
              <div style={{
                width: 22, height: 22, borderRadius: '50%',
                background: 'linear-gradient(135deg, #1B4FFF, #C8FF00)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="#061020"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>
              </div>
              <span style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '0.75rem', color: 'var(--blue)', letterSpacing: '0.02em' }}>
                AI Operating System for Local Business
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--fd)',
              fontSize: 'clamp(2.8rem, 5.8vw, 4.4rem)',
              fontWeight: 900,
              letterSpacing: '-0.055em',
              lineHeight: 1.03,
              color: 'var(--td1)',
              textAlign: 'center',
              maxWidth: '14ch',
              marginInline: 'auto',
              marginBottom: 24,
            }}
          >
            Close the gaps.<br />
            <span style={{
              background: 'linear-gradient(120deg, #1B4FFF 0%, #7C3AED 55%, #C8FF00 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Recover the revenue.</span>
          </motion.h1>

          {/* Sub copy */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            style={{
              textAlign: 'center',
              fontSize: 'clamp(1rem, 1.7vw, 1.125rem)',
              color: 'var(--td2)',
              lineHeight: 1.65,
              maxWidth: '50ch',
              marginInline: 'auto',
              marginBottom: 40,
            }}
          >
            Most local businesses bleed revenue at three points. eighty5labs finds every gap and closes it — automatically.
          </motion.p>

          {/* Gap indicators — 3 numbered nodes connected by lines */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 0, marginBottom: 48, flexWrap: 'wrap' as const,
            }}
          >
            {[
              { num: '01', label: 'Visibility', color: '#4F8EF7', grad: 'linear-gradient(135deg,#1B4FFF,#4F8EF7)' },
              { num: '02', label: 'Reputation', color: '#A78BFA', grad: 'linear-gradient(135deg,#7C3AED,#A855F7)' },
              { num: '03', label: 'Conversion', color: '#10B981', grad: 'linear-gradient(135deg,#059669,#10B981)' },
            ].map((g, i) => (
              <React.Fragment key={g.num}>
                {i > 0 && (
                  <div style={{ width: 36, height: 1, background: 'linear-gradient(to right, var(--ls-border), var(--ls-border))', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                    <div style={{ position: 'absolute', width: 4, height: 4, borderRadius: '50%', background: 'var(--ls-border)' }} />
                  </div>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px' }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 9,
                    background: g.grad,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: `0 4px 12px ${g.color}45`, flexShrink: 0,
                  }}>
                    <span style={{ fontFamily: 'var(--fd)', fontWeight: 900, fontSize: '0.65rem', color: '#fff' }}>{g.num}</span>
                  </div>
                  <span style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--td1)', letterSpacing: '-0.01em' }}>{g.label}</span>
                </div>
              </React.Fragment>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.44 }}
            style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' as const, marginBottom: 12 }}
          >
            <motion.a
              href="#/audit"
              onClick={e => { e.preventDefault(); navigate('#/audit'); }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: '0.9375rem' }}
            >
              Get Your Free Audit <IconArrow />
            </motion.a>
            <motion.a
              href="#/services"
              onClick={e => { e.preventDefault(); navigate('#/services'); }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn btn-ghost-light"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: '0.9375rem' }}
            >
              See How It Works
            </motion.a>
          </motion.div>
          <p style={{ textAlign: 'center', fontSize: '0.72rem', color: '#94A3B8', marginBottom: 56 }}>
            Free · No commitment · Yours to keep regardless
          </p>

          {/* Scroll-peek demo — truncated at top, expands on scroll */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
            style={{ width: '100%', maxWidth: 720, marginInline: 'auto', position: 'relative' }}
          >
            {/* Glow */}
            <div style={{
              position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
              width: '80%', height: 100,
              background: 'radial-gradient(ellipse, rgba(27,79,255,0.14) 0%, transparent 70%)',
              filter: 'blur(24px)', zIndex: 0, pointerEvents: 'none',
            }} />
            {/* Fade mask at bottom */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: 60,
              background: 'linear-gradient(to top, #fff 0%, transparent 100%)',
              zIndex: 10, pointerEvents: 'none',
            }} />
            <motion.div style={{
              height: peekHeight,
              borderRadius: '20px 20px 0 0',
              overflow: 'hidden',
              boxShadow: '0 -2px 40px rgba(27,79,255,0.08), 0 20px 80px rgba(15,23,42,0.14)',
              border: '1px solid var(--ls-border)',
              borderBottom: 'none',
              background: '#fff',
              position: 'relative', zIndex: 1,
            }}>
              <HeroAnimation />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          01a — AI ENGINE LOGOS BAR
      ═══════════════════════════════════════════ */}
      <section style={{ padding: '28px 0', background: '#FAFBFE', borderTop: '1px solid var(--ls-border)', borderBottom: '1px solid var(--ls-border)' }}>
        <div className="wrap">
          <motion.div
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5 }}
            style={{ textAlign: 'center' }}
          >
            <p style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase' as const, color: '#94A3B8', marginBottom: 20 }}>
              Optimizing brands for
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'clamp(24px, 5vw, 56px)', flexWrap: 'wrap' as const }}>
              {[
                { name: 'ChatGPT', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.998 5.998 0 0 0-3.998 2.9 6.042 6.042 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.05 6.05 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.143-.08 4.778-2.758a.776.776 0 0 0 .391-.676v-6.738l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.49zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872v.024zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66v.018zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.676l-.004 6.727zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5-.005-2.999z" fill="#0F172A"/></svg> },
                { name: 'Gemini', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 24C12 18.636 8.364 14 3 12c5.364-2 9-6.636 9-12 0 5.364 3.636 10 9 12-5.364 2-9 6.636-9 12z" fill="url(#gm)"/><defs><linearGradient id="gm" x1="3" y1="0" x2="21" y2="24"><stop stopColor="#4285F4"/><stop offset="0.5" stopColor="#9B72CB"/><stop offset="1" stopColor="#D96570"/></linearGradient></defs></svg> },
                { name: 'Perplexity', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 2l8 6 8-6v9l-4 3v8l-4-3-4 3v-8l-4-3V2z" fill="none" stroke="#0F172A" strokeWidth="1.8" strokeLinejoin="round"/><path d="M12 8v14M4 11h16" stroke="#0F172A" strokeWidth="1.8" strokeLinecap="round"/></svg> },
                { name: 'Claude', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M15.788 3.09L12.47 14.67l-1.478-4.66a.6.6 0 0 0-.39-.39L5.92 8.14l11.58-3.33a.3.3 0 0 1 .288.28zM17.042 2.022c-.69-.69-1.81-.32-1.97.65L10.92 18.92a1.2 1.2 0 0 0 .78 1.38l.12.04c.63.18 1.27-.24 1.39-.89l3.83-16.78a.3.3 0 0 0-.01-.24.3.3 0 0 0 .01-.41z" fill="#D97706"/></svg> },
                { name: 'Grok', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M2.5 6l9.5 12L21.5 6" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="18" cy="4.5" r="2" fill="#0F172A"/></svg> },
              ].map(({ name, icon }) => (
                <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 8, opacity: 0.55, transition: 'opacity 0.2s', cursor: 'default' }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '0.55')}
                >
                  {icon}
                  <span style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '0.9375rem', color: '#0F172A' }}>{name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          01b — STATS BAR — gradient numbers
      ═══════════════════════════════════════════ */}
      <section style={{ padding: '28px 0', background: '#fff', borderBottom: '1px solid var(--ls-border)' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, textAlign: 'center' }} className="stats-grid">
            {[
              { value: 64, suffix: '%', label: 'Booking Rate', grad: 'linear-gradient(135deg,#1B4FFF,#7C3AED)' },
              { value: 24, suffix: '/7', label: 'AI Coverage', grad: 'linear-gradient(135deg,#4F8EF7,#1B4FFF)' },
              { value: 3, suffix: 'x', label: 'Lead Volume', grad: 'linear-gradient(135deg,#C8FF00,#10B981)' },
              { value: 98, suffix: '%', label: 'Client Retention', grad: 'linear-gradient(135deg,#A78BFA,#7C3AED)' },
            ].map((stat, i) => (
              <div key={i} style={{ padding: '4px 8px', borderLeft: i > 0 ? '1px solid var(--ls-border)' : 'none' }}>
                <div style={{
                  fontFamily: 'var(--fd)', fontWeight: 900,
                  fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: 1.1, marginBottom: 4,
                  background: stat.grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: 'var(--td3)' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          02 — GAPS — sticky scroll layout
      ═══════════════════════════════════════════ */}
      <section className="section-dark-alt" style={{ paddingBlock: 'clamp(80px, 9vw, 120px)' }}>
        <div className="wrap">
          <Reveal>
            <div className="section-label">The Three Gaps</div>
            <h2 className="section-heading">Where Revenue <span className="heading-accent" style={{ color: 'var(--blue3)' }}>Leaks</span></h2>
            <p className="section-sub" style={{ marginBottom: 64 }}>Three specific points where local businesses lose customers every day.</p>
          </Reveal>

          <div className="gaps-sticky-layout">
            {/* Scrolling gap items */}
            <div>
              {GAPS.map((gap, i) => (
                <GapScrollItem key={i} gap={gap} index={i} />
              ))}
            </div>
            {/* Sticky calculator */}
            <div className="gaps-sticky-col">
              <RevenueCalculator />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          03 — VOICE AI DEMO
      ═══════════════════════════════════════════ */}
      <section className="section-light">
        <div className="wrap">
          <VoiceAIDemo />
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          04 — THE PLATFORM — interactive service tabs
      ═══════════════════════════════════════════ */}
      <section className="section-dark">
        <div className="wrap">
          <Reveal>
            <div className="section-label">The Platform</div>
            <h2 className="section-heading">The AI OS That Closes <span className="heading-accent" style={{ color: 'var(--blue3)' }}>All Three Gaps.</span></h2>
            <p className="section-sub" style={{ marginBottom: 52 }}>Every component targets one gap. Together they form a complete revenue system.</p>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 'clamp(24px, 3vw, 48px)', alignItems: 'start' }} className="services-tab-grid">

            {/* Left — gap legend cards */}
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
              {[
                { num: '01', label: 'Visibility', color: '#4F8EF7', grad: 'linear-gradient(135deg,#1B4FFF,#4F8EF7)', desc: 'Get found first', svcIndices: [0, 1] },
                { num: '02', label: 'Reputation', color: '#A78BFA', grad: 'linear-gradient(135deg,#7C3AED,#A855F7)', desc: 'Build trust at scale', svcIndices: [2] },
                { num: '03', label: 'Conversion', color: '#10B981', grad: 'linear-gradient(135deg,#059669,#10B981)', desc: 'Never miss a lead', svcIndices: [3, 4, 5] },
              ].map(group => (
                <div key={group.num} style={{
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 14, padding: '16px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <div style={{
                      width: 30, height: 30, borderRadius: 8, background: group.grad,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: `0 3px 10px ${group.color}40`, flexShrink: 0,
                    }}>
                      <span style={{ fontFamily: 'var(--fd)', fontWeight: 900, fontSize: '0.6rem', color: '#fff' }}>{group.num}</span>
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--fd)', fontWeight: 800, fontSize: '0.9rem', color: 'var(--t1)' }}>{group.label}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--t3)', marginTop: 1 }}>{group.desc}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 4, paddingLeft: 40 }}>
                    {group.svcIndices.map(idx => (
                      <div key={idx} style={{ fontSize: '0.78rem', color: group.color, fontWeight: 600 }}>→ {SERVICES[idx].title}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Right — service card tabs */}
            <ServiceTabs />
          </div>

          <Reveal>
            <div style={{ textAlign: 'center', marginTop: 40 }}>
              <a href="#/services" onClick={e => { e.preventDefault(); navigate('#/services'); }} className="btn btn-ghost">See All Six AI Systems →</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          05 — PROCESS
      ═══════════════════════════════════════════ */}
      <section className="section-white">
        <div className="wrap">
          <Reveal>
            <div className="section-label">How It Works</div>
            <h2 className="section-heading" style={{ color: 'var(--td1)' }}>From Audit to <span className="heading-accent" style={{ color: 'var(--blue)' }}>Autopilot</span></h2>
            <p className="section-sub" style={{ marginBottom: 52, color: 'var(--td2)' }}>Four steps. No tech headaches. Running on autopilot in days.</p>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
            {[
              { num: '01', sub: 'Free AI Visibility Audit', title: 'Audit', body: 'We map your Google Business Profile, Map Pack rank, review velocity, and AI search visibility across ChatGPT, Gemini, and Perplexity.', Icon: IconSearch, gradient: 'linear-gradient(135deg, #1B4FFF 0%, #4F8EF7 100%)' },
              { num: '02', sub: 'Custom eighty5.OS Setup', title: 'Build', body: 'We configure your OS with automated workflows, missed call text-back, review sequences, calendar sync, and a Voice agent that sounds like your brand.', Icon: IconZap, gradient: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)' },
              { num: '03', sub: 'We Manage It. You Do the Work.', title: 'Deploy', body: 'Calls, texts, web chats, social messages — one system, responding in seconds, around the clock.', Icon: IconGlobe, gradient: 'linear-gradient(135deg, #059669 0%, #10B981 100%)' },
              { num: '04', sub: 'Monthly Performance Review', title: 'Optimize', body: 'Monthly Map Pack movement, AI visibility checks, and lead capture performance review. The system gets better every month.', Icon: IconTrending, gradient: 'linear-gradient(135deg, #FF6B35 0%, #C8FF00 100%)' },
            ].map((step, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="card-light" style={{ height: '100%' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: step.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', marginBottom: 14, boxShadow: '0 4px 14px rgba(27,79,255,0.15)' }}>
                    <step.Icon />
                  </div>
                  <div style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'var(--blue)', marginBottom: 5 }}>{step.sub}</div>
                  <div style={{ fontFamily: 'var(--fd)', fontWeight: 800, fontSize: '0.9375rem', color: 'var(--td1)', marginBottom: 8, letterSpacing: '-0.015em' }}>{step.num}. {step.title}</div>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--td2)', lineHeight: 1.75 }}>{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          06 — INDUSTRIES
      ═══════════════════════════════════════════ */}
      <section className="section-dark-alt">
        <div className="wrap">
          <Reveal>
            <div className="section-label">Built For Your Market</div>
            <h2 className="section-heading">Who Is eighty<span style={{ color: 'var(--blue3)' }}>5</span>labs Built For?</h2>
            <p className="section-sub" style={{ marginBottom: 48 }}>Local businesses that get found on Google — and are tired of losing customers after the click.</p>
          </Reveal>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const, marginBottom: 20 }}>
            {INDUSTRIES.map((ind, i) => (
              <motion.button key={i} onClick={() => setActiveIndustry(i)} whileTap={{ scale: 0.97 }}
                style={{
                  padding: '10px 18px', borderRadius: 10, fontFamily: 'var(--fd)',
                  border: activeIndustry === i ? '1.5px solid rgba(79,142,247,0.4)' : '1.5px solid rgba(255,255,255,0.08)',
                  background: activeIndustry === i ? 'rgba(79,142,247,0.12)' : 'rgba(255,255,255,0.03)',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, transition: 'all 0.2s',
                  color: activeIndustry === i ? '#93C5FD' : 'rgba(255,255,255,0.7)',
                }}
                onMouseEnter={e => { if (activeIndustry !== i) { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; }}}
                onMouseLeave={e => { if (activeIndustry !== i) { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}}
              >
                <span style={{ color: activeIndustry === i ? '#93C5FD' : 'rgba(255,255,255,0.5)', display: 'flex' }}>{ind.icon}</span>
                <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>{ind.label}</span>
              </motion.button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={activeIndustry} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.25 }}
              style={{ background: 'linear-gradient(135deg, var(--bg2) 0%, rgba(22,30,46,0.95) 100%)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 'clamp(28px, 4vw, 40px)', display: 'grid', gridTemplateColumns: '1fr 280px', gap: 40, alignItems: 'start' }}
              className="ind-panel-grid"
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(79,142,247,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#93C5FD' }}>
                    {INDUSTRIES[activeIndustry].icon}
                  </div>
                  <div>
                    <span style={{ fontFamily: 'var(--fd)', fontWeight: 900, fontSize: '1.125rem', color: 'var(--t1)', letterSpacing: '-0.02em' }}>{INDUSTRIES[activeIndustry].label}</span>
                    <span style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>{INDUSTRIES[activeIndustry].sub}</span>
                  </div>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--t2)', lineHeight: 1.75, marginBottom: 24, maxWidth: '52ch' }}>{INDUSTRY_DESCRIPTIONS[activeIndustry]}</p>
                <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10, marginBottom: 28 }}>
                  {[
                    { label: 'AI Search Visibility', color: '#4F8EF7' },
                    { label: 'Google Map Pack Optimization', color: '#4F8EF7' },
                    { label: 'Reviews AI — automated generation + responses', color: '#A78BFA' },
                    { label: 'Voice AI — 24/7 call answering + booking', color: '#10B981' },
                    { label: 'Lead follow-up — instant SMS & email nurture', color: '#10B981' },
                  ].map((feat, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 18, height: 18, borderRadius: 5, background: `${feat.color}1A`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <IconCheck color={feat.color} />
                      </div>
                      <span style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.78)' }}>{feat.label}</span>
                    </div>
                  ))}
                </div>
                <motion.a href={INDUSTRIES[activeIndustry].route} onClick={e => { e.preventDefault(); navigate(INDUSTRIES[activeIndustry].route); }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  See {INDUSTRIES[activeIndustry].label} Playbook <IconArrow />
                </motion.a>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '20px' }}>
                <div style={{ fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.45)', marginBottom: 12 }}>Industry Insight</div>
                <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.75, fontStyle: 'italic' }}>
                  {["\"The lender who responds first wins the deal. In mortgage, speed isn't a luxury — it's the entire game.\"","\"68% of home buyers work with the first agent who responds. Second place gets nothing.\"","\"HVAC companies miss 30-60% of inbound calls during peak season. Every missed call is a job for your competitor.\"","\"AI-integrated med spas achieve a 64% online booking rate versus 25% industry average.\"","\"Clients research attorneys extensively before calling. Being first in local search + instant intake = signed retainer.\""][activeIndustry]}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          07 — TESTIMONIALS
      ═══════════════════════════════════════════ */}
      <section className="section-white">
        <div className="wrap">
          <Reveal>
            <div className="section-label">Results</div>
            <h2 className="section-heading" style={{ color: 'var(--td1)' }}>Don't Take Our Word For It.</h2>
            <p className="section-sub" style={{ marginBottom: 52, color: 'var(--td2)' }}>Here's what happens when local businesses close all three gaps.</p>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="card-light" style={{ height: '100%' }}>
                  <div style={{
                    fontFamily: 'var(--fd)', fontWeight: 900, fontSize: '1.75rem', letterSpacing: '-0.04em', marginBottom: 4,
                    background: i === 0 ? 'linear-gradient(135deg,#1B4FFF,#7C3AED)' : i === 1 ? 'linear-gradient(135deg,#10B981,#C8FF00)' : 'linear-gradient(135deg,#FF6B35,#A78BFA)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  }}>{t.metric}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--td3)', marginBottom: 20 }}>{t.metricLabel}</div>
                  <p style={{ fontSize: '0.9375rem', color: 'var(--td2)', lineHeight: 1.65, marginBottom: 24, fontStyle: 'italic' }}>"{t.quote}"</p>
                  <div style={{ paddingTop: 18, borderTop: '1px solid var(--ls-border)' }}>
                    <div style={{ fontWeight: 600, color: 'var(--td1)', fontSize: '0.875rem' }}>{t.author}</div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--td3)', marginTop: 3 }}>{t.role}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          08 — FAQ
      ═══════════════════════════════════════════ */}
      <section className="section-white">
        <div className="wrap" style={{ maxWidth: 760 }}>
          <Reveal>
            <div className="section-label">FAQ</div>
            <h2 className="section-heading" style={{ color: 'var(--td1)', marginBottom: 44 }}>Questions? We've Got Answers.</h2>
          </Reveal>
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
            {FAQS.map((faq, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div style={{ background: '#fff', borderRadius: 'var(--rd)', overflow: 'hidden', transition: 'border-color 0.2s', border: openFaq === i ? '1.5px solid var(--blue-border)' : '1.5px solid var(--ls-border)' }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{ width: '100%', padding: '18px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--td1)', fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '0.9375rem', textAlign: 'left' as const, gap: 16 }}
                  >
                    {faq.q}
                    <motion.div animate={{ rotate: openFaq === i ? 45 : 0 }} transition={{ duration: 0.2 }} style={{ flexShrink: 0 }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--td3)" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    </motion.div>
                  </button>
                  <AnimatedAnswer open={openFaq === i} answer={faq.a} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          09 — FINAL CTA
      ═══════════════════════════════════════════ */}
      <section className="section-dark" style={{ textAlign: 'center' }}>
        <div className="wrap">
          <Reveal>
            <div style={{
              background: 'linear-gradient(135deg, var(--bg2) 0%, var(--bg1) 100%)',
              border: '1.5px solid var(--blue-border)', borderRadius: 'var(--rdxl)',
              padding: 'clamp(48px, 6vw, 80px) clamp(28px, 5vw, 80px)',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(27,79,255,0.16) 0%, rgba(124,58,237,0.08) 50%, transparent 70%)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', bottom: -60, right: -60, width: 240, height: 240, borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,255,0,0.07) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
              <div style={{ position: 'relative' }}>
                <div className="section-label" style={{ justifyContent: 'center' }}>Get Started Free</div>
                <h2 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(1.9rem, 3.2vw, 2.7rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.07, color: 'var(--t1)', marginBottom: 20, maxWidth: '18ch', marginInline: 'auto' }}>
                  Ready to Dominate{' '}
                  <span style={{ background: 'linear-gradient(135deg,#4F8EF7,#C8FF00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Local Search?</span>
                </h2>
                <p style={{ color: 'var(--t3)', fontSize: '1.0625rem', lineHeight: 1.65, marginBottom: 36, maxWidth: '50ch', marginInline: 'auto' }}>
                  Join the businesses already using eighty5.OS to dominate local Google Maps, show up in AI search, and grow without adding headcount.
                </p>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' as const }}>
                  <motion.a href="#/audit" onClick={e => { e.preventDefault(); navigate('#/audit'); }} className="btn btn-primary" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} style={{ fontSize: '1rem', padding: '14px 32px' }}>
                    Start Your Free Audit →
                  </motion.a>
                  <motion.a href="#/pricing" onClick={e => { e.preventDefault(); navigate('#/pricing'); }} className="btn btn-ghost" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} style={{ fontSize: '1rem', padding: '14px 28px' }}>
                    View Pricing
                  </motion.a>
                </div>
                <p style={{ marginTop: 20, fontSize: '0.8125rem', color: 'var(--t4)' }}>No long-term contracts · Cancel anytime · Setup in days</p>
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
    <p style={{ padding: '0 22px 20px', fontSize: '0.9rem', color: 'var(--td2)', lineHeight: 1.65 }}>{answer}</p>
  </motion.div>
);
