import { CONTACT } from '../lib/nav';

export default function Footer() {
  return (
    <footer className="footer">
      <img className="footer__mark" src="/assets/img/logo-gobiya-red-rocket-07082026.svg" alt="" aria-hidden="true" />
      <div className="container">
        <div className="footer__grid">
          <div className="footer__col footer__col--brand">
            <a className="nav__logo footer__logo" href="#top">
              <img className="nav__logo-mark" src="/assets/img/logo-gobiya-red-rocket-07082026.svg" alt="" />
              <span className="nav__logo-word">Gobiya</span>
            </a>
            <p>Technical SEO, GEO/AI visibility, and B2B pipeline engineering for growth-stage and enterprise companies — Los Angeles, operating since 2012.</p>
          </div>
          <div className="footer__col">
            <h4>Firm</h4>
            <a href="/about">About</a>
            <a href="/about/steve-martin">Steve Martin</a>
            <a href="/work">Work</a>
            <a href="/insights">Insights</a>
          </div>
          <div className="footer__col">
            <h4>Services</h4>
            <a href="/services/seo-discoverability">SEO &amp; Discoverability</a>
            <a href="/services/geo-ai-content-writing">GEO &amp; AI Content</a>
            <a href="/services/authority-link-building">Authority &amp; Link Building</a>
            <a href="/ai-visibility">AI Visibility</a>
          </div>
          <div className="footer__col">
            <h4>Contact</h4>
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
            <a href="/contact">{CONTACT.address1}, {CONTACT.address2}</a>
          </div>
        </div>
        <div className="footer__wordmark" aria-hidden="true"><span>GOBIYA</span></div>
        <div className="footer__legal">
          <span>© 2026 Gobiya LLC. Operating since 2012. BBB A+ Rated.</span>
          <span><a href="#">Privacy</a> · <a href="#">Terms</a></span>
        </div>
      </div>
    </footer>
  );
}
