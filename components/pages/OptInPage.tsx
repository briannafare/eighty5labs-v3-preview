import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { navigate } from '../../router';

export const OptInPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    marketingConsent: false,
    nonMarketingConsent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.fullName.trim() || !formData.email.trim()) {
      setError('Please enter your name and email.');
      return;
    }

    setIsSubmitting(true);

    try {
      const webhookUrl = 'https://services.leadconnectorhq.com/hooks/n21oYUwglqe3bTsxL2RS/webhook-trigger/94bbb4c3-cab5-4aef-98f3-754b9e225ae8';

      const tags = ['sms-optin'];
      if (formData.marketingConsent) tags.push('marketing-consent');
      if (formData.nonMarketingConsent) tags.push('transactional-consent');

      const nameParts = formData.fullName.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: formData.fullName,
          first_name: firstName,
          last_name: lastName,
          email: formData.email,
          phone: formData.phone,
          marketing_consent: formData.marketingConsent,
          transactional_consent: formData.nonMarketingConsent,
          consent_timestamp: new Date().toISOString(),
          source: 'sms-optin-form',
          tags,
        }),
      });

      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('There was an error submitting your information. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 14px',
    borderRadius: 8,
    border: '1px solid #DDE5F2',
    background: '#F7F9FF',
    fontSize: '0.875rem',
    color: '#0F172A',
    outline: 'none',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: 600,
    color: '#0F172A',
    marginBottom: 6,
  };

  if (submitted) {
    return (
      <div style={{ minHeight: '100vh', background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div style={{ maxWidth: 480, width: '100%', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div style={{
              width: 64, height: 64, borderRadius: '50%',
              background: 'rgba(16,185,129,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px',
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgb(16,185,129)" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0F172A', marginBottom: 10 }}>You're Subscribed!</h2>
            <p style={{ color: '#334155', fontSize: '0.875rem', marginBottom: 18, lineHeight: 1.6 }}>
              Thank you for signing up. You'll start receiving text messages from Aida LLC.
            </p>
            <div style={{ background: 'var(--surface)', borderRadius: 8, padding: '12px 16px', fontSize: '0.875rem', color: '#334155', maxWidth: 280, margin: '0 auto 24px' }}>
              <p style={{ fontWeight: 700, marginBottom: 4 }}>Remember:</p>
              <p>Reply <strong>STOP</strong> to opt out anytime</p>
              <p>Reply <strong>HELP</strong> for assistance</p>
            </div>
            <a href="#/" onClick={e => { e.preventDefault(); navigate('#/'); }} style={{ fontSize: '0.875rem', fontWeight: 600, color: '#4F8EF7', textDecoration: 'none' }}>
              Return to Homepage
            </a>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#FFFFFF', padding: 'calc(var(--nav-h) + 32px) 16px 64px' }}>
      <div style={{ maxWidth: 560, marginInline: 'auto' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <a href="#/" onClick={e => { e.preventDefault(); navigate('#/'); }} style={{
            fontFamily: 'var(--fd)',
            fontSize: '1.125rem', fontWeight: 900, color: '#0F172A', textDecoration: 'none',
            letterSpacing: '-0.04em',
          }}>
            eighty<span style={{ color: '#4F8EF7' }}>5</span>labs
          </a>
        </div>

        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <h1 style={{ fontSize: 'clamp(1.375rem, 3.5vw, 2rem)', fontWeight: 900, letterSpacing: '-0.03em', color: '#0F172A', marginBottom: 10 }}>
            Aida LLC &ndash; Appointment Updates &amp; SMS Alerts
          </h1>
          <p style={{ fontSize: '0.875rem', color: '#334155', lineHeight: 1.65, maxWidth: '50ch', marginInline: 'auto' }}>
            Aida LLC. Use this form to join the Aida LLC SMS program for updates related to our services.
          </p>
        </div>

        {/* Form Card */}
        <div style={{
          background: '#F7F9FF',
          borderRadius: 16,
          border: '1px solid #DDE5F2',
          boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
          padding: 'clamp(24px, 4vw, 36px)',
        }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            <div>
              <label htmlFor="fullName" style={labelStyle}>Full Name</label>
              <input
                id="fullName"
                type="text"
                required
                value={formData.fullName}
                onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Type your full name"
                style={inputStyle}
              />
            </div>

            <div>
              <label htmlFor="email" style={labelStyle}>Email*</label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter your email"
                style={inputStyle}
              />
            </div>

            <div>
              <label htmlFor="phone" style={labelStyle}>Phone Number</label>
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Enter your phone number here"
                style={inputStyle}
              />
            </div>

            {/* Marketing Consent */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <input
                id="marketingConsent"
                type="checkbox"
                checked={formData.marketingConsent}
                onChange={e => setFormData({ ...formData, marketingConsent: e.target.checked })}
                style={{ marginTop: 3, width: 16, height: 16, flexShrink: 0, accentColor: '#f36421' }}
              />
              <label htmlFor="marketingConsent" style={{ fontSize: '0.875rem', color: '#3f3f46', lineHeight: 1.65, cursor: 'pointer' }}>
                I consent to receive marketing and promotional text messages from Aida LLC, DBA eighty5lab, at the phone number provided via SMS, which include special offers, discounts, and new product updates, among others. Message frequency may vary. Message &amp; data rates may apply. Text HELP for assistance, reply STOP to opt out.
              </label>
            </div>

            {/* Non-Marketing Consent */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <input
                id="nonMarketingConsent"
                type="checkbox"
                checked={formData.nonMarketingConsent}
                onChange={e => setFormData({ ...formData, nonMarketingConsent: e.target.checked })}
                style={{ marginTop: 3, width: 16, height: 16, flexShrink: 0, accentColor: '#f36421' }}
              />
              <label htmlFor="nonMarketingConsent" style={{ fontSize: '0.875rem', color: '#3f3f46', lineHeight: 1.65, cursor: 'pointer' }}>
                I consent to receive non-marketing text messages from Aida LLC, DBA eighty5lab, which may include account updates, service alerts, and support-related communications. Message frequency may vary. Message &amp; data rates may apply. Text HELP for assistance, reply STOP to opt out.
              </label>
            </div>

            {/* Terms & Privacy */}
            <div style={{ fontSize: '0.875rem' }}>
              <a href="#/terms" onClick={e => { e.preventDefault(); navigate('#/terms'); }} style={{ color: '#4F8EF7', fontWeight: 500, textDecoration: 'none' }}>
                Terms of Service
              </a>
              {' '}&amp;{' '}
              <a href="#/privacy" onClick={e => { e.preventDefault(); navigate('#/privacy'); }} style={{ color: '#4F8EF7', fontWeight: 500, textDecoration: 'none' }}>
                Privacy Policy
              </a>
            </div>

            {error && (
              <div style={{ padding: '10px 14px', borderRadius: 8, background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', fontSize: '0.875rem' }}>
                {error}
              </div>
            )}

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              style={{
                width: '100%',
                background: '#f36421',
                color: 'white',
                border: 'none',
                borderRadius: 8,
                padding: '12px',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                opacity: isSubmitting ? 0.6 : 1,
                fontFamily: 'inherit',
              }}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </motion.button>
          </form>
        </div>

        {/* Contact Info */}
        <div style={{ marginTop: 24, textAlign: 'center', fontSize: '0.875rem', color: '#64748B' }}>
          <p style={{ fontWeight: 700, color: '#0F172A', marginBottom: 4 }}>Aida LLC</p>
          <p>
            Email:{' '}
            <a href="mailto:bri@eighty5labs.com" style={{ color: '#4F8EF7', textDecoration: 'none' }}>bri@eighty5labs.com</a>
            {' '}|{' '}
            Phone:{' '}
            <a href="tel:5037043755" style={{ color: '#4F8EF7', textDecoration: 'none' }}>503-704-3755</a>
          </p>
        </div>

      </div>
    </div>
  );
};

export default OptInPage;
