import { Fragment } from 'react';
import { SERVICE_LINKS } from '../lib/serviceIndex';
import CollapsibleSidebar from './CollapsibleSidebar';

const PAGE_SECTIONS = [
  { id: 'problem', label: 'The problem' },
  { id: 'whats-included', label: 'What’s included' },
  { id: 'how-it-works', label: 'How it works' },
  { id: 'faqs', label: 'Common questions' },
];

export default function ServiceSidebar({ activeSlug }) {
  const activeItem = SERVICE_LINKS.find((s) => s.slug === activeSlug);
  const headerText = activeItem ? `Services — ${activeItem.title}` : 'Services';

  return (
    <CollapsibleSidebar headerText={headerText} navLabel="Services">
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

      <a href="/pricing" className="mw-sidebar__link">Pricing</a>
      <a href="/work" className="mw-sidebar__link">Client Stories</a>
      <a href="/free-site-scan" className="mw-sidebar__link">Free Site Scan</a>
    </CollapsibleSidebar>
  );
}
