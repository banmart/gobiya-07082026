import { NextResponse } from 'next/server';
import { listProspects, deleteProspects, deleteProspectsByFilter } from '@/lib/prospector';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || 'All Status';
    const category = searchParams.get('category') || 'All Categories';
    const source = searchParams.get('source') || 'All Sources';
    const limit = parseInt(searchParams.get('limit') || '25', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    const result = await listProspects({ search, status, category, source, limit, offset });
    return NextResponse.json(result);
  } catch (err) {
    console.error('Database prospect search API error:', err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const body = await request.json();
    const { ids, search, status, category, source } = body;

    if (Array.isArray(ids) && ids.length > 0) {
      const result = await deleteProspects(ids);
      return NextResponse.json(result, { status: result.ok ? 200 : 500 });
    }

    const result = await deleteProspectsByFilter({ search, status, category, source });
    return NextResponse.json(result, { status: result.ok ? 200 : 400 });
  } catch (err) {
    console.error('Prospect delete API error:', err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
