import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SEARCH_QUERIES = [
  "Who is the best local contractor for home remodeling?",
  "Find a top-rated emergency plumber near me",
  "Best HVAC repair service with good reviews",
  "Top-rated med spa with great reviews near me",
];

export const HeroAnimation: React.FC = () => {
  const [step, setStep] = useState(0);
  const [text, setText] = useState('');
  const [queryIndex, setQueryIndex] = useState(0);

  const fullText = SEARCH_QUERIES[queryIndex];

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (step === 0) {
      if (text.length < fullText.length) {
        timeout = setTimeout(() => setText(fullText.slice(0, text.length + 1)), 35);
      } else {
        timeout = setTimeout(() => setStep(1), 600);
      }
    } else if (step === 1) {
      timeout = setTimeout(() => setStep(2), 1800);
    } else if (step === 2) {
      timeout = setTimeout(() => {
        setStep(0);
        setText('');
        setQueryIndex((prev) => (prev + 1) % SEARCH_QUERIES.length);
      }, 5000);
    }
    return () => clearTimeout(timeout);
  }, [step, text, fullText]);

  return (
    <div style={{
      width: '100%',
      maxWidth: 600,
      marginInline: 'auto',
      background: '#fff',
      borderRadius: 20,
      boxShadow: '0 20px 60px rgba(15,23,42,0.12), 0 1px 3px rgba(15,23,42,0.06)',
      overflow: 'hidden',
      border: '1px solid var(--ls-border)',
      display: 'flex',
      flexDirection: 'column' as const,
      height: 430,
      position: 'relative' as const,
      zIndex: 20,
    }}>
      {/* Browser chrome */}
      <div style={{
        background: 'var(--ls1)',
        borderBottom: '1px solid var(--ls-border)',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}>
        <div style={{ display: 'flex', gap: 6, paddingLeft: 2 }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#F87171' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FBBF24' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#34D399' }} />
        </div>
        <div style={{
          flex: 1,
          background: '#fff',
          border: '1px solid var(--ls-border)',
          borderRadius: 999,
          padding: '6px 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
          boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
        }}>
          <SparklesIcon size={14} color="var(--blue)" />
          <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--td3)' }}>AI Search Engine</span>
        </div>
        <div style={{ width: 36 }} />
      </div>

      {/* Body */}
      <div style={{ padding: 24, flex: 1, display: 'flex', flexDirection: 'column' as const, background: '#fff' }}>
        {/* Search bar */}
        <div style={{
          background: 'var(--ls1)',
          border: '1px solid var(--ls-border)',
          borderRadius: 999,
          padding: '14px 20px',
          marginBottom: 24,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.04)',
        }}>
          <SearchIcon />
          <div style={{ flex: 1, fontSize: '0.875rem', fontWeight: 500, color: 'var(--td1)' }}>
            {text}
            {step === 0 && (
              <span style={{
                display: 'inline-block',
                width: 2,
                height: 18,
                background: 'var(--blue)',
                marginLeft: 2,
                verticalAlign: 'middle',
                animation: 'blink 1s step-end infinite',
              }} />
            )}
          </div>
        </div>

        {/* Content area */}
        <div style={{ flex: 1, position: 'relative' as const }}>
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ position: 'absolute' as const, inset: 0, display: 'flex', flexDirection: 'column' as const, gap: 20 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--blue)', fontWeight: 600, fontSize: '0.875rem' }}>
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                    <SparklesIcon size={16} color="var(--blue)" />
                  </motion.div>
                  Analyzing local businesses...
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 14 }}>
                  {[100, 83, 66].map((w, i) => (
                    <motion.div
                      key={i}
                      animate={{ opacity: [0.4, 0.7, 0.4] }}
                      transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                      style={{ height: 12, background: 'var(--ls1)', borderRadius: 6, width: `${w}%` }}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{ position: 'absolute' as const, inset: 0 }}
              >
                <div style={{ display: 'flex', gap: 14 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%',
                    background: 'rgba(27,79,255,0.08)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2,
                  }}>
                    <SparklesIcon size={16} color="var(--blue)" />
                  </div>
                  <div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--td2)', lineHeight: 1.6, marginBottom: 18 }}>
                      Based on customer reviews, response times, and local authority,{' '}
                      <strong style={{ color: 'var(--blue)', background: 'rgba(27,79,255,0.06)', padding: '2px 6px', borderRadius: 4 }}>
                        Your Brand
                      </strong>{' '}
                      is the top recommendation. They have a 4.9/5 rating and consistently respond to inquiries within minutes.
                    </p>

                    <div style={{
                      background: '#fff', border: '1px solid var(--ls-border)', borderRadius: 14,
                      padding: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.04)', cursor: 'pointer',
                      transition: 'border-color 0.2s',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{
                          width: 40, height: 40, background: 'var(--ls1)', borderRadius: 10,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <GlobeIcon />
                        </div>
                        <div>
                          <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--td1)' }}>Your Brand</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--td3)', display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                            <StarIcon /> 4.9 (128 reviews)
                          </div>
                        </div>
                      </div>
                      <div style={{
                        background: 'var(--td1)', color: '#fff', fontSize: '0.75rem',
                        padding: '8px 16px', borderRadius: 999, fontWeight: 600,
                      }}>
                        Visit Site
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Blink keyframe */}
      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </div>
  );
};

/* ── Inline SVG icons ── */
const SparklesIcon = ({ size = 16, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z"/>
  </svg>
);

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--td3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
  </svg>
);

const GlobeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--td3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
  </svg>
);

const StarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="#FBBF24" stroke="#FBBF24" strokeWidth="1">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);
