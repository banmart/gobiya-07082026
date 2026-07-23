import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from 'remotion';
import { Background } from './Background.jsx';
import { Mark } from './Brackets.jsx';
import { COLORS, headingFont, bodyFont } from './theme.js';

// VO (local frames): "Ready to be seen first?" 11–56,
// "Get your free AI visibility audit at gobiya dot com." 58–167.

export const CTAScene = () => {
  const frame = useCurrentFrame();

  const markOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const titleOpacity = interpolate(frame, [11, 24], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const titleY = interpolate(frame, [11, 28], [30, 0], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const btnScale = interpolate(frame, [58, 72], [0.8, 1], {
    easing: Easing.out(Easing.back(1.8)),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const btnOpacity = interpolate(frame, [58, 68], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const urlOpacity = interpolate(frame, [92, 106], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  // subtle continuous pulse so the held end-frame still feels alive
  const pulse = 1 + 0.012 * Math.sin(frame / 9);

  return (
    <AbsoluteFill>
      <Background />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 90px' }}>
        <div style={{ opacity: markOpacity }}>
          <Mark size={170} />
        </div>

        <div
          style={{
            marginTop: 56,
            fontFamily: headingFont,
            fontWeight: 700,
            fontSize: 122,
            lineHeight: 1.02,
            letterSpacing: -2,
            color: COLORS.paper,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
          }}
        >
          Be seen <em style={{ color: COLORS.carmine, fontStyle: 'italic' }}>first.</em>
        </div>

        <div
          style={{
            marginTop: 74,
            backgroundColor: COLORS.carmine,
            color: COLORS.paper,
            fontFamily: bodyFont,
            fontWeight: 800,
            fontSize: 42,
            padding: '30px 58px',
            opacity: btnOpacity,
            transform: `scale(${btnScale * pulse})`,
          }}
        >
          Get your free AI visibility audit
        </div>

        <div
          style={{
            marginTop: 44,
            fontFamily: bodyFont,
            fontWeight: 600,
            fontSize: 40,
            letterSpacing: 2,
            color: COLORS.hint,
            opacity: urlOpacity,
          }}
        >
          gobiya.com
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
