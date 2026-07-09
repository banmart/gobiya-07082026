import Script from 'next/script';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata = {
  title: {
    default: 'Gobiya — AI Web SEO Agency, Los Angeles',
    template: '%s — Gobiya',
  },
  description:
    'Gobiya is a Los Angeles technical SEO and AI visibility agency, operating since 2012. We recover organic traffic after algorithm updates and get brands cited in ChatGPT, Perplexity, and Google AI Overviews.',
  metadataBase: new URL('https://www.gobiya.com'),
  icons: {
    icon: '/assets/img/logo-gobiya-red.webp',
    shortcut: '/assets/img/logo-gobiya-red.webp',
    apple: '/assets/img/logo-gobiya-red.webp',
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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Stack+Sans+Notch:wght@200..700&family=Inter:ital,opsz,wght@0,14..32,300..700;1,14..32,300..700&display=swap"
          rel="stylesheet"
        />
        <link rel="preload" as="image" href="/assets/img/logo-gobiya-red.webp" />
      </head>
      <body>
        <img className="bg-mark" src="/assets/img/logo-gobiya-red.webp" alt="" aria-hidden="true" width="400" height="401" />
        <Header />
        {children}
        <Footer />
        <Script src="/js/main.js" strategy="afterInteractive" />

        {/* Google Analytics 4 */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-3R3D5Q9YV6" strategy="afterInteractive" />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3R3D5Q9YV6');
          `}
        </Script>

        {/* Microsoft Clarity */}
        <Script id="ms-clarity-init" strategy="afterInteractive">
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
