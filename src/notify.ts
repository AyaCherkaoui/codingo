// Daily streak reminder at 19:00. Fails silently where unsupported (e.g. web).
export async function scheduleDailyReminder() {
  try {
    const N = require('expo-notifications');
    const perm = await N.requestPermissionsAsync();
    if (!perm.granted) return;
    await N.cancelAllScheduledNotificationsAsync();
    await N.scheduleNotificationAsync({
      content: { title: '🔥 Keep your streak alive', body: "Today's lesson takes 5 minutes." },
      trigger: { type: 'daily', hour: 19, minute: 0 },
    });
  } catch {}
}
