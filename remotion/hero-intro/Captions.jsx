import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from 'remotion';
import { COLORS, bodyFont } from './theme.js';

// Absolute-frame caption track, timed to the narration's measured pause
// boundaries (ffmpeg silencedetect on public/hero-intro/audio/narration.mp3).
// The video autoplays muted on the homepage, so these carry the message.
export const CAPTION_LINES = [
  { text: 'Someone just asked ChatGPT to recommend a business like yours.', start: 2, end: 111 },
  { text: 'Were you the answer?', start: 120, end: 163 },
  { text: "Search isn't a Google box anymore —", start: 168, end: 255 },
  { text: "it's AI Overviews, ChatGPT, and Perplexity,", start: 255, end: 345 },
  { text: 'answering buyers before they ever see a link.', start: 345, end: 441 },
  { text: 'Gobiya makes you that answer.', start: 446, end: 500 },
  { text: 'One accountable team in Los Angeles:', start: 504, end: 572 },
  { text: 'SEO, AI visibility, web, and content.', start: 576, end: 685 },
  { text: 'Real numbers from the last 90 days:', start: 690, end: 760 },
  { text: '310,962 search impressions — up 34%.', start: 765, end: 898 },
  { text: 'Average position: up ten spots.', start: 903, end: 982 },
  { text: '4,850 AI citations — up 142%.', start: 987, end: 1152 },
  { text: 'Ready to be seen first?', start: 1159, end: 1204 },
  { text: 'Get your free AI visibility audit — gobiya.com', start: 1206, end: 1316 },
];

const POP_FRAMES = 5;

export const Captions = () => {
  const frame = useCurrentFrame();
  const active = CAPTION_LINES.find((line) => frame >= line.start && frame < line.end);

  if (!active) return null;

  const local = frame - active.start;
  const scale = interpolate(local, [0, POP_FRAMES], [0.92, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const opacity = interpolate(local, [0, POP_FRAMES], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 64 }}>
      <div
        style={{
          transform: `scale(${scale})`,
          opacity,
          maxWidth: 900,
          textAlign: 'center',
          fontFamily: bodyFont,
          fontWeight: 600,
          fontSize: 37,
          lineHeight: 1.3,
          color: COLORS.paper,
          padding: '12px 32px',
          backgroundColor: 'rgba(13, 33, 64, 0.82)',
          border: `1px solid ${COLORS.hairline}`,
        }}
      >
        {active.text}
      </div>
    </AbsoluteFill>
  );
};
