import React from 'react';
import { Pressable, SafeAreaView, ScrollView, Text, View, StyleSheet } from 'react-native';
import { Logo } from '../components/Logo';
import { Mascot } from '../components/Mascot';
import { Progress } from '../storage';
import { Profile } from '../cloud';
import { AuthForm, UsernameForm } from './FriendsTab';
import { c } from '../theme';

// Shown right after onboarding: create an account / sign in, or skip and learn offline.
export function AuthGate({ uid, progress, onProfile, onSkip }: {
  uid: string | null; progress: Progress; onProfile: (p: Profile) => void; onSkip: () => void;
}) {
  return (
    <SafeAreaView style={s.root}>
      <ScrollView contentContainerStyle={s.pad} keyboardShouldPersistTaps="handled">
        <View style={s.top}><Logo size={28} /><Mascot size={90} mood="happy" /></View>
        {uid ? <UsernameForm uid={uid} progress={progress} onProfile={onProfile} /> : <AuthForm />}
        <Pressable onPress={onSkip}><Text style={s.skip}>Skip for now</Text></Pressable>
        <Text style={s.note}>No account needed to learn. Sign up any time from Settings to save your streak and compete with friends.</Text>
      </ScrollView>
    </SafeAreaView>);
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: c.bg },
  pad: { padding: 24, paddingTop: 36 },
  top: { alignItems: 'center', marginBottom: 20, gap: 8 },
  skip: { color: c.mute, textAlign: 'center', marginTop: 22, fontWeight: '800', fontSize: 15 },
  note: { color: c.mute, textAlign: 'center', marginTop: 10, fontSize: 12 },
});
