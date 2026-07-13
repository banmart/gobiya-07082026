// Shared page-metadata builder: canonical URL + Open Graph + Twitter Card.
// Every page exports metadata through this so social shares render a card and
// every URL declares its own canonical. `path` is the site-relative route
// ('' for home); absolute URLs resolve against metadataBase in app/layout.js.

export const SITE_NAME = 'Gobiya';
export const DEFAULT_TITLE = 'Gobiya — Web & AI SEO Agency, Los Angeles';
export const OG_IMAGE = {
  url: '/assets/img/og-default.jpg',
  width: 1200,
  height: 630,
  alt: 'Gobiya — Technical SEO & AI Visibility, Los Angeles',
};

export function buildMetadata({ title, description, path, robots }) {
  const ogTitle = title ? `${title} — ${SITE_NAME}` : DEFAULT_TITLE;
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path || '/' },
    openGraph: {
      title: ogTitle,
      description,
      url: path || '/',
      siteName: SITE_NAME,
      locale: 'en_US',
      type: 'website',
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description,
    },
    ...(robots ? { robots } : {}),
  };
}
