import React from 'react';
import { navigate } from '../router';

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  const socialStyle: React.CSSProperties = {
    width: 34, height: 34, borderRadius: 8,
    background: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(255,255,255,0.09)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: 'rgba(255,255,255,0.55)',
    transition: 'all 0.2s', flexShrink: 0,
  };

  return (
    <footer style={{
      background: '#000000',
      padding: '56px 48px 32px',
      borderTop: 'none',
      marginTop: 0,
    }}>
      <div style={{
        maxWidth: 1100, margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr',
        gap: 48, paddingBottom: 40,
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }} className="footer-grid">
        <div>
          <a href="#/" onClick={e => { e.preventDefault(); navigate('#/'); }} style={{
            fontFamily: 'var(--fd)', fontSize: '1.1rem', fontWeight: 900, letterSpacing: '-0.04em',
            color: '#fff', textDecoration: 'none', display: 'block', marginBottom: 10,
          }}>
            eighty<span style={{ color: '#1B4FFF' }}>5</span>labs
          </a>
          <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, maxWidth: 220, marginBottom: 20 }}>
            AI operating system for local service businesses. Closing the visibility, reputation, and conversion gaps.
          </p>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <SocialIcon href="https://www.facebook.com/eighty5labs/" label="Facebook" style={socialStyle}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </SocialIcon>
            <SocialIcon href="https://www.instagram.com/eighty5labs/" label="Instagram" style={socialStyle}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </SocialIcon>
            <SocialIcon href="https://www.youtube.com/@eighty5labs" label="YouTube" style={socialStyle}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#000"/></svg>
            </SocialIcon>
            <SocialIcon href="https://www.linkedin.com/company/eighty5labs" label="LinkedIn" style={socialStyle}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </SocialIcon>
            <SocialIcon href="https://x.com/eighty5labs" label="X" style={socialStyle}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.736-8.84L1.254 2.25H8.08l4.253 5.622 5.91-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </SocialIcon>
          </div>
        </div>
        <FooterCol title="Company" links={[
          { label: 'About 85', route: '#/about' },
          { label: 'Blog', route: '#/blog' },
          { label: 'Pricing', route: '#/pricing' },
          { label: 'Press', route: '#/resources' },
          { label: 'Free Audit', route: '#/audit' },
        ]}/>
        <FooterCol title="Services" links={[
          { label: 'Voice AI', route: '#/services' },
          { label: 'Reviews AI', route: '#/services' },
          { label: 'Funnel AI', route: '#/services' },
          { label: 'Content AI', route: '#/services' },
          { label: 'Workflow AI', route: '#/services' },
        ]}/>
        <FooterCol title="Resources" links={[
          { label: 'Glossary', route: '#/glossary' },
          { label: 'Case Studies', route: '#/resources' },
          { label: 'AI Prompts', route: '#/resources' },
          { label: 'Revenue Calculator', route: '#/resources' },
        ]}/>
      </div>
      <div style={{
        maxWidth: 1100, margin: '0 auto', paddingTop: 24,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 12,
      }}>
        <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.85)' }}>© {year} eighty5labs. All rights reserved.</span>
        <a href="https://share.google/4EpBRm13SY89EdhkK" target="_blank" rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: '0.75rem', color: 'rgba(255,255,255,0.85)', textDecoration: 'none', transition: 'color 0.15s' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          Portland, Oregon · View on Google
        </a>
        <div style={{ display: 'flex', gap: 20 }}>
          {[{ label: 'Privacy Policy', route: '#/privacy' }, { label: 'Terms & Conditions', route: '#/terms' }].map(l => (
            <a key={l.label} href={l.route} onClick={e => { e.preventDefault(); navigate(l.route); }}
              style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.85)', textDecoration: 'none', transition: 'color 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
            >{l.label}</a>
          ))}
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ href, label, style, children }: { href: string; label: string; style: React.CSSProperties; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} style={style}
    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(79,142,247,0.2)'; e.currentTarget.style.borderColor = 'rgba(79,142,247,0.4)'; e.currentTarget.style.color = '#4F8EF7'; }}
    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'; e.currentTarget.style.color = 'rgba(255,255,255,0.55)'; }}
  >{children}</a>
);

const FooterCol = ({ title, links }: { title: string; links: { label: string; route: string }[] }) => (
  <div>
    <h4 style={{
      fontFamily: 'var(--fd)', fontSize: '0.68rem', fontWeight: 900,
      letterSpacing: '0.1em', textTransform: 'uppercase', color: '#FFFFFF', marginBottom: 14,
    }}>{title}</h4>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
      {links.map(l => (
        <a key={l.label} href={l.route} onClick={e => { e.preventDefault(); navigate(l.route); }}
          style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.82)', textDecoration: 'none', transition: 'color 0.15s' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.82)')}
        >{l.label}</a>
      ))}
    </div>
  </div>
);
