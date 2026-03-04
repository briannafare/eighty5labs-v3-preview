import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/*
 * PlatformDepthReveal — WOW 7
 * Three tiles that expand to show sub-capabilities.
 * Communicates "one system, many capabilities" without clutter.
 */

interface GapTile {
  label: string;
  color: string;
  icon: React.ReactNode;
  capabilities: { name: string; desc: string }[];
}

const TILES: GapTile[] = [
  {
    label: 'Get Found',
    color: '#4F8EF7',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
    capabilities: [
      { name: 'AI Citation Engine', desc: 'Get recommended by ChatGPT, Gemini, Perplexity' },
      { name: 'GBP Optimization', desc: 'Dominate the local Map Pack' },
      { name: 'Content Publishing', desc: 'Weekly posts and FAQ content, automated' },
      { name: 'Schema Markup', desc: 'Structured data for AI engines' },
      { name: 'Local Authority', desc: 'Build topical relevance in your market' },
    ],
  },
  {
    label: 'Capture the Lead',
    color: '#8B5CF6',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.45 19.45 0 015.13 12.8a19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
    capabilities: [
      { name: 'Voice AI Agent', desc: 'Answers every call 24/7, qualifies instantly' },
      { name: 'Web Chat Capture', desc: 'Engages visitors in real-time' },
      { name: 'SMS Auto-Response', desc: 'Missed call text-back within seconds' },
      { name: 'Calendar Integration', desc: 'Books directly to your schedule' },
      { name: 'Lead Qualification', desc: 'AI scores and routes every inquiry' },
    ],
  },
  {
    label: 'Convert the Lead',
    color: '#14B8A6',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
    capabilities: [
      { name: 'Follow-up Sequences', desc: 'Automated multi-touch nurture campaigns' },
      { name: 'Review Automation', desc: 'Request + respond to reviews automatically' },
      { name: 'Re-engagement', desc: 'Win back cold leads with targeted sequences' },
      { name: 'Appointment Reminders', desc: 'Reduce no-shows with smart reminders' },
      { name: 'Pipeline Tracking', desc: 'See every lead from first touch to close' },
    ],
  },
];

export const PlatformDepthReveal: React.FC = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="depth-reveal">
      {/* Central brain node */}
      <div className="depth-reveal__center">
        <motion.div
          className="depth-reveal__brain"
          animate={{
            boxShadow: expanded !== null
              ? `0 0 30px ${TILES[expanded].color}20, 0 0 60px ${TILES[expanded].color}10`
              : '0 0 20px rgba(27,79,255,0.08)',
          }}
        >
          <span className="depth-reveal__brain-label">eighty5.OS</span>
        </motion.div>
      </div>

      {/* Tiles */}
      <div className="depth-reveal__tiles">
        {TILES.map((tile, i) => (
          <div key={tile.label} className="depth-reveal__tile-wrap">
            <motion.button
              className="depth-reveal__tile card-hover"
              onClick={() => setExpanded(expanded === i ? null : i)}
              style={{
                borderColor: expanded === i ? `${tile.color}40` : undefined,
                background: expanded === i ? `${tile.color}04` : undefined,
              }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="depth-reveal__tile-icon" style={{ color: tile.color, background: `${tile.color}10` }}>
                {tile.icon}
              </div>
              <span className="depth-reveal__tile-label">{tile.label}</span>
              <motion.svg
                width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"
                animate={{ rotate: expanded === i ? 180 : 0 }}
                transition={{ duration: 0.25 }}
                style={{ marginLeft: 'auto', color: '#94A3B8', flexShrink: 0 }}
              >
                <path d="M6 9l6 6 6-6" />
              </motion.svg>
            </motion.button>

            {/* Expanded capabilities */}
            <AnimatePresence>
              {expanded === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="depth-reveal__capabilities"
                >
                  <div className="depth-reveal__cap-inner">
                    {tile.capabilities.map((cap, j) => (
                      <motion.div
                        key={cap.name}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: j * 0.06 }}
                        className="depth-reveal__cap-chip"
                        style={{ borderColor: `${tile.color}20` }}
                      >
                        <div className="depth-reveal__cap-dot" style={{ background: tile.color }} />
                        <div>
                          <div className="depth-reveal__cap-name">{cap.name}</div>
                          <div className="depth-reveal__cap-desc">{cap.desc}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};
