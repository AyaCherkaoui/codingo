import React from 'react';
import { SafeAreaView, ScrollView, Text, View, StyleSheet } from 'react-native';
import { Progress, dueReviews } from '../storage';
import { lessonById } from '../content/lessons';
import { Button } from '../components/Button';
import { units } from '../content/curriculum';
import { unitDone } from '../exams';
import { c } from '../theme';

export function ReviewTab({ progress, onStart, onCode, onExam }: { progress: Progress; onStart: () => void; onCode: () => void; onExam: (topic: string) => void }) {
  const due = dueReviews(progress);
  return (
    <SafeAreaView style={s.root}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={s.title}>Review</Text>
        <Text style={s.mute}>Old lessons come back after 1, 3, 7, 14 and 30 days so you remember them.</Text>
        <View style={s.card}>
          <Text style={s.big}>{due.length === 0 ? '🎉 All caught up' : `${due.length} lesson${due.length > 1 ? 's' : ''} due`}</Text>
          {due.slice(0, 8).map(id => <Text key={id} style={s.item}>• {lessonById.get(id)?.problem ?? id}</Text>)}
        </View>
        <Button label="Start review" disabled={due.length === 0} onPress={onStart} />
        <Text style={s.sec}>Code review 💻</Text>
        <Text style={s.mute}>Type, fill and debug code from lessons you finished.</Text>
        <Button label="Start code review" disabled={progress.completed.length === 0} onPress={onCode} color={c.blue} shadow="#1590c8" />
        <Text style={s.sec}>Exams 🎓</Text>
        <Text style={s.mute}>Pass a unit's lessons to open its cumulative exam. It mixes that unit with everything before it.</Text>
        {units.map(u => {
          const open = unitDone(u.topic, progress.completed);
          return open ? <View key={u.topic} style={{ marginBottom: 10 }}><Button label={`${u.topic} exam`} onPress={() => onExam(u.topic)} color={c.gold} shadow="#c9a020" /></View>
            : <Text key={u.topic} style={s.locked}>🔒 {u.topic} · {u.entries.filter(e => progress.completed.includes(e.id)).length}/{u.entries.length} lessons</Text>;
        })}
      </ScrollView>
    </SafeAreaView>);
}
const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: c.bg },
  title: { color: c.text, fontSize: 28, fontWeight: '900', marginBottom: 6 },
  mute: { color: c.mute, marginBottom: 20 },
  card: { backgroundColor: c.card, borderRadius: 16, padding: 16, marginBottom: 20 },
  big: { color: c.text, fontSize: 20, fontWeight: '800', marginBottom: 8 },
  sec: { color: c.text, fontSize: 20, fontWeight: '900', marginTop: 28, marginBottom: 6 },
  locked: { color: c.mute, fontSize: 14, marginBottom: 8 },
  item: { color: c.mute, fontSize: 15, marginTop: 4 },
});
