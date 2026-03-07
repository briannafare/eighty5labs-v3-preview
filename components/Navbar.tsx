import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navigate } from '../router';

const NAV_LINKS = [
  { label: 'Services', route: '/services' },
  { label: 'Industries', route: '/industries' },
  { label: 'Pricing', route: '/pricing' },
  { label: 'Resources', route: '/resources' },
  { label: 'About 85', route: '/about' },
  { label: 'Blog', route: '/blog' },
];

export const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, []);

  return (
    <>
      {/* Floating pill nav */}
      <header style={{
        position: 'fixed',
        top: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '95%',
        maxWidth: 1140,
        zIndex: 100,
      }}>
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: scrolled ? '10px 24px' : '14px 24px',
            borderRadius: 999,
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            background: scrolled ? 'rgba(255,255,255,0.78)' : 'rgba(255,255,255,0.65)',
            backdropFilter: scrolled ? 'blur(20px) saturate(200%)' : 'blur(12px) saturate(150%)',
            WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(200%)' : 'blur(12px) saturate(150%)',
            border: scrolled ? '1px solid rgba(232,228,221,0.55)' : '1px solid rgba(232,228,221,0.35)',
            boxShadow: scrolled
              ? '0 8px 32px rgba(15,23,42,0.06), 0 1px 2px rgba(15,23,42,0.03)'
              : '0 2px 12px rgba(15,23,42,0.02)',
          }}
        >
          {/* Logo */}
          <a
            href="/"
            onClick={e => { e.preventDefault(); navigate('/'); }}
            style={{
              fontFamily: 'var(--fl)',
              fontSize: '1.2rem',
              fontWeight: 900,
              color: 'var(--td1)',
              textDecoration: 'none',
              letterSpacing: '-0.04em',
            }}
          >
            eighty<span style={{ color: 'var(--blue)' }}>5</span>labs
          </a>

          {/* Desktop Links */}
          <nav className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
            {NAV_LINKS.map(link => (
              <a
                key={link.label}
                href={link.route}
                onClick={e => { e.preventDefault(); navigate(link.route); }}
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: 'var(--td3)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--blue)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--td3)')}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop right */}
          <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <a
              href="#"
              style={{
                fontSize: '0.875rem', fontWeight: 600, color: 'var(--td3)',
                textDecoration: 'none', transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--blue)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--td3)')}
            >
              Log in
            </a>
            <a
              href="/audit"
              onClick={e => { e.preventDefault(); navigate('/audit'); }}
              className="btn-nav btn-nav-primary"
            >
              Free Audit
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="hide-desktop"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              background: 'transparent', border: 'none',
              cursor: 'pointer', color: 'var(--td1)',
              display: 'flex', alignItems: 'center', padding: 4,
            }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="8" x2="21" y2="8"/><line x1="3" y1="16" x2="21" y2="16"/></svg>
            )}
          </button>
        </motion.div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed', top: 84, left: '2.5%', right: '2.5%', zIndex: 99,
              background: 'rgba(255,255,255,0.97)',
              backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid var(--ls-border)', borderRadius: 24,
              padding: '20px 24px 24px',
              boxShadow: '0 16px 48px rgba(15,23,42,0.12)',
              display: 'flex', flexDirection: 'column' as const, gap: 0,
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
                  padding: '14px 0', fontFamily: 'var(--fd)',
                  fontSize: '1rem', fontWeight: 700, color: 'var(--td2)',
                  textDecoration: 'none', borderBottom: '1px solid var(--ls-border)',
                }}
              >
                {link.label}
              </motion.a>
            ))}
            <div style={{ paddingTop: 20 }}>
              <a
                href="/audit"
                onClick={e => { e.preventDefault(); navigate('/audit'); setMobileOpen(false); }}
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Get Free Visibility Audit →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
