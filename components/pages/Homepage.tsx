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

/* ── Modern SVG icons ── */
const IconSearch = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
);
const IconZap = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>
);
const IconGlobe = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
);
const IconTrending = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
);
const IconArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
);

/* ── DATA ── */

const SERVICES = [
  {
    gap: 'Gap 1 — Visibility',
    gapColor: 'var(--gap2)',
    gapBg: 'var(--gap2-lt)',
    gapBorder: 'var(--gap2-border)',
    iconGradient: 'linear-gradient(135deg, #4F8EF7 0%, #8B5CF6 100%)',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    title: 'Content AI',
    tagline: 'Answer Engine + Generative Engine Optimization',
    body: 'Publishes structured content that gets your business recommended by ChatGPT, Gemini, and Perplexity. Weekly GBP posts, FAQ content, and local authority pages — automated.',
  },
  {
    gap: 'Gap 1 — Visibility',
    gapColor: 'var(--gap2)',
    gapBg: 'var(--gap2-lt)',
    gapBorder: 'var(--gap2-border)',
    iconGradient: 'linear-gradient(135deg, #4F8EF7 0%, #2563EB 100%)',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    title: 'GBP Optimization',
    tagline: 'Google Maps dominance. Map Pack top 3.',
    body: 'Full profile optimization built to dominate local Map Pack results and appear when buyers search your area.',
  },
  {
    gap: 'Gap 2 — Reputation',
    gapColor: 'var(--gap3)',
    gapBg: 'var(--gap3-lt)',
    gapBorder: 'var(--gap3-border)',
    iconGradient: 'linear-gradient(135deg, #8B5CF6 0%, #A855F7 100%)',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
    title: 'Reviews AI',
    tagline: 'Automated generation + instant responses',
    body: 'Requests reviews from every customer automatically. Responds to every review within minutes. Builds the velocity Google rewards.',
  },
  {
    gap: 'Gap 3 — Conversion',
    gapColor: 'var(--gap1)',
    gapBg: 'var(--gap1-lt)',
    gapBorder: 'var(--gap1-border)',
    iconGradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.45 19.45 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
    title: 'Voice AI',
    tagline: 'Never miss a call. Book while you sleep.',
    body: 'Answers every inbound call 24/7. Qualifies the lead, books directly into your calendar. Zero calls to voicemail.',
  },
  {
    gap: 'Gap 3 — Conversion',
    gapColor: 'var(--gap1)',
    gapBg: 'var(--gap1-lt)',
    gapBorder: 'var(--gap1-border)',
    iconGradient: 'linear-gradient(135deg, #10B981 0%, #14B8A6 100%)',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
    title: 'Conversation AI',
    tagline: 'Web leads engaged instantly, 24/7.',
    body: 'Engages website visitors the moment they land, captures leads, books appointments, follows up via SMS and email.',
  },
  {
    gap: 'Gap 3 — Conversion',
    gapColor: 'var(--gap1)',
    gapBg: 'var(--gap1-lt)',
    gapBorder: 'var(--gap1-border)',
    iconGradient: 'linear-gradient(135deg, #10B981 0%, #0EA5E9 100%)',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
    title: 'Workflow AI',
    tagline: 'Automations that run smarter, without you.',
    body: 'Follow-up sequences, re-engagement campaigns, appointment reminders, past client touches. Runs 24/7.',
  },
];

const INDUSTRIES = [
  { label: 'Mortgage', sub: 'Lenders · Loan Officers', route: '#/mortgage',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg> },
  { label: 'Real Estate', sub: 'Agents · Teams · Brokers', route: '#/realestate',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
  { label: 'Home Services', sub: 'HVAC · Plumbing · Roofing', route: '#/homeservices',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg> },
  { label: 'Medical', sub: 'Med Spa · Dental · Chiro', route: '#/medical',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg> },
  { label: 'Legal', sub: 'PI · DUI · Family Law', route: '#/legal',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v18M5.5 8.5l13 7M18.5 8.5l-13 7"/><circle cx="12" cy="3" r="1"/></svg> },
];

const TESTIMONIALS = [
  {
    quote: "Within 30 days I had more Google reviews than I'd collected in the previous two years. Showed up in Map Pack top 3 for the first time ever.",
    author: 'Mike Strand',
    role: 'Owner, Strand HVAC — Portland, OR',
    metric: '#3 → #1',
    metricLabel: 'Map Pack ranking in 60 days',
  },
  {
    quote: "Our Voice AI booked 14 appointments last weekend alone — while we were closed. That's revenue we used to lose to the competition every single week.",
    author: 'Rachel Torres',
    role: 'GM, Prestige Dental — Austin, TX',
    metric: '93%',
    metricLabel: 'of after-hours calls captured',
  },
  {
    quote: "I was invisible on ChatGPT and Gemini. Now when someone asks 'best roofer in Tampa' my company shows up first. That's a game-changer.",
    author: 'David Chen',
    role: 'CEO, Apex Roofing — Tampa, FL',
    metric: '4 of 4',
    metricLabel: 'AI engines now recommend them',
  },
];

const FAQS = [
  { q: 'How quickly can we go live?', a: 'Most businesses are fully deployed in 5–7 business days. Voice AI and review automation can be running within 48 hours.' },
  { q: 'Do we need to change our current systems?', a: 'No. eighty5.OS integrates with your existing CRM, calendar, and phone system. We layer on top — no rip-and-replace.' },
  { q: 'What does "AI search visibility" actually mean?', a: 'When someone asks ChatGPT, Gemini, or Perplexity for a recommendation in your market, does your business appear? Our Content AI ensures it does, with structured data that AI engines can cite and recommend.' },
  { q: 'Is this a long-term contract?', a: 'No. Month-to-month after any initial commitment period. We earn your business every month.' },
  { q: 'What if we already have a receptionist / answering service?', a: 'Voice AI handles overflow and after-hours — it doesn\'t replace your team, it catches what they miss. Most businesses use it as a safety net that pays for itself in recovered leads.' },
  { q: 'How is this different from other AI tools?', a: 'We don\'t sell individual tools. eighty5.OS is a complete system that closes all three revenue gaps — visibility, reputation, and conversion — with everything connected. One dashboard, one team, one system.' },
];

const INDUSTRY_DESCRIPTIONS = [
  'Mortgage leads move fast and don\'t wait for callbacks. We make sure every inquiry is captured, followed up, and closed — while your referral engine runs on autopilot.',
  'Speed wins in real estate. The first agent to respond gets the client. eighty5.OS makes you that agent — automatically, 24/7, even when you\'re showing homes.',
  'Every missed call is a job for your competitor. Voice AI answers 24/7, books appointments, and follows up — so you never lose work to voicemail again.',
  'Patients choose providers based on reviews and search results. eighty5.OS builds your digital reputation and automates appointment intake — filling your schedule on autopilot.',
  'Clients research attorneys extensively before calling. Being first in local search and AI recommendations — combined with instant intake response — is the difference between signing a client and losing them.',
];

const GAP_WORDS = [
  { word: 'Visibility', color: '#4F8EF7', desc: 'Invisible on Google Maps, AI search & local results' },
  { word: 'Reputation', color: '#A78BFA', desc: 'Weak reviews, no responses, low trust signals' },
  { word: 'Conversion', color: '#10B981', desc: 'Missed calls, no booking — leads go to competitors' },
];

/* ── COMPONENT ── */

export const Homepage: React.FC = () => {
  const [activeIndustry, setActiveIndustry] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeGap, setActiveGap] = useState(0);

  // Rotate through gap words
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveGap(prev => (prev + 1) % GAP_WORDS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      {/* ═══════════════════════════════════════════
          01 — HERO (white bg, 2-column — Phase 1 upgrade)
      ═══════════════════════════════════════════ */}
      <section className="hero-pattern" style={{
        background: '#fff',
        paddingTop: 'clamp(100px, 12vw, 140px)',
        paddingBottom: 'clamp(40px, 5vw, 64px)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Animated gradient mesh background */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.25, 0.45, 0.25], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute', top: '-20%', left: '-10%', width: '70%', height: '70%', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(27,79,255,0.12) 0%, rgba(255,255,255,0) 70%)',
              filter: 'blur(60px)',
            }}
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.35, 0.15], rotate: [0, -5, 5, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear', delay: 2 }}
            style={{
              position: 'absolute', bottom: '-10%', right: '-10%', width: '60%', height: '60%', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(139,92,246,0.10) 0%, rgba(255,255,255,0) 70%)',
              filter: 'blur(60px)',
            }}
          />
        </div>

        <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
          <div className="hero-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(24px, 3vw, 48px)',
            alignItems: 'center',
          }}>
            {/* LEFT — Text */}
            <div>
              {/* Stable headline — no inline word swap */}
              <motion.h1
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: 'var(--fd)',
                  fontSize: 'clamp(2.5rem, 3.8vw, 3.6rem)',
                  fontWeight: 900,
                  letterSpacing: '-0.045em',
                  lineHeight: 1.05,
                  color: 'var(--td1)',
                  marginBottom: 24,
                }}
              >
                Close the gaps.<br />
                <span style={{ color: 'var(--blue)' }}>Recover the revenue.</span>
              </motion.h1>

              {/* Gap indicator badges — auto-rotate, also clickable */}
              <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
                {GAP_WORDS.map((g, i) => (
                  <motion.button
                    key={g.word}
                    onClick={() => setActiveGap(i)}
                    animate={{
                      background: activeGap === i ? g.color : 'transparent',
                      color: activeGap === i ? '#fff' : 'var(--td3)',
                      borderColor: activeGap === i ? g.color : 'var(--ls-border)',
                    }}
                    transition={{ duration: 0.25 }}
                    style={{
                      border: '1.5px solid',
                      borderRadius: 6,
                      padding: '4px 12px',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      fontFamily: 'var(--fd)',
                      letterSpacing: '0.07em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      lineHeight: 1.6,
                    }}
                  >
                    Gap {i + 1} — {g.word}
                  </motion.button>
                ))}
              </div>

              {/* Active gap description — fixed-height container, no layout shift */}
              <div style={{ marginBottom: 28, minHeight: 48 }}>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={activeGap}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    style={{
                      fontSize: 'clamp(0.9rem, 1.4vw, 1rem)',
                      color: 'var(--td2)',
                      lineHeight: 1.6,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                    }}
                  >
                    <span style={{
                      width: 10, height: 10, borderRadius: '50%',
                      background: GAP_WORDS[activeGap].color,
                      flexShrink: 0, display: 'inline-block',
                    }} />
                    {GAP_WORDS[activeGap].desc}
                  </motion.p>
                </AnimatePresence>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                style={{
                  fontSize: 'clamp(0.95rem, 1.5vw, 1.0625rem)',
                  color: 'var(--td2)',
                  lineHeight: 1.7,
                  maxWidth: '42ch',
                  marginBottom: 36,
                }}
              >
                Most local businesses bleed revenue at three points. eighty5labs finds every gap and closes it — automatically.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.55 }}
                style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 8 }}
              >
                <motion.a
                  href="#/audit"
                  onClick={e => { e.preventDefault(); navigate('#/audit'); }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn btn-primary"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: '0.9375rem' }}
                >
                  Get Your Free Audit
                  <IconArrowRight />
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
              <p style={{ fontSize: '0.72rem', color: '#94A3B8' }}>Free · No commitment · Yours to keep regardless</p>
            </div>

            {/* RIGHT — Animated Hero */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
              className="hide-mobile"
              style={{ position: 'relative' }}
            >
              <div style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                width: '120%', height: '120%', background: 'rgba(27,79,255,0.05)',
                filter: 'blur(60px)', borderRadius: '50%', zIndex: 0, pointerEvents: 'none',
              }} />
              <HeroAnimation />
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: 4, color: 'var(--td3)' }}
        >
          <span style={{ fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' as const }}>Scroll</span>
          <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
            <div style={{ width: 1, height: 24, background: 'linear-gradient(to bottom, var(--td3), transparent)' }} />
          </motion.div>
        </motion.div>

        <style>{`@keyframes ping{75%,100%{transform:scale(2);opacity:0}}`}</style>
      </section>

      {/* ═══════════════════════════════════════════
          01a — AI ENGINE LOGOS BAR
      ═══════════════════════════════════════════ */}
      <section style={{
        padding: '32px 0',
        background: '#FAFBFE',
        borderTop: '1px solid var(--ls-border)',
        borderBottom: '1px solid var(--ls-border)',
      }}>
        <div className="wrap">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            style={{ textAlign: 'center' }}
          >
            <p style={{
              fontSize: '0.68rem',
              fontWeight: 700,
              letterSpacing: '0.16em',
              textTransform: 'uppercase' as const,
              color: '#94A3B8',
              marginBottom: 20,
            }}>
              Optimizing brands for
            </p>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'clamp(24px, 5vw, 56px)',
              flexWrap: 'wrap',
            }}>
              {/* ChatGPT */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, opacity: 0.55, transition: 'opacity 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '0.55')}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.998 5.998 0 0 0-3.998 2.9 6.042 6.042 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.05 6.05 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.143-.08 4.778-2.758a.776.776 0 0 0 .391-.676v-6.738l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.49zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872v.024zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66v.018zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.676l-.004 6.727zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5-.005-2.999z" fill="#0F172A"/>
                </svg>
                <span style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '0.9375rem', color: '#0F172A' }}>ChatGPT</span>
              </div>
              {/* Google Gemini */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, opacity: 0.55, transition: 'opacity 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '0.55')}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 24C12 18.636 8.364 14 3 12c5.364-2 9-6.636 9-12 0 5.364 3.636 10 9 12-5.364 2-9 6.636-9 12z" fill="url(#gemini-g)"/>
                  <defs><linearGradient id="gemini-g" x1="3" y1="0" x2="21" y2="24"><stop stopColor="#4285F4"/><stop offset="0.5" stopColor="#9B72CB"/><stop offset="1" stopColor="#D96570"/></linearGradient></defs>
                </svg>
                <span style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '0.9375rem', color: '#0F172A' }}>Gemini</span>
              </div>
              {/* Perplexity */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, opacity: 0.55, transition: 'opacity 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '0.55')}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M4 2l8 6 8-6v9l-4 3v8l-4-3-4 3v-8l-4-3V2z" fill="none" stroke="#0F172A" strokeWidth="1.8" strokeLinejoin="round"/>
                  <path d="M12 8v14M4 11h16" stroke="#0F172A" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
                <span style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '0.9375rem', color: '#0F172A' }}>Perplexity</span>
              </div>
              {/* Claude */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, opacity: 0.55, transition: 'opacity 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '0.55')}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M15.788 3.09L12.47 14.67l-1.478-4.66a.6.6 0 0 0-.39-.39L5.92 8.14l11.58-3.33a.3.3 0 0 1 .288.28zM17.042 2.022c-.69-.69-1.81-.32-1.97.65L10.92 18.92a1.2 1.2 0 0 0 .78 1.38l.12.04c.63.18 1.27-.24 1.39-.89l3.83-16.78a.3.3 0 0 0-.01-.24.3.3 0 0 0 .01-.41z" fill="#D97706"/>
                </svg>
                <span style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '0.9375rem', color: '#0F172A' }}>Claude</span>
              </div>
              {/* Grok */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, opacity: 0.55, transition: 'opacity 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '0.55')}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M2.5 6l9.5 12L21.5 6" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="18" cy="4.5" r="2" fill="#0F172A"/>
                </svg>
                <span style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '0.9375rem', color: '#0F172A' }}>Grok</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          01b — STATS BAR (white, border-y)
      ═══════════════════════════════════════════ */}
      <section style={{ padding: '28px 0', background: '#fff', borderTop: '1px solid var(--ls-border)', borderBottom: '1px solid var(--ls-border)', position: 'relative', zIndex: 20 }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, textAlign: 'center' }} className="stats-grid">
            {[
              { value: 64, suffix: '%', label: 'Booking Rate' },
              { value: 24, suffix: '/7', label: 'AI Coverage' },
              { value: 3, suffix: 'x', label: 'Lead Volume' },
              { value: 98, suffix: '%', label: 'Client Retention' },
            ].map((stat, i) => (
              <div key={i} style={{ padding: '4px 8px', borderLeft: i > 0 ? '1px solid var(--ls-border)' : 'none' }}>
                <div style={{ fontFamily: 'var(--fd)', fontWeight: 900, fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: 'var(--td1)', lineHeight: 1.1, marginBottom: 4 }}>
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: 'var(--td3)' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          02 — GAPS + CALCULATOR (dark bg1, 2-column)
      ═══════════════════════════════════════════ */}
      <section className="section-dark-alt">
        <div className="wrap">
          <Reveal>
            <div className="section-label">The Three Gaps</div>
            <h2 className="section-heading">Where Revenue <span className="heading-accent" style={{ color: 'var(--blue3)' }}>Leaks</span></h2>
            <p className="section-sub" style={{ marginBottom: 48 }}>Three specific points where local businesses lose customers every day.</p>
          </Reveal>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(24px, 3vw, 40px)',
            alignItems: 'start',
          }} className="gaps-calc-grid">
            {/* Gap Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                {
                  stripe: '#4F8EF7', tagColor: 'var(--blue3)', tag: 'Gap 01 — Visibility',
                  badge: 'Content AI + GBP', badgeBg: 'rgba(79,142,247,.14)',
                  title: "They Can't Hire You If They Can't Find You",
                  body: "You're invisible on Google Maps, ChatGPT, Gemini, and Perplexity. Your competitors aren't better — they're just more findable.",
                  fix: '→ Content AI + GBP Optimization closes this',
                },
                {
                  stripe: '#A78BFA', tagColor: '#A78BFA', tag: 'Gap 02 — Reputation',
                  badge: 'Reviews AI', badgeBg: 'rgba(167,139,250,.14)',
                  title: 'They Find You and Still Choose Someone Else',
                  body: 'Weak reviews, no responses, slow velocity. The customer checks your rating and clicks a competitor with 4.9 stars.',
                  fix: '→ Reviews AI closes this',
                },
                {
                  stripe: '#10B981', tagColor: '#6EE7B7', tag: 'Gap 03 — Conversion',
                  badge: 'Voice + Convo AI', badgeBg: 'rgba(16,185,129,.14)',
                  title: 'They Chose You. Then You Lost Them.',
                  body: 'The call went to voicemail. The form sat unanswered. The lead moved on. Every miss is cash walking out the door.',
                  fix: '→ Voice AI + Conversation AI closes this',
                },
              ].map((gc, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div style={{
                    background: 'var(--bg2)',
                    border: '1px solid var(--border)',
                    borderRadius: 14,
                    padding: '22px 22px 20px',
                    position: 'relative',
                    overflow: 'hidden',
                  }}>
                    <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: gc.stripe }} />
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                      <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: gc.tagColor }}>{gc.tag}</span>
                      <span style={{ fontSize: '0.62rem', fontWeight: 700, padding: '3px 9px', borderRadius: 999, background: gc.badgeBg, color: gc.tagColor }}>{gc.badge}</span>
                    </div>
                    <h3 style={{ fontFamily: 'var(--fd)', fontWeight: 800, fontSize: '0.9375rem', color: 'var(--t1)', marginBottom: 8, letterSpacing: '-0.015em', lineHeight: 1.3 }}>{gc.title}</h3>
                    <p style={{ fontSize: '0.84rem', color: 'var(--t3)', lineHeight: 1.6, marginBottom: 10 }}>{gc.body}</p>
                    <div style={{ fontSize: '0.78rem', fontWeight: 600, color: gc.tagColor }}>{gc.fix}</div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Revenue Calculator */}
            <Reveal delay={0.15}>
              <RevenueCalculator />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          03 — VOICE AI DEMO (light bg)
      ═══════════════════════════════════════════ */}
      <section className="section-light">
        <div className="wrap">
          <VoiceAIDemo />
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          04 — SERVICES GRID (dark bg)
      ═══════════════════════════════════════════ */}
      <section className="section-dark">
        <div className="wrap">
          <Reveal>
            <div className="section-label">The Platform</div>
            <h2 className="section-heading">The AI OS That Closes <span className="heading-accent" style={{ color: 'var(--blue3)' }}>All Three Gaps.</span></h2>
            <p className="section-sub" style={{ marginBottom: 52 }}>Every component targets one gap. Together they form a complete revenue system.</p>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
            {SERVICES.map((svc, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div className="card" style={{ height: '100%' }}>
                  <div style={{ marginBottom: 14 }}>
                    <span style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: svc.gapColor, background: svc.gapBg, border: `1px solid ${svc.gapBorder}`, padding: '3px 9px', borderRadius: 6 }}>{svc.gap}</span>
                  </div>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: (svc as any).iconGradient || svc.gapBg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 14,
                    boxShadow: `0 4px 12px ${svc.gapColor}22`,
                  }}>
                    {(svc as any).iconGradient ? svc.icon : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={svc.gapColor} strokeWidth="1.8">{svc.icon}</svg>}
                  </div>
                  <h3 style={{ fontFamily: 'var(--fd)', fontWeight: 800, fontSize: '1rem', color: 'var(--t1)', marginBottom: 6, letterSpacing: '-0.02em' }}>{svc.title}</h3>
                  <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: svc.gapColor, marginBottom: 10 }}>{svc.tagline}</p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--t3)', lineHeight: 1.6 }}>{svc.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div style={{ textAlign: 'center', marginTop: 40 }}>
              <a href="#/services" onClick={e => { e.preventDefault(); navigate('#/services'); }} className="btn btn-ghost">See All Six AI Systems →</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          05 — PROCESS (white bg — matches V2)
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
              { num: '01', sub: 'Free AI Visibility Audit', title: 'Audit', body: 'We map your Google Business Profile, Map Pack rank, review velocity, and AI search visibility across ChatGPT, Gemini, and Perplexity.', Icon: IconSearch, gradient: 'linear-gradient(135deg, #4F8EF7 0%, #8B5CF6 100%)' },
              { num: '02', sub: 'Custom eighty5.OS Setup', title: 'Build', body: 'We configure your OS with automated workflows, missed call text-back, review sequences, calendar sync, and a Voice agent that sounds like your brand.', Icon: IconZap, gradient: 'linear-gradient(135deg, #1B4FFF 0%, #4F8EF7 100%)' },
              { num: '03', sub: 'We Manage It. You Do the Work.', title: 'Deploy', body: 'Calls, texts, web chats, social messages — one system, responding in seconds, around the clock.', Icon: IconGlobe, gradient: 'linear-gradient(135deg, #10B981 0%, #14B8A6 100%)' },
              { num: '04', sub: 'Monthly Performance Review', title: 'Optimize', body: 'Monthly Map Pack movement, AI visibility checks, and lead capture performance review. The system gets better every month.', Icon: IconTrending, gradient: 'linear-gradient(135deg, #8B5CF6 0%, #A855F7 100%)' },
            ].map((step, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="card-light" style={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 14, background: step.gradient,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
                    marginBottom: 14, boxShadow: '0 4px 14px rgba(27,79,255,0.15)',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                  }}>
                    <step.Icon />
                  </div>
                  <div style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--blue)', marginBottom: 5 }}>{step.sub}</div>
                  <div style={{ fontFamily: 'var(--fd)', fontWeight: 800, fontSize: '0.9375rem', color: 'var(--td1)', marginBottom: 8, letterSpacing: '-0.015em' }}>{step.num}. {step.title}</div>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--td2)', lineHeight: 1.75 }}>{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          06 — INDUSTRIES (dark — modernized)
      ═══════════════════════════════════════════ */}
      <section className="section-dark-alt">
        <div className="wrap">
          <Reveal>
            <div className="section-label">Built For Your Market</div>
            <h2 className="section-heading">Who Is eighty<span style={{ color: 'var(--blue3)' }}>5</span>labs Built For?</h2>
            <p className="section-sub" style={{ marginBottom: 48 }}>Local businesses that get found on Google — and are tired of losing customers after the click.</p>
          </Reveal>

          {/* Industry tab pills */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
            {INDUSTRIES.map((ind, i) => (
              <motion.button
                key={i}
                onClick={() => setActiveIndustry(i)}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: '10px 18px',
                  borderRadius: 10,
                  fontFamily: 'var(--fd)',
                  border: activeIndustry === i ? '1.5px solid rgba(79,142,247,0.4)' : '1.5px solid rgba(255,255,255,0.08)',
                  background: activeIndustry === i ? 'rgba(79,142,247,0.12)' : 'rgba(255,255,255,0.03)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  transition: 'all 0.2s',
                  color: activeIndustry === i ? '#93C5FD' : 'rgba(255,255,255,0.7)',
                }}
                onMouseEnter={e => { if (activeIndustry !== i) { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; }}}
                onMouseLeave={e => { if (activeIndustry !== i) { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}}
              >
                <span style={{ color: activeIndustry === i ? '#93C5FD' : 'rgba(255,255,255,0.5)', display: 'flex' }}>{ind.icon}</span>
                <span style={{ fontWeight: 700, fontSize: '0.875rem', letterSpacing: '-0.01em' }}>{ind.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Industry detail panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndustry}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25 }}
              style={{
                background: 'linear-gradient(135deg, var(--bg2) 0%, rgba(22,30,46,0.95) 100%)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 16,
                padding: 'clamp(28px, 4vw, 40px)',
                display: 'grid',
                gridTemplateColumns: '1fr 280px',
                gap: 40,
                alignItems: 'start',
              }}
              className="ind-panel-grid"
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: 'rgba(79,142,247,0.12)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#93C5FD',
                  }}>
                    {INDUSTRIES[activeIndustry].icon}
                  </div>
                  <div>
                    <span style={{ fontFamily: 'var(--fd)', fontWeight: 900, fontSize: '1.125rem', color: 'var(--t1)', letterSpacing: '-0.02em' }}>
                      {INDUSTRIES[activeIndustry].label}
                    </span>
                    <span style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>{INDUSTRIES[activeIndustry].sub}</span>
                  </div>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--t2)', lineHeight: 1.75, marginBottom: 24, maxWidth: '52ch' }}>
                  {INDUSTRY_DESCRIPTIONS[activeIndustry]}
                </p>

                {/* Feature checklist */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
                  {[
                    { label: 'AI Search Visibility', color: '#4F8EF7' },
                    { label: 'Google Map Pack Optimization', color: '#4F8EF7' },
                    { label: 'Reviews AI — automated generation + responses', color: '#A78BFA' },
                    { label: 'Voice AI — 24/7 call answering + booking', color: '#10B981' },
                    { label: 'Lead follow-up — instant SMS & email nurture', color: '#10B981' },
                  ].map((feat, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 18, height: 18, borderRadius: 5, background: `${feat.color}1A`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={feat.color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                      </div>
                      <span style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.78)' }}>{feat.label}</span>
                    </div>
                  ))}
                </div>

                <motion.a
                  href={INDUSTRIES[activeIndustry].route}
                  onClick={e => { e.preventDefault(); navigate(INDUSTRIES[activeIndustry].route); }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn btn-primary"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
                >
                  See {INDUSTRIES[activeIndustry].label} Playbook <IconArrowRight />
                </motion.a>
              </div>

              {/* Right — quote panel */}
              <div style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 12,
                padding: '20px',
              }}>
                <div style={{ fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.45)', marginBottom: 12 }}>
                  Industry Insight
                </div>
                <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.75, fontStyle: 'italic' }}>
                  {[
                    '"The lender who responds first wins the deal. In mortgage, speed isn\'t a luxury — it\'s the entire game."',
                    '"68% of home buyers work with the first agent who responds. Second place gets nothing."',
                    '"HVAC companies miss 30-60% of inbound calls during peak season. Every missed call is a job for your competitor."',
                    '"AI-integrated med spas achieve a 64% online booking rate versus 25% industry average."',
                    '"Clients research attorneys extensively before calling. Being first in local search + instant intake = signed retainer."',
                  ][activeIndustry]}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          07 — TESTIMONIALS (white bg — matches V2)
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
                  <div style={{ fontFamily: 'var(--fd)', fontWeight: 900, fontSize: '1.75rem', color: 'var(--blue)', letterSpacing: '-0.04em', marginBottom: 4 }}>{t.metric}</div>
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
          08 — FAQ (white bg)
      ═══════════════════════════════════════════ */}
      <section className="section-white">
        <div className="wrap" style={{ maxWidth: 760 }}>
          <Reveal>
            <div className="section-label">FAQ</div>
            <h2 className="section-heading" style={{ color: 'var(--td1)', marginBottom: 44 }}>Questions? We've Got Answers.</h2>
          </Reveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {FAQS.map((faq, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div style={{
                  background: '#fff', border: '1.5px solid var(--ls-border)', borderRadius: 'var(--rd)', overflow: 'hidden',
                  transition: 'border-color 0.2s', borderColor: openFaq === i ? 'var(--blue-border)' : 'var(--ls-border)',
                }}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{
                      width: '100%', padding: '18px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--td1)',
                      fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '0.9375rem', textAlign: 'left', gap: 16,
                    }}
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
          09 — FINAL CTA (dark bg)
      ═══════════════════════════════════════════ */}
      <section className="section-dark" style={{ textAlign: 'center' }}>
        <div className="wrap">
          <Reveal>
            <div style={{
              background: 'linear-gradient(135deg, var(--bg2) 0%, var(--bg1) 100%)',
              border: '1.5px solid var(--blue-border)', borderRadius: 'var(--rdxl)',
              padding: 'clamp(48px, 6vw, 80px) clamp(28px, 5vw, 80px)', position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(27,79,255,0.18) 0%, transparent 70%)', pointerEvents: 'none' }}/>
              <div style={{ position: 'relative' }}>
                <div className="section-label" style={{ justifyContent: 'center' }}>Get Started Free</div>
                <h2 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(1.9rem, 3.2vw, 2.7rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.07, color: 'var(--t1)', marginBottom: 20, maxWidth: '18ch', marginInline: 'auto' }}>
                  Ready to Dominate <span className="heading-accent" style={{ color: 'var(--blue3)' }}>Local Search?</span>
                </h2>
                <p style={{ color: 'var(--t3)', fontSize: '1.0625rem', lineHeight: 1.65, marginBottom: 36, maxWidth: '50ch', marginInline: 'auto' }}>
                  Join the businesses already using eighty5.OS to dominate local Google Maps, show up in AI search, and grow without adding headcount.
                </p>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
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
