import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Easing } from 'remotion';
import { Background } from './Background.jsx';
import { Kicker, Watermark } from './Chrome.jsx';
import { CountUp } from './CountUp.jsx';
import { COLORS, headingFont, bodyFont } from './theme.js';

export const StatScene = ({
  kicker,
  prefix = '',
  value,
  decimals = 0,
  suffix = '',
  headline,
  sub,
  flash = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pop = spring({ frame, fps, config: { damping: 11, mass: 0.6 }, durationInFrames: 26 });
  const headlineOpacity = interpolate(frame, [18, 30], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const headlineY = interpolate(frame, [18, 30], [24, 0], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const numberColor = flash ? COLORS.lightest : COLORS.main;

  return (
    <AbsoluteFill>
      <Background flash={flash} />
      <AbsoluteFill style={{ zIndex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Kicker label={kicker} />
        <div
          style={{
            transform: `scale(${pop})`,
            fontFamily: headingFont,
            fontWeight: 700,
            fontSize: 300,
            lineHeight: 1,
            color: numberColor,
            textShadow: flash ? '0 0 60px rgba(43,43,43,0.25)' : '0 0 80px rgba(228,22,19,0.35)',
          }}
        >
          <CountUp to={value} decimals={decimals} prefix={prefix} suffix={suffix} startFrame={2} durationInFrames={26} />
        </div>
        <div
          style={{
            marginTop: 28,
            opacity: headlineOpacity,
            transform: `translateY(${headlineY}px)`,
            fontFamily: bodyFont,
            fontWeight: 800,
            fontSize: 52,
            lineHeight: 1.2,
            textAlign: 'center',
            maxWidth: 820,
            color: COLORS.lightest,
          }}
        >
          {headline}
        </div>
        {sub ? (
          <div
            style={{
              marginTop: 18,
              opacity: headlineOpacity,
              fontFamily: bodyFont,
              fontWeight: 600,
              fontSize: 34,
              textAlign: 'center',
              maxWidth: 760,
              color: COLORS.hint,
            }}
          >
            {sub}
          </div>
        ) : null}
        <Watermark />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
