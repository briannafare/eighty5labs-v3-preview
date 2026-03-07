import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navigate } from '../../router';

const BUSINESS_TYPES = [
  'HVAC', 'Plumbing', 'Electrical', 'Roofing / Contractor',
  'Real Estate', 'Mortgage Lending', 'Medical / Wellness / Medspa',
  'Dental', 'Legal', 'Landscaping', 'Other',
];

const WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/n21oYUwglqe3bTsxL2RS/webhook-trigger/93dcdc4a-d6b4-40df-8f8d-9e41336e0cca';
const CALENDAR_URL = 'https://links.eighty5labs.com/widget/booking/tGnOLWYqBS5uUqmO801w';

const STEPS = [
  { title: "Let's start with the basics.", sub: 'Just your name and email to kick things off.' },
  { title: 'How do we reach you?', sub: 'Phone + business name so we know who we\'re building this for.' },
  { title: 'Tell us about your business.', sub: 'Industry, location, and website help us benchmark against your real competitors.' },
  { title: 'Quick review — then we build.', sub: 'Confirm everything looks right and we\'ll start your audit immediately.' },
];

interface FormData {
  fullName: string; email: string; phone: string; businessName: string;
  website: string; city: string; state: string;
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
    website: 'https://', city: '', state: '',
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
    } else if (step === 3) {
      if (!form.consentSMS) e.consentSMS = 'We need your OK to send the audit results';
    }
    return e;
  };

  const next = () => { const e = validate(); if (Object.keys(e).length) { setErrors(e); return; } setErrors({}); setStep(s => Math.min(s + 1, total - 1)); };
  const prev = () => { setErrors({}); setStep(s => Math.max(0, s - 1)); };

  const submit = async () => {
    const e = validate(); if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({}); setLoading(true);
    const cleanWebsite = form.website === 'https://' ? '' : form.website;
    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: form.fullName, email: form.email, phone: form.phone,
          business_name: form.businessName, website: cleanWebsite,
          city: form.city, state: form.state,
          business_type: form.businessType, niche_specialty: form.nicheSpecialty,
          sms_consent: form.consentSMS, source: 'eighty5labs-visibility-audit',
          timestamp: new Date().toISOString(),
        }),
      }).catch(() => {});
    } finally { setLoading(false); setSubmitted(true); }
  };

  /* ── Success screen ── */
  if (submitted) {
    return (
      <div style={{ paddingTop: 'var(--nav-h)', minHeight: '90vh', background: '#fff', display: 'flex', alignItems: 'center' }}>
        <div className="wrap" style={{ maxWidth: 1040, marginInline: 'auto', padding: 'clamp(40px, 6vw, 80px) 24px' }}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px, 5vw, 72px)', alignItems: 'start' }} className="hero-grid"
          >
            {/* LEFT — confirmation */}
            <div>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(132,204,22,0.12)', border: '2px solid rgba(132,204,22,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#84CC16" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <h1 style={{ fontFamily: 'var(--fd)', fontWeight: 800, fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', letterSpacing: '-0.04em', marginBottom: 14, color: '#0F172A', lineHeight: 1.1 }}>
                We're On It.
              </h1>
              <p style={{ color: '#334155', lineHeight: 1.7, marginBottom: 8, fontSize: '1.0625rem' }}>
                Your Visibility Audit is being built right now. Expect it in your inbox <strong>within 1 hour</strong>.
              </p>
              <p style={{ color: '#64748B', lineHeight: 1.7, marginBottom: 28, fontSize: '0.9375rem' }}>
                We're analyzing your Map Pack position, review velocity, AI search visibility, and conversion gaps against your top local competitors.
              </p>
              <a href="/" onClick={e => { e.preventDefault(); navigate('/'); }} style={{ color: '#94A3B8', textDecoration: 'none', fontSize: '0.875rem' }}>
                ← Back to eighty5labs
              </a>
            </div>

            {/* RIGHT — calendar booking */}
            <div style={{
              background: '#F7F9FF', border: '1.5px solid #DDE5F2', borderRadius: 18,
              padding: 'clamp(24px, 3vw, 36px)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: 11, background: 'rgba(27,79,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1B4FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                </div>
                <h3 style={{ fontFamily: 'var(--fd)', fontWeight: 800, fontSize: '1.15rem', color: '#0F172A', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                  Want 10x more value from your audit?
                </h3>
              </div>
              <p style={{ fontSize: '0.9rem', color: '#334155', lineHeight: 1.7, marginBottom: 14 }}>
                Book a free 30-minute strategy call to walk through your results with someone who's already mapped your market. You'll leave with:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
                {[
                  'A prioritized action plan — what to fix first and why',
                  'Competitor intel you can use immediately',
                  'Custom recommendations you can implement yourself or we do for you',
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <div style={{ width: 18, height: 18, borderRadius: 5, background: 'rgba(132,204,22,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#84CC16" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
                    </div>
                    <span style={{ fontSize: '0.875rem', color: '#334155', lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: '0.8125rem', color: '#64748B', lineHeight: 1.6, marginBottom: 22 }}>
                No pitch. No pressure. You walk away with insights and tools you can use regardless of what you decide.
              </p>
              <div style={{ textAlign: 'center' }}>
                <a
                  href={CALENDAR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ display: 'inline-flex', alignItems: 'center', fontSize: '0.9375rem', textDecoration: 'none' }}
                >
                  Book Your Free Strategy Call
                  <span className="btn-arrow-circle">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  /* ── Main quiz ── */
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
            <h1 style={{ fontFamily: 'var(--fd)', fontWeight: 800, fontSize: 'clamp(1.5rem, 3vw, 2rem)', letterSpacing: '-0.04em', lineHeight: 1.15, marginBottom: 8 }}>{STEPS[step].title}</h1>
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
                  <select value={form.businessType} onChange={e => set('businessType', e.target.value)}
                    style={{ ...iS, appearance: 'none', backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'12\' height=\'8\' viewBox=\'0 0 12 8\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M1 1.5L6 6.5L11 1.5\' stroke=\'%2394A3B8\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center', paddingRight: 40 }} {...focusH}>
                    <option value="">Select your industry…</option>
                    {BUSINESS_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  {errors.businessType && <p style={eS}>{errors.businessType}</p>}
                </div>
                <div><label style={lS}>Niche Specialty <span style={{ color: '#94A3B8', fontWeight: 400 }}>(optional)</span></label><input value={form.nicheSpecialty} onChange={e => set('nicheSpecialty', e.target.value)} placeholder="e.g. Emergency plumbing, Family law..." style={iS} {...focusH} /></div>
                <div><label style={lS}>Website <span style={{ color: '#94A3B8', fontWeight: 400 }}>(optional)</span></label><input value={form.website} onChange={e => set('website', e.target.value)} placeholder="https://yourbusiness.com" style={iS} {...focusH} /></div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div><label style={lS}>City</label><input value={form.city} onChange={e => set('city', e.target.value)} placeholder="Portland" style={iS} {...focusH} /></div>
                  <div><label style={lS}>State</label><input value={form.state} onChange={e => set('state', e.target.value)} placeholder="Oregon" style={iS} {...focusH} /></div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div style={{ background: '#F7F9FF', border: '1.5px solid #DDE5F2', borderRadius: 14, padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    { l: 'Name', v: form.fullName }, { l: 'Email', v: form.email },
                    { l: 'Phone', v: form.phone }, { l: 'Business', v: form.businessName },
                    { l: 'Industry', v: `${form.businessType}${form.nicheSpecialty ? ` — ${form.nicheSpecialty}` : ''}` },
                    { l: 'Location', v: [form.city, form.state].filter(Boolean).join(', ') || '—' },
                    { l: 'Website', v: form.website === 'https://' ? '—' : form.website },
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
                    <a href="/terms" onClick={e => { e.preventDefault(); navigate('/terms'); }} style={{ color: '#4F8EF7' }}>Terms</a>{' '}·{' '}
                    <a href="/privacy" onClick={e => { e.preventDefault(); navigate('/privacy'); }} style={{ color: '#4F8EF7' }}>Privacy</a>
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
