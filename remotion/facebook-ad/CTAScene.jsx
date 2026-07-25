import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from 'remotion';
import { Background, Mark, Stage } from './Chrome.jsx';
import { COLORS, headingFont, bodyFont } from './theme.js';

// Absolute frames 877–1045 (local 0–168).
// VO: "Get your free A.I. visibility audit." 877–942 (local 0–65)
//     "Gobiya. Be seen first."               949–993 (local 72–116)
//
// The offer lands first, then resolves into the end card, which holds ~1.7s so
// the frame Facebook freezes on is the logo, the promise, and the domain.

export const CTAScene = () => {
  const frame = useCurrentFrame();

  const btnOpacity = interpolate(frame, [2, 12], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const btnScale = interpolate(frame, [2, 16], [0.82, 1], {
    easing: Easing.out(Easing.back(2)),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const subOpacity = interpolate(frame, [20, 32], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const brandOpacity = interpolate(frame, [72, 84], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const brandY = interpolate(frame, [72, 88], [26, 0], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const urlOpacity = interpolate(frame, [96, 110], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // keeps the held end card from reading as a still frame
  const pulse = 1 + 0.011 * Math.sin(frame / 8);

  return (
    <AbsoluteFill>
      <Background pulseAt={72} />
      <Stage align="center" padding="0 84px" style={{ textAlign: 'center' }}>
        <Mark size={166} at={0} />

        <div
          style={{
            marginTop: 46,
            backgroundColor: COLORS.carmine,
            color: COLORS.paper,
            fontFamily: bodyFont,
            fontWeight: 800,
            fontSize: 46,
            letterSpacing: 0.5,
            padding: '30px 56px',
            opacity: btnOpacity,
            transform: `scale(${btnScale * pulse})`,
          }}
        >
          Get your free AI visibility audit
        </div>

        <div
          style={{
            marginTop: 22,
            fontFamily: bodyFont,
            fontWeight: 600,
            fontSize: 30,
            letterSpacing: 2,
            textTransform: 'uppercase',
            color: COLORS.dim,
            opacity: subOpacity,
          }}
        >
          No cost · No contract
        </div>

        <div
          style={{
            marginTop: 62,
            fontFamily: headingFont,
            fontWeight: 700,
            fontSize: 116,
            lineHeight: 1.02,
            letterSpacing: -2.5,
            color: COLORS.paper,
            opacity: brandOpacity,
            transform: `translateY(${brandY}px)`,
          }}
        >
          Be seen <em style={{ color: COLORS.carmine, fontStyle: 'italic' }}>first.</em>
        </div>

        <div
          style={{
            marginTop: 30,
            fontFamily: bodyFont,
            fontWeight: 600,
            fontSize: 46,
            letterSpacing: 1.5,
            color: COLORS.hint,
            opacity: urlOpacity,
          }}
        >
          gobiya.com
        </div>
      </Stage>
    </AbsoluteFill>
  );
};
