import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navigate } from '../../router';

const BUSINESS_TYPES = [
  'HVAC', 'Plumbing', 'Electrical', 'Roofing / Contractor',
  'Real Estate', 'Mortgage Lending', 'Medical / Wellness / Medspa',
  'Dental', 'Legal', 'Landscaping', 'Other',
];

const WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/n21oYUwglqe3bTsxL2RS/webhook-trigger/93dcdc4a-d6b4-40df-8f8d-9e41336e0cca';

const STEPS = [
  { title: "Let's start with the basics.", sub: 'Just your name and email to kick things off.' },
  { title: 'How do we reach you?', sub: 'Phone + business name so we know who we\'re building this for.' },
  { title: 'What industry are you in?', sub: 'This shapes which gaps we look for and what benchmarks matter.' },
  { title: 'Where are you located?', sub: 'We audit your Map Pack, competitors, and AI search presence in your market.' },
  { title: 'Quick review — then we build.', sub: 'Confirm everything looks right and we\'ll start your audit immediately.' },
];

interface FormData {
  fullName: string; email: string; phone: string; businessName: string;
  companyName: string; website: string; city: string; state: string;
  businessType: string; nicheSpecialty: string; consentSMS: boolean;
}

const iS: React.CSSProperties = {
  width: '100%', background: '#fff', border: '1.5px solid #DDE5F2', borderRadius: 10,
  padding: '13px 16px', color: '#0F172A', fontSize: '0.9375rem', fontFamily: 'var(--fb)',
  outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s',
};
const focusH = {
  onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = '#4F8EF7';
    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(79,142,247,0.12)';
  },
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = '#DDE5F2';
    e.currentTarget.style.boxShadow = 'none';
  },
};
const lS: React.CSSProperties = { fontSize: '0.8125rem', fontWeight: 600, color: '#334155', marginBottom: 6, display: 'block' };
const eS: React.CSSProperties = { fontSize: '0.75rem', color: '#ef4444', marginTop: 4 };

export const AuditPage: React.FC = () => {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState<FormData>({
    fullName: '', email: '', phone: '', businessName: '',
    companyName: '', website: '', city: '', state: '',
    businessType: '', nicheSpecialty: '', consentSMS: false,
  });

  const set = (k: keyof FormData, v: string | boolean) => setForm(p => ({ ...p, [k]: v }));
  const total = STEPS.length;
  const pct = ((step + 1) / total) * 100;

  const validate = (): Record<string, string> => {
    const e: Record<string, string> = {};
    if (step === 0) {
      if (!form.fullName.trim()) e.fullName = 'What should we call you?';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'We need a valid email to send your audit';
    } else if (step === 1) {
      if (!/^\+?[\d\s\-().]{10,}$/.test(form.phone)) e.phone = 'Valid phone number required';
      if (!form.businessName.trim()) e.businessName = 'What\'s the business called?';
    } else if (step === 2) {
      if (!form.businessType) e.businessType = 'Pick the closest match';
    } else if (step === 4) {
      if (!form.consentSMS) e.consentSMS = 'We need your OK to send the audit results';
    }
    return e;
  };

  const next = () => { const e = validate(); if (Object.keys(e).length) { setErrors(e); return; } setErrors({}); setStep(s => Math.min(s + 1, total - 1)); };
  const prev = () => { setErrors({}); setStep(s => Math.max(0, s - 1)); };

  const submit = async () => {
    const e = validate(); if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({}); setLoading(true);
    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: form.fullName, email: form.email, phone: form.phone,
          company_name: form.companyName || form.businessName, business_name: form.businessName,
          website: form.website, city: form.city, state: form.state,
          business_type: form.businessType, niche_specialty: form.nicheSpecialty,
          sms_consent: form.consentSMS, source: 'eighty5labs-visibility-audit',
          timestamp: new Date().toISOString(),
        }),
      }).catch(() => {});
    } finally { setLoading(false); setSubmitted(true); }
  };

  if (submitted) {
    return (
      <div style={{ paddingTop: 'var(--nav-h)', minHeight: '90vh', background: '#fff', display: 'flex', alignItems: 'center' }}>
        <div className="wrap" style={{ textAlign: 'center', maxWidth: 520, marginInline: 'auto' }}>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(132,204,22,0.12)', border: '2px solid rgba(132,204,22,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px' }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#84CC16" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h1 style={{ fontFamily: 'var(--fd)', fontWeight: 900, fontSize: '2.25rem', letterSpacing: '-0.04em', marginBottom: 16, color: '#0F172A' }}>
              Your Audit Is Being Built.
            </h1>
            <p style={{ color: '#64748B', lineHeight: 1.7, marginBottom: 12, fontSize: '1.0625rem' }}>
              We're analyzing your visibility, reputation, and conversion gaps right now.
            </p>
            <p style={{ color: '#64748B', lineHeight: 1.7, marginBottom: 36, fontSize: '0.9375rem' }}>
              Expect your full Visibility Audit in your inbox within <strong style={{ color: '#0F172A' }}>48 hours</strong>.
            </p>
            <a href="#/" onClick={e => { e.preventDefault(); navigate('#/'); }} style={{ color: '#4F8EF7', textDecoration: 'none', fontWeight: 600 }}>← Back to eighty5labs</a>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: '#fff', color: '#0F172A' }}>
      <div style={{ maxWidth: 560, marginInline: 'auto', padding: 'clamp(40px, 6vw, 72px) 24px 60px' }}>

        {/* Progress */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#94A3B8' }}>Step {step + 1} of {total}</span>
            <span style={{ fontFamily: 'var(--fd)', fontWeight: 800, fontSize: '0.75rem', color: '#1B4FFF' }}>{Math.round(pct)}%</span>
          </div>
          <div style={{ height: 6, background: '#EEF2FB', borderRadius: 3, overflow: 'hidden' }}>
            <motion.div animate={{ width: `${pct}%` }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ height: '100%', borderRadius: 3, background: 'linear-gradient(90deg, #1B4FFF, #84CC16)' }} />
          </div>
        </div>

        {/* Header */}
        <AnimatePresence mode="wait">
          <motion.div key={`h-${step}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} style={{ marginBottom: 32 }}>
            <h1 style={{ fontFamily: 'var(--fd)', fontWeight: 900, fontSize: 'clamp(1.5rem, 3vw, 2rem)', letterSpacing: '-0.04em', lineHeight: 1.15, marginBottom: 8 }}>{STEPS[step].title}</h1>
            <p style={{ fontSize: '0.9375rem', color: '#64748B', lineHeight: 1.6 }}>{STEPS[step].sub}</p>
          </motion.div>
        </AnimatePresence>

        {/* Steps */}
        <AnimatePresence mode="wait">
          <motion.div key={`s-${step}`} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}>

            {step === 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div><label style={lS}>Full Name *</label><input value={form.fullName} onChange={e => set('fullName', e.target.value)} placeholder="Jane Smith" style={iS} {...focusH} />{errors.fullName && <p style={eS}>{errors.fullName}</p>}</div>
                <div><label style={lS}>Email *</label><input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="jane@yourbusiness.com" style={iS} {...focusH} />{errors.email && <p style={eS}>{errors.email}</p>}</div>
              </div>
            )}

            {step === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div><label style={lS}>Phone *</label><input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="(555) 000-0000" style={iS} {...focusH} />{errors.phone && <p style={eS}>{errors.phone}</p>}</div>
                <div><label style={lS}>Business Name *</label><input value={form.businessName} onChange={e => set('businessName', e.target.value)} placeholder="Smith HVAC Services" style={iS} {...focusH} />{errors.businessName && <p style={eS}>{errors.businessName}</p>}</div>
              </div>
            )}

            {step === 2 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div>
                  <label style={lS}>Business Type *</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {BUSINESS_TYPES.map(type => {
                      const sel = form.businessType === type;
                      return (
                        <button key={type} type="button" onClick={() => set('businessType', type)} style={{
                          display: 'flex', alignItems: 'center', gap: 12,
                          padding: '11px 16px', borderRadius: 10, cursor: 'pointer',
                          background: sel ? 'rgba(27,79,255,0.06)' : '#fff',
                          border: `1.5px solid ${sel ? '#1B4FFF' : '#DDE5F2'}`,
                          color: sel ? '#1B4FFF' : '#334155',
                          fontFamily: 'var(--fb)', fontSize: '0.9375rem', fontWeight: sel ? 700 : 500,
                          transition: 'all 0.15s', textAlign: 'left',
                        }}>
                          <div style={{
                            width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
                            border: `2px solid ${sel ? '#1B4FFF' : '#C5D0E8'}`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}>{sel && <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#1B4FFF' }} />}</div>
                          {type}
                        </button>
                      );
                    })}
                  </div>
                  {errors.businessType && <p style={eS}>{errors.businessType}</p>}
                </div>
                <div><label style={lS}>Niche Specialty <span style={{ color: '#94A3B8', fontWeight: 400 }}>(optional)</span></label><input value={form.nicheSpecialty} onChange={e => set('nicheSpecialty', e.target.value)} placeholder="e.g. Emergency plumbing, Family law..." style={iS} {...focusH} /></div>
              </div>
            )}

            {step === 3 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div><label style={lS}>Website <span style={{ color: '#94A3B8', fontWeight: 400 }}>(optional)</span></label><input value={form.website} onChange={e => set('website', e.target.value)} placeholder="https://yourbusiness.com" style={iS} {...focusH} /></div>
                <div><label style={lS}>Company Name <span style={{ color: '#94A3B8', fontWeight: 400 }}>(if different from business)</span></label><input value={form.companyName} onChange={e => set('companyName', e.target.value)} placeholder="Smith Holdings LLC" style={iS} {...focusH} /></div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div><label style={lS}>City</label><input value={form.city} onChange={e => set('city', e.target.value)} placeholder="Portland" style={iS} {...focusH} /></div>
                  <div><label style={lS}>State</label><input value={form.state} onChange={e => set('state', e.target.value)} placeholder="Oregon" style={iS} {...focusH} /></div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div style={{ background: '#F7F9FF', border: '1.5px solid #DDE5F2', borderRadius: 14, padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    { l: 'Name', v: form.fullName }, { l: 'Email', v: form.email },
                    { l: 'Phone', v: form.phone }, { l: 'Business', v: form.businessName },
                    { l: 'Industry', v: `${form.businessType}${form.nicheSpecialty ? ` — ${form.nicheSpecialty}` : ''}` },
                    { l: 'Location', v: [form.city, form.state].filter(Boolean).join(', ') || '—' },
                    { l: 'Website', v: form.website || '—' },
                  ].map(r => (
                    <div key={r.l} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
                      <span style={{ fontSize: '0.8125rem', color: '#94A3B8', flexShrink: 0 }}>{r.l}</span>
                      <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0F172A', textAlign: 'right', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.v}</span>
                    </div>
                  ))}
                </div>
                <label style={{
                  display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer',
                  padding: 16, borderRadius: 12,
                  border: `1.5px solid ${errors.consentSMS ? '#ef4444' : form.consentSMS ? '#1B4FFF' : '#DDE5F2'}`,
                  background: form.consentSMS ? 'rgba(27,79,255,0.03)' : '#fff', transition: 'all 0.15s',
                }}>
                  <input type="checkbox" checked={form.consentSMS} onChange={e => set('consentSMS', e.target.checked)} style={{ marginTop: 2, width: 18, height: 18, accentColor: '#1B4FFF', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.8125rem', color: '#64748B', lineHeight: 1.55 }}>
                    I agree to receive my Visibility Audit report and related follow-up via SMS and email from eighty5labs. Reply STOP to opt out.{' '}
                    <a href="#/terms" onClick={e => { e.preventDefault(); navigate('#/terms'); }} style={{ color: '#4F8EF7' }}>Terms</a>{' '}·{' '}
                    <a href="#/privacy" onClick={e => { e.preventDefault(); navigate('#/privacy'); }} style={{ color: '#4F8EF7' }}>Privacy</a>
                  </span>
                </label>
                {errors.consentSMS && <p style={eS}>{errors.consentSMS}</p>}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Nav */}
        <div style={{ display: 'flex', gap: 12, marginTop: 36 }}>
          {step > 0 && (
            <button onClick={prev} style={{
              background: 'transparent', border: '1.5px solid #DDE5F2', borderRadius: 999,
              padding: '12px 24px', fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '0.875rem',
              color: '#64748B', cursor: 'pointer',
            }}>← Back</button>
          )}
          <div style={{ flex: 1 }} />
          {step < total - 1 ? (
            <motion.button onClick={next} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn btn-primary" style={{ padding: '12px 32px', fontSize: '0.9375rem' }}>
              Continue →
            </motion.button>
          ) : (
            <motion.button onClick={submit} disabled={loading} whileHover={{ scale: loading ? 1 : 1.02 }} whileTap={{ scale: loading ? 1 : 0.98 }}
              className="btn btn-primary" style={{ padding: '14px 36px', fontSize: '1rem', opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Building Your Audit…' : 'Get My Free Visibility Audit →'}
            </motion.button>
          )}
        </div>

        <p style={{ fontSize: '0.72rem', color: '#94A3B8', textAlign: 'center', marginTop: 24, lineHeight: 1.55 }}>
          Your data stays private. We don't sell it, ever.
        </p>
      </div>
    </div>
  );
};

export default AuditPage;
