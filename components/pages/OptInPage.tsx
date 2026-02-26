import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Reveal } from '../ui/Reveal';
import { navigate } from '../../router';

export const OptInPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ firstName: '', lastName: '', phone: '', email: '', consent: false });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.firstName.trim()) e.firstName = 'Required';
    if (!form.lastName.trim()) e.lastName = 'Required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required';
    if (!/^\+?[\d\s\-().]{10,}$/.test(form.phone)) e.phone = 'Valid US mobile number required';
    if (!form.consent) e.consent = 'You must agree to receive SMS messages';
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    try {
      await fetch('https://services.leadconnectorhq.com/hooks/YOUR_HOOK_ID/webhook-trigger/sms-optin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'sms-optin-page', timestamp: new Date().toISOString() }),
      }).catch(() => {});
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  const set = (field: string, value: string | boolean) => setForm(prev => ({ ...prev, [field]: value }));

  if (submitted) {
    return (
      <div style={{ paddingTop: 'var(--nav-h)', minHeight: '85vh', display: 'flex', alignItems: 'center' }}>
        <div className="wrap" style={{ textAlign: 'center', maxWidth: 480, marginInline: 'auto' }}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div style={{
              width: 64, height: 64, borderRadius: '50%',
              background: 'var(--gap1-lt)', border: '2px solid var(--gap1-border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 24px',
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--gap1)" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h2 style={{ fontFamily: 'var(--fd)', fontWeight: 900, fontSize: '1.75rem', letterSpacing: '-0.03em', marginBottom: 14 }}>You're opted in!</h2>
            <p style={{ color: 'var(--t3)', lineHeight: 1.65, marginBottom: 24 }}>
              You'll receive a confirmation text shortly. Reply STOP at any time to unsubscribe.
            </p>
            <a href="#/" onClick={e => { e.preventDefault(); navigate('#/'); }} style={{ color: 'var(--blue3)', textDecoration: 'none' }}>← Back to eighty5labs</a>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: 'var(--nav-h)', minHeight: '90vh' }}>
      <section className="section">
        <div className="wrap" style={{ maxWidth: 640, marginInline: 'auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <div className="section-label" style={{ justifyContent: 'center' }}>SMS Communications</div>
              <h1 style={{ fontFamily: 'var(--fd)', fontWeight: 900, fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', letterSpacing: '-0.04em', marginBottom: 16 }}>
                Subscribe to SMS Updates from eighty<span style={{ color: 'var(--blue3)' }}>5</span>labs
              </h1>
              <p style={{ color: 'var(--t3)', lineHeight: 1.65, maxWidth: '50ch', marginInline: 'auto' }}>
                Get your free Revenue Audit report, AI search updates, and actionable local marketing tips via text. No spam. Unsubscribe anytime.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div style={{
              background: 'var(--bg1)',
              border: '1.5px solid var(--border)',
              borderRadius: 'var(--rdxl)',
              padding: 'clamp(28px, 4vw, 44px)',
            }}>
              <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <FormField label="First Name" error={errors.firstName}>
                    <input value={form.firstName} onChange={e => set('firstName', e.target.value)} placeholder="Jane" />
                  </FormField>
                  <FormField label="Last Name" error={errors.lastName}>
                    <input value={form.lastName} onChange={e => set('lastName', e.target.value)} placeholder="Smith" />
                  </FormField>
                </div>
                <FormField label="Mobile Phone Number" error={errors.phone}>
                  <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="(555) 000-0000" />
                </FormField>
                <FormField label="Email Address" error={errors.email}>
                  <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="jane@example.com" />
                </FormField>

                {/* A2P Compliant Consent */}
                <div style={{
                  background: 'var(--bg2)',
                  border: `1.5px solid ${errors.consent ? '#ef4444' : 'var(--border)'}`,
                  borderRadius: 'var(--rd)',
                  padding: '18px',
                }}>
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={form.consent}
                      onChange={e => set('consent', e.target.checked)}
                      style={{ marginTop: 3, width: 17, height: 17, accentColor: 'var(--blue)', flexShrink: 0 }}
                    />
                    <span style={{ fontSize: '0.8125rem', color: 'var(--t3)', lineHeight: 1.6 }}>
                      I agree to receive recurring automated marketing text messages (e.g., promotions, updates, audit results)
                      from <strong style={{ color: 'var(--t2)' }}>eighty5labs</strong> at the mobile number provided.
                      Consent is not a condition of purchase. Message frequency varies. Message and data rates may apply.
                      Reply <strong style={{ color: 'var(--t2)' }}>STOP</strong> to cancel.
                      Reply <strong style={{ color: 'var(--t2)' }}>HELP</strong> for help.
                      View our{' '}
                      <a href="#/terms" onClick={e => { e.stopPropagation(); e.preventDefault(); navigate('#/terms'); }} style={{ color: 'var(--blue3)' }}>Terms of Service</a>
                      {' '}and{' '}
                      <a href="#/privacy" onClick={e => { e.stopPropagation(); e.preventDefault(); navigate('#/privacy'); }} style={{ color: 'var(--blue3)' }}>Privacy Policy</a>.
                    </span>
                  </label>
                  {errors.consent && <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: 10 }}>{errors.consent}</p>}
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center', fontSize: '1rem', padding: '14px', opacity: loading ? 0.7 : 1 }}
                >
                  {loading ? 'Subscribing…' : 'Subscribe to SMS Updates'}
                </motion.button>

                <p style={{ fontSize: '0.75rem', color: 'var(--t4)', textAlign: 'center', lineHeight: 1.55 }}>
                  eighty5labs · hello@eighty5labs.com<br />
                  You can opt out at any time by replying STOP. Carriers are not liable for delayed or undelivered messages.
                </p>
              </form>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

const FormField: React.FC<{ label: string; error?: string; children: React.ReactNode }> = ({ label, error, children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
    <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--t2)' }}>{label}</label>
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
      },
    })}
    {error && <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: 2 }}>{error}</p>}
  </div>
);
