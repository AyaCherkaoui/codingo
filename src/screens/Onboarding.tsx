import React from 'react';
import { SafeAreaView, Text, View, StyleSheet } from 'react-native';
import { Appear } from '../components/Appear';
import { Bubble } from '../components/Bubble';
import { Button } from '../components/Button';
import { Logo } from '../components/Logo';
import { Mascot } from '../components/Mascot';
import { TAGLINE } from '../brand';
import { c } from '../theme';

export function Onboarding({ onDone }: { onDone: () => void }) {
  return (
    <SafeAreaView style={s.root}>
      <View style={s.center}>
        <Appear from="scale"><Logo size={34} /></Appear>
        <Text style={s.tag}>{TAGLINE}</Text>
        <View style={{ marginTop: 18, alignItems: 'center' }}>
          <Appear delay={200}><Bubble style={{ marginBottom: 14 }}>Hi, I'm Bracey! I'll walk you through 250 LeetCode problems, 5 minutes a day.</Bubble></Appear>
          <Mascot size={170} mood="happy" />
        </View>
        <View style={{ marginTop: 22 }}>
          {['📚 Short cards teach the pattern', '👆 Tap to answer. No typing code', '⚡ Combos, XP, streaks and badges', '🔁 Old lessons come back so they stick'].map((t, i) => (
            <Appear key={t} delay={350 + i * 90} from="left"><Text style={s.item}>{t}</Text></Appear>))}
        </View>
      </View>
      <View style={{ padding: 20 }}><Button label="Let's ship" onPress={onDone} /></View>
    </SafeAreaView>);
}
const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: c.bg },
  center: { flex: 1, justifyContent: 'center', padding: 24 },
  tag: { color: c.good, fontSize: 16, fontWeight: '800', marginTop: 6 },
  item: { color: c.text, fontSize: 16, marginVertical: 5, fontWeight: '600' },
});
