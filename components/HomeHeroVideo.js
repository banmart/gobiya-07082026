'use client';

import { useEffect, useRef } from 'react';

/**
 * HomeHeroVideo — Pinned scroll-to-play sequence
 *
 * The trick: sticky elements un-pin when their CONTAINING BLOCK exits the
 * viewport. So we wrap the hero in a div whose height = heroHeight + SCRUB_PX.
 * The hero is sticky inside that container. Scroll progress is measured from
 * the container's bounding rect (which moves even when the hero is pinned).
 *
 * Nothing in the existing CSS or JSX is touched.
 */

const SCRUB_PX = 700; // px of scroll dedicated to video scrubbing

export default function HomeHeroVideo({
  webmSrc = '/assets/videos/home-hero-background-video.webm',
  mp4Src = '/assets/videos/home-hero-background-video.mp4',
  poster,
}) {
  const videoRef = useRef(null);
  const animFrameRef = useRef(null);
  const targetTimeRef = useRef(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const hero = video.closest('.mw-hero');
    if (!hero) return;

    video.muted = true;
    video.playsInline = true;
    video.pause();

    // Get nav height
    const getNavH = () => document.getElementById('nav')?.offsetHeight ?? 0;
    const navH = getNavH();
    const heroH = hero.offsetHeight;

    // 1. Create a containing block whose height controls when hero un-sticks
    const container = document.createElement('div');
    container.setAttribute('data-hero-pin', '');
    container.style.cssText = `position:relative;height:${heroH + SCRUB_PX}px;`;

    // 2. Wrap: insert container before hero, move hero inside
    hero.parentNode.insertBefore(container, hero);
    container.appendChild(hero);

    // 3. Make hero sticky inside the container
    hero.style.position = 'sticky';
    hero.style.top = `${navH}px`;
    hero.style.zIndex = '10';

    // 4. Scroll handler — use containerRect.top (moves even when hero is pinned)
    const onScroll = () => {
      const rect = container.getBoundingClientRect();
      const top = getNavH();
      // scrolledPast: 0 when hero first sticks, reaches SCRUB_PX when done
      const scrolledPast = top - rect.top;
      const progress = Math.min(Math.max(scrolledPast / SCRUB_PX, 0), 1);
      if (video.duration && !isNaN(video.duration)) {
        targetTimeRef.current = progress * video.duration;
      }
    };

    const onResize = () => {
      // Recalculate container height on resize
      container.style.height = `${hero.offsetHeight + SCRUB_PX}px`;
      hero.style.top = `${getNavH()}px`;
      onScroll();
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

    // 5. rAF loop: smooth lerp scrubbing
    const render = () => {
      if (video.duration && !isNaN(video.duration)) {
        if (!video.paused) video.pause();
        const delta = targetTimeRef.current - video.currentTime;
        if (Math.abs(delta) > 0.005) {
          try { video.currentTime += delta * 0.25; } catch (_) {}
        }
      }
      animFrameRef.current = requestAnimationFrame(render);
    };
    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      // Unwrap: move hero back before container, then remove container
      container.parentNode?.insertBefore(hero, container);
      container.remove();
      // Restore hero styles
      hero.style.position = '';
      hero.style.top = '';
      hero.style.zIndex = '';
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
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
