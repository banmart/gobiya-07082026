import { loadFont as loadHeadingFont } from '@remotion/google-fonts/StackSansNotch';
import { loadFont as loadBodyFont } from '@remotion/google-fonts/Inter';

export const COLORS = {
  main: '#e41613',
  darkest: '#2b2b2b',
  lightest: '#f7f7f7',
  hint: 'rgba(247, 245, 240, 0.7)',
};

export const { fontFamily: headingFont } = loadHeadingFont('normal', {
  weights: ['400', '700'],
  subsets: ['latin'],
});

export const { fontFamily: bodyFont } = loadBodyFont('normal', {
  weights: ['400', '600', '800'],
  subsets: ['latin'],
});
