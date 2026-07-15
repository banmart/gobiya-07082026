import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from 'remotion';
import { Background } from './Background.jsx';
import { Stamp } from './Chrome.jsx';
import { headingFont, COLORS } from './theme.js';

const ITEMS = [
  { text: '✓ COMPLETELY FREE', delay: 0 },
  { text: '✓ NO LOGIN', delay: 14 },
  { text: '✓ NO API KEY', delay: 28 },
  { text: '✓ NO PAYWALL', delay: 42 },
];

export const ChecklistScene = () => {
  const frame = useCurrentFrame();
  const headlineOpacity = interpolate(frame, [0, 10], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill>
      <Background dark />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
        <div
          style={{
            opacity: headlineOpacity,
            fontFamily: headingFont,
            fontWeight: 700,
            fontSize: 52,
            textAlign: 'center',
            color: COLORS.light,
            marginBottom: 46,
          }}
        >
          Zero barriers to entry.
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22, alignItems: 'center' }}>
          {ITEMS.map((item) => (
            <Stamp key={item.text} text={item.text} delay={item.delay} tone={item.text.includes('FREE') ? 'accent' : 'light'} />
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
