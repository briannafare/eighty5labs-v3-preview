import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/*
 * OutcomeSwitcher — WOW 5
 * Interactive micro-demo showing what happens when a lead is handled vs ignored.
 * Placed after the Capture section.
 */

type Outcome = null | 'handled' | 'ignored';

export const OutcomeSwitcher: React.FC = () => {
  const [outcome, setOutcome] = useState<Outcome>(null);
  const [lead] = useState({ name: 'Sarah K.', type: 'Inbound Call', time: '9:47 PM' });

  const reset = () => {
    setOutcome(null);
  };

  return (
    <div className="outcome-switcher">
      <div className="outcome-switcher__card glass-frame__inner">
        {/* Incoming lead card */}
        <div className="outcome-switcher__lead">
          <div className="outcome-switcher__lead-badge">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                width: 8, height: 8, borderRadius: '50%',
                background: outcome === null ? '#8B5CF6' : '#94A3B8',
              }}
            />
            <span>New Lead</span>
          </div>
          <div className="outcome-switcher__lead-name">{lead.name}</div>
          <div className="outcome-switcher__lead-detail">{lead.type} · {lead.time}</div>
        </div>

        {/* Choice buttons */}
        <AnimatePresence mode="wait">
          {outcome === null && (
            <motion.div
              key="choices"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -8 }}
              className="outcome-switcher__choices"
            >
              <button
                className="outcome-switcher__btn outcome-switcher__btn--handled"
                onClick={() => setOutcome('handled')}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5" /></svg>
                Handled by eighty5.OS
              </button>
              <button
                className="outcome-switcher__btn outcome-switcher__btn--ignored"
                onClick={() => setOutcome('ignored')}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                No response
              </button>
            </motion.div>
          )}

          {outcome === 'handled' && (
            <motion.div
              key="handled"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="outcome-switcher__result"
            >
              <div className="outcome-switcher__pipeline">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="outcome-switcher__pipeline-fill"
                />
              </div>
              <div className="outcome-switcher__outcome-cards">
                {[
                  { icon: '📞', label: 'Call answered in 2 rings' },
                  { icon: '📅', label: 'Appointment booked' },
                  { icon: '✉️', label: 'Confirmation sent' },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.2 }}
                    className="outcome-switcher__step-card"
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </motion.div>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="outcome-switcher__verdict outcome-switcher__verdict--won"
              >
                Lead captured. Revenue recovered.
              </motion.div>
              <button onClick={reset} className="outcome-switcher__reset">Try again</button>
            </motion.div>
          )}

          {outcome === 'ignored' && (
            <motion.div
              key="ignored"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="outcome-switcher__result"
            >
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 0.25 }}
                transition={{ duration: 1.5 }}
                className="outcome-switcher__fade-lead"
              >
                {lead.name} — {lead.type}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                className="outcome-switcher__verdict outcome-switcher__verdict--lost"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                Competitor booked.
              </motion.div>
              <button onClick={reset} className="outcome-switcher__reset">Try again</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
