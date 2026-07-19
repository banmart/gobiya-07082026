import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get('domain');

  if (!domain) {
    return NextResponse.json({ error: 'Domain parameter is required' }, { status: 400 });
  }

  try {
    const response = await fetch(`https://api.whoisjson.com/v1/whois?domain=${encodeURIComponent(domain)}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.WHOISJSON_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Upstream API responded with status ${response.status}`);
    }

    const data = await response.json();
    
    // Transform raw schema into high-impact SEO metrics
    return NextResponse.json({
      domain: data.domain,
      available: data.statusAnalysis?.isAvailable || false,
      domainAgeDays: data.age?.days || 0,
      creationDate: data.creation_date,
      expirationDate: data.expiration_date,
      registrar: data.registrar?.name || 'Unknown',
      nameservers: data.name_servers || []
    });

  } catch (error) {
    console.error('Domain Lookup Error:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch domain intelligence', 
      details: error.message 
    }, { status: 500 });
  }
}
