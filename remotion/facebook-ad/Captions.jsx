import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from 'remotion';
import { COLORS, bodyFont } from './theme.js';
import { useLayout } from './layout.js';
import timing from './timing.json';

// Burned-in captions, driven by the frame map that
// scripts/generate-fb-ad-narration.mjs measures off the real per-line audio.
// Most of Facebook's feed plays muted, so these carry the whole message.
//
// They stop at HIDE_AFTER: past that the CTA scene's own type says the same
// words at display size, and stacking a caption bar under it just doubles it.
const HIDE_AFTER = 944;

const POP = 4;

export const Captions = () => {
  const frame = useCurrentFrame();
  const { captionBottom } = useLayout();
  if (frame >= HIDE_AFTER) return null;

  const active = timing.captions.find((line) => frame >= line.start && frame < line.end);
  if (!active) return null;

  const local = frame - active.start;
  const scale = interpolate(local, [0, POP], [0.94, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const opacity = interpolate(local, [0, POP], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'flex-end', paddingBottom: captionBottom }}>
      <div
        style={{
          transform: `scale(${scale})`,
          opacity,
          maxWidth: 880,
          textAlign: 'center',
          fontFamily: bodyFont,
          fontWeight: 600,
          fontSize: 38,
          lineHeight: 1.28,
          color: COLORS.paper,
          padding: '14px 32px',
          backgroundColor: 'rgba(13, 33, 64, 0.86)',
          border: `1px solid ${COLORS.hairline}`,
        }}
      >
        {active.text}
      </div>
    </AbsoluteFill>
  );
};
