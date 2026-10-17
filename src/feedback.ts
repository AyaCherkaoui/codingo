import * as Haptics from 'expo-haptics';
export const good = () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
export const bad = () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(() => {});
export const tap = () => Haptics.selectionAsync().catch(() => {});
