import React from 'react';
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, Easing } from 'remotion';
import { Background } from './Background.jsx';
import { COLORS, headingFont, bodyFont } from './theme.js';

export const RevealScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame, fps, config: { damping: 11, mass: 0.7 }, durationInFrames: 26 });
  const logoTilt = interpolate(frame, [0, 20], [-8, -2], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const headlineOpacity = interpolate(frame, [20, 34], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const headlineY = interpolate(frame, [20, 34], [24, 0], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const subOpacity = interpolate(frame, [40, 54], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill>
      <Background />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
        <div
          style={{
            width: 200,
            height: 200,
            borderRadius: 40,
            overflow: 'hidden',
            border: `6px solid ${COLORS.light}`,
            boxShadow: '0 20px 50px rgba(43,36,64,0.4)',
            transform: `scale(${logoScale}) rotate(${logoTilt}deg)`,
            marginBottom: 40,
          }}
        >
          <Img src={staticFile('chatbrat/images/og.jpg')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div
          style={{
            opacity: headlineOpacity,
            transform: `translateY(${headlineY}px)`,
            fontFamily: headingFont,
            fontWeight: 700,
            fontSize: 76,
            textAlign: 'center',
            color: COLORS.light,
            maxWidth: 880,
            textShadow: '0 4px 20px rgba(43,36,64,0.35)',
          }}
        >
          ChatBrat remembers everything.
        </div>
        <div
          style={{
            marginTop: 26,
            opacity: subOpacity,
            fontFamily: bodyFont,
            fontWeight: 700,
            fontSize: 36,
            textAlign: 'center',
            color: COLORS.ink,
            maxWidth: 760,
          }}
        >
          Your characters. Your storylines. Your entire world — permanent.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
