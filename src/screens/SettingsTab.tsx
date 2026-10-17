import React, { useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, Text, View, StyleSheet } from 'react-native';
import { Progress } from '../storage';
import { Button } from '../components/Button';
import { FeedbackCard } from '../components/FeedbackCard';
import { c } from '../theme';

export function SettingsTab({ progress, onChange, onReset, account, onSignOut, onGoAccount }: {
  progress: Progress; onChange: (patch: Partial<Progress>) => void; onReset: () => void;
  account: string | null; onSignOut: () => void; onGoAccount?: () => void; // onGoAccount set = online accounts available
}) {
  const [confirm, setConfirm] = useState(false);
  const h = progress.reminderHour;
  const fmt = `${((h + 11) % 12) + 1}:00 ${h < 12 ? 'AM' : 'PM'}`;
  return (
    <SafeAreaView style={s.root}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={s.title}>Settings</Text>
        <View style={s.card}>
          <Pressable onPress={() => onChange({ reminderOn: !progress.reminderOn })} style={s.row}>
            <Text style={s.label}>Daily reminder</Text>
            <Text style={[s.val, { color: progress.reminderOn ? c.primary : c.mute }]}>{progress.reminderOn ? 'ON' : 'OFF'}</Text>
          </Pressable>
          <Pressable onPress={() => onChange({ soundOn: !progress.soundOn })} style={s.row}>
            <Text style={s.label}>Sound effects</Text>
            <Text style={[s.val, { color: progress.soundOn ? c.primaryLight : c.mute }]}>{progress.soundOn ? 'ON' : 'OFF'}</Text>
          </Pressable>
          <View style={s.row}>
            <Text style={s.label}>Streak freezes 🧊</Text>
            <Text style={s.val}>{progress.freezes} / 2</Text>
          </View>
          <Text style={s.note}>A freeze saves your streak if you miss a day. You earn one every 7-day streak.</Text>
          <View style={s.row}>
            <Text style={s.label}>Reminder time</Text>
            <View style={s.step}>
              <Pressable onPress={() => onChange({ reminderHour: (h + 23) % 24 })}><Text style={s.btn}>−</Text></Pressable>
              <Text style={s.val}>{fmt}</Text>
              <Pressable onPress={() => onChange({ reminderHour: (h + 1) % 24 })}><Text style={s.btn}>+</Text></Pressable>
            </View>
          </View>
          <Text style={s.note}>Reminders work in the phone app, not in the browser.</Text>
        </View>
        {!account && onGoAccount && (
          <View style={s.card}>
            <Text style={s.label}>Save your progress ☁️</Text>
            <Text style={s.note}>Sign up (free) to keep your streak on any device and compete with friends.</Text>
            <View style={{ height: 12 }} /><Button label="Sign up / Sign in" onPress={onGoAccount} />
          </View>)}
        {account && (
          <View style={s.card}>
            <Text style={s.label}>Signed in as @{account}</Text>
            <Text style={s.note}>Your progress syncs to the cloud automatically.</Text>
            <View style={{ height: 12 }} /><Button label="Sign out" color={c.blue} shadow="#1590c8" onPress={onSignOut} />
          </View>)}
        <FeedbackCard />
        <Button label={confirm ? 'Tap again to erase everything' : 'Reset progress'} color={c.bad} shadow={c.badDark}
          onPress={() => { if (confirm) { setConfirm(false); onReset(); } else setConfirm(true); }} />
      </ScrollView>
    </SafeAreaView>);
}
const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: c.bg },
  title: { color: c.text, fontSize: 28, fontWeight: '900', marginBottom: 16 },
  card: { backgroundColor: c.card, borderRadius: 16, padding: 16, marginBottom: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12 },
  label: { color: c.text, fontSize: 16, fontWeight: '700' },
  val: { color: c.text, fontSize: 16, fontWeight: '800' },
  step: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  btn: { color: c.blue, fontSize: 28, fontWeight: '900', paddingHorizontal: 8 },
  note: { color: c.mute, fontSize: 12, marginTop: 4 },
});
