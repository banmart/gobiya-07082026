import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { COLORS } from './theme.js';

// The logo's viewfinder device (geometry from lib/brand.js, scaled to a
// 48-unit viewBox): two opposing square corner brackets + centered 4-point
// sparkle. Used both as the literal mark and as the frame that "locks onto"
// scene content.

export const Sparkle = ({ size = 48, color = COLORS.carmine, style }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" style={style}>
    <path
      d="M24,17 L25.8,22.2 L31,24 L25.8,25.8 L24,31 L22.2,25.8 L17,24 L22.2,22.2 Z"
      fill={color}
    />
  </svg>
);

export const Mark = ({ size = 48, stroke = COLORS.paper, accent = COLORS.carmine, style }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" style={style}>
    <rect x="8" y="8" width="7" height="15" fill={stroke} />
    <rect x="8" y="8" width="15" height="7" fill={stroke} />
    <rect x="33" y="25" width="7" height="15" fill={stroke} />
    <rect x="25" y="33" width="15" height="7" fill={stroke} />
    <path
      d="M24,17 L25.8,22.2 L31,24 L25.8,25.8 L24,31 L22.2,25.8 L17,24 L22.2,22.2 Z"
      fill={accent}
    />
  </svg>
);

// Four viewfinder corners that fly in from outside and lock onto a
// rectangular target. `lockFrame` is when they land (in local frames).
export const ViewfinderLock = ({
  width,
  height,
  lockFrame = 0,
  flight = 14,
  arm = 46,
  thickness = 9,
  color = COLORS.paper,
  overshoot = 90,
  style,
}) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [lockFrame - flight, lockFrame], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const spread = (1 - t) * overshoot;
  const opacity = interpolate(frame, [lockFrame - flight, lockFrame - flight + 4], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const corner = (x, y, sx, sy) => (
    <g transform={`translate(${x + sx * spread}, ${y + sy * spread})`}>
      <rect x={sx > 0 ? 0 : -arm} y={sy > 0 ? 0 : -thickness} width={arm} height={thickness} fill={color} />
      <rect x={sx > 0 ? 0 : -thickness} y={sy > 0 ? 0 : -arm} width={thickness} height={arm} fill={color} />
    </g>
  );

  return (
    <svg
      width={width + overshoot * 2}
      height={height + overshoot * 2}
      viewBox={`${-overshoot} ${-overshoot} ${width + overshoot * 2} ${height + overshoot * 2}`}
      fill="none"
      style={{ position: 'absolute', inset: -overshoot, opacity, overflow: 'visible', ...style }}
    >
      {corner(0, 0, -1, -1)}
      {corner(width, 0, 1, -1)}
      {corner(0, height, -1, 1)}
      {corner(width, height, 1, 1)}
    </svg>
  );
};

// Carmine sparkle that pings (scales up with overshoot + fades in) at `at`.
export const SparklePing = ({ at = 0, size = 44, style }) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [at, at + 12], [0.2, 1], {
    easing: Easing.out(Easing.back(2.2)),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const opacity = interpolate(frame, [at, at + 6], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const rotate = interpolate(frame, [at, at + 40], [-24, 0], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <Sparkle
      size={size}
      style={{ transform: `scale(${scale}) rotate(${rotate}deg)`, opacity, ...style }}
    />
  );
};
