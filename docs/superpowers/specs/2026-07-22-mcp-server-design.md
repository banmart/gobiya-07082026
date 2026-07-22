# MCP Server + `/mcp` Page — Design Spec

Date: 2026-07-22

## Purpose

Expose Gobiya's free lookup tools, lead-gen forms, and content library (insights, case studies,
services) to AI agents via a real Model Context Protocol (MCP) server, plus a human-facing `/mcp`
page documenting how to connect. This extends the site's existing GEO/AI-visibility positioning
(`public/llms.txt`, the AI-platform iconography, the "be the answer AI gives" homepage copy) from
descriptive machine-readability to an actually-callable interface.

## Decisions already made (via user Q&A)

- Real, working MCP server (not just a documentation page) — an agent must be able to connect and
  call it, not just read about it.
- All 7 existing free tools (`app/api/tools/*`) are exposed as MCP tools.
- 2 lead-gen forms are exposed as MCP tools: the quick-contact flow and the onboarding/audit-request
  flow. No other forms.
- 3 content types are exposed as MCP resources: insights articles, `/work` case studies, and
  consulting service pages. Full sitemap-style breadth, not just a company-profile summary.
- Anti-abuse for the 2 form tools: no honeypot equivalent (doesn't apply to a programmatic caller) —
  reuse the existing name/email presence + email-format validation, plus a per-IP rate limit via the
  existing `checkRateLimit` helper (proposed 5/24h, looser than the lookup tools since legitimate
  agent use is lower-volume than a scraping loop).
- A stray legacy redirect (`{ source: '/mcp', destination: '/ai-visibility', permanent: true }` in
  `next.config.mjs`) was found and removed during this session — it would otherwise have made the
  new `/mcp` page unreachable, since `next.config.mjs` redirects are evaluated before routing to any
  page or route handler.

## Architecture

**Transport:** [`mcp-handler`](https://www.npmjs.com/package/mcp-handler) (Vercel Labs' official
Next.js adapter, currently 1.1.0) + `@modelcontextprotocol/sdk` (currently 1.29.0) as its peer
dependency, mounted as a Streamable-HTTP endpoint.

**Two separate routes, not one** — Next.js does not allow a `page.js` and a `route.js` to occupy the
same path, which conveniently forces the right separation anyway:
- `app/api/mcp/route.js` — the actual protocol endpoint agents connect to (`https://www.gobiya.com/api/mcp`).
- `app/mcp/page.js` — the human-facing documentation page, following the site's existing
  institutional page template (hero + sections, navy/carmine, hairline rules — no new visual system).

An approach considered and rejected: hand-rolling a minimal JSON-RPC 2.0 handler with zero new
dependencies. Rejected because MCP's spec has enough edge cases (capability negotiation,
notifications, error codes, initialize handshake) that reimplementing it risks subtle
incompatibility with real clients for no real benefit — the official SDK is actively maintained and
handles this correctly.

**Supporting refactor:** all 7 existing tool routes under `app/api/tools/*` duplicate the same
fetch/error-handling logic against WhoisXML's API (only the endpoint URL and query param name
differ). Since the new MCP tools need this exact logic too, extract it into one
`lib/whoisxml.js` helper (`queryWhoisXml(toolId, value)`, returning a normalized
`{ ok, status, data }` or error shape) that both the existing REST routes and the new MCP tools
call — removing duplication rather than adding a second copy of it. While in this code: add the
per-IP rate-limit check to `app/api/tools/threat/route.js`, which is currently missing it (the
other 6 routes all have it — an existing inconsistency, not a new decision).

## Tools (9 callable actions)

Lookup tools — thin wrappers around `lib/whoisxml.js`, same 2-calls/24h rate limit as today
(keyed by caller IP where the transport exposes it):

| MCP tool name | Input | Wraps |
|---|---|---|
| `dns_lookup` | `domain` | `/api/tools/dns` |
| `email_verification` | `email` | `/api/tools/email-verify` |
| `ip_geolocation` | `ip` | `/api/tools/ip-geo` |
| `domain_reputation` | `domain` | `/api/tools/reputation` |
| `ssl_certificate_lookup` | `domain` | `/api/tools/ssl` |
| `threat_intelligence` | `domain` | `/api/tools/threat` |
| `website_categorization` | `url` | `/api/tools/web-cat` |

Form tools — same validation logic as the existing Resend-based routes, 5-calls/24h rate limit:

- `contact_gobiya({ name, email, message, phone? })` — wraps the quick-contact flow (`app/api/quick-contact/route.js`).
- `request_seo_audit({ name, email, website?, company?, industry?, goal?, challenges?, budget?, timeline?, notes? })` — wraps the onboarding flow (`app/api/onboarding/route.js`).

**Error handling:** every tool returns MCP's `isError: true` result shape (with a readable message)
on upstream failure, rate limit, or missing API key — never an unhandled throw — so a calling agent
gets a legible response instead of a broken connection.

## Resources (content an agent can list/read)

Three URI namespaces, backed entirely by existing `lib/` data — no new content:

| URI pattern | Source | Approx. count |
|---|---|---|
| `gobiya://insights/{slug}` | `lib/insights.js` (`INSIGHTS`, via existing `getInsight(slug)`) | ~40+ |
| `gobiya://work/{slug}` | `lib/work.js` (`CASE_STUDIES`, entries with a `study` object only) | ~8-10 |
| `gobiya://services/{slug}` | List from `lib/consultingIndex.js` (`CONSULTING_ITEMS`); full body from `lib/services.js`/`lib/servicesFlat.js` | 9 |

A new small serializer (`lib/mcpResources.js` or similar) converts each entry's existing
`body: [{ heading, paragraphs }]` structure (including the occasional embedded `{ type: 'table' }`
block) into clean Markdown text for the `resources/read` result.

`resources/list` returns all ~60 resources in one unpaginated response. That's on the high side for
a single response, but within what MCP clients handle in practice; the SDK's cursor-based pagination
is more machinery than this content volume currently justifies. Revisit if the content library grows
substantially (e.g. past a few hundred entries).

## The `/mcp` page

Follows the existing institutional page template — no new aesthetic:

- **Hero:** eyebrow "For AI Agents & Developers"; H1 in the vein of "A search agency your own AI
  agent can talk to" — the homepage's "be the answer AI gives" positioning, applied literally.
- **Connect section:** the live endpoint URL, a copyable Claude Desktop/Cursor-style JSON config
  snippet, and a one-line `curl` example.
- **Tools grid:** reuses the `svc-card` pattern (including the hand-drawn icon set where a fitting
  icon already exists) to list all 9 tools with a one-line description each.
- **Resources section:** explains the 3 content namespaces.
- **Link to `/llms.txt`** as the lighter-weight alternative for crawlers that don't speak MCP.

## Redirects (`next.config.mjs`)

Removed: `{ source: '/mcp', destination: '/ai-visibility', permanent: true }` — a leftover from an
earlier site-cleanup pass, now superseded by an actual `/mcp` page. Confirmed it was a standalone
entry, not part of a shared/grouped rule, before removing it.

## Testing / verification

No test framework in this repo (established pattern this session) — manual + one small script:

- A minimal test script (e.g. `scripts/test-mcp.mjs`) that spins up a local MCP client against the
  running dev server, calls `tools/list` and `resources/list`, and calls one representative tool and
  one representative resource read — enough to catch integration breakage without introducing a full
  test framework.
- Manual `curl` against `/api/mcp` with a raw `initialize` + `tools/list` JSON-RPC payload.
- Load `/mcp` in the browser; confirm the connect snippet and tools/resources sections render.
- Confirm the 7 existing `/api/tools/*` REST routes still behave identically after the
  `lib/whoisxml.js` refactor (same success/error/rate-limit responses as before).
- Confirm `/mcp` returns 200 (no longer redirects to `/ai-visibility`).
