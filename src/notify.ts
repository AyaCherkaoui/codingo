import { Platform } from 'react-native';
// Daily streak reminder. Fails silently where unsupported (e.g. web).
export async function scheduleDailyReminder(hour: number, enabled: boolean) {
  try {
    const N = require('expo-notifications');
    await N.cancelAllScheduledNotificationsAsync();
    if (!enabled) return;
    const perm = await N.requestPermissionsAsync();
    if (!perm.granted) return;
    await N.scheduleNotificationAsync({
      content: { title: 'Bracey misses you 🔥', body: "Ship today's problem and keep your streak alive. 5 minutes." },
      trigger: { type: 'daily', hour, minute: 0 },
    });
  } catch (e) { if (Platform.OS !== 'web') console.warn('Reminder not scheduled', e); }
}
