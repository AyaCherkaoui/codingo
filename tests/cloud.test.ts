// Integration test against the real Supabase project in .env, using throw-away fake users.
// Skipped automatically when .env has no keys.
import { describe, it, expect, vi, beforeAll } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';

vi.mock('react-native-url-polyfill/auto', () => ({}));
vi.mock('@react-native-async-storage/async-storage', () => {
  const m = new Map<string, string>();
  return { default: { getItem: async (k: string) => m.get(k) ?? null, setItem: async (k: string, v: string) => { m.set(k, v); }, removeItem: async (k: string) => { m.delete(k); } } };
});

if (existsSync('.env')) for (const l of readFileSync('.env', 'utf8').split('\n')) { const m = l.match(/^([A-Z_]+)=(.*)$/); if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim(); }
const configured = !!process.env.EXPO_PUBLIC_SUPABASE_URL && !!process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

const run = Date.now().toString(36);
const pw = 'Test-pass-12345';
const users = ['alice', 'bob', 'carol'].map(n => ({ n, email: `bracey.test.${n}.${run}@example.com`, username: `t_${n}_${run}`.slice(0, 20), id: '' }));
const [alice, bob, carol] = users;

describe.skipIf(!configured)('cloud (Supabase) with fake users', () => {
  let C: typeof import('../src/cloud');
  let S: typeof import('../src/storage');
  const prog = (o: Partial<import('../src/storage').Progress>) => ({ ...S.empty, ...o });

  beforeAll(async () => { C = await import('../src/cloud'); S = await import('../src/storage'); });

  it('signs up three users', async () => {
    for (const u of users) {
      const r = await C.signUp(u.email, pw);
      expect(r.ok, JSON.stringify(r)).toBe(true);
      u.id = (await C.currentUserId())!;
      expect(u.id).toBeTruthy();
    }
  });

  it('only offers Google/GitHub when they are enabled in Supabase', async () => {
    const list = await C.enabledProviders();
    expect(Array.isArray(list)).toBe(true);
    for (const p of list) expect(['google', 'github']).toContain(p);
  });

  it('rejects a wrong password and accepts the right one', async () => {
    await C.signOut();
    expect((await C.signIn(alice.email, 'wrong-password-1')).ok).toBe(false);
    expect((await C.signIn(alice.email, pw)).ok).toBe(true);
    expect(await C.currentUserId()).toBe(alice.id);
  });

  it('creates profiles, validates and de-duplicates usernames', async () => {
    expect((await C.createProfile(alice.id, 'a!', prog({}))).ok).toBe(false);
    const r = await C.createProfile(alice.id, alice.username.toUpperCase(), prog({ xp: 120, streak: 3, completed: ['a', 'b'] }));
    expect(r.ok, JSON.stringify(r)).toBe(true);
    expect((await C.getProfile(alice.id))?.xp).toBe(120);
    await C.signIn(bob.email, pw);
    const dup = await C.createProfile(bob.id, alice.username, prog({}));
    expect(dup.ok).toBe(false);
    if (!dup.ok) expect(dup.error).toMatch(/taken/);
    expect((await C.createProfile(bob.id, bob.username, prog({ xp: 300, streak: 9, completed: ['a'] }))).ok).toBe(true);
    await C.signIn(carol.email, pw);
    expect((await C.createProfile(carol.id, carol.username, prog({ xp: 50 }))).ok).toBe(true);
  });

  it('cannot create a profile for someone else (RLS)', async () => {
    const r = await C.createProfile(alice.id, `t_evil_${run}`.slice(0, 20), prog({}));
    expect(r.ok).toBe(false);
  });

  it('syncs progress: push, pull on a "new device", and merge', async () => {
    await C.signIn(alice.email, pw);
    const p = prog({ xp: 200, completed: ['x', 'y'], streak: 2, lastDay: S.today(), reviews: { x: { step: 1, due: '2030-01-01' } } });
    expect(await C.pushProgress(alice.id, p)).toBe(true);
    const pulled = await C.pullProgress(alice.id);
    expect(pulled?.xp).toBe(200); expect(pulled?.completed).toEqual(['x', 'y']);
    expect((await C.getProfile(alice.id))?.completed_count).toBe(2);
    const fresh = prog({ completed: ['z'], xp: 10 });
    const merged = C.mergeProgress(fresh, pulled!);
    expect(merged.completed.sort()).toEqual(['x', 'y', 'z']);
    expect(merged.xp).toBe(200);
  });

  it("cannot read or overwrite another user's progress (RLS)", async () => {
    await C.signIn(bob.email, pw);
    expect(await C.pullProgress(alice.id)).toBeNull();
    await C.pushProgress(alice.id, prog({ xp: 999999 })); // silently affects 0 rows or errors
    await C.signIn(alice.email, pw);
    expect((await C.pullProgress(alice.id))?.xp).toBe(200);
    expect((await C.getProfile(alice.id))?.xp).not.toBe(999999);
  });

  it('friend flow: request, duplicate, self, unknown, accept, leaderboard, remove', async () => {
    await C.signIn(alice.email, pw);
    expect((await C.requestFriend(alice.id, alice.username)).ok).toBe(false); // self
    expect((await C.requestFriend(alice.id, 'nobody_here_zzz')).ok).toBe(false);
    expect((await C.requestFriend(alice.id, '@' + bob.username)).ok).toBe(true);
    const dup = await C.requestFriend(alice.id, bob.username);
    expect(dup.ok).toBe(false);

    let list = await C.listFriends(alice.id);
    expect(list.ok && list.data.length).toBe(1);
    if (list.ok) { expect(list.data[0].status).toBe('pending'); expect(list.data[0].incoming).toBe(false); }
    const fid = list.ok ? list.data[0].friendshipId : -1;

    // the requester cannot accept their own request
    await C.acceptFriend(fid);
    list = await C.listFriends(alice.id);
    if (list.ok) expect(list.data[0].status).toBe('pending');

    // a third party can't see or touch it
    await C.signIn(carol.email, pw);
    const cl = await C.listFriends(carol.id);
    expect(cl.ok && cl.data.length).toBe(0);
    await C.acceptFriend(fid); await C.removeFriend(fid);

    // bob sees it as incoming and accepts
    await C.signIn(bob.email, pw);
    const bl = await C.listFriends(bob.id);
    expect(bl.ok && bl.data[0].incoming).toBe(true);
    expect((await C.acceptFriend(fid)).ok).toBe(true);
    const after = await C.listFriends(bob.id);
    expect(after.ok && after.data[0].status).toBe('accepted');
    expect(after.ok && after.data[0].profile.username).toBe(alice.username);

    // either side can remove
    expect((await C.removeFriend(fid)).ok).toBe(true);
    const gone = await C.listFriends(bob.id);
    expect(gone.ok && gone.data.length).toBe(0);
  });

  it('cannot forge a friendship as someone else or pre-accepted (RLS)', async () => {
    await C.signIn(carol.email, pw);
    const sb = C.supabase!;
    const forged = await sb.from('friendships').insert({ requester: alice.id, addressee: carol.id });
    expect(forged.error).toBeTruthy();
    const pre = await sb.from('friendships').insert({ requester: carol.id, addressee: bob.id, status: 'accepted' });
    expect(pre.error).toBeTruthy();
  });

  it('cannot edit another profile (RLS)', async () => {
    await C.signIn(carol.email, pw);
    await C.supabase!.from('profiles').update({ xp: 12345 }).eq('id', alice.id);
    expect((await C.getProfile(alice.id))?.xp).not.toBe(12345);
  });

  it('password reset request and sign-out', async () => {
    const r = await C.resetPassword(alice.email);
    expect(typeof r.ok).toBe('boolean'); // may be rate-limited; must not throw
    await C.signOut();
    expect(await C.currentUserId()).toBeNull();
  });

  it('cleans up what it is allowed to', async () => {
    for (const u of users) {
      await C.signIn(u.email, pw);
      const sb = C.supabase!;
      await sb.from('friendships').delete().or(`requester.eq.${u.id},addressee.eq.${u.id}`);
      await sb.from('user_progress').delete().eq('user_id', u.id);
    }
    await C.signOut();
  });
});
