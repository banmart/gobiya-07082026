import { createServerSupabase } from './supabase/server.js';
import { createAdminSupabase } from './supabase/admin.js';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Pure — no I/O — so it is cheap to test and safe to call from a form action
// before touching the database.
export function validateClientInput({ name, contactEmail, website }) {
  const errors = {};

  const trimmedName = String(name ?? '').trim();
  if (!trimmedName) errors.name = 'Enter the business name.';

  const trimmedEmail = String(contactEmail ?? '').trim().toLowerCase();
  if (!trimmedEmail) {
    errors.contactEmail = 'Enter a contact email.';
  } else if (!EMAIL_PATTERN.test(trimmedEmail)) {
    errors.contactEmail = 'Enter a valid email address.';
  }

  let normalizedWebsite = String(website ?? '').trim();
  if (!normalizedWebsite) {
    normalizedWebsite = null;
  } else if (!/^https?:\/\//i.test(normalizedWebsite)) {
    normalizedWebsite = `https://${normalizedWebsite}`;
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    value: { name: trimmedName, contactEmail: trimmedEmail, website: normalizedWebsite },
  };
}

// Reads through the caller's own session, so the admin RLS policy is what
// grants visibility — not the service role.
export async function listClients() {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from('clients')
    .select('id, name, website, contact_email, status, created_at')
    .order('created_at', { ascending: false });

  if (error) throw new Error(`Could not load clients: ${error.message}`);
  return data ?? [];
}

// Uses the service role: this runs in the same operation as creating an auth
// user, which only the service role can do.
export async function createClientRecord({ name, contactEmail, website, createdBy }) {
  const admin = createAdminSupabase();
  const { data, error } = await admin
    .from('clients')
    .insert({ name, contact_email: contactEmail, website, created_by: createdBy })
    .select('id, name, website, contact_email, status, created_at')
    .single();

  if (error) {
    if (error.code === '23505') {
      return { ok: false, error: 'A client with that contact email already exists.' };
    }
    return { ok: false, error: `Could not create the client: ${error.message}` };
  }
  return { ok: true, client: data };
}

// Compensating action for a failed invite — see lib/emails/invite.js callers.
export async function deleteClientRecord(id) {
  const admin = createAdminSupabase();
  const { error } = await admin.from('clients').delete().eq('id', id);
  return { ok: !error };
}
