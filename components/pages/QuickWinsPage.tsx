import React from 'react';
import { Reveal } from '../ui/Reveal';
import { navigate } from '../../router';

// filled from ~/brain/strategy/quick-cash-2026-09-12/stripe-links.json
const LINKS = {
  leadResponder: 'https://buy.stripe.com/bJecN58LN93l1uAaC59bO0v',
  audit: 'https://buy.stripe.com/4gM8wPaTV7Zhehm6lP9bO0w',
  // One checkout: $497 today, and the $97/mo attaches with a 30-day trial so it starts on day 31.
  receptionist: 'https://buy.stripe.com/cNi3cvaTVcfxc9edOh9bO0B',
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

// Copy: ~/brain/strategy/quick-cash-2026-09-12/copy/quick-wins-page.md (rewrite 3, outcome-led)

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

/* One hairline row. Left column: heading, price line, button. Right column: the paragraphs.
   `n` is optional: the three priced jobs are numbered, the manuals section is not. */
const OfferBlock: React.FC<{ id: string; n?: number; name: string; aside: React.ReactNode; children: React.ReactNode }> = ({ id, n, name, aside, children }) => (
  <section className="qw-offer" aria-labelledby={`offer-${id}`}>
    <div>
      <h2 id={`offer-${id}`} style={{
        fontFamily: 'var(--fd)', fontWeight: 800, color: L.t1,
        fontSize: 'clamp(1.35rem, 2.4vw, 1.7rem)', letterSpacing: '-0.03em', lineHeight: 1.15,
      }}>
        {n !== undefined && <span style={{ color: L.t3, fontWeight: 700, marginRight: 8 }}>{n}.</span>}
        {name}
      </h2>
      {aside}
    </div>
    <div className="qw-prose" style={{ fontSize: '1rem', lineHeight: 1.7, color: L.t2 }}>
      {children}
    </div>
  </section>
);

export const QuickWinsPage: React.FC = () => (
  <div style={{ background: L.bg, paddingTop: 'calc(var(--nav-h) + 64px)' }}>
    <div className="wrap" style={{ paddingBottom: 56 }}>
      <Reveal>
        <h1 style={{
          fontFamily: 'var(--fd)', fontWeight: 800, color: L.t1,
          fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', maxWidth: 760,
        }}>
          Three things I'll fix this week, each with a price and a date.
        </h1>
      </Reveal>
      <Reveal delay={0.08}>
        <div className="qw-prose" style={{ marginTop: 20, fontSize: '1.05rem', lineHeight: 1.7, color: L.t2, maxWidth: 640 }}>
          <p>
            A mortgage team I work with had alerts set up for every lead that came off their website. Somebody had written the subject lines and the text messages, all of it. For weeks, not one of those alerts reached a human being. Leads filled in the form, and the team found out days later, if at all. Nothing broke loudly. From the outside it looked like a working business.
          </p>
          <p>
            I've now gone through six companies' systems that closely, and four of them had something like that sitting in the middle of it. Not one of the owners knew. Nobody checks a system again after the day it's turned on.
          </p>
          <p>
            That's what I do. Below are the three jobs I can price without a meeting, because I've done each of them enough times to know what they take. I do them myself, one at a time, and the date starts when you give me access.
          </p>
        </div>
      </Reveal>
    </div>

    <div className="wrap" style={{ paddingBottom: 24 }}>

      <OfferBlock
        id="1"
        n={1}
        name="Every lead gets a real answer, day or night"
        aside={
          <>
            <PriceLine>$297, once. For realtors and loan officers.</PriceLine>
            {/* ⚑ Bri decides: guarantee. Switch on by uncommenting.
            <p style={{ marginTop: 14, fontSize: '1rem', lineHeight: 1.7, color: L.t2 }}>
              If it isn't live 24 hours after I have access, you get the $297 back.
            </p>
            */}
            <Buttons>
              <BuyButton label="Fix my lead response" href={LINKS.leadResponder} />
            </Buttons>
          </>
        }
      >
        <p>
          You paid for the lead. Then they filled in your form at 9:40 on a Tuesday night and got "Thanks for reaching out, someone will be in touch," which told them nothing, so they kept clicking. Whoever answered them properly first is the one having the conversation now.
        </p>
        <p>
          I fix the first thing they hear from you. It reads what they wrote and answers that question, in your voice, in seconds, at any hour. When they write back it steps aside so you can take over, and it never keeps texting someone who has already replied or asked you to stop. When a conversation stops, you get told, instead of a lead going cold without anyone noticing.
        </p>
        <p>
          You're not buying more leads. You're keeping the ones you're already paying for. A company in this field published results across 25 million lead conversations and found 58% were handled from start to finish without a person stepping in. I'm not promising you that number, your market decides it, but that's the size of the thing being left on the table.
        </p>
        <p>
          Give me access and ten minutes on how you like to sound. It's live within 24 hours, tested, and I send you a short video of how to change anything yourself.
        </p>
      </OfferBlock>

      <OfferBlock
        id="2"
        n={2}
        name="Find out what's broken before it costs you again"
        aside={
          <>
            <PriceLine>$197, once.</PriceLine>
            {/* ⚑ Bri decides: audit credit. Switch on by uncommenting.
            <p style={{ marginTop: 14, fontSize: '1rem', lineHeight: 1.7, color: L.t2 }}>
              If you have me fix what I find, the $197 comes off that job.
            </p>
            */}
            <Buttons>
              <BuyButton label="Show me what's broken" href={LINKS.audit} />
            </Buttons>
          </>
        }
      >
        <p>
          This is the read I described at the top, done on your business, the same day, in plain English.
        </p>
        <p>
          You're paying every month for something that was set up once and never checked since, and these failures don't announce themselves. It's an alert that never reaches you, or a booking nobody gets told about, or a follow-up that goes to people it should have left alone. Every one of those is a deal you'll never know you lost, and you'll put it down to the market.
        </p>
        <p>
          I go through the whole thing and send you a written list of what isn't working, in order of what it's costing you, with enough detail that you or anyone you hire can fix it. Nothing changes while I'm in there, so there's no risk to what's running. I did this to my own business first and found seven things that looked live and weren't. If yours is clean, I'll tell you that, and that's worth knowing too.
        </p>
        <p>
          Same day. If yours was set up by someone else, or came bundled from somewhere, this is how you find out what you own.
        </p>
      </OfferBlock>

      <OfferBlock
        id="3"
        n={3}
        name="Your phone gets answered, every time"
        aside={
          <>
            <PriceLine>$497 today. Then $97 a month to keep it answering, starting thirty days from now, so you don't pay a maintenance fee on something that isn't live yet. You'll see both lines before you pay.</PriceLine>
            <Buttons>
              <BuyButton label="Get my phone answered" href={LINKS.receptionist} />
            </Buttons>
          </>
        }
      >
        <p>
          You're up a ladder. The phone rings, goes to voicemail, and by the time you're down they've called the next company on the list. That's not a small leak. For most of the owners I talk to, it's the single biggest one.
        </p>
        <p>
          I give you something that answers every call, day or night, in the way you'd answer it. It gets rid of the spam calls before they reach you. It answers what people ask all day, when can you come out, do you do this kind of work, roughly what does it cost. Then it books the job straight onto your calendar, or puts the caller through to you when it's someone you'd want to talk to. It never makes up a price, because I don't give it the room to.
        </p>
        <p>
          Mine is answering right now at houselabteam.com. Her name is Lucy, she's been doing it for a Portland team since August, and you can go talk to her before you decide anything.
        </p>
        <p>
          You get your evenings back and you stop losing work to voicemail. Give me access and a voice memo of how you answer the phone. It's live within 48 hours.
        </p>
      </OfferBlock>

      <OfferBlock
        id="manuals"
        name="If you'd rather do it yourself"
        aside={
          <Buttons>
            <BuyButton label="Buy Never Let a Lead Go Cold, $49" href={LINKS.leadKitPdf} />
            <BuyButton label="Buy The AI Real Estate Closer, $199" href={LINKS.closerPdf} />
          </Buttons>
        }
      >
        <p>
          Two manuals, written so you can build this without me.
        </p>
        <p>
          Never Let a Lead Go Cold is how to make a lead's first answer a real one, and the four things to put around it so it never runs over a person who has already replied. $49.
        </p>
        <p>
          The AI Real Estate Closer is the full set of instructions for the assistant that talks to a new lead before you can get to the phone, including everything it must never say. $199.
        </p>
        <p>
          Both come as a download on the page right after you pay.
        </p>
      </OfferBlock>

    </div>

    <div className="wrap" style={{ paddingBottom: 96 }}>
      <div className="qw-prose" style={{ borderTop: `1px solid ${L.border}`, paddingTop: 36, fontSize: '1rem', lineHeight: 1.7, color: L.t2 }}>
        <p style={{ maxWidth: 640 }}>
          The first-answer instructions are free at{' '}
          <a
            href="/quick-wins/lead-kit"
            onClick={e => { e.preventDefault(); navigate('/quick-wins/lead-kit'); }}
            style={{ color: L.blue, fontWeight: 600, textDecoration: 'none' }}
          >
            eighty5labs.com/quick-wins/lead-kit
          </a>
          , and they're the same ones I use in the $297 job. Every charge shows on your card as EIGHTY5LABS, and replying to the receipt reaches me.
        </p>
        {/* ⚑ Bri decides: launch discount. Switch on by uncommenting.
        <p style={{ maxWidth: 640 }}>
          The first five people to buy anything on this page get $50 off, in exchange for one honest sentence afterwards that I can put here with your name.
        </p>
        */}
      </div>
    </div>
  </div>
);

export default QuickWinsPage;
