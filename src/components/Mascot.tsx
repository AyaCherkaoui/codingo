import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing } from 'react-native';
import Svg, { Circle, Defs, Ellipse, LinearGradient, Path, Rect, Stop } from 'react-native-svg';
import { c } from '../theme';

export type Mood = 'idle' | 'happy' | 'sad' | 'cheer' | 'think';

// Bracey: a violet blob with curly-brace "ears" and a blinking text-cursor antenna.
export function Mascot({ size = 120, mood = 'idle', float = true }: { size?: number; mood?: Mood; float?: boolean }) {
  const bob = useRef(new Animated.Value(0)).current;
  const act = useRef(new Animated.Value(0)).current;
  const [cursor, setCursor] = useState(true);
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    if (!float) return;
    const a = Animated.loop(Animated.sequence([
      Animated.timing(bob, { toValue: 1, duration: 1400, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      Animated.timing(bob, { toValue: 0, duration: 1400, easing: Easing.inOut(Easing.sin), useNativeDriver: true })]));
    a.start();
    return () => a.stop();
  }, [float]);

  useEffect(() => {
    const t = setInterval(() => setCursor(v => !v), 520);
    let timeout: any;
    const loop = () => { timeout = setTimeout(() => { setBlink(true); setTimeout(() => setBlink(false), 130); loop(); }, 1800 + Math.random() * 2400); };
    loop();
    return () => { clearInterval(t); clearTimeout(timeout); };
  }, []);

  useEffect(() => {
    act.setValue(0);
    if (mood === 'cheer') Animated.loop(Animated.sequence([
      Animated.timing(act, { toValue: 1, duration: 280, easing: Easing.out(Easing.quad), useNativeDriver: true }),
      Animated.timing(act, { toValue: 0, duration: 280, easing: Easing.in(Easing.quad), useNativeDriver: true })])).start();
    else if (mood === 'happy') Animated.sequence([
      Animated.timing(act, { toValue: 1, duration: 160, useNativeDriver: true }),
      Animated.spring(act, { toValue: 0, friction: 3, useNativeDriver: true })]).start();
    else if (mood === 'sad') Animated.sequence([-1, 1, -0.6, 0.6, 0].map(v => Animated.timing(act, { toValue: v, duration: 70, useNativeDriver: true }))).start();
    else if (mood === 'think') Animated.timing(act, { toValue: 1, duration: 300, useNativeDriver: true }).start();
  }, [mood]);

  const jump = mood === 'cheer' || mood === 'happy';
  const transform = [
    { translateY: Animated.add(
        bob.interpolate({ inputRange: [0, 1], outputRange: [0, float ? -size * 0.04 : 0] }),
        jump ? act.interpolate({ inputRange: [0, 1], outputRange: [0, -size * 0.14] }) : new Animated.Value(mood === 'sad' ? size * 0.03 : 0)) },
    { translateX: mood === 'sad' ? act.interpolate({ inputRange: [-1, 1], outputRange: [-size * 0.05, size * 0.05] }) : 0 },
    { rotate: mood === 'think' ? act.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '-7deg'] })
      : mood === 'cheer' ? act.interpolate({ inputRange: [0, 1], outputRange: ['-4deg', '4deg'] }) : '0deg' },
  ];

  const eyesClosed = blink;
  const mouth =
    mood === 'sad' ? <Path d="M86 136 Q100 122 114 136" fill="none" stroke="#0d0a1f" strokeWidth={6} strokeLinecap="round" />
    : mood === 'cheer' ? <Path d="M82 120 Q100 150 118 120 Z" fill="#0d0a1f" stroke="#0d0a1f" strokeWidth={4} strokeLinejoin="round" />
    : mood === 'think' ? <Path d="M90 130 L112 126" fill="none" stroke="#0d0a1f" strokeWidth={6} strokeLinecap="round" />
    : <Path d="M86 122 Q100 138 114 122" fill="none" stroke="#0d0a1f" strokeWidth={6} strokeLinecap="round" />;

  const arcEyes = mood === 'cheer' || mood === 'happy';
  return (
    <Animated.View style={{ width: size, height: size, transform }}>
      <Svg width={size} height={size} viewBox="0 0 200 200">
        <Defs>
          <LinearGradient id="body" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#9a80ff" /><Stop offset="1" stopColor="#6445f0" />
          </LinearGradient>
        </Defs>
        <Path d="M42 56 C30 56 30 64 30 76 L30 92 C30 102 24 106 18 106 C24 106 30 110 30 120 L30 136 C30 148 30 156 42 156" fill="none" stroke={c.good} strokeWidth={11} strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M158 56 C170 56 170 64 170 76 L170 92 C170 102 176 106 182 106 C176 106 170 110 170 120 L170 136 C170 148 170 156 158 156" fill="none" stroke={c.good} strokeWidth={11} strokeLinecap="round" strokeLinejoin="round" />
        <Rect x={95} y={20} width={10} height={24} rx={4} fill={c.good} opacity={cursor ? 1 : 0.15} />
        <Rect x={50} y={44} width={100} height={116} rx={46} fill="url(#body)" />
        <Ellipse cx={100} cy={132} rx={34} ry={20} fill="#a995ff" opacity={0.35} />
        {arcEyes || eyesClosed ? (
          <>
            <Path d={arcEyes ? 'M66 98 Q80 78 94 98' : 'M66 94 L94 94'} fill="none" stroke="#fff" strokeWidth={7} strokeLinecap="round" />
            <Path d={arcEyes ? 'M106 98 Q120 78 134 98' : 'M106 94 L134 94'} fill="none" stroke="#fff" strokeWidth={7} strokeLinecap="round" />
          </>
        ) : (
          <>
            <Ellipse cx={80} cy={92} rx={14} ry={17} fill="#fff" /><Ellipse cx={120} cy={92} rx={14} ry={17} fill="#fff" />
            <Ellipse cx={mood === 'think' ? 86 : 82} cy={mood === 'think' ? 88 : 95} rx={8} ry={10} fill="#0d0a1f" />
            <Ellipse cx={mood === 'think' ? 126 : 122} cy={mood === 'think' ? 88 : 95} rx={8} ry={10} fill="#0d0a1f" />
            <Circle cx={85} cy={90} r={3} fill="#fff" /><Circle cx={125} cy={90} r={3} fill="#fff" />
          </>
        )}
        <Circle cx={66} cy={118} r={7} fill={c.bad} opacity={0.5} /><Circle cx={134} cy={118} r={7} fill={c.bad} opacity={0.5} />
        {mouth}
      </Svg>
    </Animated.View>
  );
}
