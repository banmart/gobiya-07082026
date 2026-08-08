// Converts this site's existing structured content (lib/insights.js,
// lib/work.js, lib/services.js/servicesFlat.js) into Markdown for the MCP
// server's resources/read, and enumerates all of it for resources/list.
// No new content — every field here already exists and is rendered
// elsewhere on the site; this just serializes it differently.

import { INSIGHTS, getInsight } from './insights';
import { CASE_STUDIES } from './work';
import { CONSULTING_ITEMS } from './consultingIndex';
import { SERVICES } from './services';
import { SERVICES_FLAT } from './servicesFlat';

function stripTags(value) {
  return String(value).replace(/<[^>]+>/g, '');
}

function bodyToMarkdown(body) {
  if (!Array.isArray(body)) return '';
  return body
    .map((section) => {
      const heading = section.heading ? `## ${section.heading}\n\n` : '';
      const paragraphs = (section.paragraphs || [])
        .map((p) => {
          if (p && typeof p === 'object' && p.type === 'table') {
            const header = `| ${p.headers.join(' | ')} |`;
            const divider = `| ${p.headers.map(() => '---').join(' | ')} |`;
            const rows = p.rows.map((r) => `| ${r.map(stripTags).join(' | ')} |`).join('\n');
            return `${header}\n${divider}\n${rows}`;
          }
          return stripTags(p);
        })
        .join('\n\n');
      return `${heading}${paragraphs}`;
    })
    .join('\n\n');
}

function findService(slug) {
  return Object.values(SERVICES).find((s) => s.slug === slug) || Object.values(SERVICES_FLAT).find((s) => s.slug === slug);
}

export function listMcpResources() {
  const insights = INSIGHTS.map((a) => ({
    uri: `gobiya://insights/${a.slug}`,
    name: a.title,
    description: a.dek,
    mimeType: 'text/markdown',
  }));

  const work = CASE_STUDIES.filter((c) => c.study).map((c) => ({
    uri: `gobiya://work/${c.slug}`,
    name: c.client,
    description: c.result,
    mimeType: 'text/markdown',
  }));

  const services = CONSULTING_ITEMS.map((s) => ({
    uri: `gobiya://services/${s.slug}`,
    name: s.title,
    description: s.desc,
    mimeType: 'text/markdown',
  }));

  return [...insights, ...work, ...services];
}

export function readMcpResource(uri) {
  const match = /^gobiya:\/\/(insights|work|services)\/(.+)$/.exec(uri);
  if (!match) return null;
  const [, kind, slug] = match;

  if (kind === 'insights') {
    const article = getInsight(slug);
    if (!article) return null;
    return `# ${article.title}\n\n${article.dek}\n\n${bodyToMarkdown(article.body)}`;
  }

  if (kind === 'work') {
    const study = CASE_STUDIES.find((c) => c.slug === slug && c.study);
    if (!study) return null;
    return `# ${study.client} — ${study.result}\n\n${study.study.dek}\n\n${bodyToMarkdown(study.study.body)}`;
  }

  if (kind === 'services') {
    const service = findService(slug);
    if (!service) return null;
    const desc = service.blurb || service.metaDescription || service.intro || '';
    const capabilities = (service.capabilities || []).map((c) => `- **${c.title}**: ${c.desc}`).join('\n');
    return `# ${service.title}\n\n${stripTags(desc)}\n\n## What's included\n\n${capabilities}`;
  }

  return null;
}
