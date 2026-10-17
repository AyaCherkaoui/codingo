import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, Text, View, StyleSheet } from 'react-native';
import { tap } from '../feedback';
import { c } from '../theme';

export type Tab = 'learn' | 'review' | 'friends' | 'badges' | 'me';
const tabs: { id: Tab; icon: string; label: string }[] = [
  { id: 'learn', icon: '🏠', label: 'Learn' }, { id: 'review', icon: '🔁', label: 'Review' },
  { id: 'friends', icon: '👥', label: 'Friends' }, { id: 'badges', icon: '🏆', label: 'Badges' },
  { id: 'me', icon: '⚙️', label: 'Me' },
];

function Item({ t, active, dot, onPress }: { t: typeof tabs[number]; active: boolean; dot: boolean; onPress: () => void }) {
  const v = useRef(new Animated.Value(active ? 1 : 0)).current;
  useEffect(() => { Animated.spring(v, { toValue: active ? 1 : 0, friction: 5, tension: 160, useNativeDriver: true }).start(); }, [active]);
  return (
    <Pressable onPress={onPress} style={s.item}>
      <Animated.View style={[s.pill, active && { backgroundColor: c.card2 }, { transform: [{ scale: v.interpolate({ inputRange: [0, 1], outputRange: [1, 1.12] }) }, { translateY: v.interpolate({ inputRange: [0, 1], outputRange: [0, -3] }) }] }]}>
        <Text style={[s.icon, !active && { opacity: 0.55 }]}>{t.icon}</Text>
        {dot && <View style={s.dot} />}
      </Animated.View>
      <Text style={[s.label, active && { color: c.primaryLight }]}>{t.label}</Text>
    </Pressable>);
}

export function TabBar({ tab, onTab, dueCount }: { tab: Tab; onTab: (t: Tab) => void; dueCount: number }) {
  return (
    <View style={s.bar}>
      {tabs.map(t => <Item key={t.id} t={t} active={tab === t.id} dot={t.id === 'review' && dueCount > 0} onPress={() => { tap(); onTab(t.id); }} />)}
    </View>);
}
const s = StyleSheet.create({
  bar: { flexDirection: 'row', backgroundColor: c.card, borderTopWidth: 2, borderColor: c.line, paddingBottom: 18, paddingTop: 8 },
  item: { flex: 1, alignItems: 'center' },
  pill: { paddingHorizontal: 14, paddingVertical: 4, borderRadius: 14 },
  icon: { fontSize: 20 },
  dot: { position: 'absolute', top: 2, right: 8, width: 9, height: 9, borderRadius: 5, backgroundColor: c.bad },
  label: { color: c.mute, fontSize: 11, fontWeight: '800', marginTop: 2 },
});
