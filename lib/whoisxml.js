// Shared WhoisXML API client for the 7 free lookup tools under app/api/tools/*
// and their MCP tool equivalents in app/api/mcp/route.js. Each tool differed
// only in upstream host, query param name, and optional extra params — this
// collapses that into one config map plus one fetch/error-normalization
// function, so both callers share one code path instead of two copies of it.

const ENDPOINTS = {
  dns: {
    host: 'https://www.whoisxmlapi.com/whoisserver/DNSService',
    param: 'domainName',
    extra: { type: '_all' },
  },
  emailVerify: {
    host: 'https://emailverification.whoisxmlapi.com/api/v3',
    param: 'emailAddress',
  },
  ipGeo: {
    host: 'https://ip-geolocation.whoisxmlapi.com/api/v1',
    param: 'ipAddress',
  },
  reputation: {
    host: 'https://domain-reputation.whoisxmlapi.com/api/v2',
    param: 'domainName',
    extra: { mode: 'fast' },
  },
  ssl: {
    host: 'https://ssl-certificates.whoisxmlapi.com/api/v1',
    param: 'domainName',
  },
  threat: {
    host: 'https://threat-intelligence.whoisxmlapi.com/api/v1',
    param: 'domainName',
  },
  webCat: {
    host: 'https://website-categorization.whoisxmlapi.com/api/v3',
    param: 'domainName',
  },
};

// Returns { ok: true, status: 200, data } on success, or
// { ok: false, status, error } on missing key, upstream error, or network error.
export async function queryWhoisXml(toolId, value) {
  const cfg = ENDPOINTS[toolId];
  if (!cfg) {
    return { ok: false, status: 500, error: `Unknown WhoisXML tool: ${toolId}` };
  }

  const apiKey = process.env.WHOIS_XML_API_KEY;
  if (!apiKey) {
    return { ok: false, status: 500, error: 'API key is not configured' };
  }

  const params = new URLSearchParams({
    apiKey,
    [cfg.param]: value,
    outputFormat: 'JSON',
    ...(cfg.extra || {}),
  });

  try {
    const response = await fetch(`${cfg.host}?${params.toString()}`);
    const data = await response.json();

    if (!response.ok || data.ErrorMessage) {
      return {
        ok: false,
        status: response.ok ? 400 : response.status,
        error: data.ErrorMessage?.msg || `Failed to fetch ${toolId} data`,
      };
    }

    return { ok: true, status: 200, data };
  } catch (error) {
    return { ok: false, status: 500, error: error.message };
  }
}
