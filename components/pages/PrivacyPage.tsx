import React from 'react';
import { Reveal } from '../ui/Reveal';

const HIGHLIGHTS = [
  { id: 'collect', icon: '🔒', title: 'We only collect what we need', body: 'If you book a call, request an audit, or become a client, we\'ll ask for basic business contact information. We don\'t collect sensitive personal data.' },
  { id: 'nosell', icon: '🚫', title: 'We never sell your information', body: 'We do not sell, rent, trade, or monetize your personal data — ever. Information is only shared with tools required to run our services.' },
  { id: 'sms', icon: '💬', title: 'Text messages are optional', body: 'If you opt-in, we may send reminders or updates. You can stop messages anytime by replying STOP. No hoops, no tricks.' },
  { id: 'control', icon: '🎛️', title: 'You stay in control', body: 'Request to see, update, or delete your information at any time. Just email hello@eighty5labs.com.' },
  { id: 'tracking', icon: '📊', title: 'We use tracking responsibly', body: 'We use analytics to understand what helps people — not to spy on you. We don\'t build shadow profiles or sell behavioral data.' },
  { id: 'security', icon: '🛡️', title: 'Security matters to us', body: 'We use industry-standard security practices and secure infrastructure. Protecting your data is part of the service — not an afterthought.' },
];

const SECTIONS = [
  { id: 'intro', title: '1. Introduction', content: 'AIda, LLC dba eighty5labs ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our services, or engage with us in any capacity. By accessing or using our services, you agree to this Privacy Policy.' },
  { id: 'collect', title: '2. Information We Collect', content: 'We collect personal information you voluntarily provide (name, email, phone, company name) when you schedule a demo, subscribe to communications, or contact us. We also automatically collect device information, IP address, pages visited, and interaction data. We use cookies including Google Analytics, Meta Pixel, and essential cookies.' },
  { id: 'use', title: '3. How We Use Your Information', content: 'We use collected data to provide and improve services, manage demos and consultations, communicate updates and promotions, personalize your experience, analyze website usage, prevent fraud, comply with legal obligations, and deliver targeted advertising.' },
  { id: 'share', title: '4. Information Sharing', content: 'We may share information with service providers, advertising partners, legal authorities if required, and business transfer parties. We do NOT sell your personal information — ever.' },
  { id: 'sms', title: '5. SMS Communications', content: 'By providing your number and opting in, you consent to receive messages from AIda, LLC dba eighty5labs. We do not sell or share SMS opt-in data. To opt out: reply STOP to any message.' },
  { id: 'cookies', title: '6. Cookies', content: 'Types used: Essential, Analytics (Google Analytics), Advertising (Meta, Google Ads), and Preference cookies. You may disable cookies via your browser settings.' },
  { id: 'security', title: '7. Data Security', content: 'We use encryption, secure hosting, access controls, and monitoring. No internet transmission is 100% secure, but we use commercially reasonable safeguards to protect your data.' },
  { id: 'retention', title: '8. Data Retention', content: 'Data is retained only as long as necessary for the purposes described or as required by law.' },
  { id: 'rights', title: '9. Your Rights', content: 'You may have the right to access, correct, delete, restrict processing, withdraw consent, opt-out of marketing, and request data portability. SMS opt-out: reply STOP. Marketing: use unsubscribe link. Email hello@eighty5labs.com. We respond within 30 days.' },
  { id: 'international', title: '10. International Transfers', content: 'Data may be processed outside your country with appropriate safeguards applied.' },
  { id: 'thirdparty', title: '11. Third-Party Links', content: 'We are not responsible for the privacy practices of third-party websites linked from our site.' },
  { id: 'children', title: "12. Children's Privacy", content: 'Our services are not intended for individuals under 18 years of age.' },
  { id: 'ccpa', title: '13. California Privacy Rights (CCPA)', content: 'California residents may request access to or deletion of their personal information. We do not sell personal data.' },
  { id: 'gdpr', title: '14. European Privacy Rights (GDPR)', content: 'EU/EEA users may access, correct, delete, restrict, or transfer their data and file complaints with relevant supervisory authorities.' },
  { id: 'updates', title: '15. Policy Updates', content: 'Continued use of our services after updates constitutes acceptance of the revised terms.' },
  { id: 'contact', title: '16. Contact', content: 'AIda, LLC dba eighty5labs · hello@eighty5labs.com · Portland, Oregon' },
];

export const PrivacyPage: React.FC = () => (
  <div style={{ paddingTop: 'var(--nav-h)' }}>
    <section style={{ padding: 'clamp(40px, 6vw, 72px) 0', textAlign: 'center', borderBottom: '1px solid var(--border)' }}>
      <div className="wrap">
        <Reveal>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--t4)', marginBottom: 12 }}>Legal · AIda LLC dba eighty5labs</div>
          <h1 style={{ fontFamily: 'var(--fd)', fontWeight: 900, fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.04em', marginBottom: 12 }}>Privacy Policy</h1>
          <div style={{ fontSize: '0.875rem', color: 'var(--t3)' }}>Last Updated: February 25, 2026</div>
        </Reveal>
      </div>
    </section>

    {/* Summary cards */}
    <section style={{ padding: 'clamp(32px, 5vw, 56px) 0', borderBottom: '1px solid var(--border)', background: 'var(--bg1)' }}>
      <div className="wrap">
        <Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            {HIGHLIGHTS.map(h => (
              <div key={h.id} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 'var(--rdl)', padding: '20px' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: 10 }}>{h.icon}</div>
                <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--t1)', marginBottom: 8 }}>{h.title}</div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--t3)', lineHeight: 1.6 }}>{h.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>

    {/* Full text */}
    <section style={{ padding: 'clamp(40px, 6vw, 72px) 0' }}>
      <div className="wrap" style={{ maxWidth: 760, marginInline: 'auto' }}>
        <Reveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {SECTIONS.map(s => (
              <div key={s.id} id={s.id}>
                <h2 style={{ fontFamily: 'var(--fd)', fontWeight: 800, fontSize: '1.125rem', marginBottom: 12, color: 'var(--t1)' }}>{s.title}</h2>
                <p style={{ color: 'var(--t3)', lineHeight: 1.75, fontSize: '0.9375rem' }}>{s.content}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  </div>
);
