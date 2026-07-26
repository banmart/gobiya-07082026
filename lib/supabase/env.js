// Env access for every Supabase client in the app. Reading through these
// helpers means a missing variable fails immediately with the variable's name,
// instead of surfacing later as "Cannot read properties of undefined".

function required(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing required environment variable ${name}. Add it to .env.local and to the Vercel project settings.`
    );
  }
  return value;
}

export function supabaseEnv() {
  return {
    url: required('NEXT_PUBLIC_SUPABASE_URL'),
    anonKey: required('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
  };
}

export function supabaseServiceEnv() {
  return {
    url: required('NEXT_PUBLIC_SUPABASE_URL'),
    serviceRoleKey: required('SUPABASE_SERVICE_ROLE_KEY'),
  };
}

// Absolute base for links we email out. Falls back to the dev server so a
// local invite link is clickable.
export function siteUrl() {
  const value = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return value.replace(/\/+$/, '');
}
