import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { seedTenancy, signInAs } from './helpers.js';

let ctx;

beforeAll(async () => {
  ctx = await seedTenancy();
});

afterAll(async () => {
  if (ctx) await ctx.cleanup();
});

describe('clients table', () => {
  it('lets a client read its own row', async () => {
    const supabase = await signInAs(ctx.userA.email);
    const { data } = await supabase.from('clients').select('id, name').eq('id', ctx.clientA.id);
    expect(data).toHaveLength(1);
    expect(data[0].id).toBe(ctx.clientA.id);
  });

  it("hides another client's row", async () => {
    const supabase = await signInAs(ctx.userA.email);
    const { data } = await supabase.from('clients').select('id').eq('id', ctx.clientB.id);
    expect(data).toEqual([]);
  });

  it('lets an admin read both clients', async () => {
    const supabase = await signInAs(ctx.adminUser.email);
    const { data } = await supabase
      .from('clients')
      .select('id')
      .in('id', [ctx.clientA.id, ctx.clientB.id]);
    expect(data).toHaveLength(2);
  });
});

describe('profiles table', () => {
  it("hides another user's profile", async () => {
    const supabase = await signInAs(ctx.userA.email);
    const { data } = await supabase.from('profiles').select('id').eq('id', ctx.userB.id);
    expect(data).toEqual([]);
  });

  it('refuses self-promotion to admin', async () => {
    const supabase = await signInAs(ctx.userA.email);
    await supabase.from('profiles').update({ role: 'admin' }).eq('id', ctx.userA.id);

    // Read back through the service role: the update must not have landed,
    // whether it errored or silently matched zero rows.
    const { data } = await ctx.admin
      .from('profiles')
      .select('role')
      .eq('id', ctx.userA.id)
      .single();
    expect(data.role).toBe('client');
  });

  it('refuses reassigning your own client_id', async () => {
    const supabase = await signInAs(ctx.userA.email);
    await supabase.from('profiles').update({ client_id: ctx.clientB.id }).eq('id', ctx.userA.id);

    const { data } = await ctx.admin
      .from('profiles')
      .select('client_id')
      .eq('id', ctx.userA.id)
      .single();
    expect(data.client_id).toBe(ctx.clientA.id);
  });

  it('allows editing your own full_name', async () => {
    const supabase = await signInAs(ctx.userA.email);
    const { error } = await supabase
      .from('profiles')
      .update({ full_name: 'Renamed Person' })
      .eq('id', ctx.userA.id);
    expect(error).toBeNull();

    const { data } = await ctx.admin
      .from('profiles')
      .select('full_name')
      .eq('id', ctx.userA.id)
      .single();
    expect(data.full_name).toBe('Renamed Person');
  });
});

describe('anonymous access', () => {
  it('returns nothing without a session', async () => {
    const { createClient } = await import('@supabase/supabase-js');
    const { supabaseEnv } = await import('../../lib/supabase/env.js');
    const { url, anonKey } = supabaseEnv();
    const supabase = createClient(url, anonKey, { auth: { persistSession: false } });
    const { data } = await supabase.from('clients').select('id');
    expect(data).toEqual([]);
  });
});
