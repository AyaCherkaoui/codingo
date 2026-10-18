import React, { useEffect, useState } from 'react';
import { supabase } from '../cloud';
import { Pressable, Text, TextInput, View, StyleSheet } from 'react-native';
import { Button } from './Button';
import { FeedbackKind, Screenshot, pickScreenshot, sendFeedback } from '../reportFeedback';
import { c } from '../theme';

const KINDS: { k: FeedbackKind; label: string }[] = [{ k: 'idea', label: '💡 Idea' }, { k: 'bug', label: '🐞 Bug' }, { k: 'other', label: '💬 Other' }];

export function FeedbackCard({ defaultContact }: { defaultContact?: string }) {
  const [kind, setKind] = useState<FeedbackKind>('idea');
  const [msg, setMsg] = useState('');
  const [contact, setContact] = useState(defaultContact ?? '');
  const [shot, setShot] = useState<Screenshot | null>(null);
  const [busy, setBusy] = useState(false);
  // signed in? use their email so they don't have to type it
  useEffect(() => { supabase?.auth.getSession().then(({ data }) => { const e = data.session?.user.email; if (e) setContact(cur => cur || e); }); }, []);
  const [note, setNote] = useState('');
  const send = async () => {
    setBusy(true); setNote('');
    const r = await sendFeedback({ kind, message: msg.trim(), contact: contact.trim(), shot });
    setBusy(false);
    if (r.ok) { setMsg(''); setShot(null); setNote('Thank you! Your feedback was sent 💜'); } else setNote(r.error);
  };
  return (
    <View style={s.card}>
      <Text style={s.label}>Help us improve 💬</Text>
      <Text style={s.note}>Spotted a bug or have an idea? Tell us, and add a screenshot if it helps.</Text>
      <View style={s.kinds}>
        {KINDS.map(x => (
          <Pressable key={x.k} onPress={() => setKind(x.k)} style={[s.chip, kind === x.k && s.chipOn]}>
            <Text style={[s.chipTxt, kind === x.k && { color: c.text }]}>{x.label}</Text>
          </Pressable>))}
      </View>
      <TextInput value={msg} onChangeText={setMsg} multiline placeholder="What should we improve?" placeholderTextColor={c.mute} style={[s.input, { minHeight: 90, textAlignVertical: 'top' }]} />
      <TextInput value={contact} onChangeText={setContact} autoCapitalize="none" placeholder="Email (optional, if you want a reply)" placeholderTextColor={c.mute} style={s.input} />
      <Pressable onPress={async () => setShot(await pickScreenshot())}><Text style={s.link}>{shot ? '📎 Screenshot added (tap to change)' : '📎 Attach a screenshot'}</Text></Pressable>
      {!!note && <Text style={s.msg}>{note}</Text>}
      <View style={{ height: 12 }} />
      <Button label={busy ? 'Sending...' : 'Send feedback'} disabled={busy || msg.trim().length < 3} onPress={send} />
    </View>);
}

const s = StyleSheet.create({
  card: { backgroundColor: c.card, borderRadius: 16, padding: 16, marginBottom: 20 },
  label: { color: c.text, fontSize: 16, fontWeight: '700' },
  note: { color: c.mute, fontSize: 12, marginTop: 4 },
  kinds: { flexDirection: 'row', gap: 8, marginVertical: 12 },
  chip: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 999, backgroundColor: c.bg },
  chipOn: { backgroundColor: c.primary },
  chipTxt: { color: c.mute, fontWeight: '800', fontSize: 13 },
  input: { backgroundColor: c.bg, color: c.text, borderRadius: 12, padding: 12, marginBottom: 10, fontSize: 15 },
  link: { color: c.blue, fontWeight: '800', marginTop: 2 },
  msg: { color: c.text, marginTop: 10, fontSize: 13 },
});
