import Script from 'next/script';
import { Inter, Stack_Sans_Notch } from 'next/font/google';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SiteSchema from '../components/SiteSchema';
import ConsentAnalytics from '../components/ConsentAnalytics';
import BrandWatermark from '../components/BrandWatermark';
import Motion from '../components/Motion';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// Every CSS rule that sets --font-heading uses it at weight 400 — the other
// five requested weights (200/300/500/600/700) were dead downloads sitting
// in the render-blocking CSS and the critical font-loading chain.
const stackSansNotch = Stack_Sans_Notch({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-stack-sans-notch',
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

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${stackSansNotch.variable}`}>
      <body>
        <SiteSchema />
        <BrandWatermark />
        <Header />
        {children}
        <Footer />
        <Motion />
        <Script src="/js/main.js" strategy="afterInteractive" />

        {/* GA4 + Clarity only load after explicit consent — see
            components/ConsentAnalytics.js. Nothing analytics-related
            touches the network on a first visit. */}
        <ConsentAnalytics />
      </body>
    </html>
  );
}
