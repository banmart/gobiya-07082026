// Shared lead-form senders for the quick-contact and onboarding flows —
// used by their REST routes (app/api/quick-contact, app/api/onboarding)
// and by the MCP form tools (contact_gobiya, request_seo_audit) in
// app/api/mcp/route.js, so both callers share one Resend/validation path.

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const INDUSTRY_LABELS = {
  'local-service': 'Local service business',
  'enterprise-b2b': 'Enterprise & B2B',
  healthcare: 'Healthcare & Dental',
  professional: 'Professional services',
  ecommerce: 'E-commerce',
  other: 'Other',
};

const GOAL_LABELS = {
  traffic: 'More organic traffic',
  rankings: 'Higher rankings for target keywords',
  recovery: 'Recover from a Google penalty / traffic drop',
  sales: 'More sales & leads',
  'ai-visibility': 'Get cited in ChatGPT, Perplexity & AI Overviews',
  unsure: 'Not sure yet — need direction',
};

const CHALLENGE_LABELS = {
  'traffic-drop': 'Traffic dropped after an algorithm update',
  'no-rankings': "Not ranking for the keywords that matter",
  'no-ai-visibility': "Not showing up in ChatGPT / AI Overviews",
  conversion: 'Site gets visits but not conversions',
  'no-strategy': "No real SEO strategy in place yet",
  other: 'Something else',
};

const BUDGET_LABELS = {
  'under-2k': 'Under $2,000/mo',
  '2k-5k': '$2,000 – $5,000/mo',
  '5k-10k': '$5,000 – $10,000/mo',
  '10k-plus': '$10,000+/mo',
  unsure: 'Not sure yet',
};

const TIMELINE_LABELS = {
  asap: 'ASAP',
  'this-month': 'This month',
  'this-quarter': 'This quarter',
  exploring: 'Just exploring',
};

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function labelList(values, labels) {
  if (!Array.isArray(values) || values.length === 0) return '—';
  return values.map((v) => escapeHtml(labels[v] || v)).join(', ');
}

function row(label, value) {
  return `
    <tr>
      <td style="padding:10px 16px;border-bottom:1px solid #e5e5e5;color:#8a8a8a;font-size:12px;text-transform:uppercase;letter-spacing:0.06em;white-space:nowrap;vertical-align:top;">${label}</td>
      <td style="padding:10px 16px;border-bottom:1px solid #e5e5e5;color:#2b2b2b;font-size:14px;">${value}</td>
    </tr>`;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendContactEmail({ name, email, phone, message, currentPage }) {
  if (!name || !email) {
    return { ok: false, status: 400, error: 'Name and email are required.' };
  }
  if (!EMAIL_PATTERN.test(email)) {
    return { ok: false, status: 400, error: 'Please provide a valid email address.' };
  }

  const html = `
    <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:640px;margin:0 auto;">
      <h1 style="font-size:18px;font-weight:600;color:#2b2b2b;margin-bottom:4px;">New quick contact submission</h1>
      <p style="font-size:13px;color:#8a8a8a;margin-bottom:20px;">Gobiya.com — Hero form (Submitted from: ${escapeHtml(currentPage || 'Unknown page')})</p>
      <table style="width:100%;border-collapse:collapse;">
        ${row('Name', escapeHtml(name))}
        ${row('Email', `<a href="mailto:${escapeHtml(email)}" style="color:#e41613;">${escapeHtml(email)}</a>`)}
        ${row('Phone', escapeHtml(phone) || '—')}
        ${row('Message', message ? escapeHtml(message).replace(/\n/g, '<br />') : '—')}
      </table>
    </div>`;

  try {
    const { error } = await resend.emails.send({
      from: process.env.ONBOARDING_FROM_EMAIL || 'Gobiya Contact <onboarding@gobiya.com>',
      to: 'banmart@gmail.com',
      replyTo: email,
      subject: `New contact request — ${name}`,
      html,
    });
    if (error) {
      console.error('Resend error:', error);
      return { ok: false, status: 502, error: 'Failed to send. Please try again.' };
    }
  } catch (err) {
    console.error('Submission failed:', err);
    return { ok: false, status: 500, error: 'Failed to send. Please try again.' };
  }

  return { ok: true };
}

export async function sendOnboardingEmail({ name, email, phone, company, website, industry, goal, challenges, budget, timeline, notes }) {
  if (!name || !email) {
    return { ok: false, status: 400, error: 'Name and email are required.' };
  }
  if (!EMAIL_PATTERN.test(email)) {
    return { ok: false, status: 400, error: 'Please provide a valid email address.' };
  }

  const html = `
    <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:640px;margin:0 auto;">
      <h1 style="font-size:18px;font-weight:600;color:#2b2b2b;margin-bottom:4px;">New onboarding submission</h1>
      <p style="font-size:13px;color:#8a8a8a;margin-bottom:20px;">Gobiya.com — questionnaire stepper</p>
      <table style="width:100%;border-collapse:collapse;">
        ${row('Name', escapeHtml(name))}
        ${row('Email', `<a href="mailto:${escapeHtml(email)}" style="color:#e41613;">${escapeHtml(email)}</a>`)}
        ${row('Phone', escapeHtml(phone) || '—')}
        ${row('Company', escapeHtml(company) || '—')}
        ${row('Website', escapeHtml(website) || '—')}
        ${row('Industry', labelList([industry], INDUSTRY_LABELS))}
        ${row('Primary goal', labelList([goal], GOAL_LABELS))}
        ${row('Current challenges', labelList(challenges, CHALLENGE_LABELS))}
        ${row('Budget', labelList([budget], BUDGET_LABELS))}
        ${row('Timeline', labelList([timeline], TIMELINE_LABELS))}
        ${row('Notes', notes ? escapeHtml(notes).replace(/\n/g, '<br />') : '—')}
      </table>
    </div>`;

  try {
    const { error } = await resend.emails.send({
      from: process.env.ONBOARDING_FROM_EMAIL || 'Gobiya Onboarding <onboarding@gobiya.com>',
      to: process.env.ONBOARDING_NOTIFY_EMAIL || 'banmart@gmail.com',
      replyTo: email,
      subject: `New onboarding request — ${company || name}`,
      html,
    });
    if (error) {
      console.error('Resend error:', error);
      return { ok: false, status: 502, error: 'Failed to send. Please try again or email us directly.' };
    }
  } catch (err) {
    console.error('Onboarding submission failed:', err);
    return { ok: false, status: 500, error: 'Failed to send. Please try again or email us directly.' };
  }

  return { ok: true };
}
