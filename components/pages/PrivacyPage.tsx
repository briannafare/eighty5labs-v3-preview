import React from 'react';
import { navigate } from '../../router';

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 style={{ fontSize: 'clamp(1.125rem, 2vw, 1.375rem)', fontWeight: 800, letterSpacing: '-0.02em', color: '#111', marginTop: 40, marginBottom: 16 }}>{children}</h2>
);

const SubSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div style={{ marginTop: 24 }}>
    <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, color: '#111', marginBottom: 12 }}>{title}</h3>
    {children}
  </div>
);

const p: React.CSSProperties = { color: '#52525b', lineHeight: 1.7, marginBottom: 12 };
const ul: React.CSSProperties = { paddingLeft: 24, color: '#52525b', lineHeight: 1.7, marginBottom: 12 };
const link: React.CSSProperties = { color: '#f36421', textDecoration: 'none' };

export const PrivacyPage: React.FC = () => (
  <div style={{ minHeight: '100vh', background: '#fbfbfa', padding: '64px 16px 96px' }}>
    <div style={{ maxWidth: 768, marginInline: 'auto' }}>

      {/* Header */}
      <div style={{ marginBottom: 48 }}>
        <a href="#/" onClick={e => { e.preventDefault(); navigate('#/'); }} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: '1.125rem', fontWeight: 700, color: '#111', textDecoration: 'none', marginBottom: 32 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L1 21h22L12 2z"/></svg>
          eighty5labs
        </a>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, letterSpacing: '-0.05em', color: '#111', marginBottom: 16 }}>Privacy Policy</h1>
        <p style={{ fontSize: '0.875rem', color: '#71717a', fontWeight: 500 }}>Last Updated: January 28, 2026</p>
      </div>

      {/* Content Card */}
      <div style={{ background: 'white', borderRadius: 16, border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', padding: 'clamp(32px, 5vw, 48px)' }}>

        <p style={p}>
          Eighty5 Labs, a DBA of Aida LLC ("we," "us," "our," or "Company"), is committed to protecting your privacy and ensuring you have a positive experience on our website and services. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website eighty5labs.com (the "Website") and use our services, including SMS/text messaging services.
        </p>
        <p style={p}>
          Please read this Privacy Policy carefully. If you do not agree with our policies and practices, please do not use our Website or Services.
        </p>

        <SectionTitle>1. Information We Collect</SectionTitle>

        <SubSection title="1.1 Information You Provide Directly">
          <p style={p}>We collect information you voluntarily provide to us, including but not limited to:</p>
          <ul style={ul}>
            <li><strong>Contact Information:</strong> Name, email address, phone number, mailing address, company name, and job title</li>
            <li><strong>Account Information:</strong> Username, password, account preferences</li>
            <li><strong>SMS/Text Messaging Data:</strong> Mobile phone number when you opt in to receive text messages</li>
            <li><strong>Communication Information:</strong> Messages, inquiries, feedback, and correspondence you send us</li>
            <li><strong>Payment Information:</strong> Billing address, payment method details (processed securely by third-party payment processors)</li>
            <li><strong>Website Activity:</strong> Information you provide through forms, surveys, or other interactive features</li>
          </ul>
        </SubSection>

        <SubSection title="1.2 Information Collected Automatically">
          <p style={p}>When you visit our Website, we automatically collect certain technical information:</p>
          <ul style={ul}>
            <li><strong>Device Information:</strong> Browser type, operating system, device type, and unique device identifiers</li>
            <li><strong>Access Information:</strong> IP address, pages viewed, time spent on pages, referring URL, search terms</li>
            <li><strong>Cookies and Tracking:</strong> We use cookies, web beacons, and similar technologies to track your browsing behavior and improve your experience</li>
            <li><strong>Analytics Data:</strong> Information collected through Google Analytics and similar tools to understand how you use our Website</li>
          </ul>
        </SubSection>

        <SubSection title="1.3 Information from Third Parties">
          <p style={p}>We may receive information about you from third parties, including:</p>
          <ul style={ul}>
            <li>Service providers who assist us in delivering our services</li>
            <li>Advertising partners and data brokers (with your consent where required)</li>
            <li>Publicly available sources</li>
            <li>Social media platforms (if you connect your social account)</li>
          </ul>
        </SubSection>

        <SectionTitle>2. How We Use Your Information</SectionTitle>
        <p style={p}>We use the information we collect for the following purposes:</p>
        <ul style={ul}>
          <li><strong>Service Delivery:</strong> To provide, operate, and improve our Website and Services</li>
          <li><strong>SMS/Text Messaging:</strong> To send you SMS/text messages to which you have opted in (marketing updates, promotional offers, alerts, transactional messages, customer service)</li>
          <li><strong>Communication:</strong> To respond to your inquiries, provide customer support, and send administrative information</li>
          <li><strong>Marketing:</strong> To send marketing communications, newsletters, and promotional offers (only to users who have opted in)</li>
          <li><strong>Compliance:</strong> To comply with legal obligations, enforce our Terms &amp; Conditions, and protect our rights</li>
          <li><strong>Analytics:</strong> To analyze user behavior, improve our Website, and conduct market research</li>
          <li><strong>Fraud Prevention:</strong> To detect, prevent, and address fraud, security, and technical issues</li>
          <li><strong>Personalization:</strong> To customize your experience and deliver content tailored to your interests</li>
          <li><strong>Legal Obligations:</strong> To comply with court orders, regulatory requirements, and law enforcement requests</li>
        </ul>

        <SectionTitle>3. Sharing and Disclosure of Information</SectionTitle>

        <SubSection title="3.1 How We Share Your Information">
          <p style={{ ...p, fontWeight: 600 }}>
            We are committed to protecting your privacy. <strong>We will NOT share your mobile contact information with third parties or affiliates for marketing or promotional purposes.</strong>
          </p>
          <p style={p}>However, we may share your information in the following limited circumstances:</p>
          <p style={p}><strong>Service Providers:</strong> We share information with third-party service providers who assist us in operating our Website and delivering our Services, including:</p>
          <ul style={ul}>
            <li>Cloud hosting and storage providers</li>
            <li>Payment processors</li>
            <li>SMS/text messaging platform providers</li>
            <li>Email service providers</li>
            <li>Analytics providers</li>
            <li>Customer relationship management (CRM) platforms</li>
          </ul>
          <p style={p}>All service providers are contractually obligated to use your information only for the purposes we specify and to maintain the confidentiality of your information.</p>
          <p style={p}><strong>Legal Requirements:</strong> We may disclose your information when required by law, including:</p>
          <ul style={ul}>
            <li>Court orders or legal process</li>
            <li>Government or law enforcement requests</li>
            <li>Regulatory compliance</li>
            <li>Protection of our legal rights or the rights of others</li>
          </ul>
          <p style={p}><strong>Business Transfers:</strong> If Eighty5 Labs (Aida LLC) is involved in a merger, acquisition, bankruptcy, or sale of assets, your information may be transferred as part of that transaction. You will be notified of any such change and any choices you may have regarding your information.</p>
          <p style={p}><strong>With Your Consent:</strong> We may share your information with third parties if you explicitly consent to such sharing.</p>
        </SubSection>

        <SubSection title="3.2 Non-Sharing Clause">
          <div style={{ background: '#fef3ed', border: '1px solid rgba(243,100,33,0.2)', borderRadius: 8, padding: 20, marginBottom: 16 }}>
            <p style={{ color: '#111', fontWeight: 700, marginBottom: 8 }}>Non-Sharing Clause</p>
            <p style={{ color: '#3f3f46', lineHeight: 1.7, margin: 0 }}>
              No mobile information will be shared with third parties/affiliates for marketing/promotional purposes. Information sharing with subcontractors in support services, such as customer service, is permitted. All other use case categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties.
            </p>
          </div>
        </SubSection>

        <SectionTitle>4. SMS/Text Messaging Terms</SectionTitle>

        <SubSection title="4.1 Opt-In Consent">
          <p style={p}>When you provide your mobile phone number and opt in to receive text messages from Eighty5 Labs, you are providing express written consent to receive SMS/text messages at that phone number.</p>
          <p style={p}>By opting in, you agree to:</p>
          <ul style={ul}>
            <li>Receive text messages regarding marketing updates, promotional offers, alerts, and customer service communications</li>
            <li>Allow us to use your phone number to send you messages related to your account and our services</li>
          </ul>
          <p style={{ ...p, fontWeight: 500 }}>Your consent is voluntary and is NOT a condition of purchasing any goods or services from us.</p>
        </SubSection>

        <SubSection title="4.2 Message Frequency and Content">
          <p style={p}>The frequency of text messages will vary based on your interactions with our services and the types of messages you opt in to receive. You may receive:</p>
          <ul style={ul}>
            <li>Marketing and promotional messages</li>
            <li>Service notifications and alerts</li>
            <li>Transactional messages (order confirmations, account updates)</li>
            <li>Customer support and informational messages</li>
          </ul>
        </SubSection>

        <SubSection title="4.3 Message and Data Rates">
          <div style={{ background: '#fafafa', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 8, padding: 16 }}>
            <p style={{ color: '#3f3f46', fontWeight: 600, marginBottom: 8 }}>
              IMPORTANT: Message and data rates may apply. Your wireless carrier may charge you standard messaging rates for each text message you send or receive.
            </p>
            <p style={{ color: '#52525b', lineHeight: 1.7, margin: 0 }}>
              We are not responsible for any charges your wireless carrier may impose. Please contact your wireless carrier if you have questions about your rate plan.
            </p>
          </div>
        </SubSection>

        <SubSection title="4.4 How to Opt Out">
          <p style={p}>You can stop receiving text messages from Eighty5 Labs at any time:</p>
          <ul style={ul}>
            <li><strong>Text "STOP" to any message:</strong> Reply "STOP" to any text message you receive from us. You will receive a confirmation text, and we will remove your number from our messaging list.</li>
            <li><strong>Contact Us:</strong> Email <a href="mailto:bri@eighty5labs.com" style={link}>bri@eighty5labs.com</a> or call <a href="tel:5037043755" style={link}>503-704-3755</a> to request opt-out.</li>
          </ul>
          <p style={p}>After you opt out, we will no longer send you marketing text messages. However, we may continue to send you transactional messages related to your account, orders, or customer service.</p>
        </SubSection>

        <SubSection title="4.5 Help and Support">
          <p style={p}><strong>Text "HELP" to any message:</strong> Reply "HELP" to any text message from us to receive more information about our text messaging service.</p>
          <p style={p}>For additional support, contact us at:</p>
          <ul style={{ ...ul, listStyle: 'none', paddingLeft: 0 }}>
            <li>Email: <a href="mailto:bri@eighty5labs.com" style={link}>bri@eighty5labs.com</a></li>
            <li>Phone: <a href="tel:5037043755" style={link}>503-704-3755</a></li>
          </ul>
        </SubSection>

        <SectionTitle>5. Data Security</SectionTitle>
        <p style={p}>We implement comprehensive security measures to protect your information from unauthorized access, alteration, disclosure, or destruction, including:</p>
        <ul style={ul}>
          <li>SSL/TLS encryption for data in transit</li>
          <li>Secure password protection and authentication</li>
          <li>Access controls limiting who can view sensitive data</li>
          <li>Regular security audits and vulnerability assessments</li>
          <li>Compliance with industry security standards</li>
        </ul>
        <p style={p}><strong>However, please note:</strong> No method of transmission over the Internet or electronic storage is completely secure. While we strive to protect your information using reasonable security measures, we cannot guarantee absolute security.</p>

        <SectionTitle>6. Data Retention</SectionTitle>
        <p style={p}>We retain your information for as long as necessary to provide our Services and comply with legal obligations:</p>
        <ul style={ul}>
          <li><strong>SMS Opt-In Records:</strong> Retained for a minimum of 4–5 years to comply with FCC and TCPA regulations</li>
          <li><strong>Account Information:</strong> Retained while your account is active</li>
          <li><strong>Marketing Communications:</strong> Retained until you opt out</li>
          <li><strong>Legal/Compliance Records:</strong> Retained as required by law</li>
        </ul>
        <p style={p}>You may request deletion of your information by contacting us at <a href="mailto:bri@eighty5labs.com" style={link}>bri@eighty5labs.com</a>, subject to legal retention requirements.</p>

        <SectionTitle>7. Your Rights and Choices</SectionTitle>

        <SubSection title="7.1 Access and Correction">
          <p style={p}>You have the right to:</p>
          <ul style={ul}>
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your information (subject to legal obligations)</li>
          </ul>
        </SubSection>

        <SubSection title="7.2 Opt-Out Options">
          <ul style={ul}>
            <li><strong>SMS Messages:</strong> Reply "STOP" to any text message or contact us</li>
            <li><strong>Marketing Emails:</strong> Click the unsubscribe link in any email or contact us</li>
            <li><strong>Cookies/Tracking:</strong> Adjust your browser settings to disable cookies (note: this may affect Website functionality)</li>
            <li><strong>Do Not Track:</strong> If your browser supports Do Not Track signals, we honor them where technically feasible</li>
          </ul>
        </SubSection>

        <SubSection title="7.3 California Privacy Rights (CCPA)">
          <p style={p}>If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA):</p>
          <ul style={ul}>
            <li>Right to know what personal information is collected</li>
            <li>Right to delete personal information</li>
            <li>Right to opt out of the "sale" of personal information</li>
            <li>Right to non-discrimination for exercising your privacy rights</li>
          </ul>
          <p style={p}>To exercise these rights, contact us at <a href="mailto:bri@eighty5labs.com" style={link}>bri@eighty5labs.com</a>.</p>
        </SubSection>

        <SectionTitle>8. Third-Party Links and Services</SectionTitle>
        <p style={p}>Our Website may contain links to third-party websites and services. This Privacy Policy applies only to eighty5labs.com. We are not responsible for the privacy practices of third-party websites. Please review their privacy policies before providing any personal information.</p>

        <SectionTitle>9. Children's Privacy</SectionTitle>
        <p style={p}>Our Website and Services are not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected information from a child under 13, we will delete such information immediately.</p>

        <SectionTitle>10. International Users</SectionTitle>
        <p style={p}>Our Website is based in the United States and is subject to U.S. laws. If you access our Website from outside the U.S., you acknowledge that your information will be transferred to, stored in, and processed in the United States. By using our Website, you consent to this transfer and processing.</p>

        <SectionTitle>11. Changes to This Privacy Policy</SectionTitle>
        <p style={p}>We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of any material changes by updating the "Last Updated" date and posting the revised policy on our Website.</p>
        <p style={p}>Your continued use of our Website following the posting of a revised Privacy Policy means you accept and agree to the changes.</p>

        <SectionTitle>12. Contact Us</SectionTitle>
        <p style={p}>If you have questions about this Privacy Policy, our privacy practices, or wish to exercise your privacy rights, please contact us:</p>
        <div style={{ background: '#fafafa', borderRadius: 8, padding: 24, border: '1px solid rgba(0,0,0,0.06)' }}>
          <p style={{ fontWeight: 700, color: '#111', marginBottom: 8 }}>Eighty5 Labs (Aida LLC)</p>
          <ul style={{ ...ul, listStyle: 'none', paddingLeft: 0, marginBottom: 0 }}>
            <li>Email: <a href="mailto:bri@eighty5labs.com" style={link}>bri@eighty5labs.com</a></li>
            <li>Phone: <a href="tel:5037043755" style={link}>503-704-3755</a></li>
            <li>Website: <a href="https://eighty5labs.com" style={link}>https://eighty5labs.com</a></li>
          </ul>
        </div>

      </div>

      {/* Back to Home */}
      <div style={{ marginTop: 32, textAlign: 'center' }}>
        <a href="#/" onClick={e => { e.preventDefault(); navigate('#/'); }} style={{
          display: 'inline-block', background: '#111', color: 'white',
          padding: '12px 32px', borderRadius: 100, fontSize: '0.875rem', fontWeight: 600,
          textDecoration: 'none',
        }}>
          Return to Homepage
        </a>
      </div>

    </div>
  </div>
);

export default PrivacyPage;
