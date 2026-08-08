import { NextResponse } from 'next/server';
import { sendContactEmail } from '../../../lib/leadForms';

export async function POST(request) {
  let data;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  // Honeypot
  if (data.company_website) {
    return NextResponse.json({ ok: true });
  }

  // Format the message for sendContactEmail
  const message = `
Lead Source: ${data.how_found || 'Not specified'}
Website: ${data.website || 'Not specified'}
Pain Points: ${data.pain_points || 'None listed'}
Outcomes: ${data.outcomes || 'None listed'}
  `.trim();

  const payload = {
    name: data.name,
    email: data.email,
    message: message,
    currentPage: data.current_page
  };

  const result = await sendContactEmail(payload);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }
  return NextResponse.json({ ok: true });
}
