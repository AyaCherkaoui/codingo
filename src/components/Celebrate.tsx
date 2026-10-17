import React, { useEffect, useRef } from 'react';
import { Animated, Easing, SafeAreaView, Text, View } from 'react-native';
import { Appear } from './Appear';
import { Button } from './Button';
import { Confetti } from './Confetti';
import { Mascot } from './Mascot';
import { levelUp } from '../feedback';
import { c } from '../theme';

function Ring({ delay }: { delay: number }) {
  const v = useRef(new Animated.Value(0)).current;
  useEffect(() => { Animated.loop(Animated.timing(v, { toValue: 1, duration: 2200, delay, easing: Easing.out(Easing.quad), useNativeDriver: true })).start(); }, []);
  return <Animated.View style={{ position: 'absolute', width: 200, height: 200, borderRadius: 100, borderWidth: 4, borderColor: c.primaryLight,
    opacity: v.interpolate({ inputRange: [0, 1], outputRange: [0.8, 0] }), transform: [{ scale: v.interpolate({ inputRange: [0, 1], outputRange: [0.6, 2.4] }) }] }} />;
}

export function Celebrate({ levelUp: lv, badges, onDone }: { levelUp: number | null; badges: string[]; onDone: () => void }) {
  useEffect(() => { levelUp(); }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.bg }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
        <View style={{ alignItems: 'center', justifyContent: 'center', height: 240 }}>
          <Ring delay={0} /><Ring delay={700} /><Ring delay={1400} />
          <Mascot size={170} mood="cheer" />
        </View>
        {lv && <Appear from="scale"><Text style={{ color: c.primaryLight, fontSize: 36, fontWeight: '900', marginTop: 8 }}>Level {lv}!</Text></Appear>}
        {badges.length > 0 && <Appear delay={200}><Text style={{ color: c.gold, fontSize: 20, fontWeight: '900', marginTop: 16, textAlign: 'center' }}>New badge{badges.length > 1 ? 's' : ''} unlocked</Text></Appear>}
        {badges.map((b, i) => <Appear key={b} delay={350 + i * 120}><Text style={{ color: c.text, fontSize: 20, marginTop: 8, fontWeight: '700', textAlign: 'center' }}>{b}</Text></Appear>)}
      </View>
      <Confetti count={36} />
      <View style={{ padding: 20 }}><Button label="Continue" onPress={onDone} /></View>
    </SafeAreaView>);
}
