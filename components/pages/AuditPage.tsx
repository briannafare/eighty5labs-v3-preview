import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Reveal } from '../ui/Reveal';
import { navigate } from '../../router';

export const AuditPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    businessName: '',
    email: '',
    phone: '',
    website: '',
    industry: '',
    consentSMS: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.firstName.trim()) e.firstName = 'Required';
    if (!form.lastName.trim()) e.lastName = 'Required';
    if (!form.businessName.trim()) e.businessName = 'Required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required';
    if (!/^\+?[\d\s\-().]{10,}$/.test(form.phone)) e.phone = 'Valid phone required';
    if (!form.industry) e.industry = 'Please select your industry';
    if (!form.consentSMS) e.consentSMS = 'SMS consent is required to receive your audit';
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);

    try {
      // GHL webhook — replace URL with real endpoint
      await fetch('https://services.leadconnectorhq.com/hooks/YOUR_HOOK_ID/webhook-trigger/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          name: `${form.firstName} ${form.lastName}`,
          email: form.email,
          phone: form.phone,
          company: form.businessName,
          website: form.website,
          industry: form.industry,
          smsConsent: form.consentSMS,
          source: 'eighty5labs-audit-form',
          timestamp: new Date().toISOString(),
        }),
      }).catch(() => {}); // fail silently for now
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  const set = (field: string, value: string | boolean) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const INDUSTRIES = [
    'HVAC / Home Services', 'Plumbing', 'Electrical',
    'Roofing / Contracting', 'Real Estate', 'Mortgage',
    'Medical / Wellness', 'Dental', 'Legal',
    'Med Spa / Aesthetics', 'Landscaping', 'Other',
  ];

  if (submitted) {
    return (
      <div style={{ paddingTop: 'var(--nav-h)', minHeight: '90vh', display: 'flex', alignItems: 'center' }}>
        <div className="wrap" style={{ textAlign: 'center', maxWidth: 540, marginInline: 'auto' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              background: 'var(--gap1-lt)',
              border: '2px solid var(--gap1-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 28px',
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--gap1)" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h1 style={{ fontFamily: 'var(--fd)', fontWeight: 900, fontSize: '2.25rem', letterSpacing: '-0.04em', marginBottom: 16 }}>
              Your Audit Is Being Built Now.
            </h1>
            <p style={{ color: 'var(--t3)', lineHeight: 1.7, marginBottom: 32, fontSize: '1.0625rem' }}>
              You'll get an email within 48 hours with your full Revenue Gap Report — no fluff, just the gaps and what to fix.
            </p>
            <a href="#/" onClick={e => { e.preventDefault(); navigate('#/'); }} style={{ color: 'var(--blue3)', textDecoration: 'none', fontSize: '0.9375rem' }}>
              ← Back to eighty5labs
            </a>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: 'var(--nav-h)' }}>
      <section className="section">
        <div className="wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 60, alignItems: 'start' }}>
          {/* Left — Value prop */}
          <Reveal>
            <div className="section-label">Free Revenue Audit</div>
            <h1 style={{
              fontFamily: 'var(--fd)',
              fontWeight: 900,
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
              marginBottom: 20,
            }}>
              Find Out Exactly Where You're Bleeding Revenue.
            </h1>
            <p style={{ color: 'var(--t3)', lineHeight: 1.7, marginBottom: 36, fontSize: '1.0625rem' }}>
              Most local businesses lose $8K–$15K/month to three fixable gaps. In 48 hours, you'll know which ones are hitting you — and what to do first.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginBottom: 40 }}>
              {[
                { icon: '🔍', title: 'AI Search Visibility Score', body: 'Are ChatGPT, Gemini, and Perplexity recommending you — or your competition?' },
                { icon: '📍', title: 'Google Maps Position Analysis', body: 'Where do you rank for your highest-value keywords in the Map Pack?' },
                { icon: '⭐', title: 'Reputation Gap Report', body: 'Your review velocity vs. competitors — and what\'s needed to close the gap.' },
                { icon: '📞', title: 'Conversion Leak Estimate', body: 'How many calls are you missing and what\'s that worth annually?' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 16 }}>
                  <span style={{ fontSize: '1.25rem', flexShrink: 0, paddingTop: 2 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '0.9375rem', color: 'var(--t1)', marginBottom: 4 }}>{item.title}</div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--t3)', lineHeight: 1.55 }}>{item.body}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              background: 'var(--bg2)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--rdl)',
              padding: '16px 20px',
              fontSize: '0.8125rem',
              color: 'var(--t3)',
              lineHeight: 1.6,
            }}>
              <strong style={{ color: 'var(--t2)' }}>Promise:</strong> Takes 30 seconds. We do the rest. No consultant will call you trying to close a deal.
            </div>
          </Reveal>

          {/* Right — Form */}
          <Reveal delay={0.15}>
            <div style={{
              background: 'var(--bg1)',
              border: '1.5px solid var(--border)',
              borderRadius: 'var(--rdxl)',
              padding: 'clamp(28px, 4vw, 44px)',
            }}>
              <h2 style={{ fontFamily: 'var(--fd)', fontWeight: 800, fontSize: '1.375rem', letterSpacing: '-0.03em', marginBottom: 28 }}>
                Get Your Free Report
              </h2>

              <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <Field label="First Name" error={errors.firstName}>
                    <input value={form.firstName} onChange={e => set('firstName', e.target.value)} placeholder="Jane" />
                  </Field>
                  <Field label="Last Name" error={errors.lastName}>
                    <input value={form.lastName} onChange={e => set('lastName', e.target.value)} placeholder="Smith" />
                  </Field>
                </div>

                <Field label="Business Name" error={errors.businessName}>
                  <input value={form.businessName} onChange={e => set('businessName', e.target.value)} placeholder="Smith HVAC Services" />
                </Field>

                <Field label="Business Email" error={errors.email}>
                  <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="jane@smithhvac.com" />
                </Field>

                <Field label="Mobile Phone" error={errors.phone}>
                  <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="(555) 000-0000" />
                </Field>

                <Field label="Website (optional)">
                  <input value={form.website} onChange={e => set('website', e.target.value)} placeholder="https://smithhvac.com" />
                </Field>

                <Field label="Industry" error={errors.industry}>
                  <select value={form.industry} onChange={e => set('industry', e.target.value)} style={{ appearance: 'none' }}>
                    <option value="">Select your industry…</option>
                    {INDUSTRIES.map(ind => (
                      <option key={ind} value={ind}>{ind}</option>
                    ))}
                  </select>
                </Field>

                {/* SMS Consent */}
                <div style={{
                  background: 'var(--bg2)',
                  border: `1.5px solid ${errors.consentSMS ? '#ef4444' : 'var(--border)'}`,
                  borderRadius: 'var(--rd)',
                  padding: '16px',
                }}>
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={form.consentSMS}
                      onChange={e => set('consentSMS', e.target.checked)}
                      style={{ marginTop: 2, width: 16, height: 16, accentColor: 'var(--blue)', flexShrink: 0 }}
                    />
                    <span style={{ fontSize: '0.8125rem', color: 'var(--t3)', lineHeight: 1.55 }}>
                      I agree to receive my Revenue Audit report and related follow-up via SMS and email from eighty5labs. Message frequency varies. Reply STOP to opt out. Message and data rates may apply.{' '}
                      <a href="#/terms" onClick={e => { e.preventDefault(); navigate('#/terms'); }} style={{ color: 'var(--blue3)' }}>Terms</a>{' '}·{' '}
                      <a href="#/privacy" onClick={e => { e.preventDefault(); navigate('#/privacy'); }} style={{ color: 'var(--blue3)' }}>Privacy</a>
                    </span>
                  </label>
                  {errors.consentSMS && <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: 8 }}>{errors.consentSMS}</p>}
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center', fontSize: '1rem', padding: '14px 24px', opacity: loading ? 0.7 : 1 }}
                >
                  {loading ? 'Submitting…' : 'Get My Free Revenue Audit →'}
                </motion.button>

                <p style={{ fontSize: '0.75rem', color: 'var(--t4)', textAlign: 'center', lineHeight: 1.55 }}>
                  By submitting you agree to our{' '}
                  <a href="#/privacy" onClick={e => { e.preventDefault(); navigate('#/privacy'); }} style={{ color: 'var(--t3)' }}>Privacy Policy</a>.
                  {' '}We don't sell your data, ever.
                </p>
              </form>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

const Field: React.FC<{ label: string; error?: string; children: React.ReactNode }> = ({ label, error, children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
    <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--t2)' }}>{label}</label>
    <div style={{
      position: 'relative',
    }}>
      {React.cloneElement(children as React.ReactElement, {
        style: {
          width: '100%',
          background: 'var(--bg2)',
          border: `1.5px solid ${error ? '#ef4444' : 'var(--border)'}`,
          borderRadius: 'var(--rd)',
          padding: '10px 14px',
          color: 'var(--t1)',
          fontSize: '0.9375rem',
          fontFamily: 'var(--fb)',
          outline: 'none',
          transition: 'border-color 0.15s',
        },
      })}
    </div>
    {error && <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: 2 }}>{error}</p>}
  </div>
);
