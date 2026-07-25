import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from 'remotion';
import { Background, CornerFrame, Stage } from './Chrome.jsx';
import { COLORS, headingFont, bodyFont } from './theme.js';

// Absolute frames 806–877 (local 0–71).
// VO: "One accountable team in Los Angeles." 806–869
//
// Short breath between the numbers and the ask — no agency-network hedging,
// one team, one city.

const CHIPS = ['Strategy', 'Design', 'Build', 'Content'];

export const TrustScene = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const y = interpolate(frame, [0, 16], [28, 0], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill>
      <Background />
      <CornerFrame opacity={0.3} />
      <Stage align="center" padding="0 90px" style={{ textAlign: 'center' }}>
        <div
          style={{
            fontFamily: headingFont,
            fontWeight: 700,
            fontSize: 86, // "One accountable team." has to hold one line at 900px
            lineHeight: 1.12,
            letterSpacing: -2.5,
            color: COLORS.paper,
            opacity,
            transform: `translateY(${y}px)`,
          }}
        >
          One accountable team.
          <br />
          <em style={{ color: COLORS.carmine, fontStyle: 'italic' }}>Los Angeles.</em>
        </div>

        <div style={{ marginTop: 68, display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center' }}>
          {CHIPS.map((label, i) => {
            const at = 18 + i * 8;
            const chipOpacity = interpolate(frame, [at, at + 8], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            const scale = interpolate(frame, [at, at + 12], [0.72, 1], {
              easing: Easing.out(Easing.back(2)),
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            return (
              <span
                key={label}
                style={{
                  border: `2px solid ${COLORS.paper}`,
                  padding: '14px 28px',
                  fontFamily: bodyFont,
                  fontWeight: 800,
                  fontSize: 32,
                  letterSpacing: 1,
                  color: COLORS.paper,
                  opacity: chipOpacity,
                  transform: `scale(${scale})`,
                }}
              >
                {label}
              </span>
            );
          })}
        </div>
      </Stage>
    </AbsoluteFill>
  );
};
