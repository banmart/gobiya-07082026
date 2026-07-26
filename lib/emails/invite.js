// Invite and password-reset emails. Supabase's own delivery is bypassed so
// these go out through the Resend account the rest of the site already uses,
// in Gobiya's own template. See lib/leadForms.js for the existing pattern.

import { Resend } from 'resend';
import { BRAND_NAVY, BRAND_CARMINE } from '../brand.js';

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function shell({ heading, body, actionLink, actionLabel, footnote }) {
  return `
    <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;">
      <p style="font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:${BRAND_NAVY};margin-bottom:24px;">Gobiya</p>
      <h1 style="font-size:22px;font-weight:600;color:${BRAND_NAVY};margin-bottom:12px;">${heading}</h1>
      <p style="font-size:15px;line-height:1.6;color:#3d4a5c;margin-bottom:28px;">${body}</p>
      <a href="${actionLink}" style="display:inline-block;padding:13px 22px;background:${BRAND_NAVY};color:#ffffff;font-size:15px;text-decoration:none;">${actionLabel}</a>
      <p style="font-size:13px;line-height:1.6;color:#7e93ab;margin-top:28px;">${footnote}</p>
      <p style="font-size:12px;line-height:1.6;color:#7e93ab;margin-top:24px;word-break:break-all;">
        If the button doesn't work, paste this into your browser:<br />
        <span style="color:${BRAND_CARMINE};">${actionLink}</span>
      </p>
    </div>`;
}

export function buildInviteEmail({ businessName, actionLink }) {
  const safeName = escapeHtml(businessName);
  return {
    subject: `Your Gobiya dashboard is ready — ${businessName}`,
    html: shell({
      heading: 'Set up your dashboard',
      body: `We've created a Gobiya dashboard for <strong>${safeName}</strong>. Choose a password to get in.`,
      actionLink,
      actionLabel: 'Set your password',
      footnote: 'This link can only be used once. If it has expired, ask us for a new one.',
    }),
  };
}

export function buildRecoveryEmail({ actionLink }) {
  return {
    subject: 'Reset your Gobiya password',
    html: shell({
      heading: 'Reset your password',
      body: 'Someone asked to reset the password on your Gobiya dashboard. If that was you, choose a new one below.',
      actionLink,
      actionLabel: 'Choose a new password',
      footnote:
        "This link expires in one hour and can only be used once. If you didn't request it, you can ignore this email.",
    }),
  };
}

async function send({ to, subject, html }) {
  try {
    const { error } = await resend.emails.send({
      from: process.env.ONBOARDING_FROM_EMAIL || 'Gobiya <onboarding@gobiya.com>',
      to,
      subject,
      html,
    });
    if (error) {
      console.error('Resend error:', error);
      return { ok: false, error: 'The email could not be sent.' };
    }
    return { ok: true };
  } catch (err) {
    console.error('Email send failed:', err);
    return { ok: false, error: 'The email could not be sent.' };
  }
}

export function sendInviteEmail({ to, businessName, actionLink }) {
  return send({ to, ...buildInviteEmail({ businessName, actionLink }) });
}

export function sendRecoveryEmail({ to, actionLink }) {
  return send({ to, ...buildRecoveryEmail({ actionLink }) });
}
