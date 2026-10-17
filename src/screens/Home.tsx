import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Pressable, SafeAreaView, ScrollView, Text, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { units } from '../content/curriculum';
import { lessonByDay } from '../content/lessons';
import { Progress, level, minutesToNextHeart } from '../storage';
import { Appear } from '../components/Appear';
import { Logo } from '../components/Logo';
import { Mascot } from '../components/Mascot';
import { tap } from '../feedback';
import { c, ICON } from '../theme';

const OFFSETS = [0, 46, 70, 46, 0, -46, -70, -46];

function loop(v: Animated.Value, from: number, to: number, ms: number) {
  const a = Animated.loop(Animated.sequence([
    Animated.timing(v, { toValue: to, duration: ms, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
    Animated.timing(v, { toValue: from, duration: ms, easing: Easing.inOut(Easing.sin), useNativeDriver: true })]));
  a.start();
  return a;
}

function Pulse({ children, on }: { children: React.ReactNode; on: boolean }) {
  const v = useRef(new Animated.Value(0)).current;
  useEffect(() => { if (!on) return; const a = loop(v, 0, 1, 750); return () => a.stop(); }, [on]);
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      {on && <Animated.View style={[s.glow, { opacity: v.interpolate({ inputRange: [0, 1], outputRange: [0.5, 0] }), transform: [{ scale: v.interpolate({ inputRange: [0, 1], outputRange: [1, 1.6] }) }] }]} />}
      <Animated.View style={{ transform: [{ scale: v.interpolate({ inputRange: [0, 1], outputRange: [1, on ? 1.08 : 1] }) }] }}>{children}</Animated.View>
    </View>);
}

function Flame({ n }: { n: number }) {
  const v = useRef(new Animated.Value(0)).current;
  useEffect(() => { if (n === 0) return; const a = loop(v, 0, 1, 420); return () => a.stop(); }, [n]);
  return (
    <Animated.Text style={[s.stat, { color: c.orange, transform: [{ scale: v.interpolate({ inputRange: [0, 1], outputRange: [1, 1.18] }) }, { rotate: v.interpolate({ inputRange: [0, 1], outputRange: ['-6deg', '6deg'] }) }] }]}>
      {ICON.streak}
    </Animated.Text>);
}

export function Home({ progress, onStart }: { progress: Progress; onStart: (day: number) => void }) {
  const all = units.flatMap(u => u.entries);
  const current = all.find(e => !progress.completed.includes(e.id))?.day ?? 251;
  const noHearts = progress.hearts === 0;
  const currentEntry = all.find(e => e.day === current);

  return (
    <SafeAreaView style={s.root}>
      <View style={s.top}>
        <Logo size={20} />
        <View style={s.stats}>
          <View style={s.pill}><Flame n={progress.streak} /><Text style={[s.stat, { color: c.orange }]}>{progress.streak}</Text></View>
          {progress.freezes > 0 && <View style={s.pill}><Text style={[s.stat, { color: c.blue }]}>{ICON.freeze}{progress.freezes}</Text></View>}
          <View style={s.pill}><Text style={[s.stat, { color: c.gold }]}>{ICON.xp}{progress.xp}</Text></View>
          <View style={s.pill}><Text style={[s.stat, { color: c.good }]}>{ICON.life}{progress.hearts}</Text></View>
        </View>
      </View>
      <View style={s.levelRow}>
        <Text style={s.lvl}>Lv {level(progress.xp)}</Text>
        <View style={s.lvlBar}><View style={{ height: 6, width: `${progress.xp % 100}%`, backgroundColor: c.primaryLight, borderRadius: 3 }} /></View>
      </View>
      {noHearts && <Text style={s.warn}>{ICON.life} Battery drained. Recharges in {minutesToNextHeart(progress)} min.</Text>}
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        {units.map((u, ui) => {
          const doneCount = u.entries.filter(e => progress.completed.includes(e.id)).length;
          return (
          <View key={u.topic}>
            <Appear delay={Math.min(ui, 4) * 60}>
              <LinearGradient colors={[c.primary, '#4b2fd0']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={s.banner}>
                <View style={{ flex: 1 }}>
                  <Text style={s.bannerTxt}>{u.topic}</Text>
                  <View style={s.bannerBar}><View style={{ height: 6, width: `${(doneCount / u.entries.length) * 100}%`, backgroundColor: c.good, borderRadius: 3 }} /></View>
                </View>
                <Text style={s.bannerSub}>{doneCount}/{u.entries.length}</Text>
              </LinearGradient>
            </Appear>
            {u.entries.map((e, i) => {
              const done = progress.completed.includes(e.id);
              const hasContent = lessonByDay.has(e.day);
              const unlocked = e.day <= current;
              const playable = hasContent && (unlocked || done) && !noHearts;
              const isCurrent = e.day === current;
              const off = OFFSETS[e.day % 8];
              const prevOff = OFFSETS[(e.day - 1) % 8];
              const bg = done ? c.good : playable ? c.primary : c.line;
              const shadow = done ? c.goodDark : playable ? c.primaryDark : '#241e50';
              return (
                <View key={e.id}>
                  {i > 0 && (
                    <View style={{ alignItems: 'center', height: 22, transform: [{ translateX: (off + prevOff) / 2 }] }}>
                      {[0, 1, 2].map(d => <View key={d} style={[s.trail, done && { backgroundColor: c.good }]} />)}
                    </View>)}
                  <View style={{ alignItems: 'center', marginVertical: 2 }}>
                    <View style={{ transform: [{ translateX: off }] }}>
                      {isCurrent && playable && <Text style={s.start}>START</Text>}
                      <Pulse on={isCurrent && playable}>
                        <Pressable disabled={!playable} onPress={() => { tap(); onStart(e.day); }}
                          style={({ pressed }) => [s.node, { backgroundColor: bg, borderBottomColor: shadow }, pressed && { transform: [{ translateY: 4 }], borderBottomWidth: 3 }]}>
                          <Text style={[s.icon, !playable && !done && { opacity: 0.7 }]}>{done ? '✓' : isCurrent && playable ? '</>' : playable ? '{ }' : '🔒'}</Text>
                        </Pressable>
                      </Pulse>
                    </View>
                    {isCurrent && playable && (
                      <View style={[s.mascot, off >= 0 ? { left: 14 } : { right: 14 }]}><Mascot size={78} mood="idle" /></View>)}
                    <Text style={[s.label, done && { color: c.good }]} numberOfLines={1}>{e.day}. {e.problem}</Text>
                  </View>
                </View>);
            })}
          </View>);
        })}
        {currentEntry === undefined && <View style={{ alignItems: 'center', marginTop: 20 }}><Mascot size={120} mood="cheer" /><Text style={s.foot}>All 250 shipped. Legend. 👑</Text></View>}
      </ScrollView>
    </SafeAreaView>);
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: c.bg },
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 10, paddingBottom: 8 },
  stats: { flexDirection: 'row', gap: 6 },
  pill: { flexDirection: 'row', alignItems: 'center', backgroundColor: c.card, borderRadius: 14, paddingHorizontal: 8, paddingVertical: 4, gap: 2 },
  stat: { fontSize: 14, fontWeight: '900' },
  levelRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 16, paddingBottom: 10, borderBottomWidth: 2, borderColor: c.line },
  lvl: { color: c.primaryLight, fontWeight: '900', fontSize: 12 },
  lvlBar: { flex: 1, height: 6, borderRadius: 3, backgroundColor: c.line },
  warn: { backgroundColor: '#4a1626', color: c.bad, padding: 10, textAlign: 'center', fontWeight: '700' },
  banner: { margin: 16, marginTop: 30, padding: 16, borderRadius: 20, flexDirection: 'row', alignItems: 'center', gap: 12 },
  bannerTxt: { color: '#fff', fontSize: 18, fontWeight: '900', marginBottom: 8 },
  bannerBar: { height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.25)' },
  bannerSub: { color: '#fff', fontWeight: '900', fontSize: 16 },
  node: { width: 72, height: 72, borderRadius: 24, borderBottomWidth: 7, alignItems: 'center', justifyContent: 'center' },
  icon: { fontSize: 22, fontWeight: '900', color: '#fff' },
  glow: { position: 'absolute', width: 72, height: 72, borderRadius: 24, backgroundColor: c.primaryLight },
  trail: { width: 5, height: 5, borderRadius: 3, backgroundColor: c.line, marginVertical: 2 },
  label: { color: c.mute, fontSize: 12, marginTop: 6, maxWidth: 220, fontWeight: '600' },
  start: { color: c.primaryLight, fontWeight: '900', textAlign: 'center', marginBottom: 4, letterSpacing: 1 },
  mascot: { position: 'absolute', top: 6 },
  foot: { color: c.text, textAlign: 'center', marginTop: 10, fontWeight: '800', fontSize: 16 },
});
