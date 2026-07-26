import { describe, it, expect } from 'vitest';
import { buildInviteEmail, buildRecoveryEmail } from '../../lib/emails/invite.js';

describe('buildInviteEmail', () => {
  it('names the business in the subject', () => {
    const { subject } = buildInviteEmail({
      businessName: 'Acme Dental',
      actionLink: 'https://example.com/auth/callback?token_hash=abc&type=invite',
    });
    expect(subject).toContain('Acme Dental');
  });

  it('embeds the action link', () => {
    const link = 'https://example.com/auth/callback?token_hash=abc&type=invite';
    const { html } = buildInviteEmail({ businessName: 'Acme Dental', actionLink: link });
    expect(html).toContain(link);
  });

  it('escapes HTML in the business name', () => {
    const { html } = buildInviteEmail({
      businessName: '<script>alert(1)</script>',
      actionLink: 'https://example.com/x',
    });
    expect(html).not.toContain('<script>');
    expect(html).toContain('&lt;script&gt;');
  });
});

describe('buildRecoveryEmail', () => {
  it('embeds the action link and mentions expiry', () => {
    const link = 'https://example.com/auth/callback?token_hash=xyz&type=recovery';
    const { html, subject } = buildRecoveryEmail({ actionLink: link });
    expect(html).toContain(link);
    expect(html).toMatch(/hour/i);
    expect(subject).toMatch(/password/i);
  });
});
