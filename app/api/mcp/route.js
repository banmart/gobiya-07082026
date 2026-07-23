import { createMcpHandler } from 'mcp-handler';
import { z } from 'zod';
import { checkRateLimit } from '../../../lib/rate-limit';
import { queryWhoisXml } from '../../../lib/whoisxml';
import { sendContactEmail, sendOnboardingEmail } from '../../../lib/leadForms';

// extra.requestInfo.headers values can be string | string[] | undefined
// (IsomorphicHeaders) — normalize to a single string the same way the REST
// routes read request.headers.get('x-forwarded-for').
function getCallerIp(extra) {
  const headers = extra?.requestInfo?.headers || {};
  const forwarded = headers['x-forwarded-for'];
  const value = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  return value || 'unknown';
}

function lookupResult(result) {
  if (!result.ok) {
    return { isError: true, content: [{ type: 'text', text: result.error }] };
  }
  return { content: [{ type: 'text', text: JSON.stringify(result.data, null, 2) }] };
}

function rateLimitedError(toolLabel) {
  return {
    isError: true,
    content: [{ type: 'text', text: `Rate limit exceeded for ${toolLabel} — try again later.` }],
  };
}

const handler = createMcpHandler(
  (server) => {
    server.registerTool(
      'dns_lookup',
      {
        title: 'DNS Lookup',
        description: 'Look up DNS records (A, MX, TXT, NS, and more) for a domain.',
        inputSchema: { domain: z.string().min(1) },
      },
      async ({ domain }, extra) => {
        if (!checkRateLimit(getCallerIp(extra), 'dns-lookup', 2, 24)) return rateLimitedError('dns_lookup');
        return lookupResult(await queryWhoisXml('dns', domain));
      }
    );

    server.registerTool(
      'email_verification',
      {
        title: 'Email Verification',
        description: 'Verify whether an email address is valid, deliverable, and not disposable.',
        inputSchema: { email: z.string().min(1) },
      },
      async ({ email }, extra) => {
        if (!checkRateLimit(getCallerIp(extra), 'email-verify', 2, 24)) return rateLimitedError('email_verification');
        return lookupResult(await queryWhoisXml('emailVerify', email));
      }
    );

    server.registerTool(
      'ip_geolocation',
      {
        title: 'IP Geolocation',
        description: 'Look up the geographic location and ISP for an IP address.',
        inputSchema: { ip: z.string().min(1) },
      },
      async ({ ip }, extra) => {
        if (!checkRateLimit(getCallerIp(extra), 'ip-geo', 2, 24)) return rateLimitedError('ip_geolocation');
        return lookupResult(await queryWhoisXml('ipGeo', ip));
      }
    );

    server.registerTool(
      'domain_reputation',
      {
        title: 'Domain Reputation',
        description: "Check a domain's reputation score and any known risk signals.",
        inputSchema: { domain: z.string().min(1) },
      },
      async ({ domain }, extra) => {
        if (!checkRateLimit(getCallerIp(extra), 'domain-rep', 2, 24)) return rateLimitedError('domain_reputation');
        return lookupResult(await queryWhoisXml('reputation', domain));
      }
    );

    server.registerTool(
      'ssl_certificate_lookup',
      {
        title: 'SSL Certificate Lookup',
        description: "Look up a domain's current and historical SSL/TLS certificates.",
        inputSchema: { domain: z.string().min(1) },
      },
      async ({ domain }, extra) => {
        if (!checkRateLimit(getCallerIp(extra), 'ssl-certs', 2, 24)) return rateLimitedError('ssl_certificate_lookup');
        return lookupResult(await queryWhoisXml('ssl', domain));
      }
    );

    server.registerTool(
      'threat_intelligence',
      {
        title: 'Threat Intelligence',
        description: 'Check a domain against threat intelligence feeds for malware, phishing, or spam signals.',
        inputSchema: { domain: z.string().min(1) },
      },
      async ({ domain }, extra) => {
        if (!checkRateLimit(getCallerIp(extra), 'threat-intel', 2, 24)) return rateLimitedError('threat_intelligence');
        return lookupResult(await queryWhoisXml('threat', domain));
      }
    );

    server.registerTool(
      'website_categorization',
      {
        title: 'Website Categorization',
        description: "Get a website's industry/content category classification.",
        inputSchema: { url: z.string().min(1) },
      },
      async ({ url }, extra) => {
        if (!checkRateLimit(getCallerIp(extra), 'web-cat', 2, 24)) return rateLimitedError('website_categorization');
        return lookupResult(await queryWhoisXml('webCat', url));
      }
    );

    server.registerTool(
      'contact_gobiya',
      {
        title: 'Contact Gobiya',
        description: 'Send a message to Gobiya on behalf of someone who wants to reach a human at the agency.',
        inputSchema: {
          name: z.string().min(1),
          email: z.string().min(1),
          message: z.string().optional(),
          phone: z.string().optional(),
        },
      },
      async ({ name, email, message, phone }, extra) => {
        if (!checkRateLimit(getCallerIp(extra), 'mcp-contact', 5, 24)) return rateLimitedError('contact_gobiya');
        const result = await sendContactEmail({ name, email, message, phone, currentPage: 'MCP tool call' });
        if (!result.ok) return { isError: true, content: [{ type: 'text', text: result.error }] };
        return { content: [{ type: 'text', text: 'Message sent to Gobiya. Someone will follow up by email.' }] };
      }
    );

    server.registerTool(
      'request_seo_audit',
      {
        title: 'Request an SEO/AI-Visibility Audit',
        description: 'Submit a request for a free SEO and AI-visibility audit on behalf of a business owner.',
        inputSchema: {
          name: z.string().min(1),
          email: z.string().min(1),
          phone: z.string().optional(),
          company: z.string().optional(),
          website: z.string().optional(),
          industry: z.string().optional(),
          goal: z.string().optional(),
          challenges: z.array(z.string()).optional(),
          budget: z.string().optional(),
          timeline: z.string().optional(),
          notes: z.string().optional(),
        },
      },
      async (args, extra) => {
        if (!checkRateLimit(getCallerIp(extra), 'mcp-onboarding', 5, 24)) return rateLimitedError('request_seo_audit');
        const result = await sendOnboardingEmail(args);
        if (!result.ok) return { isError: true, content: [{ type: 'text', text: result.error }] };
        return { content: [{ type: 'text', text: 'Audit request sent to Gobiya. Someone will follow up by email.' }] };
      }
    );
  },
  { serverInfo: { name: 'gobiya-mcp', version: '1.0.0' } },
  { basePath: '/api', disableSse: true, maxDuration: 60 }
);

export const maxDuration = 60;
export { handler as GET, handler as POST };
