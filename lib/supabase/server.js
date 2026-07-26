import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { supabaseEnv } from './env.js';

// One client per request — it closes over that request's cookie jar, so it can
// never be hoisted into a module-level singleton.
export async function createServerSupabase() {
  // cookies() is awaited FIRST, and the order matters. During prerendering it
  // throws a dynamic-usage signal that Next catches to bail the page out to
  // per-request rendering. If supabaseEnv() ran first, its plain "missing env
  // var" error would surface during the build instead — so a project with
  // blank Supabase credentials fails the build outright rather than simply
  // deferring these pages to runtime.
  const cookieStore = await cookies();
  const { url, anonKey } = supabaseEnv();

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // Server Components cannot set cookies. This is expected and safe:
          // middleware.js already refreshed the session for this request.
        }
      },
    },
  });
}
