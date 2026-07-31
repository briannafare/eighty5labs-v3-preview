import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message { from: 'Chloe' | 'User'; text: string; }

const SCENES: Record<string, Message[]> = {
  'After-hours': [
    { from: 'User',  text: "Hi — I just drove past your listing on Maple Ave. Is it still available?" },
    { from: 'Chloe', text: "It is. Three bed, two bath, listed at $485,000. Are you working with an agent already, or shopping on your own?" },
    { from: 'User',  text: "On our own so far. Could we see it this weekend?" },
    { from: 'Chloe', text: "Saturday at 11 or Sunday at 2 are both open. Which works better?" },
    { from: 'User',  text: "Saturday at 11." },
    { from: 'Chloe', text: "Booked. Confirmation is on its way by text, and Marcus will follow up tonight with the disclosure packet." },
  ],
  'Seller lead': [
    { from: 'User',  text: "We're thinking about selling and wanted an idea of what our place is worth." },
    { from: 'Chloe', text: "Happy to help. What's the address, and roughly how long have you owned it?" },
    { from: 'User',  text: "412 Birch Street, about nine years." },
    { from: 'Chloe', text: "Got it. I've scheduled a valuation walkthrough for Thursday at 5:30 and sent over three recent comps on your block in the meantime." },
  ],
  'Open house': [
    { from: 'User',  text: "Are you doing an open house this weekend anywhere in Brookfield?" },
    { from: 'Chloe', text: "Two — Maple Ave on Saturday 12 to 3, and Birch Street on Sunday 1 to 4. Want me to text you both addresses?" },
    { from: 'User',  text: "Yes please." },
    { from: 'Chloe', text: "Sent. I've added you to the Brookfield new-listing alerts as well — you'll hear first when something comes on." },
  ],
};

const LOG_STEPS = ['Lead qualified', 'Showing booked', 'Confirmation sent', 'CRM updated'];
const SCENE_KEYS = Object.keys(SCENES);
const MSG_DELAY = 1600;

export const VoiceAIDemo: React.FC = () => {
  const [activeScene, setActiveScene] = useState('After-hours');
  const [messages, setMessages] = useState<Message[]>([]);
  const [logItems, setLogItems] = useState<string[]>([]);
  const [logVisible, setLogVisible] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const runScene = (name: string) => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    setMessages([]);
    setLogItems([]);
    setLogVisible(false);

    const msgs = SCENES[name] ?? [];
    msgs.forEach((msg, i) => {
      const t = setTimeout(() => {
        setMessages(prev => [...prev, msg]);
        requestAnimationFrame(() => {
          if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
        });
        if (i === 1) { setLogVisible(true); setLogItems(['Lead qualified']); }
        if (i >= msgs.length - 1) setLogItems(LOG_STEPS);
      }, i * MSG_DELAY);
      timersRef.current.push(t);
    });

    const cycleT = setTimeout(() => {
      const next = SCENE_KEYS[(SCENE_KEYS.indexOf(name) + 1) % SCENE_KEYS.length];
      setActiveScene(next);
    }, msgs.length * MSG_DELAY + 3000);
    timersRef.current.push(cycleT);
  };

  useEffect(() => {
    runScene(activeScene);
    return () => timersRef.current.forEach(clearTimeout);
  }, [activeScene]);

  return (
    <div>
      {/* Scene selector */}
      <div style={{
        display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16,
        padding: '0 4px',
      }}>
        {SCENE_KEYS.map(key => {
          const active = activeScene === key;
          return (
            <button
              key={key}
              onClick={() => { if (!active) setActiveScene(key); }}
              style={{
                fontSize: '0.7rem', fontWeight: 700,
                padding: '5px 14px', borderRadius: 100, cursor: 'pointer',
                border: `1px solid ${active ? 'var(--blue)' : 'var(--ls-border)'}`,
                background: active ? 'var(--blue)' : '#fff',
                color: active ? '#fff' : 'var(--td3)',
                transition: 'all 0.18s', letterSpacing: '-0.01em',
              }}
            >
              {key}
            </button>
          );
        })}
      </div>

      {/* Terminal */}
      <div style={{ position: 'relative' }}>
        <div style={{
          background: '#0D1117',
          borderRadius: 16,
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.08)',
        }}>
          {/* Title bar */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '10px 16px',
            background: 'rgba(255,255,255,0.03)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}>
            <div style={{ display: 'flex', gap: 5 }}>
              {['#FF5F57','#FEBC2E','#28C840'].map(c => (
                <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
              ))}
            </div>
            <span style={{ fontSize: '0.625rem', fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)', marginLeft: 10 }}>
              Voice AI — live call transcript
            </span>
          </div>

          {/* Chat */}
          <div
            ref={chatRef}
            style={{
              padding: '20px 24px',
              height: 340,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 18,
              fontFamily: 'monospace',
              fontSize: '0.8125rem',
            }}
          >
            <AnimatePresence initial={false}>
              {messages.map((msg, i) => {
                const isChloe = msg.from === 'Chloe';
                return (
                  <motion.div
                    key={`${activeScene}-${i}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                    style={{
                      display: 'flex', flexDirection: 'column',
                      alignItems: isChloe ? 'flex-start' : 'flex-end',
                    }}
                  >
                    <span style={{
                      fontSize: '0.625rem', fontWeight: 700,
                      marginBottom: 5,
                      color: isChloe ? 'var(--blue)' : 'rgba(255,255,255,0.35)',
                    }}>
                      {msg.from}
                    </span>
                    <div style={{
                      maxWidth: '85%', padding: '12px 16px', borderRadius: 12, lineHeight: 1.6,
                      background: isChloe ? 'rgba(255,255,255,0.05)' : 'rgba(79,142,247,0.1)',
                      border: `1px solid ${isChloe ? 'rgba(255,255,255,0.07)' : 'rgba(79,142,247,0.16)'}`,
                      color: isChloe ? 'rgba(255,255,255,0.88)' : '#93C5FD',
                    }}>
                      {msg.text}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {messages.length === 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem' }}>
                <motion.span
                  animate={{ opacity: [0.2, 0.8, 0.2] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                >●</motion.span>
                Waiting for call...
              </div>
            )}
          </div>
        </div>

        {/* Automation Log */}
        <motion.div
          animate={{ opacity: logVisible ? 1 : 0, y: logVisible ? 0 : 8 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{
            marginTop: 14,
            background: '#fff',
            borderRadius: 14,
            padding: '14px 18px',
            border: '1px solid var(--ls-border)',
          }}
        >
          <div style={{
            fontSize: '0.7rem', fontWeight: 600,
            color: 'var(--td3)', marginBottom: 10,
          }}>
            Automation log
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '7px 16px' }}>
            {LOG_STEPS.map(step => {
              const done = logItems.includes(step);
              return (
                <div key={step} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <motion.div
                    animate={{
                      background: done ? 'var(--blue)' : '#F1F5F9',
                      borderColor: done ? 'var(--blue)' : '#DDE5F2',
                      }}
                    transition={{ duration: 0.3 }}
                    style={{
                      width: 14, height: 14, borderRadius: 4, flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      border: '1.5px solid',
                    }}
                  >
                    {done && (
                      <motion.svg
                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                        width="8" height="8" viewBox="0 0 24 24"
                        fill="none" stroke="white" strokeWidth="4"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </motion.svg>
                    )}
                  </motion.div>
                  <span style={{
                    fontSize: '0.67rem', fontWeight: 700,
                    color: done ? 'var(--td1)' : '#94A3B8',
                    transition: 'color 0.3s',
                  }}>
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
