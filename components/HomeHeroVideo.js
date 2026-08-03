'use client';

import { useEffect, useRef } from 'react';

/**
 * HomeHeroVideo — Pinned scroll-to-play sequence
 *
 * How the smoothness is bought, in order of how much each part contributes:
 *
 * 1. The file. 24fps, every frame a keyframe, H.264 only — see the comment on
 *    HERO_VIDEO_MP4 in lib/heroImages.js. Twice the pictures, and each seek
 *    decodes exactly one of them.
 * 2. Scroll does not seek. Scroll only records where the video *should* be; a
 *    single rAF loop eases the playhead toward that and issues the seeks. So
 *    the seek rate is capped at one per animation frame no matter how many
 *    scroll events fire, and a big jump (wheel notch, momentum fling, anchor
 *    jump) plays through the frames between instead of cutting to the end.
 * 3. fastSeek() where available. On an all-keyframe file it is exact, and it
 *    skips the precise-seek path that makes Safari crawl.
 * 4. One seek in flight at a time, tracked off `seeking`/`seeked`. Queueing
 *    seeks behind a decode is what produces the lurch-then-catch-up feel.
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
// the exact opposite of what the threshold is for.
const SOURCE_FPS = 24;
const ONE_FRAME = 1 / SOURCE_FPS;

// How fast the playhead closes the gap to where scroll says it should be, as a
// fraction of the remaining distance per 60fps frame. Framed as a half-life so
// it stays frame-rate independent: at 0.18 the gap halves in ~3.5 frames, which
// is fast enough to feel locked to the finger and slow enough that a 500px
// fling renders as motion rather than a cut.
const EASE_PER_FRAME = 0.18;

// Below this the playhead is close enough that easing further is invisible, so
// it snaps and the loop goes idle. Without it the exponential never lands and
// the rAF loop runs forever issuing sub-frame seeks.
const SNAP_EPSILON = ONE_FRAME / 2;

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

export default function HomeHeroVideo({ mp4Src, mp4SmSrc, poster }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const hero = video.closest('.mw-hero');
    if (!hero) return;

    video.muted = true;
    video.playsInline = true;
    video.pause();

    let navH = document.getElementById('nav')?.offsetHeight ?? 0;
    const heroH = hero.offsetHeight;

    // Wrap hero in a containing block to bound the sticky pin
    const container = document.createElement('div');
    container.setAttribute('data-hero-pin', '');
    container.style.cssText = `position:relative;height:${heroH + SCRUB_PX}px;`;
    hero.parentNode.insertBefore(container, hero);
    container.appendChild(hero);

    hero.style.position = 'sticky';
    hero.style.top = `${navH}px`;
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

    // --- State shared between the scroll listener and the rAF loop ---
    let targetTime = 0; // where scroll says the playhead belongs
    let easedTime = 0; // where the loop has actually moved it
    let seekPending = false; // a seek is in flight, do not queue another
    let rafId = null;
    let lastFrameAt = 0;
    let onScreen = true;

    // --- Compute target time from scroll position ---
    const updateTarget = () => {
      const rect = container.getBoundingClientRect();
      const scrolledPast = navH - rect.top;
      const progress = Math.min(Math.max(scrolledPast / SCRUB_PX, 0), 1);
      const duration = video.duration;
      if (duration && !isNaN(duration)) {
        // Stop a frame short of the end: seeking to exactly duration parks on
        // the ended boundary, which some browsers answer with a blank frame.
        targetTime = Math.min(progress * duration, duration - ONE_FRAME);
      }
      // Deliberately outside the duration guard: the card should still fade if
      // the video never loads a duration, so a stalled video does not leave the
      // card frozen over the poster.
      applyCardFade(progress);
    };

    // --- Issue one seek, quantised to a frame boundary ---
    const seekTo = (time) => {
      const duration = video.duration;
      if (!duration || isNaN(duration)) return;
      // Land mid-frame rather than on the boundary, so float error either side
      // cannot pick the neighbouring frame and flicker between the two.
      const frame = Math.round(time * SOURCE_FPS);
      const snapped = Math.min((frame + 0.5) / SOURCE_FPS, duration - 0.001);
      if (Math.abs(snapped - video.currentTime) < SNAP_EPSILON) return;

      seekPending = true;
      try {
        if (typeof video.fastSeek === 'function') {
          // Exact on an all-keyframe file, and it skips the precise-seek path.
          video.fastSeek(snapped);
        } else {
          video.currentTime = snapped;
        }
      } catch (_) {
        seekPending = false;
      }
    };

    // --- The loop: ease toward target, seek at most once per frame ---
    const tick = (now) => {
      rafId = null;

      // Normalise the ease to 60fps so a 120Hz display does not scrub twice as
      // fast and a janky 30fps one does not lag behind.
      const dt = lastFrameAt ? Math.min((now - lastFrameAt) / 16.667, 4) : 1;
      lastFrameAt = now;

      const gap = targetTime - easedTime;
      if (Math.abs(gap) < SNAP_EPSILON) {
        easedTime = targetTime;
      } else {
        easedTime += gap * (1 - Math.pow(1 - EASE_PER_FRAME, dt));
      }

      if (!seekPending) seekTo(easedTime);

      // Keep running while there is distance left to cover or a seek to settle.
      if (onScreen && (Math.abs(targetTime - easedTime) >= SNAP_EPSILON || seekPending)) {
        rafId = requestAnimationFrame(tick);
      } else {
        lastFrameAt = 0;
      }
    };

    const wake = () => {
      if (rafId === null && onScreen) rafId = requestAnimationFrame(tick);
    };

    const onSeeked = () => {
      seekPending = false;
      wake(); // pick up whatever scroll happened while the decode was running
    };
    video.addEventListener('seeked', onSeeked);

    // --- Scroll handler: records only, never seeks ---
    const onScroll = () => {
      updateTarget();
      wake();
    };

    const onResize = () => {
      navH = document.getElementById('nav')?.offsetHeight ?? 0;
      container.style.height = `${hero.offsetHeight + SCRUB_PX}px`;
      hero.style.top = `${navH}px`;
      updateTarget();
      wake();
    };

    // Crossing 768px (or toggling reduced motion) re-runs the fade math, which
    // clears the inline styles on the way down to mobile and reinstates them on
    // the way back up.
    const onFadeQueryChange = () => updateTarget();
    fadeQuery.addEventListener('change', onFadeQueryChange);

    // Once the pin is scrolled past there is nothing to scrub, so stop paying
    // for the loop and the seeks on the rest of the page's scrolling.
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

    // duration is not there on the first pass if metadata has not landed yet,
    // so redo the maths once it is rather than starting the pin stuck on frame 0.
    const onMetadata = () => {
      updateTarget();
      easedTime = targetTime;
      seekTo(easedTime);
    };
    if (video.readyState >= 1) onMetadata();
    else video.addEventListener('loadedmetadata', onMetadata, { once: true });

    updateTarget();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      video.removeEventListener('seeked', onSeeked);
      video.removeEventListener('loadedmetadata', onMetadata);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      fadeQuery.removeEventListener('change', onFadeQueryChange);
      observer.disconnect();
      clearCardFade();
      if (rafId !== null) cancelAnimationFrame(rafId);
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
        {/* `media` is resolved once, at resource selection, so phones never
            download the desktop file. It does not re-evaluate on resize, which
            is fine — both sources are the same 8 seconds of the same footage. */}
        {mp4SmSrc ? (
          <source src={mp4SmSrc} type="video/mp4" media="(max-width: 767px)" />
        ) : null}
        <source src={mp4Src} type="video/mp4" />
      </video>
    </div>
  );
}
