"use client";

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const AUTOPLAY_MS = 7000;

const CHEVRON = (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <path d="M2 8h11M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export default function TestimonialRotator({ items }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = (e) => setReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion) return undefined;
    timerRef.current = setTimeout(() => {
      setIndex((i) => (i + 1) % items.length);
    }, AUTOPLAY_MS);
    return () => clearTimeout(timerRef.current);
  }, [index, paused, reducedMotion, items.length]);

  const goTo = (i) => setIndex(i);
  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);
  const next = () => setIndex((i) => (i + 1) % items.length);
  const current = items[index];

  return (
    <div
      className="testimonial-rotator"
      role="region"
      aria-roledescription="carousel"
      aria-label="Client testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false);
      }}
    >
      <div className="testimonial-rotator__stage" aria-live={reducedMotion ? 'polite' : 'off'}>
        <blockquote className="testimonial-rotator__quote" key={index}>
          <p>{current.quote}</p>
        </blockquote>
      </div>

      <div className="testimonial-rotator__byline" key={`byline-${index}`}>
        <div className="testimonial-rotator__who">
          {current.photo && (
            <Image
              src={current.photo}
              alt={current.name || current.company}
              width={56}
              height={56}
              className="testimonial-rotator__photo"
            />
          )}
          <p className="testimonial-rotator__attrib">
            {current.name && (
              <>
                <span className="testimonial-rotator__name">{current.name}</span>
                <span className="testimonial-rotator__sep" aria-hidden="true">·</span>
              </>
            )}
            <span className="testimonial-rotator__company">{current.company}</span>
            <span className="testimonial-rotator__sep" aria-hidden="true">·</span>
            <span className="testimonial-rotator__role">{current.role}</span>
          </p>
        </div>
        {current.href && (
          <a href={current.href} className="link-arrow link-arrow--light testimonial-rotator__link">
            View the case study{CHEVRON}
          </a>
        )}
      </div>

      <div className="testimonial-rotator__controls">
        <button type="button" className="testimonial-rotator__nav" onClick={prev} aria-label="Previous testimonial">
          <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
            <path d="M14 8H3M7 3 2 8l5 5" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>

        <ol className="testimonial-rotator__docket">
          {items.map((t, i) => (
            <li key={t.company + i}>
              <button
                type="button"
                className="testimonial-rotator__tick"
                onClick={() => goTo(i)}
                aria-current={i === index}
                data-state={i < index ? 'past' : i === index ? 'current' : 'upcoming'}
                aria-label={`Show testimonial ${i + 1} of ${items.length}: ${t.company}`}
              >
                {i === index && (
                  <span
                    className="testimonial-rotator__tick-fill"
                    style={{
                      animationDuration: `${AUTOPLAY_MS}ms`,
                      animationPlayState: paused || reducedMotion ? 'paused' : 'running',
                    }}
                  />
                )}
              </button>
            </li>
          ))}
        </ol>

        <button type="button" className="testimonial-rotator__nav" onClick={next} aria-label="Next testimonial">
          <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
            <path d="M2 8h11M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
