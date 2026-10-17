import React from 'react';
import { SafeAreaView, Text, View, StyleSheet } from 'react-native';
import { Button } from '../components/Button';
import { c } from '../theme';

export function Onboarding({ onDone }: { onDone: () => void }) {
  return (
    <SafeAreaView style={s.root}>
      <View style={s.center}>
        <Text style={{ fontSize: 72 }}>🧩</Text>
        <Text style={s.title}>Welcome to Codingo</Text>
        <Text style={s.body}>250 problems. 250 days. 5 minutes a day.</Text>
        <Text style={s.item}>📚 Learn the idea in a few cards</Text>
        <Text style={s.item}>👆 Answer by tapping, no typing</Text>
        <Text style={s.item}>🔥 Keep your streak, earn XP and badges</Text>
        <Text style={s.item}>🔁 Old lessons come back so you remember</Text>
      </View>
      <View style={{ padding: 20 }}><Button label="Let's go" onPress={onDone} /></View>
    </SafeAreaView>);
}
const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: c.bg },
  center: { flex: 1, justifyContent: 'center', padding: 28 },
  title: { color: c.text, fontSize: 32, fontWeight: '900', marginTop: 10 },
  body: { color: c.green, fontSize: 18, fontWeight: '800', marginVertical: 14 },
  item: { color: c.text, fontSize: 17, marginVertical: 6 },
});
