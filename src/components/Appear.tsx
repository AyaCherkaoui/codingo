import React, { useEffect, useRef } from 'react';
import { Animated, Easing, ViewStyle } from 'react-native';

// Fade + slide in on mount. Give it a `key` to replay when content changes.
export function Appear({ children, delay = 0, from = 'bottom', style }: {
  children: React.ReactNode; delay?: number; from?: 'bottom' | 'right' | 'left' | 'scale'; style?: ViewStyle;
}) {
  const v = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(v, { toValue: 1, duration: 380, delay, easing: Easing.out(Easing.cubic), useNativeDriver: true }).start();
  }, []);
  const t = from === 'scale'
    ? [{ scale: v.interpolate({ inputRange: [0, 1], outputRange: [0.85, 1] }) }]
    : from === 'bottom' ? [{ translateY: v.interpolate({ inputRange: [0, 1], outputRange: [24, 0] }) }]
    : [{ translateX: v.interpolate({ inputRange: [0, 1], outputRange: [from === 'right' ? 40 : -40, 0] }) }];
  return <Animated.View style={[style, { opacity: v, transform: t }]}>{children}</Animated.View>;
}
