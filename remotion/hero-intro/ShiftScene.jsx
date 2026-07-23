import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from 'remotion';
import { Background, Eyebrow } from './Background.jsx';
import { COLORS, headingFont, bodyFont } from './theme.js';

// VO (local frames): "Search isn't a Google box anymore —" 5–92,
// "it's AI Overviews, ChatGPT, and Perplexity," 92–182,
// "answering buyers before they ever see a link." 182–267.

const PLATFORMS = [
  { name: 'Google AI Overviews', note: 'Summarized answers above the fold', at: 95 },
  { name: 'ChatGPT', note: 'Recommends and cites live sources', at: 125 },
  { name: 'Perplexity', note: 'Cited — or invisible. Binary.', at: 155 },
];

const PlatformRow = ({ name, note, at }) => {
  const frame = useCurrentFrame();
  const x = interpolate(frame, [at, at + 14], [90, 0], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const opacity = interpolate(frame, [at, at + 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        gap: 30,
        borderTop: `1px solid ${COLORS.hairline}`,
        padding: '30px 6px',
        opacity,
        transform: `translateX(${x}px)`,
      }}
    >
      <div style={{ fontFamily: headingFont, fontWeight: 700, fontSize: 47, color: COLORS.paper, whiteSpace: 'nowrap' }}>
        {name}
      </div>
      <div style={{ fontFamily: bodyFont, fontSize: 27, color: COLORS.hint, textAlign: 'right' }}>{note}</div>
    </div>
  );
};

export const ShiftScene = () => {
  const frame = useCurrentFrame();

  const strike = interpolate(frame, [16, 44], [0, 100], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const barOpacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const linkOpacity = interpolate(frame, [185, 200], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const linkFade = interpolate(frame, [214, 240], [1, 0.3], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill>
      <Background />
      <AbsoluteFill style={{ justifyContent: 'center', padding: '0 110px' }}>
        <Eyebrow at={2}>Where buyers ask first, now</Eyebrow>

        <div style={{ position: 'relative', margin: '54px 0 64px', opacity: barOpacity }}>
          <div
            style={{
              border: `2px solid ${COLORS.hairline}`,
              borderRadius: 999,
              padding: '28px 44px',
              fontFamily: bodyFont,
              fontSize: 36,
              color: COLORS.hint,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            the old Google box
            <span style={{ fontSize: 30 }}>⌕</span>
          </div>
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '-1%',
              width: `${strike}%`,
              maxWidth: '102%',
              height: 5,
              backgroundColor: COLORS.carmine,
              transform: 'rotate(-2.4deg)',
            }}
          />
        </div>

        <div>
          {PLATFORMS.map((p) => (
            <PlatformRow key={p.name} {...p} />
          ))}
          <div style={{ borderTop: `1px solid ${COLORS.hairline}` }} />
        </div>

        <div
          style={{
            marginTop: 64,
            fontFamily: bodyFont,
            fontSize: 32,
            color: COLORS.hint,
            opacity: linkOpacity,
          }}
        >
          <span
            style={{
              color: '#7ea6d9',
              textDecoration: 'underline',
              opacity: linkFade,
            }}
          >
            www.your-website.com — the blue link
          </span>{' '}
          <span
            style={{
              fontWeight: 800,
              color: COLORS.paper,
              opacity: interpolate(frame, [222, 236], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
            }}
          >
            gets skipped.
          </span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
