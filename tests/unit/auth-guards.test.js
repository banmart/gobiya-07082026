import { describe, it, expect, vi, beforeEach } from 'vitest';

const getUser = vi.fn();
const maybeSingle = vi.fn();

vi.mock('../../lib/supabase/server.js', () => ({
  createServerSupabase: async () => ({
    auth: { getUser },
    from: () => ({
      select: () => ({ eq: () => ({ maybeSingle }) }),
    }),
  }),
}));

const redirect = vi.fn(() => {
  throw new Error('NEXT_REDIRECT');
});
const notFound = vi.fn(() => {
  throw new Error('NEXT_NOT_FOUND');
});

vi.mock('next/navigation', () => ({ redirect, notFound }));

const { getSessionUser, requireUser, requireAdmin } = await import('../../lib/auth.js');

beforeEach(() => {
  vi.clearAllMocks();
});

describe('getSessionUser', () => {
  it('returns null when there is no session', async () => {
    getUser.mockResolvedValue({ data: { user: null }, error: null });
    expect(await getSessionUser()).toBeNull();
  });

  it('merges the auth user with their profile', async () => {
    getUser.mockResolvedValue({
      data: { user: { id: 'user-1', email: 'a@example.com' } },
      error: null,
    });
    maybeSingle.mockResolvedValue({
      data: {
        role: 'client',
        client_id: 'client-1',
        full_name: 'Ada',
        clients: { id: 'client-1', name: 'Acme Dental' },
      },
      error: null,
    });

    expect(await getSessionUser()).toEqual({
      id: 'user-1',
      email: 'a@example.com',
      role: 'client',
      clientId: 'client-1',
      fullName: 'Ada',
      client: { id: 'client-1', name: 'Acme Dental' },
    });
  });

  it('returns null when the profile row is missing', async () => {
    getUser.mockResolvedValue({
      data: { user: { id: 'user-1', email: 'a@example.com' } },
      error: null,
    });
    maybeSingle.mockResolvedValue({ data: null, error: null });
    expect(await getSessionUser()).toBeNull();
  });
});

describe('requireUser', () => {
  it('redirects to /login when anonymous', async () => {
    getUser.mockResolvedValue({ data: { user: null }, error: null });
    await expect(requireUser()).rejects.toThrow('NEXT_REDIRECT');
    expect(redirect).toHaveBeenCalledWith('/login');
  });
});

describe('requireAdmin', () => {
  // Pinned at requireAdmin's own call site, not just requireUser's. The
  // ordering is the property under test: an anonymous caller must be
  // redirected, never dropped into the 404 branch meant for non-admins.
  it('redirects to /login when anonymous', async () => {
    getUser.mockResolvedValue({ data: { user: null }, error: null });
    await expect(requireAdmin()).rejects.toThrow('NEXT_REDIRECT');
    expect(redirect).toHaveBeenCalledWith('/login');
    expect(notFound).not.toHaveBeenCalled();
  });

  it('calls notFound for a signed-in client', async () => {
    getUser.mockResolvedValue({
      data: { user: { id: 'user-1', email: 'a@example.com' } },
      error: null,
    });
    maybeSingle.mockResolvedValue({
      data: { role: 'client', client_id: 'client-1', full_name: 'Ada', clients: null },
      error: null,
    });
    await expect(requireAdmin()).rejects.toThrow('NEXT_NOT_FOUND');
    expect(notFound).toHaveBeenCalled();
  });

  it('returns the user for an admin', async () => {
    getUser.mockResolvedValue({
      data: { user: { id: 'admin-1', email: 'boss@example.com' } },
      error: null,
    });
    maybeSingle.mockResolvedValue({
      data: { role: 'admin', client_id: null, full_name: 'Boss', clients: null },
      error: null,
    });
    const user = await requireAdmin();
    expect(user.role).toBe('admin');
    expect(notFound).not.toHaveBeenCalled();
  });
});
