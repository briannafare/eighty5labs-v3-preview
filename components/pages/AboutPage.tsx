import React from 'react';
import { Reveal, Stagger } from '../ui/Reveal';
import { navigate } from '../../router';

const STATS = [
  { stat: 'Top 3', context: 'Map Pack placement for clients within 30–90 days of launch' },
  { stat: '100%', context: 'of inbound calls answered after Voice AI is deployed — including after hours' },
  { stat: '<2min', context: 'average lead response time once Workflow AI is live' },
  { stat: '5→50+', context: 'Google reviews in 90 days — typical result with Reviews AI' },
];

const TESTIMONIALS = [
  {
    quote: '"I was skeptical. I\'ve tried the tools. I\'ve paid for the platforms. Nothing ever stuck because I was the one who had to run it. eighty5labs was different — it was running before I finished onboarding. Within 30 days I had more Google reviews than I\'d collected in the previous two years."',
    by: '— HVAC Owner, Portland OR',
  },
  {
    quote: '"Our missed-call rate was 40% after hours. Now it\'s zero. Every call gets answered, every appointment gets booked. We recovered our monthly subscription cost in the first 48 hours."',
    by: '— Med Spa Founder, Phoenix AZ',
  },
  {
    quote: '"We went from page 2 to the Map Pack top 3 in six weeks. Bri\'s team built content pages for every neighborhood we serve. The AI search citations started showing up in ChatGPT within a month."',
    by: '— Plumbing Company, Denver CO',
  },
];

export const AboutPage: React.FC = () => (
  <div style={{ paddingTop: 'var(--nav-h)' }}>
    {/* Hero */}
    <section className="section" style={{ paddingBottom: 0 }}>
      <div className="wrap">
        <Reveal>
          <div className="section-label">About eighty5labs</div>
          <h1 style={{ fontFamily: 'var(--fd)', fontWeight: 900, fontSize: 'clamp(2.5rem, 5vw, 4rem)', letterSpacing: '-0.05em', lineHeight: 1.0, marginBottom: 20 }}>
            We built the system<br />we wish we'd had.
          </h1>
          <p style={{ color: 'var(--t3)', fontSize: '1.125rem', lineHeight: 1.7, maxWidth: '55ch' }}>
            Between the two of us, we've spent more money on marketing promises than we'd like to admit. That frustration is why eighty5labs exists.
          </p>
        </Reveal>
      </div>
    </section>

    {/* Origin */}
    <section className="section">
      <div className="wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 56 }}>
        <Reveal>
          <div>
            <div className="section-label" style={{ marginBottom: 16 }}>The Origin</div>
            <h2 style={{ fontFamily: 'var(--fd)', fontWeight: 900, fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', letterSpacing: '-0.04em', marginBottom: 20 }}>
              We've been your client. More than once.
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                'Lead campaigns that generated noise but not revenue. Coaches who taught frameworks that didn\'t transfer to the real market. Branding projects that looked great in the deck and converted nothing in the real world. Marketing agencies with polished proposals and a different excuse every quarter.',
                'We\'ve been the frustrated business owner on the other side of that table. We know what it feels like to spend money on marketing and have nothing to show for it. We know what it feels like to build a great business and still lose customers to competitors with half your experience and twice your Google reviews.',
                'That\'s why we built eighty5labs. Not because we saw a gap in the market. Because we were tired of losing money on disconnected tools and empty promises — and we knew most local businesses were losing even more than we were, without knowing why.',
              ].map((p, i) => (
                <p key={i} style={{ color: 'var(--t3)', lineHeight: 1.75, fontSize: '0.9375rem' }}>{p}</p>
              ))}
              <p style={{ color: 'var(--t1)', fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '1rem', marginTop: 8, borderLeft: '3px solid var(--blue)', paddingLeft: 16 }}>
                eighty5.OS is the system we built for ourselves. Now we run it for you.
              </p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div>
            <div className="section-label" style={{ marginBottom: 16 }}>Why It's Different</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {[
                ['Most agencies', 'One platform, one team, one monthly report'],
                ['Freelancers on 3 platforms', 'Connected: GBP + Reviews + Voice + Content + Follow-up'],
                ['Build it yourself', 'Done-for-you. No learning curve, no tools to manage'],
                ['Promises + decks', 'Monthly reports with actual Map Pack ranking movement'],
                ['12-month contracts', 'Month-to-month. Results are the retention strategy'],
              ].map(([left, right], i) => (
                <div key={i} style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 16,
                  padding: '14px 0',
                  borderBottom: '1px solid var(--border)',
                  fontSize: '0.875rem',
                }}>
                  <span style={{ color: 'var(--t4)', textDecoration: 'line-through' }}>{left}</span>
                  <span style={{ color: 'var(--gap1)', fontWeight: 600 }}>→ {right}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>

    {/* Team */}
    <section className="section" style={{ background: 'var(--bg1)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="wrap">
        <Reveal>
          <div className="section-label" style={{ marginBottom: 40 }}>The Team</div>
        </Reveal>
        <Stagger>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 28 }}>
            {[
              {
                initials: 'DC',
                name: 'David Chandler',
                role: 'Co-Founder — Strategy & Client Relations',
                cred: 'Co-founder, WhirLocal.io',
                bio1: '20+ years in mortgage and real estate gave David a front-row seat to how local businesses live and die by their Google presence and reputation. He\'s been the business owner frustrated by broken marketing promises — and the technology founder who built software to solve them. Most people who sell reputation management have read about how it works. David built the software.',
                bio2: 'At eighty5labs, David leads client strategy and oversees how eighty5.OS is deployed across different industries and markets. If it goes in a client\'s business, David has tested it in his own first.',
              },
              {
                initials: 'BL',
                name: 'Bri Lindley',
                role: 'Co-Founder — Technology & Marketing Systems',
                cred: 'Founder, Lindley Team — #1 Google ranking + AI search',
                bio1: '10+ years in mortgage, with deep expertise in Google Ads, Facebook Ads, SEO, and building the kind of content infrastructure that actually generates qualified inbound traffic. Bri built the Lindley Team from scratch into a top-ranked local operation — first achieving Google Maps and organic rankings, then adapting the entire content strategy as AI search changed the rules.',
                bio2: 'She\'s not theorizing about AI search optimization. She\'s done it for her own business and replicated it for clients. Fair warning: obsessive, OCD, neurotic about client commitments. If she says it will be done, it will be done. Even at 2am.',
              },
            ].map(member => (
              <div key={member.initials} style={{
                background: 'var(--bg2)',
                border: '1.5px solid var(--border)',
                borderRadius: 'var(--rdxl)',
                padding: 32,
              }}>
                <div style={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  background: 'var(--blue)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--fd)',
                  fontWeight: 900,
                  fontSize: '1.125rem',
                  marginBottom: 18,
                }}>
                  {member.initials}
                </div>
                <div style={{ fontFamily: 'var(--fd)', fontWeight: 900, fontSize: '1.25rem', letterSpacing: '-0.03em', marginBottom: 6 }}>{member.name}</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--t3)', marginBottom: 8 }}>{member.role}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--blue3)', fontWeight: 600, marginBottom: 20 }}>{member.cred}</div>
                <p style={{ fontSize: '0.875rem', color: 'var(--t3)', lineHeight: 1.75, marginBottom: 12 }}>{member.bio1}</p>
                <p style={{ fontSize: '0.875rem', color: 'var(--t3)', lineHeight: 1.75 }}>{member.bio2}</p>
              </div>
            ))}
          </div>
        </Stagger>
      </div>
    </section>

    {/* Proof / Stats */}
    <section className="section">
      <div className="wrap">
        <Reveal>
          <h2 style={{ fontFamily: 'var(--fd)', fontWeight: 900, fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', letterSpacing: '-0.04em', marginBottom: 8 }}>
            Don't Take Our Word For It.
          </h2>
          <p style={{ color: 'var(--t3)', marginBottom: 40 }}>Here's what happens when local businesses close all three gaps and run a real system.</p>
        </Reveal>

        <Stagger>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 20, marginBottom: 56 }}>
            {STATS.map(item => (
              <div key={item.stat} style={{
                background: 'var(--bg1)',
                border: '1.5px solid var(--border)',
                borderRadius: 'var(--rdl)',
                padding: '24px 20px',
              }}>
                <div style={{ fontFamily: 'var(--fd)', fontWeight: 900, fontSize: '2.25rem', letterSpacing: '-0.05em', color: 'var(--blue3)', marginBottom: 8 }}>{item.stat}</div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--t3)', lineHeight: 1.6 }}>{item.context}</div>
              </div>
            ))}
          </div>
        </Stagger>

        <Stagger>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{
                background: 'var(--bg1)',
                border: '1.5px solid var(--border)',
                borderRadius: 'var(--rdl)',
                padding: 28,
              }}>
                <div style={{ color: 'var(--blue3)', fontSize: '0.875rem', marginBottom: 14 }}>★★★★★</div>
                <p style={{ color: 'var(--t2)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: 18, fontStyle: 'italic' }}>{t.quote}</p>
                <div style={{ fontSize: '0.8125rem', color: 'var(--t4)', fontWeight: 600 }}>{t.by}</div>
              </div>
            ))}
          </div>
        </Stagger>

        <Reveal delay={0.2}>
          <div style={{ textAlign: 'center', marginTop: 56 }}>
            <button onClick={() => navigate('#/audit')} className="btn btn-primary">Get Your Free Revenue Audit →</button>
          </div>
        </Reveal>
      </div>
    </section>
  </div>
);
