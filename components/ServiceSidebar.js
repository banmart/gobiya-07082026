import { Fragment } from 'react';
import { SERVICE_LINKS } from '../lib/serviceIndex';

// Section navigation, not a table of contents.
//
// The earlier version of this rail listed the current page's own capability
// headings as #anchor links, which meant every service page dead-ended in
// itself — a visitor reading about CRO had no way to reach PPC. Morgan &
// Westfield's pattern, which this layout is copied from, links the sibling
// pages in the section and expands only the page you're on. That's what makes
// the rail useful: it's the rest of the offer, always in view.

const PAGE_SECTIONS = [
  { id: 'problem', label: 'The problem' },
  { id: 'whats-included', label: 'What’s included' },
  { id: 'how-it-works', label: 'How it works' },
  { id: 'faqs', label: 'Common questions' },
];

export default function ServiceSidebar({ activeSlug }) {
  return (
    <aside className="mw-sidebar">
      <div className="mw-sidebar__header">Services</div>
      <nav className="mw-sidebar__nav" aria-label="Services">
        <a href="/services" className="mw-sidebar__link">All Services</a>

        {SERVICE_LINKS.map((s) =>
          s.slug === activeSlug ? (
            <Fragment key={s.slug}>
              <a href={s.href} className="mw-sidebar__link is-active" aria-current="page">
                {s.title}
              </a>
              {PAGE_SECTIONS.map((sec) => (
                <a key={sec.id} href={`#${sec.id}`} className="mw-sidebar__link mw-sidebar__link--sub">
                  {sec.label}
                </a>
              ))}
            </Fragment>
          ) : (
            <a key={s.slug} href={s.href} className="mw-sidebar__link">
              {s.title}
            </a>
          )
        )}

        {/* The section's supporting pages, same as the reference layout ends
            with Fees / Client Stories / Not Ready Yet. */}
        <a href="/pricing" className="mw-sidebar__link">Pricing</a>
        <a href="/work" className="mw-sidebar__link">Client Stories</a>
        <a href="/free-site-scan" className="mw-sidebar__link">Free Site Scan</a>
      </nav>
    </aside>
  );
}
