import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/*
 * AmbientField — WOW 6
 * Background system with slow-drifting radial glows.
 * Each section defines glow position, intensity, and accent hue.
 * Motion stays behind content; content never jiggles.
 */

interface AmbientFieldProps {
  children: React.ReactNode;
  /** Primary glow color with alpha, e.g. 'rgba(27,79,255,0.08)' */
  glowA?: string;
  /** Secondary glow color, e.g. 'rgba(139,92,246,0.06)' */
  glowB?: string;
  /** Position of primary glow: 'top-left' | 'top-right' | 'center' | 'bottom-left' | 'bottom-right' */
  posA?: string;
  posB?: string;
  /** Grid overlay intensity 0-1 */
  gridIntensity?: number;
  className?: string;
  style?: React.CSSProperties;
}

const POS_MAP: Record<string, string> = {
  'top-left': '20% 15%',
  'top-right': '80% 15%',
  'center': '50% 50%',
  'bottom-left': '25% 85%',
  'bottom-right': '75% 85%',
  'top-center': '50% 10%',
  'bottom-center': '50% 90%',
};

export const AmbientField: React.FC<AmbientFieldProps> = ({
  children,
  glowA = 'rgba(27,79,255,0.07)',
  glowB = 'rgba(139,92,246,0.05)',
  posA = 'top-right',
  posB = 'bottom-left',
  gridIntensity = 0,
  className = '',
  style = {},
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  // Subtle drift of glow positions
  const xA = useTransform(scrollYProgress, [0, 1], ['0%', '3%']);
  const yA = useTransform(scrollYProgress, [0, 1], ['0%', '2%']);
  const xB = useTransform(scrollYProgress, [0, 1], ['0%', '-2%']);

  return (
    <div ref={ref} className={className} style={{ position: 'relative', overflow: 'hidden', ...style }}>
      {/* Primary glow orb */}
      <motion.div
        style={{
          position: 'absolute',
          width: '60%', height: '60%',
          background: `radial-gradient(circle at ${POS_MAP[posA] || posA}, ${glowA} 0%, transparent 65%)`,
          pointerEvents: 'none',
          top: 0, left: 0, right: 0, bottom: 0,
          x: xA, y: yA,
          zIndex: 0,
        }}
      />
      {/* Secondary glow orb */}
      <motion.div
        style={{
          position: 'absolute',
          width: '50%', height: '50%',
          background: `radial-gradient(circle at ${POS_MAP[posB] || posB}, ${glowB} 0%, transparent 65%)`,
          pointerEvents: 'none',
          top: 0, left: 0, right: 0, bottom: 0,
          x: xB,
          zIndex: 0,
        }}
      />
      {/* Optional grid overlay */}
      {gridIntensity > 0 && (
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            linear-gradient(rgba(15,23,42,${gridIntensity * 0.04}) 1px, transparent 1px),
            linear-gradient(90deg, rgba(15,23,42,${gridIntensity * 0.04}) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 30%, black 0%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 30%, black 0%, transparent 75%)',
          pointerEvents: 'none',
          zIndex: 0,
        }} />
      )}
      {/* Content always above */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
};

/*
 * SectionDivider — Fix 3
 * Consistent divider motif: thin line + tiny node
 */
export const SectionDivider: React.FC<{ dark?: boolean }> = ({ dark = false }) => (
  <div style={{
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '0', height: 1, position: 'relative',
  }}>
    <div style={{
      width: '100%', maxWidth: 200, height: 1,
      background: dark ? 'rgba(255,255,255,0.06)' : 'var(--ls-border)',
    }} />
    <div style={{
      position: 'absolute',
      width: 7, height: 7, borderRadius: '50%',
      background: dark ? 'rgba(255,255,255,0.12)' : 'var(--ls-border)',
      border: `2px solid ${dark ? 'rgba(255,255,255,0.06)' : '#EEF2FB'}`,
    }} />
  </div>
);
