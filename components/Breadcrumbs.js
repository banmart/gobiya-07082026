const BASE_URL = 'https://www.gobiya.com';

export default function Breadcrumbs({ items, inHero = false, light = false }) {
  if (!items || items.length === 0) return null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `${BASE_URL}${item.href}` } : {}),
    })),
  };

  const navList = (
    <ol className={`mw-breadcrumbs__list ${light ? 'mw-breadcrumbs__list--light' : ''}`} style={inHero ? { marginBottom: '0.625rem', fontSize: '0.8125rem' } : undefined}>
      {items.map((item, idx) => (
        <li key={item.label} className="mw-breadcrumbs__item">
          {idx > 0 && (
            <span className="mw-breadcrumbs__sep" style={light ? { color: 'rgba(255, 255, 255, 0.6)' } : undefined}>
              &gt;
            </span>
          )}
          {item.href ? (
            <a href={item.href} className="mw-breadcrumbs__link" style={light ? { color: 'rgba(255, 255, 255, 0.85)' } : undefined}>
              {item.label}
            </a>
          ) : (
            <span className="mw-breadcrumbs__current" aria-current="page" style={light ? { color: '#FFFFFF', fontWeight: 600 } : undefined}>
              {item.label}
            </span>
          )}
        </li>
      ))}
    </ol>
  );

  if (inHero) {
    return (
      <nav className="mw-breadcrumbs-in-hero" aria-label="Breadcrumb">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {navList}
      </nav>
    );
  }

  return (
    <nav className="mw-breadcrumbs-bar" aria-label="Breadcrumb">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container">
        {navList}
      </div>
    </nav>
  );
}
