'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

const BallpitImpl = dynamic(() => import('./Ballpit'), { ssr: false });

// Ballpit lives in the CTA section, far below the fold. Without gating,
// its WebGL context and physics loop would still spin up immediately on
// page load — pure wasted main-thread/GPU work competing with the hero's
// own first paint. Only mount it once the section is actually near view.
export default function BallpitLazy(props) {
  const containerRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible) return;
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      {visible && <BallpitImpl {...props} />}
    </div>
  );
}
