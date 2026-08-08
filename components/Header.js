'use client';

import { useState, useEffect } from 'react';
import { LogoMark } from './Logo';
import ThemeToggle from './ThemeToggle';
import { MEGA_NAV, CONTACT } from '../lib/nav';

export default function Header() {
  const [activeMenuIndex, setActiveMenuIndex] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Which mobile accordion section is expanded. One at a time — five sections
  // open at once is a wall of links rather than a menu.
  const [openSection, setOpenSection] = useState(null);

  const closeMenu = () => {
    setIsMenuOpen(false);
    setOpenSection(null);
  };

  const handleMouseEnter = (idx) => {
    setActiveMenuIndex(idx);
  };

  const handleMouseLeave = () => {
    setActiveMenuIndex(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const currentMega = activeMenuIndex !== null ? MEGA_NAV[activeMenuIndex] : null;

  return (
    <>
      <header className={`nav ${isScrolled ? 'is-scrolled' : ''}`} id="nav" onMouseLeave={handleMouseLeave}>
        {/* Top Navy Announcement Bar */}
        <div className="mw-topbar">
          <div className="container mw-topbar__inner">
            <span className="mw-topbar__text mw-topbar__text--desktop">
              Search &amp; AI Visibility – They say ranking a business is an art – we&apos;ve turned it into a science
            </span>
            <span className="mw-topbar__text mw-topbar__text--mobile">
              Search &amp; AI Visibility Specialists
            </span>
            <a href="?onboarding=true" className="mw-topbar__btn">
              Schedule a Consultation
            </a>
          </div>
        </div>

        <div className="container nav__inner">
          <a className="nav__logo" href="/" aria-label="Gobiya — home">
            <LogoMark className="nav__logo-mark" size={30} />
            <span className="nav__logo-word">Gobiya</span>
          </a>

          <nav className="nav__links" aria-label="Primary">
            {MEGA_NAV.map((item, idx) => {
              const hasDropdown = item.columns && item.columns.length > 0;
              return (
                <div
                  className="nav__item"
                  key={item.label}
                  onMouseEnter={() => (hasDropdown ? handleMouseEnter(idx) : handleMouseLeave())}
                >
                  <a
                    href={item.href}
                    className={`nav__link ${activeMenuIndex === idx ? 'is-active' : ''}`}
                  >
                    <span>{item.label}</span>
                    {hasDropdown && (
                      <svg
                        className={`nav__chevron ${activeMenuIndex === idx ? 'is-open' : ''}`}
                        viewBox="0 0 24 24"
                        width="12"
                        height="12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    )}
                  </a>
                </div>
              );
            })}
          </nav>

          <div className="nav__right">
            <ThemeToggle />
            <a href="/login" className="nav__user-btn" aria-label="Account Login" title="Account Login">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </a>
            <button
              className={`nav__burger ${isMenuOpen ? 'is-open' : ''}`}
              id="burger"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span></span>
              <span></span>
            </button>
          </div>
        </div>

        {/* Horizontal Sub-Menu Overlay */}
        {currentMega && (
          <div
            className="nav-subrow"
            onMouseEnter={() => setActiveMenuIndex(activeMenuIndex)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="container nav-subrow__inner">
              {currentMega.columns.flatMap((col) => col.items).map((sub, sIdx) => (
                <a href={sub.href} key={sIdx} className="nav-subrow__item">
                  {sub.title}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Mobile overlay menu.
          Previously five flat links to the section hubs, which left every
          service, tool and case study unreachable on a phone. It's an accordion
          now so the mega-menu contents are actually available, with one section
          open at a time to keep the panel scannable. */}
      <div className={`menu ${isMenuOpen ? 'is-open' : ''}`} id="menu" aria-hidden={!isMenuOpen}>
        <div className="menu__head">
          <a className="nav__logo" href="/" onClick={closeMenu}>
            <LogoMark className="nav__logo-mark" size={30} />
            <span className="nav__logo-word">Gobiya</span>
          </a>
          <button type="button" className="menu__close" onClick={closeMenu} aria-label="Close menu">
            &times;
          </button>
        </div>

        <nav className="menu__links" aria-label="Mobile">
          {MEGA_NAV.map((item, i) => {
            const hasDropdown = item.columns && item.columns.length > 0;
            const isExpanded = hasDropdown && openSection === item.label;
            const panelId = `menu-section-${i}`;

            return (
              <div className={`menu__block ${isExpanded ? 'is-open' : ''}`} key={item.label} style={{ '--i': i }}>
                <div className="menu__row">
                  {/* Split control: the label navigates to the section hub, the
                      chevron expands. One tappable element doing both is the
                      usual mobile-nav trap — you can never reach the hub. */}
                  <a className="menu__row-link" href={item.href} onClick={closeMenu}>
                    {item.label}
                  </a>
                  {/* Only sections with a mega-menu get a chevron — the flat
                      links have nothing to expand. */}
                  {hasDropdown && (
                    <button
                      type="button"
                      className="menu__row-toggle"
                      onClick={() => setOpenSection(isExpanded ? null : item.label)}
                      aria-expanded={isExpanded}
                      aria-controls={panelId}
                      aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${item.label}`}
                    >
                      <span aria-hidden="true">⌄</span>
                    </button>
                  )}
                </div>

                {isExpanded && (
                  <div className="menu__sub" id={panelId}>
                    {item.columns.map((column) => (
                      <div className="menu__sub-group" key={column.heading}>
                        <p className="menu__sub-heading">{column.heading}</p>
                        {column.items.map((sub) => (
                          <a
                            className="menu__sub-link"
                            key={sub.href + sub.title}
                            href={sub.href}
                            onClick={closeMenu}
                          >
                            {sub.title}
                            {sub.badge && <span className="menu__sub-badge">{sub.badge}</span>}
                          </a>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="menu__foot">
          <a className="menu__cta" href="?onboarding=true" onClick={closeMenu}>
            Request a Quote
          </a>
          <a className="menu__phone" href={CONTACT.phoneHref}>{CONTACT.phone}</a>
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          <span>Los Angeles · {CONTACT.address2}</span>
        </div>
      </div>
    </>
  );
}
