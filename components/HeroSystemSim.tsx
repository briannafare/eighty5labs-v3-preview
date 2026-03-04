import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/*
 * HeroSystemSim — WOW 1
 * Operating system simulation: 3 lanes showing signals flowing through the pipeline.
 * Signals spawn every ~2-4s, flow through lanes, resolve into outcomes.
 */

interface Signal {
  id: number;
  type: string;
  lane: number;
  phase: 'enter' | 'process' | 'resolve';
  outcome?: string;
}

const SIGNAL_TYPES = [
  { type: 'Search', icon: '🔍', lane: 0 },
  { type: 'Map View', icon: '📍', lane: 0 },
  { type: 'Call', icon: '📞', lane: 1 },
  { type: 'Form', icon: '📝', lane: 1 },
  { type: 'DM', icon: '💬', lane: 1 },
  { type: 'Follow-up', icon: '⚡', lane: 2 },
  { type: 'Review', icon: '⭐', lane: 2 },
];

const OUTCOMES = ['Booked', 'Qualified', 'Reputation ↑'];
const LANE_LABELS = ['Get Found', 'Capture the Lead', 'Convert the Lead'];
const LANE_COLORS = ['#4F8EF7', '#8B5CF6', '#14B8A6'];

const LANE_BULLETS: string[][] = [
  ['AI search citations', 'Map Pack dominance', 'GBP optimization'],
  ['24/7 voice answering', 'Instant lead capture', 'Calendar booking'],
  ['Auto follow-ups', 'Review generation', 'Nurture sequences'],
];

export const HeroSystemSim: React.FC = () => {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [hoveredLane, setHoveredLane] = useState<number | null>(null);
  const [burst, setBurst] = useState(false);
  const idRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  const spawnSignal = useCallback(() => {
    const template = SIGNAL_TYPES[Math.floor(Math.random() * SIGNAL_TYPES.length)];
    const id = ++idRef.current;
    const signal: Signal = { id, type: template.type, lane: template.lane, phase: 'enter' };

    setSignals(prev => [...prev.slice(-8), signal]);

    // Advance phase: enter -> process -> resolve
    setTimeout(() => {
      setSignals(prev => prev.map(s => s.id === id ? { ...s, phase: 'process' } : s));
    }, burst ? 400 : 800);

    setTimeout(() => {
      setSignals(prev => prev.map(s => s.id === id
        ? { ...s, phase: 'resolve', outcome: OUTCOMES[s.lane] }
        : s
      ));
    }, burst ? 800 : 1600);

    setTimeout(() => {
      setSignals(prev => prev.filter(s => s.id !== id));
    }, burst ? 1200 : 2400);
  }, [burst]);

  useEffect(() => {
    const rate = burst ? 600 : 2000 + Math.random() * 2000;
    intervalRef.current = setInterval(spawnSignal, rate);
    // spawn one immediately
    spawnSignal();
    return () => clearInterval(intervalRef.current);
  }, [spawnSignal, burst]);

  const handleBurst = () => {
    setBurst(true);
    setTimeout(() => setBurst(false), 2500);
  };

  return (
    <div className="hero-sim">
      {/* Lane headers */}
      <div className="hero-sim__lanes">
        {LANE_LABELS.map((label, i) => (
          <div
            key={label}
            className="hero-sim__lane"
            onMouseEnter={() => setHoveredLane(i)}
            onMouseLeave={() => setHoveredLane(null)}
          >
            {/* Lane header */}
            <div className="hero-sim__lane-header">
              <div className="hero-sim__lane-dot" style={{ background: LANE_COLORS[i] }} />
              <span className="hero-sim__lane-label" style={{ color: LANE_COLORS[i] }}>{label}</span>
            </div>

            {/* Signal flow area */}
            <div className="hero-sim__lane-flow">
              <AnimatePresence>
                {signals.filter(s => s.lane === i).map(signal => (
                  <motion.div
                    key={signal.id}
                    className="hero-sim__signal"
                    initial={{ opacity: 0, x: -20, scale: 0.8 }}
                    animate={{
                      opacity: signal.phase === 'resolve' ? 0.7 : 1,
                      x: signal.phase === 'enter' ? 0 : signal.phase === 'process' ? 40 : 80,
                      scale: signal.phase === 'resolve' ? 0.9 : 1,
                    }}
                    exit={{ opacity: 0, scale: 0.6, x: 100 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    style={{ borderColor: `${LANE_COLORS[i]}30` }}
                  >
                    <span className="hero-sim__signal-label">{signal.type}</span>
                    {signal.phase === 'resolve' && signal.outcome && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="hero-sim__signal-outcome"
                        style={{ color: LANE_COLORS[i] }}
                      >
                        → {signal.outcome}
                      </motion.span>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Empty state pulse */}
              {signals.filter(s => s.lane === i).length === 0 && (
                <div className="hero-sim__lane-idle">
                  <motion.div
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ width: 6, height: 6, borderRadius: '50%', background: LANE_COLORS[i] }}
                  />
                  <span>Monitoring...</span>
                </div>
              )}
            </div>

            {/* Hover tooltip */}
            <AnimatePresence>
              {hoveredLane === i && (
                <motion.div
                  className="hero-sim__tooltip"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  {LANE_BULLETS[i].map(b => (
                    <div key={b} className="hero-sim__tooltip-item">
                      <div style={{ width: 4, height: 4, borderRadius: 1, background: LANE_COLORS[i], flexShrink: 0, marginTop: 5 }} />
                      <span>{b}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Outcome tray */}
      <div className="hero-sim__tray">
        <div className="hero-sim__tray-label">Live Outcomes</div>
        <div className="hero-sim__tray-items">
          {OUTCOMES.map((o, i) => (
            <div key={o} className="hero-sim__tray-item" style={{ borderColor: `${LANE_COLORS[i]}30` }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: LANE_COLORS[i] }} />
              <span>{o}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
