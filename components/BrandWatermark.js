import { markInner, BRAND_NAVY } from '../lib/brand';

// Faint, fixed-position brand mark behind all page content. Rendered as
// inline SVG (not an <img> or CSS background-image url()) so it structurally
// cannot become an LCP candidate — no network resource, no decode, just
// vector paint on the first frame. The old raster-webp version of this mark
// was previously winning LCP outright even as a CSS background; this can't.
export default function BrandWatermark() {
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
