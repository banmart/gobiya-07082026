import { redirect, notFound } from 'next/navigation';
import { createServerSupabase } from './supabase/server.js';

// getUser() revalidates the token with Supabase on every call. getSession()
// only decodes the cookie, which a caller could have forged, so it must not be
// used for authorization decisions.
export async function getSessionUser() {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) return null;

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role, client_id, full_name, clients (id, name, website, status)')
    .eq('id', data.user.id)
    .maybeSingle();

  // Both branches below deny access, but they are different failures and the
  // logs should say which. Swallowing the error makes an RLS misconfiguration
  // indistinguishable from a genuinely absent row — both just bounce the user
  // to /login, which is miserable to diagnose in production.
  if (profileError) {
    console.error(`Profile lookup failed for ${data.user.id}: ${profileError.message}`);
    return null;
  }

  // No profile means the new-user trigger did not fire. Treat it as
  // unauthenticated rather than guessing at a role.
  if (!profile) return null;

  return {
    id: data.user.id,
    email: data.user.email,
    role: profile.role,
    clientId: profile.client_id,
    fullName: profile.full_name,
    client: profile.clients ?? null,
  };
}

export async function requireUser() {
  const user = await getSessionUser();
  if (!user) redirect('/login');
  return user;
}

// A signed-in client hitting an admin route gets a 404, not a 403. A 403
// confirms the route exists; a 404 tells them nothing.
export async function requireAdmin() {
  const user = await getSessionUser();
  if (!user) redirect('/login');
  if (user.role !== 'admin') notFound();
  return user;
}
