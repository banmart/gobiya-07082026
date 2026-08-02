import Script from 'next/script';
import { Inter, Open_Sans } from 'next/font/google';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SiteSchema from '../components/SiteSchema';
import ConsentAnalytics from '../components/ConsentAnalytics';
import BrandWatermark from '../components/BrandWatermark';
import Motion from '../components/Motion';
import AIChatBubble from '../components/AIChatBubble';
import ChromeGate from '../components/ChromeGate';
import AccessibilityControls from '../components/AccessibilityControls';
import ScrollAnimate from '../components/ScrollAnimate';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// Every heading on the site resolves to Open Sans Thin through --font-heading in globals.css.
const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-open-sans',
  display: 'swap',
});

export const metadata = {
  title: {
    default: 'Gobiya — Digital Marketing Agency & Internet Marketing Consulting, Los Angeles',
    template: '%s — Gobiya',
  },
  description:
    'Gobiya is a Los Angeles digital marketing agency and internet marketing consulting firm, founded in 2010. We deliver SEO services, organic search strategy, AI marketing tools, and AI visibility that gets brands cited in ChatGPT and Google AI Overviews.',
  metadataBase: new URL('https://www.gobiya.com'),
  icons: {
    icon: [
      { url: '/assets/img/icon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/assets/img/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/assets/img/icon-32.png',
    apple: '/assets/img/apple-icon-180.png',
  },
  verification: {
    google: 'BCJ8-9rzY9X5CjZqM2hY7erF-1vFCZHFKl-Y-nbXv3U',
    other: {
      'p:domain_verify': '422d36275e412e182dff33f542a68498',
    },
  },
};

/**
 * Resolves the theme before first paint.
 *
 * This has to be inline, synchronous, and in <head>: anything deferred — a
 * component effect, a Script with any strategy — runs after the browser has
 * already painted, so a dark-mode visitor gets a white flash on every
 * navigation. Stored choice wins; absent one we follow the OS.
 */
const THEME_INIT = `(function(){try{var s=localStorage.getItem('gobiya-theme');var d=s==='dark'||(!s&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.dataset.theme=d?'dark':'light';}catch(e){document.documentElement.dataset.theme='light';}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${openSans.variable}`} suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
      </head>
      <body>
        <SiteSchema />
        <BrandWatermark />
        <ChromeGate>
          <Header />
        </ChromeGate>
        {children}
        <ChromeGate>
          <AIChatBubble />
          <Footer />
        </ChromeGate>
        <Motion />
        <Script src="/js/main.js" strategy="afterInteractive" />
        <ConsentAnalytics />
        <AccessibilityControls />
        <ScrollAnimate />
      </body>
    </html>
  );
}
