import React from 'react';

/* ─────────────────────────────────────────────────────────────
   eighty5labs icon set

   Custom-drawn, not a stock pack. House rules so the set reads
   as one family wherever it appears:

     · 24×24 viewBox, drawn on a 2px grid inset 3px from the edge
     · 1.5 stroke, round caps + joins, no fills except star/dot
     · No detail below 2px — everything survives at 16px
     · Geometry over illustration: a single idea per glyph

   Import { Icon } and pass a name, or import a glyph directly.
   ───────────────────────────────────────────────────────────── */

export type IconProps = {
  size?: number;
  color?: string;
  strokeWidth?: number;
  title?: string;
};

const base = (size: number, color: string, sw: number, title?: string) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none' as const,
  stroke: color,
  strokeWidth: sw,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  role: title ? ('img' as const) : undefined,
  'aria-hidden': title ? undefined : ('true' as const),
});

const wrap = (
  { size = 20, color = 'currentColor', strokeWidth = 1.5, title }: IconProps,
  children: React.ReactNode,
) => (
  <svg {...base(size, color, strokeWidth, title)}>
    {title ? <title>{title}</title> : null}
    {children}
  </svg>
);

/* ── Real estate ─────────────────────────────────────────── */

/** Yard sign on a post — the listing itself. */
export const IconYardSign = (p: IconProps) =>
  wrap(p, <>
    <path d="M5 5.5h11a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5z" />
    <path d="M5 3v18" />
    <path d="M8.5 8.5h6M8.5 11h3.5" />
  </>);

/** Key — the close. */
export const IconKey = (p: IconProps) =>
  wrap(p, <>
    <circle cx="8" cy="8" r="4.5" />
    <path d="M11.2 11.2 20 20" />
    <path d="M17 17l-2 2M19.5 14.5l-2 2" />
  </>);

/** House emitting a signal — a listing that can actually be found. */
export const IconHouseSignal = (p: IconProps) =>
  wrap(p, <>
    <path d="M3.5 11 11 4.5l7.5 6.5" />
    <path d="M5.5 12.5V20h11v-7.5" />
    <path d="M9.5 20v-4.5h4V20" />
    <path d="M19 3.5a6 6 0 0 1 1.8 4.3M16.5 5.6a3 3 0 0 1 .9 2.2" />
  </>);

/** Map pin with a rank notch — local placement. */
export const IconMapPin = (p: IconProps) =>
  wrap(p, <>
    <path d="M12 21c4.5-5 6.5-8.2 6.5-11a6.5 6.5 0 1 0-13 0c0 2.8 2 6 6.5 11z" />
    <circle cx="12" cy="10" r="2.4" />
  </>);

/* ── Capture ─────────────────────────────────────────────── */

/** Handset with a clock arc — answered at any hour. */
export const IconCall24 = (p: IconProps) =>
  wrap(p, <>
    <path d="M4 5.5c0-.8.7-1.5 1.5-1.5h2c.7 0 1.3.5 1.5 1.2l.6 2.5c.1.6-.1 1.2-.6 1.5l-1.3.9a12 12 0 0 0 5.2 5.2l.9-1.3c.4-.5 1-.7 1.6-.6l2.4.6c.7.2 1.2.8 1.2 1.5v2c0 .8-.7 1.5-1.5 1.5A15.5 15.5 0 0 1 4 5.5z" />
    <circle cx="18.5" cy="5.5" r="3" />
    <path d="M18.5 4v1.5l1 .7" />
  </>);

/** Speech bubble with a fast-reply chevron. */
export const IconReply = (p: IconProps) =>
  wrap(p, <>
    <path d="M20.5 13.5a2 2 0 0 1-2 2H8l-4.5 4v-15a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2z" />
    <path d="M9 8.5l2.5 2.5L9 13.5M14 8.5l2.5 2.5-2.5 2.5" />
  </>);

/** Calendar with a checked day — booked. */
export const IconBooked = (p: IconProps) =>
  wrap(p, <>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
    <path d="M3.5 9.5h17M8 3v4M16 3v4" />
    <path d="M9 14.5l2 2 4-4" />
  </>);

/* ── Convert ─────────────────────────────────────────────── */

/** Looping arrows — follow-up that keeps running. */
export const IconFollowUp = (p: IconProps) =>
  wrap(p, <>
    <path d="M4 11a8 8 0 0 1 13.7-5.6L20 7.5" />
    <path d="M20 3.5v4h-4" />
    <path d="M20 13a8 8 0 0 1-13.7 5.6L4 16.5" />
    <path d="M4 20.5v-4h4" />
  </>);

/** Star — reviews. Filled variant available via `filled`. */
export const IconStar = ({ filled, ...p }: IconProps & { filled?: boolean }) => (
  <svg {...base(p.size ?? 20, p.color ?? 'currentColor', p.strokeWidth ?? 1.5, p.title)}
    fill={filled ? (p.color ?? 'currentColor') : 'none'}>
    {p.title ? <title>{p.title}</title> : null}
    <path d="M12 3.5l2.7 5.5 6 .9-4.35 4.2 1.03 6-5.38-2.83L6.62 20.1l1.03-6L3.3 9.9l6-.9z" />
  </svg>
);

/** Rising bars with a trend arrow — pipeline growth. */
export const IconGrowth = (p: IconProps) =>
  wrap(p, <>
    <path d="M3.5 20.5h17" />
    <path d="M6.5 20.5v-4M11 20.5v-7M15.5 20.5v-4.5M20 20.5v-10" />
    <path d="M6.5 11.5l4.5-4 4 3 5-5.5" />
    <path d="M16 5h4v4" />
  </>);

/* ── Platform / system ───────────────────────────────────── */

/** Magnifier over a spark — AI search. */
export const IconAISearch = (p: IconProps) =>
  wrap(p, <>
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="M15.2 15.2 20.5 20.5" />
    <path d="M10.5 7.5l.85 2.15L13.5 10.5l-2.15.85L10.5 13.5l-.85-2.15L7.5 10.5l2.15-.85z" />
  </>);

/** Document with lines and a spark — generated content. */
export const IconContent = (p: IconProps) =>
  wrap(p, <>
    <path d="M13 3.5H6.5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V10z" />
    <path d="M13 3.5V10h6.5" />
    <path d="M8 13.5h6M8 17h4" />
  </>);

/** Nodes joined into a flow — automation. */
export const IconWorkflow = (p: IconProps) =>
  wrap(p, <>
    <circle cx="6" cy="6" r="2.5" />
    <circle cx="18" cy="12" r="2.5" />
    <circle cx="6" cy="18" r="2.5" />
    <path d="M8.5 6h4a2 2 0 0 1 2 2v1.7M15.6 13.9 13.4 16a2 2 0 0 1-1.4.6H8.5" />
  </>);

/** Stacked panels — the dashboard / OS. */
export const IconDashboard = (p: IconProps) =>
  wrap(p, <>
    <rect x="3.5" y="3.5" width="7" height="8.5" rx="1.5" />
    <rect x="13.5" y="3.5" width="7" height="5" rx="1.5" />
    <rect x="3.5" y="15.5" width="7" height="5" rx="1.5" />
    <rect x="13.5" y="12" width="7" height="8.5" rx="1.5" />
  </>);

/** Shield with a check — trust / no contract. */
export const IconShield = (p: IconProps) =>
  wrap(p, <>
    <path d="M12 3.2l7 2.6v5.4c0 4.3-2.8 7.9-7 9.6-4.2-1.7-7-5.3-7-9.6V5.8z" />
    <path d="M9 11.8l2.2 2.2 4-4.2" />
  </>);

/** Stopwatch — speed to lead. */
export const IconSpeed = (p: IconProps) =>
  wrap(p, <>
    <circle cx="12" cy="13.5" r="7.5" />
    <path d="M12 9.5v4l2.5 1.5" />
    <path d="M9.5 2.5h5M19 6.5l1.5-1.5" />
  </>);

/* ── Generic UI ──────────────────────────────────────────── */

export const IconCheck = (p: IconProps) =>
  wrap({ strokeWidth: 2.25, ...p }, <path d="M4.5 12.5l5 5 10-11" />);

export const IconArrowRight = (p: IconProps) =>
  wrap({ strokeWidth: 2, ...p }, <>
    <path d="M4 12h15" />
    <path d="M13 6l6 6-6 6" />
  </>);

export const IconPlus = (p: IconProps) =>
  wrap({ strokeWidth: 2, ...p }, <>
    <path d="M12 5v14M5 12h14" />
  </>);

export const IconDash = (p: IconProps) =>
  wrap({ strokeWidth: 2, ...p }, <path d="M6 12h12" />);

/* ── Vertical marks (industries) ─────────────────────────── */

/** Scales — legal. */
export const IconScales = (p: IconProps) =>
  wrap(p, <>
    <path d="M12 4v16M7 20h10M12 6.5 5 8.5M12 6.5 19 8.5" />
    <path d="M5 8.5 2.8 13.5h4.4zM19 8.5l-2.2 5h4.4z" />
  </>);

/** Wrench crossed with a pipe joint — home services. */
export const IconWrench = (p: IconProps) =>
  wrap(p, <>
    <path d="M15.5 3.5a5 5 0 0 0-4.6 6.9L3.9 17.4a2 2 0 0 0 2.8 2.8l7-7a5 5 0 0 0 6.4-6.5l-2.9 2.9-2.6-.6-.6-2.6z" />
  </>);

/** Pulse inside a rounded cross — medical. */
export const IconPulse = (p: IconProps) =>
  wrap(p, <>
    <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
    <path d="M6.5 12h2.8l1.6-3.4 2.3 6.8 1.5-3.4h2.8" />
  </>);

/** Bank columns — mortgage. */
export const IconBank = (p: IconProps) =>
  wrap(p, <>
    <path d="M3.5 9 12 4l8.5 5" />
    <path d="M5.5 9v8M10 9v8M14 9v8M18.5 9v8" />
    <path d="M3.5 20.5h17" />
  </>);

/* ── Registry ────────────────────────────────────────────── */

export const ICONS = {
  yardSign: IconYardSign,
  key: IconKey,
  houseSignal: IconHouseSignal,
  mapPin: IconMapPin,
  call24: IconCall24,
  reply: IconReply,
  booked: IconBooked,
  followUp: IconFollowUp,
  star: IconStar,
  growth: IconGrowth,
  aiSearch: IconAISearch,
  content: IconContent,
  workflow: IconWorkflow,
  dashboard: IconDashboard,
  shield: IconShield,
  speed: IconSpeed,
  check: IconCheck,
  arrowRight: IconArrowRight,
  plus: IconPlus,
  dash: IconDash,
  scales: IconScales,
  wrench: IconWrench,
  pulse: IconPulse,
  bank: IconBank,
} as const;

export type IconName = keyof typeof ICONS;

export const Icon: React.FC<IconProps & { name: IconName }> = ({ name, ...rest }) => {
  const Glyph = ICONS[name] as React.FC<IconProps>;
  return <Glyph {...rest} />;
};
