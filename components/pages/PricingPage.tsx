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
  if (val === true) return <span style={{ color: 'var(--gap1)', fontWeight: 700 }}>✓</span>;
  if (val === false) return <span style={{ color: 'var(--t4)' }}>—</span>;
  return <span style={{ color: 'var(--gap2)', fontSize: '0.8125rem', fontWeight: 600 }}>{val}</span>;
};

export const PricingPage: React.FC = () => {
  const [annual, setAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div style={{ paddingTop: 'var(--nav-h)' }}>
      {/* Hero */}
      <section className="section" style={{ textAlign: 'center', paddingBottom: 0 }}>
        <Reveal>
          <div className="section-label" style={{ justifyContent: 'center' }}>Transparent Pricing</div>
          <h1 style={{ fontFamily: 'var(--fd)', fontWeight: 900, fontSize: 'clamp(2.5rem, 5vw, 3.75rem)', letterSpacing: '-0.04em', marginBottom: 16 }}>
            Simple Plans. Real Results.
          </h1>
          <p style={{ color: 'var(--t3)', fontSize: '1.0625rem', lineHeight: 1.65, maxWidth: '50ch', marginInline: 'auto', marginBottom: 36 }}>
            Everything you need to close the visibility, reputation, and conversion gaps — fully managed for you.
          </p>
          {/* Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 12 }}>
            <div style={{
              display: 'flex',
              background: 'var(--bg1)',
              border: '1px solid var(--border)',
              borderRadius: 9999,
              padding: 4,
            }}>
              {['Monthly', 'Annual'].map(opt => {
                const isActive = (opt === 'Annual') === annual;
                return (
                  <button
                    key={opt}
                    onClick={() => setAnnual(opt === 'Annual')}
                    style={{
                      padding: '8px 22px',
                      borderRadius: 9999,
                      border: 'none',
                      background: isActive ? 'var(--blue)' : 'transparent',
                      color: isActive ? '#fff' : 'var(--t3)',
                      fontFamily: 'var(--fd)',
                      fontWeight: 700,
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            {annual && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                style={{
                  background: 'var(--gap1-lt)',
                  border: '1px solid var(--gap1-border)',
                  color: 'var(--gap1)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '4px 12px',
                  borderRadius: 9999,
                }}
              >
                Save 20%
              </motion.span>
            )}
          </div>
        </Reveal>
      </section>

      {/* Cards */}
      <section className="section" style={{ paddingTop: 48 }}>
        <div className="wrap">
          <Stagger>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, alignItems: 'start' }}>
              {PLANS.map((plan, i) => (
                <motion.div
                  key={plan.name}
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                  style={{
                    background: plan.featured ? 'var(--bg1)' : 'var(--bg1)',
                    border: `${plan.featured ? 2 : 1.5}px solid ${plan.featured ? 'var(--blue)' : 'var(--border)'}`,
                    borderRadius: 'var(--rdxl)',
                    padding: 32,
                    position: 'relative',
                    boxShadow: plan.featured ? '0 0 0 1px var(--blue)20, 0 24px 64px rgba(27,79,255,0.12)' : 'none',
                  }}
                >
                  {plan.featured && (
                    <div style={{
                      position: 'absolute',
                      top: -1,
                      left: '50%',
                      transform: 'translateX(-50%) translateY(-50%)',
                      background: 'var(--blue)',
                      color: '#fff',
                      fontSize: '0.6875rem',
                      fontWeight: 800,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      padding: '5px 16px',
                      borderRadius: 9999,
                    }}>
                      Most Popular
                    </div>
                  )}

                  <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--t4)', marginBottom: 4 }}>{plan.tier}</div>
                  <div style={{ fontFamily: 'var(--fd)', fontWeight: 900, fontSize: '1.75rem', letterSpacing: '-0.04em', marginBottom: 8 }}>{plan.name}</div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--t3)', lineHeight: 1.55, marginBottom: 24 }}>{plan.tag}</p>

                  {/* Price */}
                  <div style={{ marginBottom: 8 }}>
                    {plan.monthlyPrice ? (
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                        <span style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--t2)' }}>$</span>
                        <span style={{ fontFamily: 'var(--fd)', fontWeight: 900, fontSize: '3rem', letterSpacing: '-0.05em' }}>
                          {annual ? plan.annualPrice : plan.monthlyPrice}
                        </span>
                        <span style={{ color: 'var(--t3)', fontSize: '0.9rem' }}>/mo</span>
                      </div>
                    ) : (
                      <div style={{ fontFamily: 'var(--fd)', fontWeight: 900, fontSize: '2.5rem', letterSpacing: '-0.04em' }}>Custom</div>
                    )}
                    <div style={{ fontSize: '0.8rem', color: 'var(--t3)', marginTop: 4, minHeight: 20 }}>
                      {annual && plan.annualPrice ? `Billed annually · ${plan.annualSave} vs monthly` : plan.monthlyPrice ? 'Billed monthly' : 'Scoped to your business'}
                    </div>
                  </div>

                  <div style={{ borderTop: '1px solid var(--border)', margin: '20px 0' }} />

                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
                    {plan.features.map((f, fi) => (
                      <li key={fi} style={{ display: 'flex', gap: 10, fontSize: '0.875rem', color: f.included ? 'var(--t2)' : 'var(--t4)' }}>
                        <span style={{ flexShrink: 0, fontWeight: 700, color: f.included ? 'var(--gap1)' : 'var(--t4)' }}>
                          {f.included ? '✓' : '—'}
                        </span>
                        {f.label}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => navigate('#/audit')}
                    className={`btn ${plan.ctaPrimary ? 'btn-primary' : 'btn-ghost'}`}
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    {plan.cta}
                  </button>
                  <p style={{ fontSize: '0.75rem', color: plan.noteGreen ? 'var(--gap1)' : 'var(--t4)', textAlign: 'center', marginTop: 12, lineHeight: 1.5 }}>
                    {plan.note}
                  </p>
                </motion.div>
              ))}
            </div>
          </Stagger>

          {/* Trust strip */}
          <Reveal delay={0.2}>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '12px 32px',
              marginTop: 40,
            }}>
              {['🔒 No long-term contracts', '⚡ Setup in 5–7 business days', '🇺🇸 US-based support team', '✓ Cancel anytime, no penalties'].map(item => (
                <span key={item} style={{ fontSize: '0.875rem', color: 'var(--t3)' }}>{item}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section" style={{ background: 'var(--bg1)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="wrap">
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div className="section-label" style={{ justifyContent: 'center' }}>Full Comparison</div>
              <h2 style={{ fontFamily: 'var(--fd)', fontWeight: 900, fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', letterSpacing: '-0.04em' }}>
                What's Included in Each Plan
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border)' }}>
                    <th style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--t3)', fontWeight: 600, width: '40%' }}>Feature</th>
                    <th style={{ textAlign: 'center', padding: '12px 16px', color: 'var(--t2)', fontWeight: 800, fontFamily: 'var(--fd)' }}>Visibility</th>
                    <th style={{ textAlign: 'center', padding: '12px 16px', color: 'var(--blue3)', fontWeight: 800, fontFamily: 'var(--fd)', background: 'rgba(27,79,255,0.06)' }}>Growth</th>
                    <th style={{ textAlign: 'center', padding: '12px 16px', color: 'var(--t2)', fontWeight: 800, fontFamily: 'var(--fd)' }}>Dominate</th>
                  </tr>
                </thead>
                <tbody>
                  {TABLE_ROWS.map(section => (
                    <React.Fragment key={section.group}>
                      <tr style={{ background: 'var(--bg2)' }}>
                        <td colSpan={4} style={{ padding: '10px 16px', fontSize: '0.6875rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--t4)' }}>
                          {section.group}
                        </td>
                      </tr>
                      {section.rows.map((row, ri) => (
                        <tr key={ri} style={{ borderBottom: '1px solid var(--border)' }}>
                          <td style={{ padding: '11px 16px', color: 'var(--t2)' }}>{row.feat}</td>
                          <td style={{ padding: '11px 16px', textAlign: 'center' }}><CellIcon val={row.v} /></td>
                          <td style={{ padding: '11px 16px', textAlign: 'center', background: 'rgba(27,79,255,0.04)' }}><CellIcon val={row.g} /></td>
                          <td style={{ padding: '11px 16px', textAlign: 'center' }}><CellIcon val={row.d} /></td>
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

      {/* Add-ons */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div className="section-label" style={{ justifyContent: 'center' }}>Optional Add-Ons</div>
              <h2 style={{ fontFamily: 'var(--fd)', fontWeight: 900, fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', letterSpacing: '-0.04em' }}>
                Build Your Own Stack
              </h2>
              <p style={{ color: 'var(--t3)', marginTop: 12 }}>Add individual modules to any plan. Pay only for what you need.</p>
            </div>
          </Reveal>
          <Stagger>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
              {[
                { icon: '📍', name: 'Additional Location', tag: 'Multi-location coverage', body: 'Full eighty5.OS for each additional business location — separate GBP, reviews AI, Voice AI, and reporting.', price: '$297 /mo per location' },
                { icon: '✍️', name: 'Content Accelerator', tag: '4× content output', body: 'Daily GBP posts, expanded FAQ library, blog articles, and monthly AI search authority pieces to dominate answer engines.', price: '$197 /mo' },
                { icon: '🔁', name: 'Re-engagement Campaigns', tag: 'Reactivate past customers', body: 'Automated past-customer outreach, seasonal campaigns, win-back sequences, and referral triggers to re-monetize your list.', price: '$147 /mo' },
              ].map(addon => (
                <div key={addon.name} style={{
                  background: 'var(--bg1)',
                  border: '1.5px solid var(--border)',
                  borderRadius: 'var(--rdl)',
                  padding: 28,
                }}>
                  <div style={{ fontSize: '1.75rem', marginBottom: 14 }}>{addon.icon}</div>
                  <div style={{ fontFamily: 'var(--fd)', fontWeight: 800, fontSize: '1.0625rem', marginBottom: 6 }}>{addon.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--blue3)', fontWeight: 600, marginBottom: 12 }}>{addon.tag}</div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--t3)', lineHeight: 1.65, marginBottom: 16 }}>{addon.body}</p>
                  <div style={{ fontFamily: 'var(--fd)', fontWeight: 900, fontSize: '1.25rem', color: 'var(--t1)' }}>{addon.price}</div>
                </div>
              ))}
            </div>
          </Stagger>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{ background: 'var(--bg1)', borderTop: '1px solid var(--border)' }}>
        <div className="wrap" style={{ maxWidth: 720, marginInline: 'auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div className="section-label" style={{ justifyContent: 'center' }}>FAQ</div>
              <h2 style={{ fontFamily: 'var(--fd)', fontWeight: 900, fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', letterSpacing: '-0.04em' }}>
                Pricing Questions
              </h2>
            </div>
          </Reveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {FAQS.map((faq, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <div style={{
                  background: 'var(--bg2)',
                  border: '1.5px solid var(--border)',
                  borderRadius: 'var(--rd)',
                  overflow: 'hidden',
                }}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '16px 20px',
                      background: 'none',
                      border: 'none',
                      color: 'var(--t1)',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontFamily: 'var(--fd)',
                      fontWeight: 700,
                      fontSize: '0.9375rem',
                    }}
                  >
                    {faq.q}
                    <motion.span
                      animate={{ rotate: openFaq === i ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ fontSize: '1.25rem', flexShrink: 0, marginLeft: 12, color: 'var(--t3)' }}
                    >
                      +
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        style={{ overflow: 'hidden' }}
                      >
                        <p style={{ padding: '0 20px 18px', color: 'var(--t3)', fontSize: '0.9rem', lineHeight: 1.7 }}>{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <div style={{
              background: 'linear-gradient(135deg, var(--bg2) 0%, rgba(27,79,255,0.08) 100%)',
              border: '1.5px solid var(--blue-border)',
              borderRadius: 'var(--rdxl)',
              padding: 'clamp(40px, 6vw, 72px)',
              textAlign: 'center',
            }}>
              <h2 style={{ fontFamily: 'var(--fd)', fontWeight: 900, fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.04em', marginBottom: 16 }}>
                Ready to Close All Three Gaps?
              </h2>
              <p style={{ color: 'var(--t3)', lineHeight: 1.65, marginBottom: 32, fontSize: '1.0625rem', maxWidth: '45ch', marginInline: 'auto' }}>
                Start your trial today. No contracts, no setup fees. Most businesses are live in under a week.
              </p>
              <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                <button onClick={() => navigate('#/audit')} className="btn btn-primary">Start Your Trial Today →</button>
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
