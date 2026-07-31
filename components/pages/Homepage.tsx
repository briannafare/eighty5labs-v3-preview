import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Reveal } from '../ui/Reveal';
import { navigate } from '../../router';
import { VoiceAIDemo } from '../VoiceAIDemo';
import { HeroAnimation } from '../HeroAnimation';
import { RevenueCalculator } from '../RevenueCalculator';
import {
  IconArrowRight, IconCheck, IconPlus,
  IconHouseSignal, IconCall24, IconFollowUp,
  IconAISearch, IconMapPin, IconReply, IconContent,
  IconWorkflow, IconStar, IconSpeed, IconBooked, IconGrowth,
  IconBank, IconWrench, IconPulse, IconScales,
} from '../ui/Icons';

const CircleArrow = () => (
  <span className="btn-arrow-circle">
    <IconArrowRight size={16} strokeWidth={2.25} />
  </span>
);

/* ── DATA ──────────────────────────────────────────────────────

   Homepage is written for one reader: a residential real estate
   agent or small team. Other verticals keep their own pages and
   are linked from the "also built for" row near the bottom.
   ───────────────────────────────────────────────────────────── */

const STEPS = [
  {
    num: '01',
    label: 'Get found',
    Icon: IconHouseSignal,
    color: 'var(--step1)',
    headline: 'Buyers ask an AI before they ask a friend',
    body: "\"Best listing agent in [neighborhood]\" now gets answered by ChatGPT, Gemini, and Google's Map Pack, not by your brokerage bio. Those answers are built from your reviews, your local content, and your Google Business Profile. Most agents have none of it in place.",
    fix: 'Content AI + GBP Optimization',
    flow: ['Search', 'Map Pack', 'Reviews', 'Your profile'],
    stat: '3',
    statLabel: 'agents the average buyer contacts before choosing one',
  },
  {
    num: '02',
    label: 'Answer first',
    Icon: IconCall24,
    color: 'var(--step2)',
    headline: "You were at a showing. They called someone else.",
    body: "A buyer who reaches voicemail does not leave a message. They dial the next agent on the list. Voice AI picks up on the second ring at any hour, answers questions about the listing, qualifies the lead, and books the showing straight into your calendar.",
    fix: 'Voice AI + Conversation AI',
    flow: ['Inquiry', 'AI answers', 'Qualified', 'Showing booked'],
    stat: '< 2 min',
    statLabel: 'response time, day or night, with no one at a desk',
  },
  {
    num: '03',
    label: 'Stay in touch',
    Icon: IconFollowUp,
    color: 'var(--step3)',
    headline: 'Your database is the listing pipeline you forgot about',
    body: "Past clients and sphere of influence are where repeat and referral business comes from, and both go quiet the moment you get busy. Workflow AI runs closing anniversaries, market updates, and referral asks on a schedule you never have to think about.",
    fix: 'Workflow AI + Reviews AI',
    flow: ['Closed', 'Anniversary', 'Market update', 'Referral'],
    stat: '5+',
    statLabel: 'touches most leads need before they transact',
  },
];

const SYSTEMS = [
  {
    step: '01', Icon: IconAISearch, title: 'Content AI',
    body: 'Publishes neighborhood pages, market updates, and FAQ content structured so AI search engines can cite you by name when someone asks for an agent in your area.',
    features: ['Neighborhood + market pages', 'Weekly Google Business posts', 'Schema built for AI citation'],
  },
  {
    step: '01', Icon: IconMapPin, title: 'GBP Optimization',
    body: 'Your Google Business Profile rebuilt to rank in the Map Pack for the searches that actually precede a listing appointment.',
    features: ['Map Pack ranking strategy', 'Service-area + category tuning', 'Competitor gap analysis'],
  },
  {
    step: '02', Icon: IconCall24, title: 'Voice AI',
    body: 'Answers every inbound call around the clock. Knows your listings, qualifies buyer versus seller, and books the showing while you are still in the car.',
    features: ['24/7 call answering', 'Live calendar booking', 'Buyer / seller qualification'],
  },
  {
    step: '02', Icon: IconReply, title: 'Conversation AI',
    body: 'Engages the visitor sitting on your listing page, captures their details, and keeps the thread going over SMS and email until they book.',
    features: ['Instant site lead capture', 'SMS + email follow-up', 'Automated showing booking'],
  },
  {
    step: '03', Icon: IconWorkflow, title: 'Workflow AI',
    body: 'Sequences by lead type: new buyer, valuation request, open house sign-in, closing anniversary. Each runs without you scheduling a thing.',
    features: ['Sequences by lead type', 'Past-client re-engagement', 'Showing + closing reminders'],
  },
  {
    step: '03', Icon: IconStar, title: 'Reviews AI',
    body: 'Asks for the review after every closing, while the client is still thrilled, and responds to each one within minutes.',
    features: ['Post-closing review requests', 'Instant AI responses', 'Review velocity monitoring'],
  },
];

const HOW = [
  { num: '01', title: 'Audit', Icon: IconAISearch, body: 'We map your Map Pack position, review velocity, and whether ChatGPT, Gemini, and Perplexity mention you at all for your farm area. Free, and yours to keep.' },
  { num: '02', title: 'Build', Icon: IconWorkflow, body: 'We configure your OS: a voice agent trained on your listings and market, follow-up sequences by lead type, calendar sync, and review automation.' },
  { num: '03', title: 'Deploy', Icon: IconBooked, body: 'Calls, texts, web chat, and form fills all land in one place and get answered in seconds, whether you are at a closing or asleep.' },
  { num: '04', title: 'Optimize', Icon: IconGrowth, body: 'Monthly review of Map Pack movement, AI search mentions, and lead response times, with the sequences tuned to what actually converted.' },
];

const RESULTS = [
  { metric: '< 2 min', metricLabel: 'average lead response time', quote: "I was skeptical AI could handle real estate conversations. Now I never miss a lead, even during showings. My conversion went up simply because I'm always first to respond.", author: 'Marcus D.', role: 'Agent · Phoenix, AZ' },
  { metric: '0', metricLabel: 'calls sent to voicemail', quote: 'Open house weekends used to mean a full voicemail box on Monday. Now every one of those calls gets answered and half of them are already on my calendar.', author: 'Priya R.', role: 'Team Lead · Denver, CO' },
  { metric: '+30%', metricLabel: 'referral business in one quarter', quote: "The past-client sequences are the part I didn't expect. Anniversary notes and market updates go out whether I remember or not — and the referrals followed.", author: 'Danielle W.', role: 'Broker · Tampa, FL' },
];

const ALSO_FOR = [
  { label: 'Mortgage', sub: 'Loan officers · Brokers', route: '/mortgage', Icon: IconBank },
  { label: 'Home Services', sub: 'HVAC · Plumbing · Roofing', route: '/homeservices', Icon: IconWrench },
  { label: 'Medical & Wellness', sub: 'Dental · Med spa · PT', route: '/medical', Icon: IconPulse },
  { label: 'Legal', sub: 'PI · Criminal · Family', route: '/legal', Icon: IconScales },
];

const FAQS = [
  { q: 'How does this work when I already have a team assistant?', a: "Voice AI takes overflow and after-hours rather than replacing anyone. Your assistant handles the calls they can get to; the AI catches nights, weekends, showing blocks, and everything that comes in at once during an open house." },
  { q: 'Will it know anything about my actual listings?', a: 'Yes. The voice agent is configured with your active listings, price ranges, service areas, and showing availability, so it can answer real questions rather than take a message. It escalates anything it should not answer.' },
  { q: 'How do real estate agents rank higher in Google Maps?', a: 'Maps ranks on relevance, distance, and prominence. That means the right primary category, real service areas, current photos and posts, and a steady stream of recent reviews. Agents who publish local content and collect reviews systematically outrank the ones treating their profile as a static listing.' },
  { q: 'Will ChatGPT or Perplexity actually recommend me?', a: 'They recommend agents with strong review profiles, neighborhood-specific content, and consistent business information across the web. Most agents have none of that, which is exactly why the ones who do get named.' },
  { q: 'Does it work with my CRM and my brokerage phone number?', a: 'Yes. It layers on top of your existing CRM, calendar, and phone setup rather than replacing them. No number porting, no rip-and-replace.' },
  { q: 'How long until it is running?', a: 'Most agents are fully deployed in 5–7 business days. Voice AI and review automation can be live within 48 hours.' },
];

/* ── Three-step framework ─────────────────────────────────── */

const StepFramework: React.FC = () => (
  <div className="gaps-framework-outer">
    {STEPS.map((step, i) => (
      <React.Fragment key={step.num}>
        <Reveal delay={i * 0.08}>
          <div className="gaps-framework-card card-light">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                background: 'var(--ls1)', border: '1px solid var(--ls-border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: step.color,
              }}>
                <step.Icon size={22} />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--fd)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--td3)', marginBottom: 2 }}>Step {step.num}</div>
                <div style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '1.05rem', color: 'var(--td1)', letterSpacing: '-0.02em', lineHeight: 1.2 }}>{step.label}</div>
              </div>
            </div>

            <h3 style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '1rem', color: 'var(--td1)', letterSpacing: '-0.02em', lineHeight: 1.3, marginBottom: 10 }}>
              {step.headline}
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--td2)', lineHeight: 1.7, marginBottom: 22 }}>{step.body}</p>

            <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexWrap: 'wrap', marginBottom: 20 }}>
              {step.flow.map((node, j) => (
                <React.Fragment key={node}>
                  <div style={{
                    padding: '3px 8px', borderRadius: 6,
                    background: j === step.flow.length - 1 ? 'var(--blue-lt)' : 'var(--ls1)',
                    border: `1px solid ${j === step.flow.length - 1 ? 'var(--blue-border)' : 'var(--ls-border)'}`,
                    fontFamily: 'var(--fd)', fontWeight: 600, fontSize: '0.75rem',
                    color: j === step.flow.length - 1 ? 'var(--blue)' : 'var(--td3)',
                    whiteSpace: 'nowrap',
                  }}>{node}</div>
                </React.Fragment>
              ))}
            </div>

            <div style={{ marginTop: 'auto', paddingTop: 18, borderTop: '1px solid var(--ls-border)' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 12 }}>
                <span style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '1.35rem', lineHeight: 1, letterSpacing: '-0.03em', color: 'var(--td1)', whiteSpace: 'nowrap' }}>{step.stat}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--td3)', lineHeight: 1.4 }}>{step.statLabel}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, color: 'var(--blue)' }}>
                <IconCheck size={13} strokeWidth={2.5} />
                <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{step.fix}</span>
              </div>
            </div>
          </div>
        </Reveal>

        {i < STEPS.length - 1 && (
          <div className="gaps-framework-connector" aria-hidden="true">
            <IconArrowRight size={18} color="var(--td3)" />
          </div>
        )}
      </React.Fragment>
    ))}
  </div>
);

/* ── Scroll-scaled hero demo ──────────────────────────────── */

const ScrollRevealDemo: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'start 0.2'] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

  return (
    <div ref={ref} style={{ maxWidth: 880, marginInline: 'auto', padding: '0 clamp(16px, 3vw, 40px)' }}>
      <motion.div style={{ scale, opacity, transformOrigin: 'top center' }}>
        <HeroAnimation />
      </motion.div>
    </div>
  );
};

/* ── Platform tabs ────────────────────────────────────────── */

const PlatformTabs: React.FC = () => {
  const [activeStep, setActiveStep] = useState('01');
  const filtered = SYSTEMS.filter(s => s.step === activeStep);

  return (
    <div>
      <div style={{ display: 'flex', borderBottom: '1px solid var(--ls-border)' }} role="tablist" aria-label="Platform systems by step">
        {STEPS.map(step => {
          const isActive = activeStep === step.num;
          return (
            <button
              key={step.num}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveStep(step.num)}
              style={{
                flex: 1,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9,
                padding: '13px 16px',
                background: 'transparent',
                border: 'none',
                borderBottom: `2px solid ${isActive ? 'var(--blue)' : 'transparent'}`,
                cursor: 'pointer',
                transition: 'color 0.2s, border-color 0.2s',
                marginBottom: -1,
                color: isActive ? 'var(--td1)' : 'var(--td3)',
              }}
            >
              <step.Icon size={17} color={isActive ? 'var(--blue)' : 'var(--td3)'} />
              <span style={{ fontFamily: 'var(--fd)', fontWeight: 600, fontSize: '0.84rem', letterSpacing: '-0.01em' }}>
                {step.label}
              </span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, paddingTop: 24 }}
          className="hero-grid"
        >
          {filtered.map(svc => (
            <div key={svc.title} className="card-light" style={{ height: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                  background: 'var(--ls1)', border: '1px solid var(--ls-border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--blue)',
                }}><svc.Icon size={20} /></div>
                <div style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '1.05rem', color: 'var(--td1)', letterSpacing: '-0.02em' }}>{svc.title}</div>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--td2)', lineHeight: 1.7, marginBottom: 18 }}>{svc.body}</p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 8, listStyle: 'none' }}>
                {svc.features.map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                    <IconCheck size={13} color="var(--blue)" strokeWidth={2.5} />
                    <span style={{ fontSize: '0.8rem', color: 'var(--td2)' }}>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

/* ── Page ─────────────────────────────────────────────────── */

export const Homepage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div>

      {/* HERO */}
      <section style={{ background: '#fff', paddingTop: 'clamp(96px, 12vw, 132px)', paddingBottom: 0 }}>
        <div className="wrap">
          <motion.h1
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--fd)', fontSize: 'clamp(2.2rem, 4.8vw, 3.6rem)', fontWeight: 800,
              letterSpacing: '-0.045em', lineHeight: 1.06, color: 'var(--td1)',
              textAlign: 'center', maxWidth: '19ch', marginInline: 'auto', marginBottom: 20,
            }}
          >
            Be the real estate agent who answers first.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            style={{
              textAlign: 'center', fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)', color: 'var(--td2)',
              lineHeight: 1.65, maxWidth: '54ch', marginInline: 'auto', marginBottom: 30,
            }}
          >
            Buyers and sellers contact three agents and sign with whoever picks up.
            eighty5labs answers every real estate lead in under two minutes at any hour,
            qualifies buyer from seller, and books the showing into your calendar.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.16 }}
            style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <a href="/audit" onClick={e => { e.preventDefault(); navigate('/audit'); }} className="btn btn-primary">
              Get your free visibility audit <CircleArrow />
            </a>
            <a href="/services" onClick={e => { e.preventDefault(); navigate('/services'); }} className="btn btn-ghost-light">
              See how it works
            </a>
          </motion.div>

          <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--td3)', marginTop: 16 }}>
            Free · No commitment · The report is yours either way
          </p>
        </div>

        <div style={{ position: 'relative', marginTop: 44 }}>
          <ScrollRevealDemo />
          <div aria-hidden="true" style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 120,
            background: 'linear-gradient(to bottom, transparent, #fff 85%)', pointerEvents: 'none',
          }} />
        </div>
      </section>

      {/* AI ENGINES */}
      <section style={{ background: '#fff', paddingTop: 40, paddingBottom: 56 }}>
        <div className="wrap">
          <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--td3)', marginBottom: 22 }}>
            Where buyers and sellers look for an agent now
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'clamp(24px, 5vw, 56px)', flexWrap: 'wrap' }}>
            {[
              { name: 'Google', icon: <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24"><path d="M21.6 12.23c0-.71-.06-1.4-.18-2.05H12v3.88h5.38a4.6 4.6 0 0 1-2 3.02v2.5h3.24c1.89-1.74 2.98-4.3 2.98-7.35z" fill="#4285F4"/><path d="M12 22c2.7 0 4.96-.9 6.62-2.42l-3.24-2.5c-.9.6-2.04.96-3.38.96-2.6 0-4.8-1.76-5.59-4.12H3.06v2.59A10 10 0 0 0 12 22z" fill="#34A853"/><path d="M6.41 13.92a6 6 0 0 1 0-3.84V7.49H3.06a10 10 0 0 0 0 9.02z" fill="#FBBC05"/><path d="M12 5.98c1.47 0 2.79.5 3.83 1.5l2.87-2.87C16.95 2.99 14.7 2 12 2a10 10 0 0 0-8.94 5.49l3.35 2.59C7.2 7.72 9.4 5.98 12 5.98z" fill="#EA4335"/></svg> },
              { name: 'ChatGPT', icon: <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24"><path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.998 5.998 0 0 0-3.998 2.9 6.042 6.042 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.05 6.05 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.143-.08 4.778-2.758a.776.776 0 0 0 .391-.676v-6.738l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.49zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872v.024zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66v.018zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.676l-.004 6.727zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5-.005-2.999z" fill="#0F172A"/></svg> },
              { name: 'Gemini', icon: <svg aria-hidden="true" width="19" height="19" viewBox="0 0 24 24"><path d="M12 24C12 18.636 8.364 14 3 12c5.364-2 9-6.636 9-12 0 5.364 3.636 10 9 12-5.364 2-9 6.636-9 12z" fill="#4285F4"/></svg> },
              { name: 'Perplexity', icon: <svg aria-hidden="true" width="19" height="19" viewBox="0 0 24 24" fill="none"><path d="M4 2l8 6 8-6v9l-4 3v8l-4-3-4 3v-8l-4-3V2z" stroke="#0F172A" strokeWidth="1.8" strokeLinejoin="round"/><path d="M12 8v14M4 11h16" stroke="#0F172A" strokeWidth="1.8" strokeLinecap="round"/></svg> },
            ].map(ai => (
              <div key={ai.name} style={{ display: 'flex', alignItems: 'center', gap: 8, opacity: 0.65 }}>
                {ai.icon}
                <span style={{ fontFamily: 'var(--fd)', fontWeight: 600, fontSize: '0.9375rem', color: 'var(--td1)' }}>{ai.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THREE STEPS */}
      <section className="section-light">
        <div className="wrap">
          <Reveal>
            <h2 className="section-heading">Three places a real estate deal falls apart</h2>
            <p className="section-sub" style={{ marginBottom: 48 }}>
              Nearly every lost client falls into one of them. eighty5labs covers all three at once.
            </p>
          </Reveal>
          <StepFramework />
        </div>
      </section>

      {/* VOICE AI */}
      <section className="section-white">
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px, 6vw, 72px)', alignItems: 'center' }} className="hero-grid">
            <div>
              <Reveal>
                <h2 className="section-heading">The 8pm call you would have missed</h2>
                <p className="section-sub" style={{ marginBottom: 28 }}>
                  A buyer sees your sign, calls after dinner, and gets a real conversation instead of a beep.
                  Here is what happens next.
                </p>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32, listStyle: 'none' }}>
                  {[
                    { Icon: IconSpeed, text: 'Answers in under two rings, any hour' },
                    { Icon: IconReply, text: 'Answers questions about the listing itself' },
                    { Icon: IconBooked, text: 'Books the showing into your live calendar' },
                    { Icon: IconCheck, text: 'Logs the lead and confirms by text' },
                  ].map(({ Icon, text }) => (
                    <li key={text} style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                      <Icon size={17} color="var(--blue)" />
                      <span style={{ fontSize: '0.9rem', color: 'var(--td2)' }}>{text}</span>
                    </li>
                  ))}
                </ul>
                <a href="/audit" onClick={e => { e.preventDefault(); navigate('/audit'); }} className="btn btn-accent btn-sm">
                  Hear it on your own line <CircleArrow />
                </a>
              </Reveal>
            </div>
            <Reveal delay={0.08}>
              <VoiceAIDemo />
            </Reveal>
          </div>
        </div>
      </section>

      {/* PLATFORM */}
      <section className="section-light">
        <div className="wrap">
          <Reveal>
            <h2 className="section-heading">What an agent actually gets</h2>
            <p className="section-sub" style={{ marginBottom: 40 }}>
              Six systems on eighty5.OS, each mapped to a step above, all sharing one lead record.
            </p>
          </Reveal>
          <PlatformTabs />
          <Reveal>
            <div style={{ textAlign: 'center', marginTop: 40 }}>
              <a href="/services" onClick={e => { e.preventDefault(); navigate('/services'); }} className="btn btn-ghost-light">
                Explore all systems <IconArrowRight size={16} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section-white">
        <div className="wrap">
          <Reveal>
            <h2 className="section-heading">From audit to autopilot</h2>
            <p className="section-sub" style={{ marginBottom: 40 }}>Four steps, run by us, live in about a week.</p>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
            {HOW.map((step, i) => (
              <Reveal key={step.num} delay={i * 0.07}>
                <div className="card-light" style={{ height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                    <step.Icon size={20} color="var(--blue)" />
                    <span style={{ fontFamily: 'var(--fd)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--td3)' }}>{step.num}</span>
                  </div>
                  <div style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '1rem', color: 'var(--td1)', marginBottom: 8, letterSpacing: '-0.02em' }}>{step.title}</div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--td2)', lineHeight: 1.7 }}>{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section className="section-dark-alt">
        <div className="wrap">
          <Reveal>
            <h2 className="section-heading">What is a missed call worth to you?</h2>
            <p className="section-sub" style={{ marginBottom: 36 }}>
              Move the sliders to your own numbers. This is commission sitting in a voicemail box.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <div style={{ maxWidth: 520, marginInline: 'auto' }}>
              <RevenueCalculator />
            </div>
          </Reveal>
        </div>
      </section>

      {/* RESULTS */}
      <section className="section-white">
        <div className="wrap">
          <Reveal>
            <h2 className="section-heading">What agents tell us</h2>
            <p className="section-sub" style={{ marginBottom: 40 }}>Three months in, the pattern is usually the same.</p>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
            {RESULTS.map((t, i) => (
              <Reveal key={t.author} delay={i * 0.07}>
                <figure className="card-light" style={{ height: '100%' }}>
                  <div style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '1.6rem', letterSpacing: '-0.035em', marginBottom: 3, color: 'var(--td1)' }}>{t.metric}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--td3)', marginBottom: 18 }}>{t.metricLabel}</div>
                  <blockquote style={{ fontSize: '0.9rem', color: 'var(--td2)', lineHeight: 1.65, marginBottom: 22 }}>“{t.quote}”</blockquote>
                  <figcaption style={{ paddingTop: 16, borderTop: '1px solid var(--ls-border)' }}>
                    <div style={{ fontWeight: 600, color: 'var(--td1)', fontSize: '0.85rem' }}>{t.author}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--td3)', marginTop: 2 }}>{t.role}</div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ALSO BUILT FOR */}
      <section style={{ background: 'var(--ls1)', borderTop: '1px solid var(--ls-border)', padding: 'clamp(40px, 5vw, 64px) 0' }}>
        <div className="wrap">
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', marginBottom: 20 }}>
            <h2 style={{ fontFamily: 'var(--fd)', fontSize: '1.05rem', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--td1)' }}>
              Also built for
            </h2>
            <a href="/industries" onClick={e => { e.preventDefault(); navigate('/industries'); }}
              style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--blue)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 0' }}>
              All industries <IconArrowRight size={14} />
            </a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10 }}>
            {ALSO_FOR.map(ind => (
              <a
                key={ind.route}
                href={ind.route}
                onClick={e => { e.preventDefault(); navigate(ind.route); }}
                className="card-light"
                style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 18px', textDecoration: 'none' }}
              >
                <ind.Icon size={20} color="var(--td3)" />
                <span>
                  <span style={{ display: 'block', fontFamily: 'var(--fd)', fontWeight: 600, fontSize: '0.875rem', color: 'var(--td1)' }}>{ind.label}</span>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--td3)', marginTop: 2 }}>{ind.sub}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-white">
        <div className="wrap" style={{ maxWidth: 740 }}>
          <Reveal>
            <h2 className="section-heading" style={{ marginBottom: 32 }}>Questions agents ask</h2>
          </Reveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {FAQS.map((faq, i) => (
              <Reveal key={faq.q} delay={i * 0.03}>
                <div style={{
                  background: '#fff', borderRadius: 'var(--rd)', overflow: 'hidden',
                  border: `1px solid ${openFaq === i ? 'var(--blue-border)' : 'var(--ls-border)'}`,
                  transition: 'border-color 0.2s',
                }}>
                  <button
                    id={`faq-q-${i}`}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                    aria-controls={`faq-answer-${i}`}
                    style={{
                      width: '100%', padding: '16px 20px', display: 'flex', alignItems: 'center',
                      justifyContent: 'space-between', background: 'transparent', border: 'none',
                      cursor: 'pointer', color: 'var(--td1)', fontFamily: 'var(--fd)',
                      fontWeight: 600, fontSize: '0.9rem', textAlign: 'left', gap: 14,
                    }}
                  >
                    {faq.q}
                    <motion.span animate={{ rotate: openFaq === i ? 45 : 0 }} transition={{ duration: 0.18 }} style={{ flexShrink: 0, display: 'flex', color: 'var(--td3)' }}>
                      <IconPlus size={15} />
                    </motion.span>
                  </button>
                  <div id={`faq-answer-${i}`} role="region" aria-labelledby={`faq-q-${i}`}>
                    <AnimatedAnswer open={openFaq === i} answer={faq.a} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ padding: 'clamp(88px, 10vw, 128px) 0', background: 'var(--bg0)', textAlign: 'center' }}>
        <div className="wrap">
          <Reveal>
            <h2 style={{
              fontFamily: 'var(--fd)', fontSize: 'clamp(2.2rem, 4.6vw, 3.4rem)', fontWeight: 800,
              letterSpacing: '-0.045em', lineHeight: 1.06, color: '#fff',
              marginBottom: 18, maxWidth: '16ch', marginInline: 'auto',
            }}>
              Find out where your leads are going.
            </h2>
            <p style={{ color: 'var(--t3)', fontSize: '1rem', lineHeight: 1.7, marginBottom: 36, maxWidth: '48ch', marginInline: 'auto' }}>
              A free visibility audit shows your Map Pack position, review velocity, and whether AI search
              names you at all, measured against the agents you compete with.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/audit" onClick={e => { e.preventDefault(); navigate('/audit'); }} className="btn btn-solid">
                Get your free visibility audit
              </a>
              <a href="/pricing" onClick={e => { e.preventDefault(); navigate('/pricing'); }} className="btn btn-ghost">
                View pricing
              </a>
            </div>
            <p style={{ marginTop: 22, fontSize: '0.78rem', color: 'var(--t4)' }}>
              No long-term contract · Cancel anytime · Live in about a week
            </p>
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
    transition={{ duration: 0.22, ease: 'easeInOut' }}
    style={{ overflow: 'hidden' }}
  >
    <p style={{ padding: '0 20px 18px', fontSize: '0.88rem', color: 'var(--td2)', lineHeight: 1.65 }}>{answer}</p>
  </motion.div>
);
