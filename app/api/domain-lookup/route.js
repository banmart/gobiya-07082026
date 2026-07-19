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
      return NextResponse.json({ error: 'API key is not configured. Please add WHOIS_XML_API_KEY to your environment variables.' }, { status: 500 });
    }

    const url = `https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=${apiKey}&domainName=${encodeURIComponent(domain)}&outputFormat=JSON`;
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ 
        error: data.ErrorMessage?.msg || 'Failed to fetch WHOIS data',
        details: `Upstream API responded with status ${response.status}`
      }, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Domain Lookup Error:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch domain intelligence', 
      details: error.message 
    }, { status: 500 });
  }
}
