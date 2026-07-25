'use client';

// Reading progress bar plus scroll-spy on the article's table of contents.
//
// The articles run 10+ minutes and previously gave the reader no sense of
// position — the TOC was a static list of anchors that never indicated where
// you were. This adds a thin progress rail under the nav and marks the section
// currently in view.
//
// Everything here is additive: the TOC still works as plain anchors with JS
// off, and this component renders nothing but the rail itself. IntersectionObserver
// rather than a scroll handler so it costs nothing per frame.

import { useEffect, useState } from 'react';

export default function ReadingProgress({ bodySelector = '.article__body' }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const body = document.querySelector(bodySelector);
    if (!body) return undefined;

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const rect = body.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        // clamp: before the article starts this is negative, after it ends >1
        const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
        setProgress(p);
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [bodySelector]);

  // scroll-spy: mark the TOC link for whichever heading is currently on screen
  useEffect(() => {
    const headings = Array.from(document.querySelectorAll('.article__body h2[id]'));
    if (!headings.length) return undefined;

    const links = new Map();
    document.querySelectorAll('.article__toc a[href^="#"]').forEach((a) => {
      links.set(decodeURIComponent(a.getAttribute('href').slice(1)), a);
    });
    if (!links.size) return undefined;

    const seen = new Set();
    const mark = () => {
      // the last heading whose top has passed the marker line wins, so the
      // highlight tracks reading position rather than whichever box happens
      // to intersect first
      let current = headings[0];
      for (const h of headings) {
        if (h.getBoundingClientRect().top <= window.innerHeight * 0.3) current = h;
      }
      links.forEach((a) => a.classList.remove('is-current'));
      const active = links.get(current.id);
      if (active) active.classList.add('is-current');
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? seen.add(e.target) : seen.delete(e.target)));
        mark();
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );
    headings.forEach((h) => io.observe(h));
    window.addEventListener('scroll', mark, { passive: true });
    mark();

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', mark);
    };
  }, []);

  return (
    <div className="reading-progress" aria-hidden="true">
      <span className="reading-progress__fill" style={{ transform: `scaleX(${progress})` }} />
    </div>
  );
}
