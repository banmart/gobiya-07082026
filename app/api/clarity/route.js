import { NextResponse } from 'next/server';
import { fetchClarityInsights } from '../../../lib/clarity';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token') || process.env.CLARITY_API_TOKEN;
  const days = parseInt(searchParams.get('days') || '3', 10);

  if (!token) {
    return NextResponse.json(
      { error: 'No Clarity API token provided or configured in environment variables.' },
      { status: 400 }
    );
  }

  const data = await fetchClarityInsights(token, days);

  if (!data) {
    return NextResponse.json(
      { error: 'Failed to fetch insights from Microsoft Clarity API. Check token validity or rate limits.' },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true, data });
}
