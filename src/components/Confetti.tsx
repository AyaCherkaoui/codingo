import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, Dimensions, Easing, View } from 'react-native';

const EMOJI = ['🎉', '✨', '⭐', '🟢', '🟡', '🔵', '🧩'];
const { width, height } = Dimensions.get('window');

export function Confetti({ count = 28 }: { count?: number }) {
  const parts = useMemo(() => Array.from({ length: count }, (_, i) => ({
    x: Math.random() * width, delay: Math.random() * 700, dur: 1800 + Math.random() * 1400,
    spin: (Math.random() - 0.5) * 6, size: 16 + Math.random() * 16, e: EMOJI[i % EMOJI.length],
    v: new Animated.Value(0),
  })), [count]);
  const started = useRef(false);
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    parts.forEach(p => Animated.timing(p.v, { toValue: 1, duration: p.dur, delay: p.delay, easing: Easing.in(Easing.quad), useNativeDriver: true }).start());
  }, []);
  return (
    <View pointerEvents="none" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
      {parts.map((p, i) => (
        <Animated.Text key={i} style={{
          position: 'absolute', left: p.x, top: -40, fontSize: p.size,
          opacity: p.v.interpolate({ inputRange: [0, 0.05, 0.85, 1], outputRange: [0, 1, 1, 0] }),
          transform: [
            { translateY: p.v.interpolate({ inputRange: [0, 1], outputRange: [0, height + 60] }) },
            { rotate: p.v.interpolate({ inputRange: [0, 1], outputRange: ['0deg', `${p.spin * 180}deg`] }) },
          ],
        }}>{p.e}</Animated.Text>))}
    </View>);
}
