'use client';

import { usePathname } from 'next/navigation';
import { markInner, BRAND_NAVY } from '../lib/brand';

export default function BrandWatermark() {
  const pathname = usePathname();

  // Only display background logo watermark on the homepage ('/')
  if (pathname !== '/') {
    return null;
  }

  return (
    <svg
      className="brand-watermark"
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: markInner(BRAND_NAVY) }}
    />
  );
}
