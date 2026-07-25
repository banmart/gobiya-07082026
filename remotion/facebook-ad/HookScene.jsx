import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from 'remotion';
import { Background, Eyebrow, CornerFrame, Stage } from './Chrome.jsx';
import { COLORS, headingFont, bodyFont } from './theme.js';

// Absolute frames 0–195.
// VO: "Right now, someone's asking A.I. who to hire." 0–81
//     "If your business isn't the answer, you're invisible." 89–183
//
// The buyer's screen, not ours: a prompt types itself, an answer resolves into
// three competitors, and the fourth slot — yours — stays empty.

const PROMPT = 'best web design and SEO agency near me';
const TYPE_START = 12;
const TYPE_END = 74;

const RESULTS = [
  { at: 92, label: 'A competitor' },
  { at: 104, label: 'A competitor' },
  { at: 116, label: 'A competitor' },
];

const Cursor = () => {
  const frame = useCurrentFrame();
  const on = Math.floor(frame / 8) % 2 === 0;
  return (
    <span
      style={{
        display: 'inline-block',
        width: 4,
        height: 44,
        marginLeft: 6,
        verticalAlign: 'middle',
        backgroundColor: COLORS.carmine,
        opacity: on ? 1 : 0,
      }}
    />
  );
};

const ResultRow = ({ at, label }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [at, at + 8], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const x = interpolate(frame, [at, at + 12], [-30, 0], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        padding: '22px 0',
        borderTop: `1px solid ${COLORS.hairline}`,
        opacity,
        transform: `translateX(${x}px)`,
      }}
    >
      <span style={{ width: 12, height: 12, backgroundColor: COLORS.hint }} />
      <span
        style={{
          flex: 1,
          height: 20,
          backgroundColor: 'rgba(244, 247, 251, 0.22)',
        }}
      />
      <span
        style={{
          fontFamily: bodyFont,
          fontWeight: 600,
          fontSize: 26,
          letterSpacing: 1,
          color: COLORS.dim,
        }}
      >
        {label}
      </span>
    </div>
  );
};

export const HookScene = () => {
  const frame = useCurrentFrame();

  const chars = Math.round(
    interpolate(frame, [TYPE_START, TYPE_END], [0, PROMPT.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );
  const typing = frame >= TYPE_START && frame < TYPE_END + 10;

  const panelOpacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const panelY = interpolate(frame, [0, 14], [26, 0], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // The empty fourth slot lands with the "you're invisible" line and holds.
  const slotAt = 132;
  const slotOpacity = interpolate(frame, [slotAt, slotAt + 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const slotScale = interpolate(frame, [slotAt, slotAt + 14], [0.94, 1], {
    easing: Easing.out(Easing.back(1.6)),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill>
      <Background />
      <CornerFrame opacity={0.35} />
      <Stage>
        <Eyebrow at={2} style={{ marginBottom: 40 }}>
          Right now
        </Eyebrow>

        <div
          style={{
            border: `1px solid ${COLORS.hairline}`,
            backgroundColor: 'rgba(13, 33, 64, 0.72)',
            padding: '44px 46px',
            opacity: panelOpacity,
            transform: `translateY(${panelY}px)`,
          }}
        >
          <div
            style={{
              fontFamily: bodyFont,
              fontWeight: 600,
              fontSize: 24,
              letterSpacing: 4,
              textTransform: 'uppercase',
              color: COLORS.dim,
              marginBottom: 26,
            }}
          >
            Ask AI
          </div>

          <div
            style={{
              fontFamily: headingFont,
              fontWeight: 400,
              fontSize: 52,
              lineHeight: 1.22,
              color: COLORS.paper,
              minHeight: 130,
            }}
          >
            {PROMPT.slice(0, chars)}
            {typing && <Cursor />}
          </div>

          <div style={{ marginTop: 30 }}>
            {RESULTS.map((r, i) => (
              <ResultRow key={i} {...r} />
            ))}

            <div
              style={{
                marginTop: 26,
                border: `3px dashed ${COLORS.carmine}`,
                padding: '30px 28px',
                textAlign: 'center',
                fontFamily: bodyFont,
                fontWeight: 800,
                fontSize: 34,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: COLORS.carmine,
                opacity: slotOpacity,
                transform: `scale(${slotScale})`,
              }}
            >
              Your business — not mentioned
            </div>
          </div>
        </div>
      </Stage>
    </AbsoluteFill>
  );
};
