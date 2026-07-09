import Script from 'next/script';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Preloader from '../components/Preloader';

export const metadata = {
  title: {
    default: 'Gobiya — AI Web SEO Agency, Los Angeles',
    template: '%s — Gobiya',
  },
  description:
    'Gobiya is a Los Angeles technical SEO and AI visibility agency, operating since 2012. We recover organic traffic after algorithm updates and get brands cited in ChatGPT, Perplexity, and Google AI Overviews.',
  metadataBase: new URL('https://www.gobiya.com'),
  icons: {
    icon: '/assets/img/logo-gobiya-red-rocket-07082026.svg',
    shortcut: '/assets/img/logo-gobiya-red-rocket-07082026.svg',
    apple: '/assets/img/logo-gobiya-red-rocket-07082026.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:ital,opsz,wght@0,14..32,300..700;1,14..32,300..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <img className="bg-mark" src="/assets/img/logo-gobiya-red-rocket-07082026.svg" alt="" aria-hidden="true" />
        <Preloader />
        <Header />
        {children}
        <Footer />
        <Script src="/js/main.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
