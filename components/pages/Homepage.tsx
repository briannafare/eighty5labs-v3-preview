import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Reveal, Stagger } from '../ui/Reveal';
import { navigate } from '../../router';

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
    quote: "We went from 23% call answer rate to 100%. The ROI was obvious in week one.",
    author: "Jason M.",
    role: "HVAC Owner, Phoenix AZ",
    metric: "+77%",
    metricLabel: "Call answer rate",
  },
  {
    quote: "ChatGPT started recommending my law firm within 6 weeks. I didn't believe it until the calls started.",
    author: "Rachel T.",
    role: "Family Law Attorney, Austin TX",
    metric: "6 weeks",
    metricLabel: "To AI search visibility",
  },
  {
    quote: "My Google Map Pack ranking went from page 3 to top 3 in 45 days. The review system is unreal.",
    author: "Marcus B.",
    role: "Med Spa Owner, Miami FL",
    metric: "Top 3",
    metricLabel: "Map Pack in 45 days",
  },
];

const FAQS = [
  { q: 'How long does setup take?', a: 'Most clients are fully live within 5–7 business days. We handle 100% of the technical setup — you just answer a quick onboarding questionnaire.' },
  { q: 'Do I need to change my existing software?', a: "No. eighty5.OS integrates with your existing CRM, calendar, and phone system. We're built to layer on top of what's already working." },
  { q: 'What makes this different from a marketing agency?', a: 'Agencies charge for activities. We charge for outcomes. Our system runs 24/7 and you can see exactly what it does in your dashboard — no mystery, no reports that don\'t connect to revenue.' },
  { q: 'Is there a contract?', a: 'No long-term contracts. Monthly billing, cancel anytime. We keep clients because results keep them — not paperwork.' },
  { q: 'What industries do you work with?', a: 'We specialize in local service businesses: HVAC, plumbing, electrical, medical/wellness, legal, mortgage, and real estate. Vertical-specific playbooks for each.' },
];

export const Homepage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeIndustry, setActiveIndustry] = useState(0);

  return (
    <div style={{ paddingTop: 'var(--nav-h)' }}>

      {/* ─── HERO ─── */}
      <section style={{
        minHeight: '92vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingBlock: 'clamp(80px, 10vw, 140px)',
      }}>
        {/* Ambient glow */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 60% 50% at 50% -10%, rgba(27,79,255,0.22) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}/>

        {/* Rotating arc */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            width: '900px',
            height: '900px',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -60%)',
            borderRadius: '50%',
            background: 'conic-gradient(from 0deg, transparent 0deg, rgba(27,79,255,0.12) 60deg, rgba(79,142,247,0.08) 120deg, transparent 180deg)',
            pointerEvents: 'none',
            filter: 'blur(2px)',
          }}
        />

        <div className="wrap" style={{ position: 'relative', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 14px',
              background: 'var(--blue-lt)',
              border: '1px solid var(--blue-border)',
              borderRadius: 999,
              fontSize: '0.75rem',
              fontWeight: 700,
              color: 'var(--blue3)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: 28,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--blue3)', display: 'inline-block' }}/>
              AI Operating System for Local Business
            </div>

            <h1 style={{
              fontFamily: 'var(--fd)',
              fontSize: 'clamp(2.75rem, 6vw, 5rem)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              lineHeight: 1.02,
              marginBottom: 24,
              color: 'var(--t1)',
            }}>
              Get Found in AI.<br/>
              Rank Higher in Maps.<br/>
              <span style={{ color: 'var(--blue3)' }}>Stop Missing Calls.</span>
            </h1>

            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: 'var(--t3)',
              lineHeight: 1.65,
              maxWidth: '52ch',
              margin: '0 auto 40px',
            }}>
              Most local businesses are bleeding revenue at three specific points. eighty5labs finds every gap and closes it — automatically.
            </p>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 64 }}>
              <motion.a
                href="#/audit"
                onClick={e => { e.preventDefault(); navigate('#/audit'); }}
                className="btn btn-primary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ fontSize: '1rem', padding: '14px 28px' }}
              >
                Get Your Free Revenue Audit
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </motion.a>
              <motion.a
                href="#/services"
                onClick={e => { e.preventDefault(); navigate('#/services'); }}
                className="btn btn-ghost"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ fontSize: '1rem', padding: '14px 28px' }}
              >
                See How It Works
              </motion.a>
            </div>

            {/* Stats bar */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              style={{
                display: 'inline-grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 0,
                background: 'var(--bg1)',
                border: '1.5px solid var(--border)',
                borderRadius: 'var(--rdl)',
                overflow: 'hidden',
                maxWidth: 620,
                width: '100%',
              }}
            >
              {[
                { v: '24/7', l: 'Coverage' },
                { v: '$126K', l: 'Avg annual missed calls' },
                { v: '64%', l: 'Booking rate w/ AI' },
                { v: '5–7d', l: 'Time to live' },
              ].map((s, i) => (
                <div key={i} style={{
                  padding: 'clamp(14px,2vw,22px) 12px',
                  borderRight: i < 3 ? '1px solid var(--border)' : 'none',
                  textAlign: 'center',
                }}>
                  <div style={{ fontFamily: 'var(--fd)', fontWeight: 900, fontSize: 'clamp(1.1rem,2.5vw,1.5rem)', color: 'var(--t1)', letterSpacing: '-0.03em' }}>{s.v}</div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--t4)', marginTop: 4, lineHeight: 1.3 }}>{s.l}</div>
                </div>
              ))}
            </motion.div>

            <div style={{ marginTop: 20, fontSize: '0.8125rem', color: 'var(--t4)' }}>
              Free · No commitment · Yours to keep regardless
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── REVENUE GAPS ─── */}
      <section className="section" style={{ background: 'var(--bg1)' }}>
        <div className="wrap">
          <Reveal>
            <div className="section-label">The Problem</div>
            <h2 className="section-heading">Where Revenue Leaks — <span style={{ color: 'var(--t3)' }}>And How We Close It</span></h2>
            <p className="section-sub" style={{ marginBottom: 56 }}>Three specific points where local businesses lose customers every day.</p>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {[
              {
                num: '01',
                color: 'var(--gap2)',
                bg: 'var(--gap2-lt)',
                border: 'var(--gap2-border)',
                label: 'Gap 1 — Visibility',
                title: 'They Can\'t Find You',
                body: 'AI search engines are writing recommendations without you. ChatGPT, Gemini, and Perplexity are pulling from structured data your competitors are building. Google Maps rankings determine who gets called. If you\'re not in the top 3, you don\'t exist.',
                stat: '78%',
                statLabel: 'of AI recommendations go to the same 3–4 businesses per market',
              },
              {
                num: '02',
                color: 'var(--gap3)',
                bg: 'var(--gap3-lt)',
                border: 'var(--gap3-border)',
                label: 'Gap 2 — Reputation',
                title: 'They Don\'t Trust You Enough',
                body: 'A prospect finds you. Then they check your reviews. 14 reviews from two years ago doesn\'t close the deal. Your competitor with 94 fresh 4.9-star reviews does. Review velocity determines Map Pack ranking. Static review counts determine close rate.',
                stat: '93%',
                statLabel: 'of buyers read reviews before calling a local service business',
              },
              {
                num: '03',
                color: 'var(--gap1)',
                bg: 'var(--gap1-lt)',
                border: 'var(--gap1-border)',
                label: 'Gap 3 — Conversion',
                title: 'They Call — You Miss It',
                body: 'After 5pm, your call goes to voicemail. The next business on Google Maps answered. That lead is gone. Most local businesses lose 30–60% of their calls this way — and nobody ever counts what was lost because nobody knows the calls happened.',
                stat: '$126K',
                statLabel: 'average annual revenue lost to missed calls and slow follow-up',
              },
            ].map((gap, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="card" style={{ border: `1.5px solid ${gap.border}`, height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                    <span style={{
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: gap.color,
                      background: gap.bg,
                      border: `1px solid ${gap.border}`,
                      padding: '4px 10px',
                      borderRadius: 6,
                    }}>{gap.label}</span>
                    <span style={{ fontFamily: 'var(--fd)', fontWeight: 900, fontSize: '2rem', color: gap.border, letterSpacing: '-0.04em' }}>{gap.num}</span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--fd)', fontSize: '1.375rem', fontWeight: 800, color: 'var(--t1)', marginBottom: 12, letterSpacing: '-0.02em' }}>{gap.title}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--t3)', lineHeight: 1.65, marginBottom: 24 }}>{gap.body}</p>
                  <div style={{ paddingTop: 20, borderTop: '1px solid var(--border)' }}>
                    <div style={{ fontFamily: 'var(--fd)', fontWeight: 900, fontSize: '1.75rem', color: gap.color, letterSpacing: '-0.03em' }}>{gap.stat}</div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--t4)', marginTop: 4 }}>{gap.statLabel}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VOICE AI DEMO / CHLOE ─── */}
      <section className="section">
        <div className="wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px,1fr))', gap: 60, alignItems: 'center' }}>
          <Reveal>
            <div className="section-label">Voice AI</div>
            <h2 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 900, letterSpacing: '-0.04em', marginBottom: 20, lineHeight: 1.05 }}>
              Meet Chloe.<br/><span style={{ color: 'var(--t3)' }}>Your 24/7 AI Receptionist.</span>
            </h2>
            <p style={{ color: 'var(--t3)', lineHeight: 1.7, marginBottom: 32 }}>
              She answers every call, qualifies every lead, and books appointments around the clock. While you're on a job, sleeping, or on vacation — she's working.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { icon: '📞', text: 'Answer the call — within 2 rings, every time' },
                { icon: '🎯', text: 'Qualify the lead — needs, urgency, location' },
                { icon: '📅', text: 'Book the appointment — direct to your calendar' },
                { icon: '✉️', text: 'Send confirmation + update your CRM' },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}
                >
                  <span style={{ fontSize: '1.125rem' }}>{step.icon}</span>
                  <span style={{ fontSize: '0.9375rem', color: 'var(--t2)', lineHeight: 1.5 }}>{step.text}</span>
                </motion.div>
              ))}
            </div>
          </Reveal>

          {/* Phone UI mock */}
          <Reveal delay={0.2}>
            <div style={{ position: 'relative', maxWidth: 340, margin: '0 auto' }}>
              <div style={{
                background: 'var(--bg2)',
                border: '1.5px solid var(--border)',
                borderRadius: 24,
                overflow: 'hidden',
                boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
              }}>
                {/* Call header */}
                <div style={{
                  background: 'var(--bg1)',
                  padding: '20px 24px 18px',
                  borderBottom: '1px solid var(--border)',
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--t4)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Incoming Call</div>
                  <div style={{ fontFamily: 'var(--fd)', fontWeight: 800, fontSize: '1.125rem', color: 'var(--t1)' }}>Customer — (555) 429-0011</div>
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ fontSize: '0.8125rem', color: 'var(--gap1)', marginTop: 6 }}
                  >
                    ● Chloe answering…
                  </motion.div>
                </div>

                {/* Chat bubbles */}
                <div style={{ padding: '20px 18px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    { from: 'ai', text: "Hi, thank you for calling! I'm Chloe. How can I help you today?" },
                    { from: 'user', text: "My AC went out — it's 94 degrees and I have two kids here." },
                    { from: 'ai', text: "Oh no, let's get someone out there ASAP. I have an opening at 3pm today — does that work?" },
                    { from: 'user', text: "Yes! Perfect." },
                    { from: 'ai', text: "Booked! You'll get a confirmation text now and a call 30 min before arrival." },
                  ].map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 6 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15, duration: 0.35 }}
                      style={{
                        alignSelf: msg.from === 'ai' ? 'flex-start' : 'flex-end',
                        maxWidth: '82%',
                        background: msg.from === 'ai' ? 'var(--bg3)' : 'var(--blue)',
                        padding: '10px 14px',
                        borderRadius: msg.from === 'ai' ? '4px 14px 14px 14px' : '14px 4px 14px 14px',
                        fontSize: '0.8125rem',
                        color: 'var(--t1)',
                        lineHeight: 1.5,
                      }}
                    >
                      {msg.text}
                    </motion.div>
                  ))}
                </div>

                {/* Booked confirmation */}
                <div style={{
                  margin: '0 18px 18px',
                  background: 'var(--gap1-lt)',
                  border: '1px solid var(--gap1-border)',
                  borderRadius: 10,
                  padding: '12px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gap1)" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <div>
                    <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--gap1)' }}>Appointment Booked</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--t3)' }}>Today 3:00 PM · CRM Updated</div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── SERVICES GRID ─── */}
      <section className="section" style={{ background: 'var(--bg1)' }}>
        <div className="wrap">
          <Reveal>
            <div className="section-label">The Platform</div>
            <h2 className="section-heading">The AI OS That Closes <span style={{ color: 'var(--blue3)' }}>All Three Gaps.</span></h2>
            <p className="section-sub" style={{ marginBottom: 52 }}>Every component targets one gap. Together they form a complete revenue system.</p>
          </Reveal>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 16,
          }}>
            {SERVICES.map((svc, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div className="card" style={{ height: '100%' }}>
                  <div style={{ marginBottom: 14 }}>
                    <span style={{
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: svc.gapColor,
                      background: svc.gapBg,
                      border: `1px solid ${svc.gapBorder}`,
                      padding: '3px 9px',
                      borderRadius: 6,
                    }}>{svc.gap}</span>
                  </div>
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: svc.gapBg,
                    color: svc.gapColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 14,
                  }}>
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
              <a
                href="#/services"
                onClick={e => { e.preventDefault(); navigate('#/services'); }}
                className="btn btn-ghost"
              >
                See All Six AI Systems →
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── INDUSTRIES ─── */}
      <section className="section">
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
                  padding: '10px 20px',
                  borderRadius: 'var(--rd)',
                  fontFamily: 'var(--fd)',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  border: activeIndustry === i ? '1.5px solid var(--blue-border)' : '1.5px solid var(--border)',
                  background: activeIndustry === i ? 'var(--blue-lt)' : 'var(--surface)',
                  color: activeIndustry === i ? 'var(--blue3)' : 'var(--t3)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  transition: 'all 0.18s',
                }}
              >
                <span>{ind.icon}</span>
                {ind.label}
              </motion.button>
            ))}
          </div>

          <motion.div
            key={activeIndustry}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              background: 'var(--bg1)',
              border: '1.5px solid var(--border)',
              borderRadius: 'var(--rdxl)',
              padding: 'clamp(28px, 4vw, 48px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 32,
              flexWrap: 'wrap',
            }}
          >
            <div style={{ maxWidth: '56ch' }}>
              <h3 style={{ fontFamily: 'var(--fd)', fontWeight: 900, fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: 'var(--t1)', marginBottom: 16, letterSpacing: '-0.03em' }}>
                {INDUSTRIES[activeIndustry].icon} {INDUSTRIES[activeIndustry].label}
              </h3>
              <p style={{ color: 'var(--t3)', lineHeight: 1.7, marginBottom: 28 }}>
                {[
                  'Mortgage leads move fast and don\'t wait for callbacks. We make sure every inquiry is captured, followed up, and closed — while your referral engine runs on autopilot.',
                  'Speed wins in real estate. The first agent to respond gets the client. eighty5.OS makes you that agent — automatically, 24/7, even when you\'re showing homes.',
                  'Every missed call is a job for your competitor. Voice AI answers 24/7, books appointments, and follows up — so you never lose work to voicemail again.',
                  'Patients choose providers based on reviews and search results. eighty5.OS builds your digital reputation and automates appointment intake — filling your schedule on autopilot.',
                  'Clients research attorneys extensively before calling. Being first in local search and AI recommendations — combined with instant intake response — is the difference between signing a client and losing them.',
                ][activeIndustry]}
              </p>
              <a
                href={INDUSTRIES[activeIndustry].route}
                onClick={e => { e.preventDefault(); navigate(INDUSTRIES[activeIndustry].route); }}
                className="btn btn-primary"
              >
                See {INDUSTRIES[activeIndustry].label} Playbook →
              </a>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 200 }}>
              {[
                ['AI Search Visibility', 'var(--gap2)'],
                ['Map Pack Optimization', 'var(--gap2)'],
                ['Reviews Automation', 'var(--gap3)'],
                ['Voice AI', 'var(--gap1)'],
                ['Lead Follow-Up', 'var(--gap1)'],
              ].map(([label, color], i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: color, flexShrink: 0 }}/>
                  <span style={{ fontSize: '0.875rem', color: 'var(--t2)' }}>{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── PROCESS ─── */}
      <section className="section" style={{ background: 'var(--bg1)' }}>
        <div className="wrap">
          <Reveal>
            <div className="section-label">How It Works</div>
            <h2 className="section-heading">From Audit to Autopilot</h2>
            <p className="section-sub" style={{ marginBottom: 56 }}>Most clients are fully live in under a week.</p>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
            {[
              { step: '01', title: 'Free Audit', body: 'We analyze your current visibility, reputation, and conversion gaps. You see exactly where you\'re losing money — for free.' },
              { step: '02', title: 'Custom Build', body: 'We configure eighty5.OS for your specific business, industry, and market. No templates. No DIY.' },
              { step: '03', title: 'Go Live', body: 'Your system is deployed and active within 5–7 days. We monitor everything and handle all setup.' },
              { step: '04', title: 'Autopilot', body: 'The OS runs 24/7. Your leads get captured, nurtured, and booked. You focus on delivery and growth.' },
            ].map((step, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div style={{ position: 'relative', paddingTop: 16 }}>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    fontFamily: 'var(--fd)',
                    fontWeight: 900,
                    fontSize: '3.5rem',
                    color: 'rgba(27,79,255,0.08)',
                    letterSpacing: '-0.04em',
                    lineHeight: 1,
                  }}>{step.step}</div>
                  <div style={{ position: 'relative', paddingTop: 40 }}>
                    <h3 style={{ fontFamily: 'var(--fd)', fontWeight: 800, fontSize: '1.125rem', color: 'var(--t1)', marginBottom: 10 }}>{step.title}</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--t3)', lineHeight: 1.65 }}>{step.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <div className="section-label">Results</div>
            <h2 className="section-heading">Don't Take Our Word For It.</h2>
            <p className="section-sub" style={{ marginBottom: 52 }}>Here's what happens when local businesses close all three gaps.</p>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="card" style={{ height: '100%' }}>
                  <div style={{
                    fontFamily: 'var(--fd)',
                    fontWeight: 900,
                    fontSize: '2rem',
                    color: 'var(--blue3)',
                    letterSpacing: '-0.04em',
                    marginBottom: 4,
                  }}>{t.metric}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--t4)', marginBottom: 20 }}>{t.metricLabel}</div>
                  <p style={{ fontSize: '0.9375rem', color: 'var(--t2)', lineHeight: 1.65, marginBottom: 24, fontStyle: 'italic' }}>"{t.quote}"</p>
                  <div style={{ paddingTop: 18, borderTop: '1px solid var(--border)' }}>
                    <div style={{ fontWeight: 600, color: 'var(--t1)', fontSize: '0.875rem' }}>{t.author}</div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--t4)', marginTop: 3 }}>{t.role}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="section" style={{ background: 'var(--bg1)' }}>
        <div className="wrap" style={{ maxWidth: 760 }}>
          <Reveal>
            <div className="section-label">FAQ</div>
            <h2 className="section-heading" style={{ marginBottom: 44 }}>Questions? We've Got Answers.</h2>
          </Reveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {FAQS.map((faq, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div style={{
                  background: 'var(--bg2)',
                  border: '1.5px solid var(--border)',
                  borderRadius: 'var(--rd)',
                  overflow: 'hidden',
                  transition: 'border-color 0.2s',
                  borderColor: openFaq === i ? 'var(--blue-border)' : 'var(--border)',
                }}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{
                      width: '100%',
                      padding: '18px 22px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--t1)',
                      fontFamily: 'var(--fd)',
                      fontWeight: 700,
                      fontSize: '0.9375rem',
                      textAlign: 'left',
                      gap: 16,
                    }}
                  >
                    {faq.q}
                    <motion.div
                      animate={{ rotate: openFaq === i ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ flexShrink: 0 }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--t4)" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    </motion.div>
                  </button>
                  <AnimatedAnswer open={openFaq === i} answer={faq.a} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="section" style={{ textAlign: 'center' }}>
        <div className="wrap">
          <Reveal>
            <div style={{
              background: 'linear-gradient(135deg, var(--bg2) 0%, var(--bg1) 100%)',
              border: '1.5px solid var(--blue-border)',
              borderRadius: 'var(--rdxl)',
              padding: 'clamp(48px, 6vw, 80px) clamp(28px, 5vw, 80px)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(27,79,255,0.18) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}/>
              <div style={{ position: 'relative' }}>
                <div className="section-label" style={{ justifyContent: 'center' }}>Get Started Free</div>
                <h2 style={{
                  fontFamily: 'var(--fd)',
                  fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                  fontWeight: 900,
                  letterSpacing: '-0.04em',
                  color: 'var(--t1)',
                  marginBottom: 20,
                  maxWidth: '18ch',
                  marginInline: 'auto',
                }}>
                  Stop Losing Revenue to Gaps You Can Fix.
                </h2>
                <p style={{ color: 'var(--t3)', fontSize: '1.0625rem', lineHeight: 1.65, marginBottom: 36, maxWidth: '50ch', marginInline: 'auto' }}>
                  Free audit shows you exactly where you're bleeding money. Takes 30 seconds. Results in 48 hours. No consultant will call you.
                </p>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                  <motion.a
                    href="#/audit"
                    onClick={e => { e.preventDefault(); navigate('#/audit'); }}
                    className="btn btn-primary"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    style={{ fontSize: '1rem', padding: '14px 32px' }}
                  >
                    Get Your Free Revenue Audit
                  </motion.a>
                  <motion.a
                    href="#/pricing"
                    onClick={e => { e.preventDefault(); navigate('#/pricing'); }}
                    className="btn btn-ghost"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    style={{ fontSize: '1rem', padding: '14px 28px' }}
                  >
                    View Pricing
                  </motion.a>
                </div>
                <p style={{ marginTop: 20, fontSize: '0.8125rem', color: 'var(--t4)' }}>
                  No contracts · No credit card · Cancel anytime
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

const AnimatedAnswer: React.FC<{ open: boolean; answer: string }> = ({ open, answer }) => {
  return (
    <motion.div
      initial={false}
      animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      style={{ overflow: 'hidden' }}
    >
      <p style={{ padding: '0 22px 20px', fontSize: '0.9rem', color: 'var(--t3)', lineHeight: 1.65 }}>{answer}</p>
    </motion.div>
  );
};
