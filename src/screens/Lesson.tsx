import React, { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, SafeAreaView, ScrollView, Text, View, StyleSheet } from 'react-native';
import { Lesson, Question } from '../content/types';
import { Button } from '../components/Button';
import { QuestionView } from '../components/Questions';
import { good, bad } from '../feedback';
import { c } from '../theme';

export function LessonScreen({ lesson, startHearts, onWrong, onExit, onDone }: {
  lesson: Lesson; startHearts: number; onWrong: () => void; onExit: () => void; onDone: (xp: number) => void;
}) {
  const [card, setCard] = useState(0);
  const [queue, setQueue] = useState<Question[]>(lesson.questions);
  const [hearts, setHearts] = useState(startHearts);
  const [correct, setCorrect] = useState<boolean | null>(null);
  const [result, setResult] = useState<boolean | null>(null);
  const [done, setDone] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [hint, setHint] = useState(false);
  const total = lesson.questions.length;
  const teaching = card < lesson.teach.length;
  const pop = useRef(new Animated.Value(0)).current;
  const finished = !teaching && queue.length === 0;
  useEffect(() => {
    if (finished) Animated.spring(pop, { toValue: 1, friction: 4, useNativeDriver: true }).start();
  }, [finished]);

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
        <Text style={s.mute}>Hearts refill over time (1 every 30 min). Try Review or come back soon.</Text></View>
      <View style={s.pad}><Button label="Back" onPress={onExit} color={c.red} shadow={c.redDark} /></View>
    </SafeAreaView>);

  if (teaching) return (
    <SafeAreaView style={s.root}>{header}
      <View style={s.center}><Text style={s.tag}>{lesson.topic} · Day {lesson.day}</Text>
        <Text style={s.big}>{lesson.problem}</Text>
        <Text style={s.body}>{lesson.teach[card]}</Text></View>
      <View style={s.pad}><Button label="Continue" onPress={() => setCard(card + 1)} /></View>
    </SafeAreaView>);

  if (finished) {
    const xp = Math.max(5, 10 + (total - mistakes) * 3);
    return (
      <SafeAreaView style={s.root}>
        <View style={s.center}>
          <Animated.Text style={{ fontSize: 80, textAlign: 'center', transform: [{ scale: pop }] }}>🎉</Animated.Text>
          <Text style={[s.big, { textAlign: 'center' }]}>{lesson.day === 0 ? 'Review done!' : 'Lesson complete!'}</Text>
          <Text style={[s.body, { color: c.gold, textAlign: 'center' }]}>+{xp} XP</Text>
          <Text style={[s.mute, { textAlign: 'center', marginTop: 8 }]}>{mistakes === 0 ? 'Perfect, no mistakes!' : `${mistakes} mistake${mistakes > 1 ? 's' : ''}`}</Text>
        </View>
        <View style={s.pad}><Button label="Claim XP" onPress={() => onDone(xp)} /></View>
      </SafeAreaView>);
  }

  const q = queue[0];
  const check = () => {
    setResult(!!correct);
    if (correct) good();
    else { bad(); setHearts(hearts - 1); setMistakes(mistakes + 1); onWrong(); }
  };
  const next = () => {
    if (result) { setQueue(queue.slice(1)); setDone(done + 1); }
    else setQueue([...queue.slice(1), q]);
    setResult(null); setCorrect(null); setHint(false);
  };

  return (
    <SafeAreaView style={s.root}>{header}
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <QuestionView key={`${done}-${queue.length}-${hearts}`} q={q} locked={result !== null} onChange={setCorrect} />
        {q.hint && result === null && (
          hint ? <Text style={s.hint}>💡 {q.hint}</Text>
               : <Pressable onPress={() => setHint(true)}><Text style={s.hintBtn}>💡 Need a hint?</Text></Pressable>)}
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
  hintBtn: { color: c.blue, fontWeight: '800', marginTop: 12 },
  hint: { color: c.gold, marginTop: 12, fontSize: 15 },
  sheet: { padding: 20, gap: 10 },
  sheetTitle: { fontSize: 20, fontWeight: '900' },
  sheetBody: { color: c.text, fontSize: 15, marginBottom: 6 },
});
