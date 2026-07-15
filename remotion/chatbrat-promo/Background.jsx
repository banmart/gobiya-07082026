import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { COLORS } from './theme.js';

export const Background = ({ dark = false }) => {
  const frame = useCurrentFrame();
  const drift = interpolate(frame % 240, [0, 240], [0, 360]);
  const pulse = interpolate(frame % 50, [0, 25, 50], [0.7, 1, 0.7]);

  return (
    <AbsoluteFill style={{ overflow: 'hidden', backgroundColor: dark ? COLORS.ink : COLORS.gradientStart }}>
      <AbsoluteFill
        style={{
          background: dark
            ? `radial-gradient(circle at 50% 15%, rgba(232,115,138,${pulse * 0.4}) 0%, rgba(43,36,64,0) 60%)`
            : `linear-gradient(${135 + Math.sin((drift * Math.PI) / 180) * 12}deg, ${COLORS.gradientStart} 0%, ${COLORS.gradientEnd} 100%)`,
        }}
      />
      {!dark ? (
        <AbsoluteFill
          style={{
            background: `radial-gradient(circle at 50% 30%, rgba(255,255,255,${pulse * 0.22}) 0%, rgba(255,255,255,0) 55%)`,
          }}
        />
      ) : null}
    </AbsoluteFill>
  );
};
