export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard', '/admin', '/login', '/forgot', '/set-password', '/auth'],
    },
    sitemap: 'https://www.gobiya.com/sitemap.xml',
  };
}
