import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal, Stagger } from '../ui/Reveal';
import { navigate } from '../../router';

const PLANS = [
  {
    tier: 'Starter',
    name: 'Visibility',
    tag: 'Get found in Google Maps + AI search. Close Gap 1.',
    monthlyPrice: 497,
    annualPrice: 414,
    annualSave: '$994/yr',
    featured: false,
    note: 'No contracts · Cancel anytime',
    noteGreen: false,
    cta: 'Get Started →',
    ctaPrimary: false,
    features: [
      { included: true, label: 'Google Business Profile optimization' },
      { included: true, label: 'Content AI — weekly GBP posts + FAQ pages' },
      { included: true, label: 'AI Search visibility (ChatGPT, Gemini, Perplexity)' },
      { included: true, label: 'Reviews AI — auto-request + AI responses' },
      { included: true, label: 'Monthly Map Pack ranking report' },
      { included: false, label: 'Voice AI (24/7 call answering)' },
      { included: false, label: 'Conversation AI (web chat)' },
      { included: false, label: 'Workflow AI + follow-up automation' },
    ],
  },
  {
    tier: 'Full Platform',
    name: 'Growth',
    tag: 'All three gaps closed. The complete eighty5.OS — managed for you.',
    monthlyPrice: 997,
    annualPrice: 831,
    annualSave: '$1,994/yr',
    featured: true,
    note: 'Most clients recover cost within the first week',
    noteGreen: true,
    cta: 'Start Your Trial Today →',
    ctaPrimary: true,
    features: [
      { included: true, label: 'Everything in Visibility' },
      { included: true, label: 'Voice AI — 24/7 answering, qualifying + booking' },
      { included: true, label: 'Missed call text-back in under 90 seconds' },
      { included: true, label: 'Conversation AI — web chat lead capture' },
      { included: true, label: 'Workflow AI — follow-ups, reminders, re-engagement' },
      { included: true, label: 'Funnel AI — lead nurture sequences' },
      { included: true, label: 'Calendar sync + automated booking' },
      { included: true, label: 'Monthly 30-min optimization call' },
    ],
  },
  {
    tier: 'Enterprise',
    name: 'Dominate',
    tag: 'Multi-location. Custom build. White-glove management at scale.',
    monthlyPrice: null,
    annualPrice: null,
    annualSave: '',
    featured: false,
    note: 'Typically $2,500–$5,000/mo · scoped per engagement',
    noteGreen: false,
    cta: 'Book a Strategy Call →',
    ctaPrimary: false,
    features: [
      { included: true, label: 'Everything in Growth' },
      { included: true, label: 'Multi-location management (up to 10+)' },
      { included: true, label: 'Custom Voice AI persona + brand script' },
      { included: true, label: 'Dedicated account manager' },
      { included: true, label: 'Custom CRM + API integrations' },
      { included: true, label: 'Weekly strategy calls' },
      { included: true, label: 'Custom reporting dashboard' },
      { included: true, label: 'SLA + guaranteed response times' },
    ],
  },
];

const TABLE_ROWS = [
  { group: 'GAP 1 — VISIBILITY', rows: [
    { feat: 'Google Business Profile optimization', v: true, g: true, d: true },
    { feat: 'Weekly GBP posts (Content AI)', v: true, g: true, d: true },
    { feat: 'AI Search optimization (ChatGPT, Gemini, Perplexity)', v: true, g: true, d: true },
    { feat: 'Monthly Map Pack ranking report', v: true, g: true, d: true },
    { feat: 'Local authority content pages', v: 'Basic', g: true, d: true },
  ]},
  { group: 'GAP 2 — REPUTATION', rows: [
    { feat: 'Automated review request sequences', v: true, g: true, d: true },
    { feat: 'AI review responses (all platforms)', v: true, g: true, d: true },
    { feat: 'Reputation monitoring dashboard', v: true, g: true, d: true },
    { feat: 'Negative review alerts + escalation', v: false, g: true, d: true },
  ]},
  { group: 'GAP 3 — CONVERSION', rows: [
    { feat: 'Voice AI — 24/7 call answering + booking', v: false, g: true, d: true },
    { feat: 'Missed call text-back (under 90 sec)', v: false, g: true, d: true },
    { feat: 'Conversation AI — web chat', v: false, g: true, d: true },
    { feat: 'Workflow AI + follow-up sequences', v: false, g: true, d: true },
    { feat: 'Funnel AI — lead nurture', v: false, g: true, d: true },
    { feat: 'Calendar sync + booking automation', v: false, g: true, d: true },
  ]},
  { group: 'SUPPORT & MANAGEMENT', rows: [
    { feat: 'Monthly optimization report', v: true, g: true, d: true },
    { feat: 'Strategy calls', v: false, g: 'Monthly', d: 'Weekly' },
    { feat: 'Dedicated account manager', v: false, g: false, d: true },
    { feat: 'Custom CRM / API integration', v: false, g: false, d: true },
    { feat: 'Multi-location management', v: false, g: false, d: true },
  ]},
];

const FAQS = [
  { q: 'Is there a setup fee?', a: 'No setup fees on Visibility or Growth plans. Enterprise includes a custom onboarding and build process scoped into the monthly retainer. You pay for results, not for getting started.' },
  { q: 'What happens if I cancel?', a: 'Cancel anytime with 30 days notice — no penalties. Your GBP optimizations, reviews, and content remain yours. Annual clients receive a prorated refund for unused months.' },
  { q: 'How long until I see results?', a: 'Review velocity and GBP improvements typically show within 30 days. Map Pack movement is visible in 45–60 days. Voice AI and lead capture produce results from day one — every call that would\'ve gone to voicemail now gets answered.' },
  { q: 'Can I upgrade my plan later?', a: 'Yes — upgrade anytime. We prorate the difference and extend your billing cycle. Most clients start on Visibility and upgrade to Growth within 60–90 days after seeing early results.' },
  { q: 'Do I need to sign a contract?', a: 'No contracts required. Month-to-month or annual (save 20%). We\'re confident enough in results that we don\'t need to lock you in.' },
  { q: "What's included in the free audit?", a: 'Your free AI Visibility Audit covers GBP health, Map Pack rankings, review velocity, website AI-readability, and your current presence across ChatGPT, Gemini, and Perplexity. Yours to keep regardless of whether you sign up.' },
];

const CellIcon: React.FC<{ val: boolean | string }> = ({ val }) => {
  if (val === true) return <span style={{ color: '#84CC16', fontWeight: 700 }}>✓</span>;
  if (val === false) return <span style={{ color: '#DDE5F2' }}>—</span>;
  return <span style={{ color: '#4F8EF7', fontSize: '0.8125rem', fontWeight: 600 }}>{val}</span>;
};

/* ── V2 light-page tokens ── */
const L = {
  bg: '#FFFFFF', bg2: '#F7F9FF',
  border: '#DDE5F2', blueBorder: '#C7D9FF', blueLt: '#EEF3FF',
  t1: '#0F172A', t2: '#334155', t3: '#64748B', t4: '#94A3B8',
  blue: '#1B4FFF', blue2: '#4F8EF7',
  greenLt: '#D1FAE5', greenText: '#065F46',
};

export const PricingPage: React.FC = () => {
  const [annual, setAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div style={{ paddingTop: 'var(--nav-h)', background: L.bg, color: L.t1 }}>

      {/* ═══ HERO ═══ */}
      <section style={{ padding: '72px 48px 0', textAlign: 'center', borderBottom: `1px solid ${L.border}` }}>
        <Reveal>
          <div className="section-label" style={{ justifyContent: 'center', color: L.blue2 }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: L.blue2 }} />
            Transparent Pricing
          </div>
          <h1 style={{ fontFamily: 'var(--fd)', fontWeight: 800, fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)', letterSpacing: '-0.04em', color: L.t1, marginBottom: 14, lineHeight: 1.07 }}>
            Simple Plans. Real Results.
          </h1>
          <p style={{ color: L.t2, fontSize: '1.0625rem', lineHeight: 1.8, maxWidth: 520, marginInline: 'auto', marginBottom: 36 }}>
            Everything you need to close the visibility, reputation, and conversion gaps — fully managed for you.
          </p>

          {/* Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: 52 }}>
            <div style={{ display: 'flex', background: L.bg2, border: `1px solid ${L.border}`, borderRadius: 100, padding: 4 }}>
              {['Monthly', 'Annual'].map(opt => {
                const isActive = (opt === 'Annual') === annual;
                return (
                  <button key={opt} onClick={() => setAnnual(opt === 'Annual')} style={{
                    padding: '8px 26px', borderRadius: 100, border: 'none',
                    background: isActive ? L.bg : 'transparent',
                    color: isActive ? L.t1 : L.t3,
                    fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '0.8125rem',
                    cursor: 'pointer', transition: 'all 0.2s',
                    boxShadow: isActive ? '0 1px 4px rgba(15,23,42,0.1)' : 'none',
                  }}>{opt}</button>
                );
              })}
            </div>
            {annual && (
              <motion.span initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                style={{ background: L.greenLt, color: L.greenText, fontSize: '0.65rem', fontWeight: 700, padding: '3px 10px', borderRadius: 100 }}>
                Save 20%
              </motion.span>
            )}
          </div>
        </Reveal>
      </section>

      {/* ═══ PLAN CARDS ═══ */}
      <section style={{ padding: '52px 48px 60px', background: L.bg }}>
        <div className="wrap">
          <Stagger>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, alignItems: 'start' }} className="pricing-grid">
              {PLANS.map(plan => (
                <motion.div key={plan.name} whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                  style={{
                    background: L.bg,
                    border: `${plan.featured ? 2 : 1.5}px solid ${plan.featured ? L.blue : L.border}`,
                    borderRadius: 'var(--rxl)', padding: '32px 28px 26px',
                    position: 'relative', display: 'flex', flexDirection: 'column' as const,
                    boxShadow: plan.featured ? '0 8px 40px rgba(27,79,255,0.14)' : '0 1px 4px rgba(15,23,42,0.04)',
                    transform: plan.featured ? 'translateY(-8px)' : 'none',
                    transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.2s',
                  }}>
                  {plan.featured && (
                    <div style={{
                      position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)',
                      background: L.blue, color: '#fff', fontSize: '0.6rem', fontWeight: 800,
                      letterSpacing: '0.1em', textTransform: 'uppercase',
                      padding: '5px 20px', borderRadius: 100, whiteSpace: 'nowrap',
                      boxShadow: '0 2px 10px rgba(27,79,255,0.3)',
                    }}>Most Popular</div>
                  )}

                  <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: plan.featured ? L.blue2 : L.t4, marginBottom: 7 }}>{plan.tier}</div>
                  <div style={{ fontFamily: 'var(--fd)', fontWeight: 800, fontSize: '1.45rem', color: L.t1, letterSpacing: '-0.03em', marginBottom: 5 }}>{plan.name}</div>
                  <p style={{ fontSize: '0.8125rem', color: L.t2, lineHeight: 1.6, marginBottom: 22, minHeight: 42 }}>{plan.tag}</p>

                  {/* Price */}
                  <div style={{ marginBottom: 3 }}>
                    {plan.monthlyPrice ? (
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
                        <span style={{ fontFamily: 'var(--fd)', fontWeight: 800, fontSize: '1.1rem', color: L.t2, paddingTop: 7 }}>$</span>
                        <span style={{ fontFamily: 'var(--fd)', fontWeight: 800, fontSize: '3.2rem', color: L.t1, letterSpacing: '-0.05em', lineHeight: 1 }}>
                          {annual ? plan.annualPrice : plan.monthlyPrice}
                        </span>
                        <span style={{ fontSize: '0.8125rem', color: L.t4, marginLeft: 3 }}>/mo</span>
                      </div>
                    ) : (
                      <div style={{ fontFamily: 'var(--fd)', fontWeight: 800, fontSize: '2.8rem', letterSpacing: '-0.04em', color: L.t1 }}>Custom</div>
                    )}
                    <div style={{ fontSize: '0.74rem', color: L.t4, marginBottom: 3, minHeight: 18 }}>
                      {annual && plan.annualPrice ? 'Billed annually' : plan.monthlyPrice ? 'Billed monthly' : 'Scoped to your business'}
                    </div>
                    <div style={{ fontSize: '0.74rem', fontWeight: 600, color: L.greenText, marginBottom: 20, minHeight: 18 }}>
                      {annual && plan.annualSave ? `Save ${plan.annualSave}` : ''}
                    </div>
                  </div>

                  <div style={{ height: 1, background: L.border, margin: '4px 0 18px' }} />

                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 26, flex: 1 }}>
                    {plan.features.map((f, fi) => (
                      <li key={fi} style={{ display: 'flex', alignItems: 'flex-start', gap: 9, fontSize: '0.8125rem', color: f.included ? L.t2 : L.t4, lineHeight: 1.5 }}>
                        <span style={{
                          width: 17, height: 17, borderRadius: 5, flexShrink: 0,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: f.included ? '0.65rem' : '0.85rem', fontWeight: 800,
                          background: f.included ? L.greenLt : L.bg2,
                          color: f.included ? L.greenText : L.t4, marginTop: 1,
                        }}>{f.included ? '✓' : '—'}</span>
                        {f.label}
                      </li>
                    ))}
                  </ul>

                  <button onClick={() => navigate('/audit')} style={{
                    display: 'block', width: '100%', padding: '13px 20px',
                    borderRadius: 'var(--rd)', fontFamily: 'var(--fd)', fontSize: '0.9375rem',
                    fontWeight: 800, textAlign: 'center', cursor: 'pointer',
                    letterSpacing: '-0.01em', transition: 'all 0.2s',
                    border: plan.ctaPrimary ? 'none' : `1.5px solid ${L.border}`,
                    background: plan.ctaPrimary ? L.blue : L.bg2,
                    color: plan.ctaPrimary ? '#fff' : L.t1,
                    boxShadow: plan.ctaPrimary ? '0 4px 16px rgba(27,79,255,0.28)' : 'none',
                  }}>{plan.cta}</button>
                  <p style={{ fontSize: '0.68rem', color: plan.noteGreen ? L.greenText : L.t4, textAlign: 'center', marginTop: 9, lineHeight: 1.5, fontWeight: plan.noteGreen ? 600 : 400 }}>{plan.note}</p>
                </motion.div>
              ))}
            </div>
          </Stagger>

          {/* Trust strip */}
          <Reveal delay={0.2}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px 40px', marginTop: 32, paddingTop: 28, borderTop: `1px solid ${L.border}` }}>
              {['🔒 No long-term contracts', '⚡ Setup in 5–7 business days', '🇺🇸 US-based support team', '✓ Cancel anytime, no penalties'].map(item => (
                <span key={item} style={{ fontSize: '0.8rem', color: L.t3 }}>{item}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ COMPARISON TABLE ═══ */}
      <section style={{ background: L.bg2, padding: '64px 48px', borderTop: `1px solid ${L.border}` }}>
        <div className="wrap">
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 44 }}>
              <div className="section-label" style={{ justifyContent: 'center', color: L.blue2 }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: L.blue2 }} />
                Full Comparison
              </div>
              <h2 style={{ fontFamily: 'var(--fd)', fontWeight: 800, fontSize: 'clamp(1.75rem, 3vw, 2.4rem)', letterSpacing: '-0.04em', color: L.t1, lineHeight: 1.07 }}>
                What's Included in Each Plan
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, background: L.bg, borderRadius: 'var(--rl)', overflow: 'hidden', boxShadow: '0 2px 16px rgba(15,23,42,0.06)', fontSize: '0.875rem' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '16px 20px', color: L.t3, fontWeight: 500, fontSize: '0.74rem', borderBottom: `2px solid ${L.border}`, width: '38%' }}>Feature</th>
                    <th style={{ textAlign: 'center', padding: '16px 20px', fontFamily: 'var(--fd)', fontWeight: 800, fontSize: '0.8125rem', color: L.t1, borderBottom: `2px solid ${L.border}` }}>Visibility</th>
                    <th style={{ textAlign: 'center', padding: '16px 20px', fontFamily: 'var(--fd)', fontWeight: 800, fontSize: '0.8125rem', color: L.blue, background: L.blueLt, borderBottom: `2px solid ${L.border}` }}>Growth</th>
                    <th style={{ textAlign: 'center', padding: '16px 20px', fontFamily: 'var(--fd)', fontWeight: 800, fontSize: '0.8125rem', color: L.t1, borderBottom: `2px solid ${L.border}` }}>Dominate</th>
                  </tr>
                </thead>
                <tbody>
                  {TABLE_ROWS.map(section => (
                    <React.Fragment key={section.group}>
                      <tr>
                        <td colSpan={4} style={{ padding: '12px 20px 5px', fontSize: '0.58rem', fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', color: L.t4, background: L.bg2, borderTop: `1px solid ${L.border}` }}>
                          {section.group}
                        </td>
                      </tr>
                      {section.rows.map((row, ri) => (
                        <tr key={ri}>
                          <td style={{ padding: '11px 20px', color: L.t1, fontWeight: 500, borderBottom: `1px solid ${L.border}` }}>{row.feat}</td>
                          <td style={{ padding: '11px 20px', textAlign: 'center', borderBottom: `1px solid ${L.border}` }}><CellIcon val={row.v} /></td>
                          <td style={{ padding: '11px 20px', textAlign: 'center', background: 'rgba(27,79,255,0.03)', borderBottom: `1px solid ${L.border}` }}><CellIcon val={row.g} /></td>
                          <td style={{ padding: '11px 20px', textAlign: 'center', borderBottom: `1px solid ${L.border}` }}><CellIcon val={row.d} /></td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ ADD-ONS ═══ */}
      <section style={{ background: L.bg, padding: '64px 48px', borderTop: `1px solid ${L.border}` }}>
        <div className="wrap">
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 44 }}>
              <div className="section-label" style={{ justifyContent: 'center', color: L.blue2 }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: L.blue2 }} />
                Optional Add-Ons
              </div>
              <h2 style={{ fontFamily: 'var(--fd)', fontWeight: 800, fontSize: 'clamp(1.75rem, 3vw, 2.4rem)', letterSpacing: '-0.04em', color: L.t1, lineHeight: 1.07 }}>
                Build Your Own Stack
              </h2>
              <p style={{ color: L.t2, marginTop: 12 }}>Add individual modules to any plan. Pay only for what you need.</p>
            </div>
          </Reveal>
          <Stagger>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }} className="addons-grid">
              {[
                { icon: '📍', name: 'Additional Location', tag: 'Multi-location coverage', body: 'Full eighty5.OS for each additional business location — separate GBP, reviews AI, Voice AI, and reporting.', price: '$297', per: '/mo per location' },
                { icon: '✍️', name: 'Content Accelerator', tag: '4× content output', body: 'Daily GBP posts, expanded FAQ library, blog articles, and monthly AI search authority pieces to dominate answer engines.', price: '$197', per: '/mo' },
                { icon: '🔁', name: 'Re-engagement Campaigns', tag: 'Reactivate past customers', body: 'Automated past-customer outreach, seasonal campaigns, win-back sequences, and referral triggers to re-monetize your list.', price: '$147', per: '/mo' },
              ].map(addon => (
                <motion.div key={addon.name} whileHover={{ y: -2 }} transition={{ duration: 0.2 }}
                  style={{ background: L.bg2, border: `1.5px solid ${L.border}`, borderRadius: 'var(--rl)', padding: '26px 24px', transition: 'all 0.2s' }}>
                  <div style={{ fontSize: '1.25rem', marginBottom: 13 }}>{addon.icon}</div>
                  <div style={{ fontFamily: 'var(--fd)', fontWeight: 800, fontSize: '0.975rem', color: L.t1, marginBottom: 3, letterSpacing: '-0.02em' }}>{addon.name}</div>
                  <div style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: L.blue2, marginBottom: 9 }}>{addon.tag}</div>
                  <p style={{ fontSize: '0.8125rem', color: L.t2, lineHeight: 1.75, marginBottom: 16 }}>{addon.body}</p>
                  <div style={{ fontFamily: 'var(--fd)', fontWeight: 800, fontSize: '1.1rem', color: L.t1 }}>
                    {addon.price}<span style={{ fontSize: '0.78rem', color: L.t4, fontWeight: 400 }}>{addon.per}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </Stagger>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section style={{ background: L.bg2, padding: '64px 48px', borderTop: `1px solid ${L.border}` }}>
        <div style={{ maxWidth: 780, marginInline: 'auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 44 }}>
              <div className="section-label" style={{ justifyContent: 'center', color: L.blue2 }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: L.blue2 }} />
                Frequently Asked Questions
              </div>
              <h2 style={{ fontFamily: 'var(--fd)', fontWeight: 800, fontSize: 'clamp(1.75rem, 3vw, 2.4rem)', letterSpacing: '-0.04em', color: L.t1, lineHeight: 1.07 }}>
                Pricing Questions
              </h2>
            </div>
          </Reveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {FAQS.map((faq, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <div style={{ border: `1px solid ${L.border}`, borderRadius: 'var(--rd)', overflow: 'hidden', background: L.bg, transition: 'border-color 0.2s' }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{
                    width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '18px 22px', background: 'none', border: 'none', color: L.t1,
                    textAlign: 'left', cursor: 'pointer', fontFamily: 'var(--fd)',
                    fontWeight: 700, fontSize: '0.9375rem', letterSpacing: '-0.015em', gap: 16,
                  }}>
                    {faq.q}
                    <motion.span animate={{ rotate: openFaq === i ? 45 : 0 }} transition={{ duration: 0.2 }}
                      style={{ fontSize: '1.25rem', flexShrink: 0, color: L.blue2, fontWeight: 300 }}>+</motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: 'easeInOut' }}
                        style={{ overflow: 'hidden' }}>
                        <p style={{ padding: '0 22px 18px', color: L.t2, fontSize: '0.875rem', lineHeight: 1.8 }}>{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section style={{ background: 'var(--bg1)', padding: 'clamp(60px, 8vw, 100px) 48px' }}>
        <div className="wrap">
          <Reveal>
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ fontFamily: 'var(--fd)', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.04em', color: 'var(--t1)', marginBottom: 14 }}>
                Ready to Close All Three Gaps?
              </h2>
              <p style={{ color: 'var(--t3)', lineHeight: 1.65, marginBottom: 32, fontSize: '1.0625rem', maxWidth: '45ch', marginInline: 'auto' }}>
                Start your trial today. No contracts, no setup fees. Most businesses are live in under a week.
              </p>
              <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                <button onClick={() => navigate('/audit')} className="btn btn-primary">Start Your Trial Today →</button>
                <button className="btn btn-ghost">Book a Strategy Call</button>
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--t4)', marginTop: 20 }}>Free audit included · No credit card required to get started</p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};
