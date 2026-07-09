import { NAV_ITEMS, CONTACT } from '../lib/nav';

export default function Header() {
  return (
    <>
      <header className="nav" id="nav">
        <div className="nav__inner">
          <a className="nav__logo" href="/" aria-label="Gobiya — home">
            <img className="nav__logo-mark" src="/assets/img/logo-gobiya-red.webp" alt="" width="400" height="401" />
            <span className="nav__logo-word">Gobiya</span>
          </a>
          <nav className="nav__links" aria-label="Primary">
            {NAV_ITEMS.map((item) => (
              <div className="nav__item" key={item.label}>
                {item.built ? (
                  <a href={item.href} className="nav__link">
                    {item.label}
                    {item.groups && <i className="nav__caret" aria-hidden="true" />}
                  </a>
                ) : item.groups ? (
                  <span className="nav__link nav__link--parent" tabIndex={0}>
                    {item.label}
                    <i className="nav__caret" aria-hidden="true" />
                  </span>
                ) : (
                  <a href={item.href} className="nav__link">{item.label}</a>
                )}

                {item.groups && (
                  <div className="nav__dropdown">
                    <div className="nav__dropdown-inner">
                      {item.groups.map((g, i) => (
                        <div className="nav__dropdown-group" key={g.group || i}>
                          {g.group && <span className="nav__dropdown-heading">{g.group}</span>}
                          <ul>
                            {g.items.map((sub) => (
                              <li key={sub.href}>
                                <a href={sub.href}>{sub.label}</a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
          <div className="nav__right">
            <span className="nav__lang"><a href="#" className="is-active">EN</a><i>/</i><a href="#">ES</a></span>
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
              {item.built ? (
                <a href={item.href}>{item.label}</a>
              ) : item.groups ? (
                <span className="menu__parent">{item.label}</span>
              ) : (
                <a href={item.href}>{item.label}</a>
              )}
              {item.groups && (
                <div className="menu__sublinks">
                  {item.groups.flatMap((g) => g.items).map((sub) => (
                    <a key={sub.href} href={sub.href}>{sub.label}</a>
                  ))}
                </div>
              )}
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
