import { NextResponse } from 'next/server';
import { checkRateLimit } from '../../../../lib/rate-limit';
import { queryWhoisXml } from '../../../../lib/whoisxml';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get('domain');

  if (!domain) {
    return NextResponse.json({ error: 'Domain parameter is required' }, { status: 400 });
  }

  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
  if (!checkRateLimit(ip, 'ssl-certs', 2, 24)) {
    return NextResponse.json({ error: 'Rate limit exceeded', details: 'You have reached your limit of 2 searches per 24 hours for this tool.' }, { status: 429 });
  }

  const result = await queryWhoisXml('ssl', domain);
  if (!result.ok) {
    return NextResponse.json({ error: result.error, details: `Upstream API responded with status ${result.status}` }, { status: result.status });
  }
  return NextResponse.json(result.data);
}
