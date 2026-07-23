import { NextResponse } from 'next/server';
import { sendContactEmail } from '../../../lib/leadForms';

export async function POST(request) {
  let data;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  // Honeypot — bots fill hidden fields. Web-only concept, stays in the route.
  if (data.company_website) {
    return NextResponse.json({ ok: true });
  }

  // Frontend sends current_page (snake_case, see components/HeroQuickForm.js
  // and components/LpOfferForm.js) — the shared helper takes currentPage.
  const result = await sendContactEmail({ ...data, currentPage: data.current_page });
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }
  return NextResponse.json({ ok: true });
}
