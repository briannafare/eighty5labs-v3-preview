import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navigate } from '../router';

const NAV_LINKS = [
  { label: 'Services', route: '#/services' },
  { label: 'Industries', route: '#/industries' },
  { label: 'Pricing', route: '#/pricing' },
  { label: 'Resources', route: '#/resources' },
  { label: 'About 85', route: '#/about' },
  { label: 'Blog', route: '#/blog' },
];

export const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: 'var(--nav-h)',
          display: 'flex',
          alignItems: 'center',
          background: 'rgba(255,255,255,0.96)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--ls-border)',
        }}
      >
        <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <a
            href="#/"
            onClick={e => { e.preventDefault(); navigate('#/'); }}
            style={{
              fontFamily: 'var(--fd)',
              fontSize: '1.125rem',
              fontWeight: 900,
              color: 'var(--td1)',
              textDecoration: 'none',
              letterSpacing: '-0.04em',
            }}
          >
            eighty<span style={{ color: 'var(--blue)' }}>5</span>labs
          </a>

          {/* Desktop Nav */}
          <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 26 }}>
              {NAV_LINKS.map(link => (
                <a
                  key={link.label}
                  href={link.route}
                  onClick={e => { e.preventDefault(); navigate(link.route); }}
                  style={{
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                    color: 'var(--td3)',
                    textDecoration: 'none',
                    transition: 'color 0.15s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--td1)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--td3)')}
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <a
                href="#"
                className="btn-nav btn-nav-ghost"
                style={{ fontSize: '0.8125rem', fontWeight: 500 }}
              >
                Log in
              </a>
              <a
                href="#/audit"
                onClick={e => { e.preventDefault(); navigate('#/audit'); }}
                className="btn-nav btn-nav-primary"
              >
              Free Audit
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            className="hide-desktop"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              background: 'transparent',
              border: '1px solid var(--ls-border)',
              borderRadius: 'var(--rd-nav)',
              padding: '8px 10px',
              cursor: 'pointer',
              color: 'var(--td2)',
              display: 'flex',
              alignItems: 'center',
            }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="8" x2="21" y2="8"/><line x1="3" y1="16" x2="21" y2="16"/></svg>
            )}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              top: 'var(--nav-h)',
              left: 0,
              right: 0,
              zIndex: 99,
              background: 'rgba(255,255,255,0.98)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid var(--ls-border)',
              padding: '20px 24px 28px',
              display: 'flex',
              flexDirection: 'column',
              gap: 0,
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.label}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                href={link.route}
                onClick={e => { e.preventDefault(); navigate(link.route); setMobileOpen(false); }}
                style={{
                  padding: '13px 0',
                  fontFamily: 'var(--fd)',
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: 'var(--td2)',
                  textDecoration: 'none',
                  borderBottom: '1px solid var(--ls-border)',
                }}
              >
                {link.label}
              </motion.a>
            ))}
            <div style={{ paddingTop: 20 }}>
              <a
                href="#/audit"
                onClick={e => { e.preventDefault(); navigate('#/audit'); setMobileOpen(false); }}
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Get Free Audit →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const LogoMark = () => (
  <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="8" fill="var(--blue)"/>
    <path d="M8 22L16 8L24 22" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11 18H21" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
