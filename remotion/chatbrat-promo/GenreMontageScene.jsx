import React from 'react';
import { AbsoluteFill, Img, Sequence, interpolate, staticFile, useCurrentFrame, Easing } from 'remotion';
import { COLORS, headingFont } from './theme.js';

const CARDS = [
  { src: 'chatbrat/images/veiled-vows.jpg', tag: 'ROMANCE' },
  { src: 'chatbrat/images/scenario-demon.jpg', tag: 'HORROR' },
  { src: 'chatbrat/images/scenario-pirate.jpg', tag: 'FANTASY' },
  { src: 'chatbrat/images/murder-in-the-mist.jpg', tag: 'MYSTERY' },
  { src: 'chatbrat/images/scenario-chef.jpg', tag: 'COMEDY' },
];

export const GENRE_SCENE_DURATION = 141;
const CARD_LENGTH = 28;

const Card = ({ src, tag }) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, CARD_LENGTH], [1.08, 1.22], { extrapolateRight: 'clamp' });
  const tagScale = interpolate(frame, [2, 10], [0.6, 1], {
    easing: Easing.out(Easing.back(2)),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const tagOpacity = interpolate(frame, [2, 8], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.ink }}>
      <Img src={staticFile(src)} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${scale})` }} />
      <AbsoluteFill style={{ backgroundColor: 'rgba(20,12,26,0.18)' }} />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'flex-start', paddingTop: 140 }}>
        <div
          style={{
            transform: `scale(${tagScale}) rotate(-3deg)`,
            opacity: tagOpacity,
            fontFamily: headingFont,
            fontWeight: 700,
            fontSize: 58,
            letterSpacing: 2,
            padding: '14px 36px',
            borderRadius: 16,
            color: COLORS.ink,
            backgroundColor: COLORS.light,
            boxShadow: '0 12px 30px rgba(0,0,0,0.35)',
          }}
        >
          {tag}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const GenreMontageScene = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.ink }}>
      {CARDS.map((card, i) => {
        const isLast = i === CARDS.length - 1;
        const duration = isLast ? GENRE_SCENE_DURATION - CARD_LENGTH * (CARDS.length - 1) : CARD_LENGTH;
        return (
          <Sequence key={card.tag} from={i * CARD_LENGTH} durationInFrames={duration}>
            <Card src={card.src} tag={card.tag} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
