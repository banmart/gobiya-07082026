'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

const CONSENT_KEY = 'gobiya-analytics-consent';

// Owns both the banner UI and the analytics scripts so the decision and the
// scripts it gates can't drift out of sync. GA4/Clarity render only after an
// explicit "granted" — nothing analytics-related touches the network before
// that, which is what keeps the third-party-cookies audit clean by default.
export default function ConsentAnalytics() {
  const [consent, setConsent] = useState(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setConsent(localStorage.getItem(CONSENT_KEY));
    setHydrated(true);
    const reopen = () => setConsent(null);
    window.addEventListener('open-cookie-preferences', reopen);
    return () => window.removeEventListener('open-cookie-preferences', reopen);
  }, []);

  const decide = (value) => {
    localStorage.setItem(CONSENT_KEY, value);
    setConsent(value);
  };

  return (
    <>
      {consent === 'granted' && (
        <>
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
              })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_ID || 'v5j018vnnn'}");
            `}
          </Script>
        </>
      )}

      {hydrated && consent === null && (
        <div className="cookie-banner" role="dialog" aria-live="polite" aria-label="Cookie consent">
          <div className="cookie-banner__inner">
            <p className="cookie-banner__text">
              We use analytics cookies (Google Analytics, Microsoft Clarity) to see how visitors use this site. See our{' '}
              <a href="/privacy">Privacy Policy</a>.
            </p>
            <div className="cookie-banner__actions">
              <button type="button" className="btn btn--ghost btn--pill" onClick={() => decide('denied')}>
                Decline
              </button>
              <button type="button" className="btn btn--solid btn--pill" onClick={() => decide('granted')}>
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
