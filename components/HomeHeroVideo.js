'use client';

import { useEffect, useRef } from 'react';

const SCRUB_PX = 700;
const SOURCE_FPS = 24;
const ONE_FRAME = 1 / SOURCE_FPS;
const EASE_PER_FRAME = 0.18;
const SNAP_EPSILON = ONE_FRAME / 2;

const CARD_FADE_START = 0.1;
const CARD_FADE_END = 0.55;
const CARD_FADE_LIFT = 24;
const CARD_FADE_QUERY =
  '(min-width: 768px) and (prefers-reduced-motion: no-preference)';

// Mirrors CARD_FADE_QUERY's motion check but for the opposite width — mobile
// gets a normal autoplay+loop background instead of the desktop scrub, and
// both stay off together under prefers-reduced-motion.
const MOBILE_AUTOPLAY_QUERY =
  '(max-width: 767px) and (prefers-reduced-motion: no-preference)';

export default function HomeHeroVideo({ mp4Src, webmMobileSrc, mp4MobileSrc, poster }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const hero = video.closest('.mw-hero');
    if (!hero) return;

    const container = hero.closest('[data-hero-pin]') || hero.parentElement;
    if (!container) return;

    video.muted = true;
    video.playsInline = true;

    let navH = document.getElementById('nav')?.offsetHeight ?? 0;
    const card = hero.querySelector('.mw-hero__card');
    const fadeQuery = window.matchMedia(CARD_FADE_QUERY);
    const mobileAutoplayQuery = window.matchMedia(MOBILE_AUTOPLAY_QUERY);

    // Desktop scrubs the video by hand via seekTo() below, so it stays
    // paused until scroll drives it. Mobile has no scrub — it just plays
    // and loops like an ordinary background video. Anyone with
    // prefers-reduced-motion set matches neither query, so the video stays
    // paused on its poster frame regardless of width.
    const applyPlaybackMode = () => {
      if (mobileAutoplayQuery.matches) {
        video.loop = true;
        const playPromise = video.play();
        if (playPromise && typeof playPromise.catch === 'function') {
          playPromise.catch(() => {});
        }
      } else {
        video.loop = false;
        video.pause();
      }
    };
    applyPlaybackMode();
    mobileAutoplayQuery.addEventListener('change', applyPlaybackMode);

    const clearCardFade = () => {
      if (!card) return;
      card.style.opacity = '';
      card.style.transform = '';
      card.style.visibility = '';
      card.style.pointerEvents = '';
      card.style.willChange = '';
    };

    const updateDimensions = () => {
      navH = document.getElementById('nav')?.offsetHeight ?? 0;
      if (fadeQuery.matches) {
        const heroH = hero.offsetHeight || 520;
        container.style.height = `${heroH + SCRUB_PX}px`;
        hero.style.position = 'sticky';
        hero.style.top = `${navH}px`;
        hero.style.zIndex = '10';
      } else {
        container.style.height = '';
        hero.style.position = '';
        hero.style.top = '';
        hero.style.zIndex = '';
        clearCardFade();
      }
    };

    const applyCardFade = (progress) => {
      if (!card) return;
      if (!fadeQuery.matches) {
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

    let targetTime = 0;
    let easedTime = 0;
    let seekPending = false;
    let rafId = null;
    let lastFrameAt = 0;
    let onScreen = true;

    const updateTarget = () => {
      if (!fadeQuery.matches) return;
      const rect = container.getBoundingClientRect();
      const scrolledPast = navH - rect.top;
      const progress = Math.min(Math.max(scrolledPast / SCRUB_PX, 0), 1);
      const duration = video.duration;
      if (duration && !isNaN(duration)) {
        targetTime = Math.min(progress * duration, duration - ONE_FRAME);
      }
      applyCardFade(progress);
    };

    const seekTo = (time) => {
      const duration = video.duration;
      if (!duration || isNaN(duration)) return;
      const frame = Math.round(time * SOURCE_FPS);
      const snapped = Math.min((frame + 0.5) / SOURCE_FPS, duration - 0.001);
      if (Math.abs(snapped - video.currentTime) < SNAP_EPSILON) return;

      seekPending = true;
      try {
        if (typeof video.fastSeek === 'function') {
          video.fastSeek(snapped);
        } else {
          video.currentTime = snapped;
        }
      } catch (_) {
        seekPending = false;
      }
    };

    const tick = (now) => {
      rafId = null;
      if (!fadeQuery.matches) return;

      const dt = lastFrameAt ? Math.min((now - lastFrameAt) / 16.667, 4) : 1;
      lastFrameAt = now;

      const gap = targetTime - easedTime;
      if (Math.abs(gap) < SNAP_EPSILON) {
        easedTime = targetTime;
      } else {
        easedTime += gap * (1 - Math.pow(1 - EASE_PER_FRAME, dt));
      }

      if (!seekPending) seekTo(easedTime);

      if (onScreen && (Math.abs(targetTime - easedTime) >= SNAP_EPSILON || seekPending)) {
        rafId = requestAnimationFrame(tick);
      } else {
        lastFrameAt = 0;
      }
    };

    const wake = () => {
      if (rafId === null && onScreen && fadeQuery.matches) {
        rafId = requestAnimationFrame(tick);
      }
    };

    const onSeeked = () => {
      seekPending = false;
      wake();
    };
    video.addEventListener('seeked', onSeeked);

    const onScroll = () => {
      updateTarget();
      wake();
    };

    const onResize = () => {
      updateDimensions();
      updateTarget();
      wake();
    };

    const onFadeQueryChange = () => {
      updateDimensions();
      updateTarget();
    };
    fadeQuery.addEventListener('change', onFadeQueryChange);

    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        if (onScreen) {
          updateTarget();
          wake();
        }
      },
      { rootMargin: '100px' }
    );
    observer.observe(container);

    const onMetadata = () => {
      updateDimensions();
      updateTarget();
      easedTime = targetTime;
      seekTo(easedTime);
    };
    if (video.readyState >= 1) onMetadata();
    else video.addEventListener('loadedmetadata', onMetadata, { once: true });

    updateDimensions();
    updateTarget();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      video.removeEventListener('seeked', onSeeked);
      video.removeEventListener('loadedmetadata', onMetadata);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      fadeQuery.removeEventListener('change', onFadeQueryChange);
      mobileAutoplayQuery.removeEventListener('change', applyPlaybackMode);
      observer.disconnect();
      clearCardFade();
      if (rafId !== null) cancelAnimationFrame(rafId);
      container.style.height = '';
      hero.style.position = '';
      hero.style.top = '';
      hero.style.zIndex = '';
    };
  }, []);

  return (
    <div className="mw-hero__video-wrapper">
      <img
        src={poster || "/assets/img/grid-1-sm.webp"}
        alt=""
        className="mw-hero__bg-img-mobile"
      />
      <video
        ref={videoRef}
        muted
        playsInline
        className="mw-hero__bg-video mw-hero__bg-video--desktop"
        poster={poster}
        preload="auto"
      >
        <source src={mp4Src} type="video/mp4" />
      </video>
    </div>
  );
}
