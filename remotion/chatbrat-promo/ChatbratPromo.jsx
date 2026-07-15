import React from 'react';
import { AbsoluteFill, Audio, staticFile } from 'remotion';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { slide } from '@remotion/transitions/slide';
import { HookScene } from './HookScene.jsx';
import { ProblemScene } from './ProblemScene.jsx';
import { RevealScene } from './RevealScene.jsx';
import { GenreMontageScene } from './GenreMontageScene.jsx';
import { BuildScene } from './BuildScene.jsx';
import { StatScene } from './StatScene.jsx';
import { ChecklistScene } from './ChecklistScene.jsx';
import { CTAScene } from './CTAScene.jsx';
import { Captions } from './Captions.jsx';

const CUT = linearTiming({ durationInFrames: 12 });

const DURATIONS = {
  hook: 105,
  problem: 237,
  reveal: 228,
  genre: 141,
  build: 213,
  stat: 233,
  checklist: 141,
  cta: 102,
};

export const CHATBRAT_PROMO_DURATION =
  Object.values(DURATIONS).reduce((a, b) => a + b, 0) - 12 * 7;

export const ChatbratPromo = () => {
  return (
    <AbsoluteFill>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={DURATIONS.hook}>
          <HookScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={CUT} />

        <TransitionSeries.Sequence durationInFrames={DURATIONS.problem}>
          <ProblemScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={slide({ direction: 'from-right' })} timing={CUT} />

        <TransitionSeries.Sequence durationInFrames={DURATIONS.reveal}>
          <RevealScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={CUT} />

        <TransitionSeries.Sequence durationInFrames={DURATIONS.genre}>
          <GenreMontageScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={slide({ direction: 'from-left' })} timing={CUT} />

        <TransitionSeries.Sequence durationInFrames={DURATIONS.build}>
          <BuildScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={CUT} />

        <TransitionSeries.Sequence durationInFrames={DURATIONS.stat}>
          <StatScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={slide({ direction: 'from-bottom' })} timing={CUT} />

        <TransitionSeries.Sequence durationInFrames={DURATIONS.checklist}>
          <ChecklistScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={CUT} />

        <TransitionSeries.Sequence durationInFrames={DURATIONS.cta}>
          <CTAScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      <Captions />

      <Audio src={staticFile('chatbrat/audio/narration.mp3')} />
    </AbsoluteFill>
  );
};
