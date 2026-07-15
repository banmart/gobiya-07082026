import React from 'react';
import { AbsoluteFill, interpolate, random, useCurrentFrame, Easing } from 'remotion';
import { COLORS, headingFont, bodyFont } from './theme.js';

export const ProblemScene = () => {
  const frame = useCurrentFrame();

  const memoryPct = interpolate(frame, [10, 90], [100, 0], {
    easing: Easing.in(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const glitchX = frame % 6 < 2 ? (random(`glitch-${frame}`) - 0.5) * 14 : 0;

  const headlineOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.ink }}>
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
        <div
          style={{
            opacity: headlineOpacity,
            transform: `translateX(${glitchX}px)`,
            fontFamily: headingFont,
            fontWeight: 700,
            fontSize: 56,
            textAlign: 'center',
            color: COLORS.light,
            maxWidth: 840,
            marginBottom: 56,
          }}
        >
          Every other AI chatbot forgets you exist.
        </div>

        <div
          style={{
            width: 720,
            fontFamily: bodyFont,
            fontWeight: 700,
            fontSize: 30,
            color: COLORS.mutedText,
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 14,
          }}
        >
          <span>MEMORY</span>
          <span style={{ color: COLORS.accent }}>{Math.round(memoryPct)}%</span>
        </div>
        <div style={{ width: 720, height: 30, borderRadius: 999, backgroundColor: 'rgba(255,247,242,0.12)', overflow: 'hidden' }}>
          <div
            style={{
              height: '100%',
              width: `${memoryPct}%`,
              backgroundColor: COLORS.accent,
              borderRadius: 999,
            }}
          />
        </div>
        <div
          style={{
            marginTop: 30,
            fontFamily: bodyFont,
            fontWeight: 600,
            fontSize: 32,
            color: COLORS.mutedText,
            textAlign: 'center',
          }}
        >
          New chat. New character. Zero memory. Every single time.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
