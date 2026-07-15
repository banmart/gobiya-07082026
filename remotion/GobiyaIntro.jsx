import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

const COLORS = {
  main: '#e41613',
  darkest: '#2b2b2b',
  lightest: '#f7f7f7',
};

export const GobiyaIntro = ({ headline = 'Gobiya' }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ frame, fps, config: { damping: 200 } });
  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
  const barWidth = interpolate(frame, [10, 40], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.darkest, alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ transform: `scale(${scale})`, opacity, textAlign: 'center' }}>
        <h1
          style={{
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontSize: 120,
            fontWeight: 700,
            color: COLORS.lightest,
            margin: 0,
            letterSpacing: -2,
          }}
        >
          {headline}
        </h1>
        <div
          style={{
            marginTop: 24,
            height: 6,
            width: `${barWidth}%`,
            maxWidth: 320,
            marginInline: 'auto',
            backgroundColor: COLORS.main,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
