import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { c } from '../theme';

export function Button({ label, onPress, disabled, color = c.green, shadow = c.greenDark }:
  { label: string; onPress: () => void; disabled?: boolean; color?: string; shadow?: string }) {
  return (
    <Pressable onPress={onPress} disabled={disabled}
      style={({ pressed }) => [s.btn, { backgroundColor: disabled ? c.line : color, borderBottomColor: disabled ? '#2b3840' : shadow },
        pressed && { transform: [{ translateY: 3 }], borderBottomWidth: 1 }]}>
      <Text style={[s.txt, disabled && { color: c.mute }]}>{label.toUpperCase()}</Text>
    </Pressable>
  );
}
const s = StyleSheet.create({
  btn: { borderRadius: 16, paddingVertical: 15, alignItems: 'center', borderBottomWidth: 5 },
  txt: { color: '#fff', fontWeight: '800', fontSize: 16, letterSpacing: 0.8 },
});
