import React from 'react';
import { Pressable, SafeAreaView, ScrollView, Text, View, StyleSheet } from 'react-native';
import { units } from '../content/curriculum';
import { lessonByDay } from '../content/lessons';
import { Progress } from '../storage';
import { tap } from '../feedback';
import { c } from '../theme';

const OFFSETS = [0, 46, 70, 46, 0, -46, -70, -46];

export function Home({ progress, onStart }: { progress: Progress; onStart: (day: number) => void }) {
  // current = first entry not completed
  const all = units.flatMap(u => u.entries);
  const current = all.find(e => !progress.completed.includes(e.id))?.day ?? 251;

  return (
    <SafeAreaView style={s.root}>
      <View style={s.stats}>
        <Text style={[s.stat, { color: c.orange }]}>🔥 {progress.streak}</Text>
        <Text style={[s.stat, { color: c.mute }]}>{progress.completed.length}/250</Text>
        <Text style={[s.stat, { color: c.gold }]}>⚡ {progress.xp}</Text>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
        {units.map(u => (
          <View key={u.topic}>
            <View style={s.banner}><Text style={s.bannerTxt}>{u.topic}</Text></View>
            {u.entries.map(e => {
              const done = progress.completed.includes(e.id);
              const hasContent = lessonByDay.has(e.day);
              const unlocked = e.day <= current;
              const playable = hasContent && (unlocked || done);
              const isCurrent = e.day === current;
              const bg = done ? c.gold : playable ? c.green : c.line;
              const shadow = done ? '#c79d00' : playable ? c.greenDark : '#2b3840';
              return (
                <View key={e.id} style={{ alignItems: 'center', marginVertical: 8, transform: [{ translateX: OFFSETS[e.day % 8] }] }}>
                  {isCurrent && hasContent && <Text style={s.start}>START</Text>}
                  <Pressable disabled={!playable} onPress={() => { tap(); onStart(e.day); }}
                    style={[s.node, { backgroundColor: bg, borderBottomColor: shadow }]}>
                    <Text style={s.icon}>{done ? '⭐' : playable ? '🧩' : hasContent ? '🔒' : '🛠️'}</Text>
                  </Pressable>
                  <Text style={s.label} numberOfLines={1}>{e.day}. {e.problem}</Text>
                </View>);
            })}
          </View>))}
        <Text style={s.foot}>More lessons are on the way. Days 151-250 coming soon.</Text>
      </ScrollView>
    </SafeAreaView>);
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: c.bg },
  stats: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, borderBottomWidth: 2, borderColor: c.line },
  stat: { fontSize: 18, fontWeight: '900' },
  banner: { backgroundColor: c.green, margin: 16, marginTop: 28, padding: 14, borderRadius: 16 },
  bannerTxt: { color: '#fff', fontSize: 18, fontWeight: '900' },
  node: { width: 76, height: 76, borderRadius: 38, borderBottomWidth: 7, alignItems: 'center', justifyContent: 'center' },
  icon: { fontSize: 30 },
  label: { color: c.mute, fontSize: 12, marginTop: 6, maxWidth: 220 },
  start: { color: c.green, fontWeight: '900', marginBottom: 4 },
  foot: { color: c.mute, textAlign: 'center', marginTop: 30 },
});
