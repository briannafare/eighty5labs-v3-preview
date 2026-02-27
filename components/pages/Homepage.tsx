import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Reveal, Stagger } from '../ui/Reveal';
import { navigate } from '../../router';
import { VoiceAIDemo } from '../VoiceAIDemo';

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
    author: "[Client Name]",
    role: "HVAC Company · Portland, OR",
    metric: "Top 3",
    metricLabel: "Map Pack in 30 days",
  },
  {
    quote: "We were losing leads every night to voicemail. Voice AI changed that overnight. I wake up to booked appointments instead of missed calls.",
    author: "[Client Name]",
    role: "Personal Injury Attorney · Portland, OR",
    metric: "0",
    metricLabel: "Missed calls since launch",
  },
  {
    quote: "Map Pack went from #7 to #2 in 60 days. We're also showing up when people ask ChatGPT for a dentist in our area. That didn't happen before.",
    author: "[Client Name]",
    role: "Dental Practice · Portland, OR",
    metric: "#2",
    metricLabel: "Map Pack in 60 days",
  },
];

const FAQS = [
  { q: "Why does my competitor show up on Google Maps and I don't?", a: "If your competitor ranks higher in Google Maps, it's usually because their Google Business Profile is more clearly aligned with the search query. Google ranks on relevance, distance, and prominence. Most businesses lose visibility because their primary category is too broad, services aren't clearly listed, or business information is inconsistent online. Google promotes clarity. Generic profiles get buried." },
  { q: 'I have more reviews — why am I still ranked lower?', a: "Having more Google reviews does not automatically improve your ranking. Reviews strengthen prominence, but Google ranks on relevance and category alignment first. If a competitor ranks above you with fewer reviews, their primary category matches the search more precisely. Reviews amplify visibility — they don't create it." },
  { q: 'How do I show up when people ask ChatGPT for businesses in my area?', a: 'Optimize your Google Business Profile, publish educational problem-solving content, maintain consistent business information across all platforms, and earn mentions on trusted local websites. AI systems recommend businesses that appear credible, consistent, and clearly specialized.' },
  { q: 'What kind of content actually makes me show up in AI search?', a: 'AI search platforms favor content that directly answers real customer questions. The best structure: start with the question, provide a direct concise answer, expand with clear steps, and avoid promotional filler. Educational content that solves problems outperforms promotional pages. AI ranks answers, not advertisements.' },
  { q: 'Should I add an AI chatbot or voice agent to my website?', a: "An AI chatbot or voice agent can significantly increase lead capture by improving response time and handling after-hours inquiries. Benefits include 24/7 availability, instant responses, automated appointment booking, and reduced missed calls. AI agents don't replace your team — they prevent the revenue that walks out the door every time a call goes to voicemail." },
  { q: 'Can AI actually help my business get more customers?', a: 'Yes — but only when implemented strategically. AI helps by improving online visibility, automating lead capture, accelerating response time, and personalizing customer interactions. Businesses that combine clear positioning, a strong Google presence, educational content, and automation will consistently outperform competitors relying on outdated SEO tactics.' },
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
      <section className="section-light">
        <div className="wrap">
          <Reveal>
            <div className="section-label">The Problem</div>
            <h2 className="section-heading">Where Revenue Leaks — <span style={{ color: 'var(--td3)' }}>And How We Close It</span></h2>
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
                <div style={{ background: 'var(--ls-card)', border: `1.5px solid ${gap.border}`, borderRadius: 'var(--rdl)', padding: '28px', height: '100%', boxShadow: '0 2px 16px rgba(15,23,42,0.07)', transition: 'box-shadow 0.2s, transform 0.2s' }}>
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
                  <h3 style={{ fontFamily: 'var(--fd)', fontSize: '1.375rem', fontWeight: 800, color: 'var(--td1)', marginBottom: 12, letterSpacing: '-0.02em' }}>{gap.title}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--td2)', lineHeight: 1.65, marginBottom: 24 }}>{gap.body}</p>
                  <div style={{ paddingTop: 20, borderTop: '1px solid var(--ls-border)' }}>
                    <div style={{ fontFamily: 'var(--fd)', fontWeight: 900, fontSize: '1.75rem', color: gap.color, letterSpacing: '-0.03em' }}>{gap.stat}</div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--td3)', marginTop: 4 }}>{gap.statLabel}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VOICE AI DEMO / CHLOE ─── */}
      <section className="section-white">
        <div className="wrap">
          <VoiceAIDemo />
        </div>
      </section>

      {/* ─── SERVICES GRID ─── */}
      <section className="section-dark">
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
      <section className="section-light">
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
                  border: activeIndustry === i ? '1.5px solid var(--blue-border)' : '1.5px solid var(--ls-border)',
                  background: activeIndustry === i ? 'var(--blue-lt)' : 'var(--ls-card)',
                  color: activeIndustry === i ? 'var(--blue3)' : 'var(--td2)',
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
                  <span style={{ fontSize: '0.875rem', color: 'var(--td2)' }}>{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── PROCESS ─── */}
      <section className="section-dark">
        <div className="wrap">
          <Reveal>
            <div className="section-label">How It Works</div>
            <h2 className="section-heading">From Audit to Autopilot</h2>
            <p className="section-sub" style={{ marginBottom: 52 }}>Four steps. No tech headaches. Running on autopilot in days.</p>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14, marginTop: 8 }}>
            {[
              { num: '01', sub: 'Free AI Visibility Audit', title: 'Audit', body: 'We map your Google Business Profile, Map Pack rank, review velocity, and AI search visibility across ChatGPT, Gemini, and Perplexity.' },
              { num: '02', sub: 'Custom eighty5.OS Setup', title: 'Build', body: 'We configure your OS with automated workflows, missed call text-back, review sequences, calendar sync, and a Voice agent that sounds like your brand.' },
              { num: '03', sub: 'We Manage It. You Do the Work.', title: 'Deploy', body: 'Calls, texts, web chats, social messages — one system, responding in seconds, around the clock.' },
              { num: '04', sub: 'Monthly Performance Review', title: 'Optimize', body: 'Monthly Map Pack movement, AI visibility checks, and lead capture performance review. The system gets better every month.' },
            ].map((step, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div style={{
                  background: 'var(--bg2)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--rdl)',
                  padding: '26px 22px',
                  position: 'relative',
                  overflow: 'hidden',
                  height: '100%',
                }}>
                  {/* Large step number — visible muted on dark bg */}
                  <div style={{
                    fontFamily: 'var(--fd)',
                    fontWeight: 900,
                    fontSize: '2.4rem',
                    color: 'rgba(255,255,255,0.1)',
                    letterSpacing: '-0.05em',
                    lineHeight: 1,
                    marginBottom: 8,
                  }}>{step.num}</div>
                  {/* Step sub-label */}
                  <div style={{
                    fontSize: '0.6rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--blue3)',
                    marginBottom: 5,
                  }}>{step.sub}</div>
                  {/* Step title */}
                  <div style={{
                    fontFamily: 'var(--fd)',
                    fontWeight: 800,
                    fontSize: '1.0625rem',
                    color: 'var(--t1)',
                    marginBottom: 8,
                  }}>{step.title}</div>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--t3)', lineHeight: 1.75 }}>{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="section-dark">
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
      <section className="section-light">
        <div className="wrap" style={{ maxWidth: 760 }}>
          <Reveal>
            <div className="section-label">FAQ</div>
            <h2 className="section-heading" style={{ marginBottom: 44 }}>Questions? We've Got Answers.</h2>
          </Reveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {FAQS.map((faq, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div style={{
                  background: 'var(--ls-card)',
                  border: '1.5px solid var(--ls-border)',
                  borderRadius: 'var(--rd)',
                  overflow: 'hidden',
                  transition: 'border-color 0.2s',
                  borderColor: openFaq === i ? 'var(--blue-border)' : 'var(--ls-border)',
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
                      color: 'var(--td1)',
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
      <section className="section-dark" style={{ textAlign: 'center' }}>
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
                  Ready to Dominate Local Search?
                </h2>
                <p style={{ color: 'var(--t3)', fontSize: '1.0625rem', lineHeight: 1.65, marginBottom: 36, maxWidth: '50ch', marginInline: 'auto' }}>
                  Join the businesses already using eighty5.OS to dominate local Google Maps, show up in AI search, and grow without adding headcount.
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
                    Start Your Trial Today →
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
                  No long-term contracts · Cancel anytime · Setup in days
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
      <p style={{ padding: '0 22px 20px', fontSize: '0.9rem', color: 'var(--td2)', lineHeight: 1.65 }}>{answer}</p>
    </motion.div>
  );
};
