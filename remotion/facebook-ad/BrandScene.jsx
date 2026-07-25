import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from 'remotion';
import { Background, Mark, Stage } from './Chrome.jsx';
import { COLORS, headingFont } from './theme.js';

// Absolute frames 353–421 (local 0–68).
// VO: "Gobiya makes you the answer." 353–411
//
// The turn. Mark assembles, wordmark slides in beside it, one line under.

export const BrandScene = () => {
  const frame = useCurrentFrame();

  const wordOpacity = interpolate(frame, [8, 22], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const wordX = interpolate(frame, [8, 26], [-46, 0], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const lineOpacity = interpolate(frame, [28, 42], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const lineY = interpolate(frame, [28, 44], [24, 0], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill>
      <Background pulseAt={0} />
      <Stage align="center" padding="0 90px" style={{ textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 34 }}>
          <Mark size={190} at={0} />
          <div
            style={{
              fontFamily: headingFont,
              fontWeight: 700,
              fontSize: 152,
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
            marginTop: 56,
            fontFamily: headingFont,
            fontWeight: 400,
            fontSize: 66,
            lineHeight: 1.16,
            color: COLORS.paper,
            opacity: lineOpacity,
            transform: `translateY(${lineY}px)`,
            maxWidth: 840,
          }}
        >
          We make you <em style={{ color: COLORS.carmine, fontStyle: 'italic' }}>the answer.</em>
        </div>
      </Stage>
    </AbsoluteFill>
  );
};
