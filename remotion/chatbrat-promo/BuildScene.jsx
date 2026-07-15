import React from 'react';
import { AbsoluteFill, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, Easing } from 'remotion';
import { Background } from './Background.jsx';
import { PosterCard } from './PosterCard.jsx';
import { COLORS, headingFont, bodyFont } from './theme.js';

const BLOCKS = [
  { color: '#ffd166', x: -170, delay: 0 },
  { color: '#ef476f', x: -60, delay: 6 },
  { color: '#06d6a0', x: 60, delay: 12 },
  { color: '#118ab2', x: 170, delay: 18 },
];

const Block = ({ color, x, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - delay;
  const y = spring({ frame: local, fps, config: { damping: 12, mass: 0.6 }, durationInFrames: 20 });
  const translateY = interpolate(y, [0, 1], [-40, 0]);
  const opacity = interpolate(local, [0, 8], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        position: 'absolute',
        left: `calc(50% + ${x}px - 42px)`,
        top: 0,
        transform: `translateY(${translateY}px)`,
        opacity,
        width: 84,
        height: 84,
        borderRadius: 20,
        backgroundColor: color,
        boxShadow: '0 10px 24px rgba(43,36,64,0.3)',
      }}
    />
  );
};

export const BuildScene = () => {
  const frame = useCurrentFrame();
  const headlineOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cardDelay = 60;

  return (
    <AbsoluteFill>
      <Background />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
        <div
          style={{
            opacity: headlineOpacity,
            fontFamily: headingFont,
            fontWeight: 700,
            fontSize: 58,
            textAlign: 'center',
            color: COLORS.ink,
            maxWidth: 820,
            marginBottom: 8,
          }}
        >
          Or build your own from scratch.
        </div>
        <div
          style={{
            marginBottom: 36,
            fontFamily: bodyFont,
            fontWeight: 700,
            fontSize: 32,
            color: COLORS.light,
            textAlign: 'center',
          }}
        >
          Snap the pieces together — like lego.
        </div>

        <div style={{ position: 'relative', width: 400, height: 84, marginBottom: 46 }}>
          {BLOCKS.map((b) => (
            <Block key={b.x} {...b} />
          ))}
        </div>

        <PosterCard src={staticFile('chatbrat/images/scenario-butler.jpg')} width={420} height={520} delay={cardDelay} rotate={-2} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
