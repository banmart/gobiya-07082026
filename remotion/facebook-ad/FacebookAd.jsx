import React from 'react';
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile } from 'remotion';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { slide } from '@remotion/transitions/slide';
import { wipe } from '@remotion/transitions/wipe';
import { HookScene } from './HookScene.jsx';
import { EnginesScene } from './EnginesScene.jsx';
import { BrandScene } from './BrandScene.jsx';
import { ServicesScene } from './ServicesScene.jsx';
import { ProofScene } from './ProofScene.jsx';
import { TrustScene } from './TrustScene.jsx';
import { CTAScene } from './CTAScene.jsx';
import { Captions } from './Captions.jsx';

// Authored at 1080x1350 (4:5) — the tallest ratio Facebook renders in-feed
// without cropping. The same component also drives the 1:1 and 9:16
// placements; scenes adapt through <Stage> and layout.js rather than being
// forked. See README.md.
//
// The edit is locked to the narration measured by
// scripts/generate-fb-ad-narration.mjs. STARTS below are the absolute frames
// each scene begins on; every scene file documents its own local offsets
// against these. Regenerate narration → re-check these against timing.json.

const T = 8; // 0.27s cuts — fast, but still a transition rather than a jump

// hook, engines, brand, services, proof, trust, cta
const STARTS = [0, 195, 353, 421, 625, 806, 877];
export const FACEBOOK_AD_DURATION = 1045; // 34.8s — narration is 34.0s

// TransitionSeries offsets each sequence back by T per preceding transition,
// so a sequence's duration is (gap to the next scene + T); the last one just
// runs out the clock.
const DURATIONS = STARTS.map((start, i) =>
  i === STARTS.length - 1 ? FACEBOOK_AD_DURATION - start : STARTS[i + 1] - start + T
);

const CUT = linearTiming({ durationInFrames: T });
const sfx = (file) => staticFile(`hero-intro/audio/${file}`);
const ad = (file) => staticFile(`fb-ad/audio/${file}`);

const SCENES = [HookScene, EnginesScene, BrandScene, ServicesScene, ProofScene, TrustScene, CTAScene];

// Varied so six cuts in 35s don't read as one repeated effect.
const TRANSITIONS = [
  fade(),
  slide({ direction: 'from-right' }),
  wipe({ direction: 'from-bottom' }),
  slide({ direction: 'from-right' }),
  fade(),
  slide({ direction: 'from-bottom' }),
];

// Music sits under the read, then comes up once the voiceover is done so the
// held end card doesn't fall into silence.
const musicVolume = (f) =>
  interpolate(f, [0, 12, 990, 1010], [0, 0.34, 0.34, 0.62], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

export const FacebookAd = () => {
  return (
    <AbsoluteFill>
      <TransitionSeries>
        {SCENES.map((Scene, i) => (
          <React.Fragment key={i}>
            {i > 0 && <TransitionSeries.Transition presentation={TRANSITIONS[i - 1]} timing={CUT} />}
            <TransitionSeries.Sequence durationInFrames={DURATIONS[i]}>
              <Scene />
            </TransitionSeries.Sequence>
          </React.Fragment>
        ))}
      </TransitionSeries>

      <Captions />

      <Audio src={ad('narration.mp3')} />
      <Audio src={ad('music.mp3')} volume={musicVolume} />

      {/* scene cuts */}
      {STARTS.slice(1).map((s) => (
        <Sequence key={`cut-${s}`} from={s - T} durationInFrames={30}>
          <Audio src={sfx('whoosh.wav')} volume={0.5} />
        </Sequence>
      ))}

      {/* hook: "not mentioned" stamp */}
      <Sequence from={132} durationInFrames={30}>
        <Audio src={sfx('mouse-click.wav')} volume={0.5} />
      </Sequence>

      {/* engines: each name lands, then the strike-through */}
      {[201, 225, 249, 291].map((f) => (
        <Sequence key={`eng-${f}`} from={f} durationInFrames={26}>
          <Audio src={sfx('whip.wav')} volume={0.3} />
        </Sequence>
      ))}

      {/* services: card by card */}
      {[421, 474, 543].map((f) => (
        <Sequence key={`svc-${f}`} from={f} durationInFrames={26}>
          <Audio src={sfx('switch.wav')} volume={0.38} />
        </Sequence>
      ))}

      {/* proof: stat cards */}
      {[625, 704].map((f) => (
        <Sequence key={`stat-${f}`} from={f} durationInFrames={26}>
          <Audio src={sfx('whip.wav')} volume={0.32} />
        </Sequence>
      ))}

      {/* CTA button */}
      <Sequence from={879} durationInFrames={60}>
        <Audio src={sfx('ding.wav')} volume={0.45} />
      </Sequence>
    </AbsoluteFill>
  );
};
