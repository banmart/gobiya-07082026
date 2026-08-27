'use client';

import { useState, useEffect } from 'react';
import { LogoMark } from './Logo';
import ThemeToggle from './ThemeToggle';
import { TOP_NAV, PRACTICE_NAV, HEADER_CTA, CONTACT } from '../lib/nav';

/* Two rows.
 *
 * The top row is identity and the one CTA. The second row is the practice —
 * six disciplines, each opening a short panel of the pages that belong to it,
 * then the coverage page. Below 62rem both rows collapse into the burger and
 * the practice list becomes the accordion inside it, so nothing in the second
 * row is unreachable on a phone.
 *
 * The ids (#nav, #burger, #menu) are load-bearing: public/js/main.js attaches
 * the scroll and escape-key behaviour to them. */
export default function Header() {
  const [openIndex, setOpenIndex] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Which mobile accordion section is expanded. One at a time — seven sections
  // open at once is a wall of links rather than a menu.
  const [openSection, setOpenSection] = useState(null);

  const closeMenu = () => {
    setIsMenuOpen(false);
    setOpenSection(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when the mobile menu is open
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

  return (
    <>
      <header
        className={`gb-nav ${isScrolled ? 'is-scrolled' : ''}`}
        id="nav"
        onMouseLeave={() => setOpenIndex(null)}
      >
        {/* ── row 1: identity + the one CTA ── */}
        <div className="gb-nav__top">
          <div className="container gb-nav__top-inner">
            {/* Wordmark, not the bracket mark: at 26px the mark competes with
                the word beside it. The accent square is the mark reduced to
                its one carmine element. */}
            <a className="gb-nav__brand" href="/" aria-label="Gobiya — home">
              <span className="gb-nav__brand-word">Gobiya</span>
              <span className="gb-nav__brand-dot" aria-hidden="true" />
              <span className="gb-nav__brand-rule" aria-hidden="true" />
              <span className="gb-nav__brand-tag">SEO &amp; AI Search Agency</span>
            </a>

            <nav className="gb-nav__top-links" aria-label="Primary">
              {TOP_NAV.map((item) => (
                <a key={item.href} href={item.href} className="gb-nav__top-link">
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="gb-nav__actions">
              <a href={HEADER_CTA.href} className="gb-nav__cta">
                {HEADER_CTA.label}
              </a>
              <ThemeToggle />
              <a
                href="/login"
                className="gb-nav__icon-btn"
                aria-label="Account login"
                title="Account login"
              >
                <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
        </div>

        {/* ── row 2: the practice ── */}
        <div className="gb-nav__practice">
          <div className="container gb-nav__practice-inner">
            {PRACTICE_NAV.map((item, idx) => {
              const hasPanel = Array.isArray(item.items) && item.items.length > 0;
              const isOpen = hasPanel && openIndex === idx;
              return (
                <div
                  key={item.href}
                  className="gb-nav__practice-item"
                  onMouseEnter={() => setOpenIndex(hasPanel ? idx : null)}
                >
                  <a
                    href={item.href}
                    className={`gb-nav__practice-link ${isOpen ? 'is-open' : ''}`}
                  >
                    <span>{item.label}</span>
                    {hasPanel && (
                      <svg
                        className="gb-nav__caret"
                        viewBox="0 0 24 24"
                        width="10"
                        height="10"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    )}
                  </a>

                  {isOpen && (
                    <div className="gb-nav__panel">
                      {item.items.map((sub) => (
                        <a key={sub.href} href={sub.href} className="gb-nav__panel-link">
                          {sub.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </header>

      {/* Mobile overlay menu. Same accordion the old mega-nav used — the
          practice row is the only place several of these pages are linked
          from, so all of it has to be reachable here. */}
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
          {TOP_NAV.map((item, i) => (
            <div className="menu__block" key={item.href} style={{ '--i': i }}>
              <div className="menu__row">
                <a className="menu__row-link" href={item.href} onClick={closeMenu}>
                  {item.label}
                </a>
              </div>
            </div>
          ))}

          {PRACTICE_NAV.map((item, i) => {
            const hasPanel = Array.isArray(item.items) && item.items.length > 0;
            const isExpanded = hasPanel && openSection === item.label;
            const panelId = `menu-section-${i}`;

            return (
              <div
                className={`menu__block ${isExpanded ? 'is-open' : ''}`}
                key={item.href}
                style={{ '--i': TOP_NAV.length + i }}
              >
                <div className="menu__row">
                  {/* Split control: the label navigates to the discipline page,
                      the caret expands. One tappable element doing both is the
                      usual mobile-nav trap — you can never reach the hub. */}
                  <a className="menu__row-link" href={item.href} onClick={closeMenu}>
                    {item.label}
                  </a>
                  {hasPanel && (
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
                    <div className="menu__sub-group">
                      {item.items.map((sub) => (
                        <a
                          className="menu__sub-link"
                          key={sub.href}
                          href={sub.href}
                          onClick={closeMenu}
                        >
                          {sub.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="menu__foot">
          <a className="menu__cta" href={HEADER_CTA.href} onClick={closeMenu}>
            {HEADER_CTA.label}
          </a>
          <a className="menu__phone" href={CONTACT.phoneHref}>{CONTACT.phone}</a>
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          <span>Los Angeles · {CONTACT.address2}</span>
        </div>
      </div>
    </>
  );
}
