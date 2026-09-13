import React from 'react';
import { navigate } from '../../router';

// Same booking calendar AuditPage.tsx uses
const CALENDAR_URL = 'https://links.eighty5labs.com/widget/booking/tGnOLWYqBS5uUqmO801w';

const CLOSER_PDF = '/files/closer-6LlwzwiM_M5v.pdf';
const LEAD_KIT_PDF = '/files/lead-kit-8mu5JxXj96P1.pdf';

/* Light tokens, same as WorkPage */
const L = {
  bg: '#FFFFFF',
  border: '#DDE5F2',
  t1: '#0F172A', t2: '#334155',
  blue: '#1B4FFF',
};

const Shell: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div style={{ background: L.bg, paddingTop: 'calc(var(--nav-h) + 64px)', minHeight: '70vh' }}>
    <div className="wrap" style={{ paddingBottom: 96 }}>
      <h1 style={{
        fontFamily: 'var(--fd)', fontWeight: 800, color: L.t1,
        fontSize: 'clamp(2rem, 4.5vw, 3rem)', maxWidth: 720,
      }}>
        {title}
      </h1>
      <div className="start-prose" style={{ marginTop: 24, fontSize: '1.05rem', lineHeight: 1.7, color: L.t2, maxWidth: 640 }}>
        {children}
      </div>
    </div>
  </div>
);

const StartLink: React.FC = () => (
  <a
    href="/start"
    onClick={e => { e.preventDefault(); navigate('/start'); }}
    style={{ color: L.blue, fontWeight: 600, textDecoration: 'none' }}
  >
    eighty5labs.com/start
  </a>
);

const DownloadButton: React.FC<{ href: string }> = ({ href }) => (
  <p>
    <a href={href} className="btn btn-primary">
      Download the PDF
    </a>
  </p>
);

export const StartThanksPage: React.FC = () => (
  <Shell title="You're in. Here's what happens next.">
    <p>
      The next thing you'll see is an email from me, Bri, with the two or three things I need to start. For most of these jobs that's a user login to your GoHighLevel and a few questions about how you want to sound. Reply to that email with the answers and the delivery clock starts from your purchase, so the sooner they come back the more of that window I get to use.
    </p>
    <p>
      If you'd rather talk it through first, book fifteen minutes with me here:{' '}
      <a
        href={CALENDAR_URL}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: L.blue, fontWeight: 600, textDecoration: 'none' }}
      >
        book a 15-minute call
      </a>
      .
    </p>
    <p>
      Your card statement will show EIGHTY5LABS. If anything looks off, reply to the receipt and it comes straight to me.
    </p>
  </Shell>
);

export const CloserThanksPage: React.FC = () => (
  <Shell title="Your copy of The AI Real Estate Closer">
    <DownloadButton href={CLOSER_PDF} />
    <p>Save it somewhere you'll find it again. This page is the only place the link lives.</p>
    <p>
      Fill in the six slots before you paste anything. An empty slot is where an AI starts inventing. This prompt is written to skip rather than guess, so it needs your team name, your market, and who a warm lead gets handed to before it can do its job. Then run the test the PDF describes before you point it at a real person.
    </p>
    <p>
      If you'd rather have it installed for you, with the reply, stop, bounce and stalled-deal guardrails around it, that's the 24-Hour Lead Responder at <StartLink />. $297, done inside a day.
    </p>
  </Shell>
);

export const LeadKitThanksPage: React.FC = () => (
  <Shell title="Your copy of Never Let a Lead Go Cold">
    <DownloadButton href={LEAD_KIT_PDF} />
    <p>Save it somewhere you'll find it again. This page is the only place the link lives.</p>
    <p>
      Read the guardrails before the prompt. The prompt is the half you could already get free, and the four workflows are the half worth your Saturday. Two of them have no customer-facing words in them at all, so you can build those two tonight.
    </p>
    <p>
      If you'd rather I install the whole thing in your account, that's the 24-Hour Lead Responder at <StartLink />. $297, done inside a day, with a five-minute Loom of where everything lives.
    </p>
  </Shell>
);

export default StartThanksPage;
