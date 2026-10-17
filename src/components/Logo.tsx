import React from 'react';
import { Text, View } from 'react-native';
import { c } from '../theme';
import { NAME } from '../brand';

export function Logo({ size = 22 }: { size?: number }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text style={{ color: c.good, fontSize: size, fontWeight: '300' }}>{'{ '}</Text>
      <Text style={{ color: c.text, fontSize: size, fontWeight: '900', letterSpacing: 0.5 }}>{NAME.toLowerCase()}</Text>
      <Text style={{ color: c.good, fontSize: size, fontWeight: '300' }}>{' }'}</Text>
    </View>
  );
}
