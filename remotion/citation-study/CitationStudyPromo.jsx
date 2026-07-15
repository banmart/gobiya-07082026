import React from 'react';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { slide } from '@remotion/transitions/slide';
import { HookScene } from './HookScene.jsx';
import { StatScene } from './StatScene.jsx';
import { ComparisonScene } from './ComparisonScene.jsx';
import { CTAScene } from './CTAScene.jsx';

const CUT = linearTiming({ durationInFrames: 12 });

export const CitationStudyPromo = () => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={90}>
        <HookScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={slide({ direction: 'from-right' })} timing={CUT} />

      <TransitionSeries.Sequence durationInFrames={85}>
        <StatScene
          kicker="METHODOLOGY"
          value={3217}
          headline="citations analyzed"
          sub="Across ChatGPT, Gemini, Perplexity, Claude & Copilot"
        />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={CUT} />

      <TransitionSeries.Sequence durationInFrames={90}>
        <StatScene
          kicker="FINDING 1 · OVERLAP"
          value={2.7}
          decimals={1}
          suffix="%"
          headline="were cited by ALL FIVE models."
          sub="The rest split across one, two, three, or four."
          flash
        />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={slide({ direction: 'from-left' })} timing={CUT} />

      <TransitionSeries.Sequence durationInFrames={90}>
        <StatScene
          kicker="FINDING 1 · OVERLAP"
          value={67.9}
          decimals={1}
          suffix="%"
          headline="of citations appeared in just ONE model."
          sub="Optimizing for one AI doesn't transfer to the others."
        />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={CUT} />

      <TransitionSeries.Sequence durationInFrames={95}>
        <StatScene
          kicker="FINDING 3 · CITATION CLASS"
          value={4.5}
          decimals={1}
          suffix="x"
          headline="more likely to be cited — with original data."
          sub="The single strongest predictor in the dataset."
          flash
        />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={slide({ direction: 'from-bottom' })} timing={CUT} />

      <TransitionSeries.Sequence durationInFrames={110}>
        <ComparisonScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={CUT} />

      <TransitionSeries.Sequence durationInFrames={100}>
        <CTAScene />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};

export const CITATION_STUDY_DURATION = 90 + 85 + 90 + 90 + 95 + 110 + 100 - 12 * 6;
