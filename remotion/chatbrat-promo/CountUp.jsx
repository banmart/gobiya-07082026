import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';

export const CountUp = ({ to, startFrame = 0, durationInFrames = 36, style }) => {
  const frame = useCurrentFrame();
  const value = interpolate(frame, [startFrame, startFrame + durationInFrames], [0, to], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return <span style={style}>{Math.round(value).toLocaleString('en-US')}</span>;
};
