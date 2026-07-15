import React from 'react';
import { Img, interpolate, useCurrentFrame, Easing } from 'remotion';
import { COLORS } from './theme.js';

export const PosterCard = ({ src, width = 620, height = 780, delay = 0, rotate = 0, style }) => {
  const frame = useCurrentFrame();
  const local = frame - delay;
  const scale = interpolate(local, [0, 14], [0.85, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const opacity = interpolate(local, [0, 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        width,
        height,
        borderRadius: 32,
        overflow: 'hidden',
        border: `6px solid ${COLORS.light}`,
        boxShadow: '0 24px 60px rgba(43,36,64,0.45)',
        transform: `scale(${scale}) rotate(${rotate}deg)`,
        opacity,
        ...style,
      }}
    >
      <Img src={src} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
  );
};
