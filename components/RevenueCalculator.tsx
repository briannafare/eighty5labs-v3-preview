import React, { useState, useMemo } from 'react';
import { navigate } from '../router';
import { IconArrowRight } from './ui/Icons';

/* Assumptions behind the estimate. Stated on the card rather than
   buried, so the number reads as arithmetic instead of a promise. */
const CAPTURE_RATE = 0.67;  // share of currently-missed inquiries an always-on responder reaches
const WEEKS_PER_MONTH = 4.33;

export type CalculatorConfig = {
  volumeLabel: string;
  volumeDefault: number;
  volumeMin: number;
  volumeMax: number;
  missLabel: string;
  missDefault: number;
  valueLabel: string;
  valueDefault: number;
  valueMin: number;
  valueMax: number;
  valueStep: number;
  /** Share of recovered inquiries that become paid work. */
  closeRate: number;
  closeRateNote: string;
};

/* Residential real estate — the homepage audience. */
const REAL_ESTATE: CalculatorConfig = {
  volumeLabel: 'Inquiries per week',
  volumeDefault: 15,
  volumeMin: 3,
  volumeMax: 60,
  missLabel: 'Share you cannot answer right away',
  missDefault: 30,
  valueLabel: 'Your average commission',
  valueDefault: 9000,
  valueMin: 2000,
  valueMax: 30000,
  valueStep: 500,
  closeRate: 0.08,
  closeRateNote: '8% of recovered inquiries reach closing',
};

export const RevenueCalculator: React.FC<{ config?: CalculatorConfig }> = ({ config = REAL_ESTATE }) => {
  const [volume, setVolume] = useState(config.volumeDefault);
  const [missRate, setMissRate] = useState(config.missDefault);
  const [value, setValue] = useState(config.valueDefault);

  const { missedPerMonth, recoveredLeads, closings, revenue } = useMemo(() => {
    const missed = volume * (missRate / 100) * WEEKS_PER_MONTH;
    const recovered = missed * CAPTURE_RATE;
    const closed = recovered * config.closeRate;
    return {
      missedPerMonth: missed,
      recoveredLeads: recovered,
      closings: closed,
      revenue: Math.round(closed * value),
    };
  }, [volume, missRate, value, config.closeRate]);

  return (
    <div style={{
      background: 'var(--bg2)',
      border: '1px solid rgba(255,255,255,0.10)',
      borderRadius: 18,
      overflow: 'hidden',
    }}>
      {/* Inputs */}
      <div style={{ padding: '26px 26px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <h3 style={{
          fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '1.05rem',
          color: '#fff', letterSpacing: '-0.025em', lineHeight: 1.3, marginBottom: 22,
        }}>
          Your numbers, not ours.
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <SliderRow
            label={config.volumeLabel}
            value={volume}
            display={String(volume)}
            min={config.volumeMin}
            max={config.volumeMax}
            step={1}
            onChange={setVolume}
          />
          <SliderRow
            label={config.missLabel}
            value={missRate}
            display={`${missRate}%`}
            min={5}
            max={70}
            step={1}
            onChange={setMissRate}
          />
          <SliderRow
            label={config.valueLabel}
            value={value}
            display={`$${value.toLocaleString()}`}
            min={config.valueMin}
            max={config.valueMax}
            step={config.valueStep}
            onChange={setValue}
          />
        </div>
      </div>

      {/* Result */}
      <div style={{ padding: '24px 26px' }}>
        <div style={{ fontSize: '0.78rem', color: 'var(--t3)', marginBottom: 6 }}>
          Estimated monthly recovery
        </div>

        <div style={{
          fontFamily: 'var(--fd)', fontWeight: 800, fontSize: '2.5rem',
          letterSpacing: '-0.045em', color: '#fff', lineHeight: 1, marginBottom: 18,
        }}>
          ${revenue.toLocaleString()}
          <span style={{ fontSize: '0.9rem', color: 'var(--t3)', fontWeight: 400, letterSpacing: 0 }}> /mo</span>
        </div>

        {/* The arithmetic, shown */}
        <dl style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 20 }}>
          <MathRow label="Inquiries missed each month" value={missedPerMonth.toFixed(0)} />
          <MathRow label={`Reached by an always-on responder (${Math.round(CAPTURE_RATE * 100)}%)`} value={recoveredLeads.toFixed(0)} />
          <MathRow label={config.closeRateNote} value={closings.toFixed(1)} />
        </dl>

        <button
          onClick={() => navigate('/audit')}
          className="btn btn-solid"
          style={{ width: '100%', justifyContent: 'center' }}
        >
          Get your free visibility audit <IconArrowRight size={16} />
        </button>

        <p style={{ fontSize: '0.75rem', color: 'var(--t4)', marginTop: 12, lineHeight: 1.5 }}>
          An estimate from the inputs above, not a projection of your results.
        </p>
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
  onChange: (v: number) => void;
}> = ({ label, value, display, min, max, step, onChange }) => {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, marginBottom: 8 }}>
        <label htmlFor={`calc-${label}`} style={{ fontSize: '0.8rem', color: 'var(--t2)' }}>{label}</label>
        <span style={{ fontFamily: 'var(--fd)', fontSize: '0.9rem', fontWeight: 700, color: '#fff' }}>{display}</span>
      </div>
      <input
        id={`calc-${label}`}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-label={label}
        onChange={e => onChange(Number(e.target.value))}
        style={{
          width: '100%', height: 4, cursor: 'pointer', display: 'block',
          WebkitAppearance: 'none', appearance: 'none',
          borderRadius: 2, outline: 'none',
          background: `linear-gradient(to right, var(--blue3) 0%, var(--blue3) ${pct}%, rgba(255,255,255,0.12) ${pct}%, rgba(255,255,255,0.12) 100%)`,
          accentColor: 'var(--blue3)',
        }}
      />
    </div>
  );
};

const MathRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
    <dt style={{ fontSize: '0.75rem', color: 'var(--t3)' }}>{label}</dt>
    <dd style={{ fontFamily: 'var(--fd)', fontSize: '0.8rem', fontWeight: 700, color: 'var(--t2)' }}>{value}</dd>
  </div>
);
