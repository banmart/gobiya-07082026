'use client';

import { usePathname } from 'next/navigation';
import { markInner, BRAND_NAVY } from '../lib/brand';

export default function BrandWatermark() {
  const pathname = usePathname();

  // Only display background logo watermark on the homepage ('/')
  if (pathname !== '/') {
    return null;
  }

  // The mark is deliberately hung off the right edge of the page, so it needs a
  // clipping parent or it widens the document — on mobile that reads as a stray
  // margin you can swipe into. The footer mark is clipped the same way, by
  // .mw-footer's own overflow: hidden.
  return (
    <div className="brand-watermark-clip" aria-hidden="true">
      <svg
        className="brand-watermark"
        viewBox="0 0 48 48"
        fill="none"
        dangerouslySetInnerHTML={{ __html: markInner(BRAND_NAVY) }}
      />
    </div>
  );
}
