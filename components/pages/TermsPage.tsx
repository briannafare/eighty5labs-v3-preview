import React from 'react';
import { Reveal } from '../ui/Reveal';

const SECTIONS = [
  { id: 'acceptance', title: '1. Acceptance of Terms', content: 'By accessing or using eighty5labs services, you agree to these Terms of Service. If you do not agree, do not use our services. These terms constitute a legally binding agreement between you and AIda, LLC dba eighty5labs.' },
  { id: 'services', title: '2. Services Description', content: 'eighty5labs provides AI-powered marketing automation services including Voice AI, Reviews AI, Content AI, Conversation AI, and Workflow AI systems for local service businesses. Specific services are outlined in your service agreement or subscription plan.' },
  { id: 'accounts', title: '3. Accounts and Subscriptions', content: 'You are responsible for maintaining confidentiality of your account credentials. Subscriptions are billed monthly or annually per your selected plan. Annual subscriptions receive a prorated refund for unused months upon cancellation with 30 days notice.' },
  { id: 'payment', title: '4. Payment Terms', content: 'Payment is due at the start of each billing cycle. We accept major credit cards and ACH. Past-due accounts may be suspended after 10 days. No setup fees on Starter or Growth plans unless otherwise agreed.' },
  { id: 'cancellation', title: '5. Cancellation Policy', content: 'Cancel anytime with 30 days written notice. No penalties or cancellation fees. Your GBP optimizations, content, and reviews collected during your subscription remain yours. Voice AI configurations are removed upon cancellation.' },
  { id: 'ip', title: '6. Intellectual Property', content: 'eighty5labs retains ownership of its proprietary AI systems, workflows, and software. Content created specifically for your business (GBP posts, FAQ pages, review responses) is yours to keep. You may not resell or white-label our services without prior written agreement.' },
  { id: 'prohibited', title: '7. Prohibited Uses', content: 'You may not use our services for illegal activities, spam, deceptive practices, harassment, or any purpose that violates applicable laws. You may not attempt to reverse engineer, copy, or resell our systems or methodologies.' },
  { id: 'warranties', title: '8. Disclaimer of Warranties', content: 'Services are provided "as is." We make no guarantee of specific rankings, review counts, or revenue outcomes. Marketing results depend on many factors outside our control including market conditions, competition, and algorithm changes.' },
  { id: 'liability', title: '9. Limitation of Liability', content: 'eighty5labs\' total liability for any claims shall not exceed the amount paid in the three months preceding the claim. We are not liable for indirect, incidental, or consequential damages.' },
  { id: 'indemnification', title: '10. Indemnification', content: 'You agree to indemnify eighty5labs against claims arising from your use of the services, your content, your violation of these terms, or your violation of any rights of a third party.' },
  { id: 'sms-terms', title: '11. SMS Terms', content: 'By opting into SMS communications, you agree to receive automated text messages from eighty5labs. Message frequency varies. Message and data rates may apply. Reply STOP to cancel, HELP for assistance. Carriers are not liable for delayed or undelivered messages.' },
  { id: 'governing', title: '12. Governing Law', content: 'These terms are governed by the laws of the State of Oregon, without regard to conflict of law principles. Any disputes shall be resolved in courts located in Multnomah County, Oregon.' },
  { id: 'changes', title: '13. Changes to Terms', content: 'We may update these terms with 30 days notice. Continued use after notice constitutes acceptance. Material changes will be communicated via email.' },
  { id: 'contact', title: '14. Contact', content: 'AIda, LLC dba eighty5labs · hello@eighty5labs.com · Portland, Oregon 97201' },
];

export const TermsPage: React.FC = () => (
  <div style={{ paddingTop: 'var(--nav-h)' }}>
    <section style={{ padding: 'clamp(40px, 6vw, 72px) 0', textAlign: 'center', borderBottom: '1px solid var(--border)' }}>
      <div className="wrap">
        <Reveal>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--t4)', marginBottom: 12 }}>Legal · AIda LLC dba eighty5labs</div>
          <h1 style={{ fontFamily: 'var(--fd)', fontWeight: 900, fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.04em', marginBottom: 12 }}>Terms & Conditions</h1>
          <div style={{ fontSize: '0.875rem', color: 'var(--t3)' }}>Last Updated: February 25, 2026</div>
        </Reveal>
      </div>
    </section>

    <section style={{ padding: 'clamp(40px, 6vw, 72px) 0' }}>
      <div className="wrap" style={{ maxWidth: 760, marginInline: 'auto' }}>
        <Reveal>
          <p style={{ color: 'var(--t3)', lineHeight: 1.75, marginBottom: 40, fontSize: '0.9375rem', background: 'var(--bg1)', border: '1px solid var(--border)', borderRadius: 'var(--rd)', padding: '16px 20px' }}>
            Please read these Terms of Service carefully before using eighty5labs. By using our services, you accept these terms in full.
          </p>
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
