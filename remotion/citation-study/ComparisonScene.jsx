import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from 'remotion';
import { Background } from './Background.jsx';
import { Kicker, Watermark } from './Chrome.jsx';
import { CountUp } from './CountUp.jsx';
import { COLORS, headingFont, bodyFont } from './theme.js';

const ROWS = [
  { label: 'Niche industry publishers', value: 31.4, highlight: true, delay: 6 },
  { label: 'Wikipedia', value: 14.2, highlight: false, delay: 20 },
  { label: 'Reddit & forums', value: 6.8, highlight: false, delay: 34 },
];

const MAX = 35;

const Bar = ({ row, frame }) => {
  const barProgress = interpolate(frame, [row.delay, row.delay + 24], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const labelOpacity = interpolate(frame, [row.delay, row.delay + 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const widthPct = (row.value / MAX) * 100 * barProgress;

  return (
    <div style={{ width: '100%', marginBottom: 40 }}>
      <div
        style={{
          opacity: labelOpacity,
          fontFamily: bodyFont,
          fontWeight: 700,
          fontSize: 34,
          color: row.highlight ? COLORS.lightest : COLORS.hint,
          marginBottom: 14,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <span>{row.label}</span>
        <span style={{ fontFamily: headingFont, color: row.highlight ? COLORS.main : COLORS.lightest }}>
          <CountUp to={row.value} decimals={1} suffix="%" startFrame={row.delay} durationInFrames={24} />
        </span>
      </div>
      <div style={{ height: 26, background: 'rgba(247,245,240,0.12)', width: '100%' }}>
        <div
          style={{
            height: '100%',
            width: `${widthPct}%`,
            background: row.highlight ? COLORS.main : COLORS.hint,
          }}
        />
      </div>
    </div>
  );
};

export const ComparisonScene = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <Background />
      <AbsoluteFill style={{ zIndex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Kicker label="FINDING 4 · DOMAIN CATEGORY" />
        <div
          style={{
            fontFamily: headingFont,
            fontWeight: 700,
            fontSize: 58,
            textAlign: 'center',
            color: COLORS.lightest,
            maxWidth: 820,
            marginBottom: 56,
          }}
        >
          Niche authority beats Wikipedia and Reddit combined.
        </div>
        <div style={{ width: 820 }}>
          {ROWS.map((row) => (
            <Bar key={row.label} row={row} frame={frame} />
          ))}
        </div>
        <Watermark />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
