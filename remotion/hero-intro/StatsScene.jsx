import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from 'remotion';
import { Background, Eyebrow } from './Background.jsx';
import { SparklePing } from './Brackets.jsx';
import { CountUp } from './CountUp.jsx';
import { COLORS, headingFont, bodyFont } from './theme.js';

// VO (local frames): "Real numbers from the last ninety days:" 9–74,
// impressions stat 84–217, position stat 222–284, AI citations 306–465.
// Values are the published ones from lib/searchWins.js — real GSC +
// AI-grounding data, nothing invented.

const Card = ({ at, children, accent = false }) => {
  const frame = useCurrentFrame();
  const x = interpolate(frame, [at, at + 14], [120, 0], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const opacity = interpolate(frame, [at, at + 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <div
      style={{
        border: `1px solid ${COLORS.hairline}`,
        borderLeft: `6px solid ${accent ? COLORS.carmine : COLORS.paper}`,
        backgroundColor: COLORS.panel,
        padding: '34px 42px',
        opacity,
        transform: `translateX(${x}px)`,
        position: 'relative',
      }}
    >
      {children}
    </div>
  );
};

const Label = ({ children }) => (
  <div
    style={{
      fontFamily: bodyFont,
      fontWeight: 600,
      fontSize: 26,
      letterSpacing: 3,
      textTransform: 'uppercase',
      color: COLORS.hint,
      marginBottom: 10,
    }}
  >
    {children}
  </div>
);

const Badge = ({ at, children }) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [at, at + 12], [0.6, 1], {
    easing: Easing.out(Easing.back(2)),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const opacity = interpolate(frame, [at, at + 8], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <span
      style={{
        display: 'inline-block',
        backgroundColor: COLORS.carmine,
        color: COLORS.paper,
        fontFamily: bodyFont,
        fontWeight: 800,
        fontSize: 34,
        padding: '10px 22px',
        marginLeft: 26,
        opacity,
        transform: `scale(${scale})`,
        verticalAlign: 'middle',
      }}
    >
      {children}
    </span>
  );
};

const numStyle = {
  fontFamily: headingFont,
  fontWeight: 700,
  fontSize: 96,
  lineHeight: 1,
  color: COLORS.paper,
  letterSpacing: -2,
};

export const StatsScene = () => {
  const frame = useCurrentFrame();
  const footOpacity = interpolate(frame, [330, 348], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const arrowX = interpolate(frame, [252, 276], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill>
      <Background />
      <AbsoluteFill style={{ justifyContent: 'center', padding: '0 100px' }}>
        <Eyebrow at={9}>Real numbers · last 90 days</Eyebrow>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 34, marginTop: 56 }}>
          <Card at={84}>
            <Label>Search impressions</Label>
            <CountUp to={310962} startFrame={88} durationInFrames={44} style={numStyle} />
            <Badge at={130}>+34%</Badge>
          </Card>

          <Card at={222}>
            <Label>Average position</Label>
            <span style={{ ...numStyle, color: COLORS.hint, fontSize: 76 }}>42.8</span>
            <span
              style={{
                ...numStyle,
                fontSize: 76,
                display: 'inline-block',
                margin: '0 24px',
                color: COLORS.carmine,
                transform: `translateX(${arrowX * 10}px)`,
                opacity: 0.4 + 0.6 * arrowX,
              }}
            >
              →
            </span>
            <CountUp to={32.9} decimals={1} startFrame={250} durationInFrames={30} style={numStyle} />
            <Badge at={272}>10 spots better</Badge>
          </Card>

          <Card at={306} accent>
            <Label>AI citations · ChatGPT, Gemini &amp; Perplexity</Label>
            <CountUp to={4850} startFrame={310} durationInFrames={40} style={numStyle} />
            <Badge at={346}>+142%</Badge>
            <SparklePing at={352} size={44} style={{ position: 'absolute', top: 22, right: 26 }} />
          </Card>
        </div>

        <div
          style={{
            marginTop: 48,
            fontFamily: bodyFont,
            fontSize: 24,
            color: COLORS.hint,
            opacity: footOpacity,
          }}
        >
          Blended Google Search Console + AI answer-grounding data across every site we run search for.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
