'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TESTIMONIALS } from '../lib/testimonials';

const STORY_IMAGES = [
  '/assets/img/smilecenter.webp',
  '/assets/img/americanlivescan.webp',
  '/assets/img/access-control-lady.webp',
  '/assets/img/remodelmepros.webp',
  '/assets/img/totalcapital.webp',
  '/assets/img/hallway-code-review.webp',
  '/assets/img/open-office-desks.webp',
  '/assets/img/office-lounge-meeting.webp',
];

export default function TestimonialStack() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean);
      if (cards.length === 0) return;

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return;

      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px)', () => {
        const totalCards = cards.length;

        cards.forEach((card, index) => {
          if (index !== 0) {
            gsap.set(card, {
              yPercent: 120,
              scale: 0.9,
              opacity: 0,
            });
          } else {
            gsap.set(card, {
              yPercent: 0,
              scale: 1,
              opacity: 1,
            });
          }
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top+=80px',
            end: () => `+=${totalCards * 380}px`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        cards.forEach((card, index) => {
          if (index === 0) return;

          tl.to(card, {
            yPercent: 0,
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
          });

          for (let i = 0; i < index; i++) {
            const depth = index - i;
            tl.to(
              cards[i],
              {
                scale: 1 - depth * 0.04,
                y: -depth * 18,
                opacity: Math.max(0.4, 1 - depth * 0.25),
                duration: 1,
                ease: 'power2.out',
              },
              '<'
            );
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const items = TESTIMONIALS.slice(0, 6);

  return (
    <section className="mw-stories-pinned" ref={containerRef}>
      <div className="container">
        <h2 className="mw-stories__heading">Real Stories from Real Clients</h2>

        <div className="mw-stories-stack">
          {items.map((item, idx) => (
            <div
              key={idx}
              ref={(el) => (cardsRef.current[idx] = el)}
              className="mw-stacked-card"
              style={{
                backgroundImage: `linear-gradient(135deg, rgba(11, 30, 54, 0.94) 0%, rgba(11, 30, 54, 0.86) 100%), url('${STORY_IMAGES[idx % STORY_IMAGES.length]}')`,
              }}
            >
              <div className="mw-stacked-card__badge">
                {idx + 1} / {items.length}
              </div>
              <div className="mw-stacked-card__content">
                <div className="mw-stacked-card__meta">
                  {item.role ? (
                    <>
                      Industry: <strong>{item.role}</strong> &bull; Region: <strong>Southern California</strong>
                    </>
                  ) : (
                    <>
                      Found on <strong>{item.source || 'Google'}</strong>
                    </>
                  )}
                </div>
                {item.headline && (
                  <div className="mw-stacked-card__headline">{item.headline}</div>
                )}
                <blockquote className="mw-stacked-card__quote">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <div className="mw-stacked-card__author">
                  <div className="mw-stacked-card__name">
                    — {item.name ? `${item.name}, ` : ''}{item.company}
                  </div>
                </div>
                {item.href && (
                  <a href={item.href} className="mw-stacked-card__btn">
                    Read Full Case Study <span>→</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
