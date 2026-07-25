import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from 'remotion';
import { Background, Eyebrow, CornerFrame, Stage } from './Chrome.jsx';
import { COLORS, headingFont, bodyFont } from './theme.js';

// Absolute frames 421–625 (local 0–204).
// VO: "Websites built to convert."          421–470  (local 0–49)
//     "S.E.O. that earns the top spot."      474–539  (local 53–118)
//     "A.I. visibility that gets you cited." 543–613  (local 122–192)
//
// One card per service, each landing on its own line. Earlier cards stay up
// but recede, so by the last beat the full offer is on screen at once.

const CARDS = [
  {
    num: '01',
    title: 'Web Design',
    line: 'Fast, credible sites built to convert.',
    at: 0,
  },
  {
    num: '02',
    title: 'SEO',
    line: 'Earn the top spot and keep it.',
    at: 53,
  },
  {
    num: '03',
    title: 'AI Visibility',
    line: 'Get named when AI answers.',
    at: 122,
  },
];

const Card = ({ num, title, line, at, isLast }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [at, at + 8], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const x = interpolate(frame, [at, at + 14], [56, 0], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  // active card is full strength; once the next one lands it recedes
  const active = interpolate(frame, [at, at + 6, at + 60, at + 74], [0, 1, 1, isLast ? 1 : 0.5], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 32,
        padding: '34px 36px',
        border: `1px solid ${COLORS.hairline}`,
        borderLeft: `6px solid ${COLORS.carmine}`,
        backgroundColor: COLORS.panel,
        marginBottom: 26,
        opacity: opacity * active,
        transform: `translateX(${x}px)`,
      }}
    >
      <div
        style={{
          fontFamily: bodyFont,
          fontWeight: 800,
          fontSize: 30,
          letterSpacing: 2,
          color: COLORS.carmine,
          paddingTop: 12,
        }}
      >
        {num}
      </div>
      <div>
        <div
          style={{
            fontFamily: headingFont,
            fontWeight: 700,
            fontSize: 74,
            letterSpacing: -1.5,
            lineHeight: 1.06,
            color: COLORS.paper,
          }}
        >
          {title}
        </div>
        <div
          style={{
            marginTop: 12,
            fontFamily: bodyFont,
            fontWeight: 600,
            fontSize: 32,
            color: COLORS.hint,
          }}
        >
          {line}
        </div>
      </div>
    </div>
  );
};

export const ServicesScene = () => {
  return (
    <AbsoluteFill>
      <Background />
      <CornerFrame opacity={0.3} />
      <Stage padding="0 84px">
        <Eyebrow at={0} style={{ marginBottom: 44 }}>
          What we build
        </Eyebrow>
        {CARDS.map((c, i) => (
          <Card key={c.num} {...c} isLast={i === CARDS.length - 1} />
        ))}
      </Stage>
    </AbsoluteFill>
  );
};
