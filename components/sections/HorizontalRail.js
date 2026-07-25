'use client';

// Horizontal card rail with scroll-snap, arrow controls and a progress bar.
//
// Used where a set of cards is a set rather than a ranking — service
// capabilities, related items. A vertical grid of eight cards buries the last
// four below the fold; a rail keeps the whole set in one gesture and reads as
// deliberate on a phone, where horizontal swiping is native.
//
// The scrolling is plain CSS overflow + scroll-snap, so this works with JS off
// and with a keyboard (the track is focusable and arrow-scrollable). The JS
// only adds the buttons and the progress indicator — nothing here gates access
// to the content.

import { useCallback, useEffect, useRef, useState } from 'react';

export default function HorizontalRail({ children, label = 'Card carousel' }) {
  const trackRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const p = max > 0 ? el.scrollLeft / max : 0;
    setProgress(p);
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(max > 0 && el.scrollLeft >= max - 2);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return undefined;
    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [update]);

  const nudge = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    // one card plus its gap, derived from the first child so it stays correct
    // across breakpoints without hardcoding the card width
    const first = el.firstElementChild;
    const step = first ? first.getBoundingClientRect().width + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  return (
    <div className="rail">
      <div className="rail__track" ref={trackRef} tabIndex={0} role="group" aria-label={label}>
        {children}
      </div>

      <div className="rail__controls">
        <div className="rail__progress" aria-hidden="true">
          <span className="rail__progress-fill" style={{ transform: `scaleX(${Math.max(0.08, progress || 0.08)})` }} />
        </div>
        <div className="rail__buttons">
          <button
            type="button"
            className="rail__btn"
            onClick={() => nudge(-1)}
            disabled={atStart}
            aria-label="Previous"
          >
            <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
              <path d="M10 2 L4 8 L10 14" fill="none" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </button>
          <button
            type="button"
            className="rail__btn"
            onClick={() => nudge(1)}
            disabled={atEnd}
            aria-label="Next"
          >
            <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
              <path d="M6 2 L12 8 L6 14" fill="none" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
