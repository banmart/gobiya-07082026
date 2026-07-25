import React from 'react';
import { Composition } from 'remotion';
import { GobiyaIntro } from './GobiyaIntro.jsx';
import { CitationStudyPromo, CITATION_STUDY_DURATION } from './citation-study/CitationStudyPromo.jsx';
import { ChatbratPromo, CHATBRAT_PROMO_DURATION } from './chatbrat-promo/ChatbratPromo.jsx';
import { HeroIntro, HERO_INTRO_DURATION } from './hero-intro/HeroIntro.jsx';
import { FacebookAd, FACEBOOK_AD_DURATION } from './facebook-ad/FacebookAd.jsx';

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="HeroIntro"
        component={HeroIntro}
        durationInFrames={HERO_INTRO_DURATION}
        fps={30}
        width={1080}
        height={1350}
      />
      {/* One cut, three placements. Scenes are authored against the 4:5 master
          and remotion/facebook-ad/layout.js adapts them by height. */}
      {/* 4:5 — largest in-feed size Facebook renders without cropping */}
      <Composition
        id="FacebookAd"
        component={FacebookAd}
        durationInFrames={FACEBOOK_AD_DURATION}
        fps={30}
        width={1080}
        height={1350}
      />
      {/* 1:1 — feed fallback, Marketplace, right column, audience network */}
      <Composition
        id="FacebookAdSquare"
        component={FacebookAd}
        durationInFrames={FACEBOOK_AD_DURATION}
        fps={30}
        width={1080}
        height={1080}
      />
      {/* 9:16 — Reels and Stories; captions clear Meta's bottom UI block */}
      <Composition
        id="FacebookAdVertical"
        component={FacebookAd}
        durationInFrames={FACEBOOK_AD_DURATION}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="GobiyaIntro"
        component={GobiyaIntro}
        durationInFrames={90}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ headline: 'Gobiya' }}
      />
      <Composition
        id="CitationStudyPromo"
        component={CitationStudyPromo}
        durationInFrames={CITATION_STUDY_DURATION}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="ChatbratPromo"
        component={ChatbratPromo}
        durationInFrames={CHATBRAT_PROMO_DURATION}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
