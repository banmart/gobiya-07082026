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
          if (isAboveFold(el)) return;
          const split = SplitText.create(el, { type: 'lines', mask: 'lines' });
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

      // ── hero scroll zoom & subtle parallax ──
      document.querySelectorAll('.page-hero, [data-scroll-zoom]').forEach((hero) => {
        const target = hero.querySelector('img, video, .hero-zoom-target, .seo-hero__grid > div:last-child');
        if (!target) return;
        gsap.to(target, {
          scale: 1.05,
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5,
          },
        });
      });

      // ── story: grouped card stagger ──
      // One trigger for the whole grid instead of per-card [data-reveal], so a
      // capability grid arrives as a single sweep rather than eight unrelated
      // fades competing for attention.
      document.querySelectorAll('[data-stagger]').forEach((grid) => {
        const items = grid.children;
        if (!items.length) return;
        gsap.from(items, {
          opacity: 0,
          y: 34,
          duration: 0.75,
          ease: 'expo.out',
          stagger: { each: 0.06, from: 'start' },
          scrollTrigger: { trigger: grid, start: 'top 82%', once: true },
        });
      });

      // ── data panel rows ──
      // Rows wipe in top-to-bottom so a table reads as something being filled
      // in rather than a block that appeared. Header stays put.
      document.querySelectorAll('[data-stagger-rows] tbody tr').length &&
        document.querySelectorAll('[data-stagger-rows]').forEach((table) => {
          const rows = table.querySelectorAll('tbody tr');
          if (!rows.length) return;
          gsap.from(rows, {
            opacity: 0,
            x: -14,
            duration: 0.5,
            ease: 'expo.out',
            stagger: 0.045,
            scrollTrigger: { trigger: table, start: 'top 85%', once: true },
          });
        });

      // ── story: process timeline spine ──
      // Scrubbed, not once-off: the connector fills to match how far through
      // the steps you've actually read.
      document.querySelectorAll('[data-timeline]').forEach((list) => {
        const fill = list.querySelector('[data-timeline-fill]');
        if (!fill) return;
        gsap.fromTo(
          fill,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            transformOrigin: 'top center',
            scrollTrigger: {
              trigger: list,
              start: 'top 70%',
              end: 'bottom 75%',
              scrub: 0.4,
            },
          }
        );
      });

      // ── story: motif figures ──
      // Each service page has its own figure; the parts assemble on entry and
      // the accent element keeps a slow pulse so the page doesn't feel frozen.
      document.querySelectorAll('[data-motif]').forEach((fig) => {
        const rows = fig.querySelectorAll('[data-motif-row]');
        if (rows.length) {
          gsap.from(rows, {
            opacity: 0,
            scaleX: 0.4,
            transformOrigin: 'left center',
            duration: 0.7,
            ease: 'expo.out',
            stagger: 0.05,
            scrollTrigger: { trigger: fig, start: 'top 85%', once: true },
          });
        }
        const scan = fig.querySelector('[data-motif-scan]');
        if (scan) {
          gsap.fromTo(
            scan,
            { attr: { y1: 20, y2: 20 }, opacity: 0 },
            {
              attr: { y1: 180, y2: 180 },
              opacity: 1,
              duration: 2.4,
              ease: 'none',
              repeat: -1,
              yoyo: true,
              scrollTrigger: { trigger: fig, start: 'top 90%' },
            }
          );
        }
        const pulse = fig.querySelector('[data-motif-pulse]');
        if (pulse) {
          gsap.fromTo(
            pulse,
            { scale: 0.85, transformOrigin: 'center center' },
            {
              scale: 1,
              duration: 1.6,
              ease: 'sine.inOut',
              repeat: -1,
              yoyo: true,
              scrollTrigger: { trigger: fig, start: 'top 90%' },
            }
          );
        }
      });

      // ── story: light parallax ──
      // Desktop only. On a phone the viewport is short enough that parallax
      // mostly reads as drift, and it competes with momentum scrolling.
      if (window.matchMedia('(min-width: 60rem)').matches) {
        document.querySelectorAll('[data-parallax]').forEach((el) => {
          const amount = parseFloat(el.dataset.parallax) || 0.1;
          gsap.to(el, {
            yPercent: -amount * 100,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
          });
        });
      }

      // ── clip-path curtain reveal & image sweep ──
      document.querySelectorAll('.img-sweep, [data-sweep], .case-study-media img, .capability-card img').forEach((img) => {
        gsap.fromTo(
          img,
          { clipPath: 'inset(0% 100% 0% 0%)', scale: 1.08 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            scale: 1,
            duration: 1.2,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: img,
              start: 'top 88%',
              once: true,
              onEnter: () => {
                const parent = img.closest('.img-sweep') || img.parentElement;
                if (parent) parent.classList.add('is-sweeping');
              },
            },
          }
        );
      });

      // ── interactive card scroll zoom ──
      const cards = document.querySelectorAll('.capability-card, .seo-proof__item, [data-card-zoom]');
      cards.forEach((card) => {
        if (isAboveFold(card)) return;
        gsap.fromTo(
          card,
          { scale: 0.95, opacity: 0.8 },
          {
            scale: 1,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 92%',
              end: 'top 65%',
              scrub: 0.5,
            },
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
