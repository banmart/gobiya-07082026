import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Easing } from 'remotion';
import { Background } from './Background.jsx';
import { COLORS, headingFont, bodyFont } from './theme.js';

export const CTAScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ frame, fps, config: { damping: 200 } });
  const opacity = interpolate(frame, [0, 14], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const barWidth = interpolate(frame, [10, 40], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const linkOpacity = interpolate(frame, [28, 42], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill>
      <Background />
      <AbsoluteFill style={{ zIndex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ transform: `scale(${scale})`, opacity, textAlign: 'center', maxWidth: 860 }}>
        <div
          style={{
            fontFamily: bodyFont,
            fontWeight: 800,
            fontSize: 30,
            letterSpacing: 2,
            textTransform: 'uppercase',
            color: COLORS.main,
            marginBottom: 24,
          }}
        >
          Read the full study
        </div>
        <h1
          style={{
            fontFamily: headingFont,
            fontWeight: 700,
            fontSize: 64,
            lineHeight: 1.15,
            color: COLORS.lightest,
            margin: 0,
          }}
        >
          3,217 AI citations analyzed.
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
        <div
          style={{
            marginTop: 36,
            opacity: linkOpacity,
            fontFamily: bodyFont,
            fontWeight: 700,
            fontSize: 36,
            color: COLORS.hint,
          }}
        >
          gobiya.com/insights/ai-citation-study
        </div>
      </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
