import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Easing } from 'remotion';
import { Background } from './Background.jsx';
import { ViewfinderLock, Sparkle } from './Brackets.jsx';
import { COLORS, headingFont, bodyFont } from './theme.js';

const QUERY = 'best SEO services company near me';
const TYPE_START = 8;
const TYPE_END = 70;

// VO: "Someone just asked ChatGPT to recommend a business like yours.
//      Were you the answer?" (question lands at local ~120)
export const HookScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const typed = QUERY.slice(
    0,
    Math.round(
      interpolate(frame, [TYPE_START, TYPE_END], [0, QUERY.length], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      }),
    ),
  );
  const caret = Math.floor(frame / 8) % 2 === 0 && frame < TYPE_END + 16;

  const cardIn = interpolate(frame, [0, 14], [40, 0], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const cardOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const cardDim = interpolate(frame, [112, 126], [1, 0.32], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const thinkingOpacity = interpolate(frame, [TYPE_END + 10, TYPE_END + 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const dot = (i) =>
    0.35 + 0.65 * Math.abs(Math.sin((frame - TYPE_END) / 9 + i * 1.05));

  const questionScale = spring({
    frame: frame - 120,
    fps,
    config: { damping: 13, mass: 0.7 },
    durationInFrames: 24,
  });
  const questionOpacity = interpolate(frame, [120, 128], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill>
      <Background />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', padding: 90 }}>
        <div
          style={{
            position: 'relative',
            width: 820,
            opacity: cardOpacity * cardDim,
            transform: `translateY(${cardIn - (questionOpacity > 0 ? 120 : 0) * questionOpacity}px)`,
          }}
        >
          <ViewfinderLock width={820} height={250} lockFrame={30} />
          <div
            style={{
              backgroundColor: COLORS.panel,
              border: `1px solid ${COLORS.hairline}`,
              padding: '44px 48px',
              height: 250,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                fontFamily: bodyFont,
                fontWeight: 600,
                fontSize: 24,
                letterSpacing: 3,
                textTransform: 'uppercase',
                color: COLORS.hint,
                display: 'flex',
                alignItems: 'center',
                gap: 14,
              }}
            >
              <Sparkle size={30} />
              Asked in ChatGPT, just now
            </div>
            <div
              style={{
                fontFamily: bodyFont,
                fontWeight: 600,
                fontSize: 34,
                whiteSpace: 'nowrap',
                color: COLORS.paper,
                borderBottom: `2px solid ${COLORS.hairline}`,
                paddingBottom: 18,
              }}
            >
              {typed}
              {caret ? <span style={{ color: COLORS.carmine }}>|</span> : null}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, opacity: thinkingOpacity }}>
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  style={{
                    width: 13,
                    height: 13,
                    borderRadius: '50%',
                    backgroundColor: COLORS.paper,
                    opacity: dot(i),
                  }}
                />
              ))}
              <span style={{ fontFamily: bodyFont, fontSize: 26, color: COLORS.hint, marginLeft: 8 }}>
                choosing one answer…
              </span>
            </div>
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            top: '58%',
            width: '100%',
            textAlign: 'center',
            fontFamily: headingFont,
            fontWeight: 700,
            fontSize: 108,
            lineHeight: 1.05,
            color: COLORS.paper,
            opacity: questionOpacity,
            transform: `scale(${0.8 + 0.2 * questionScale})`,
          }}
        >
          Were{' '}
          <em style={{ color: COLORS.carmine, fontStyle: 'italic', marginRight: '0.14em' }}>you</em>
          {' '}the answer?
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
