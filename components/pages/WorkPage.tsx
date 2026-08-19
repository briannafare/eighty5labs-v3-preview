import React from 'react';
import { Reveal } from '../ui/Reveal';
import { navigate } from '../../router';

/* Light tokens, same as ServicesPage */
const L = {
  bg: '#FFFFFF', bg2: '#F7F9FF',
  border: '#DDE5F2',
  t1: '#0F172A', t2: '#334155', t3: '#64748B',
  blue: '#1B4FFF',
};

interface Site {
  slug: string;
  name: string;
  url: string;
  domain: string;
  blurb: string;
  concept?: boolean;
}

const SITES: Site[] = [
  {
    slug: 'houselab',
    name: 'The Houselab Team',
    url: 'https://houselabteam.com',
    domain: 'houselabteam.com',
    blurb: 'Design-forward real estate brokerage in Portland. Full replatform with 116 neighborhood guides, each one structured for how Google and AI search actually read a page.',
  },
  {
    slug: 'social-revolution',
    name: 'Social Revolution',
    url: 'https://socialrevolutionevents.com',
    domain: 'socialrevolutionevents.com',
    blurb: 'Private event venue on five forested acres in Tualatin. Weddings, retreats, and celebrations, with date checks and venue tours booked straight from the page.',
  },
  {
    slug: 'lindley',
    name: 'The Lindley Team',
    url: 'https://thelindleyteam.com',
    domain: 'thelindleyteam.com',
    blurb: 'Mortgage site for David and Bri at Movement Mortgage. Built around a Mortgage Cost Analysis and calculators people actually finish.',
  },
  {
    slug: 'riverview',
    name: 'Riverview Meadows',
    url: 'https://riverview-meadows.com',
    domain: 'riverview-meadows.com',
    blurb: '74 Oregon Coast lots in Nehalem, five minutes from Manzanita. Land sales site with phase pricing, lot listings, and visit booking.',
  },
  {
    slug: 'rinseitoff',
    name: 'Rinse It Off',
    url: 'https://rinseitoff.com',
    domain: 'rinseitoff.com',
    blurb: 'Commercial and residential exterior cleaning in Portland. Every service page is written around the surface being cleaned, and the free assessment does the selling.',
  },
  {
    slug: 'hannah-wolfe',
    name: 'Hannah Wolfe',
    url: 'https://hannahwolfehomes.com',
    domain: 'hannahwolfehomes.com',
    blurb: 'Personal site for a solo Portland real estate agent, with a watercolor illustration system painted for her brand and an assistant that books consults.',
  },
  {
    slug: 'wwii',
    name: 'Oregon WWII Memorial',
    url: 'https://oregonwwiimemorial.com',
    domain: 'oregonwwiimemorial.com',
    blurb: 'Digital home of the Oregon World War II Memorial in Salem. The 3,757 Oregonians who did not come home, searchable by name, with the history behind them.',
  },
  {
    slug: 'boxless',
    name: 'Boxless Moving',
    url: 'https://boxlessmoving.com',
    domain: 'boxlessmoving.com',
    blurb: 'Reusable moving bins delivered to your door in Portland. No cardboard, and no phone call required: booking runs online end to end.',
  },
  {
    slug: 'kristina',
    name: 'Kristina Bullock',
    url: 'https://kristina-bullock-site.vercel.app',
    domain: 'Concept build',
    blurb: 'Concept site for a Portland agent with 17 years and a Five Star award behind her. Editorial layout, warm palette, proof up front.',
    concept: true,
  },
  {
    slug: 'advantage',
    name: 'Advantage Realty',
    url: 'https://advantage-realty-site.vercel.app',
    domain: 'Concept build',
    blurb: 'Concept site for a Portland brokerage with 20 years in the market. Forest green and orange system with a neighborhood guide as the lead offer.',
    concept: true,
  },
];

const SiteCard: React.FC<{ site: Site; delay: number }> = ({ site, delay }) => {
  const [hover, setHover] = React.useState(false);
  return (
    <Reveal delay={delay}>
      <a
        href={site.url}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          display: 'block',
          textDecoration: 'none',
          transform: hover ? 'translateY(-4px)' : 'translateY(0)',
          transition: 'transform 0.35s var(--ease)',
        }}
      >
        <div
          style={{
            overflow: 'hidden',
            borderRadius: 'var(--rdl)',
            border: `1px solid ${L.border}`,
            boxShadow: hover
              ? '0 2px 4px rgba(15,23,42,0.06), 0 10px 24px rgba(15,23,42,0.10)'
              : '0 1px 2px rgba(15,23,42,0.05), 0 4px 12px rgba(15,23,42,0.05)',
            transition: 'box-shadow 0.35s var(--ease)',
            background: L.bg,
          }}
        >
          <div style={{ overflow: 'hidden', aspectRatio: '2 / 1' }}>
            <img
              src={`/work/${site.slug}.webp`}
              alt={`${site.name} website`}
              loading="lazy"
              width={1280}
              height={640}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                transform: hover ? 'scale(1.025)' : 'scale(1)',
                transition: 'transform 0.5s var(--ease)',
              }}
            />
          </div>
          <div style={{ padding: '20px 22px 22px', borderTop: `1px solid ${L.border}` }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
              <h2 style={{ fontFamily: 'var(--fd)', fontSize: '1.15rem', fontWeight: 800, color: L.t1 }}>
                {site.name}
              </h2>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: hover ? L.blue : L.t3, transition: 'color 0.2s' }}>
                {site.concept ? 'View concept →' : `${site.domain} →`}
              </span>
            </div>
            <p style={{ marginTop: 8, fontSize: '0.9rem', lineHeight: 1.6, color: L.t2 }}>
              {site.blurb}
            </p>
          </div>
        </div>
      </a>
    </Reveal>
  );
};

export const WorkPage: React.FC = () => (
  <div style={{ background: L.bg2, paddingTop: 'calc(var(--nav-h) + 64px)' }}>
    {/* Header */}
    <div className="wrap" style={{ paddingBottom: 48 }}>
      <Reveal>
        <h1 style={{
          fontFamily: 'var(--fd)', fontWeight: 800, color: L.t1,
          fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', maxWidth: 720,
        }}>
          Sites we've built
        </h1>
      </Reveal>
      <Reveal delay={0.08}>
        <p style={{ marginTop: 16, fontSize: '1.05rem', lineHeight: 1.65, color: L.t2, maxWidth: 620 }}>
          Real businesses, live right now. Every one was designed from scratch for the
          business it belongs to, then wired into the capture and follow-up systems that
          turn a visit into a customer. Click through and see for yourself.
        </p>
      </Reveal>
    </div>

    {/* Gallery */}
    <div className="wrap" style={{ paddingBottom: 72 }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
        gap: 28,
      }}>
        {SITES.map((site, i) => (
          <SiteCard key={site.slug} site={site} delay={(i % 2) * 0.08} />
        ))}
      </div>
    </div>

    {/* CTA */}
    <div style={{ background: L.bg, borderTop: `1px solid ${L.border}` }}>
      <div className="wrap" style={{ padding: '72px 0 88px', textAlign: 'center' }}>
        <Reveal>
          <h2 style={{
            fontFamily: 'var(--fd)', fontWeight: 800, color: L.t1,
            fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
          }}>
            Want to know what we'd build for you?
          </h2>
          <p style={{ margin: '14px auto 0', fontSize: '1rem', lineHeight: 1.6, color: L.t2, maxWidth: 520 }}>
            It starts with a free Visibility Audit: where you show up today, where
            you're losing customers, and what we'd do about it.
          </p>
          <div style={{ marginTop: 28 }}>
            <a
              href="/audit"
              onClick={e => { e.preventDefault(); navigate('/audit'); }}
              className="btn btn-primary"
            >
              Get your free audit →
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  </div>
);

export default WorkPage;
