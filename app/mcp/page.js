import { buildMetadata } from '../../lib/meta';
import CopyButton from '../../components/CopyButton';
import Breadcrumbs from '../../components/Breadcrumbs';

export const metadata = buildMetadata({
  title: 'MCP Server for AI Agents | Free Tools, No API Key | Gobiya',
  description:
    "An MCP server your AI agent can call today — free SEO and domain lookup tools, lead-gen forms, and our full content library. One URL, no API key.",
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

      {/* The page carried no h1 — it opened on the "One URL" h2. The heading
          and the line under it are the page's only prose above the fold, so
          they carry the keyword. */}
      <section className="page-hero section" style={{ paddingBottom: '2rem' }}>
        <div className="container container--narrow">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'MCP Server' }]} />
          <h1 className="statement">An MCP Server Your AI Agent Can Call Today</h1>
          <p className="lede">
            Gobiya&rsquo;s public MCP server gives any Model Context Protocol client
            nine live tools &mdash; DNS, WHOIS, SSL, reputation, threat and
            categorisation lookups, plus our lead forms and full content library.
            One URL, no API key, no account.
          </p>
        </div>
      </section>

      <section className="section section--tint" id="connect">
        <div className="container container--narrow">
          <h2 className="statement statement--small">One URL, no API key required.</h2>
          <p className="lede">Streamable HTTP transport, live at:</p>
          <div className="code-block">
            <pre style={{ background: 'var(--overlay)', color: '#f4f7fb', padding: '1.25rem 1.5rem', paddingRight: '6rem', overflowX: 'auto', fontSize: '0.9rem' }}>{MCP_URL}</pre>
            <CopyButton text={MCP_URL} />
          </div>
          <p className="lede">Claude Desktop, Cursor, and other MCP-client config:</p>
          <div className="code-block">
            <pre style={{ background: 'var(--overlay)', color: '#f4f7fb', padding: '1.25rem 1.5rem', paddingRight: '6rem', overflowX: 'auto', fontSize: '0.85rem' }}>{CONFIG_SNIPPET}</pre>
            <CopyButton text={CONFIG_SNIPPET} />
          </div>
          <p className="lede">Or call it directly:</p>
          <div className="code-block">
            <pre style={{ background: 'var(--overlay)', color: '#f4f7fb', padding: '1.25rem 1.5rem', paddingRight: '6rem', overflowX: 'auto', fontSize: '0.85rem' }}>{CURL_SNIPPET}</pre>
            <CopyButton text={CURL_SNIPPET} />
          </div>
        </div>
      </section>

      <section className="section" id="tools">
        <div className="container">
          <h2 className="statement statement--small" style={{ textAlign: 'left' }}>9 callable actions — 7 free lookups, 2 ways to reach us.</h2>
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
          <h2 className="statement statement--small">Browse our content directly, not just links to it.</h2>
          <p className="lede">Every <a href="/insights">insights article</a>, <a href="/work">client case study</a>, and <a href="/services">consulting service page</a> on this site is also exposed as a readable MCP resource — <code>gobiya://insights/{'{slug}'}</code>, <code>gobiya://work/{'{slug}'}</code>, and <code>gobiya://services/{'{slug}'}</code> — so an agent can read the actual content, not just crawl the HTML.</p>
        </div>
      </section>


      <section className="section" id="also">
        <div className="container container--narrow" style={{ textAlign: 'center' }}>
          <p className="lede">Plain-text crawlers and AI systems that don&apos;t speak MCP can still read <a href="/llms.txt">/llms.txt</a> for a lighter-weight summary of this site.</p>
        </div>
      </section>

    </main>
  );
}
