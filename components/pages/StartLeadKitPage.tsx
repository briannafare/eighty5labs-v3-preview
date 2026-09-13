import React, { useEffect, useRef, useState } from 'react';
import { navigate } from '../../router';

// Same GHL inbound webhook OptInPage.tsx posts to
const WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/n21oYUwglqe3bTsxL2RS/webhook-trigger/94bbb4c3-cab5-4aef-98f3-754b9e225ae8';
const OPENED_KEY = 'e5l-lead-kit-open';

/* Light tokens, same as WorkPage */
const L = {
  bg: '#FFFFFF', bg2: '#F7F9FF',
  border: '#DDE5F2',
  t1: '#0F172A', t2: '#334155', t3: '#64748B',
  blue: '#1B4FFF',
  ink: '#1a2333', slot: '#e0b45c', paper: '#e8e6df',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: 'var(--rd)',
  border: `1px solid ${L.border}`,
  background: L.bg,
  fontSize: '1rem',
  color: L.t1,
  outline: 'none',
  fontFamily: 'inherit',
  boxSizing: 'border-box',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.875rem',
  fontWeight: 600,
  color: L.t1,
  marginBottom: 6,
};

const H3: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 style={{
    fontFamily: 'var(--fd)', fontWeight: 800, color: L.t1,
    fontSize: '1.25rem', letterSpacing: '-0.02em', marginTop: 40, marginBottom: 12,
  }}>
    {children}
  </h3>
);

const Slot: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span style={{ color: L.slot }}>{children}</span>
);

const Prompt: React.FC = () => (
  <div id="prompt" className="start-prose" style={{ fontSize: '1.05rem', lineHeight: 1.7, color: L.t2, maxWidth: 680 }}>
    <h2 style={{
      fontFamily: 'var(--fd)', fontWeight: 800, color: L.t1,
      fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', letterSpacing: '-0.03em',
    }}>
      Never Let a Lead Go Cold
    </h2>
    <p style={{ marginTop: 10, color: L.t3 }}>
      Part one of the kit, free: a copy-paste GoHighLevel automation pattern for the first message a lead hears back, before anyone on your team has time to call.
    </p>

    <p>
      Most businesses answer a new web form lead with an autoresponder that reads like one. "Thanks for reaching out! We'll be in touch within 24 to 48 hours." That's the exact moment a real person could feel like someone actually read what they wrote, and instead they get a form letter. This pattern fixes that with one automation node, and you can build it in your own GHL account this afternoon without ever talking to us.
    </p>

    <H3>Where it goes</H3>
    <p>
      Inside your Website Form Leads workflow, right after your AI Summary step or wherever the form data first gets processed, add one AI Agent action with two tools connected: Send Email and Send SMS. The agent writes and sends both itself, in one step, no separate template actions downstream.
    </p>

    <H3>The prompt, fill in the brand slots</H3>
    <pre style={{
      background: L.ink, color: L.paper, borderRadius: 'var(--rd)',
      padding: '20px 22px', overflowX: 'auto',
      fontFamily: "'SF Mono', Menlo, monospace", fontSize: '0.8rem', lineHeight: 1.6,
      whiteSpace: 'pre-wrap', margin: '14px 0 24px',
    }}>
{`You are `}<Slot>{`{{who you are, where, the humans behind the business, writing as "we"}}`}</Slot>{`.
Someone just filled out a form on your website. Send the first thing they hear
back: an email first, then a text.

What they told you is in their AI Summary: [insert AI Summary field].
Their first name is {{contact.first_name}}.
Send the email to {{contact.email}}; the text to {{contact.phone}}. Send both.

THE EMAIL
Make them feel a real person read what they wrote and understands what they're
after, before anyone has called. Reflect back the real thing driving them, in
their own words, not a generic category. Give one genuinely useful thought tied
to their actual situation. Don't invent prices, comps, or specifics you can't
know. Close by letting them know `}<Slot>{`{{the humans}}`}</Slot>{` will be in touch personally,
something to look forward to, no timeframe, no apology for timing. Invite a
reply. Subject reads like a real reply, not marketing. Body 90 to 150 words,
starts "Hi {{contact.first_name}},", ends with `}<Slot>{`{{your signature block}}`}</Slot>{`.

THE TEXT
Two sentences, under 300 characters. Say who you are (it's a new number to
them). Say you read their note and just emailed a few thoughts, and someone
will be in touch personally. Say they can reply anytime. No signature.

HOW TO SOUND: warm, one to one, plain words, their words back to them, dry
warmth, no hype. Every line makes literal sense. Never use em dashes, "not
just X but Y," buzzwords, manufactured urgency, or exclamation-point energy.`}
    </pre>

    <H3>Before you turn it on</H3>
    <p>
      Confirm your Send Email tool lets the agent set subject and body freely, no locked template. Run one live test submission and read both outputs in the contact's conversation history. Check that the email actually sends before the text, so the SMS line "just emailed a few thoughts" is telling the truth. Then read the first few real outputs out loud. If any line makes you cringe, tighten the prompt, the prompt holds the line, but the real outputs tell you what's actually wrong with it.
    </p>

    <H3>The half this page doesn't cover</H3>
    <p>
      That's the message. What decides whether it embarrasses you is the machinery around it: what your account does when the lead replies, when someone texts "stop", when an email bounces, and when a deal sits in the same stage for a fortnight. While scoping a client build we read every workflow in sixteen GoHighLevel sub-accounts, 386 of them, and all 386 were built to send. One account had anything handling a bounce or an unsubscribe, and those three workflows had arrived inside a snapshot rather than being built by anyone who worked there. Not one had a rule that stopped the sending when the person wrote back.
    </p>
    <p>
      The full kit is the four guardrail workflows that fix that, the rule that keeps the AI from inventing a number, and the throttle that decides how often the sequence is allowed to speak. There's one thing on this page you can go and do tonight without any of it, though. Open your workflow list, filter it to published, and read what each one triggers on. In that sweep we found two live workflows firing every time anybody added a note to any contact, and one of them was posting contact details to a Zapier endpoint belonging to whoever had built the snapshot.
    </p>

    <p style={{ marginTop: 40, paddingTop: 20, borderTop: `1px solid ${L.border}`, fontSize: '0.9rem', color: L.t3 }}>
      Automation pattern from <strong style={{ color: L.t1 }}>eighty5labs</strong>, proven across live client accounts before we wrote it down. The kit with the four guardrails is at{' '}
      <a href="/start" onClick={e => { e.preventDefault(); navigate('/start'); }} style={{ color: L.blue, fontWeight: 600, textDecoration: 'none' }}>
        eighty5labs.com/start
      </a>
      .
    </p>
  </div>
);

export const StartLeadKitPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [opened, setOpened] = useState(false);
  const promptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try { if (localStorage.getItem(OPENED_KEY) === '1') setOpened(true); } catch {}
  }, []);

  useEffect(() => {
    if (opened && promptRef.current) {
      promptRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [opened]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!fullName.trim() || !email.trim()) {
      setError('Please enter your name and email.');
      return;
    }
    setSubmitting(true);
    const nameParts = fullName.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';
    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: fullName.trim(),
          first_name: firstName,
          last_name: lastName,
          email: email.trim(),
          source: 'lead-kit-free',
          tags: ['lead-kit-free'],
          timestamp: new Date().toISOString(),
        }),
      }).catch(() => {});
    } finally {
      setSubmitting(false);
      try { localStorage.setItem(OPENED_KEY, '1'); } catch {}
      setOpened(true);
    }
  };

  return (
    <div style={{ background: L.bg, paddingTop: 'calc(var(--nav-h) + 64px)' }}>
      <div className="wrap" style={{ paddingBottom: 48 }}>
        <h1 style={{
          fontFamily: 'var(--fd)', fontWeight: 800, color: L.t1,
          fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', maxWidth: 760,
        }}>
          The first-reply prompt, free.
        </h1>
        <div className="start-prose" style={{ marginTop: 20, fontSize: '1.05rem', lineHeight: 1.7, color: L.t2, maxWidth: 640 }}>
          <p>
            This is part one of Never Let a Lead Go Cold: the prompt for the AI message a new lead gets back inside GoHighLevel, with the four slots you fill in once. It reads what the person wrote and answers it, so the first thing they hear from you sounds like somebody paid attention.
          </p>
          <p>
            It's free because the message is the easy half. The half that takes a Saturday is what happens after the message goes out: the workflow that stops the sequence when the person replies, the one that ends it when they say stop, the one that handles a bounce, and the one that hands a deal that's stopped moving to a human as a task instead of firing another text at it. Those four guardrails, written out as GoHighLevel workflows you rebuild by hand, are the paid kit. It's $49.
          </p>
          {!opened && <p>Put your email in and the prompt page opens.</p>}
        </div>
      </div>

      {!opened && (
        <div className="wrap" style={{ paddingBottom: 96 }}>
          <div style={{
            maxWidth: 480, background: L.bg2, border: `1px solid ${L.border}`,
            borderRadius: 'var(--rdl)', padding: 'clamp(24px, 4vw, 32px)',
          }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label htmlFor="lk-name" style={labelStyle}>Your name</label>
                <input
                  id="lk-name" type="text" required autoComplete="name"
                  value={fullName} onChange={e => setFullName(e.target.value)}
                  style={inputStyle}
                />
              </div>
              <div>
                <label htmlFor="lk-email" style={labelStyle}>Your email</label>
                <input
                  id="lk-email" type="email" required autoComplete="email"
                  value={email} onChange={e => setEmail(e.target.value)}
                  style={inputStyle}
                />
              </div>
              {error && (
                <div role="alert" style={{ padding: '10px 14px', borderRadius: 'var(--rd)', background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', fontSize: '0.875rem' }}>
                  {error}
                </div>
              )}
              <div>
                <button type="submit" disabled={submitting} className="btn btn-primary" style={{ opacity: submitting ? 0.7 : 1 }}>
                  {submitting ? 'Opening' : 'Open the prompt'}
                </button>
              </div>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: L.t3 }}>
                The page opens as soon as you press it. The kit with the four guardrails is at{' '}
                <a href="/start" onClick={e => { e.preventDefault(); navigate('/start'); }} style={{ color: L.blue, fontWeight: 600, textDecoration: 'none' }}>
                  eighty5labs.com/start
                </a>
                .
              </p>
            </form>
          </div>
        </div>
      )}

      {opened && (
        <div className="wrap" style={{ paddingBottom: 96 }} ref={promptRef}>
          <div style={{ borderTop: `1px solid ${L.border}`, paddingTop: 48 }}>
            <Prompt />
          </div>
        </div>
      )}
    </div>
  );
};

export default StartLeadKitPage;
