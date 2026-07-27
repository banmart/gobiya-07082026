'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollAnimate() {
  const pathname = usePathname();

  useEffect(() => {
    // Function to attach IntersectionObserver to all target elements
    const setupObserver = () => {
      const observerCallback = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      };

      const observerOptions = {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.05,
      };

      const observer = new IntersectionObserver(observerCallback, observerOptions);

      const elements = document.querySelectorAll(
        '.bento-card, .mw-card, .card, .pillar-card, .section-header, .statement, .mw-subhero__title, .mw-subhero__dek, .hero__title, .hero__dek, .reveal, .mw-navy-banner'
      );

      elements.forEach((el) => {
        observer.observe(el);
        // Force initial check for elements already in viewport on page load
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          el.classList.add('is-visible');
        }
      });

      return observer;
    };

    const observer = setupObserver();

    // Re-run setup on dynamic content load
    const timer = setTimeout(setupObserver, 200);

    return () => {
      clearTimeout(timer);
      if (observer && observer.disconnect) {
        observer.disconnect();
      }
    };
  }, [pathname]);

  return null;
}
