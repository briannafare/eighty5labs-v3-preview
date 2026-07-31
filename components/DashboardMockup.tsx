import React from 'react';
import { motion } from 'framer-motion';
import {
  IconDashboard, IconCall24, IconStar, IconReply, IconMapPin, IconCheck,
} from './ui/Icons';

export const DashboardMockup: React.FC = () => (
  <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', height: '100%' }}>
    {/* Main Dashboard Card */}
    <div style={{
      borderRadius: 16,
      overflow: 'hidden',
      background: '#0F1623',
      border: '1px solid rgba(255,255,255,0.09)',
      flex: 1,
    }}>
      {/* Browser chrome bar */}
      <div style={{
        background: '#0A0E18',
        padding: '9px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: 7,
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ display: 'flex', gap: 5 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FEBC2E' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28C840' }} />
        </div>
        <div style={{
          flex: 1,
          background: 'rgba(255,255,255,0.05)',
          borderRadius: 4,
          padding: '4px 10px',
          fontFamily: 'monospace',
          fontSize: '0.62rem',
          color: 'rgba(255,255,255,0.22)',
        }}>
          app.eighty5labs.com/dashboard
        </div>
      </div>

      {/* Dashboard body */}
      <div style={{ display: 'grid', gridTemplateColumns: '106px 1fr', height: 'calc(100% - 37px)' }}>
        {/* Sidebar */}
        <div style={{
          background: 'rgba(0,0,0,0.25)',
          padding: '10px 6px',
          borderRight: '1px solid rgba(255,255,255,0.05)',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}>
          {[
            { Icon: IconDashboard, label: 'Overview', active: true },
            { Icon: IconCall24, label: 'Voice AI', active: false },
            { Icon: IconStar, label: 'Reviews', active: false },
            { Icon: IconReply, label: 'Leads', active: false },
            { Icon: IconMapPin, label: 'Maps', active: false },
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '6px 8px',
              borderRadius: 5,
              fontSize: '0.62rem',
              fontWeight: item.active ? 600 : 500,
              color: item.active ? '#93C5FD' : 'rgba(255,255,255,0.7)',
              background: item.active ? 'rgba(79,142,247,0.13)' : 'transparent',
            }}>
              <item.Icon size={11} />
              {item.label}
            </div>
          ))}
        </div>

        {/* Main content */}
        <div style={{ padding: 14, overflow: 'hidden' }}>
          {/* Greeting */}
          <div style={{
            fontFamily: "var(--fd, 'Epilogue', sans-serif)",
            fontSize: '0.78rem',
            fontWeight: 800,
            color: '#fff',
            marginBottom: 12,
          }}>
            Good morning, David <span style={{ color: 'rgba(255,255,255,0.72)', fontWeight: 400, fontFamily: "var(--fb, 'Inter', sans-serif)" }}>· Live</span>
          </div>

          {/* KPIs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 7, marginBottom: 12 }}>
            {[
              { label: 'Calls Answered', value: '100%', delta: '0 missed today' },
              { label: 'New Reviews', value: '+27', delta: '4.9 average' },
              { label: 'Map Rank', value: '#2', delta: 'up from #7 in 60d' },
            ].map((kpi, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 10,
                padding: '10px 11px',
              }}>
                <div style={{ fontSize: '0.56rem', color: '#334155', marginBottom: 3 }}>{kpi.label}</div>
                <div style={{
                  fontFamily: "var(--fd, 'Epilogue', sans-serif)",
                  fontWeight: 800,
                  fontSize: '1.25rem',
                  color: '#fff',
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                }}>{kpi.value}</div>
                <div style={{ fontSize: '0.56rem', color: 'rgba(255,255,255,0.55)', fontWeight: 500, marginTop: 3 }}>{kpi.delta}</div>
              </div>
            ))}
          </div>

          {/* Live Activity */}
          <div style={{
            fontSize: '0.56rem',
            fontWeight: 700,
            color: 'rgba(255,255,255,0.55)',
            marginBottom: 6,
          }}>Live Activity</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {[
              { Icon: IconCall24, title: 'Voice AI — Sarah Mitchell', sub: 'Qualified + booked · 4 min ago', badge: 'Answered' },
              { Icon: IconStar, title: '5-star review — Google', sub: 'AI reply sent · 12 min ago', badge: '5 stars' },
              { Icon: IconReply, title: 'Web lead — James Torres', sub: 'Responded in 90 sec', badge: 'Booked' },
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 7px',
                borderRadius: 7,
                background: 'rgba(255,255,255,0.025)',
              }}>
                <div style={{
                  width: 22,
                  height: 22,
                  borderRadius: 5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  background: 'rgba(255,255,255,0.06)',
                  color: '#93C5FD',
                }}><item.Icon size={12} /></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.64rem', fontWeight: 600, color: 'rgba(255,255,255,0.84)' }}>{item.title}</div>
                  <div style={{ fontSize: '0.56rem', color: 'rgba(255,255,255,0.72)', marginTop: 1 }}>{item.sub}</div>
                </div>
                <span style={{
                  fontSize: '0.56rem',
                  fontWeight: 700,
                  padding: '2px 7px',
                  borderRadius: 100,
                  whiteSpace: 'nowrap',
                  background: 'rgba(79,142,247,0.14)',
                  color: '#93C5FD',
                }}>{item.badge}</span>
              </div>
            ))}
          </div>

          {/* AI Search Visibility */}
          <div style={{ marginTop: 10 }}>
            <div style={{
              fontSize: '0.56rem',
              fontWeight: 700,
              color: 'rgba(255,255,255,0.55)',
              marginBottom: 7,
            }}>AI Search Visibility</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 5 }}>
              {[
                { label: 'Google', value: '#2', sub: 'Map Pack' },
                { label: 'ChatGPT', cited: true, sub: 'Cited' },
                { label: 'Gemini', cited: true, sub: 'Cited' },
                { label: 'Perplexity', cited: true, sub: 'Cited' },
              ].map((item, i) => (
                <div key={i} style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 7,
                  padding: '7px 8px',
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: '0.54rem', color: 'rgba(255,255,255,0.75)', marginBottom: 3 }}>{item.label}</div>
                  <div style={{
                    fontFamily: "var(--fd, 'Epilogue', sans-serif)",
                    fontWeight: 800,
                    fontSize: '0.9rem',
                    color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    minHeight: 17,
                  }}>{item.cited ? <IconCheck size={12} color="#93C5FD" /> : item.value}</div>
                  <div style={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>{item.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue Recovery Chart */}
          <div style={{ marginTop: 10 }}>
            <div style={{
              fontSize: '0.56rem',
              fontWeight: 700,
              color: 'rgba(255,255,255,0.55)',
              marginBottom: 7,
            }}>Revenue Recovery · 60 days</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 36 }}>
              {[40, 50, 55, 60, 70, 75, 85, 100].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: 0.4 + i * 0.08, duration: 0.5, ease: 'easeOut' }}
                  style={{
                    flex: 1,
                    background: i === 7 ? 'var(--blue3)' : `rgba(79,142,247,${0.22 + i * 0.06})`,
                    borderRadius: '3px 3px 0 0',
                  }}
                />
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
              <span style={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.82)' }}>Week 1</span>
              <span style={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.82)' }}>Week 8</span>
              <span style={{ fontSize: '0.56rem', color: '#93C5FD', fontWeight: 700 }}>+$5,738/mo</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Floating notification card */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.5 }}
      style={{
        position: 'absolute',
        bottom: -14,
        left: -20,
        background: '#161E2E',
        border: '1px solid rgba(255,255,255,0.11)',
        borderRadius: 16,
        padding: '11px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        minWidth: 200,
      }}
    >
      <div style={{
        width: 30,
        height: 30,
        borderRadius: 8,
        background: 'rgba(79,142,247,0.16)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        color: '#93C5FD',
      }}><IconCall24 size={16} /></div>
      <div>
        <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#fff' }}>After-hours call answered</div>
        <div style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.80)', marginTop: 2 }}>Lead qualified · appointment booked</div>
      </div>
      <div style={{
        marginLeft: 'auto',
        display: 'flex',
        alignItems: 'center',
        gap: 5,
        fontSize: '0.58rem',
        fontWeight: 700,
        color: '#93C5FD',
      }}>
        <motion.div
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--blue3)' }}
        />
        live
      </div>
    </motion.div>
  </div>
);
