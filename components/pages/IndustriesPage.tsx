import React from 'react';
import { motion } from 'framer-motion';
import { Reveal, Stagger } from '../ui/Reveal';
import { navigate } from '../../router';

const STATS = [
  { value: '<2min', label: 'Avg. Lead Response Time' },
  { value: '100%', label: 'Review Response Rate' },
  { value: 'Top 3', label: 'Map Pack Results' },
  { value: '5→50+', label: 'Reviews in 90 Days' },
];

const INDUSTRIES = [
  {
    route: '/mortgage',
    label: 'Mortgage',
    sub: 'Loan Officers · Mortgage Brokers',
    gap1: '#84CC16',
    desc: "Mortgage leads move fast and don't wait for callbacks. We make sure every inquiry is captured, followed up, and closed — while your referral engine runs on autopilot.",
    icon: '🏦',
    keyStats: ['Avg. 47% of mortgage inquiries go unresponded within 1 hour', 'Speed-to-lead is the #1 conversion factor in mortgage', 'AI follow-up recovers 30–40% of cold leads'],
  },
  {
    route: '/realestate',
    label: 'Real Estate',
    sub: 'Realtors · Property Management',
    gap1: '#84CC16',
    desc: "Speed wins in real estate. The first agent to respond gets the client. eighty5.OS makes you that agent — automatically, 24/7, even when you're showing homes.",
    icon: '🏡',
    keyStats: ['78% of buyers work with the first agent who responds', 'Avg. agent response time: 15+ hours', 'AI cuts response time to under 2 minutes'],
  },
  {
    route: '/homeservices',
    label: 'Home Services',
    sub: 'Plumbers · HVAC · Electricians · Contractors',
    gap1: '#84CC16',
    desc: "Every missed call is a job for your competitor. Voice AI answers 24/7, books appointments, and follows up — so you never lose work to voicemail again.",
    icon: '🔧',
    keyStats: ['Home service businesses miss 30–60% of calls during peak seasons', 'After-hours calls convert at 3x the rate of callbacks', 'Avg. missed call value: $300–$800'],
  },
  {
    route: '/medical',
    label: 'Medical',
    sub: 'Practices · Clinics · Healthcare Providers',
    gap1: '#84CC16',
    desc: "Patients choose providers based on reviews and search results. eighty5.OS builds your digital reputation and automates appointment intake — filling your schedule on autopilot.",
    icon: '🏥',
    keyStats: ['77% of patients check online reviews before choosing a provider', 'Practices with 50+ reviews get 3x more new patients', 'AI intake reduces no-shows by up to 40%'],
  },
  {
    route: '/legal',
    label: 'Legal',
    sub: 'Law Firms · Solo Attorneys · Legal Practices',
    gap1: '#84CC16',
    desc: "Clients research attorneys extensively before calling. Being first in local search and AI recommendations — combined with instant intake response — is the difference between signing a client and losing them to the firm down the street.",
    icon: '⚖️',
    keyStats: ['Legal clients consult an avg. of 4.1 firms before retaining', 'AI search is now a top 3 source for attorney discovery', 'Instant response increases retention rate by 60%'],
  },
];

export const IndustriesPage: React.FC = () => (
  <div style={{ paddingTop: 'var(--nav-h)', paddingBottom: 80, background: '#FFFFFF', color: '#0F172A' }}>

    {/* Hero */}
    <section style={{ padding: 'clamp(48px,6vw,88px) 0 56px', textAlign: 'center', background: '#FFFFFF' }}>
      <div className="wrap" style={{ maxWidth: 720 }}>
        <Reveal>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#1B4FFF', marginBottom: 20 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#1B4FFF', display: 'inline-block' }} />
            Industries Served
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(2.25rem,5vw,3.75rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.08, color: '#0F172A', marginBottom: 24 }}>
            Built For<br />
            <span style={{ color: '#1B4FFF' }}>Your</span>{' '}Market.
          </h1>
        </Reveal>
        <Reveal delay={0.14}>
          <p style={{ fontSize: 'clamp(1rem,1.5vw,1.125rem)', color: '#64748B', lineHeight: 1.7, marginBottom: 36 }}>
            Local service businesses that get found on Google — and never lose a lead after the click. Select your industry to see the full AI playbook.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' as const }}>
            <motion.button whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.98 }} onClick={() => navigate('/audit')} className="btn btn-primary">
              Get Your Free Visibility Audit →
            </motion.button>
            <motion.button whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.98 }} onClick={() => navigate('/pricing')} className="btn btn-ghost">
              View Pricing
            </motion.button>
          </div>
        </Reveal>
      </div>
    </section>

    {/* Stats strip */}
    <section style={{ background: '#F7F9FF', borderTop: '1px solid #DDE5F2', borderBottom: '1px solid #DDE5F2', padding: '24px 0' }}>
      <div className="wrap">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: '16px 32px', textAlign: 'center' }}>
          {STATS.map(s => (
            <div key={s.value}>
              <p style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(1.25rem,2.5vw,1.75rem)', fontWeight: 800, color: '#1B4FFF', letterSpacing: '-0.03em', marginBottom: 4 }}>{s.value}</p>
              <p style={{ fontSize: '0.8rem', color: '#94A3B8', letterSpacing: '0.01em' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Industries grid */}
    <section style={{ padding: 'clamp(48px,6vw,80px) 0' }}>
      <div className="wrap">
        <Reveal>
          <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#94A3B8', marginBottom: 8 }}>Choose Your Industry</p>
          <h2 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(1.5rem,3vw,2.25rem)', fontWeight: 800, letterSpacing: '-0.03em', color: '#0F172A', marginBottom: 12 }}>Every industry has a different problem.</h2>
          <p style={{ color: '#64748B', fontSize: '0.9375rem', marginBottom: 48 }}>We've built the right solution for each. Click any industry to see exactly how eighty5.OS solves your specific gaps.</p>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 16 }}>
          {INDUSTRIES.map((ind, i) => (
            <Reveal key={ind.route} delay={i * 0.06}>
              <motion.div
                whileHover={{ y: -4, borderColor: '#1B4FFF' }}
                onClick={() => navigate(ind.route)}
                style={{ padding: '32px 32px 28px', background: '#F7F9FF', border: '1.5px solid #DDE5F2', borderRadius: 'var(--rdl)', cursor: 'pointer', transition: 'border-color 0.2s', height: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
                  <span>{ind.icon}</span>
                  <span style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 500 }}>{ind.sub}</span>
                </div>
                <h3 style={{ fontFamily: 'var(--fd)', fontSize: '1.375rem', fontWeight: 800, letterSpacing: '-0.03em', color: '#0F172A', marginBottom: 10 }}>{ind.label}</h3>
                <p style={{ fontSize: '0.9rem', color: '#64748B', lineHeight: 1.65, marginBottom: 24, flex: 1 }}>{ind.desc}</p>

                {/* Key stats */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
                  {ind.keyStats.map(stat => (
                    <div key={stat} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                      <span style={{ color: '#84CC16', fontSize: '0.75rem', paddingTop: 3, minWidth: 12 }}>▸</span>
                      <p style={{ fontSize: '0.8rem', color: '#94A3B8', lineHeight: 1.5 }}>{stat}</p>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#1B4FFF', fontSize: '0.875rem', fontWeight: 700, fontFamily: 'var(--fd)' }}>
                  See the full {ind.label} playbook <span>→</span>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section style={{ padding: 'clamp(48px,5vw,72px) 0', background: '#F7F9FF', borderTop: '1px solid #DDE5F2' }}>
      <div className="wrap" style={{ maxWidth: 620, textAlign: 'center' }}>
        <Reveal>
          <h2 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(1.5rem,3vw,2.25rem)', fontWeight: 800, letterSpacing: '-0.04em', color: '#0F172A', marginBottom: 16 }}>Not sure which plan fits your industry?</h2>
          <p style={{ color: '#64748B', marginBottom: 32, lineHeight: 1.7 }}>Get a free AI Visibility Audit — we'll show you exactly where your business stands across all three gaps.</p>
          <motion.button whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.98 }} onClick={() => navigate('/audit')} className="btn btn-primary">
            Get Your Free Visibility Audit →
          </motion.button>
          <p style={{ marginTop: 16, fontSize: '0.8125rem', color: '#94A3B8' }}>No contracts · No credit card · Results in 48 hours</p>
        </Reveal>
      </div>
    </section>
  </div>
);
