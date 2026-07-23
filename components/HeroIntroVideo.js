'use client';

import { useEffect, useRef, useState } from 'react';

// 4:5 intro video card for the homepage hero right column. Autoplays muted
// (with burned-in captions) once in view; tapping the sound button restarts
// from the top with the voiceover audible — browsers block autoplay with
// sound, so unmute must come from a user gesture.
export default function HeroIntroVideo() {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const toggleSound = () => {
    const el = videoRef.current;
    if (!el) return;
    if (muted) {
      el.currentTime = 0;
      el.muted = false;
      el.play().catch(() => {});
      setMuted(false);
    } else {
      el.muted = true;
      setMuted(true);
    }
  };

  return (
    <div className="hero__video" data-reveal>
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="metadata"
        poster="/assets/videos/hero-intro-poster.jpg"
        aria-label="44-second intro: Gobiya makes your business the answer on Google, ChatGPT, and Perplexity — real client numbers included"
      >
        <source src="/assets/videos/hero-intro.webm" type="video/webm" />
        <source src="/assets/videos/hero-intro.mp4" type="video/mp4" />
      </video>
      <button type="button" className="hero__video-sound" onClick={toggleSound}>
        {muted ? (
          <>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M11 5 6 9H2v6h4l5 4V5Z" />
              <line x1="16" y1="9" x2="22" y2="15" />
              <line x1="22" y1="9" x2="16" y2="15" />
            </svg>
            Play with sound
          </>
        ) : (
          <>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M11 5 6 9H2v6h4l5 4V5Z" />
              <path d="M15.5 8.5a5 5 0 0 1 0 7" />
              <path d="M18.5 5.5a9 9 0 0 1 0 13" />
            </svg>
            Mute
          </>
        )}
      </button>
    </div>
  );
}
