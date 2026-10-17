import React from 'react';
import { SafeAreaView, ScrollView, Text, View, StyleSheet } from 'react-native';
import { badges } from '../badges';
import { Progress, level } from '../storage';
import { c } from '../theme';

export function BadgesTab({ progress }: { progress: Progress }) {
  const xpInLevel = progress.xp % 100;
  return (
    <SafeAreaView style={s.root}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={s.title}>Level {level(progress.xp)}</Text>
        <View style={s.bar}><View style={[s.fill, { width: `${xpInLevel}%` }]} /></View>
        <Text style={s.mute}>{xpInLevel}/100 XP to next level · Best streak {progress.bestStreak} 🔥</Text>
        {badges.map(b => {
          const got = b.earned(progress);
          return (
            <View key={b.id} style={[s.row, !got && { opacity: 0.4 }]}>
              <Text style={s.icon}>{got ? b.icon : '🔒'}</Text>
              <View style={{ flex: 1 }}><Text style={s.name}>{b.name}</Text><Text style={s.desc}>{b.desc}</Text></View>
            </View>);
        })}
      </ScrollView>
    </SafeAreaView>);
}
const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: c.bg },
  title: { color: c.text, fontSize: 28, fontWeight: '900', marginBottom: 10 },
  bar: { height: 14, borderRadius: 7, backgroundColor: c.line, overflow: 'hidden' },
  fill: { height: 14, backgroundColor: c.blue },
  mute: { color: c.mute, marginTop: 8, marginBottom: 20 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: c.card, padding: 14, borderRadius: 14, marginBottom: 10 },
  icon: { fontSize: 30 },
  name: { color: c.text, fontWeight: '800', fontSize: 16 },
  desc: { color: c.mute, fontSize: 13 },
});
