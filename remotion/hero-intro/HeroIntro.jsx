import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile } from 'remotion';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { slide } from '@remotion/transitions/slide';
import { HookScene } from './HookScene.jsx';
import { ShiftScene } from './ShiftScene.jsx';
import { BrandScene } from './BrandScene.jsx';
import { StatsScene } from './StatsScene.jsx';
import { CTAScene } from './CTAScene.jsx';
import { Captions } from './Captions.jsx';

const T = 12;
const CUT = linearTiming({ durationInFrames: T });

// Scene durations tuned so each cut's midpoint lands on a narration pause
// (see Captions.jsx for the measured boundaries). Cut centers: 168, 447,
// 686, 1153. With transition length T, seq k starts at sum(prev) - T*k.
const DURATIONS = {
  hook: 174,
  shift: 291,
  brand: 251,
  stats: 479,
  cta: 173,
};

export const HERO_INTRO_DURATION =
  Object.values(DURATIONS).reduce((a, b) => a + b, 0) - T * 4; // 1320 = 44s

const sfx = (file) => staticFile(`hero-intro/audio/${file}`);

export const HeroIntro = () => {
  return (
    <AbsoluteFill>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={DURATIONS.hook}>
          <HookScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={CUT} />

        <TransitionSeries.Sequence durationInFrames={DURATIONS.shift}>
          <ShiftScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={slide({ direction: 'from-right' })} timing={CUT} />

        <TransitionSeries.Sequence durationInFrames={DURATIONS.brand}>
          <BrandScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={CUT} />

        <TransitionSeries.Sequence durationInFrames={DURATIONS.stats}>
          <StatsScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={slide({ direction: 'from-bottom' })} timing={CUT} />

        <TransitionSeries.Sequence durationInFrames={DURATIONS.cta}>
          <CTAScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      <Captions />

      <Audio src={sfx('narration.mp3')} />
      <Audio src={sfx('music.mp3')} volume={0.55} />

      {/* viewfinder lock in the hook */}
      <Sequence from={24} durationInFrames={40}>
        <Audio src={sfx('shutter-modern.wav')} volume={0.4} />
      </Sequence>
      {/* "Were you the answer?" pop */}
      <Sequence from={119} durationInFrames={40}>
        <Audio src={sfx('mouse-click.wav')} volume={0.5} />
      </Sequence>
      {/* scene cuts */}
      {[159, 438, 677, 1144].map((f) => (
        <Sequence key={f} from={f} durationInFrames={40}>
          <Audio src={sfx('whoosh.wav')} volume={0.55} />
        </Sequence>
      ))}
      {/* service chips */}
      {[578, 602, 626, 650].map((f) => (
        <Sequence key={f} from={f} durationInFrames={30}>
          <Audio src={sfx('switch.wav')} volume={0.35} />
        </Sequence>
      ))}
      {/* stat cards land */}
      {[767, 905, 989].map((f) => (
        <Sequence key={f} from={f} durationInFrames={30}>
          <Audio src={sfx('whip.wav')} volume={0.3} />
        </Sequence>
      ))}
      {/* CTA button */}
      <Sequence from={1208} durationInFrames={60}>
        <Audio src={sfx('ding.wav')} volume={0.45} />
      </Sequence>
    </AbsoluteFill>
  );
};
