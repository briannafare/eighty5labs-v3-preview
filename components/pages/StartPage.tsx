import React from 'react';
import { Reveal } from '../ui/Reveal';
import { navigate } from '../../router';

// filled from ~/brain/strategy/quick-cash-2026-09-12/stripe-links.json
const LINKS = {
  leadResponder: 'https://buy.stripe.com/bJecN58LN93l1uAaC59bO0v',
  audit: 'https://buy.stripe.com/4gM8wPaTV7Zhehm6lP9bO0w',
  receptionistSetup: 'https://buy.stripe.com/fZucN5d23gvN6OUaC59bO0u',
  receptionistMonthly: 'https://buy.stripe.com/6oU28rbXZ6Vdb5aaC59bO0x',
  leadKitPdf: 'https://buy.stripe.com/28E00jaTVfrJ3CI4dH9bO0z',
  closerPdf: 'https://buy.stripe.com/9B628r8LN0wP7SY25z9bO0A',
};

/* Light tokens, same as WorkPage */
const L = {
  bg: '#FFFFFF', bg2: '#F7F9FF',
  border: '#DDE5F2',
  t1: '#0F172A', t2: '#334155', t3: '#64748B',
  blue: '#1B4FFF',
};

// Copy: ~/brain/strategy/quick-cash-2026-09-12/copy/start-page.md (rewrite 2)

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

const PriceLine: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p style={{ marginTop: 14, fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '1.05rem', color: L.t1, lineHeight: 1.5 }}>
    {children}
  </p>
);

const Buttons: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ marginTop: 18, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
    {children}
  </div>
);

/* One hairline row. Left column: heading, price line, button. Right column: the paragraphs. */
const OfferBlock: React.FC<{ n: number; name: string; aside: React.ReactNode; children: React.ReactNode }> = ({ n, name, aside, children }) => (
  <section className="start-offer" aria-labelledby={`offer-${n}`}>
    <div>
      <h2 id={`offer-${n}`} style={{
        fontFamily: 'var(--fd)', fontWeight: 800, color: L.t1,
        fontSize: 'clamp(1.35rem, 2.4vw, 1.7rem)', letterSpacing: '-0.03em', lineHeight: 1.15,
      }}>
        <span style={{ color: L.t3, fontWeight: 700, marginRight: 8 }}>{n}.</span>
        {name}
      </h2>
      {aside}
    </div>
    <div className="start-prose" style={{ fontSize: '1rem', lineHeight: 1.7, color: L.t2 }}>
      {children}
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
          Four jobs I'll do inside your GoHighLevel this week, each with a price and a deadline.
        </h1>
      </Reveal>
      <Reveal delay={0.08}>
        <div className="start-prose" style={{ marginTop: 20, fontSize: '1.05rem', lineHeight: 1.7, color: L.t2, maxWidth: 640 }}>
          <p>
            A mortgage team I work with had nine workflows built for their website leads, with eighteen alert steps written out: subject lines, email bodies, text messages. Every one of those steps was set to ring a bell inside the app and nothing else. For weeks a lead would fill in the form and nobody on the team got an email or a text. Nothing errored. From the outside it looked like a working system.
          </p>
          <p>
            I've now read six accounts that closely, and four of them had something like that in them. The people paying for them hadn't been told, because a CRM doesn't get read again after the day it's set up. So this page is the reading, and the fixing, priced.
          </p>
          <p>
            These are the jobs I can scope without a call. I do them myself, one at a time, in the order they're paid for, and each one has a deadline that starts when you send me a login.
          </p>
        </div>
      </Reveal>
    </div>

    <div className="wrap" style={{ paddingBottom: 24 }}>

      <OfferBlock
        n={1}
        name="The 24-Hour Lead Responder"
        aside={
          <>
            <PriceLine>$297, once. For realtors and loan officers on their own account or their brokerage's.</PriceLine>
            {/* ⚑ Bri decides: guarantee. Switch on by uncommenting.
            <p style={{ marginTop: 14, fontSize: '1rem', lineHeight: 1.7, color: L.t2 }}>
              If it isn't live 24 hours after I get your login, you get the $297 back.
            </p>
            */}
            <Buttons>
              <BuyButton label="Install it in my account" href={LINKS.leadResponder} />
            </Buttons>
          </>
        }
      >
        <p>
          A lead fills in your form at 9:40 on a Tuesday night. Your account sends them something. If it's "Thanks for reaching out, someone will be in touch," they've learned nothing, and they still have Zillow open in the next tab.
        </p>
        <p>
          I replace that with a message that reads what they wrote and answers it, in your name. Then I put four guardrails around it so the follow-up can't run over a real person: it stops the moment they reply, it ends when they say stop, it notices a bounce, and when a deal has gone quiet it hands you a task instead of sending the lead another automated text.
        </p>
        <p>
          Ylopo, a real-estate voice-AI company, has published results across 25 million lead conversations: 58% of first contacts were handled start to finish by the AI. I'm not promising you that number. Your leads and your market decide it. What I can promise is what writes back, what it says, and that it's live within a day.
        </p>
        <p>
          You send me a user login for your GoHighLevel and ten minutes of answers about how you want to sound. Inside 24 hours of that it's installed, tested against a fake lead, and I've recorded a five-minute video of where each piece lives so you can change it without me.
        </p>
      </OfferBlock>

      <OfferBlock
        n={2}
        name="The GoHighLevel Account Audit"
        aside={
          <>
            <PriceLine>$197, once.</PriceLine>
            {/* ⚑ Bri decides: audit credit. Switch on by uncommenting.
            <p style={{ marginTop: 14, fontSize: '1rem', lineHeight: 1.7, color: L.t2 }}>
              If you have me fix what it finds, the $197 comes off that job.
            </p>
            */}
            <Buttons>
              <BuyButton label="Audit my account" href={LINKS.audit} />
            </Buttons>
          </>
        }
      >
        <p>
          This is the reading I described at the top, done on your account, the same day, in plain words.
        </p>
        <p>
          I open each workflow, calendar and custom field and look for five things. Alerts with the email and text written out that only ever ring an in-app bell. Workflows on a broad trigger with no conditions, which fire on every contact forever. Workflows marked Published that have no trigger and can never run. Calendars where a lead can book a slot and nobody is told. And the list of custom fields a live workflow depends on, so you know which ones you can't rename.
        </p>
        <p>
          I ran it on my own account first: 51 workflows, 238 fields. It found one alert that never sends, two workflows firing on everything, seven that were published and could never run, and 20 fields I'd have broken something by touching. If yours was inherited, or came in on a snapshot, you'll find out what arrived with it.
        </p>
        <p>
          It's read-only. Nothing changes. You add me as a user (or share a private integration token) and the report is in your inbox the same day, with the workflow name and the step name on every finding, so you can hand it to whoever fixes things. If the account is clean, the report says so, and that's worth knowing too.
        </p>
      </OfferBlock>

      <OfferBlock
        n={3}
        name="The AI Receptionist"
        aside={
          <>
            <PriceLine>$497 to build. $97 a month while it's answering. Live within 48 hours of a login and a voice memo of you answering the phone.</PriceLine>
            <Buttons>
              <BuyButton label="Build my receptionist" href={LINKS.receptionistSetup} />
            </Buttons>
          </>
        }
      >
        <p>
          You're up a ladder. The phone rings, goes to voicemail, and by the time you're down they've called the next company.
        </p>
        <p>
          I build a voice agent on your own GoHighLevel that picks up each call, sends the spam away, answers the questions you get all day (do you do this kind of job, how soon can you come out, roughly what does it cost), and either books the job onto your calendar or transfers the call to you. Its script comes from yours. I ask how you answer the phone today, what you say when someone wants a price, and what you never promise before you've seen the job. It never invents a number, because I don't give it any to invent with.
        </p>
        <p>
          The one on houselabteam.com is mine. Her name is Lucy, she's been answering questions for a Portland real-estate team since August, and you can talk to her right now.
        </p>
        <p>
          The standalone products cost $49 to $449 a month and live in their own dashboard, away from where your jobs and your calendar live. This one lives in the CRM you already run, and you own it when I'm done.
        </p>
      </OfferBlock>

      <OfferBlock
        n={4}
        name="The two manuals"
        aside={
          <Buttons>
            <BuyButton label="Buy Never Let a Lead Go Cold, $49" href={LINKS.leadKitPdf} />
            <BuyButton label="Buy The AI Real Estate Closer, $199" href={LINKS.closerPdf} />
          </Buttons>
        }
      >
        <p>
          If you'd rather build it yourself, buy the instructions and skip me.
        </p>
        <p>
          Never Let a Lead Go Cold is the first-reply prompt with its four slots, plus the four guardrail workflows above, written out step by step so you can rebuild them in an afternoon. $49.
        </p>
        <p>
          The AI Real Estate Closer is the system prompt for the AI that talks to a new lead before you can get to the phone: six slots you fill in, the rules about what it must never say, and where it goes in the CRM you already pay for. $199.
        </p>
        <p>
          Both are PDFs. The page after checkout has your download.
        </p>
      </OfferBlock>

    </div>

    <div className="wrap" style={{ paddingBottom: 96 }}>
      <div className="start-prose" style={{ borderTop: `1px solid ${L.border}`, paddingTop: 36, fontSize: '1rem', lineHeight: 1.7, color: L.t2 }}>
        <p style={{ maxWidth: 640 }}>
          The first-reply prompt is free at{' '}
          <a
            href="/start/lead-kit"
            onClick={e => { e.preventDefault(); navigate('/start/lead-kit'); }}
            style={{ color: L.blue, fontWeight: 600, textDecoration: 'none' }}
          >
            eighty5labs.com/start/lead-kit
          </a>
          . It's the same one I install in the $297 job. Every charge shows on your card as EIGHTY5LABS, and you can reply to the receipt and reach me.
        </p>
        {/* ⚑ Bri decides: launch discount. Switch on by uncommenting.
        <p style={{ maxWidth: 640 }}>
          The first five people to buy anything on this page get $50 off it, in exchange for one honest sentence about how it went that I can put here with your name.
        </p>
        */}
      </div>
    </div>
  </div>
);

export default StartPage;
