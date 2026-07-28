'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollAnimate() {
  const pathname = usePathname();

  useEffect(() => {
    // The hidden state (.will-reveal) is applied here rather than in base CSS, so
    // that content is never invisible unless this script is running to reveal it
    // again. See the matching note in app/globals.css.
    const SELECTOR =
      '.bento-card, .mw-card, .card, .pillar-card, .section-header, .statement, .mw-subhero__title, .mw-subhero__dek, .hero__title, .hero__dek, .reveal, .mw-navy-banner';

    const setupObserver = () => {
      const observerCallback = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      };

      const observer = new IntersectionObserver(observerCallback, {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.05,
      });

      document.querySelectorAll(SELECTOR).forEach((el) => {
        // Anything already on screen is left alone: hiding it now would flash
        // content the visitor can already see. Only below-the-fold elements get
        // the hidden state, so the animation is never visible as a disappearance.
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          el.classList.add('is-visible');
          return;
        }
        el.classList.add('will-reveal');
        observer.observe(el);
      });

      return observer;
    };

    const observer = setupObserver();

    // Re-run setup on dynamic content load. Keep this observer's handle too, so
    // it is disconnected on unmount instead of leaking.
    let lateObserver;
    const timer = setTimeout(() => {
      lateObserver = setupObserver();
    }, 200);

    return () => {
      clearTimeout(timer);
      observer?.disconnect();
      lateObserver?.disconnect();
    };
  }, [pathname]);

  return null;
}
