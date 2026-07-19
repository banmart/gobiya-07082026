import { NextResponse } from 'next/server';
import { checkRateLimit } from '../../../../lib/rate-limit';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const emailSearch = searchParams.get('email');

  if (!emailSearch) {
    return NextResponse.json({ error: 'Email parameter is required' }, { status: 400 });
  }

  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
  if (!checkRateLimit(ip, 'email-verify', 2, 24)) {
    return NextResponse.json({ error: 'Rate limit exceeded', details: 'You have reached your limit of 2 searches per 24 hours for this tool.' }, { status: 429 });
  }

  try {
    const apiKey = process.env.WHOIS_XML_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API key is not configured' }, { status: 500 });
    }

    const url = `https://emailverification.whoisxmlapi.com/api/v3?apiKey=${apiKey}&emailAddress=${encodeURIComponent(emailSearch)}&outputFormat=JSON`;
    
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok || data.ErrorMessage) {
      return NextResponse.json({ 
        error: data.ErrorMessage?.msg || 'Failed to fetch Email Verification data',
        details: `Upstream API responded with status ${response.status}`
      }, { status: response.ok ? 400 : response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Email Verification Error:', error);
    return NextResponse.json({ 
      error: 'Failed to verify email address', 
      details: error.message 
    }, { status: 500 });
  }
}
