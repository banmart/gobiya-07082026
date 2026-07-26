// Env access for every Supabase client in the app. Reading through these
// helpers means a missing variable fails immediately with the variable's name,
// instead of surfacing later as "Cannot read properties of undefined".
//
// Every read below is STATIC dot access — `process.env.NEXT_PUBLIC_FOO` — and
// that is not a style choice. Next substitutes NEXT_PUBLIC_* values into the
// client bundle by matching dot access only. A computed lookup like
// `process.env[name]` survives into the browser bundle unsubstituted, where the
// `process/browser` polyfill supplies an empty `env` object. The value is then
// always undefined, so createBrowserSupabase() throws on every call in every
// browser, no matter what the real credentials are.

function requireValue(name, value) {
  if (!value) {
    throw new Error(
      `Missing required environment variable ${name}. Add it to .env.local and to the Vercel project settings.`
    );
  }
  return value;
}

export function supabaseEnv() {
  return {
    url: requireValue('NEXT_PUBLIC_SUPABASE_URL', process.env.NEXT_PUBLIC_SUPABASE_URL),
    anonKey: requireValue(
      'NEXT_PUBLIC_SUPABASE_ANON_KEY',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ),
  };
}

export function supabaseServiceEnv() {
  return {
    url: requireValue('NEXT_PUBLIC_SUPABASE_URL', process.env.NEXT_PUBLIC_SUPABASE_URL),
    serviceRoleKey: requireValue(
      'SUPABASE_SERVICE_ROLE_KEY',
      process.env.SUPABASE_SERVICE_ROLE_KEY
    ),
  };
}

// Absolute base for links we email out. Falls back to the dev server so a
// local invite link is clickable.
export function siteUrl() {
  const value = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return value.replace(/\/+$/, '');
}
