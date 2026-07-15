import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { COLORS, bodyFont } from './theme.js';

export const Kicker = ({ label = 'AI CITATION STUDY · GOBIYA' }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        top: 64,
        left: 80,
        opacity,
        fontFamily: bodyFont,
        fontWeight: 800,
        fontSize: 28,
        letterSpacing: 3,
        color: COLORS.hint,
        textTransform: 'uppercase',
      }}
    >
      {label}
    </div>
  );
};

export const Watermark = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 56,
        right: 80,
        opacity,
        fontFamily: bodyFont,
        fontWeight: 600,
        fontSize: 26,
        color: COLORS.hint,
      }}
    >
      gobiya.com
    </div>
  );
};
