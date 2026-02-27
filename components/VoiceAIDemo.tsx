import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message { from: 'Chloe' | 'User'; text: string; }

const SCENES: Record<string, Message[]> = {
  Emergency: [
    { from: 'User',  text: 'Hey, I have a massive pipe burst in my kitchen — can someone help?' },
    { from: 'Chloe', text: 'I understand this is an emergency. I have your location on file — is this for the Main St address?' },
    { from: 'User',  text: 'Yes! Please hurry.' },
    { from: 'Chloe', text: "I've prioritized your ticket. Dispatch is notified. Emergency technician booked for 15 minutes from now. Confirmation SMS on its way." },
  ],
  'After-hours': [
    { from: 'User',  text: 'Hello, looking for a quote for a new roof installation.' },
    { from: 'Chloe', text: "Hi! I can certainly help. To get an accurate quote, how many square feet is your property?" },
    { from: 'User',  text: 'About 2,400 sq ft.' },
    { from: 'Chloe', text: 'Perfect. I have a slot available tomorrow at 2 PM for an inspector to visit. Does that work?' },
    { from: 'User',  text: 'Yes, that works.' },
    { from: 'Chloe', text: "Excellent. Appointment booked for tomorrow at 2 PM. I've updated your CRM profile with the details." },
  ],
  Routine: [
    { from: 'User',  text: 'I need to reschedule my maintenance for next week.' },
    { from: 'Chloe', text: "No problem! Let me pull up your current booking... I see it on Tuesday. What day next week works better?" },
    { from: 'User',  text: 'Thursday would be great.' },
    { from: 'Chloe', text: "Done — rescheduled to Thursday. Confirmation sent to your phone." },
  ],
};

const LOG_STEPS = ['Lead qualified', 'Appointment booked', 'Confirmation sent', 'CRM updated'];
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
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: 'clamp(40px, 6vw, 72px)',
      alignItems: 'center',
    }}>

      {/* LEFT */}
      <div>
        <div className="section-label">Interactive Demo</div>
        <h2 style={{
          fontFamily: 'var(--fd)',
          fontWeight: 900,
          fontSize: 'clamp(1.9rem, 3.2vw, 2.7rem)',
          letterSpacing: '-0.04em',
          color: 'var(--td1)',
          lineHeight: 1.07,
          marginBottom: 10,
        }}>
          This is Chloe.
        </h2>
        <p style={{
          fontSize: '1.0625rem',
          fontWeight: 600,
          color: 'var(--td2)',
          letterSpacing: '-0.01em',
          lineHeight: 1.5,
          marginBottom: 24,
        }}>
          She's not a person — she's your 24/7 AI receptionist.
        </p>

        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {['Answer a call', 'Qualify the lead', 'Book an appointment', 'Send confirmation'].map((item, i) => (
            <li key={i} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              fontFamily: 'var(--fd)', fontWeight: 700,
              fontSize: '1rem', color: 'var(--td1)',
              letterSpacing: '-0.01em',
            }}>
              <div style={{
                width: 22, height: 22, borderRadius: 6, background: 'var(--td1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              {item}
            </li>
          ))}
        </ul>

        <p style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '1rem', color: 'var(--td1)', marginBottom: 24 }}>
          All in under 90 seconds.
        </p>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
          {SCENE_KEYS.map(key => {
            const active = activeScene === key;
            return (
              <button
                key={key}
                onClick={() => { if (!active) setActiveScene(key); }}
                style={{
                  fontSize: '0.75rem', fontWeight: 700,
                  padding: '6px 16px', borderRadius: 100, cursor: 'pointer',
                  border: `1.5px solid ${active ? 'var(--blue)' : 'var(--ls-border)'}`,
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

        <a
          href="tel:+15035551234"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontSize: '0.875rem', fontWeight: 700, color: 'var(--td1)',
            borderBottom: '1px solid var(--ls-border)', paddingBottom: 4,
            textDecoration: 'none', transition: 'border-color 0.18s',
          }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--td1)')}
          onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--ls-border)')}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          Call the demo line →
        </a>
      </div>

      {/* RIGHT: terminal */}
      <div style={{ position: 'relative' }}>
        <div style={{
          background: '#0D1117',
          borderRadius: 16,
          overflow: 'hidden',
          boxShadow: '0 24px 64px rgba(0,0,0,0.28)',
          border: '1px solid rgba(255,255,255,0.06)',
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
              Chloe AI — Live Call Transcription
            </span>
          </div>

          {/* Chat */}
          <div
            ref={chatRef}
            style={{
              padding: '20px 24px',
              height: 380,
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
                      fontSize: '0.5625rem', fontWeight: 900,
                      textTransform: 'uppercase', letterSpacing: '0.18em',
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
            position: 'absolute',
            bottom: -28,
            right: -24,
            background: '#fff',
            borderRadius: 16,
            padding: '18px 22px',
            boxShadow: '0 16px 48px rgba(0,0,0,0.13)',
            border: '1px solid var(--ls-border)',
            width: 210,
            pointerEvents: 'none',
          }}
        >
          <div style={{
            fontSize: '0.5625rem', fontWeight: 800,
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'rgba(0,0,0,0.28)', marginBottom: 14,
          }}>
            Automation Log
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            {LOG_STEPS.map(step => {
              const done = logItems.includes(step);
              return (
                <div key={step} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <motion.div
                    animate={{
                      background: done ? 'var(--blue)' : '#F1F5F9',
                      borderColor: done ? 'var(--blue)' : '#DDE5F2',
                      boxShadow: done ? '0 0 10px rgba(79,142,247,0.3)' : 'none',
                    }}
                    transition={{ duration: 0.3 }}
                    style={{
                      width: 15, height: 15, borderRadius: 4, flexShrink: 0,
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
                    fontSize: '0.6875rem', fontWeight: 700,
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
