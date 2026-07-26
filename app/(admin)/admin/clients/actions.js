'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '../../../../lib/auth';
import {
  validateClientInput,
  createClientRecord,
  deleteClientRecord,
} from '../../../../lib/clients';
import { createAdminSupabase } from '../../../../lib/supabase/admin';
import { siteUrl } from '../../../../lib/supabase/env';
import { sendInviteEmail, sendRecoveryEmail } from '../../../../lib/emails/invite';

export async function createClientAction(prevState, formData) {
  const admin = await requireAdmin();

  const validation = validateClientInput({
    name: formData.get('name'),
    contactEmail: formData.get('contactEmail'),
    website: formData.get('website'),
  });
  if (!validation.ok) return { errors: validation.errors };

  const { name, contactEmail, website } = validation.value;

  const created = await createClientRecord({
    name,
    contactEmail,
    website,
    createdBy: admin.id,
  });
  if (!created.ok) return { error: created.error };

  // generateLink creates the auth user and returns a one-time token without
  // sending anything, so the email goes out through Resend instead of
  // Supabase's SMTP.
  const supabase = createAdminSupabase();
  const { data, error } = await supabase.auth.admin.generateLink({
    type: 'invite',
    email: contactEmail,
  });

  if (error) {
    // Compensating delete: without this a failed invite leaves an orphan
    // client row that blocks retrying the same email (unique index).
    await deleteClientRecord(created.client.id);
    const duplicate = /already been registered|already exists/i.test(error.message);
    return {
      error: duplicate
        ? 'An account already exists for that email address.'
        : `Could not create the login: ${error.message}`,
    };
  }

  // Tenancy is assigned here, through the service role, rather than through
  // the invite's user_metadata. Metadata is user-writable, and every RLS
  // policy keys off client_id, so it must never originate with the user.
  // The trigger has already created the profile row by this point.
  //
  // .select('id').single() is what makes the rollback below reachable. A
  // PostgREST update without it returns 204 and { error: null } even when it
  // matched zero rows, so a missing profile row would silently ship an invite
  // to a login that belongs to no client.
  const { error: assignError } = await supabase
    .from('profiles')
    .update({ client_id: created.client.id })
    .eq('id', data.user.id)
    .select('id')
    .single();

  if (assignError) {
    // The login exists but belongs to no client, so it would sign in to an
    // empty dashboard. Roll the whole thing back rather than leave that.
    await supabase.auth.admin.deleteUser(data.user.id);
    await deleteClientRecord(created.client.id);
    return { error: `Could not assign the client: ${assignError.message}` };
  }

  const inviteLink =
    `${siteUrl()}/auth/callback` +
    `?token_hash=${encodeURIComponent(data.properties.hashed_token)}` +
    `&type=invite&next=${encodeURIComponent('/set-password')}`;

  const sent = await sendInviteEmail({
    to: contactEmail,
    businessName: name,
    actionLink: inviteLink,
  });

  revalidatePath('/admin/clients');

  // The client and login exist either way, so the link is always returned for
  // the admin to copy if the email did not go out.
  return { ok: true, inviteLink, emailSent: sent.ok };
}

// Re-sends an invite for a client that already exists — the recovery path when
// the first email bounced, went to spam, or expired before it was opened.
export async function resendInviteAction(prevState, formData) {
  await requireAdmin();

  const clientId = formData.get('clientId');
  if (!clientId) return { error: 'Missing client.' };

  const supabase = createAdminSupabase();
  const { data: client, error: lookupError } = await supabase
    .from('clients')
    .select('id, name, contact_email')
    .eq('id', clientId)
    .single();

  if (lookupError || !client) return { error: 'That client no longer exists.' };

  // 'invite' only works while the user has never signed in. Once they have,
  // Supabase rejects it as already registered, so fall back to 'recovery',
  // which reaches the same /set-password screen.
  // No metadata is passed: the profile and its tenancy already exist from the
  // original create, and metadata is not a trusted source for either.
  let type = 'invite';
  let { data, error } = await supabase.auth.admin.generateLink({
    type,
    email: client.contact_email,
  });

  if (error) {
    type = 'recovery';
    ({ data, error } = await supabase.auth.admin.generateLink({
      type,
      email: client.contact_email,
    }));
  }

  if (error || !data?.properties?.hashed_token) {
    return { error: `Could not generate a link: ${error?.message ?? 'unknown error'}` };
  }

  const actionLink =
    `${siteUrl()}/auth/callback` +
    `?token_hash=${encodeURIComponent(data.properties.hashed_token)}` +
    `&type=${type}&next=${encodeURIComponent('/set-password')}`;

  const sent =
    type === 'invite'
      ? await sendInviteEmail({
          to: client.contact_email,
          businessName: client.name,
          actionLink,
        })
      : await sendRecoveryEmail({ to: client.contact_email, actionLink });

  if (!sent.ok) return { error: sent.error };

  return { ok: true, emailSent: true };
}
