import React, { useState, useMemo } from 'react';
import { navigate } from '../router';

export const RevenueCalculator: React.FC = () => {
  const [calls, setCalls] = useState(50);
  const [missRate, setMissRate] = useState(25);
  const [ticket, setTicket] = useState(500);

  const result = useMemo(() => {
    const weeklyMissed = calls * (missRate / 100);
    const monthlyMissed = weeklyMissed * 4.33;
    const captureRate = 0.67;
    const recovered = monthlyMissed * captureRate * ticket;
    return Math.round(recovered);
  }, [calls, missRate, ticket]);

  const missedPct = Math.min((calls * (missRate / 100) * 4.33 * ticket) / 50000 * 100, 100);
  const capturePct = 67;
  const recoveryPct = Math.min((result / 20000) * 100, 100);

  return (
    <div style={{
      background: '#161E2E',
      border: '1px solid rgba(255,255,255,0.09)',
      borderRadius: 22,
      overflow: 'hidden',
    }}>
      {/* Top section - sliders */}
      <div style={{ padding: '26px 26px 22px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 7,
          fontSize: '0.68rem',
          fontWeight: 700,
          letterSpacing: '0.13em',
          textTransform: 'uppercase',
          color: '#93C5FD',
          marginBottom: 10,
        }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#4F8EF7', display: 'inline-block' }} />
          Revenue Recovery Engine
        </div>

        <h3 style={{
          fontFamily: "var(--fd, 'Epilogue', sans-serif)",
          fontWeight: 900,
          fontSize: '1.2rem',
          color: '#fff',
          letterSpacing: '-0.025em',
          lineHeight: 1.25,
          marginBottom: 22,
        }}>
          What's it actually worth?<br />Stop guessing.
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <SliderRow
            label="Weekly Calls"
            value={calls}
            display={String(calls)}
            min={10}
            max={200}
            step={1}
            color="#4F8EF7"
            onChange={setCalls}
          />
          <SliderRow
            label="Est. Miss Rate"
            value={missRate}
            display={`${missRate}%`}
            min={5}
            max={60}
            step={1}
            color="#818CF8"
            onChange={setMissRate}
          />
          <SliderRow
            label="Avg Ticket Value"
            value={ticket}
            display={`$${ticket.toLocaleString()}`}
            min={50}
            max={2000}
            step={50}
            color="#14B8A6"
            onChange={setTicket}
          />
        </div>
      </div>

      {/* Bottom section - result */}
      <div style={{ padding: '22px 26px' }}>
        <div style={{
          fontSize: '0.6rem',
          fontWeight: 700,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: '#FFFFFF',
          marginBottom: 5,
        }}>Monthly Recovery Potential</div>

        <div style={{
          fontFamily: "var(--fd, 'Epilogue', sans-serif)",
          fontWeight: 900,
          fontSize: '2.6rem',
          letterSpacing: '-0.05em',
          color: '#fff',
          lineHeight: 1,
          marginBottom: 5,
        }}>
          ${result.toLocaleString()} <span style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.7)', fontWeight: 400 }}>/mo</span>
        </div>

        <div style={{ fontSize: '0.76rem', color: '#FFFFFF', marginBottom: 18 }}>
          Based on capturing 67% of currently missed leads
        </div>

        {/* Bars */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 20 }}>
          <BarRow label="Missed revenue" fill={missedPct} color="#4F8EF7" />
          <BarRow label="Capture rate" fill={capturePct} color="#818CF8" />
          <BarRow label="Recovery est." fill={recoveryPct} color="#14B8A6" />
        </div>

        <button
          onClick={() => navigate('#/audit')}
          style={{
            display: 'block',
            width: '100%',
            padding: '13px 18px',
            background: '#1B4FFF',
            color: '#fff',
            border: 'none',
            borderRadius: 999,
            cursor: 'pointer',
            fontFamily: "var(--fd, 'Epilogue', sans-serif)",
            fontSize: '0.9rem',
            fontWeight: 800,
            textAlign: 'center',
            transition: 'all 0.18s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#0A3DE6'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(27,79,255,0.40)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = '#1B4FFF'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; }}
        >
          Get Your Free Visibility Audit →
        </button>
      </div>
    </div>
  );
};

const SliderRow: React.FC<{
  label: string;
  value: number;
  display: string;
  min: number;
  max: number;
  step: number;
  color: string;
  onChange: (v: number) => void;
}> = ({ label, value, display, min, max, step, color, onChange }) => (
  <div>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 7 }}>
      <span style={{
        fontSize: '0.62rem',
        fontWeight: 700,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: '#FFFFFF',
      }}>{label}</span>
      <span style={{
        fontFamily: "var(--fd, 'Epilogue', sans-serif)",
        fontSize: '0.9rem',
        fontWeight: 800,
        color: '#fff',
      }}>{display}</span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={e => onChange(Number(e.target.value))}
      style={{
        width: '100%',
        height: 4,
        cursor: 'pointer',
        WebkitAppearance: 'none',
        appearance: 'none',
        borderRadius: 2,
        outline: 'none',
        background: `linear-gradient(to right, ${color} 0%, ${color} ${((value - min) / (max - min)) * 100}%, rgba(255,255,255,0.1) ${((value - min) / (max - min)) * 100}%, rgba(255,255,255,0.1) 100%)`,
        accentColor: color,
      }}
    />
  </div>
);

const BarRow: React.FC<{ label: string; fill: number; color: string }> = ({ label, fill, color }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
    <span style={{ fontSize: '0.6rem', color: '#FFFFFF', width: 86, flexShrink: 0 }}>{label}</span>
    <div style={{
      flex: 1,
      height: 4,
      background: 'rgba(255,255,255,0.07)',
      borderRadius: 2,
      overflow: 'hidden',
    }}>
      <div style={{
        height: '100%',
        borderRadius: 2,
        width: `${fill}%`,
        background: color,
        transition: 'width 0.45s ease',
      }} />
    </div>
  </div>
);
