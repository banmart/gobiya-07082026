'use client';

import { useEffect, useRef } from 'react';

const CARD_FADE_START = 0.1;
const CARD_FADE_END = 0.55;
const CARD_FADE_LIFT = 24;
const CARD_FADE_QUERY = '(min-width: 768px) and (prefers-reduced-motion: no-preference)';

export default function HomeHeroVideo({ mp4Src, mp4SmSrc, poster }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const hero = video.closest('.mw-hero');
    if (!hero) return;

    video.muted = true;
    video.playsInline = true;

    video.play().catch(() => {});

    const card = hero.querySelector('.mw-hero__card');
    const fadeQuery = window.matchMedia(CARD_FADE_QUERY);

    const clearCardFade = () => {
      if (!card) return;
      card.style.opacity = '';
      card.style.transform = '';
      card.style.visibility = '';
      card.style.pointerEvents = '';
      card.style.willChange = '';
    };

    const applyCardFade = () => {
      if (!card || !fadeQuery.matches) {
        clearCardFade();
        return;
      }

      const rect = hero.getBoundingClientRect();
      const heroH = hero.offsetHeight || 520;
      const scrolled = Math.max(0, -rect.top);
      const progress = Math.min(Math.max(scrolled / heroH, 0), 1);

      if (progress === 0) {
        clearCardFade();
        return;
      }

      const span = CARD_FADE_END - CARD_FADE_START;
      const t = Math.min(Math.max((progress - CARD_FADE_START) / span, 0), 1);
      const opacity = 1 - t;

      card.style.willChange = 'opacity, transform';
      card.style.opacity = String(opacity);
      card.style.transform = `translate3d(0, ${-CARD_FADE_LIFT * t}px, 0)`;
      card.style.visibility = t === 1 ? 'hidden' : '';
      card.style.pointerEvents = t === 1 ? 'none' : '';
    };

    window.addEventListener('scroll', applyCardFade, { passive: true });
    fadeQuery.addEventListener('change', clearCardFade);

    return () => {
      window.removeEventListener('scroll', applyCardFade);
      fadeQuery.removeEventListener('change', clearCardFade);
      clearCardFade();
    };
  }, []);

  return (
    <div className="mw-hero__video-wrapper">
      <video
        ref={videoRef}
        muted
        playsInline
        autoPlay
        loop
        className="mw-hero__bg-video"
        poster={poster}
        preload="auto"
      >
        {mp4SmSrc ? (
          <source src={mp4SmSrc} type="video/mp4" media="(max-width: 767px)" />
        ) : null}
        <source src={mp4Src} type="video/mp4" />
      </video>
    </div>
  );
}
