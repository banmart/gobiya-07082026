const BASE_URL = 'https://www.gobiya.com';

export default function Breadcrumbs({ items }) {
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

  return (
    <nav className="mw-breadcrumbs-bar" aria-label="Breadcrumb">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container">
        <ol className="mw-breadcrumbs__list">
          {items.map((item, idx) => (
            <li key={item.label} className="mw-breadcrumbs__item">
              {idx > 0 && <span className="mw-breadcrumbs__sep">&gt;</span>}
              {item.href ? (
                <a href={item.href} className="mw-breadcrumbs__link">
                  {item.label}
                </a>
              ) : (
                <span className="mw-breadcrumbs__current" aria-current="page">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
