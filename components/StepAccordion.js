'use client';

import { useId, useState } from 'react';

// One card of the 4-Step Method. On mobile the header is a button that opens
// and closes the description; on desktop the description is always visible and
// the header is inert text.
//
// Both headers are rendered and CSS picks one, which is the same approach
// components/CollapsibleSidebar.js takes. Reading the viewport during render
// instead would either flash the wrong state or mismatch on hydration, and a
// single button left on desktop would announce aria-expanded="false" over a
// panel that is plainly visible.
export default function StepAccordion({ title, children }) {
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const panelId = useId();

  return (
    <div className="mw-step-card">
      <button
        type="button"
        className="mw-step-card__header mw-step-card__header--mobile"
        onClick={() => setIsOpenMobile(!isOpenMobile)}
        aria-expanded={isOpenMobile}
        aria-controls={panelId}
      >
        <span>{title}</span>
        <span
          className={`mw-step-card__caret ${isOpenMobile ? 'is-open' : ''}`}
          aria-hidden="true"
        />
      </button>

      <div className="mw-step-card__header mw-step-card__header--desktop">{title}</div>

      <div
        id={panelId}
        className={`mw-step-card__panel ${isOpenMobile ? 'is-open-mobile' : ''}`}
      >
        <p className="mw-step-card__desc">{children}</p>
      </div>
    </div>
  );
}
