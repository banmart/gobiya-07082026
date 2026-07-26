import { createBrowserClient } from '@supabase/ssr';
import { supabaseEnv } from './env.js';

export function createBrowserSupabase() {
  const { url, anonKey } = supabaseEnv();
  return createBrowserClient(url, anonKey);
}
