'use client';

import { useEffect, useRef } from 'react';

/**
 * HomeHeroVideo — Pinned scroll-to-play sequence
 *
 * Smoothness improvements:
 * 1. Video is re-encoded with -g 1 (keyframe every frame), so seeking is instant.
 * 2. Direct seek on scroll — no lerp jitter from rAF microstepping.
 * 3. Seeks are skipped while video.seeking === true (browser decoding in progress).
 * 4. Uses requestVideoFrameCallback (rVFC) where available for frame-accurate sync.
 * 5. Throttled to only seek when target time has meaningfully changed (>1 frame).
 */

const SCRUB_PX = 700;
const ONE_FRAME = 1 / 24; // ~41ms at 24fps — ignore sub-frame deltas

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

    // --- Compute target time from scroll position ---
    const updateTarget = () => {
      const rect = container.getBoundingClientRect();
      const navH = getNavH();
      const scrolledPast = navH - rect.top;
      const progress = Math.min(Math.max(scrolledPast / SCRUB_PX, 0), 1);
      if (video.duration && !isNaN(video.duration)) {
        targetTimeRef.current = progress * video.duration;
      }
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
