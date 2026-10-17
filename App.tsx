import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { lessonByDay } from './src/content/lessons';
import { Lesson } from './src/content/types';
import { Home } from './src/screens/Home';
import { LessonScreen } from './src/screens/Lesson';
import { ReviewTab } from './src/screens/ReviewTab';
import { FriendsTab } from './src/screens/FriendsTab';
import { BadgesTab } from './src/screens/BadgesTab';
import { SettingsTab } from './src/screens/SettingsTab';
import { Onboarding } from './src/screens/Onboarding';
import { Celebrate } from './src/components/Celebrate';
import { setSoundOn } from './src/sound';
import { Tab, TabBar } from './src/components/TabBar';
import { Progress, empty, load, save, wipe, refreshHearts, loseHeart, finishLesson, finishReview, dueReviews, level } from './src/storage';
import { badges, earnedIds } from './src/badges';
import { buildReview } from './src/review';
import { scheduleDailyReminder } from './src/notify';
import { Profile, cloudConfigured, supabase, getProfile, pullProgress, pushProgress, mergeProgress, signOut } from './src/cloud';
import { c } from './src/theme';

type Session = { lesson: Lesson; reviewIds?: string[]; nonce: number };
type Toast = { xp: number; levelUp: number | null; badges: string[] };

export default function App() {
  const [progress, setProgress] = useState<Progress | null>(null);
  const [tab, setTab] = useState<Tab>('learn');
  const [session, setSession] = useState<Session | null>(null);
  const [toast, setToast] = useState<Toast | null>(null);
  const [uid, setUid] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const ref = useRef<Progress>(empty);
  const uidRef = useRef<string | null>(null);
  const timer = useRef<any>(null);

  const update = useCallback((fn: (p: Progress) => Progress) => {
    const next = fn(ref.current);
    ref.current = next;
    setProgress(next);
    save(next);
    if (uidRef.current) {
      clearTimeout(timer.current);
      timer.current = setTimeout(() => uidRef.current && pushProgress(uidRef.current, ref.current), 2500);
    }
    return next;
  }, []);

  useEffect(() => {
    load().then(p => { setSoundOn(p.soundOn); ref.current = p; setProgress(p); scheduleDailyReminder(p.reminderHour, p.reminderOn && p.onboarded); });
    let unsub: (() => void) | undefined;
    if (supabase) {
      const sync = async (id: string | null) => {
        uidRef.current = id; setUid(id);
        if (!id) { setProfile(null); return; }
        setProfile(await getProfile(id));
        const remote = await pullProgress(id);
        const merged = remote ? mergeProgress(ref.current, remote) : ref.current;
        update(() => merged);
        pushProgress(id, merged);
      };
      supabase.auth.getSession().then(({ data }) => sync(data.session?.user.id ?? null));
      const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => { sync(session?.user.id ?? null); });
      unsub = () => sub.subscription.unsubscribe();
    }
    const t = setInterval(() => { const r = refreshHearts(ref.current); if (r !== ref.current) update(() => r); }, 30000);
    return () => { clearInterval(t); unsub?.(); };
  }, []);

  if (!progress) return <View style={{ flex: 1, backgroundColor: c.bg }} />;

  if (!progress.onboarded) return (
    <>
      <StatusBar style="light" />
      <Onboarding onDone={() => { const p = update(x => ({ ...x, onboarded: true })); scheduleDailyReminder(p.reminderHour, p.reminderOn); }} />
    </>);

  const finish = (xp: number) => {
    if (!session) return;
    const before = ref.current;
    const next = update(p => session.reviewIds ? finishReview(p, session.reviewIds, xp) : finishLesson(p, session.lesson.id, xp));
    const had = new Set(earnedIds(before));
    const fresh = earnedIds(next).filter(id => !had.has(id)).map(id => badges.find(b => b.id === id)!).map(b => `${b.icon} ${b.name}`);
    const lv = level(next.xp) > level(before.xp) ? level(next.xp) : null;
    setSession(null);
    if (fresh.length || lv) setToast({ xp, levelUp: lv, badges: fresh });
  };

  const startDay = (day: number) => {
    const lesson = lessonByDay.get(day);
    if (lesson) setSession({ lesson, nonce: Date.now() });
  };
  const startReview = () => {
    const r = buildReview(dueReviews(ref.current));
    if (r) setSession({ lesson: r.lesson, reviewIds: r.ids, nonce: Date.now() });
  };

  if (session) return (
    <>
      <StatusBar style="light" />
      <LessonScreen key={session.nonce} lesson={session.lesson} startHearts={progress.hearts} streak={progress.streak}
        onWrong={() => update(loseHeart)} onExit={() => setSession(null)} onDone={finish} />
    </>);

  if (toast) return (
    <>
      <StatusBar style="light" />
      <Celebrate levelUp={toast.levelUp} badges={toast.badges} onDone={() => setToast(null)} />
    </>);

  return (
    <View style={{ flex: 1, backgroundColor: c.bg }}>
      <StatusBar style="light" />
      <View style={{ flex: 1 }}>
        {tab === 'learn' && <Home progress={progress} onStart={startDay} />}
        {tab === 'review' && <ReviewTab progress={progress} onStart={startReview} />}
        {tab === 'friends' && <FriendsTab uid={uid} profile={profile} progress={progress} onProfile={setProfile} />}
        {tab === 'badges' && <BadgesTab progress={progress} />}
        {tab === 'me' && <SettingsTab progress={progress}
          onChange={patch => { if (patch.soundOn !== undefined) setSoundOn(patch.soundOn); const p = update(x => ({ ...x, ...patch })); scheduleDailyReminder(p.reminderHour, p.reminderOn); }}
          account={profile?.username ?? null} onSignOut={() => signOut()}
          onReset={async () => { await wipe(); const p = await load(); ref.current = p; setProgress(p); setTab('learn'); }} />}
      </View>
      <TabBar tab={tab} onTab={setTab} dueCount={dueReviews(progress).length} />
    </View>);
}
