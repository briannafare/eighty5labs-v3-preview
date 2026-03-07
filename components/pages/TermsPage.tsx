import React from 'react';
import { navigate } from '../../router';

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 style={{ fontSize: 'clamp(1.125rem, 2vw, 1.375rem)', fontWeight: 800, letterSpacing: '-0.02em', color: '#0F172A', marginTop: 40, marginBottom: 16 }}>{children}</h2>
);

const SubSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div style={{ marginTop: 24 }}>
    <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, color: '#0F172A', marginBottom: 12 }}>{title}</h3>
    {children}
  </div>
);

const p: React.CSSProperties = { color: '#334155', lineHeight: 1.7, marginBottom: 12 };
const ul: React.CSSProperties = { paddingLeft: 24, color: '#334155', lineHeight: 1.7, marginBottom: 12 };
const link: React.CSSProperties = { color: '#4F8EF7', textDecoration: 'none' };

export const TermsPage: React.FC = () => (
  <div style={{ minHeight: '100vh', background: '#FFFFFF', padding: 'calc(var(--nav-h) + 48px) 16px 96px' }}>
    <div style={{ maxWidth: 768, marginInline: 'auto' }}>

      {/* Header */}
      <div style={{ marginBottom: 48 }}>
        <a href="/" onClick={e => { e.preventDefault(); navigate('/'); }} style={{
          display: 'inline-block', fontSize: '0.8125rem', fontWeight: 600,
          color: '#64748B', textDecoration: 'none', marginBottom: 32,
        }}>
          ← Back to eighty<span style={{ color: '#4F8EF7' }}>5</span>labs
        </a>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.05em', color: '#0F172A', marginBottom: 16 }}>Terms and Conditions</h1>
        <p style={{ fontSize: '0.875rem', color: '#64748B', fontWeight: 500 }}>Last Updated: January 28, 2026</p>
      </div>

      {/* Content Card */}
      <div style={{ background: '#F7F9FF', borderRadius: 16, border: '1px solid #DDE5F2', padding: 'clamp(32px, 5vw, 48px)' }}>

        <p style={p}>
          These Terms and Conditions ("Terms," "Agreement," or "T&C") govern your use of the website eighty5labs.com (the "Website") and all services, products, and content offered by Eighty5 Labs, a DBA of Aida LLC ("Company," "we," "us," or "our").
        </p>
        <p style={p}>
          By accessing, browsing, or using our Website and Services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree to these Terms, please do not use our Website or Services.
        </p>

        <SectionTitle>1. Use License</SectionTitle>

        <SubSection title="1.1 Grant of License">
          <p style={p}>Subject to your compliance with these Terms, we grant you a limited, non-exclusive, non-transferable, revocable license to:</p>
          <ul style={ul}>
            <li>Access and view the content on our Website for personal, non-commercial use</li>
            <li>Use our Services in accordance with these Terms and all applicable laws</li>
          </ul>
        </SubSection>

        <SubSection title="1.2 Restrictions on Use">
          <p style={p}>You agree NOT to:</p>
          <ul style={ul}>
            <li>Reproduce, duplicate, copy, or sell any portion of our Website or Services without written permission</li>
            <li>Access or use our Website for any unlawful purpose or in violation of any applicable laws</li>
            <li>Engage in any form of automated data collection (scraping, crawling, bots) without written permission</li>
            <li>Reverse engineer, decompile, or attempt to discover the source code or algorithms of our Services</li>
            <li>Attempt to gain unauthorized access to our systems or networks</li>
            <li>Transmit viruses, malware, or any code of destructive nature</li>
            <li>Harass, abuse, defame, or engage in any form of harassment toward Company or users</li>
            <li>Post spam, commercial solicitations, or unsolicited promotional content</li>
            <li>Impersonate any person or entity</li>
            <li>Interfere with or disrupt the normal operation of our Website or Services</li>
          </ul>
        </SubSection>

        <SectionTitle>2. SMS/Text Messaging Services</SectionTitle>

        <SubSection title="2.1 SMS Services Description">
          <p style={p}>Eighty5 Labs offers opt-in SMS/text messaging services that may include:</p>
          <ul style={ul}>
            <li>Marketing and promotional messages</li>
            <li>Service notifications and alerts</li>
            <li>Transactional messages (order updates, account information)</li>
            <li>Customer support and informational communications</li>
          </ul>
        </SubSection>

        <SubSection title="2.2 Express Written Consent for SMS">
          <p style={p}>By providing your mobile phone number and opting in to receive SMS messages, you provide express written consent to receive text messages from Eighty5 Labs at that phone number.</p>
          <p style={p}>Your consent is:</p>
          <ul style={ul}>
            <li>Voluntary and not a condition of purchasing any products or services</li>
            <li>Specific to SMS/text messaging only</li>
            <li>Separate from any email consent you may provide</li>
            <li>Documented and retained in compliance with FCC and TCPA regulations</li>
          </ul>
        </SubSection>

        <SubSection title="2.3 Opt-In Requirements">
          <ul style={ul}>
            <li>You must be the owner or authorized user of the mobile phone number</li>
            <li>You must be at least 18 years old (or the age of majority in your jurisdiction)</li>
            <li>You must provide clear, affirmative consent before we send any marketing text messages</li>
            <li>Consent checkboxes must be unchecked and optional (not pre-checked)</li>
            <li>You must separately consent to marketing vs. transactional messages if applicable</li>
          </ul>
        </SubSection>

        <SubSection title="2.4 Message Frequency">
          <p style={p}>Message frequency varies based on your interactions and preferences. You may receive:</p>
          <ul style={ul}>
            <li><strong>Marketing and promotional messages:</strong> Variable frequency (typically multiple per week)</li>
            <li><strong>Service alerts and transactional messages:</strong> As needed</li>
            <li><strong>Informational messages:</strong> As determined by your service interactions</li>
          </ul>
        </SubSection>

        <SubSection title="2.5 Message and Data Rates">
          <div style={{ background: 'var(--surface)', border: '1px solid #DDE5F2', borderRadius: 8, padding: 16 }}>
            <p style={{ color: '#334155', fontWeight: 600, marginBottom: 8 }}>
              IMPORTANT NOTICE: Message and data rates may apply. Standard messaging rates charged by your wireless carrier will apply to all SMS messages you send to and receive from us. Eighty5 Labs is not responsible for any charges imposed by your wireless carrier.
            </p>
            <p style={{ color: '#334155', lineHeight: 1.7, margin: 0 }}>
              Please review your wireless carrier's messaging plan to understand potential charges. Contact your carrier if you have questions about your rate plan or messaging costs.
            </p>
          </div>
        </SubSection>

        <SubSection title="2.6 Texting Hours">
          <p style={p}>We will make reasonable efforts to send you text messages during normal business hours (8:00 AM – 9:00 PM in your local time zone). However, we may send transactional or time-sensitive messages outside these hours.</p>
        </SubSection>

        <SubSection title="2.7 How to Opt Out of SMS">
          <p style={p}>You can cancel the SMS service at any time by replying STOP. After sending STOP, you will receive a confirmation message and will no longer receive SMS messages from us. If you wish to rejoin, simply sign up again as you did initially.</p>
        </SubSection>

        <SubSection title="2.8 Help and Support">
          <p style={p}>If you are experiencing issues with the messaging program, reply HELP for assistance or contact us at <a href="mailto:bri@eighty5labs.com" style={link}>bri@eighty5labs.com</a>.</p>
        </SubSection>

        <SubSection title="2.9 Carrier Disclaimer">
          <p style={p}>Carriers are not liable for delayed or undelivered messages.</p>
        </SubSection>

        <SubSection title="2.10 Rates &amp; Frequency Disclosure">
          <p style={p}>Message and data rates may apply. Message frequency may vary. For questions about your text or data plan, please contact your wireless provider.</p>
        </SubSection>

        <SubSection title="2.11 Privacy">
          <p style={p}>If you have any questions regarding privacy, please review our <a href="/privacy" onClick={e => { e.preventDefault(); navigate('/privacy'); }} style={{ ...link, fontWeight: 500 }}>Privacy Policy</a>.</p>
        </SubSection>

        <SectionTitle>3. Intellectual Property Rights</SectionTitle>

        <SubSection title="3.1 Ownership">
          <p style={p}>All content on our Website, including but not limited to text, graphics, logos, images, audio, video, software, and design elements (collectively, "Content"), is the exclusive property of Eighty5 Labs or its licensors.</p>
        </SubSection>

        <SubSection title="3.2 Copyright Protection">
          <p style={p}>The Content is protected by U.S. and international copyright laws. You may not reproduce, distribute, modify, or transmit any Content without our prior written permission.</p>
        </SubSection>

        <SubSection title="3.3 Trademarks">
          <p style={p}>"Eighty5 Labs," "Eighty5," and associated logos are trademarks of Aida LLC. All other trademarks, logos, and brand names are the property of their respective owners. You may not use any trademark without written permission.</p>
        </SubSection>

        <SubSection title="3.4 Limited License for Personal Use">
          <p style={p}>We grant you a limited license to download and print Content for personal, non-commercial use only. This license does not permit:</p>
          <ul style={ul}>
            <li>Commercial use or resale</li>
            <li>Removal of copyright or trademark notices</li>
            <li>Public display or distribution</li>
          </ul>
        </SubSection>

        <SectionTitle>4. User-Generated Content</SectionTitle>

        <SubSection title="4.1 Your Submissions">
          <p style={p}>Any content you submit, post, or upload to our Website or Services ("User Content") must comply with these Terms and all applicable laws.</p>
        </SubSection>

        <SubSection title="4.2 License to User Content">
          <p style={p}>By submitting User Content, you grant Eighty5 Labs a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, publish, distribute, and display your User Content in connection with our Services.</p>
        </SubSection>

        <SubSection title="4.3 Prohibited Content">
          <p style={p}>You agree not to submit User Content that:</p>
          <ul style={ul}>
            <li>Violates any laws or regulations</li>
            <li>Infringes on intellectual property rights</li>
            <li>Contains hate speech, harassment, or abusive language</li>
            <li>Is defamatory, false, or misleading</li>
            <li>Contains spam, commercial solicitations, or promotional material</li>
            <li>Compromises privacy or security of others</li>
            <li>Contains personal identifying information of others without consent</li>
          </ul>
        </SubSection>

        <SubSection title="4.4 Removal of Content">
          <p style={p}>We reserve the right to remove or disable any User Content that violates these Terms without notice or liability.</p>
        </SubSection>

        <SectionTitle>5. Limitation of Liability</SectionTitle>

        <SubSection title="5.1 Disclaimer of Warranties">
          <p style={p}>THE WEBSITE AND SERVICES ARE PROVIDED ON AN "AS-IS" AND "AS-AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND. We specifically disclaim all express and implied warranties, including:</p>
          <ul style={ul}>
            <li>Warranties of merchantability</li>
            <li>Fitness for a particular purpose</li>
            <li>Non-infringement</li>
            <li>Title</li>
            <li>Accuracy or completeness of information</li>
          </ul>
        </SubSection>

        <SubSection title="5.2 Limitation of Damages">
          <p style={p}>TO THE MAXIMUM EXTENT PERMITTED BY LAW:</p>
          <p style={p}>In no event shall Eighty5 Labs, its officers, directors, employees, or agents be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to:</p>
          <ul style={ul}>
            <li>Loss of profits or revenue</li>
            <li>Loss of data or business</li>
            <li>Interruption of service</li>
            <li>Loss of use or enjoyment</li>
            <li>Any damages arising from your use or inability to use our Website or Services</li>
          </ul>
          <p style={p}>Our total liability for any claim arising from your use of the Website or Services shall not exceed the amount you paid us (if any) in the past 12 months.</p>
        </SubSection>

        <SubSection title="5.3 Applicability">
          <p style={p}>These limitations apply even if:</p>
          <ul style={ul}>
            <li>We have been advised of the possibility of damages</li>
            <li>The damages could have been foreseen</li>
            <li>A remedy fails of its essential purpose</li>
          </ul>
        </SubSection>

        <SectionTitle>6. Indemnification</SectionTitle>
        <p style={p}>You agree to indemnify, defend, and hold harmless Eighty5 Labs, its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including reasonable attorney's fees) arising from:</p>
        <ul style={ul}>
          <li>Your use of the Website or Services</li>
          <li>Your violation of these Terms or applicable laws</li>
          <li>Your User Content</li>
          <li>Your infringement of any third-party intellectual property rights</li>
          <li>Any harm to third parties caused by your actions</li>
        </ul>

        <SectionTitle>7. Links to Third-Party Websites</SectionTitle>
        <p style={p}>Our Website may contain links to third-party websites and services. We are not responsible for:</p>
        <ul style={ul}>
          <li>The content, accuracy, or practices of third-party websites</li>
          <li>Any transactions or interactions with third parties</li>
          <li>Privacy practices of external sites</li>
          <li>Any damages or losses resulting from use of third-party sites</li>
        </ul>
        <p style={p}>Your use of third-party websites is governed by their terms and privacy policies. We recommend reviewing their policies before providing any information.</p>

        <SectionTitle>8. Modifications to the Website and Services</SectionTitle>
        <p style={p}>We reserve the right to:</p>
        <ul style={ul}>
          <li>Modify, update, or discontinue any part of the Website or Services without notice</li>
          <li>Change pricing, features, or functionality</li>
          <li>Temporarily suspend access for maintenance or technical reasons</li>
          <li>Permanently terminate the Website or Services</li>
        </ul>
        <p style={p}>We will not be liable for any modifications, suspensions, or discontinuations of our Services.</p>

        <SectionTitle>9. Termination</SectionTitle>

        <SubSection title="9.1 Termination of Your Access">
          <p style={p}>We reserve the right to terminate or suspend your access to our Website or Services, without notice or liability, if you:</p>
          <ul style={ul}>
            <li>Violate these Terms or applicable laws</li>
            <li>Engage in fraudulent or abusive behavior</li>
            <li>Misuse our Services</li>
            <li>Fail to pay for services rendered</li>
            <li>Engage in any conduct we deem harmful</li>
          </ul>
        </SubSection>

        <SubSection title="9.2 Effect of Termination">
          <p style={p}>Upon termination:</p>
          <ul style={ul}>
            <li>Your right to use the Website and Services immediately ceases</li>
            <li>You must destroy any downloaded Content</li>
            <li>Certain provisions survive termination (indemnification, limitation of liability, intellectual property)</li>
          </ul>
        </SubSection>

        <SectionTitle>10. Dispute Resolution and Governing Law</SectionTitle>

        <SubSection title="10.1 Governing Law">
          <p style={p}>These Terms and Conditions are governed by and construed in accordance with the laws of the State of Oregon, without regard to its conflict of law provisions.</p>
        </SubSection>

        <SubSection title="10.2 Jurisdiction and Venue">
          <p style={p}>You agree that any legal action or proceeding arising out of or relating to these Terms or your use of our Website shall be brought exclusively in the state or federal courts located in Multnomah County, Oregon. You consent to the personal jurisdiction and venue of these courts.</p>
        </SubSection>

        <SubSection title="10.3 Dispute Resolution">
          <p style={p}>Before initiating legal action, the parties agree to attempt to resolve disputes through good-faith negotiation. If negotiation fails, disputes may be resolved through:</p>
          <ul style={ul}>
            <li>Mediation</li>
            <li>Arbitration (at our option)</li>
            <li>Court proceedings in Oregon</li>
          </ul>
        </SubSection>

        <SubSection title="10.4 Attorneys' Fees">
          <p style={p}>If either party brings legal action to enforce these Terms, the prevailing party shall be entitled to recover reasonable attorneys' fees and court costs.</p>
        </SubSection>

        <SectionTitle>11. Severability</SectionTitle>
        <p style={p}>If any provision of these Terms is found to be invalid, unlawful, or unenforceable by a court of competent jurisdiction, such provision shall be modified to the minimum extent necessary to make it valid, or if not possible, severed from these Terms. The remaining provisions shall continue in full force and effect.</p>

        <SectionTitle>12. Entire Agreement</SectionTitle>
        <p style={p}>These Terms and Conditions, together with our <a href="/privacy" onClick={e => { e.preventDefault(); navigate('/privacy'); }} style={{ ...link, fontWeight: 500 }}>Privacy Policy</a>, constitute the entire agreement between you and Eighty5 Labs regarding your use of our Website and Services. Any prior agreements, understandings, or representations are superseded by these Terms.</p>

        <SectionTitle>13. Assignment</SectionTitle>
        <p style={p}>You may not assign or transfer these Terms or your rights/obligations hereunder without our written consent. Any unauthorized assignment is void. We may assign these Terms to our successors or affiliates.</p>

        <SectionTitle>14. Waiver</SectionTitle>
        <p style={p}>The failure of Eighty5 Labs to enforce any provision of these Terms does not constitute a waiver of that provision or any other provision. No waiver is effective unless in writing and signed by an authorized representative.</p>

        <SectionTitle>15. Amendments to These Terms</SectionTitle>
        <p style={p}>We may update or modify these Terms and Conditions at any time by posting the revised version on our Website. The "Last Updated" date indicates when these Terms were last revised.</p>
        <p style={p}>Your continued use of the Website and Services following the posting of revised Terms means you accept and agree to the changes. If you do not agree to the modified Terms, please discontinue use of our Website and Services immediately.</p>

        <SectionTitle>16. Contact Us</SectionTitle>
        <p style={p}>If you have questions about these Terms and Conditions, need clarification, or wish to report a violation, please contact us:</p>
        <div style={{ background: 'var(--surface)', borderRadius: 8, padding: 24, border: '1px solid #DDE5F2' }}>
          <p style={{ fontWeight: 700, color: '#0F172A', marginBottom: 8 }}>Eighty5 Labs (Aida LLC)</p>
          <ul style={{ ...ul, listStyle: 'none', paddingLeft: 0, marginBottom: 0 }}>
            <li>Email: <a href="mailto:bri@eighty5labs.com" style={link}>bri@eighty5labs.com</a></li>
            <li>Phone: <a href="tel:5037043755" style={link}>503-704-3755</a></li>
            <li>Website: <a href="https://eighty5labs.com" style={link}>https://eighty5labs.com</a></li>
          </ul>
        </div>

        <p style={{ ...p, marginTop: 32, textAlign: 'center', fontStyle: 'italic' }}>
          Thank you for using Eighty5 Labs. We're committed to providing excellent service and protecting your privacy.
        </p>

      </div>

      {/* Footer links */}
      <div style={{ marginTop: 32, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <a href="/privacy" onClick={e => { e.preventDefault(); navigate('/privacy'); }} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.875rem', fontWeight: 600, color: '#4F8EF7', textDecoration: 'none' }}>
          View our Privacy Policy
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
        <a href="/" onClick={e => { e.preventDefault(); navigate('/'); }} style={{
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

export default TermsPage;
