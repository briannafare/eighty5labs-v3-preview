import React from 'react';
import { Reveal } from '../ui/Reveal';
import { navigate } from '../../router';

// filled from ~/brain/strategy/quick-cash-2026-09-12/stripe-links.json
const LINKS = {
  leadResponder: '',
  audit: '',
  receptionistSetup: '',
  receptionistMonthly: '',
  newsletter: '',
  leadKitPdf: '',
  closerPdf: '',
};

/* Light tokens, same as WorkPage */
const L = {
  bg: '#FFFFFF', bg2: '#F7F9FF',
  border: '#DDE5F2',
  t1: '#0F172A', t2: '#334155', t3: '#64748B',
  blue: '#1B4FFF',
};

interface Offer {
  n: number;
  name: string;
  what: string;
  after: string;
  price: string;
  buttons: { label: string; href: string }[];
}

const OFFERS: Offer[] = [
  {
    n: 1,
    name: 'The 24-Hour Lead Responder',
    what: 'When someone fills in your form at 9:40 on a Tuesday night, this is what writes back. It\'s an AI message inside your own GoHighLevel that reads what they wrote and answers it, instead of "Thanks for reaching out, someone will be in touch." Around that message I install four small workflows: one that stops the sequence the moment the person replies, another that ends it when they say stop, one that handles a bounce, and one that hands a deal that has stopped moving to you as a task rather than sending another automated text. It\'s for realtors and loan officers who are already on GoHighLevel, either on their own account or through a team or brokerage.',
    after: 'What happens after you buy: you\'ll get an email from me asking for a user login to your GoHighLevel and a few answers about how you want the first message to sound. Send those back and I\'m in. Everything is installed and tested inside 24 hours of your purchase, and I send you a five-minute Loom showing where each piece lives and how to change it yourself.',
    price: '$297, one time.',
    buttons: [{ label: 'Install it in my account', href: LINKS.leadResponder }],
  },
  {
    n: 2,
    name: 'The GoHighLevel Account Audit',
    what: 'I open every workflow, calendar and custom field you have and tell you what\'s wrong, in plain words, the same day. It\'s read-only, so nothing in your account changes. I\'m looking for five things: team alerts with the email and text written out that only ever ring an in-app bell, workflows on a broad trigger with no conditions that fire on every contact forever, published workflows with no trigger that can never run, calendars where a lead books a slot and nobody is told, and which of your custom fields a live workflow depends on, so you know what you can\'t rename. My own account has 51 workflows and 238 custom fields. Running this on it found one alert that never sends, two workflows firing on everything, seven that are published but can\'t run, and 20 fields I\'d break something by touching. It\'s for anyone running a sub-account. If yours was inherited or built from a snapshot, you\'ll find out what came in with it.',
    after: 'What happens after you buy: you\'ll get an email asking you to add me as a user on the sub-account, or share a private integration token if you\'d rather. Once I\'m in, the report lands in your inbox the same day. Every finding comes with the workflow name and the step name, so you can hand it to whoever fixes things. If the account turns out to be clean, the report says that, and you\'ll know.',
    price: '$197, one time.',
    buttons: [{ label: 'Audit my account', href: LINKS.audit }],
  },
  {
    n: 3,
    name: 'The AI Receptionist',
    what: 'An AI that answers your business line, built on your own GoHighLevel. It picks up when you\'re on a ladder or under a sink, screens out the spam calls, answers the questions you get every day (how soon can you come out, do you do this kind of job, roughly what does it cost), and either books the job onto your calendar or transfers the call to you. I write its script from your real ones: how you answer the phone now, what you say when someone asks the price, what you never promise before you\'ve seen the job. I run one for a pressure-washing company here in Portland. It\'s built for trades and home services first, roofing, HVAC, cleaning, anything where the phone rings while your hands are full.',
    after: 'What happens after you buy: you\'ll get an email asking for a user login to your GoHighLevel and a short call, or a voice memo if you\'d rather, where you tell me how you answer the phone today and which questions you\'re tired of answering. It\'s live and picking up inside 48 hours.',
    price: '$497 to build it, then $97 a month while it\'s answering.',
    buttons: [{ label: 'Build my receptionist', href: LINKS.receptionistSetup }],
  },
  {
    n: 4,
    name: 'The Neighborhood Letter',
    what: 'Once a month I sweep every event source within ten miles of your office, check that each one has a date and a street address on the organizer\'s own page, cut the ones that don\'t, write the issue as a person, and hand it to your CRM ready to send from you. It\'s for a realtor or a lender whose business is a neighborhood, who wants to be the one who knows what\'s on this month without spending a Sunday finding out. On the first run, for an agent east of Portland, 27 sources went in and 21 verified events inside the radius came out.',
    after: 'What happens after you buy: you\'ll get an email asking for your office address, the groups you want the issue sorted for (for the first client it was seniors, kids, and around town), and which CRM you send from. The first issue is in your CRM inside 48 hours, as a draft you press send on.',
    price: '$149 a month.',
    buttons: [{ label: 'Start my first issue', href: LINKS.newsletter }],
  },
  {
    n: 5,
    name: 'The two manuals, as PDFs',
    what: 'If you\'d rather build it yourself, buy the instructions and skip me. Never Let a Lead Go Cold is the GoHighLevel follow-up kit: the first-reply prompt with its four slots, and the four guardrail workflows written out step by step so you can rebuild them in your own account in an afternoon. The AI Real Estate Closer is the system prompt for the AI that talks to a new lead before you can get to the phone, with the six slots you fill in, the rules about what it must never say, and the notes on where it goes in the CRM you already pay for. Both are PDFs. You pay, and the page after checkout has your download link.',
    after: '',
    price: '$49 for the lead kit. $199 for the Closer.',
    buttons: [
      { label: 'Buy Never Let a Lead Go Cold, $49', href: LINKS.leadKitPdf },
      { label: 'Buy The AI Real Estate Closer, $199', href: LINKS.closerPdf },
    ],
  },
];

const BuyButton: React.FC<{ label: string; href: string }> = ({ label, href }) => {
  if (!href) {
    return (
      <button
        type="button"
        disabled
        aria-disabled="true"
        className="btn btn-sm"
        style={{
          background: L.bg2, color: L.t3, border: `1px solid ${L.border}`,
          cursor: 'not-allowed', boxShadow: 'none',
        }}
      >
        Opening soon
      </button>
    );
  }
  return (
    <a href={href} className="btn btn-primary btn-sm">
      {label}
    </a>
  );
};

const OfferBlock: React.FC<{ offer: Offer }> = ({ offer }) => (
  <section className="start-offer" aria-labelledby={`offer-${offer.n}`}>
    <div>
      <h2 id={`offer-${offer.n}`} style={{
        fontFamily: 'var(--fd)', fontWeight: 800, color: L.t1,
        fontSize: 'clamp(1.35rem, 2.4vw, 1.7rem)', letterSpacing: '-0.03em', lineHeight: 1.15,
      }}>
        <span style={{ color: L.t3, fontWeight: 700, marginRight: 8 }}>{offer.n}.</span>
        {offer.name}
      </h2>
      <p style={{ marginTop: 14, fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '1.05rem', color: L.t1 }}>
        {offer.price}
      </p>
      <div style={{ marginTop: 18, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {offer.buttons.map(b => <BuyButton key={b.label} label={b.label} href={b.href} />)}
      </div>
    </div>
    <div className="start-prose" style={{ fontSize: '1rem', lineHeight: 1.7, color: L.t2 }}>
      <p>{offer.what}</p>
      {offer.after && <p>{offer.after}</p>}
    </div>
  </section>
);

export const StartPage: React.FC = () => (
  <div style={{ background: L.bg, paddingTop: 'calc(var(--nav-h) + 64px)' }}>
    <div className="wrap" style={{ paddingBottom: 56 }}>
      <Reveal>
        <h1 style={{
          fontFamily: 'var(--fd)', fontWeight: 800, color: L.t1,
          fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', maxWidth: 760,
        }}>
          Five small jobs, each with a fixed price and a delivery date.
        </h1>
      </Reveal>
      <Reveal delay={0.08}>
        <p style={{ marginTop: 20, fontSize: '1.05rem', lineHeight: 1.7, color: L.t2, maxWidth: 640 }}>
          I'm Bri. I run eighty5labs in Portland, and most of my work lives inside GoHighLevel, building the parts that reply to a lead, answer the phone, and catch what's silently broken. These five are the jobs I can scope without a call first, so each one has a price and a deadline instead of a quote. Buy one and the clock starts.
        </p>
      </Reveal>
    </div>

    <div className="wrap" style={{ paddingBottom: 24 }}>
      {OFFERS.map(o => <OfferBlock key={o.n} offer={o} />)}
    </div>

    <div className="wrap" style={{ paddingBottom: 96 }}>
      <div style={{ borderTop: `1px solid ${L.border}`, paddingTop: 36 }}>
        <p style={{ fontSize: '1rem', lineHeight: 1.7, color: L.t2, maxWidth: 640 }}>
          The first-reply prompt from the lead kit is free. It's at{' '}
          <a
            href="/start/lead-kit"
            onClick={e => { e.preventDefault(); navigate('/start/lead-kit'); }}
            style={{ color: L.blue, fontWeight: 600, textDecoration: 'none' }}
          >
            eighty5labs.com/start/lead-kit
          </a>
          , and it's the same one I install in the $297 job. Every charge shows on your card as EIGHTY5LABS.
        </p>
      </div>
    </div>
  </div>
);

export default StartPage;
