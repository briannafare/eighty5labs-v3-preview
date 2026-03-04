import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';

/*
 * SystemStatusRail — WOW 4
 * Sticky left rail on desktop showing 3 pipeline steps.
 * Highlights active step as user scrolls through sections.
 * Mobile: collapses into top progress pill.
 */

interface RailStep {
  label: string;
  sectionId: string; // id of the section element to track
  color: string;
}

const STEPS: RailStep[] = [
  { label: 'Get Found', sectionId: 'section-get-found', color: '#4F8EF7' },
  { label: 'Capture', sectionId: 'section-capture', color: '#8B5CF6' },
  { label: 'Convert', sectionId: 'section-convert', color: '#14B8A6' },
];

type StepState = 'idle' | 'active' | 'complete';

export const SystemStatusRail: React.FC = () => {
  const [stepStates, setStepStates] = useState<StepState[]>(['idle', 'idle', 'idle']);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = STEPS.map(s => document.getElementById(s.sectionId));
      const viewportCenter = window.innerHeight * 0.45;
      const newStates: StepState[] = ['idle', 'idle', 'idle'];
      let activeIdx = -1;

      sections.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top < viewportCenter && rect.bottom > 0) {
          activeIdx = i;
        }
        if (rect.bottom < viewportCenter * 0.5) {
          newStates[i] = 'complete';
        }
      });

      if (activeIdx >= 0) {
        for (let i = 0; i < activeIdx; i++) newStates[i] = 'complete';
        if (newStates[activeIdx] !== 'complete') newStates[activeIdx] = 'active';
      }

      setStepStates(newStates);

      // Show rail only when first section is near viewport
      const firstSection = sections[0];
      if (firstSection) {
        const r = firstSection.getBoundingClientRect();
        setVisible(r.top < window.innerHeight * 0.8 && r.bottom > -200);
      }

      // Also show if any section is visible
      const anyVisible = sections.some(el => {
        if (!el) return false;
        const r = el.getBoundingClientRect();
        return r.top < window.innerHeight && r.bottom > 0;
      });
      setVisible(anyVisible);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Desktop rail */}
      <AnimatePresence>
        {visible && (
          <motion.div
            className="status-rail hide-mobile"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="status-rail__track">
              {STEPS.map((step, i) => (
                <div key={step.label} className="status-rail__step">
                  {/* Connector line above (except first) */}
                  {i > 0 && (
                    <div className="status-rail__line" style={{
                      background: stepStates[i] !== 'idle' ? step.color : 'var(--ls-border)',
                      opacity: stepStates[i] !== 'idle' ? 0.5 : 0.3,
                    }} />
                  )}
                  {/* Dot */}
                  <motion.div
                    className="status-rail__dot"
                    animate={{
                      background: stepStates[i] === 'idle' ? '#E2E8F0' :
                        stepStates[i] === 'active' ? step.color : step.color,
                      boxShadow: stepStates[i] === 'active'
                        ? `0 0 0 4px ${step.color}25, 0 0 12px ${step.color}20`
                        : stepStates[i] === 'complete'
                          ? `0 0 0 2px ${step.color}20`
                          : 'none',
                      scale: stepStates[i] === 'active' ? 1.15 : 1,
                    }}
                    transition={{ duration: 0.35 }}
                  >
                    {stepStates[i] === 'complete' && (
                      <motion.svg
                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                        width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </motion.svg>
                    )}
                    {stepStates[i] === 'active' && (
                      <motion.div
                        animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{
                          position: 'absolute', inset: -3,
                          borderRadius: '50%',
                          border: `1.5px solid ${step.color}`,
                        }}
                      />
                    )}
                  </motion.div>
                  {/* Label */}
                  <span className="status-rail__label" style={{
                    color: stepStates[i] === 'idle' ? '#94A3B8' : stepStates[i] === 'active' ? step.color : 'var(--td2)',
                    fontWeight: stepStates[i] === 'active' ? 800 : 600,
                  }}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile progress pill */}
      <AnimatePresence>
        {visible && (
          <motion.div
            className="status-pill hide-desktop"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="status-pill__track">
              {STEPS.map((step, i) => (
                <div key={step.label} className="status-pill__segment" style={{
                  background: stepStates[i] === 'idle' ? '#E2E8F0' :
                    stepStates[i] === 'active' ? step.color : step.color,
                  opacity: stepStates[i] === 'idle' ? 0.3 : stepStates[i] === 'active' ? 1 : 0.6,
                  flex: 1,
                  height: 3,
                  borderRadius: 2,
                  transition: 'all 0.35s',
                }} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
