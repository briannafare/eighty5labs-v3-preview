import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Reveal } from '../ui/Reveal';
import { navigate } from '../../router';
import { POSTS } from '../../seo/posts';

const fmtDate = (iso: string) =>
  new Date(iso + 'T12:00:00Z').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });

export default function BlogPage() {
  return (
    <div style={{ paddingTop: 'var(--nav-h)', paddingBottom: 80, background: '#FFFFFF', color: '#0F172A' }}>

      {/* Hero */}
      <section style={{ padding: 'clamp(48px,5vw,80px) 0 40px', background: '#F7F9FF', borderBottom: '1px solid #DDE5F2' }}>
        <div className="wrap" style={{ maxWidth: 680, textAlign: 'center' }}>
          <Reveal>
            <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1B4FFF', marginBottom: 12 }}>Blog</p>
            <h1 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(2rem,4.5vw,3.25rem)', fontWeight: 800, letterSpacing: '-0.04em', color: '#0F172A', marginBottom: 16 }}>
              Notes for Local Business Owners
            </h1>
            <p style={{ color: '#64748B', fontSize: '1rem', lineHeight: 1.7 }}>
              AI search, Google Maps, Voice AI and follow-up, written by the eighty5labs team.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="wrap" style={{ maxWidth: 760, paddingTop: 48, paddingBottom: 24 }}>
        {POSTS.length === 0 ? (
          <div style={{ padding: '28px 32px', background: '#F7F9FF', border: '1.5px solid #DDE5F2', borderRadius: 14 }}>
            <h2 style={{ fontFamily: 'var(--fd)', fontWeight: 800, fontSize: '1.125rem', color: '#0F172A', marginBottom: 10 }}>No articles are published yet.</h2>
            <p style={{ color: '#64748B', lineHeight: 1.7, fontSize: '0.9375rem' }}>
              Until there are, the <Link to="/glossary" style={{ color: '#1B4FFF' }}>glossary</Link> explains the terms we use and the <Link to="/resources" style={{ color: '#1B4FFF' }}>resources page</Link> lists what we offer.
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: 20 }}>
            {POSTS.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.04}>
                <motion.div whileHover={{ x: 3 }} style={{ padding: '20px 24px', background: '#F7F9FF', border: '1.5px solid #DDE5F2', borderRadius: 14 }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10 }}>
                    <span style={{ background: 'rgba(27,79,255,0.1)', color: '#1B4FFF', fontSize: '0.7rem', fontWeight: 700, padding: '3px 8px', borderRadius: 5 }}>{post.tag}</span>
                    <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{fmtDate(post.datePublished)}</span>
                  </div>
                  <h2 style={{ fontFamily: 'var(--fd)', fontWeight: 800, fontSize: '1.0625rem', lineHeight: 1.35, letterSpacing: '-0.01em', marginBottom: 8 }}>
                    <Link to={post.path} style={{ color: '#0F172A', textDecoration: 'none' }}>{post.title}</Link>
                  </h2>
                  <p style={{ fontSize: '0.875rem', color: '#64748B', lineHeight: 1.65 }}>{post.description}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        )}

        {/* Mini CTA */}
        <div style={{ marginTop: 40, padding: '24px', background: 'rgba(27,79,255,0.06)', border: '1.5px solid rgba(27,79,255,0.2)', borderRadius: 14, textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--fd)', fontWeight: 800, fontSize: '1rem', color: '#0F172A', marginBottom: 8 }}>Want to see where you stand?</p>
          <p style={{ fontSize: '0.875rem', color: '#64748B', marginBottom: 16, lineHeight: 1.5 }}>The Visibility Audit is free.</p>
          <motion.button whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.98 }} onClick={() => navigate('/audit')} className="btn btn-primary">
            Get the Free Visibility Audit →
          </motion.button>
        </div>
      </div>
    </div>
  );
}
