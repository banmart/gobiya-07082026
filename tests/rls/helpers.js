import { createClient } from '@supabase/supabase-js';
import { createAdminSupabase } from '../../lib/supabase/admin.js';
import { supabaseEnv } from '../../lib/supabase/env.js';

const PASSWORD = 'rls-test-password-9f3a';

// Signs in with the anon key, so the returned client is subject to RLS exactly
// like a real browser session. The admin client is NOT usable for these
// assertions — the service role bypasses every policy.
export async function signInAs(email) {
  const { url, anonKey } = supabaseEnv();
  const supabase = createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { error } = await supabase.auth.signInWithPassword({ email, password: PASSWORD });
  if (error) throw new Error(`Could not sign in as ${email}: ${error.message}`);
  return supabase;
}

// Tenancy is assigned through the service role after the user exists, never
// through user_metadata — the trigger deliberately ignores metadata, so this
// mirrors exactly what the admin server action does in production.
async function createUser(admin, email, clientId) {
  const { data, error } = await admin.auth.admin.createUser({
    email,
    password: PASSWORD,
    email_confirm: true,
  });
  if (error) throw new Error(`Could not create ${email}: ${error.message}`);

  if (clientId) {
    // .select('id').single() is load-bearing, not decoration. A PostgREST
    // update without it returns 204 and { error: null } even when zero rows
    // matched, so a missing profile row — the trigger not installed — would
    // pass silently and surface later as a confusing assertion failure.
    const { error: assignError } = await admin
      .from('profiles')
      .update({ client_id: clientId })
      .eq('id', data.user.id)
      .select('id')
      .single();
    if (assignError) {
      throw new Error(
        `Could not assign tenancy for ${email}: ${assignError.message}. ` +
          'Code PGRST116 means no profiles row exists for that user, which means ' +
          'the handle_new_user trigger is not installed on this project.'
      );
    }
  }

  return data.user;
}

export async function seedTenancy() {
  const admin = createAdminSupabase();
  const stamp = Date.now();

  const { data: clientA, error: errA } = await admin
    .from('clients')
    .insert({ name: `RLS Test A ${stamp}`, contact_email: `rls-a-${stamp}@example.test` })
    .select()
    .single();
  if (errA) throw new Error(`Seed client A failed: ${errA.message}`);

  const { data: clientB, error: errB } = await admin
    .from('clients')
    .insert({ name: `RLS Test B ${stamp}`, contact_email: `rls-b-${stamp}@example.test` })
    .select()
    .single();
  if (errB) throw new Error(`Seed client B failed: ${errB.message}`);

  const userA = await createUser(admin, `rls-a-${stamp}@example.test`, clientA.id);
  const userB = await createUser(admin, `rls-b-${stamp}@example.test`, clientB.id);
  const adminUser = await createUser(admin, `rls-admin-${stamp}@example.test`, null);

  // Promotion happens through the service role, mirroring the SQL bootstrap.
  const { error: promoteError } = await admin
    .from('profiles')
    .update({ role: 'admin', client_id: null })
    .eq('id', adminUser.id);
  if (promoteError) throw new Error(`Promote admin failed: ${promoteError.message}`);

  async function cleanup() {
    for (const user of [userA, userB, adminUser]) {
      await admin.auth.admin.deleteUser(user.id);
    }
    await admin.from('clients').delete().in('id', [clientA.id, clientB.id]);
  }

  return { admin, clientA, clientB, userA, userB, adminUser, cleanup };
}
