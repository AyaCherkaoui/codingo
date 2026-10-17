import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, Text, TextInput, View, StyleSheet } from 'react-native';
import { Button } from '../components/Button';
import { Progress } from '../storage';
import { FriendRow, OAuthProvider, PROVIDER_LABEL, Profile, acceptFriend, cloudConfigured, createProfile, enabledProviders, listFriends, removeFriend, requestFriend, resetPassword, signIn, signInWithProvider, signUp, suggestedUsername } from '../cloud';
import { inviteMessage, shareText } from '../share';
import { c } from '../theme';

function Field(props: React.ComponentProps<typeof TextInput>) {
  return <TextInput placeholderTextColor={c.mute} autoCapitalize="none" autoCorrect={false} {...props} style={[s.input, props.style]} />;
}

export function AuthForm() {
  const [mode, setMode] = useState<'in' | 'up'>('up');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);
  const [providers, setProviders] = useState<OAuthProvider[]>([]);
  useEffect(() => { enabledProviders().then(setProviders); }, []);
  const social = async (p: OAuthProvider) => {
    setBusy(true); setMsg('');
    const r = await signInWithProvider(p);
    setBusy(false);
    if (!r.ok) setMsg(r.error);
  };
  const go = async () => {
    setBusy(true); setMsg('');
    const r = mode === 'up' ? await signUp(email.trim(), pw) : await signIn(email.trim(), pw);
    setBusy(false);
    if (!r.ok) setMsg(r.error);
    else if (mode === 'up' && (r.data as any).needsConfirm) setMsg('Check your email and tap the confirmation link, then sign in.');
  };
  return (
    <View>
      <Text style={s.title}>{mode === 'up' ? 'Create account' : 'Sign in'}</Text>
      <Text style={s.mute}>Save your progress in the cloud and compete with friends.</Text>
      {providers.map(p => (
        <Pressable key={p} disabled={busy} onPress={() => social(p)} style={s.social}>
          <Text style={s.socialTxt}>{p === 'google' ? 'G' : '</>'}  Continue with {PROVIDER_LABEL[p]}</Text>
        </Pressable>))}
      {providers.length > 0 && <Text style={s.or}>or use email</Text>}
      <Field placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <Field placeholder="Password (6+ characters)" value={pw} onChangeText={setPw} secureTextEntry />
      {!!msg && <Text style={s.msg}>{msg}</Text>}
      <Button label={busy ? '...' : mode === 'up' ? 'Sign up' : 'Sign in'} disabled={busy || !email || pw.length < 6} onPress={go} />
      <Pressable onPress={() => setMode(mode === 'up' ? 'in' : 'up')}><Text style={s.link}>{mode === 'up' ? 'Have an account? Sign in' : 'New here? Create account'}</Text></Pressable>
      {mode === 'in' && <Pressable onPress={async () => { const r = await resetPassword(email.trim()); setMsg(r.ok ? 'Password reset email sent.' : r.error); }}><Text style={s.link}>Forgot password?</Text></Pressable>}
    </View>);
}

export function UsernameForm({ uid, progress, onProfile }: { uid: string; progress: Progress; onProfile: (p: Profile) => void }) {
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');
  useEffect(() => { suggestedUsername().then(u => setName(cur => cur || u)); }, []);
  return (
    <View>
      <Text style={s.title}>Pick a username</Text>
      <Text style={s.mute}>Friends find you with this. 3-20 letters, numbers or _.</Text>
      <Field placeholder="username" value={name} onChangeText={setName} />
      {!!msg && <Text style={s.msg}>{msg}</Text>}
      <Button label="Continue" disabled={name.trim().length < 3} onPress={async () => {
        const r = await createProfile(uid, name, progress);
        if (r.ok) onProfile(r.data); else setMsg(r.error);
      }} />
    </View>);
}

function Friends({ uid, me, progress }: { uid: string; me: Profile; progress: Progress }) {
  const [rows, setRows] = useState<FriendRow[]>([]);
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');
  const refresh = useCallback(async () => { const r = await listFriends(uid); if (r.ok) setRows(r.data); }, [uid]);
  useEffect(() => { refresh(); }, [refresh]);

  const board = [
    { id: me.id, username: `${me.username} (you)`, xp: progress.xp, streak: progress.streak },
    ...rows.filter(r => r.status === 'accepted').map(r => r.profile),
  ].sort((a, b) => b.xp - a.xp);
  const incoming = rows.filter(r => r.status === 'pending' && r.incoming);
  const outgoing = rows.filter(r => r.status === 'pending' && !r.incoming);

  return (
    <View>
      <Text style={s.title}>Friends</Text>
      <Text style={s.mute}>You are @{me.username}</Text>
      <Button label="Invite a friend" color={c.blue} shadow="#1590c8" onPress={() => shareText(inviteMessage(me.username))} />
      <View style={{ height: 18 }} />
      <View style={s.addRow}>
        <Field style={{ flex: 1, marginBottom: 0 }} placeholder="Add by username" value={name} onChangeText={setName} />
        <Pressable style={s.addBtn} onPress={async () => {
          const r = await requestFriend(uid, name);
          setMsg(r.ok ? 'Request sent!' : r.error); if (r.ok) { setName(''); refresh(); }
        }}><Text style={s.addTxt}>ADD</Text></Pressable>
      </View>
      {!!msg && <Text style={s.msg}>{msg}</Text>}

      {incoming.length > 0 && <Text style={s.sec}>Requests</Text>}
      {incoming.map(r => (
        <View key={r.friendshipId} style={s.row}>
          <Text style={s.name}>@{r.profile.username}</Text>
          <Pressable onPress={async () => { await acceptFriend(r.friendshipId); refresh(); }}><Text style={s.yes}>ACCEPT</Text></Pressable>
          <Pressable onPress={async () => { await removeFriend(r.friendshipId); refresh(); }}><Text style={s.no}>✕</Text></Pressable>
        </View>))}
      {outgoing.map(r => (
        <View key={r.friendshipId} style={s.row}>
          <Text style={s.name}>@{r.profile.username}</Text><Text style={s.mute}>pending</Text>
        </View>))}

      <Text style={s.sec}>Leaderboard</Text>
      {board.map((b, i) => (
        <View key={b.id} style={[s.row, b.id === me.id && { borderColor: c.primary, borderWidth: 2 }]}>
          <Text style={s.rank}>{i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1}</Text>
          <Text style={[s.name, { flex: 1 }]}>{b.username}</Text>
          <Text style={{ color: c.orange, fontWeight: '800' }}>🔥{b.streak}</Text>
          <Text style={{ color: c.gold, fontWeight: '800', marginLeft: 10 }}>⚡{b.xp}</Text>
        </View>))}
      {board.length === 1 && <Text style={s.mute}>Add friends to compete!</Text>}
    </View>);
}

export function FriendsTab({ uid, profile, progress, onProfile }: {
  uid: string | null; profile: Profile | null; progress: Progress; onProfile: (p: Profile) => void;
}) {
  return (
    <SafeAreaView style={s.root}>
      <ScrollView contentContainerStyle={{ padding: 20 }} keyboardShouldPersistTaps="handled">
        {!cloudConfigured ? (
          <View>
            <Text style={s.title}>Friends</Text>
            <Text style={s.mute}>Online accounts are not turned on yet. You can still invite friends to try the app.</Text>
            <Button label="Invite a friend" color={c.blue} shadow="#1590c8" onPress={() => shareText(inviteMessage(null))} />
          </View>
        ) : !uid ? <AuthForm />
          : !profile ? <UsernameForm uid={uid} progress={progress} onProfile={onProfile} />
          : <Friends uid={uid} me={profile} progress={progress} />}
      </ScrollView>
    </SafeAreaView>);
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: c.bg },
  title: { color: c.text, fontSize: 28, fontWeight: '900', marginBottom: 6 },
  mute: { color: c.mute, marginBottom: 16 },
  msg: { color: c.gold, marginBottom: 12 },
  input: { backgroundColor: c.card, color: c.text, borderRadius: 14, borderWidth: 2, borderColor: c.line, padding: 14, fontSize: 16, marginBottom: 12 },
  social: { backgroundColor: c.card, borderColor: c.line, borderWidth: 2, borderRadius: 16, padding: 14, alignItems: 'center', marginBottom: 10 },
  socialTxt: { color: c.text, fontWeight: '800', fontSize: 16 },
  or: { color: c.mute, textAlign: 'center', marginVertical: 8, fontSize: 12, fontWeight: '700' },
  link: { color: c.blue, textAlign: 'center', marginTop: 16, fontWeight: '700' },
  addRow: { flexDirection: 'row', gap: 10, alignItems: 'center' },
  addBtn: { backgroundColor: c.primary, paddingHorizontal: 18, paddingVertical: 15, borderRadius: 14 },
  addTxt: { color: '#fff', fontWeight: '900' },
  sec: { color: c.mute, fontWeight: '900', letterSpacing: 1, marginTop: 24, marginBottom: 10, textTransform: 'uppercase' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: c.card, borderRadius: 14, padding: 14, marginBottom: 8 },
  rank: { width: 28, color: c.text, fontWeight: '900', fontSize: 16 },
  name: { color: c.text, fontWeight: '700', fontSize: 16 },
  yes: { color: c.primary, fontWeight: '900' },
  no: { color: c.bad, fontWeight: '900', fontSize: 18, paddingHorizontal: 6 },
});
