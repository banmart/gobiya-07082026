import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from 'remotion';
import { Background } from './Background.jsx';
import { SparklePing } from './Brackets.jsx';
import { COLORS, headingFont, bodyFont } from './theme.js';

// VO (local frames): "Gobiya makes you that answer." 4–58,
// "One accountable team in Los Angeles:" 62–126,
// "SEO, AI visibility, web, and content." 134–238.

const CHIPS = [
  { label: 'SEO', at: 134 },
  { label: 'AI Visibility', at: 158 },
  { label: 'Web', at: 182 },
  { label: 'Content', at: 206 },
];

// Brackets drawn inline (not ViewfinderLock) so they can assemble tightly
// around the wordmark at logo scale.
const LogoMark = ({ size = 190 }) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [0, 14], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const spread = (1 - t) * 60;
  const opacity = interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const sparkleScale = interpolate(frame, [16, 28], [0, 1], {
    easing: Easing.out(Easing.back(2.4)),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" style={{ opacity, overflow: 'visible' }}>
      <g transform={`translate(${-spread}, ${-spread})`}>
        <rect x="8" y="8" width="7" height="15" fill={COLORS.paper} />
        <rect x="8" y="8" width="15" height="7" fill={COLORS.paper} />
      </g>
      <g transform={`translate(${spread}, ${spread})`}>
        <rect x="33" y="25" width="7" height="15" fill={COLORS.paper} />
        <rect x="25" y="33" width="15" height="7" fill={COLORS.paper} />
      </g>
      <g transform={`translate(24, 24) scale(${sparkleScale}) translate(-24, -24)`}>
        <path
          d="M24,17 L25.8,22.2 L31,24 L25.8,25.8 L24,31 L22.2,25.8 L17,24 L22.2,22.2 Z"
          fill={COLORS.carmine}
        />
      </g>
    </svg>
  );
};

const Chip = ({ label, at }) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [at, at + 12], [0.7, 1], {
    easing: Easing.out(Easing.back(1.8)),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const opacity = interpolate(frame, [at, at + 8], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <span
      style={{
        display: 'inline-block',
        border: `2px solid ${COLORS.paper}`,
        padding: '18px 34px',
        fontFamily: bodyFont,
        fontWeight: 800,
        fontSize: 36,
        letterSpacing: 1,
        color: COLORS.paper,
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      {label}
    </span>
  );
};

export const BrandScene = () => {
  const frame = useCurrentFrame();

  const wordOpacity = interpolate(frame, [10, 26], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const wordX = interpolate(frame, [10, 30], [-40, 0], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const lineOpacity = interpolate(frame, [62, 76], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const lineY = interpolate(frame, [62, 78], [24, 0], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill>
      <Background />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', padding: '0 90px', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
          <LogoMark />
          <div
            style={{
              fontFamily: headingFont,
              fontWeight: 700,
              fontSize: 150,
              letterSpacing: -3,
              color: COLORS.paper,
              opacity: wordOpacity,
              transform: `translateX(${wordX}px)`,
            }}
          >
            Gobiya
          </div>
        </div>

        <div
          style={{
            marginTop: 70,
            fontFamily: headingFont,
            fontWeight: 400,
            fontSize: 60,
            lineHeight: 1.18,
            color: COLORS.paper,
            opacity: lineOpacity,
            transform: `translateY(${lineY}px)`,
            maxWidth: 860,
          }}
        >
          One accountable team.
          <br />
          <em style={{ color: COLORS.carmine, fontStyle: 'italic' }}>Los Angeles.</em>
        </div>

        <div
          style={{
            marginTop: 78,
            display: 'flex',
            gap: 26,
            flexWrap: 'wrap',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {CHIPS.map((c) => (
            <Chip key={c.label} {...c} />
          ))}
          <SparklePing at={218} size={40} style={{ position: 'absolute', right: -58, top: -26 }} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
