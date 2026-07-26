import { describe, it, expect, afterEach } from 'vitest';
import { supabaseEnv, supabaseServiceEnv, siteUrl } from '../../lib/supabase/env.js';

const ORIGINAL = { ...process.env };

afterEach(() => {
  process.env = { ...ORIGINAL };
});

describe('supabaseEnv', () => {
  it('returns url and anon key when both are set', () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co';
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'anon-key';
    expect(supabaseEnv()).toEqual({
      url: 'https://example.supabase.co',
      anonKey: 'anon-key',
    });
  });

  it('names the missing variable in the error', () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co';
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    expect(() => supabaseEnv()).toThrow(/NEXT_PUBLIC_SUPABASE_ANON_KEY/);
  });
});

describe('supabaseServiceEnv', () => {
  it('names the missing service role key in the error', () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co';
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;
    expect(() => supabaseServiceEnv()).toThrow(/SUPABASE_SERVICE_ROLE_KEY/);
  });
});

describe('siteUrl', () => {
  it('strips a trailing slash', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://www.gobiya.com/';
    expect(siteUrl()).toBe('https://www.gobiya.com');
  });

  it('falls back to localhost when unset', () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    expect(siteUrl()).toBe('http://localhost:3000');
  });
});
