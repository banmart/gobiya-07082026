import { createClient } from '@supabase/supabase-js';
import { supabaseServiceEnv } from './env.js';

// Service-role client. It bypasses row-level security entirely, so it is only
// ever used for operations a client can never perform: creating a client
// record and generating an invite link.
//
// The guard below is deliberate. If this module is ever imported by a
// 'use client' file, the bundler would try to inline the service-role key into
// the browser bundle. Throwing at module scope turns that mistake into a build
// failure rather than a silent key leak.
if (typeof window !== 'undefined') {
  throw new Error('lib/supabase/admin.js is server-only and must not be imported by client code.');
}

export function createAdminSupabase() {
  const { url, serviceRoleKey } = supabaseServiceEnv();
  return createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
