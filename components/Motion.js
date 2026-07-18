'use client';

// Bespoke motion system — GSAP core + ScrollTrigger + SplitText only.
// Content is never hidden pre-JS: everything animates FROM a hidden state
// via gsap.from(), so no-JS and reduced-motion users see the final layout.

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

export default function Motion() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(ScrollTrigger, SplitText);

    const ctx = gsap.context(() => {
      // Elements already inside the initial viewport at mount are never
      // animated — there's nothing to "reveal" for content the user can
      // already see, and fading it in anyway forces the browser to record
      // its Largest Contentful Paint at the moment the animation settles
      // instead of the actual (near-instant) SSR paint, which can push
      // above-the-fold text or headlines well past the LCP budget.
      const vh = window.innerHeight;
      const isAboveFold = (el) => el.getBoundingClientRect().top < vh * 0.88;

      // ── masked line reveals (wait for fonts so lines split correctly) ──
      const ready = document.fonts ? document.fonts.ready : Promise.resolve();
      ready.then(() => {
        document.querySelectorAll('[data-split]').forEach((el) => {
          const split = SplitText.create(el, { type: 'lines', mask: 'lines' });
          if (isAboveFold(el)) return;
          gsap.from(split.lines, {
            yPercent: 110,
            duration: 0.9,
            ease: 'expo.out',
            stagger: 0.08,
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          });
        });
        ScrollTrigger.refresh();
      });

      // ── generic block reveals ──
      const belowFoldReveals = Array.from(document.querySelectorAll('[data-reveal]')).filter(
        (el) => !isAboveFold(el)
      );
      if (belowFoldReveals.length) {
        ScrollTrigger.batch(belowFoldReveals, {
          start: 'top 88%',
          once: true,
          onEnter: (els) =>
            gsap.from(els, {
              opacity: 0,
              y: 28,
              duration: 0.8,
              ease: 'expo.out',
              stagger: 0.07,
            }),
        });
      }

      // ── count-up numbers ──
      // Same above-fold guard as reveals: the server-rendered text is
      // already the correct final value, so an already-visible counter has
      // nothing to gain from animating and only risks delaying LCP if it
      // happens to be the largest text on the page.
      document.querySelectorAll('[data-count]').forEach((el) => {
        if (isAboveFold(el)) return;
        const target = parseFloat(el.dataset.count);
        const decimals = parseInt(el.dataset.decimals || '0', 10);
        const prefix = el.dataset.prefix || '';
        const plain = el.hasAttribute('data-plain');
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          onUpdate() {
            el.textContent =
              prefix +
              (plain
                ? Math.round(obj.v).toString()
                : obj.v.toLocaleString('en-US', {
                    minimumFractionDigits: decimals,
                    maximumFractionDigits: decimals,
                  }));
          },
        });
      });

      // ── self-drawing hairline rules ──
      document.querySelectorAll('[data-rule]').forEach((el) => {
        gsap.from(el, {
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 1.1,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        });
      });

      // ── the single pinned scene (AI visibility band) ──
      const scene = document.querySelector('[data-pin-scene]');
      if (scene) {
        const rows = scene.querySelectorAll('[data-pin-row]');
        gsap
          .timeline({
            scrollTrigger: {
              trigger: scene,
              start: 'top top+=72',
              end: '+=120%',
              pin: true,
              scrub: 0.5,
            },
          })
          .from(rows, { opacity: 0.15, y: 36, stagger: 0.4, ease: 'none' });
      }

      // ── SVG glyph self-draw ──
      document.querySelectorAll('[data-draw] path').forEach((path) => {
        const len = path.getTotalLength();
        gsap.fromTo(
          path,
          { strokeDasharray: len, strokeDashoffset: len },
          {
            strokeDashoffset: 0,
            duration: 1.2,
            ease: 'expo.out',
            scrollTrigger: { trigger: path.closest('[data-draw]'), start: 'top 85%', once: true },
          }
        );
      });

      // ── magnetic primary CTAs (fine pointers only) ──
      if (window.matchMedia('(pointer: fine)').matches) {
        document.querySelectorAll('.btn--solid').forEach((btn) => {
          const move = (e) => {
            const r = btn.getBoundingClientRect();
            gsap.to(btn, {
              x: (e.clientX - r.left - r.width / 2) * 0.15,
              y: (e.clientY - r.top - r.height / 2) * 0.25,
              duration: 0.4,
              ease: 'power2.out',
            });
          };
          const reset = () => gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'expo.out' });
          btn.addEventListener('mousemove', move);
          btn.addEventListener('mouseleave', reset);
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return null;
}
