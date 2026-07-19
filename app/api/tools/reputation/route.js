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

    const url = `https://domain-reputation.whoisxmlapi.com/api/v2?apiKey=${apiKey}&domainName=${encodeURIComponent(domain)}&mode=fast&outputFormat=JSON`;
    
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok || data.ErrorMessage) {
      return NextResponse.json({ 
        error: data.ErrorMessage?.msg || 'Failed to fetch Reputation data',
        details: `Upstream API responded with status ${response.status}`
      }, { status: response.ok ? 400 : response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Domain Reputation Error:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch Reputation intelligence', 
      details: error.message 
    }, { status: 500 });
  }
}
