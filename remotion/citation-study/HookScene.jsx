import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Easing } from 'remotion';
import { Background } from './Background.jsx';
import { Kicker, Watermark } from './Chrome.jsx';
import { COLORS, headingFont, bodyFont } from './theme.js';

const PARTS = [
  { text: 'We asked', delay: 0 },
  { text: '5', delay: 6, pop: true },
  { text: 'AI assistants', delay: 10 },
  { text: 'the same', delay: 14 },
  { text: '200', delay: 18, pop: true },
  { text: 'questions.', delay: 24 },
];

const Word = ({ text, delay, pop = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = pop
    ? spring({ frame: frame - delay, fps, config: { damping: 12, mass: 0.6 }, durationInFrames: 20 })
    : 1;
  const opacity = interpolate(frame, [delay, delay + 8], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <span
      style={{
        display: 'inline-block',
        opacity,
        transform: `scale(${scale})`,
        color: pop ? COLORS.main : COLORS.lightest,
      }}
    >
      {text}
    </span>
  );
};

export const HookScene = () => {
  const frame = useCurrentFrame();
  const subtitleOpacity = interpolate(frame, [32, 44], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill>
      <Background />
      <AbsoluteFill style={{ zIndex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Kicker />
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            columnGap: 22,
            rowGap: 8,
            fontFamily: headingFont,
            fontWeight: 700,
            fontSize: 88,
            lineHeight: 1.14,
            textAlign: 'center',
            maxWidth: 960,
          }}
        >
          {PARTS.map((part) => (
            <Word key={part.text} text={part.text} delay={part.delay} pop={part.pop} />
          ))}
        </div>
        <div
          style={{
            marginTop: 36,
            fontFamily: bodyFont,
            fontWeight: 600,
            fontSize: 40,
            color: COLORS.hint,
            opacity: subtitleOpacity,
          }}
        >
          Here's who they cite — and why.
        </div>
        <Watermark />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
