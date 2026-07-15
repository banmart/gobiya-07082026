import { loadFont as loadHeadingFont } from '@remotion/google-fonts/Fredoka';
import { loadFont as loadBodyFont } from '@remotion/google-fonts/Inter';

export const COLORS = {
  gradientStart: '#ee5a86',
  gradientEnd: '#f7b955',
  ink: '#2b2440',
  accent: '#e8738a',
  mutedText: '#6e6b85',
  light: '#fff7f2',
  panelDark: 'rgba(43, 36, 64, 0.72)',
};

export const { fontFamily: headingFont } = loadHeadingFont('normal', {
  weights: ['500', '600', '700'],
  subsets: ['latin'],
});

export const { fontFamily: bodyFont } = loadBodyFont('normal', {
  weights: ['400', '600', '700', '800'],
  subsets: ['latin'],
});
