import React from 'react';
import { navigate } from '../router';

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer style={{
      background: 'var(--bg1)',
      borderTop: '1px solid var(--border)',
      paddingTop: 'clamp(48px,6vw,80px)',
      paddingBottom: 36,
    }}>
      <div className="wrap">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '48px 32px',
          paddingBottom: 48,
          borderBottom: '1px solid var(--border)',
        }}>
          {/* Brand */}
          <div style={{ gridColumn: 'span 2' }}>
            <a
              href="#/"
              onClick={e => { e.preventDefault(); navigate('#/'); }}
              style={{
                fontFamily: 'var(--fd)',
                fontSize: '1.125rem',
                fontWeight: 900,
                color: 'var(--t1)',
                textDecoration: 'none',
                letterSpacing: '-0.04em',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 14,
              }}
            >
              <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" rx="8" fill="var(--blue)"/>
                <path d="M8 22L16 8L24 22" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11 18H21" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              eighty<span style={{ color: 'var(--blue3)' }}>5</span>labs
            </a>
            <p style={{ fontSize: '0.875rem', color: 'var(--t3)', lineHeight: 1.65, maxWidth: '32ch' }}>
              AI operating system for local service businesses. Closing the visibility, reputation, and conversion gaps.
            </p>
          </div>

          {/* Company */}
          <FooterCol title="Company" links={[
            { label: 'About', route: '#/about' },
            { label: 'Blog', route: '#/blog' },
            { label: 'Pricing', route: '#/pricing' },
            { label: 'Free Audit', route: '#/audit' },
          ]}/>

          {/* Services */}
          <FooterCol title="Services" links={[
            { label: 'All Services', route: '#/services' },
            { label: 'Content AI', route: '#/services' },
            { label: 'Voice AI', route: '#/services' },
            { label: 'Reviews AI', route: '#/services' },
          ]}/>

          {/* Resources */}
          <FooterCol title="Resources" links={[
            { label: 'Resources', route: '#/resources' },
            { label: 'Glossary', route: '#/glossary' },
            { label: 'Industries', route: '#/industries' },
          ]}/>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 28,
          flexWrap: 'wrap',
          gap: 16,
        }}>
          <span style={{ fontSize: '0.8125rem', color: 'var(--t4)' }}>
            © {year} eighty5labs. All rights reserved.
          </span>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {[
              { label: 'SMS Opt-In', route: '#/optin' },
              { label: 'Privacy Policy', route: '#/privacy' },
              { label: 'Terms of Service', route: '#/terms' },
            ].map(l => (
              <a
                key={l.label}
                href={l.route}
                onClick={e => { e.preventDefault(); navigate(l.route); }}
                style={{ fontSize: '0.8125rem', color: 'var(--t4)', textDecoration: 'none', transition: 'color 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--t2)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--t4)')}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterCol = ({ title, links }: { title: string; links: { label: string; route: string }[] }) => (
  <div>
    <h4 style={{
      fontFamily: 'var(--fd)',
      fontSize: '0.6875rem',
      fontWeight: 800,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--t4)',
      marginBottom: 18,
    }}>{title}</h4>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {links.map(l => (
        <a
          key={l.label}
          href={l.route}
          onClick={e => { e.preventDefault(); navigate(l.route); }}
          style={{ fontSize: '0.875rem', color: 'var(--t3)', textDecoration: 'none', transition: 'color 0.15s' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--t1)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--t3)')}
        >
          {l.label}
        </a>
      ))}
    </div>
  </div>
);
