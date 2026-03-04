import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/*
 * LeakToSealScrollScene — WOW 2
 * Pipe with 3 cracks. As you scroll:
 * - Start: signals leak out through cracks
 * - Mid: cracks seal one by one
 * - End: all signals reach the outcome tray
 * Subtle: 1-2 particles max, no confetti.
 */

const GAPS = [
  { label: 'Invisible online', color: '#4F8EF7', seal: 'AI Search + GBP' },
  { label: 'Missed calls & leads', color: '#8B5CF6', seal: 'Voice AI + Capture' },
  { label: 'No follow-up', color: '#14B8A6', seal: 'Workflow AI + Reviews' },
];

export const LeakToSealScrollScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 30%'],
  });

  // Each gap seals at different scroll thresholds
  const seal0 = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const seal1 = useTransform(scrollYProgress, [0.25, 0.55], [0, 1]);
  const seal2 = useTransform(scrollYProgress, [0.5, 0.8], [0, 1]);
  const seals = [seal0, seal1, seal2];

  // Outcome tray opacity
  const outcomeOpacity = useTransform(scrollYProgress, [0.7, 0.95], [0, 1]);
  const outcomeY = useTransform(scrollYProgress, [0.7, 0.95], [20, 0]);

  return (
    <div ref={containerRef} className="leak-scene">
      {/* Main pipe */}
      <div className="leak-scene__pipe">
        {/* Pipe body - vertical line */}
        <div className="leak-scene__pipe-line" />

        {/* Revenue input */}
        <div className="leak-scene__input">
          <div className="leak-scene__input-dot" />
          <span>Revenue In</span>
        </div>

        {/* Gap cracks */}
        {GAPS.map((gap, i) => (
          <div
            key={gap.label}
            className="leak-scene__crack"
            style={{ top: `${20 + i * 28}%` }}
          >
            {/* Crack indicator */}
            <motion.div
              className="leak-scene__crack-mark"
              style={{
                opacity: useTransform(seals[i], [0, 1], [1, 0]),
                background: gap.color,
              }}
            >
              <div className="leak-scene__crack-label">{gap.label}</div>

              {/* Leaking particle */}
              <motion.div
                className="leak-scene__particle"
                style={{
                  opacity: useTransform(seals[i], [0, 0.5], [1, 0]),
                  background: gap.color,
                }}
                animate={{ x: [0, 20, 30], opacity: [0.7, 0.4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: i * 0.5 }}
              />
            </motion.div>

            {/* Seal badge */}
            <motion.div
              className="leak-scene__seal"
              style={{
                opacity: seals[i],
                scale: useTransform(seals[i], [0, 1], [0.8, 1]),
                borderColor: `${gap.color}40`,
              }}
            >
              <div className="leak-scene__seal-check" style={{ background: gap.color }}>
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round"><path d="M20 6L9 17l-5-5" /></svg>
              </div>
              <span>{gap.seal}</span>
            </motion.div>
          </div>
        ))}

        {/* Outcome tray */}
        <motion.div
          className="leak-scene__outcome"
          style={{ opacity: outcomeOpacity, y: outcomeY }}
        >
          <div className="leak-scene__outcome-dot" />
          <span>Revenue Recovered</span>
        </motion.div>
      </div>
    </div>
  );
};
