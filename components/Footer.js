import Image from 'next/image';
import { CONTACT } from '../lib/nav';
import CookiePreferencesLink from './CookiePreferencesLink';

export default function Footer() {
  return (
    <footer className="footer">
      <Image className="footer__mark" src="/assets/img/logo-gobiya-red.webp" alt="" aria-hidden="true" width={400} height={401} />
      <div className="container">
        <div className="footer__grid">
          <div className="footer__col footer__col--brand">
            <a className="nav__logo footer__logo" href="#top">
              <Image className="nav__logo-mark" src="/assets/img/logo-gobiya-red.webp" alt="" width={400} height={401} />
              <span className="nav__logo-word">Gobiya</span>
            </a>
            <p>Internet marketing consulting, technical SEO, and B2B pipeline engineering for growth-stage and enterprise companies — Los Angeles, founded in 2010.</p>
          </div>
          <div className="footer__col">
            <p className="footer__heading">Firm</p>
            <a href="/about">About</a>
            <a href="/about/steve-martin">Steve Martin</a>
            <a href="/work">Work</a>
            <a href="/insights">Insights</a>
          </div>
          <div className="footer__col">
            <p className="footer__heading">Consulting</p>
            <a href="/services/seo-discoverability">SEO &amp; Discoverability</a>
            <a href="/services/geo-ai-content-writing">GEO &amp; AI Content</a>
            <a href="/services/authority-link-building">Authority &amp; Link Building</a>
            <a href="/ai-visibility">AI Visibility</a>
          </div>
          <div className="footer__col">
            <p className="footer__heading">Contact</p>
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
            <a href="/contact">{CONTACT.address1}, {CONTACT.address2}</a>
          </div>
        </div>
        <div className="footer__wordmark" aria-hidden="true"><span>GOBIYA</span></div>
        <div className="footer__legal">
          <span>© 2026 Gobiya LLC. Founded 2010. BBB A+ Rated.</span>
          <span><a href="/privacy">Privacy</a> · <a href="/terms">Terms</a> · <CookiePreferencesLink /></span>
        </div>
      </div>
    </footer>
  );
}
