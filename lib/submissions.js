import { createServerSupabase } from './supabase/server.js';
import { createAdminSupabase } from './supabase/admin.js';

export async function listFormSubmissions({ limit = 50, type } = {}) {
  const supabase = await createServerSupabase();
  let query = supabase
    .from('form_submissions')
    .select('id, client_id, type, name, email, phone, company, website, payload, status, created_at')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (type) {
    query = query.eq('type', type);
  }

  const { data, error } = await query;
  if (error) {
    console.error('Error fetching form submissions:', error);
    return [];
  }
  return data ?? [];
}

export async function recordFormSubmission({ type, name, email, phone, company, website, payload, clientId }) {
  const admin = createAdminSupabase();
  const { data, error } = await admin
    .from('form_submissions')
    .insert({
      type,
      name,
      email,
      phone,
      company,
      website,
      payload: payload || {},
      client_id: clientId || null,
    })
    .select('id')
    .single();

  if (error) {
    console.error('Error recording form submission:', error);
    return { ok: false, error: error.message };
  }
  return { ok: true, id: data.id };
}

export async function updateSubmissionStatus(id, status) {
  const supabase = await createServerSupabase();
  const { error } = await supabase
    .from('form_submissions')
    .update({ status })
    .eq('id', id);

  if (error) {
    return { ok: false, error: error.message };
  }
  return { ok: true };
}
