import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Reveal } from '../ui/Reveal';
import { navigate } from '../../router';

// ── Types ────────────────────────────────────────────────────────────────────

export interface IndustryStat {
  value: string;
  label: string;
}

export interface IndustrySystem {
  name: string;
  desc: string;
}

export interface IndustryFAQ {
  q: string;
  a: string;
}

export interface IndustryPageData {
  slug: string;            // route segment, e.g. 'mortgage'
  label: string;           // display name, e.g. 'Mortgage'
  sub: string;             // e.g. 'Loan Officers · Mortgage Brokers'
  heroH1: React.ReactNode; // can have <br/> etc.
  heroCopy: string;
  problemTitle: string;
  problemBody: string[];
  quote: string;
  stats: IndustryStat[];
  systems: IndustrySystem[];
  bullets: string[];
  boldClose: string;
  faqTitle: string;
  faqs: IndustryFAQ[];
  ctaTitle: string;
  ctaBody: string;
  accentColor?: string;    // defaults to var(--blue)
}

// ── Revenue Calculator ───────────────────────────────────────────────────────

const RevenueCalc: React.FC = () => {
  const [leads, setLeads] = useState(80);
  const [dealValue, setDealValue] = useState(2500);
  const [closeRate, setCloseRate] = useState(20);

  const missRate = 0.35;
  const recoverRate = 0.55;
  const missed = Math.round(leads * missRate);
  const recoverable = Math.round(missed * recoverRate);
  const lostRev = Math.round(missed * (closeRate / 100) * dealValue);
  const recoveredRev = Math.round(recoverable * (closeRate / 100) * dealValue);
  const annualUpside = recoveredRev * 12;

  const slider = (label: string, val: number, set: (v: number) => void, min: number, max: number, step: number, fmt: (v: number) => string) => (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ fontSize: '0.8125rem', color: 'var(--t3)' }}>{label}</span>
        <span style={{ fontFamily: 'var(--fd)', fontWeight: 800, color: 'var(--t1)', fontSize: '0.9rem' }}>{fmt(val)}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={val}
        onChange={e => set(Number(e.target.value))}
        style={{ width: '100%', accentColor: '#1B4FFF' }} />
    </div>
  );

  return (
    <div style={{ padding: 'clamp(28px,3vw,36px)', background: 'var(--bg2)', border: '1.5px solid var(--border)', borderRadius: 'var(--rdl)' }}>
      <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'var(--t4)', marginBottom: 6 }}>Revenue Recovery Calculator</p>
      <h3 style={{ fontFamily: 'var(--fd)', fontSize: '1.125rem', fontWeight: 900, color: 'var(--t1)', letterSpacing: '-0.02em', marginBottom: 24 }}>What's it actually worth?</h3>

      {slider('Monthly leads', leads, setLeads, 20, 500, 5, v => `${v}`)}
      {slider('Average deal value', dealValue, setDealValue, 500, 25000, 500, v => `$${v.toLocaleString()}`)}
      {slider('Current close rate', closeRate, setCloseRate, 5, 60, 5, v => `${v}%`)}

      <div style={{ borderTop: '1px solid var(--border)', paddingTop: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {[
          { label: 'Leads Missed / mo', val: missed, color: '#EF4444' },
          { label: 'Recoverable Leads', val: recoverable, color: '#10B981' },
          { label: 'Lost Revenue / mo', val: `$${lostRev.toLocaleString()}`, color: '#EF4444' },
          { label: 'Recovered / mo', val: `$${recoveredRev.toLocaleString()}`, color: '#10B981' },
        ].map(row => (
          <div key={row.label} style={{ background: 'var(--bg1)', borderRadius: 10, padding: '14px 16px' }}>
            <p style={{ fontSize: '0.7rem', color: 'var(--t4)', marginBottom: 4 }}>{row.label}</p>
            <p style={{ fontFamily: 'var(--fd)', fontWeight: 900, fontSize: '1.125rem', color: row.color }}>{row.val}</p>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12, background: 'rgba(27,79,255,0.08)', border: '1px solid rgba(27,79,255,0.25)', borderRadius: 10, padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p style={{ fontSize: '0.7rem', color: 'var(--t4)', marginBottom: 4 }}>Annual Upside</p>
          <p style={{ fontFamily: 'var(--fd)', fontWeight: 900, fontSize: '1.5rem', color: 'var(--blue)', letterSpacing: '-0.03em' }}>${annualUpside.toLocaleString()}</p>
        </div>
        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} onClick={() => navigate('#/audit')}
          style={{ fontFamily: 'var(--fd)', fontWeight: 800, fontSize: '0.8125rem', color: 'white', background: 'var(--blue)', border: 'none', borderRadius: 8, padding: '10px 16px', cursor: 'pointer', whiteSpace: 'nowrap' as const }}>
          Get My Analysis →
        </motion.button>
      </div>
    </div>
  );
};

// ── FAQ Item ─────────────────────────────────────────────────────────────────

const FAQItem: React.FC<{ q: string; a: string }> = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid var(--border)' }}>
      <button onClick={() => setOpen(o => !o)}
        style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '20px 0', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
        <span style={{ fontWeight: 600, color: 'var(--t1)', fontSize: '0.9375rem', lineHeight: 1.4 }}>{q}</span>
        <span style={{ color: 'var(--blue)', fontSize: '1.125rem', minWidth: 20, paddingTop: 1, transition: 'transform 0.2s', transform: open ? 'rotate(45deg)' : 'rotate(0)' }}>+</span>
      </button>
      <motion.div initial={false} animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }} style={{ overflow: 'hidden' }}>
        <p style={{ fontSize: '0.9rem', color: 'var(--t3)', lineHeight: 1.7, paddingBottom: 20 }}>{a}</p>
      </motion.div>
    </div>
  );
};

// ── Main Template ─────────────────────────────────────────────────────────────

export const IndustryPage: React.FC<{ data: IndustryPageData }> = ({ data }) => {
  const accent = data.accentColor ?? 'var(--blue)';

  return (
    <div style={{ paddingTop: 'var(--nav-h)', paddingBottom: 80 }}>

      {/* Back link */}
      <div className="wrap" style={{ padding: '20px var(--wrap-px) 0' }}>
        <button onClick={() => navigate('#/industries')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, color: 'var(--t4)', fontSize: '0.8125rem', fontWeight: 500 }}>
          ← All Industries
        </button>
      </div>

      {/* Hero */}
      <section style={{ padding: 'clamp(40px,5vw,72px) 0 48px' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 48, alignItems: 'center' }}>
            <div>
              <Reveal>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: accent, marginBottom: 20 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: accent, display: 'inline-block' }} />
                  Industries — {data.label}
                </span>
              </Reveal>
              <Reveal delay={0.08}>
                <h1 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(2rem,4.5vw,3.25rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.08, color: 'var(--t1)', marginBottom: 20 }}>
                  {data.heroH1}
                </h1>
              </Reveal>
              <Reveal delay={0.14}>
                <p style={{ fontSize: 'clamp(0.9375rem,1.25vw,1.0625rem)', color: 'var(--t3)', lineHeight: 1.7, marginBottom: 28, maxWidth: 520 }}>{data.heroCopy}</p>
              </Reveal>
              <Reveal delay={0.18}>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' as const }}>
                  <motion.button whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.98 }} onClick={() => navigate('#/audit')} className="btn btn-primary">
                    Get Your Free Audit →
                  </motion.button>
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <RevenueCalc />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section style={{ background: 'var(--bg1)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '20px 0' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${data.stats.length},1fr)`, gap: '12px 24px', textAlign: 'center' }}>
            {data.stats.map(s => (
              <div key={s.value}>
                <p style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(1.25rem,2vw,1.625rem)', fontWeight: 900, color: accent, letterSpacing: '-0.03em', marginBottom: 4 }}>{s.value}</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--t4)' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem + Systems */}
      <section style={{ padding: 'clamp(48px,5vw,72px) 0' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 48 }}>

            {/* Problem */}
            <div>
              <Reveal>
                <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'var(--t4)', marginBottom: 8 }}>The Problem</p>
                <h2 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(1.375rem,2.5vw,1.875rem)', fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--t1)', marginBottom: 20 }}>{data.problemTitle}</h2>
              </Reveal>
              {data.problemBody.map((para, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <p style={{ fontSize: '0.9375rem', color: 'var(--t3)', lineHeight: 1.75, marginBottom: 16 }}>{para}</p>
                </Reveal>
              ))}
              <Reveal delay={0.15}>
                <div style={{ marginTop: 24, padding: '20px 24px', background: 'var(--bg1)', border: `1px solid ${accent}30`, borderLeft: `3px solid ${accent}`, borderRadius: 10 }}>
                  <p style={{ fontSize: '0.875rem', color: 'var(--t2)', fontStyle: 'italic', lineHeight: 1.6 }}>"{data.quote}"</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--t4)', marginTop: 10 }}>In Their Own Words</p>
                </div>
              </Reveal>
            </div>

            {/* Systems */}
            <div>
              <Reveal>
                <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'var(--t4)', marginBottom: 8 }}>The Solution</p>
                <h2 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(1.375rem,2.5vw,1.875rem)', fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--t1)', marginBottom: 20 }}>The eighty5.OS Systems Built for {data.label}</h2>
              </Reveal>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {data.systems.map((sys, i) => (
                  <Reveal key={sys.name} delay={i * 0.05}>
                    <div style={{ padding: '18px 20px', background: 'var(--bg1)', border: '1px solid var(--border)', borderRadius: 12 }}>
                      <p style={{ fontFamily: 'var(--fd)', fontWeight: 800, fontSize: '0.875rem', color: accent, marginBottom: 6 }}>{sys.name}</p>
                      <p style={{ fontSize: '0.875rem', color: 'var(--t3)', lineHeight: 1.6 }}>{sys.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bullets + bold close */}
      <section style={{ padding: 'clamp(40px,4vw,60px) 0', background: 'var(--bg1)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="wrap" style={{ maxWidth: 800 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '12px 40px', marginBottom: 28 }}>
            {data.bullets.map((b, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ color: accent, fontSize: '0.75rem', paddingTop: 4, minWidth: 12 }}>✦</span>
                <p style={{ fontSize: '0.9rem', color: 'var(--t2)', lineHeight: 1.55 }}>{b}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '1rem', color: 'var(--t3)', fontStyle: 'italic', borderTop: '1px solid var(--border)', paddingTop: 20 }}>{data.boldClose}</p>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: 'clamp(48px,5vw,72px) 0' }}>
        <div className="wrap" style={{ maxWidth: 760 }}>
          <Reveal>
            <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'var(--t4)', marginBottom: 8 }}>Common Questions</p>
            <h2 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(1.375rem,2.5vw,1.875rem)', fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--t1)', marginBottom: 32 }}>Questions About eighty5labs for {data.label}</h2>
          </Reveal>
          {data.faqs.map(faq => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ padding: 'clamp(48px,5vw,72px) 0', background: 'var(--bg1)', borderTop: '1px solid var(--border)' }}>
        <div className="wrap" style={{ maxWidth: 620, textAlign: 'center' }}>
          <Reveal>
            <h2 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(1.5rem,3vw,2.25rem)', fontWeight: 900, letterSpacing: '-0.04em', color: 'var(--t1)', marginBottom: 16 }}>{data.ctaTitle}</h2>
            <p style={{ color: 'var(--t3)', marginBottom: 32, lineHeight: 1.7, fontSize: '0.9375rem' }}>{data.ctaBody}</p>
            <motion.button whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.98 }} onClick={() => navigate('#/audit')} className="btn btn-primary">
              Book Your Free Audit →
            </motion.button>
            <p style={{ marginTop: 16, fontSize: '0.8125rem', color: 'var(--t4)' }}>We take on a limited number of new audits each month. No pressure — just clarity.</p>
          </Reveal>
        </div>
      </section>
    </div>
  );
};
