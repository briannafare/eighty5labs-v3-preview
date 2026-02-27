import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Reveal, Stagger } from '../ui/Reveal';
import { navigate } from '../../router';
import { VoiceAIDemo } from '../VoiceAIDemo';
import { DashboardMockup } from '../DashboardMockup';
import { RevenueCalculator } from '../RevenueCalculator';

/* ── DATA ── */

const SERVICES = [
  {
    gap: 'Gap 1 — Visibility',
    gapColor: 'var(--gap2)',
    gapBg: 'var(--gap2-lt)',
    gapBorder: 'var(--gap2-border)',
    icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>,
    title: 'Content AI',
    tagline: 'Answer Engine + Generative Engine Optimization',
    body: 'Publishes structured content that gets your business recommended by ChatGPT, Gemini, and Perplexity. Weekly GBP posts, FAQ content, and local authority pages — automated.',
  },
  {
    gap: 'Gap 1 — Visibility',
    gapColor: 'var(--gap2)',
    gapBg: 'var(--gap2-lt)',
    gapBorder: 'var(--gap2-border)',
    icon: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></>,
    title: 'GBP Optimization',
    tagline: 'Google Maps dominance. Map Pack top 3.',
    body: 'Full profile optimization built to dominate local Map Pack results and appear when buyers search your area.',
  },
  {
    gap: 'Gap 2 — Reputation',
    gapColor: 'var(--gap3)',
    gapBg: 'var(--gap3-lt)',
    gapBorder: 'var(--gap3-border)',
    icon: <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>,
    title: 'Reviews AI',
    tagline: 'Automated generation + instant responses',
    body: 'Requests reviews from every customer automatically. Responds to every review within minutes. Builds the velocity Google rewards.',
  },
  {
    gap: 'Gap 3 — Conversion',
    gapColor: 'var(--gap1)',
    gapBg: 'var(--gap1-lt)',
    gapBorder: 'var(--gap1-border)',
    icon: <><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.45 19.45 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></>,
    title: 'Voice AI',
    tagline: 'Never miss a call. Book while you sleep.',
    body: 'Answers every inbound call 24/7. Qualifies the lead, books directly into your calendar. Zero calls to voicemail.',
  },
  {
    gap: 'Gap 3 — Conversion',
    gapColor: 'var(--gap1)',
    gapBg: 'var(--gap1-lt)',
    gapBorder: 'var(--gap1-border)',
    icon: <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>,
    title: 'Conversation AI',
    tagline: 'Web leads engaged instantly, 24/7.',
    body: 'Engages website visitors the moment they land, captures leads, books appointments, follows up via SMS and email.',
  },
  {
    gap: 'Gap 3 — Conversion',
    gapColor: 'var(--gap1)',
    gapBg: 'var(--gap1-lt)',
    gapBorder: 'var(--gap1-border)',
    icon: <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>,
    title: 'Workflow AI',
    tagline: 'Automations that run smarter, without you.',
    body: 'Follow-up sequences, re-engagement campaigns, appointment reminders, past client touches. Runs 24/7.',
  },
];

const INDUSTRIES = [
  { label: 'Mortgage', route: '#/mortgage', icon: '🏦' },
  { label: 'Real Estate', route: '#/realestate', icon: '🏠' },
  { label: 'Home Services', route: '#/homeservices', icon: '🔧' },
  { label: 'Medical', route: '#/medical', icon: '⚕️' },
  { label: 'Legal', route: '#/legal', icon: '⚖️' },
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

const GAP_ROWS = [
  { color: '#4F8EF7', num: 'Gap 1', label: 'Invisible on Google Maps, ChatGPT, Gemini & Perplexity' },
  { color: '#A78BFA', num: 'Gap 2', label: 'Weak reviews, no responses, low velocity' },
  { color: '#10B981', num: 'Gap 3', label: 'Missed calls, no booking tool — leads go to competitors' },
];

/* ── COMPONENT ── */

export const Homepage: React.FC = () => {
  const [activeIndustry, setActiveIndustry] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div>
      {/* ═══════════════════════════════════════════
          01 — HERO (white bg, 2-column — matches V2)
      ═══════════════════════════════════════════ */}
      <section style={{
        background: '#fff',
        paddingTop: 'calc(var(--nav-h) + clamp(48px, 6vw, 80px))',
        paddingBottom: 'clamp(60px, 8vw, 100px)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div className="wrap">
          <div className="hero-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(32px, 4vw, 64px)',
            alignItems: 'center',
          }}>
            {/* LEFT — Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
            >
              {/* Chip badge */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: '#F0F4FF',
                border: '1px solid #DDE5F2',
                borderRadius: 999,
                padding: '5px 14px 5px 5px',
                marginBottom: 24,
              }}>
                <span style={{
                  background: 'var(--blue)',
                  color: '#fff',
                  fontSize: '0.625rem',
                  fontWeight: 800,
                  padding: '3px 9px',
                  borderRadius: 999,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}>New</span>
                <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--td2)' }}>
                  Now visible in ChatGPT, Gemini &amp; Perplexity
                </span>
              </div>

              <h1 style={{
                fontFamily: 'var(--fd)',
                fontSize: 'clamp(2.25rem, 4.5vw, 3.75rem)',
                fontWeight: 900,
                letterSpacing: '-0.04em',
                lineHeight: 1.05,
                color: 'var(--td1)',
                marginBottom: 20,
              }}>
                Get Found in AI.<br />
                Rank Higher in Maps.<br />
                <span style={{ color: 'var(--blue)' }}>Stop Missing Calls.</span>
              </h1>

              <p style={{
                fontSize: 'clamp(0.95rem, 1.6vw, 1.125rem)',
                color: 'var(--td2)',
                lineHeight: 1.65,
                maxWidth: '46ch',
                marginBottom: 28,
              }}>
                Most local businesses are bleeding revenue at three specific points. eighty5labs finds every gap and closes it — automatically.
              </p>

              {/* Gap rows */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 28 }}>
                {GAP_ROWS.map((gap, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: '8px 14px',
                      background: '#F7F9FF',
                      border: '1px solid #EEF2FB',
                      borderRadius: 8,
                    }}
                  >
                    <div style={{ width: 4, height: 28, borderRadius: 2, background: gap.color, flexShrink: 0 }} />
                    <span style={{ fontFamily: 'var(--fd)', fontWeight: 800, fontSize: '0.78rem', color: 'var(--td1)', whiteSpace: 'nowrap' }}>{gap.num}</span>
                    <span style={{ fontSize: '0.82rem', color: 'var(--td2)', flex: 1 }}>{gap.label}</span>
                    <span style={{
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      color: gap.color,
                      background: `${gap.color}14`,
                      padding: '3px 9px',
                      borderRadius: 999,
                      whiteSpace: 'nowrap',
                    }}>We fix this</span>
                  </motion.div>
                ))}
              </div>

              {/* CTAs */}
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 14 }}>
                <motion.a
                  href="#/audit"
                  onClick={e => { e.preventDefault(); navigate('#/audit'); }}
                  className="btn btn-primary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ fontSize: '0.95rem', padding: '13px 26px' }}
                >
                  Get Your Free Audit
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </motion.a>
                <motion.a
                  href="#/services"
                  onClick={e => { e.preventDefault(); navigate('#/services'); }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '13px 22px',
                    borderRadius: 10,
                    border: '1.5px solid var(--ls-border)',
                    background: 'transparent',
                    color: 'var(--td1)',
                    fontFamily: 'var(--fd)',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    transition: 'border-color 0.15s',
                  }}
                >
                  See How It Works
                </motion.a>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--td3)' }}>Free · No commitment · Yours to keep regardless</p>
            </motion.div>

            {/* RIGHT — Dashboard Mockup */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.25, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
              className="hide-mobile"
              style={{ position: 'relative', minHeight: 520 }}
            >
              <DashboardMockup />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          02 — GAPS + CALCULATOR (dark bg, 2-column)
      ═══════════════════════════════════════════ */}
      <section className="section-dark">
        <div className="wrap">
          <Reveal>
            <div className="section-label">The Three Gaps</div>
            <h2 className="section-heading">Where Revenue Leaks — <span style={{ color: 'rgba(255,255,255,0.80)' }}>And How We Close It</span></h2>
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
                    <h3 style={{ fontFamily: 'var(--fd)', fontWeight: 800, fontSize: '1.05rem', color: 'var(--t1)', marginBottom: 8, letterSpacing: '-0.015em' }}>{gc.title}</h3>
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
            <h2 className="section-heading">The AI OS That Closes <span style={{ color: 'var(--blue3)' }}>All Three Gaps.</span></h2>
            <p className="section-sub" style={{ marginBottom: 52 }}>Every component targets one gap. Together they form a complete revenue system.</p>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
            {SERVICES.map((svc, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div className="card" style={{ height: '100%' }}>
                  <div style={{ marginBottom: 14 }}>
                    <span style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: svc.gapColor, background: svc.gapBg, border: `1px solid ${svc.gapBorder}`, padding: '3px 9px', borderRadius: 6 }}>{svc.gap}</span>
                  </div>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: svc.gapBg, color: svc.gapColor, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">{svc.icon}</svg>
                  </div>
                  <h3 style={{ fontFamily: 'var(--fd)', fontWeight: 800, fontSize: '1.125rem', color: 'var(--t1)', marginBottom: 6 }}>{svc.title}</h3>
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
          05 — PROCESS (light bg — matches V2)
      ═══════════════════════════════════════════ */}
      <section className="section-light">
        <div className="wrap">
          <Reveal>
            <div className="section-label">How It Works</div>
            <h2 className="section-heading" style={{ color: 'var(--td1)' }}>From Audit to Autopilot</h2>
            <p className="section-sub" style={{ marginBottom: 52, color: 'var(--td2)' }}>Four steps. No tech headaches. Running on autopilot in days.</p>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
            {[
              { num: '01', sub: 'Free AI Visibility Audit', title: 'Audit', body: 'We map your Google Business Profile, Map Pack rank, review velocity, and AI search visibility across ChatGPT, Gemini, and Perplexity.' },
              { num: '02', sub: 'Custom eighty5.OS Setup', title: 'Build', body: 'We configure your OS with automated workflows, missed call text-back, review sequences, calendar sync, and a Voice agent that sounds like your brand.' },
              { num: '03', sub: 'We Manage It. You Do the Work.', title: 'Deploy', body: 'Calls, texts, web chats, social messages — one system, responding in seconds, around the clock.' },
              { num: '04', sub: 'Monthly Performance Review', title: 'Optimize', body: 'Monthly Map Pack movement, AI visibility checks, and lead capture performance review. The system gets better every month.' },
            ].map((step, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="card-light" style={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ fontFamily: 'var(--fd)', fontWeight: 900, fontSize: '2.4rem', color: 'var(--ls-border)', letterSpacing: '-0.05em', lineHeight: 1, marginBottom: 8 }}>{step.num}</div>
                  <div style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--blue)', marginBottom: 5 }}>{step.sub}</div>
                  <div style={{ fontFamily: 'var(--fd)', fontWeight: 800, fontSize: '1.0625rem', color: 'var(--td1)', marginBottom: 8 }}>{step.title}</div>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--td2)', lineHeight: 1.75 }}>{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          06 — INDUSTRIES (dark bg)
      ═══════════════════════════════════════════ */}
      <section className="section-dark">
        <div className="wrap">
          <Reveal>
            <div className="section-label">Industries</div>
            <h2 className="section-heading">Who Is eighty<span style={{ color: 'var(--blue3)' }}>5</span>labs Built For?</h2>
            <p className="section-sub" style={{ marginBottom: 48 }}>Every industry has a different lead problem. We've built the right solution for each.</p>
          </Reveal>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 32 }}>
            {INDUSTRIES.map((ind, i) => (
              <motion.button
                key={i}
                onClick={() => setActiveIndustry(i)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  padding: '10px 20px', borderRadius: 'var(--rd)', fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '0.875rem',
                  border: activeIndustry === i ? '1.5px solid var(--blue-border)' : '1.5px solid var(--border)',
                  background: activeIndustry === i ? 'var(--blue-lt)' : 'var(--bg2)',
                  color: activeIndustry === i ? 'var(--blue3)' : 'var(--t2)',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.18s',
                }}
              >
                <span>{ind.icon}</span>{ind.label}
              </motion.button>
            ))}
          </div>
          <motion.div
            key={activeIndustry}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              background: 'var(--bg2)', border: '1.5px solid var(--border)', borderRadius: 'var(--rdxl)',
              padding: 'clamp(28px, 4vw, 48px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap',
            }}
          >
            <div style={{ maxWidth: '56ch' }}>
              <h3 style={{ fontFamily: 'var(--fd)', fontWeight: 900, fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: 'var(--t1)', marginBottom: 16, letterSpacing: '-0.03em' }}>
                {INDUSTRIES[activeIndustry].icon} {INDUSTRIES[activeIndustry].label}
              </h3>
              <p style={{ color: 'var(--t3)', lineHeight: 1.7, marginBottom: 28 }}>{INDUSTRY_DESCRIPTIONS[activeIndustry]}</p>
              <a href={INDUSTRIES[activeIndustry].route} onClick={e => { e.preventDefault(); navigate(INDUSTRIES[activeIndustry].route); }} className="btn btn-primary">
                See {INDUSTRIES[activeIndustry].label} Playbook →
              </a>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 200 }}>
              {[['AI Search Visibility','var(--gap2)'],['Map Pack Optimization','var(--gap2)'],['Reviews Automation','var(--gap3)'],['Voice AI','var(--gap1)'],['Lead Follow-Up','var(--gap1)']].map(([label, color], i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: color, flexShrink: 0 }}/>
                  <span style={{ fontSize: '0.875rem', color: 'var(--t3)' }}>{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          07 — TESTIMONIALS (light bg — matches V2)
      ═══════════════════════════════════════════ */}
      <section className="section-light">
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
                  <div style={{ fontFamily: 'var(--fd)', fontWeight: 900, fontSize: '2rem', color: 'var(--blue)', letterSpacing: '-0.04em', marginBottom: 4 }}>{t.metric}</div>
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
                <h2 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 900, letterSpacing: '-0.04em', color: 'var(--t1)', marginBottom: 20, maxWidth: '18ch', marginInline: 'auto' }}>
                  Ready to Dominate Local Search?
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
