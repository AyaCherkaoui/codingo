import React, { useEffect, useMemo, useState } from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { c } from '../theme';
import { Question } from '../content/types';

interface Props { q: Question; locked: boolean; onChange: (correct: boolean | null) => void }

const shuffle = <T,>(a: T[]) => [...a].sort(() => Math.random() - 0.5);

function Option({ label, selected, locked, onPress, mono }:
  { label: string; selected: boolean; locked: boolean; onPress: () => void; mono?: boolean }) {
  return (
    <Pressable disabled={locked} onPress={onPress}
      style={[s.opt, selected && { borderColor: c.blue, backgroundColor: '#1a3a4a' }]}>
      <Text style={[s.optTxt, mono && { fontFamily: 'Menlo' }]}>{label}</Text>
    </Pressable>
  );
}

function Choice({ q, locked, onChange }: Props & { q: Extract<Question, { type: 'choice' }> }) {
  const [sel, setSel] = useState<number | null>(null);
  return <View>{q.options.map((o, i) => (
    <Option key={i} label={o} selected={sel === i} locked={locked}
      onPress={() => { setSel(i); onChange(i === q.answer); }} />))}</View>;
}

function Blank({ q, locked, onChange }: Props & { q: Extract<Question, { type: 'blank' }> }) {
  const [sel, setSel] = useState<string | null>(null);
  const [pre, post] = q.code.split('___');
  return (
    <View>
      <View style={s.code}><Text style={s.codeTxt}>{pre}<Text style={{ color: c.blue }}>{sel ?? '_____'}</Text>{post}</Text></View>
      {q.options.map(o => (
        <Option key={o} mono label={o} selected={sel === o} locked={locked}
          onPress={() => { setSel(o); onChange(o === q.answer); }} />))}
    </View>
  );
}

function Bug({ q, locked, onChange }: Props & { q: Extract<Question, { type: 'bug' }> }) {
  const [sel, setSel] = useState<number | null>(null);
  return <View style={s.code}>{q.lines.map((l, i) => (
    <Pressable key={i} disabled={locked} onPress={() => { setSel(i); onChange(i === q.buggyLine); }}
      style={[s.line, sel === i && { backgroundColor: '#1a3a4a' }]}>
      <Text style={s.codeTxt}>{l}</Text>
    </Pressable>))}</View>;
}

function Order({ q, locked, onChange }: Props & { q: Extract<Question, { type: 'order' }> }) {
  const bank = useMemo(() => shuffle(q.steps), [q]);
  const [picked, setPicked] = useState<string[]>([]);
  useEffect(() => {
    onChange(picked.length === q.steps.length ? picked.every((p, i) => p === q.steps[i]) : null);
  }, [picked]);
  return (
    <View>
      <View style={s.slots}>{picked.map((p, i) => (
        <Pressable key={p} disabled={locked} onPress={() => setPicked(picked.filter(x => x !== p))}
          style={[s.opt, { borderColor: c.blue }]}><Text style={[s.optTxt, q.code && { fontFamily: 'Menlo' }]}>{q.code ? p : `${i + 1}. ${p}`}</Text></Pressable>))}</View>
      <View style={s.divider} />
      {bank.filter(b => !picked.includes(b)).map(b => (
        <Option key={b} mono={q.code} label={b} selected={false} locked={locked} onPress={() => setPicked([...picked, b])} />))}
    </View>
  );
}

export function QuestionView(props: Props) {
  const { q } = props;
  return (
    <View>
      <Text style={s.prompt}>{q.prompt}</Text>
      {q.type === 'choice' && <Choice {...props} q={q} />}
      {q.type === 'blank' && <Blank {...props} q={q} />}
      {q.type === 'bug' && <Bug {...props} q={q} />}
      {q.type === 'order' && <Order {...props} q={q} />}
    </View>
  );
}

const s = StyleSheet.create({
  prompt: { color: c.text, fontSize: 22, fontWeight: '800', marginBottom: 20 },
  opt: { borderWidth: 2, borderBottomWidth: 4, borderColor: c.line, borderRadius: 14, padding: 15, marginBottom: 10, backgroundColor: c.card },
  optTxt: { color: c.text, fontSize: 16, fontWeight: '600' },
  code: { backgroundColor: c.card, borderRadius: 14, padding: 12, marginBottom: 14 },
  codeTxt: { color: c.text, fontFamily: 'Menlo', fontSize: 14 },
  line: { paddingVertical: 6, paddingHorizontal: 6, borderRadius: 8 },
  slots: { minHeight: 60 },
  divider: { height: 2, backgroundColor: c.line, marginVertical: 10 },
});
