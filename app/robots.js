export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard', '/admin', '/login', '/forgot', '/set-password', '/auth', '/api/'],
      },
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'PerplexityBot',
          'ClaudeBot',
          'Claude-Web',
          'Google-Extended',
          'Anthropic-ai',
          'Bytespider',
          'CCBot',
        ],
        allow: '/',
        disallow: ['/dashboard', '/admin', '/login', '/forgot', '/set-password', '/auth', '/api/'],
      },
    ],
    sitemap: 'https://www.gobiya.com/sitemap.xml',
  };
}
