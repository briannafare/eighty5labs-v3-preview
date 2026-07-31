import React from 'react';
import { navigate } from '../router';
import { IconMapPin } from './ui/Icons';

const COLUMNS: { title: string; links: { label: string; route: string }[] }[] = [
  {
    title: 'Company',
    links: [
      { label: 'About 85', route: '/about' },
      { label: 'Blog', route: '/blog' },
      { label: 'Pricing', route: '/pricing' },
      { label: 'Press', route: '/resources' },
      { label: 'Free audit', route: '/audit' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Voice AI', route: '/services' },
      { label: 'Reviews AI', route: '/services' },
      { label: 'Funnel AI', route: '/services' },
      { label: 'Content AI', route: '/services' },
      { label: 'Workflow AI', route: '/services' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Glossary', route: '/glossary' },
      { label: 'Case studies', route: '/resources' },
      { label: 'AI prompts', route: '/resources' },
      { label: 'Revenue calculator', route: '/resources' },
    ],
  },
];

const SOCIALS = [
  { href: 'https://www.facebook.com/eighty5labs/', label: 'Facebook',
    path: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /> },
  { href: 'https://www.instagram.com/eighty5labs/', label: 'Instagram',
    path: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="none" stroke="currentColor" strokeWidth="2" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" strokeWidth="2" /></> },
  { href: 'https://www.youtube.com/@eighty5labs', label: 'YouTube',
    path: <><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" /><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#000" /></> },
  { href: 'https://www.linkedin.com/company/eighty5labs', label: 'LinkedIn',
    path: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></> },
  { href: 'https://x.com/eighty5labs', label: 'X',
    path: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.736-8.84L1.254 2.25H8.08l4.253 5.622 5.91-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" /> },
];

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-inner">

        <div className="footer-grid">
          <div className="footer-brand">
            <a href="/" onClick={e => { e.preventDefault(); navigate('/'); }} className="footer-logo">
              eighty<span style={{ color: '#4F8EF7' }}>5</span>labs
            </a>
            <p className="footer-blurb">
              AI lead response and search visibility for real estate agents and local service businesses.
            </p>
            <div className="footer-socials">
              {SOCIALS.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  aria-label={s.label} className="footer-social">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">{s.path}</svg>
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map(col => (
            <nav key={col.title} className="footer-col" aria-label={col.title}>
              <h2 className="footer-col-title">{col.title}</h2>
              <ul>
                {col.links.map(l => (
                  <li key={l.label}>
                    <a href={l.route} onClick={e => { e.preventDefault(); navigate(l.route); }}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="footer-bottom">
          <span>© {year} eighty5labs. All rights reserved.</span>
          <a href="https://share.google/4EpBRm13SY89EdhkK" target="_blank" rel="noopener noreferrer"
            className="footer-place">
            <IconMapPin size={13} />
            Portland, Oregon · View on Google
          </a>
          <span className="footer-legal">
            <a href="/privacy" onClick={e => { e.preventDefault(); navigate('/privacy'); }}>Privacy policy</a>
            <a href="/terms" onClick={e => { e.preventDefault(); navigate('/terms'); }}>Terms &amp; conditions</a>
          </span>
        </div>

      </div>
    </footer>
  );
};
