import Script from 'next/script';
import Image from 'next/image';
import { Inter, Stack_Sans_Notch } from 'next/font/google';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SiteSchema from '../components/SiteSchema';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const stackSansNotch = Stack_Sans_Notch({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-stack-sans-notch',
  display: 'swap',
});

export const metadata = {
  title: {
    default: 'Gobiya — AI Web SEO Agency, Los Angeles',
    template: '%s — Gobiya',
  },
  description:
    'Gobiya is a Los Angeles technical SEO and AI visibility agency, founded in 2010. We recover organic traffic after algorithm updates and get brands cited in ChatGPT, Perplexity, and Google AI Overviews.',
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
        <Image className="bg-mark" src="/assets/img/logo-gobiya-red.webp" alt="" aria-hidden="true" width={400} height={401} priority />
        <Header />
        {children}
        <Footer />
        <Script src="/js/main.js" strategy="afterInteractive" />

        {/* Analytics carry no first-visit UX cost, so they're deferred past
            the load event (lazyOnload) instead of afterInteractive — they
            were otherwise competing with the hero/fonts/WebGL scene for the
            same main-thread window Lighthouse scores on. */}
        {/* Google Analytics 4 */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-3R3D5Q9YV6" strategy="lazyOnload" />
        <Script id="ga4-init" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3R3D5Q9YV6');
          `}
        </Script>

        {/* Microsoft Clarity */}
        <Script id="ms-clarity-init" strategy="lazyOnload">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "v5j018vnnn");
          `}
        </Script>
      </body>
    </html>
  );
}
