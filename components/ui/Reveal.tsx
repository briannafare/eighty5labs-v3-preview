import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'none';
  className?: string;
  style?: React.CSSProperties;
  once?: boolean;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  delay = 0,
  direction = 'up',
  className,
  style,
  once = true,
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: '-60px 0px' });

  const initial = {
    opacity: 0,
    y: direction === 'up' ? 18 : 0,
    x: direction === 'left' ? -18 : direction === 'right' ? 18 : 0,
    filter: 'blur(4px)',
  };

  const animate = inView
    ? { opacity: 1, y: 0, x: 0, filter: 'blur(0px)' }
    : initial;

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.2, 0.8, 0.2, 1],
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
};

interface StaggerProps {
  children: React.ReactNode[];
  delay?: number;
  stagger?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const Stagger: React.FC<StaggerProps> = ({
  children,
  delay = 0,
  stagger = 0.08,
  className,
  style,
}) => {
  return (
    <div className={className} style={style}>
      {React.Children.map(children, (child, i) => (
        <Reveal key={i} delay={delay + i * stagger}>
          {child}
        </Reveal>
      ))}
    </div>
  );
};
