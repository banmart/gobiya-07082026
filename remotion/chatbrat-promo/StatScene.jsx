import React from 'react';
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, Easing } from 'remotion';
import { CountUp } from './CountUp.jsx';
import { COLORS, headingFont, bodyFont } from './theme.js';

export const StatScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const imgScale = interpolate(frame, [0, 225], [1.05, 1.18], { extrapolateRight: 'clamp' });
  const pop = spring({ frame, fps, config: { damping: 11, mass: 0.6 }, durationInFrames: 26 });

  const captionOpacity = interpolate(frame, [30, 44], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.ink }}>
      <Img
        src={staticFile('chatbrat/images/veiled-vows.jpg')}
        style={{ width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${imgScale})` }}
      />
      <AbsoluteFill style={{ backgroundColor: 'rgba(20,12,26,0.55)' }} />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
        <div
          style={{
            transform: `scale(${pop})`,
            fontFamily: headingFont,
            fontWeight: 700,
            fontSize: 220,
            lineHeight: 1,
            color: COLORS.light,
            textShadow: '0 0 60px rgba(232,115,138,0.55)',
          }}
        >
          <CountUp to={892} startFrame={2} durationInFrames={26} />
        </div>
        <div
          style={{
            marginTop: 20,
            opacity: captionOpacity,
            fontFamily: bodyFont,
            fontWeight: 800,
            fontSize: 42,
            letterSpacing: 1,
            textTransform: 'uppercase',
            textAlign: 'center',
            color: COLORS.accent,
          }}
        >
          players inside Veiled Vows
        </div>
        <div
          style={{
            marginTop: 12,
            opacity: captionOpacity,
            fontFamily: bodyFont,
            fontWeight: 600,
            fontSize: 32,
            textAlign: 'center',
            color: COLORS.light,
          }}
        >
          solving the mystery together, right now.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
