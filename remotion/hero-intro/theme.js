import { loadFont as loadHeadingFont } from '@remotion/google-fonts/StackSansNotch';
import { loadFont as loadBodyFont } from '@remotion/google-fonts/Inter';

// Matches lib/brand.js + the site's institutional palette.
export const COLORS = {
  navy: '#142f52',
  navyDeep: '#0d2140',
  paper: '#f4f7fb',
  carmine: '#c8102e',
  hint: 'rgba(244, 247, 251, 0.62)',
  hairline: 'rgba(244, 247, 251, 0.16)',
  panel: 'rgba(244, 247, 251, 0.05)',
};

export const { fontFamily: headingFont } = loadHeadingFont('normal', {
  weights: ['400', '700'],
  subsets: ['latin'],
});

export const { fontFamily: bodyFont } = loadBodyFont('normal', {
  weights: ['400', '600', '800'],
  subsets: ['latin'],
});
