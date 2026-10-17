import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Progress { xp: number; streak: number; lastDay: string | null; completed: string[] }
const KEY = 'codingo-progress-v1';
export const empty: Progress = { xp: 0, streak: 0, lastDay: null, completed: [] };

const dayStr = (d: Date) => d.toISOString().slice(0, 10);

export async function load(): Promise<Progress> {
  const raw = await AsyncStorage.getItem(KEY);
  const p: Progress = raw ? { ...empty, ...JSON.parse(raw) } : empty;
  // streak breaks if you missed more than yesterday
  if (p.lastDay) {
    const gap = (Date.parse(dayStr(new Date())) - Date.parse(p.lastDay)) / 86400000;
    if (gap > 1) p.streak = 0;
  }
  return p;
}

export async function completeLesson(p: Progress, lessonId: string, xp: number): Promise<Progress> {
  const today = dayStr(new Date());
  const next: Progress = {
    xp: p.xp + xp,
    streak: p.lastDay === today ? p.streak : p.streak + 1,
    lastDay: today,
    completed: p.completed.includes(lessonId) ? p.completed : [...p.completed, lessonId],
  };
  await AsyncStorage.setItem(KEY, JSON.stringify(next));
  return next;
}
