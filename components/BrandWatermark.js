import { markInner, BRAND_NAVY } from '../lib/brand';

// Rendered inside the homepage hero section, not from the root layout. It used
// to sit at body level with a z-index of 15, which put it over anything the
// hero contained — including the scan widget, where a 35%-opacity mark over a
// white panel prints as a grey block across the tabs. Inside the hero it stacks
// against the video and overlay instead (see .brand-watermark-clip), so it
// still washes over the photography and never over the copy or the form.
export default function BrandWatermark() {
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
