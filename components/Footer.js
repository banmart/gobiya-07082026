import { LogoMark } from './Logo';
import { SECONDARY_NAV, CONTACT } from '../lib/nav';
import CookiePreferencesLink from './CookiePreferencesLink';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__mark" aria-hidden="true"><LogoMark size={520} light /></div>
      <div className="container">
        <div className="footer__grid">
          <div className="footer__col footer__col--brand">
            <a className="nav__logo footer__logo" href="#top">
              <LogoMark className="nav__logo-mark" size={30} light />
              <span className="nav__logo-word">Gobiya</span>
            </a>
            <p>Internet marketing consulting, technical SEO, and B2B pipeline engineering for growth-stage and enterprise companies — Los Angeles, founded in 2010.</p>
          </div>
          {SECONDARY_NAV.map((group) => (
            <div className="footer__col" key={group.heading}>
              <p className="footer__heading">{group.heading}</p>
              {group.items.map((item) => (
                <a href={item.href} key={item.href}>{item.label}</a>
              ))}
            </div>
          ))}
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
