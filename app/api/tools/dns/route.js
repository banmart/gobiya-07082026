import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get('domain');

  if (!domain) {
    return NextResponse.json({ error: 'Domain parameter is required' }, { status: 400 });
  }

  try {
    const apiKey = process.env.WHOIS_XML_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API key is not configured' }, { status: 500 });
    }

    // WhoisXML DNS API endpoint
    const url = `https://www.whoisxmlapi.com/whoisserver/DNSService?apiKey=${apiKey}&domainName=${encodeURIComponent(domain)}&type=_all&outputFormat=JSON`;
    
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok || data.ErrorMessage) {
      return NextResponse.json({ 
        error: data.ErrorMessage?.msg || 'Failed to fetch DNS data',
        details: `Upstream API responded with status ${response.status}`
      }, { status: response.ok ? 400 : response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('DNS Lookup Error:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch DNS intelligence', 
      details: error.message 
    }, { status: 500 });
  }
}
