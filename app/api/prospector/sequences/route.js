import { NextResponse } from 'next/server';
import { updateDripSequence } from '@/lib/drip';

export async function PATCH(request) {
  try {
    const body = await request.json();
    const { id, status, title, description, steps } = body;

    if (!id) {
      return NextResponse.json({ ok: false, error: 'Sequence id is required.' }, { status: 400 });
    }

    const result = await updateDripSequence(id, { status, title, description, steps });
    if (!result.ok) {
      return NextResponse.json(result, { status: 500 });
    }
    return NextResponse.json(result);
  } catch (err) {
    console.error('Sequence update API error:', err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
