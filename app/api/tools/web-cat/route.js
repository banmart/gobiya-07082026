import { NextResponse } from 'next/server';
import { checkRateLimit } from '../../../../lib/rate-limit';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get('domain');

  if (!domain) {
    return NextResponse.json({ error: 'Domain parameter is required' }, { status: 400 });
  }

  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
  if (!checkRateLimit(ip, 'web-cat', 2, 24)) {
    return NextResponse.json({ error: 'Rate limit exceeded', details: 'You have reached your limit of 2 searches per 24 hours for this tool.' }, { status: 429 });
  }

  try {
    const apiKey = process.env.WHOIS_XML_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API key is not configured' }, { status: 500 });
    }

    const url = `https://website-categorization.whoisxmlapi.com/api/v3?apiKey=${apiKey}&domainName=${encodeURIComponent(domain)}&outputFormat=JSON`;
    
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok || data.ErrorMessage) {
      return NextResponse.json({ 
        error: data.ErrorMessage?.msg || 'Failed to fetch Categorization data',
        details: `Upstream API responded with status ${response.status}`
      }, { status: response.ok ? 400 : response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Website Categorization Error:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch Website Categorization intelligence', 
      details: error.message 
    }, { status: 500 });
  }
}
