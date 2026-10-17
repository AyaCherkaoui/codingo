import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Pressable, SafeAreaView, ScrollView, Text, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Lesson, Question } from '../content/types';
import { Button } from '../components/Button';
import { Appear } from '../components/Appear';
import { Bubble } from '../components/Bubble';
import { Confetti } from '../components/Confetti';
import { Mascot, Mood } from '../components/Mascot';
import { QuestionView } from '../components/Questions';
import { good, bad, celebrate } from '../feedback';
import { shareText, REPO } from '../share';
import { LOSE, WIN, pick } from '../brand';
import { c, ICON } from '../theme';

// Written hint if the lesson has one, otherwise one derived from the question type.
function hintText(q: Question): string {
  if (q.hint) return q.hint;
  if (q.type === 'order') return `The first step is: ${q.steps[0]}`;
  if (q.type === 'bug') { const half = Math.ceil(q.lines.length / 2); return q.buggyLine < half ? 'The bug is in the top half of the code.' : 'The bug is in the bottom half of the code.'; }
  return 'One wrong answer removed.';
}

export function LessonScreen({ lesson, startHearts, streak, onWrong, onExit, onDone }: {
  lesson: Lesson; startHearts: number; streak: number; onWrong: () => void; onExit: () => void; onDone: (xp: number) => void;
}) {
  const [card, setCard] = useState(0);
  const [queue, setQueue] = useState<Question[]>(lesson.questions);
  const [hearts, setHearts] = useState(startHearts);
  const [correct, setCorrect] = useState<boolean | null>(null);
  const [result, setResult] = useState<boolean | null>(null);
  const [msg, setMsg] = useState('');
  const [done, setDone] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [hints, setHints] = useState<{ q: Question; elim: number | string | null }[]>([]); // each question's hint is paid for once
  const hintsUsed = hints.length;
  const [xpShown, setXpShown] = useState(0);
  const total = lesson.questions.length;
  const teaching = card < lesson.teach.length;
  const finished = !teaching && queue.length === 0;
  const xp = Math.max(5, 10 + (total - mistakes) * 3 - hintsUsed * 2 + Math.min(bestCombo, 5));

  const shake = useRef(new Animated.Value(0)).current;
  const sheet = useRef(new Animated.Value(0)).current;
  const prog = useRef(new Animated.Value(0)).current;
  const comboPop = useRef(new Animated.Value(1)).current;
  const target = teaching ? 0 : done / total;

  useEffect(() => { Animated.timing(prog, { toValue: target, duration: 450, easing: Easing.out(Easing.cubic), useNativeDriver: false }).start(); }, [target]);
  useEffect(() => {
    if (result === null) { sheet.setValue(0); return; }
    Animated.spring(sheet, { toValue: 1, friction: 8, tension: 90, useNativeDriver: true }).start();
    if (result === false) Animated.sequence([-12, 12, -9, 9, -5, 0].map(v => Animated.timing(shake, { toValue: v, duration: 50, useNativeDriver: true }))).start();
  }, [result]);
  useEffect(() => {
    if (combo < 2) return;
    comboPop.setValue(0.6);
    Animated.spring(comboPop, { toValue: 1, friction: 3, tension: 200, useNativeDriver: true }).start();
  }, [combo]);
  useEffect(() => {
    if (!finished) return;
    celebrate();
    const id = setInterval(() => setXpShown(v => { if (v >= xp) { clearInterval(id); return xp; } return v + 1; }), 35);
    return () => clearInterval(id);
  }, [finished]);

  const header = (
    <View style={s.head}>
      <Pressable onPress={onExit} hitSlop={12}><Text style={s.x}>✕</Text></Pressable>
      <View style={s.bar}>
        <Animated.View style={{ height: 16, width: prog.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }) }}>
          <LinearGradient colors={[c.primary, c.good]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ flex: 1, borderRadius: 8 }} />
        </Animated.View>
      </View>
      <Text style={s.hearts}>{ICON.life} {hearts}</Text>
    </View>
  );

  if (hearts === 0) return (
    <SafeAreaView style={s.root}>{header}
      <View style={s.center}>
        <View style={{ alignItems: 'center', marginBottom: 20 }}><Mascot size={150} mood="sad" /></View>
        <Text style={[s.big, { textAlign: 'center' }]}>Battery drained {ICON.life}</Text>
        <Text style={[s.mute, { textAlign: 'center' }]}>Energy recharges 1 every 30 min. Do a Review or come back soon.</Text>
      </View>
      <View style={s.pad}><Button label="Back" onPress={onExit} color={c.bad} shadow={c.badDark} /></View>
    </SafeAreaView>);

  if (teaching) return (
    <SafeAreaView style={s.root}>{header}
      <ScrollView contentContainerStyle={s.center}>
        <Text style={s.tag}>{lesson.topic} · Day {lesson.day}</Text>
        <Text style={s.big}>{lesson.problem}</Text>
        <Appear key={card} from="right">
          <Bubble>{lesson.teach[card]}</Bubble>
        </Appear>
        <View style={{ marginTop: 22, marginLeft: 12 }}><Mascot size={120} mood="think" /></View>
        <View style={s.dots}>{lesson.teach.map((_, i) => <View key={i} style={[s.dot, i === card && { backgroundColor: c.primaryLight, width: 22 }]} />)}</View>
      </ScrollView>
      <View style={s.pad}><Button label={card === lesson.teach.length - 1 ? "Let's code" : 'Next'} onPress={() => setCard(card + 1)} /></View>
    </SafeAreaView>);

  if (finished) {
    const acc = Math.round(((total) / (total + mistakes)) * 100);
    return (
      <SafeAreaView style={s.root}>
        <View style={s.center}>
          <View style={{ alignItems: 'center' }}><Mascot size={170} mood="cheer" /></View>
          <Appear from="scale"><Text style={[s.big, { textAlign: 'center', marginTop: 10 }]}>{lesson.day === 0 ? 'Review shipped!' : 'Shipped! 🚀'}</Text></Appear>
          <Text style={[s.xp]}>+{xpShown} {ICON.xp}</Text>
          <View style={s.chips}>
            <View style={s.chip}><Text style={s.chipV}>{acc}%</Text><Text style={s.chipL}>accuracy</Text></View>
            <View style={s.chip}><Text style={s.chipV}>x{Math.max(bestCombo, 1)}</Text><Text style={s.chipL}>best combo</Text></View>
            <View style={s.chip}><Text style={s.chipV}>{streak}{ICON.streak}</Text><Text style={s.chipL}>streak</Text></View>
          </View>
        </View>
        <Confetti />
        <View style={s.pad}>
          <Pressable onPress={() => shareText(`${ICON.streak} ${streak}-day streak! Just shipped "${lesson.problem}" on Bracey. Learn LeetCode 5 min a day: ${REPO}`)}>
            <Text style={s.share}>📣 Share with friends</Text>
          </Pressable>
          <Button label="Claim XP" onPress={() => onDone(xp)} />
        </View>
      </SafeAreaView>);
  }

  const q = queue[0];
  const canHint = true; // every question has a hint (written, or derived below)
  const check = () => {
    setResult(!!correct);
    if (correct) { good(); setMsg(pick(WIN)); const n = combo + 1; setCombo(n); setBestCombo(b => Math.max(b, n)); }
    else { bad(); setMsg(pick(LOSE)); setHearts(hearts - 1); setMistakes(mistakes + 1); setCombo(0); onWrong(); }
  };
  const hinted = hints.find(h => h.q === q);
  const hintOn = !!hinted;
  const eliminated = hinted?.elim ?? null;
  const useHint = () => {
    let elim: number | string | null = null;
    if (q.type === 'choice') {
      const wrong = q.options.map((_, i) => i).filter(i => i !== q.answer);
      elim = wrong[Math.floor(Math.random() * wrong.length)];
    } else if (q.type === 'blank') {
      const wrong = q.options.filter(o => o !== q.answer);
      elim = wrong[Math.floor(Math.random() * wrong.length)];
    }
    setHints(h => [...h, { q, elim }]);
  };
  const next = () => {
    if (result) { setQueue(queue.slice(1)); setDone(done + 1); }
    else setQueue([...queue.slice(1), q]);
    setResult(null); setCorrect(null);
  };

  return (
    <SafeAreaView style={s.root}>{header}
      {combo >= 2 && result === null && (
        <Animated.View style={[s.combo, { transform: [{ scale: comboPop }] }]}><Text style={s.comboTxt}>⚡ x{combo} combo</Text></Animated.View>)}
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Animated.View style={{ transform: [{ translateX: shake }] }}>
          <Appear key={`${done}-${queue.length}-${hearts}`} from="right">
            <QuestionView q={q} locked={result !== null} onChange={setCorrect} eliminated={eliminated} />
          </Appear>
        </Animated.View>
        {canHint && result === null && (hintOn
          ? <Text style={s.hint}>💡 {hintText(q)}</Text>
          : <Pressable onPress={useHint}><Text style={s.hintBtn}>💡 Need a hint? (−2 XP)</Text></Pressable>)}
      </ScrollView>
      {result === null ? (
        <View style={s.pad}><Button label="Check" disabled={correct === null} onPress={check} /></View>
      ) : (
        <Animated.View style={[s.sheet, { backgroundColor: result ? '#0f3d33' : '#4a1626', transform: [{ translateY: sheet.interpolate({ inputRange: [0, 1], outputRange: [240, 0] }) }] }]}>
          <View style={s.sheetRow}>
            <Mascot size={64} mood={result ? 'happy' : 'sad'} float={false} />
            <Text style={[s.sheetTitle, { color: result ? c.good : c.bad }]}>{msg}</Text>
          </View>
          <Text style={s.sheetBody}>{q.explain}</Text>
          <Button label="Continue" onPress={next} color={result ? c.good : c.bad} shadow={result ? c.goodDark : c.badDark} />
        </Animated.View>)}
    </SafeAreaView>);
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: c.bg },
  head: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 12 },
  x: { color: c.mute, fontSize: 22 },
  bar: { flex: 1, height: 16, borderRadius: 8, backgroundColor: c.line, overflow: 'hidden' },
  hearts: { color: c.good, fontWeight: '900', fontSize: 16 },
  center: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  pad: { padding: 20 },
  tag: { color: c.primaryLight, fontWeight: '800', marginBottom: 8, letterSpacing: 0.5 },
  big: { color: c.text, fontSize: 30, fontWeight: '900', marginBottom: 16 },
  mute: { color: c.mute, fontSize: 16 },
  dots: { flexDirection: 'row', gap: 6, marginTop: 24, justifyContent: 'center' },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: c.line },
  xp: { color: c.gold, fontSize: 44, fontWeight: '900', textAlign: 'center', marginVertical: 6 },
  chips: { flexDirection: 'row', gap: 10, justifyContent: 'center', marginTop: 12 },
  chip: { backgroundColor: c.card, borderRadius: 16, paddingVertical: 12, paddingHorizontal: 16, alignItems: 'center', minWidth: 92 },
  chipV: { color: c.text, fontSize: 20, fontWeight: '900' },
  chipL: { color: c.mute, fontSize: 11, fontWeight: '700', marginTop: 2 },
  share: { color: c.blue, fontWeight: '800', textAlign: 'center', marginBottom: 14, fontSize: 15 },
  combo: { alignSelf: 'center', backgroundColor: c.gold, borderRadius: 14, paddingHorizontal: 14, paddingVertical: 4 },
  comboTxt: { color: '#2a1d00', fontWeight: '900' },
  hintBtn: { color: c.blue, fontWeight: '800', marginTop: 12 },
  hint: { color: c.gold, marginTop: 12, fontSize: 15 },
  sheet: { padding: 20, gap: 10 },
  sheetRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  sheetTitle: { fontSize: 22, fontWeight: '900', flex: 1 },
  sheetBody: { color: c.text, fontSize: 15, marginBottom: 6 },
});
