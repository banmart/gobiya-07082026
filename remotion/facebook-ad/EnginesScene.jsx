import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from 'remotion';
import { Background, Eyebrow, CornerFrame, Stage } from './Chrome.jsx';
import { COLORS, headingFont, bodyFont } from './theme.js';

// Absolute frames 195–353 (local 0–158).
// VO: "Google, ChatGPT, Perplexity — they answer before anyone clicks." 195–341
//
// Three named engines snap in on the beat, then the whole stack is struck
// through: the answer was given, the click never happened.

const ENGINES = [
  { name: 'Google AI Overviews', at: 6 },
  { name: 'ChatGPT', at: 30 },
  { name: 'Perplexity', at: 54 },
];

const STRIKE_AT = 96;

const EngineRow = ({ name, at }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [at, at + 7], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  // the stack recedes as the verdict takes over
  const recede = interpolate(frame, [STRIKE_AT, STRIKE_AT + 14], [1, 0.4], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const scale = interpolate(frame, [at, at + 12], [0.86, 1], {
    easing: Easing.out(Easing.back(2.2)),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  // carmine rule wipes across each name as it lands
  const rule = interpolate(frame, [at + 4, at + 18], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{ opacity: opacity * recede, transform: `scale(${scale})`, transformOrigin: 'left center' }}>
      <div
        style={{
          fontFamily: headingFont,
          fontWeight: 700,
          fontSize: 76,
          letterSpacing: -1.5,
          lineHeight: 1.16,
          color: COLORS.paper,
        }}
      >
        {name}
      </div>
      <div
        style={{
          height: 3,
          width: `${rule * 100}%`,
          backgroundColor: COLORS.carmine,
          marginTop: 14,
          marginBottom: 34,
        }}
      />
    </div>
  );
};

export const EnginesScene = () => {
  const frame = useCurrentFrame();

  const verdictOpacity = interpolate(frame, [STRIKE_AT + 4, STRIKE_AT + 16], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const verdictY = interpolate(frame, [STRIKE_AT + 4, STRIKE_AT + 18], [22, 0], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  // carmine rule grows down the left edge of the verdict as it lands
  const railHeight = interpolate(frame, [STRIKE_AT + 4, STRIKE_AT + 20], [0, 100], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill>
      <Background pulseAt={STRIKE_AT} />
      <CornerFrame opacity={0.35} />
      <Stage>
        <Eyebrow at={0} style={{ marginBottom: 46 }}>
          Where buyers ask now
        </Eyebrow>

        <div>
          {ENGINES.map((e) => (
            <EngineRow key={e.name} {...e} />
          ))}
        </div>

        <div
          style={{
            position: 'relative',
            marginTop: 22,
            paddingLeft: 34,
            opacity: verdictOpacity,
            transform: `translateY(${verdictY}px)`,
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: 8,
              height: `${railHeight}%`,
              backgroundColor: COLORS.carmine,
            }}
          />
          <div
            style={{
              fontFamily: headingFont,
              fontWeight: 400,
              fontSize: 62,
              lineHeight: 1.18,
              color: COLORS.paper,
            }}
          >
            They answer <em style={{ color: COLORS.carmine, fontStyle: 'italic' }}>before</em>
            <br />
            anyone clicks a link.
          </div>
        </div>
      </Stage>
    </AbsoluteFill>
  );
};
