#!/usr/bin/env node
// Minimal MCP regression check: connects to a running dev server's MCP
// endpoint, lists tools/resources, and calls one representative example of
// each. Not a full test suite — this repo has none — just enough to catch
// integration breakage in app/api/mcp/route.js before it ships.
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';

const BASE_URL = process.env.MCP_URL || 'http://localhost:3000/api/mcp';

async function main() {
  const client = new Client({ name: 'gobiya-mcp-smoke-test', version: '1.0.0' });
  const transport = new StreamableHTTPClientTransport(new URL(BASE_URL));
  await client.connect(transport);

  const { tools } = await client.listTools();
  console.log(`tools/list: ${tools.length} tools —`, tools.map((t) => t.name).join(', '));
  if (tools.length !== 9) throw new Error(`Expected 9 tools, got ${tools.length}`);

  const { resources } = await client.listResources();
  console.log(`resources/list: ${resources.length} resources`);
  if (resources.length === 0) throw new Error('Expected at least 1 resource, got 0');

  const dnsResult = await client.callTool({ name: 'dns_lookup', arguments: { domain: 'gobiya.com' } });
  console.log('dns_lookup ->', dnsResult.isError ? `isError: ${dnsResult.content[0].text}` : 'ok');

  const sampleUri = resources.find((r) => r.uri.startsWith('gobiya://services/'))?.uri;
  if (!sampleUri) throw new Error('Expected at least one gobiya://services/ resource');
  const readResult = await client.readResource({ uri: sampleUri });
  console.log(`readResource(${sampleUri}) -> ${readResult.contents[0].text.slice(0, 60)}...`);

  await client.close();
  console.log('All checks passed.');
}

main().catch((err) => {
  console.error('MCP smoke test failed:', err);
  process.exit(1);
});
