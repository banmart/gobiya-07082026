import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from 'remotion';
import { Background, Eyebrow, CornerFrame, CountUp, Stage } from './Chrome.jsx';
import { COLORS, headingFont, bodyFont } from './theme.js';

// Absolute frames 625–806 (local 0–181).
// VO: "Impressions, up thirty-four percent."              625–698 (local 0–73)
//     "A.I. citations, up one hundred forty-two percent." 704–794 (local 79–169)
//
// Figures carried over verbatim from the shipped hero-intro cut so the two
// pieces of creative never quote different numbers.

const STATS = [
  { value: 310962, label: 'Search impressions', delta: '↑ 34%', at: 0 },
  { value: 4850, label: 'AI citations', delta: '↑ 142%', at: 79 },
];

const StatCard = ({ value, label, delta, at }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [at, at + 8], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const y = interpolate(frame, [at, at + 14], [40, 0], {
    easing: Easing.out(Easing.back(1.4)),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const deltaOpacity = interpolate(frame, [at + 28, at + 40], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const deltaScale = interpolate(frame, [at + 28, at + 42], [0.8, 1], {
    easing: Easing.out(Easing.back(2.4)),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        border: `1px solid ${COLORS.hairline}`,
        backgroundColor: COLORS.panel,
        padding: '46px 48px',
        marginBottom: 34,
        opacity,
        transform: `translateY(${y}px)`,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 26, flexWrap: 'wrap' }}>
        <div
          style={{
            fontFamily: headingFont,
            fontWeight: 700,
            fontSize: 130,
            letterSpacing: -4,
            lineHeight: 1,
            color: COLORS.paper,
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          <CountUp value={value} at={at} />
        </div>
        <div
          style={{
            fontFamily: bodyFont,
            fontWeight: 800,
            fontSize: 44,
            color: COLORS.paper,
            backgroundColor: COLORS.carmine,
            padding: '10px 22px',
            opacity: deltaOpacity,
            transform: `scale(${deltaScale})`,
          }}
        >
          {delta}
        </div>
      </div>
      <div
        style={{
          marginTop: 20,
          fontFamily: bodyFont,
          fontWeight: 600,
          fontSize: 34,
          letterSpacing: 3,
          textTransform: 'uppercase',
          color: COLORS.hint,
        }}
      >
        {label}
      </div>
    </div>
  );
};

export const ProofScene = () => {
  return (
    <AbsoluteFill>
      <Background />
      <CornerFrame opacity={0.3} />
      <Stage padding="0 84px">
        <Eyebrow at={0} style={{ marginBottom: 44 }}>
          Client results, last 90 days
        </Eyebrow>
        {STATS.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </Stage>
    </AbsoluteFill>
  );
};
