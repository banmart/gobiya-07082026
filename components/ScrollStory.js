'use client';

// Pinned scroll-story: the sticky visual column holds every client
// screencast stacked and cross-fades between them as the reader scrolls
// past each text step, with a scroll-scrubbed zoom (Pan and Zoom) on
// whichever video is active. Falls back to a plain static panel with no
// JS and for prefers-reduced-motion — the first video stays visible and
// the text still reads top to bottom, nothing is hidden.

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CASE_STUDIES } from '../lib/work';

const ARROW = (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <path d="M2 8h11M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

function findStudy(slug) {
  return CASE_STUDIES.find((c) => c.slug === slug);
}

const STEPS = [
  {
    ...findStudy('safetycentric'),
    href: '/work/safetycentric',
    sources: [
      { src: '/assets/videos/safetycentric----homepage.webm', type: 'video/webm' },
      { src: '/assets/videos/safetycentric----homepage.mp4', type: 'video/mp4' },
    ],
  },
  {
    ...findStudy('quickpass-aid'),
    href: '/work/quickpass-aid',
    sources: [
      { src: '/assets/videos/quickpass-aid.webm', type: 'video/webm' },
      { src: '/assets/videos/quickpass-aid.mp4', type: 'video/mp4' },
    ],
  },
  {
    ...findStudy('remodel-me-pros'),
    href: '/work/remodel-me-pros',
    sources: [{ src: '/assets/videos/remodel-me-pros.mp4', type: 'video/mp4' }],
  },
  {
    ...findStudy('trusted-home-contractors'),
    href: '/work',
    sources: [
      { src: '/assets/videos/trusted-home.webm', type: 'video/webm' },
      { src: '/assets/videos/trusted-home.mp4', type: 'video/mp4' },
    ],
  },
  {
    ...findStudy('smile-center-dentistry'),
    href: '/work/smile-center-dentistry',
    sources: [{ src: '/assets/videos/smilecenter-screencast.webm', type: 'video/webm' }],
  },
];

export default function ScrollStory() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const visualRef = useRef(null);
  const stepRefs = useRef([]);
  const videoRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      // step -> active video, runs at every width so the mobile static
      // panel still advances even though it isn't pinned
      stepRefs.current.forEach((el, i) => {
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: 'top 60%',
          end: 'bottom 40%',
          onEnter: () => setActiveIndex(i),
          onEnterBack: () => setActiveIndex(i),
        });

        // scroll-scrubbed zoom on that step's own video, the whole time
        // it's in view — the "pan and zoom" beat of the story
        const video = videoRefs.current[i];
        if (video) {
          gsap.fromTo(
            video,
            { scale: 1.02 },
            {
              scale: 1.08,
              ease: 'none',
              scrollTrigger: {
                trigger: el,
                start: 'top 80%',
                end: 'bottom 20%',
                scrub: 0.6,
              },
            }
          );
        }
      });

      // Pin the visual column vertically centered in the viewport space below
      // the fixed top navigation bar.
      mm.add('(min-width: 900px)', () => {
        const getTopOffset = () => {
          const navH = document.querySelector('.nav')?.offsetHeight || 72;
          const visH = visualRef.current?.offsetHeight || 320;
          const targetTop = (window.innerHeight + navH - visH) / 2;
          return Math.max(navH + 20, targetTop);
        };

        ScrollTrigger.create({
          trigger: gridRef.current,
          start: () => `top top+=${getTopOffset()}`,
          end: () => {
            const visH = visualRef.current?.offsetHeight || 320;
            const topOffset = getTopOffset();
            return `bottom top+=${topOffset + visH}`;
          },
          pin: visualRef.current,
          pinSpacing: false,
          invalidateOnRefresh: true,
        });
      });
    }, sectionRef);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === activeIndex) video.play?.().catch(() => {});
      else video.pause?.();
    });
  }, [activeIndex]);

  return (
    <section className="scroll-story section" id="work-story" ref={sectionRef}>
      <div className="container">
        <p className="eyebrow scroll-story__eyebrow" data-reveal>
          <span className="eyebrow__dot"></span>Selected work, in motion
        </p>
        <h2 className="statement statement--small scroll-story__heading" data-split style={{ textAlign: 'left' }}>
          Five real builds. Five real results.
        </h2>
        <div className="scroll-story__grid" ref={gridRef}>
          <div className="scroll-story__text">
            {STEPS.map((s, i) => (
              <div
                key={s.slug}
                ref={(el) => (stepRefs.current[i] = el)}
                className={`scroll-story__step${i === activeIndex ? ' is-active' : ''}`}
              >
                <div className="scroll-story__step-inner">
                  <span className="scroll-story__client">{s.client}</span>
                  <strong className="scroll-story__stat">{s.result}</strong>
                  <p className="scroll-story__desc">{s.desc}</p>
                  <a href={s.href} className="link-arrow">
                    {s.study ? 'Read the case study' : 'See the work'}
                    {ARROW}
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="scroll-story__visual" ref={visualRef}>
            <div className="scroll-story__visual-frame">
              {STEPS.map((s, i) => (
                <video
                  key={s.slug}
                  ref={(el) => (videoRefs.current[i] = el)}
                  className={`scroll-story__video${i === activeIndex ? ' is-active' : ''}`}
                  autoPlay={i === 0}
                  loop
                  muted
                  playsInline
                  preload={i === 0 ? 'auto' : 'none'}
                  aria-label={`${s.client} product screencast`}
                >
                  {s.sources.map((src) => (
                    <source key={src.src} src={src.src} type={src.type} />
                  ))}
                </video>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
