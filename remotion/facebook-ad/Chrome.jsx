import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from 'remotion';
import { COLORS, bodyFont } from './theme.js';
import { useLayout } from './layout.js';

// Shared surfaces and the brand mark. The ad cuts every ~2s, so every element
// here animates from a single `at` frame — scenes stay readable as one-liners.

export const Background = ({ pulseAt = null }) => {
  const frame = useCurrentFrame();
  const drift = interpolate(frame, [0, 300], [0, -40]);
  // Carmine lift on accent beats. Kept under 0.1 and screened rather than
  // laid over: anything heavier mixes with the navy into purple, which is
  // nowhere in the palette.
  const wash = pulseAt === null
    ? 0
    : interpolate(frame, [pulseAt, pulseAt + 5, pulseAt + 22], [0, 0.09, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.navy }}>
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
          background: `radial-gradient(circle at 50% 40%, transparent 28%, ${COLORS.navyDeep} 128%)`,
        }}
      />
      {wash > 0 && (
        <AbsoluteFill
          style={{ backgroundColor: COLORS.carmine, opacity: wash, mixBlendMode: 'screen' }}
        />
      )}
    </AbsoluteFill>
  );
};

// lib/brand.js geometry: two opposing corner brackets that snap inward, with
// the carmine sparkle popping in the open middle.
export const Mark = ({ size = 150, at = 0, animate = true }) => {
  const frame = useCurrentFrame();
  const t = animate
    ? interpolate(frame, [at, at + 11], [0, 1], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : 1;
  const spread = (1 - t) * 55;
  const opacity = animate
    ? interpolate(frame, [at, at + 6], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
    : 1;
  const sparkle = animate
    ? interpolate(frame, [at + 11, at + 22], [0, 1], {
        easing: Easing.out(Easing.back(2.6)),
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : 1;

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
      <g transform={`translate(24, 24) scale(${sparkle}) translate(-24, -24)`}>
        <path
          d="M24,17 L25.8,22.2 L31,24 L25.8,25.8 L24,31 L22.2,25.8 L17,24 L22.2,22.2 Z"
          fill={COLORS.carmine}
        />
      </g>
    </svg>
  );
};

// Site's `.eyebrow`: carmine dot + small caps, letterspaced.
export const Eyebrow = ({ children, at = 0, style }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [at, at + 8], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const y = interpolate(frame, [at, at + 8], [12, 0], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        fontFamily: bodyFont,
        fontSize: 26,
        fontWeight: 600,
        letterSpacing: 4,
        textTransform: 'uppercase',
        color: COLORS.hint,
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

// Content layer. Scenes are authored against the 4:5 master and this scales
// them to whatever placement is rendering, so the Background stays full-bleed
// and only the type block moves. transformOrigin stays centred — every scene
// centres its content vertically.
export const Stage = ({ children, padding = '0 96px', align = 'stretch', style }) => {
  const { scale, shiftY } = useLayout();
  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: align,
        padding,
        transform: `translateY(${shiftY}px) scale(${scale})`,
        ...style,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

// Persistent corner-bracket frame — keeps the mark's viewfinder language on
// screen through scenes that don't show the logo itself.
export const CornerFrame = ({ length = 76, thickness = 5, opacity = 0.5 }) => {
  const { frameInset: inset } = useLayout();
  const bar = (style) => (
    <div style={{ position: 'absolute', backgroundColor: COLORS.paper, ...style }} />
  );
  return (
    <AbsoluteFill style={{ opacity }}>
      {bar({ top: inset, left: inset, width: length, height: thickness })}
      {bar({ top: inset, left: inset, width: thickness, height: length })}
      {bar({ bottom: inset, right: inset, width: length, height: thickness })}
      {bar({ bottom: inset, right: inset, width: thickness, height: length })}
    </AbsoluteFill>
  );
};

// Counts to `value`, easing out, then holds. Used for the proof block.
export const CountUp = ({ value, at, duration = 34, format = (n) => n.toLocaleString('en-US') }) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [at, at + duration], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return <>{format(Math.round(value * t))}</>;
};
