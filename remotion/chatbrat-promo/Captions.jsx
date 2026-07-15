import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from 'remotion';
import { COLORS, bodyFont } from './theme.js';

export const CAPTION_LINES = [
  { text: 'I deleted Character.AI', start: 0, end: 51 },
  { text: 'the day I found this.', start: 51, end: 100 },
  { text: 'Every other AI chatbot forgets you exist —', start: 100, end: 198 },
  { text: 'new chat, new character,', start: 198, end: 253 },
  { text: 'zero memory, every single time.', start: 253, end: 325 },
  { text: 'ChatBrat remembers everything.', start: 325, end: 395 },
  { text: 'Your characters, your storylines,', start: 395, end: 472 },
  { text: 'your entire world — permanent.', start: 472, end: 541 },
  { text: 'Pick your genre:', start: 541, end: 579 },
  { text: 'romance, horror, fantasy, mystery, comedy.', start: 579, end: 676 },
  { text: 'Or skip the presets', start: 676, end: 720 },
  { text: 'and build your own from scratch —', start: 720, end: 797 },
  { text: 'snap the pieces together like lego.', start: 797, end: 878 },
  { text: 'Right now, 892 players', start: 878, end: 929 },
  { text: 'are inside Veiled Vows,', start: 929, end: 983 },
  { text: 'solving the mystery together.', start: 983, end: 1050 },
  { text: "And it's completely free.", start: 1050, end: 1108 },
  { text: 'No login. No API key. No paywall.', start: 1108, end: 1185 },
  { text: 'Just chatbrat.ai.', start: 1185, end: 1225 },
  { text: 'Go build your world.', start: 1225, end: 1271 },
];

const POP_FRAMES = 6;

export const Captions = () => {
  const frame = useCurrentFrame();
  const active = CAPTION_LINES.find((line) => frame >= line.start && frame < line.end);

  if (!active) return null;

  const local = frame - active.start;
  const scale = interpolate(local, [0, POP_FRAMES], [0.85, 1], {
    easing: Easing.out(Easing.back(1.6)),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const opacity = interpolate(local, [0, POP_FRAMES], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 130 }}>
      <div
        style={{
          transform: `scale(${scale})`,
          opacity,
          maxWidth: 900,
          textAlign: 'center',
          fontFamily: bodyFont,
          fontWeight: 800,
          fontSize: 46,
          lineHeight: 1.25,
          color: COLORS.light,
          padding: '10px 34px',
          borderRadius: 18,
          backgroundColor: COLORS.panelDark,
          WebkitTextStroke: `1px ${COLORS.ink}`,
        }}
      >
        {active.text}
      </div>
    </AbsoluteFill>
  );
};
