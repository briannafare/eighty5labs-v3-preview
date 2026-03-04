import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/*
 * GlassFrame — WOW 3
 * Shared wrapper for all product visuals.
 * Consistent radius, border, shadow, inner highlight.
 * Optional floating notification chips for "depth stack" mode.
 */

interface FloatingChip {
  label: string;
  icon?: React.ReactNode;
  position: { top?: string | number; bottom?: string | number; left?: string | number; right?: string | number };
  delay?: number;
}

interface GlassFrameProps {
  children: React.ReactNode;
  chips?: FloatingChip[];
  className?: string;
  parallax?: boolean;
  glow?: string; // accent color for top glow
}

export const GlassFrame: React.FC<GlassFrameProps> = ({
  children,
  chips = [],
  className = '',
  parallax = false,
  glow = 'rgba(27,79,255,0.06)',
}) => {
  return (
    <div className={`glass-frame ${className}`} style={{ position: 'relative' }}>
      {/* Top inner highlight */}
      <div className="glass-frame__glow" style={{
        position: 'absolute', top: -1, left: '10%', right: '10%', height: 1,
        background: `linear-gradient(90deg, transparent, ${glow}, transparent)`,
        zIndex: 2, pointerEvents: 'none',
      }} />

      {/* Main content area */}
      <div className="glass-frame__inner">
        {children}
      </div>

      {/* Floating depth chips */}
      {chips.map((chip, i) => (
        <motion.div
          key={i}
          className="glass-frame__chip"
          initial={{ opacity: 0, y: 8, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: chip.delay ?? 0.2 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          animate={parallax ? { y: [0, -4, 0] } : undefined}
          {...(parallax ? { transition: { duration: 4 + i, repeat: Infinity, ease: 'easeInOut' } } : {})}
          style={{
            position: 'absolute',
            ...chip.position,
            zIndex: 3,
          }}
        >
          {chip.icon && <span className="glass-frame__chip-icon">{chip.icon}</span>}
          <span className="glass-frame__chip-label">{chip.label}</span>
        </motion.div>
      ))}
    </div>
  );
};

/*
 * ScrollGlassFrame — GlassFrame with scroll-driven scale/opacity
 * Used for large product demos (hero animation, etc.)
 */
interface ScrollGlassFrameProps extends GlassFrameProps {
  maxWidth?: number;
}

export const ScrollGlassFrame: React.FC<ScrollGlassFrameProps> = ({
  children,
  chips = [],
  maxWidth = 1100,
  glow,
  ...rest
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 0.35, 0.65], [0.88, 1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0.5, 1]);

  return (
    <div ref={ref} style={{ padding: '0 clamp(16px, 3vw, 40px)', maxWidth, marginInline: 'auto' }}>
      <motion.div style={{ scale, opacity }}>
        <GlassFrame chips={chips} glow={glow} {...rest}>
          {children}
        </GlassFrame>
      </motion.div>
    </div>
  );
};
