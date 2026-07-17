import { markInner, BRAND_NAVY, BRAND_PAPER } from '../lib/brand';

export function LogoMark({ size = 28, light = false, className }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: markInner(light ? BRAND_PAPER : BRAND_NAVY) }}
    />
  );
}
