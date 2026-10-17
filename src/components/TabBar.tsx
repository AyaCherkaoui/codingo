import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { c } from '../theme';

export type Tab = 'learn' | 'review' | 'friends' | 'badges' | 'me';
const tabs: { id: Tab; icon: string; label: string }[] = [
  { id: 'learn', icon: '🏠', label: 'Learn' }, { id: 'review', icon: '🔁', label: 'Review' },
  { id: 'friends', icon: '👥', label: 'Friends' }, { id: 'badges', icon: '🏆', label: 'Badges' }, { id: 'me', icon: '⚙️', label: 'Me' },
];

export function TabBar({ tab, onTab, dueCount }: { tab: Tab; onTab: (t: Tab) => void; dueCount: number }) {
  return (
    <View style={s.bar}>
      {tabs.map(t => (
        <Pressable key={t.id} onPress={() => onTab(t.id)} style={s.item}>
          <Text style={[s.icon, tab !== t.id && { opacity: 0.5 }]}>{t.icon}{t.id === 'review' && dueCount > 0 ? ' •' : ''}</Text>
          <Text style={[s.label, tab === t.id && { color: c.blue }]}>{t.label}</Text>
        </Pressable>))}
    </View>);
}
const s = StyleSheet.create({
  bar: { flexDirection: 'row', backgroundColor: c.card, borderTopWidth: 2, borderColor: c.line, paddingBottom: 18, paddingTop: 8 },
  item: { flex: 1, alignItems: 'center' },
  icon: { fontSize: 22, color: c.red },
  label: { color: c.mute, fontSize: 11, fontWeight: '700', marginTop: 2 },
});
