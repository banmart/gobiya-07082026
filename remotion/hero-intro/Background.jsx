import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { COLORS } from './theme.js';

// Institutional navy field with a slow-drifting hairline grid — echoes the
// site's hairline-rule design language without reading as a template.
export const Background = ({ tint = COLORS.navy }) => {
  const frame = useCurrentFrame();
  const drift = interpolate(frame, [0, 900], [0, -60]);

  return (
    <AbsoluteFill style={{ backgroundColor: tint }}>
      <AbsoluteFill
        style={{
          backgroundImage: `linear-gradient(${COLORS.hairline} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.hairline} 1px, transparent 1px)`,
          backgroundSize: '135px 135px',
          backgroundPosition: `${drift}px ${drift * 0.6}px`,
          opacity: 0.35,
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 38%, transparent 30%, ${COLORS.navyDeep} 130%)`,
        }}
      />
    </AbsoluteFill>
  );
};

// Eyebrow label matching the site's `.eyebrow` (dot + small caps).
export const Eyebrow = ({ children, at = 0, light = true, style }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [at, at + 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const y = interpolate(frame, [at, at + 10], [10, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        fontSize: 26,
        fontWeight: 600,
        letterSpacing: 4,
        textTransform: 'uppercase',
        color: light ? COLORS.hint : COLORS.navy,
        opacity,
        transform: `translateY(${y}px)`,
        ...style,
      }}
    >
      <span
        style={{
          width: 10,
          height: 10,
          borderRadius: '50%',
          backgroundColor: COLORS.carmine,
          display: 'inline-block',
        }}
      />
      {children}
    </div>
  );
};
