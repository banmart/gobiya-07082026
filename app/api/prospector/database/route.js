import { NextResponse } from 'next/server';
import { listProspects } from '../../../../lib/prospector';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || 'All Status';
    const category = searchParams.get('category') || 'All Categories';
    const limit = parseInt(searchParams.get('limit') || '25', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    const result = await listProspects({ search, status, category, limit, offset });
    return NextResponse.json(result);
  } catch (err) {
    console.error('Database prospect search API error:', err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
