import React from 'react';

/*
 * Micro-illustration system — WOW 8
 * Rules: same stroke width (1.6), same corner radius language (3px),
 * same highlight style (accent dot at viewBox 20x20).
 * One accent color per illustration, passed via `accent` prop.
 */

interface MIProps {
  size?: number;
  accent?: string;
  className?: string;
}

const defaults = { size: 24, accent: '#4F8EF7' };
const sw = '1.6'; // unified stroke width
const sr = 'round'; // unified linecap/linejoin

export const MISearch: React.FC<MIProps> = ({ size = defaults.size, accent = defaults.accent }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" strokeLinecap={sr} strokeLinejoin={sr}>
    <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth={sw} />
    <path d="M15.5 15.5L20 20" stroke="currentColor" strokeWidth={sw} />
    <circle cx="10.5" cy="10.5" r="1.5" fill={accent} opacity="0.6" />
  </svg>
);

export const MIListingSync: React.FC<MIProps> = ({ size = defaults.size, accent = defaults.accent }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" strokeLinecap={sr} strokeLinejoin={sr}>
    <rect x="3" y="4" width="18" height="16" rx="3" stroke="currentColor" strokeWidth={sw} />
    <path d="M7 9h4M7 13h6" stroke="currentColor" strokeWidth={sw} />
    <circle cx="17" cy="15" r="2" fill={accent} opacity="0.55" />
    <path d="M16 15l.7.7 1.3-1.4" stroke="white" strokeWidth="1.2" />
  </svg>
);

export const MIReviewPrompt: React.FC<MIProps> = ({ size = defaults.size, accent = defaults.accent }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" strokeLinecap={sr} strokeLinejoin={sr}>
    <path d="M12 2l2.4 4.8 5.3.8-3.85 3.75.9 5.3L12 14.1l-4.75 2.55.9-5.3L4.3 7.6l5.3-.8L12 2z" stroke="currentColor" strokeWidth={sw} />
    <circle cx="12" cy="8.5" r="1.2" fill={accent} opacity="0.5" />
  </svg>
);

export const MIVoiceAI: React.FC<MIProps> = ({ size = defaults.size, accent = defaults.accent }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" strokeLinecap={sr} strokeLinejoin={sr}>
    <rect x="8" y="2" width="8" height="12" rx="4" stroke="currentColor" strokeWidth={sw} />
    <path d="M5 11a7 7 0 0014 0" stroke="currentColor" strokeWidth={sw} />
    <line x1="12" y1="18" x2="12" y2="22" stroke="currentColor" strokeWidth={sw} />
    <circle cx="17" cy="5" r="1.5" fill={accent} opacity="0.5" />
    <path d="M9 8h2M9 10.5h3" stroke={accent} strokeWidth="1" opacity="0.6" />
  </svg>
);

export const MISMSFollowup: React.FC<MIProps> = ({ size = defaults.size, accent = defaults.accent }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" strokeLinecap={sr} strokeLinejoin={sr}>
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth={sw} />
    <circle cx="8" cy="10" r="1" fill={accent} opacity="0.6" />
    <circle cx="12" cy="10" r="1" fill={accent} opacity="0.6" />
    <circle cx="16" cy="10" r="1" fill={accent} opacity="0.6" />
  </svg>
);

export const MIPipeline: React.FC<MIProps> = ({ size = defaults.size, accent = defaults.accent }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" strokeLinecap={sr} strokeLinejoin={sr}>
    <path d="M3 4h18l-4 6 4 6H3l4-6-4-6z" stroke="currentColor" strokeWidth={sw} />
    <circle cx="12" cy="10" r="2" fill={accent} opacity="0.45" />
  </svg>
);

export const MIReporting: React.FC<MIProps> = ({ size = defaults.size, accent = defaults.accent }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" strokeLinecap={sr} strokeLinejoin={sr}>
    <line x1="18" y1="20" x2="18" y2="10" stroke="currentColor" strokeWidth={sw} />
    <line x1="12" y1="20" x2="12" y2="4" stroke="currentColor" strokeWidth={sw} />
    <line x1="6" y1="20" x2="6" y2="14" stroke="currentColor" strokeWidth={sw} />
    <circle cx="12" cy="4" r="1.5" fill={accent} opacity="0.5" />
  </svg>
);

export const MICalendar: React.FC<MIProps> = ({ size = defaults.size, accent = defaults.accent }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" strokeLinecap={sr} strokeLinejoin={sr}>
    <rect x="3" y="4" width="18" height="18" rx="3" stroke="currentColor" strokeWidth={sw} />
    <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth={sw} />
    <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth={sw} />
    <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth={sw} />
    <circle cx="12" cy="15" r="1.5" fill={accent} opacity="0.5" />
  </svg>
);

export const MIWorkflow: React.FC<MIProps> = ({ size = defaults.size, accent = defaults.accent }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" strokeLinecap={sr} strokeLinejoin={sr}>
    <circle cx="5" cy="12" r="2.5" stroke="currentColor" strokeWidth={sw} />
    <circle cx="19" cy="12" r="2.5" stroke="currentColor" strokeWidth={sw} />
    <circle cx="12" cy="5" r="2.5" stroke="currentColor" strokeWidth={sw} />
    <path d="M7 11l3-4M14.5 7l3 3.5" stroke="currentColor" strokeWidth={sw} />
    <circle cx="12" cy="5" r="1" fill={accent} opacity="0.6" />
  </svg>
);

export const MIShield: React.FC<MIProps> = ({ size = defaults.size, accent = defaults.accent }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" strokeLinecap={sr} strokeLinejoin={sr}>
    <path d="M12 2l8 4v6c0 5.25-3.5 8.75-8 10-4.5-1.25-8-4.75-8-10V6l8-4z" stroke="currentColor" strokeWidth={sw} />
    <path d="M9 12l2 2 4-4" stroke={accent} strokeWidth={sw} opacity="0.7" />
  </svg>
);

export const MIGlobe: React.FC<MIProps> = ({ size = defaults.size, accent = defaults.accent }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" strokeLinecap={sr} strokeLinejoin={sr}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={sw} />
    <path d="M2 12h20" stroke="currentColor" strokeWidth={sw} />
    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" stroke="currentColor" strokeWidth={sw} />
    <circle cx="16" cy="7" r="1.5" fill={accent} opacity="0.5" />
  </svg>
);

export const MITarget: React.FC<MIProps> = ({ size = defaults.size, accent = defaults.accent }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" strokeLinecap={sr} strokeLinejoin={sr}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={sw} />
    <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth={sw} />
    <circle cx="12" cy="12" r="2" fill={accent} opacity="0.6" />
  </svg>
);

export const MIMapPin: React.FC<MIProps> = ({ size = defaults.size, accent = defaults.accent }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" strokeLinecap={sr} strokeLinejoin={sr}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" strokeWidth={sw} />
    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth={sw} />
    <circle cx="12" cy="10" r="1" fill={accent} opacity="0.6" />
  </svg>
);

export const MILightning: React.FC<MIProps> = ({ size = defaults.size, accent = defaults.accent }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" strokeLinecap={sr} strokeLinejoin={sr}>
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth={sw} />
    <circle cx="10" cy="10" r="1.2" fill={accent} opacity="0.45" />
  </svg>
);

export const MIPhone: React.FC<MIProps> = ({ size = defaults.size, accent = defaults.accent }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" strokeLinecap={sr} strokeLinejoin={sr}>
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.45 19.45 0 015.13 12.8a19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth={sw} />
    <circle cx="18" cy="4" r="1.5" fill={accent} opacity="0.5" />
  </svg>
);

export const MIBriefcase: React.FC<MIProps> = ({ size = defaults.size, accent = defaults.accent }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" strokeLinecap={sr} strokeLinejoin={sr}>
    <rect x="2" y="7" width="20" height="14" rx="3" stroke="currentColor" strokeWidth={sw} />
    <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" stroke="currentColor" strokeWidth={sw} />
    <circle cx="12" cy="13" r="1.5" fill={accent} opacity="0.5" />
  </svg>
);
