import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { COLORS, headingFont } from './theme.js';

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
        top: 64,
        left: 0,
        right: 0,
        opacity,
        textAlign: 'center',
        fontFamily: headingFont,
        fontWeight: 600,
        fontSize: 30,
        letterSpacing: 1,
        color: COLORS.light,
        textShadow: '0 2px 10px rgba(43,36,64,0.35)',
      }}
    >
      chatbrat.ai
    </div>
  );
};

export const Stamp = ({ text, delay = 0, tone = 'light' }) => {
  const frame = useCurrentFrame();
  const local = frame - delay;
  const scale = interpolate(local, [0, 8, 14], [0, 1.15, 1], {
    easing: Easing.out(Easing.back(2)),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const opacity = interpolate(local, [0, 6], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        display: 'inline-block',
        transform: `scale(${scale}) rotate(-2deg)`,
        opacity,
        fontFamily: headingFont,
        fontWeight: 600,
        fontSize: 40,
        padding: '14px 30px',
        borderRadius: 999,
        color: tone === 'light' ? COLORS.ink : COLORS.light,
        backgroundColor: tone === 'light' ? COLORS.light : COLORS.accent,
        boxShadow: '0 8px 24px rgba(43,36,64,0.28)',
      }}
    >
      {text}
    </div>
  );
};
