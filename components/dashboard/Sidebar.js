'use client';

import { usePathname } from 'next/navigation';
import { LogoMark } from '../Logo';

// items: [{ label, href, children?: [{ label, href }] }]
export default function Sidebar({ items, heading }) {
  const pathname = usePathname();

  // Longest match wins. A plain startsWith would light up "Overview" as well
  // as "Settings" on /dashboard/settings, because that path also starts with
  // /dashboard/ — so the root entry has to lose to its own children.
  const activeHref = items
    .filter((item) => pathname === item.href || pathname.startsWith(`${item.href}/`))
    .sort((a, b) => b.href.length - a.href.length)[0]?.href;

  return (
    <aside className="app__sidebar">
      <a className="app__brand" href="/">
        <LogoMark size={26} light />
        <span className="app__brand-word">Gobiya</span>
      </a>

      <nav className="app__nav" aria-label={heading}>
        <p className="app__nav-heading">{heading}</p>
        {items.map((item) => {
          const active = item.href === activeHref;
          return (
            <div key={item.href}>
              <a
                className={`app__link${active ? ' app__link--active' : ''}`}
                href={item.href}
                aria-current={active ? 'page' : undefined}
              >
                {item.label}
              </a>
              {active && item.children
                ? item.children.map((child) => (
                    <a className="app__sublink" key={child.href} href={child.href}>
                      {child.label}
                    </a>
                  ))
                : null}
            </div>
          );
        })}
      </nav>

      <div className="app__sidebar-foot">
        <form action="/auth/signout" method="post">
          <button className="app__signout" type="submit">
            Sign out
          </button>
        </form>
      </div>
    </aside>
  );
}
