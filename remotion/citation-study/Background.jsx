import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { COLORS } from './theme.js';

export const Background = ({ flash = false }) => {
  const frame = useCurrentFrame();

  const sweep = interpolate(frame % 150, [0, 150], [-30, 130]);
  const pulse = interpolate(frame % 60, [0, 30, 60], [0.55, 0.85, 0.55]);

  return (
    <AbsoluteFill style={{ backgroundColor: flash ? COLORS.main : COLORS.darkest, overflow: 'hidden' }}>
      <AbsoluteFill
        style={{
          background: flash
            ? `radial-gradient(circle at 50% 30%, rgba(247,245,240,${pulse * 0.25}) 0%, rgba(228,22,19,0) 65%)`
            : `radial-gradient(circle at 50% 20%, rgba(228,22,19,${pulse * 0.35}) 0%, rgba(43,43,43,0) 60%)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: `${sweep}%`,
          width: '18%',
          height: '160%',
          transform: 'rotate(14deg)',
          background: flash ? 'rgba(43,43,43,0.12)' : 'rgba(228,22,19,0.10)',
        }}
      />
    </AbsoluteFill>
  );
};
