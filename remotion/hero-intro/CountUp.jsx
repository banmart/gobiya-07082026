import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';

export const CountUp = ({
  to,
  decimals = 0,
  prefix = '',
  suffix = '',
  startFrame = 0,
  durationInFrames = 36,
  style,
}) => {
  const frame = useCurrentFrame();
  const value = interpolate(frame, [startFrame, startFrame + durationInFrames], [0, to], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const formatted =
    decimals > 0
      ? value.toFixed(decimals)
      : Math.round(value).toLocaleString('en-US');

  return (
    <span style={style}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
};
