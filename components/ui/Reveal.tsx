import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  once?: boolean;
}

/**
 * Scroll-in reveal: opacity plus a short rise, and nothing else.
 *
 * The previous version also animated a 4px blur, which cost a filter
 * repaint on every frame and — because `filter` creates a containing
 * block — quietly broke `position: sticky` for anything nested inside.
 */
export const Reveal: React.FC<RevealProps> = ({
  children,
  delay = 0,
  className,
  style,
  once = true,
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: '-40px 0px' });
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div ref={ref} className={className} style={style}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 8 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
      transition={{ duration: 0.35, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
};

interface StaggerProps {
  children: React.ReactNode | React.ReactNode[];
  delay?: number;
  stagger?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const Stagger: React.FC<StaggerProps> = ({
  children,
  delay = 0,
  stagger = 0.06,
  className,
  style,
}) => {
  const childArray = Array.isArray(children) ? children : [children];
  return (
    <div className={className} style={style}>
      {childArray.map((child, i) => (
        <Reveal key={i} delay={delay + i * stagger}>
          {child}
        </Reveal>
      ))}
    </div>
  );
};
