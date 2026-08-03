'use client';

import { useEffect, useRef } from 'react';

/**
 * HomeHeroVideo — Pinned scroll-to-play sequence
 *
 * Smoothness improvements:
 * 1. Video is encoded with a tight GOP (keyframe every 4 frames), so a seek
 *    decodes 3 frames worst case rather than a long chain.
 * 2. Direct seek on scroll — no lerp jitter from rAF microstepping.
 * 3. Seeks are skipped while video.seeking === true (browser decoding in progress).
 * 4. Uses requestVideoFrameCallback (rVFC) where available for frame-accurate sync.
 * 5. Throttled to only seek when target time has meaningfully changed (>1 frame).
 *
 * It also fades the hero card out as the pin scrubs, desktop only. That runs off
 * the same `progress` value as the seek rather than its own scroll listener, so
 * the card and the footage can never drift apart.
 *
 * Desktop only is a layout constraint, not a preference: under 768px globals.css
 * restacks this hero so the video is a 16:9 band and the card sits underneath it
 * on a solid background. There it is the page's opening copy block, not an
 * overlay, and fading it would just delete the h1 on scroll.
 */

const SCRUB_PX = 700;

// Frame rate the hero clip is actually encoded at. This has to track the file:
// set it higher than the real rate and the threshold below falls under one
// frame, so scrolling issues seeks that decode a frame and put the same picture
// back on screen. That wasted decoder time is what reads as stutter, which is
// the exact opposite of what the throttle is for. Currently 12fps, 96 frames
// over 8 seconds, which is ~7px of scroll per frame across SCRUB_PX.
const SOURCE_FPS = 12;
const ONE_FRAME = 1 / SOURCE_FPS; // ignore sub-frame deltas

// Where in the pin the card fades, as a fraction of SCRUB_PX. The late start is
// a beat to read the headline before anything moves; finishing at 0.55 leaves
// the back half of the pin as clean footage.
const CARD_FADE_START = 0.1;
const CARD_FADE_END = 0.55;
const CARD_FADE_LIFT = 24; // px of upward drift across the fade

// Matches the `max-width: 767px` hero rewrite in globals.css. Reduced motion
// opts out entirely and leaves the card alone.
const CARD_FADE_QUERY =
  '(min-width: 768px) and (prefers-reduced-motion: no-preference)';

export default function HomeHeroVideo({
  webmSrc = '/assets/videos/home-hero-background-video.webm',
  mp4Src = '/assets/videos/home-hero-background-video.mp4',
  poster,
}) {
  const videoRef = useRef(null);
  const targetTimeRef = useRef(0);
  const isSeeking = useRef(false);
  const rafRef = useRef(null);
  const rvcfRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const hero = video.closest('.mw-hero');
    if (!hero) return;

    video.muted = true;
    video.playsInline = true;
    video.pause();

    const getNavH = () => document.getElementById('nav')?.offsetHeight ?? 0;
    const heroH = hero.offsetHeight;

    // Wrap hero in a containing block to bound the sticky pin
    const container = document.createElement('div');
    container.setAttribute('data-hero-pin', '');
    container.style.cssText = `position:relative;height:${heroH + SCRUB_PX}px;`;
    hero.parentNode.insertBefore(container, hero);
    container.appendChild(hero);

    hero.style.position = 'sticky';
    hero.style.top = `${getNavH()}px`;
    hero.style.zIndex = '10';

    // --- Hero card fade (desktop only) ---
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
      // Once it is invisible, take it out of hit testing and the tab order
      // rather than leaving two invisible CTA buttons over the video.
      card.style.visibility = t === 1 ? 'hidden' : '';
      card.style.pointerEvents = t === 1 ? 'none' : '';
    };

    // --- Compute target time from scroll position ---
    const updateTarget = () => {
      const rect = container.getBoundingClientRect();
      const navH = getNavH();
      const scrolledPast = navH - rect.top;
      const progress = Math.min(Math.max(scrolledPast / SCRUB_PX, 0), 1);
      if (video.duration && !isNaN(video.duration)) {
        targetTimeRef.current = progress * video.duration;
      }
      // Deliberately outside the duration guard: the card should still fade if
      // the video never loads a duration, so a stalled video does not leave the
      // card frozen over the poster.
      applyCardFade(progress);
    };

    // --- Perform seek: skip if already seeking or delta < 1 frame ---
    const doSeek = () => {
      if (isSeeking.current) return;
      if (!video.duration || isNaN(video.duration)) return;
      const delta = Math.abs(targetTimeRef.current - video.currentTime);
      if (delta < ONE_FRAME) return;
      isSeeking.current = true;
      try {
        video.currentTime = targetTimeRef.current;
      } catch (_) {
        isSeeking.current = false;
      }
    };

    // When seek settles, immediately apply any accumulated target change
    const onSeeked = () => {
      isSeeking.current = false;
      doSeek(); // catch any scroll that happened mid-seek
    };
    video.addEventListener('seeked', onSeeked);

    // --- Scroll handler ---
    const onScroll = () => {
      updateTarget();
      doSeek();
    };

    const onResize = () => {
      container.style.height = `${hero.offsetHeight + SCRUB_PX}px`;
      hero.style.top = `${getNavH()}px`;
      updateTarget();
    };

    // Crossing 768px (or toggling reduced motion) re-runs the fade math, which
    // clears the inline styles on the way down to mobile and reinstates them on
    // the way back up.
    const onFadeQueryChange = () => updateTarget();
    fadeQuery.addEventListener('change', onFadeQueryChange);

    updateTarget();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

    // --- Sync loop: requestVideoFrameCallback for frame-accurate updates,
    //     fall back to requestAnimationFrame ---
    const scheduleSync = () => {
      if ('requestVideoFrameCallback' in video) {
        rvcfRef.current = video.requestVideoFrameCallback(() => {
          doSeek();
          scheduleSync();
        });
      } else {
        rafRef.current = requestAnimationFrame(() => {
          doSeek();
          rafRef.current = requestAnimationFrame(scheduleSync);
        });
      }
    };
    scheduleSync();

    return () => {
      video.removeEventListener('seeked', onSeeked);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      fadeQuery.removeEventListener('change', onFadeQueryChange);
      clearCardFade();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if ('cancelVideoFrameCallback' in video && rvcfRef.current) {
        video.cancelVideoFrameCallback(rvcfRef.current);
      }
      container.parentNode?.insertBefore(hero, container);
      container.remove();
      hero.style.position = '';
      hero.style.top = '';
      hero.style.zIndex = '';
    };
  }, []);

  return (
    <div className="mw-hero__video-wrapper">
      <video
        ref={videoRef}
        muted
        playsInline
        className="mw-hero__bg-video"
        poster={poster}
        preload="auto"
      >
        <source src={webmSrc} type="video/webm" />
        <source src={mp4Src} type="video/mp4" />
      </video>
    </div>
  );
}
