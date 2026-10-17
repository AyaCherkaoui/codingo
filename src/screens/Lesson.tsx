import React, { useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, Text, View, StyleSheet } from 'react-native';
import { Lesson, Question } from '../content/types';
import { Button } from '../components/Button';
import { QuestionView } from '../components/Questions';
import { c } from '../theme';

const HEARTS = 3;

export function LessonScreen({ lesson, onExit, onDone }:
  { lesson: Lesson; onExit: () => void; onDone: (xp: number) => void }) {
  const [card, setCard] = useState(0);
  const [queue, setQueue] = useState<Question[]>(lesson.questions);
  const [hearts, setHearts] = useState(HEARTS);
  const [correct, setCorrect] = useState<boolean | null>(null); // current selection state
  const [result, setResult] = useState<boolean | null>(null); // after Check
  const [done, setDone] = useState(0);
  const total = lesson.questions.length;
  const teaching = card < lesson.teach.length;

  const header = (
    <View style={s.head}>
      <Pressable onPress={onExit}><Text style={s.x}>✕</Text></Pressable>
      <View style={s.bar}><View style={[s.fill, { width: `${(teaching ? 0 : done / total) * 100}%` }]} /></View>
      <Text style={s.hearts}>❤️ {hearts}</Text>
    </View>
  );

  if (hearts === 0) return (
    <SafeAreaView style={s.root}>{header}
      <View style={s.center}><Text style={s.big}>Out of hearts 💔</Text>
        <Text style={s.mute}>Review the cards and try again.</Text></View>
      <View style={s.pad}><Button label="Try again" onPress={onExit} color={c.red} shadow={c.redDark} /></View>
    </SafeAreaView>);

  if (teaching) return (
    <SafeAreaView style={s.root}>{header}
      <View style={s.center}><Text style={s.tag}>{lesson.topic} · Day {lesson.day}</Text>
        <Text style={s.big}>{lesson.problem}</Text>
        <Text style={s.body}>{lesson.teach[card]}</Text></View>
      <View style={s.pad}><Button label="Continue" onPress={() => setCard(card + 1)} /></View>
    </SafeAreaView>);

  if (queue.length === 0) {
    const xp = 10 + hearts * 5;
    return (
      <SafeAreaView style={s.root}>
        <View style={s.center}><Text style={{ fontSize: 72 }}>🎉</Text>
          <Text style={s.big}>Lesson complete!</Text>
          <Text style={[s.body, { color: c.gold }]}>+{xp} XP</Text></View>
        <View style={s.pad}><Button label="Claim XP" onPress={() => onDone(xp)} /></View>
      </SafeAreaView>);
  }

  const q = queue[0];
  const check = () => {
    setResult(!!correct);
    if (!correct) setHearts(hearts - 1);
  };
  const next = () => {
    if (result) { setQueue(queue.slice(1)); setDone(done + 1); }
    else setQueue([...queue.slice(1), q]); // retry wrong ones at the end
    setResult(null); setCorrect(null);
  };

  return (
    <SafeAreaView style={s.root}>{header}
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <QuestionView key={`${done}-${queue.length}-${hearts}`} q={q} locked={result !== null} onChange={setCorrect} />
      </ScrollView>
      {result === null ? (
        <View style={s.pad}><Button label="Check" disabled={correct === null} onPress={check} /></View>
      ) : (
        <View style={[s.sheet, { backgroundColor: result ? '#1f3a12' : '#40191a' }]}>
          <Text style={[s.sheetTitle, { color: result ? c.green : c.red }]}>{result ? 'Nice! ✅' : 'Not quite ❌'}</Text>
          <Text style={s.sheetBody}>{q.explain}</Text>
          <Button label="Continue" onPress={next} color={result ? c.green : c.red} shadow={result ? c.greenDark : c.redDark} />
        </View>)}
    </SafeAreaView>);
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: c.bg },
  head: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 12 },
  x: { color: c.mute, fontSize: 22 },
  bar: { flex: 1, height: 14, borderRadius: 7, backgroundColor: c.line, overflow: 'hidden' },
  fill: { height: 14, backgroundColor: c.green },
  hearts: { color: c.red, fontWeight: '800', fontSize: 16 },
  center: { flex: 1, justifyContent: 'center', padding: 24 },
  pad: { padding: 20 },
  tag: { color: c.blue, fontWeight: '800', marginBottom: 8 },
  big: { color: c.text, fontSize: 30, fontWeight: '900', marginBottom: 12 },
  body: { color: c.text, fontSize: 20, lineHeight: 28 },
  mute: { color: c.mute, fontSize: 16 },
  sheet: { padding: 20, gap: 10 },
  sheetTitle: { fontSize: 20, fontWeight: '900' },
  sheetBody: { color: c.text, fontSize: 15, marginBottom: 6 },
});
