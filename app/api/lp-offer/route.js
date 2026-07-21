import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function row(label, value) {
  return `
    <tr>
      <td style="padding:10px 16px;border-bottom:1px solid #e5e5e5;color:#8a8a8a;font-size:12px;text-transform:uppercase;letter-spacing:0.06em;white-space:nowrap;vertical-align:top;">${label}</td>
      <td style="padding:10px 16px;border-bottom:1px solid #e5e5e5;color:#2b2b2b;font-size:14px;">${value}</td>
    </tr>`;
}

export async function POST(request) {
  let data;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  // Honeypot — bots fill hidden fields
  if (data.company_website) {
    return NextResponse.json({ ok: true });
  }

  const { name, email, phone, message, current_page, ref, offer } = data;

  if (!name || !email) {
    return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
  }

  const html = `
    <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:640px;margin:0 auto;">
      <h1 style="font-size:18px;font-weight:600;color:#2b2b2b;margin-bottom:4px;">New ${escapeHtml(offer || 'offer')} lead</h1>
      <p style="font-size:13px;color:#8a8a8a;margin-bottom:20px;">Gobiya.com — /lp landing page (Submitted from: ${escapeHtml(current_page || 'Unknown page')})</p>
      <table style="width:100%;border-collapse:collapse;">
        ${row('Name', escapeHtml(name))}
        ${row('Email', `<a href="mailto:${escapeHtml(email)}" style="color:#e41613;">${escapeHtml(email)}</a>`)}
        ${row('Phone', escapeHtml(phone) || '—')}
        ${row('Source (ref)', escapeHtml(ref) || 'direct')}
        ${row('Message', message ? escapeHtml(message).replace(/\n/g, '<br />') : '—')}
      </table>
    </div>`;

  try {
    const { error } = await resend.emails.send({
      from: process.env.ONBOARDING_FROM_EMAIL || 'Gobiya Contact <onboarding@gobiya.com>',
      to: 'banmart@gmail.com',
      replyTo: email,
      subject: `New Q3 Growth Bundle lead — ${name} (ref: ${ref || 'direct'})`,
      html,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Failed to send. Please try again.' }, { status: 502 });
    }
  } catch (err) {
    console.error('Submission failed:', err);
    return NextResponse.json({ error: 'Failed to send. Please try again.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
