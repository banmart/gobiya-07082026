'use client';

import { useState, useEffect } from 'react';
import { LogoMark } from './Logo';
import { MEGA_NAV, CONTACT } from '../lib/nav';

export default function Header() {
  const [activeMenuIndex, setActiveMenuIndex] = useState(null);

  const handleMouseEnter = (idx) => {
    setActiveMenuIndex(idx);
  };

  const handleMouseLeave = () => {
    setActiveMenuIndex(null);
  };

  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentMega = activeMenuIndex !== null ? MEGA_NAV[activeMenuIndex] : null;

  return (
    <>
      <header className={`nav ${isScrolled ? 'is-scrolled' : ''}`} id="nav" onMouseLeave={handleMouseLeave}>
        {/* Top Navy Announcement Bar */}
        <div className="mw-topbar">
          <div className="container mw-topbar__inner">
            <span className="mw-topbar__text">
              Search &amp; AI Visibility – They say ranking a business is an art – we&apos;ve turned it into a science
            </span>
            <a href="/onboarding" className="mw-topbar__btn">
              Schedule a Consultation
            </a>
          </div>
        </div>

        <div className="nav__inner">
          <a className="nav__logo" href="/" aria-label="Gobiya — home">
            <LogoMark className="nav__logo-mark" size={30} />
            <span className="nav__logo-word">Gobiya</span>
          </a>

          <nav className="nav__links" aria-label="Primary">
            {MEGA_NAV.map((item, idx) => (
              <div
                className="nav__item"
                key={item.label}
                onMouseEnter={() => handleMouseEnter(idx)}
              >
                <a
                  href={item.href}
                  className={`nav__link ${activeMenuIndex === idx ? 'is-active' : ''}`}
                >
                  {item.label}
                </a>
              </div>
            ))}
          </nav>

          <div className="nav__right">
            <a href="/login" className="nav__user-btn" aria-label="Account Login" title="Account Login">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </a>
            <button className="nav__burger" id="burger" aria-label="Open menu" aria-expanded="false">
              <span></span><span></span>
            </button>
          </div>
        </div>

        {/* Mega-Dropdown Panel */}
        {currentMega && (
          <div
            className="mw-megamenu"
            onMouseEnter={() => setActiveMenuIndex(activeMenuIndex)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="container">
              <div className="mw-megamenu__grid">
                {currentMega.columns.map((col, cIdx) => (
                  <div key={cIdx} className="mw-megamenu__col">
                    <div className="mw-megamenu__col-header">
                      <span className="mw-megamenu__col-icon">
                        {col.icon === 'user' && (
                          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        )}
                        {col.icon === 'clipboard' && (
                          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>
                        )}
                        {col.icon === 'briefcase' && (
                          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                        )}
                      </span>
                      <span>{col.heading}</span>
                    </div>

                    <div className="mw-megamenu__items">
                      {col.items.map((sub, sIdx) => (
                        <a href={sub.href} key={sIdx} className="mw-megamenu__item">
                          <div className="mw-megamenu__item-title">
                            <span>{sub.title}</span>
                            {sub.badge && (
                              <span className="mw-megamenu__badge">{sub.badge}</span>
                            )}
                          </div>
                          <p className="mw-megamenu__item-desc">{sub.desc}</p>
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile overlay menu */}
      <div className="menu" id="menu" aria-hidden="true">
        <nav className="menu__links" aria-label="Mobile">
          {MEGA_NAV.map((item, i) => (
            <div className="menu__block" key={item.label} style={{ '--i': i }}>
              <a href={item.href}>{item.label}</a>
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
