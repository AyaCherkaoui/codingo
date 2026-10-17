import React from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet } from 'react-native';
import { Logo } from '../components/Logo';
import { Mascot } from '../components/Mascot';
import { Progress } from '../storage';
import { Profile } from '../cloud';
import { AuthForm, UsernameForm } from './FriendsTab';
import { c } from '../theme';

// Shown right after onboarding: create an account / sign in, or skip and learn offline.
export function AuthGate({ uid, progress, onProfile }: {
  uid: string | null; progress: Progress; onProfile: (p: Profile) => void;
}) {
  return (
    <SafeAreaView style={s.root}>
      <ScrollView contentContainerStyle={s.pad} keyboardShouldPersistTaps="handled">
        <View style={s.top}><Logo size={28} /><Mascot size={90} mood="happy" /></View>
        {uid ? <UsernameForm uid={uid} progress={progress} onProfile={onProfile} /> : <AuthForm />}
      </ScrollView>
    </SafeAreaView>);
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: c.bg },
  pad: { padding: 24, paddingTop: 36 },
  top: { alignItems: 'center', marginBottom: 20, gap: 8 },
});
