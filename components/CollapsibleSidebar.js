'use client';

import { useState } from 'react';

export default function CollapsibleSidebar({ headerText, children, navLabel }) {
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  return (
    <aside className="mw-sidebar">
      {/* Mobile Toggle Button */}
      <button
        type="button"
        className="mw-sidebar__header mw-sidebar__header--mobile"
        onClick={() => setIsOpenMobile(!isOpenMobile)}
        aria-expanded={isOpenMobile}
        aria-label={`Toggle ${headerText} menu`}
      >
        <span>{headerText}</span>
        <span className={`mw-sidebar__chevron ${isOpenMobile ? 'is-open' : ''}`} aria-hidden="true" />
      </button>

      {/* Desktop Static Header */}
      <div className="mw-sidebar__header mw-sidebar__header--desktop">
        {headerText}
      </div>

      {/* Nav Content */}
      <nav
        className={`mw-sidebar__nav ${isOpenMobile ? 'is-open-mobile' : ''}`}
        aria-label={navLabel || headerText}
      >
        {children}
      </nav>
    </aside>
  );
}
