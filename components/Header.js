import { LogoMark } from './Logo';
import { NAV_ITEMS, SECONDARY_NAV, CONTACT } from '../lib/nav';

export default function Header() {
  return (
    <>
      <header className="nav" id="nav">
        <div className="topbar">
          <div className="topbar__inner">
            <span className="topbar__note">Los Angeles · Est. 2010 · BBB A+ Rated</span>
            <div className="topbar__links">
              <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              <a href="/onboarding" className="topbar__cta">Get an AI visibility audit</a>
            </div>
          </div>
        </div>
        <div className="nav__inner">
          <a className="nav__logo" href="/" aria-label="Gobiya — home">
            <LogoMark className="nav__logo-mark" size={30} />
            <span className="nav__logo-word">Gobiya</span>
          </a>
          <nav className="nav__links" aria-label="Primary">
            {NAV_ITEMS.map((item) => (
              <div className="nav__item" key={item.label}>
                <a href={item.href} className="nav__link">{item.label}</a>
              </div>
            ))}
          </nav>
          <div className="nav__right">
            <a href="/onboarding" className="btn btn--pill nav__cta">Book a strategy call</a>
            <button className="nav__burger" id="burger" aria-label="Open menu" aria-expanded="false">
              <span></span><span></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay menu */}
      <div className="menu" id="menu" aria-hidden="true">
        <nav className="menu__links" aria-label="Mobile">
          {NAV_ITEMS.map((item, i) => (
            <div className="menu__block" key={item.label} style={{ '--i': i }}>
              <a href={item.href}>{item.label}</a>
            </div>
          ))}
          {SECONDARY_NAV.map((group, gi) => (
            <div className="menu__block menu__block--more" key={group.heading} style={{ '--i': NAV_ITEMS.length + gi }}>
              <span className="menu__more-heading">{group.heading}</span>
              <div className="menu__sublinks">
                {group.items.map((sub) => (
                  <a key={sub.href} href={sub.href}>{sub.label}</a>
                ))}
              </div>
            </div>
          ))}
        </nav>
        <div className="menu__foot">
          <span>Los Angeles · {CONTACT.address2}</span>
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
        </div>
      </div>
    </>
  );
}
