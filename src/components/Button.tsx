import React, { useRef } from 'react';
import { Animated, Pressable, Text, StyleSheet } from 'react-native';
import { c } from '../theme';

export function Button({ label, onPress, disabled, color = c.primary, shadow = c.primaryDark }:
  { label: string; onPress: () => void; disabled?: boolean; color?: string; shadow?: string }) {
  const s = useRef(new Animated.Value(1)).current;
  const to = (v: number) => Animated.spring(s, { toValue: v, friction: 5, tension: 200, useNativeDriver: true }).start();
  return (
    <Animated.View style={{ transform: [{ scale: s }] }}>
      <Pressable onPress={onPress} disabled={disabled} onPressIn={() => to(0.96)} onPressOut={() => to(1)}
        style={[st.btn, { backgroundColor: disabled ? c.line : color, borderBottomColor: disabled ? '#241e50' : shadow }]}>
        <Text style={[st.txt, disabled && { color: c.mute }]}>{label.toUpperCase()}</Text>
      </Pressable>
    </Animated.View>
  );
}
const st = StyleSheet.create({
  btn: { borderRadius: 18, paddingVertical: 15, alignItems: 'center', borderBottomWidth: 5 },
  txt: { color: '#fff', fontWeight: '900', fontSize: 16, letterSpacing: 1 },
});
