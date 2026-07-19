import { NextResponse } from 'next/server';
import { checkRateLimit } from '../../../../lib/rate-limit';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const ipSearch = searchParams.get('ip');

  if (!ipSearch) {
    return NextResponse.json({ error: 'IP parameter is required' }, { status: 400 });
  }

  const clientIp = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
  if (!checkRateLimit(clientIp, 'ip-geo', 2, 24)) {
    return NextResponse.json({ error: 'Rate limit exceeded', details: 'You have reached your limit of 2 searches per 24 hours for this tool.' }, { status: 429 });
  }

  try {
    const apiKey = process.env.WHOIS_XML_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API key is not configured' }, { status: 500 });
    }

    const url = `https://ip-geolocation.whoisxmlapi.com/api/v1?apiKey=${apiKey}&ipAddress=${encodeURIComponent(ipSearch)}&outputFormat=JSON`;
    
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok || data.ErrorMessage) {
      return NextResponse.json({ 
        error: data.ErrorMessage?.msg || 'Failed to fetch IP data',
        details: `Upstream API responded with status ${response.status}`
      }, { status: response.ok ? 400 : response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('IP Geolocation Error:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch IP intelligence', 
      details: error.message 
    }, { status: 500 });
  }
}
