/* The six-discipline rail that sits directly under the hero.
 *
 * Inline SVG on currentColor rather than image files: these are 26px marks that
 * have to flip with the theme, and six extra requests immediately under the
 * hero is the wrong trade for the LCP.
 *
 * `active` dims the discipline you are already reading, so the rail reads as
 * "where you are" on a service page and as a map on the homepage. */

const ICONS = {
  wrench: (
    <path d="M14.7 6.3a4 4 0 0 1-5.4 5.4L4 17v3h3l5.3-5.3a4 4 0 0 1 5.4-5.4l-2.6 2.6 1.4 1.4 2.6-2.6a4 4 0 0 1-4.4-4.4z" />
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z" />
    </>
  ),
  doc: (
    <>
      <path d="M14 3H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7z" />
      <path d="M14 3v4h4M9 12h6M9 16h6" />
    </>
  ),
  signal: (
    <>
      <circle cx="12" cy="12" r="2" />
      <path d="M8.5 8.5a5 5 0 0 0 0 7M15.5 8.5a5 5 0 0 1 0 7M5.5 5.5a9 9 0 0 0 0 13M18.5 5.5a9 9 0 0 1 0 13" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="12" cy="12" r="0.6" fill="currentColor" />
    </>
  ),
  code: <path d="M9 8l-4 4 4 4M15 8l4 4-4 4" />,
  bars: <path d="M5 20V11M10 20V5M15 20v-6M20 20v-9" />,
};

export function Icon({ name, size = 24 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  );
}

export const DISCIPLINES = [
  { label: 'Technical', icon: 'wrench', href: '/services/technical-seo', slug: 'technical-seo' },
  { label: 'GEO', icon: 'globe', href: '/services/geo', slug: 'geo' },
  { label: 'Content', icon: 'doc', href: '/services/content-marketing', slug: 'content-marketing' },
  { label: 'PR', icon: 'signal', href: '/services/link-building', slug: 'link-building' },
  { label: 'PPC', icon: 'target', href: '/services/ppc', slug: 'ppc' },
  { label: 'Web', icon: 'code', href: '/services/web-dev', slug: 'web-dev' },
];

export default function DisciplineRail({ active = null }) {
  return (
    <nav className="gb-rail" aria-label="Disciplines">
      <div className="container">
        <ul className="gb-rail__list">
          {DISCIPLINES.map((d) => (
            <li key={d.label}>
              <a
                href={d.href}
                className={`gb-rail__item${d.slug === active ? ' is-active' : ''}`}
                aria-current={d.slug === active ? 'page' : undefined}
              >
                <span className="gb-rail__icon">
                  <Icon name={d.icon} size={26} />
                </span>
                <span className="gb-rail__label">{d.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
