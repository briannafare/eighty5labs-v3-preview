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

// Copy: ~/brain/strategy/quick-cash-2026-09-12/copy/start-page.md (rewrite 3, outcome-led)

export const StartThanksPage: React.FC = () => (
  <Shell title="You're in. Here's what happens next.">
    <p>
      The next thing you'll get is an email from me, Bri, asking for the two or three things I need to start. Usually that's access to your system and a few questions about how you want to sound. Your date starts when your answers land, so send them back as soon as you can.
    </p>
    <p>
      If you'd rather talk it through first, book fifteen minutes with me:{' '}
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
      Your card will show EIGHTY5LABS. Reply to the receipt if anything looks off and it comes straight to me.
    </p>
  </Shell>
);

export const CloserThanksPage: React.FC = () => (
  <Shell title="Your copy of The AI Real Estate Closer">
    <DownloadButton href={CLOSER_PDF} />
    <p>
      Fill in the six blanks before you put it to work. Those blanks are the difference between an assistant that sounds like your team and one that makes things up, so it needs your name, your area, and who a serious lead should be handed to. Then test it on yourself before you let it talk to a real person.
    </p>
    <p>
      If you'd rather I set the whole thing up for you, with everything that keeps it from pestering people, that's the $297 job at <StartLink />.
    </p>
  </Shell>
);

export const LeadKitThanksPage: React.FC = () => (
  <Shell title="Your copy of Never Let a Lead Go Cold">
    <DownloadButton href={LEAD_KIT_PDF} />
    <p>
      Read the second half first. The first half is the message, which you could have had free. The second half is what keeps that message from running over a real person, and two of those four things you can put in place tonight.
    </p>
    <p>
      If you'd rather I did all of it, that's the $297 job at <StartLink />, live within a day, with a short video of how to change anything yourself.
    </p>
  </Shell>
);

export default StartThanksPage;
