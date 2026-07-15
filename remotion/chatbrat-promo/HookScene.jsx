import React from 'react';
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, Easing } from 'remotion';
import { COLORS, headingFont } from './theme.js';

export const HookScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const imgScale = interpolate(frame, [0, 96], [1.15, 1.3], { extrapolateRight: 'clamp' });
  const dim = interpolate(frame, [0, 20], [0.35, 0.6], { extrapolateRight: 'clamp' });

  const stampScale = spring({ frame: frame - 14, fps, config: { damping: 10, mass: 0.7 }, durationInFrames: 20 });
  const stampOpacity = interpolate(frame, [14, 22], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.ink, overflow: 'hidden' }}>
      <Img
        src={staticFile('chatbrat/images/scenario-demon.jpg')}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: `scale(${imgScale})`,
        }}
      />
      <AbsoluteFill style={{ backgroundColor: `rgba(20,12,26,${dim})` }} />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 200 }}>
        <div
          style={{
            transform: `scale(${stampScale}) rotate(-3deg)`,
            opacity: stampOpacity,
            fontFamily: headingFont,
            fontWeight: 700,
            fontSize: 64,
            padding: '18px 40px',
            borderRadius: 20,
            color: COLORS.light,
            backgroundColor: COLORS.accent,
            boxShadow: '0 16px 40px rgba(0,0,0,0.45)',
            textAlign: 'center',
          }}
        >
          I DELETED
          <br />
          CHARACTER.AI
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
