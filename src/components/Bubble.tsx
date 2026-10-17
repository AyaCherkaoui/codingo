import React from 'react';
import { Text, View } from 'react-native';
import { c } from '../theme';

export function Bubble({ children, tail = 'bottom', style }: { children: string; tail?: 'bottom' | 'left'; style?: object }) {
  return (
    <View style={[{ backgroundColor: c.card2, borderRadius: 18, padding: 14, borderWidth: 2, borderColor: c.line }, style]}>
      <Text style={{ color: c.text, fontSize: 16, lineHeight: 23, fontWeight: '600' }}>{children}</Text>
      {tail === 'bottom' && <View style={{ position: 'absolute', bottom: -9, left: 28, width: 16, height: 16, backgroundColor: c.card2, borderRightWidth: 2, borderBottomWidth: 2, borderColor: c.line, transform: [{ rotate: '45deg' }] }} />}
    </View>
  );
}
