import { buildMetadata } from '../../lib/meta';
import CopyButton from '../../components/CopyButton';

export const metadata = buildMetadata({
  title: 'MCP Server for AI Agents | Gobiya',
  description:
    "Gobiya's public MCP server — free SEO/domain lookup tools, lead-gen forms, and our full content library, callable by any Model Context Protocol client.",
  path: '/mcp',
});

const MCP_URL = 'https://www.gobiya.com/api/mcp';

const TOOLS = [
  { name: 'dns_lookup', tag: 'Lookup', desc: 'DNS records (A, MX, TXT, NS, and more) for a domain.' },
  { name: 'email_verification', tag: 'Lookup', desc: 'Whether an email address is valid, deliverable, and not disposable.' },
  { name: 'ip_geolocation', tag: 'Lookup', desc: 'Geographic location and ISP for an IP address.' },
  { name: 'domain_reputation', tag: 'Lookup', desc: "A domain's reputation score and known risk signals." },
  { name: 'ssl_certificate_lookup', tag: 'Lookup', desc: "A domain's current and historical SSL/TLS certificates." },
  { name: 'threat_intelligence', tag: 'Lookup', desc: 'Malware, phishing, and spam signals for a domain.' },
  { name: 'website_categorization', tag: 'Lookup', desc: "A website's industry/content category classification." },
  { name: 'contact_gobiya', tag: 'Action', desc: 'Send a message to a human at Gobiya.' },
  { name: 'request_seo_audit', tag: 'Action', desc: 'Request a free SEO / AI-visibility audit.' },
];

const CONFIG_SNIPPET = `{
  "mcpServers": {
    "gobiya": {
      "url": "${MCP_URL}"
    }
  }
}`;

const CURL_SNIPPET = `curl -X POST ${MCP_URL} \\
  -H "Content-Type: application/json" \\
  -H "Accept: application/json, text/event-stream" \\
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}'`;

export default function McpPage() {
  return (
    <main id="top">

      <section className="page-hero page-hero--left section" style={{ paddingBottom: '3rem' }}>
        <div className="container">
          <p className="eyebrow" data-reveal><span className="eyebrow__dot"></span>For AI Agents &amp; Developers</p>
          <h1 className="statement" style={{ textAlign: 'left', marginInline: 0 }} data-split>A search agency your own AI agent can talk to.</h1>
          <p className="lede" style={{ marginInline: 0 }} data-reveal>Gobiya runs a public MCP (Model Context Protocol) server — free domain and security lookup tools, a way to reach us directly, and our full library of SEO/GEO content, all callable by any MCP client. Not a page about AI visibility. An actual endpoint an AI agent can use.</p>
        </div>
      </section>

      <section className="section section--tint" id="connect">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>Connect</p>
          <h2 className="statement statement--small" data-split>One URL, no API key required.</h2>
          <p className="lede" data-reveal>Streamable HTTP transport, live at:</p>
          <div className="code-block">
            <pre style={{ background: 'var(--overlay)', color: '#f4f7fb', padding: '1.25rem 1.5rem', paddingRight: '6rem', overflowX: 'auto', fontSize: '0.9rem' }}>{MCP_URL}</pre>
            <CopyButton text={MCP_URL} />
          </div>
          <p className="lede" data-reveal>Claude Desktop, Cursor, and other MCP-client config:</p>
          <div className="code-block">
            <pre style={{ background: 'var(--overlay)', color: '#f4f7fb', padding: '1.25rem 1.5rem', paddingRight: '6rem', overflowX: 'auto', fontSize: '0.85rem' }}>{CONFIG_SNIPPET}</pre>
            <CopyButton text={CONFIG_SNIPPET} />
          </div>
          <p className="lede" data-reveal>Or call it directly:</p>
          <div className="code-block">
            <pre style={{ background: 'var(--overlay)', color: '#f4f7fb', padding: '1.25rem 1.5rem', paddingRight: '6rem', overflowX: 'auto', fontSize: '0.85rem' }}>{CURL_SNIPPET}</pre>
            <CopyButton text={CURL_SNIPPET} />
          </div>
        </div>
      </section>

      <section className="section" id="tools">
        <div className="container">
          <p className="eyebrow" data-reveal><span className="eyebrow__dot"></span>Tools</p>
          <h2 className="statement statement--small" data-split style={{ textAlign: 'left' }}>9 callable actions — 7 free lookups, 2 ways to reach us.</h2>
          <div className="svc-grid">
            {TOOLS.map((t) => (
              <div className="svc-card" key={t.name}>
                <span className="svc-card__tag">{t.tag}</span>
                <h3 className="svc-card__title">{t.name}</h3>
                <p className="svc-card__desc">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tint" id="resources">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>Resources</p>
          <h2 className="statement statement--small" data-split>Browse our content directly, not just links to it.</h2>
          <p className="lede" data-reveal>Every <a href="/insights">insights article</a>, <a href="/work">client case study</a>, and <a href="/services">consulting service page</a> on this site is also exposed as a readable MCP resource — <code>gobiya://insights/{'{slug}'}</code>, <code>gobiya://work/{'{slug}'}</code>, and <code>gobiya://services/{'{slug}'}</code> — so an agent can read the actual content, not just crawl the HTML.</p>
        </div>
      </section>

      <section className="section" id="also">
        <div className="container container--narrow" style={{ textAlign: 'center' }}>
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>Not an MCP client?</p>
          <p className="lede" data-reveal>Plain-text crawlers and AI systems that don&apos;t speak MCP can still read <a href="/llms.txt">/llms.txt</a> for a lighter-weight summary of this site.</p>
        </div>
      </section>

    </main>
  );
}
