import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AppState, Pressable, Text, View } from 'react-native';
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
import { Progress, empty, load, save, wipe, refreshHearts, loseHeart, finishLesson, finishReview, dueReviews, level, today, freezesSpentOnLoad, applyMissedDays } from './src/storage';
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
  const [notice, setNotice] = useState<string | null>(null);
  const [syncFailed, setSyncFailed] = useState(false);
  const ref = useRef<Progress>(empty);
  const uidRef = useRef<string | null>(null);
  const timer = useRef<any>(null);

  const push = useCallback(async () => {
    if (!uidRef.current) return;
    const ok = await pushProgress(uidRef.current, ref.current);
    setSyncFailed(!ok);
  }, []);

  const update = useCallback((fn: (p: Progress) => Progress) => {
    const next = fn(ref.current);
    ref.current = next;
    setProgress(next);
    save(next);
    if (uidRef.current) {
      clearTimeout(timer.current);
      timer.current = setTimeout(push, 2500);
    }
    return next;
  }, []);

  useEffect(() => {
    load().then(p => { if (freezesSpentOnLoad > 0) setNotice(`🧊 ${freezesSpentOnLoad} streak freeze${freezesSpentOnLoad > 1 ? 's' : ''} used to save your streak!`); setSoundOn(p.soundOn); ref.current = p; setProgress(p); scheduleDailyReminder(p.reminderHour, p.reminderOn && p.onboarded); });
    let unsub: (() => void) | undefined;
    if (supabase) {
      const sync = async (id: string | null) => {
        uidRef.current = id; setUid(id);
        if (!id) { setProfile(null); return; }
        setProfile(await getProfile(id));
        const remote = await pullProgress(id);
        // merge into the latest local state so progress made during the pull isn't overwritten
        const merged = update(cur => (remote ? mergeProgress(cur, remote) : cur));
        push();
      };
      supabase.auth.getSession().then(({ data }) => sync(data.session?.user.id ?? null));
      const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => { sync(session?.user.id ?? null); });
      unsub = () => sub.subscription.unsubscribe();
    }
    const t = setInterval(() => { const r = refreshHearts(ref.current); if (r !== ref.current) update(() => r); }, 30000);
    // Coming back to the app (maybe after midnight): spend freezes / reset streak, refill hearts, retry sync.
    const appSub = AppState.addEventListener('change', st => {
      if (st !== 'active') return;
      const fixed = refreshHearts(applyMissedDays(ref.current));
      if (fixed !== ref.current) {
        const spent = ref.current.freezes - fixed.freezes;
        update(() => fixed);
        if (spent > 0) setNotice(`🧊 ${spent} streak freeze${spent > 1 ? 's' : ''} used to save your streak!`);
      }
      if (uidRef.current) push();
    });
    return () => { clearInterval(t); unsub?.(); appSub.remove(); };
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
    clearTimeout(timer.current); push(); // sync right away
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
      <LessonScreen key={session.nonce} lesson={session.lesson} startHearts={progress.hearts} streak={progress.lastDay === today() ? progress.streak : progress.streak + 1}
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
      {syncFailed && (
        <Pressable onPress={push} style={{ backgroundColor: c.card, padding: 8, paddingTop: notice ? 8 : 48 }}>
          <Text style={{ color: c.gold, fontWeight: '800', textAlign: 'center', fontSize: 12 }}>☁️ Couldn't sync. Your progress is safe on this phone. Tap to retry.</Text>
        </Pressable>)}
      {notice && (
        <Pressable onPress={() => setNotice(null)} style={{ backgroundColor: c.card, padding: 12, paddingTop: syncFailed ? 12 : 48 }}>
          <Text style={{ color: c.blue, fontWeight: '800', textAlign: 'center' }}>{notice} (tap to dismiss)</Text>
        </Pressable>)}
      <View style={{ flex: 1 }}>
        {tab === 'learn' && <Home progress={progress} onStart={startDay} />}
        {tab === 'review' && <ReviewTab progress={progress} onStart={startReview} />}
        {tab === 'friends' && <FriendsTab uid={uid} profile={profile} progress={progress} onProfile={setProfile} />}
        {tab === 'badges' && <BadgesTab progress={progress} />}
        {tab === 'me' && <SettingsTab progress={progress}
          onChange={patch => { if (patch.soundOn !== undefined) setSoundOn(patch.soundOn); const p = update(x => ({ ...x, ...patch })); if ('reminderOn' in patch || 'reminderHour' in patch) scheduleDailyReminder(p.reminderHour, p.reminderOn); }}
          account={profile?.username ?? null} onSignOut={() => signOut()}
          onReset={async () => { await wipe(); const p = await load(); ref.current = p; setProgress(p); setTab('learn'); }} />}
      </View>
      <TabBar tab={tab} onTab={setTab} dueCount={dueReviews(progress).length} />
    </View>);
}
