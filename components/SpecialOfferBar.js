'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

/**
 * SpecialOfferBar — Floating bottom offer bar for subpages
 *
 * Requirements fulfilled:
 * - Rendered on all pages EXCEPT the homepage (`/`).
 * - Features Steve Martin's profile picture (`/assets/img/steve-portrait.webp`).
 * - Displays a live countdown timer (`hh:mm:ss`), offer message, and action button.
 * - Auto-hides on scroll down, reappears on scroll up.
 * - Sets `--offer-bar-height` CSS variable dynamically so floating buttons (chat bubble & a11y)
 *   automatically adjust their bottom position without overlapping!
 */
export default function SpecialOfferBar() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [dismissed, setDismissed] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 28, seconds: 45 });
  const lastScrollY = useRef(0);

  // Do not render on homepage
  const isHomepage = pathname === '/';

  // Live ticking countdown timer
  useEffect(() => {
    const STORAGE_KEY = 'gobiya_special_offer_end';
    let endTime = localStorage.getItem(STORAGE_KEY);
    
    if (!endTime || isNaN(Number(endTime))) {
      endTime = Date.now() + (14 * 3600 * 1000 + 28 * 60 * 1000 + 45 * 1000);
      localStorage.setItem(STORAGE_KEY, endTime.toString());
    } else {
      let endNum = parseInt(endTime, 10);
      if (endNum <= Date.now()) {
        endNum = Date.now() + (14 * 3600 * 1000 + 28 * 60 * 1000 + 45 * 1000);
        localStorage.setItem(STORAGE_KEY, endNum.toString());
      }
    }

    const updateTimer = () => {
      const stored = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
      const diff = Math.max(0, stored - Date.now());
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft({ hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  // Hide on scroll down, reveal on scroll up
  useEffect(() => {
    if (isHomepage || dismissed) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current + 15 && currentScrollY > 120) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current - 10 || currentScrollY < 100) {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomepage, dismissed]);

  // Adjust CSS variable for floating widgets (chat bubble & a11y controls)
  useEffect(() => {
    if (isHomepage || dismissed || !isVisible) {
      document.documentElement.style.setProperty('--offer-bar-height', '0px');
    } else {
      document.documentElement.style.setProperty('--offer-bar-height', '72px');
    }

    return () => {
      document.documentElement.style.setProperty('--offer-bar-height', '0px');
    };
  }, [isHomepage, dismissed, isVisible]);

  if (isHomepage || dismissed) return null;

  const pad = (num) => String(num).padStart(2, '0');

  return (
    <div
      className={`mw-offer-bar ${isVisible ? 'is-visible' : 'is-hidden'}`}
      role="region"
      aria-label="Special Offer"
    >
      <div className="container mw-offer-bar__inner">
        <div className="mw-offer-bar__left">
          <div className="mw-offer-bar__avatar-wrapper">
            <Image
              src="/assets/img/steve-portrait.webp"
              alt="Steve Martin"
              width={44}
              height={44}
              className="mw-offer-bar__avatar"
            />
            <span className="mw-offer-bar__status-dot" title="Steve is online" />
          </div>
          <div className="mw-offer-bar__text-group">
            <div className="mw-offer-bar__headline">
              <span>Claim Your Free SEO &amp; AI Citation Audit</span>
              <span className="mw-offer-bar__value-tag">$500 Value</span>
            </div>
            <p className="mw-offer-bar__subtext">
              Steve Martin personally reviews your site. Limited spots available!
            </p>
          </div>
        </div>

        <div className="mw-offer-bar__right">
          <div className="mw-offer-bar__timer" title="Special offer countdown">
            <span className="mw-offer-bar__timer-label">Ends in</span>
            <div className="mw-offer-bar__timer-box">
              <span className="mw-offer-bar__unit">{pad(timeLeft.hours)}<small>h</small></span>
              <span className="mw-offer-bar__colon">:</span>
              <span className="mw-offer-bar__unit">{pad(timeLeft.minutes)}<small>m</small></span>
              <span className="mw-offer-bar__colon">:</span>
              <span className="mw-offer-bar__unit">{pad(timeLeft.seconds)}<small>s</small></span>
            </div>
          </div>

          <a href="/free-site-scan" className="mw-offer-bar__btn">
            Claim Free Scan
          </a>

          <button
            type="button"
            className="mw-offer-bar__close"
            onClick={() => setDismissed(true)}
            aria-label="Close offer bar"
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  );
}
