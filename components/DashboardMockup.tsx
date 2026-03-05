import React from 'react';
import { motion } from 'framer-motion';

export const DashboardMockup: React.FC = () => (
  <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', height: '100%' }}>
    {/* Main Dashboard Card */}
    <div style={{
      borderRadius: 16,
      overflow: 'hidden',
      background: '#0F1623',
      border: '1px solid rgba(255,255,255,0.09)',
      boxShadow: '0 24px 64px rgba(0,0,0,0.3)',
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
            { icon: '📊', label: 'Overview', active: true },
            { icon: '📞', label: 'Voice AI', active: false },
            { icon: '⭐', label: 'Reviews', active: false },
            { icon: '💬', label: 'Leads', active: false },
            { icon: '📍', label: 'Maps', active: false },
          ].map((item, i) => (
            <div key={i} style={{
              padding: '6px 8px',
              borderRadius: 5,
              fontSize: '0.62rem',
              fontWeight: item.active ? 600 : 500,
              color: item.active ? '#93C5FD' : 'rgba(255,255,255,0.7)',
              background: item.active ? 'rgba(79,142,247,0.13)' : 'transparent',
            }}>
              {item.icon} {item.label}
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
            Good morning, David 👋 <span style={{ color: 'rgba(255,255,255,0.72)', fontWeight: 400, fontFamily: "var(--fb, 'Inter', sans-serif)" }}>· Live</span>
          </div>

          {/* KPIs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 7, marginBottom: 12 }}>
            {[
              { label: 'Calls Answered', value: '100%', delta: '↑ 0 missed today' },
              { label: 'New Reviews', value: '+27', delta: '↑ 4.9 avg' },
              { label: 'Map Rank', value: '#2', delta: '↑ was #7 (60d)' },
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
                  fontWeight: 900,
                  fontSize: '1.25rem',
                  color: '#fff',
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                }}>{kpi.value}</div>
                <div style={{ fontSize: '0.56rem', color: '#A3E635', fontWeight: 600, marginTop: 3 }}>{kpi.delta}</div>
              </div>
            ))}
          </div>

          {/* Live Activity */}
          <div style={{
            fontSize: '0.56rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.72)',
            marginBottom: 6,
          }}>Live Activity</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {[
              { icon: '📞', iconBg: 'rgba(16,185,129,0.16)', title: 'Voice AI — Sarah Mitchell', sub: 'Qualified + booked · 4 min ago', badge: 'Answered', badgeBg: 'rgba(16,185,129,0.16)', badgeColor: '#A3E635' },
              { icon: '⭐', iconBg: 'rgba(250,204,21,0.12)', title: '5-star review — Google', sub: 'AI reply sent · 12 min ago', badge: '5 Stars', badgeBg: 'rgba(250,204,21,0.14)', badgeColor: '#FDE68A' },
              { icon: '💬', iconBg: 'rgba(79,142,247,0.14)', title: 'Web lead — James Torres', sub: 'Responded in 90 sec', badge: 'Booked', badgeBg: 'rgba(79,142,247,0.16)', badgeColor: '#93C5FD' },
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
                  fontSize: '0.72rem',
                  flexShrink: 0,
                  background: item.iconBg,
                }}>{item.icon}</div>
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
                  background: item.badgeBg,
                  color: item.badgeColor,
                }}>{item.badge}</span>
              </div>
            ))}
          </div>

          {/* AI Search Visibility */}
          <div style={{ marginTop: 10 }}>
            <div style={{
              fontSize: '0.56rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.72)',
              marginBottom: 7,
            }}>AI Search Visibility</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 5 }}>
              {[
                { label: 'Google', value: '#2', sub: '↑ Maps' },
                { label: 'ChatGPT', value: '✓', sub: 'Cited' },
                { label: 'Gemini', value: '✓', sub: 'Cited' },
                { label: 'Perplexity', value: '✓', sub: 'Cited' },
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
                    fontWeight: 900,
                    fontSize: '0.9rem',
                    color: '#fff',
                  }}>{item.value}</div>
                  <div style={{ fontSize: '0.5rem', color: '#A3E635', marginTop: 2 }}>{item.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue Recovery Chart */}
          <div style={{ marginTop: 10 }}>
            <div style={{
              fontSize: '0.56rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.72)',
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
                    background: i === 7 ? '#4F8EF7' : `rgba(79,142,247,${0.25 + i * 0.06})`,
                    borderRadius: '3px 3px 0 0',
                  }}
                />
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
              <span style={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.82)' }}>Week 1</span>
              <span style={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.82)' }}>Week 8</span>
              <span style={{ fontSize: '0.56rem', color: '#A3E635', fontWeight: 700 }}>+$5,738/mo</span>
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
        boxShadow: '0 14px 40px rgba(0,0,0,0.5)',
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
        background: 'rgba(16,185,129,0.18)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.95rem',
        flexShrink: 0,
      }}>📞</div>
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
        color: '#A3E635',
      }}>
        <motion.div
          animate={{ boxShadow: ['0 0 0 0 rgba(16,185,129,0.5)', '0 0 0 5px rgba(16,185,129,0)', '0 0 0 0 rgba(16,185,129,0.5)'] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: 6, height: 6, borderRadius: '50%', background: '#84CC16' }}
        />
        live
      </div>
    </motion.div>
  </div>
);
