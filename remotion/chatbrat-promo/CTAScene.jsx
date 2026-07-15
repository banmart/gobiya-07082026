import React from 'react';
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, Easing } from 'remotion';
import { Background } from './Background.jsx';
import { COLORS, bodyFont } from './theme.js';

export const CTAScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame, fps, config: { damping: 12, mass: 0.7 }, durationInFrames: 24 });

  const buttonOpacity = interpolate(frame, [30, 42], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const pulse = interpolate(frame % 40, [0, 20, 40], [1, 1.05, 1]);

  return (
    <AbsoluteFill>
      <Background />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
        <div
          style={{
            width: 660,
            padding: '36px 40px',
            borderRadius: 40,
            backgroundColor: COLORS.light,
            boxShadow: '0 20px 50px rgba(43,36,64,0.35)',
            transform: `scale(${logoScale})`,
            marginBottom: 40,
          }}
        >
          <Img src={staticFile('chatbrat/images/logo.png')} style={{ width: '100%', height: 'auto', display: 'block' }} />
        </div>
        <div
          style={{
            opacity: buttonOpacity,
            transform: `scale(${pulse})`,
            fontFamily: bodyFont,
            fontWeight: 800,
            fontSize: 38,
            color: COLORS.light,
            backgroundColor: COLORS.ink,
            padding: '22px 52px',
            borderRadius: 999,
            boxShadow: '0 16px 40px rgba(43,36,64,0.4)',
          }}
        >
          Start creating →
        </div>
        <div
          style={{
            marginTop: 30,
            opacity: buttonOpacity,
            fontFamily: bodyFont,
            fontWeight: 700,
            fontSize: 28,
            color: COLORS.ink,
          }}
        >
          Go build your world.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
