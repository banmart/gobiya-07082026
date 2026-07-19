import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { domain } = await request.json();

    if (!domain) {
      return NextResponse.json({ error: 'Domain is required' }, { status: 400 });
    }

    const apiKey = process.env.WHOIS_XML_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API key is not configured' }, { status: 500 });
    }

    const url = `https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=${apiKey}&domainName=${encodeURIComponent(domain)}&outputFormat=JSON`;
    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: data.ErrorMessage?.msg || 'Failed to fetch WHOIS data' }, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error('WHOIS API Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
