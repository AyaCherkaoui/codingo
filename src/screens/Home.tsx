import React from 'react';
import { SafeAreaView, Text, View, StyleSheet } from 'react-native';
import { Lesson } from '../content/types';
import { Progress } from '../storage';
import { Button } from '../components/Button';
import { c } from '../theme';

export function Home({ lesson, progress, onStart }: { lesson: Lesson; progress: Progress; onStart: () => void }) {
  const done = progress.completed.includes(lesson.id);
  return (
    <SafeAreaView style={s.root}>
      <View style={s.stats}>
        <Text style={[s.stat, { color: c.orange }]}>🔥 {progress.streak}</Text>
        <Text style={[s.stat, { color: c.gold }]}>⚡ {progress.xp} XP</Text>
      </View>
      <View style={s.center}>
        <View style={s.node}><Text style={{ fontSize: 44 }}>{done ? '⭐' : '🧩'}</Text></View>
        <Text style={s.tag}>Day {lesson.day} / 250</Text>
        <Text style={s.title}>{lesson.problem}</Text>
        <Text style={s.mute}>{lesson.topic}</Text>
      </View>
      <View style={{ padding: 20 }}><Button label={done ? 'Practice again' : 'Start'} onPress={onStart} /></View>
    </SafeAreaView>);
}
const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: c.bg },
  stats: { flexDirection: 'row', justifyContent: 'space-between', padding: 20 },
  stat: { fontSize: 18, fontWeight: '900' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  node: { width: 110, height: 110, borderRadius: 55, backgroundColor: c.green, borderBottomWidth: 8, borderBottomColor: c.greenDark, alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  tag: { color: c.blue, fontWeight: '800' },
  title: { color: c.text, fontSize: 28, fontWeight: '900', marginTop: 4 },
  mute: { color: c.mute, marginTop: 4 },
});
