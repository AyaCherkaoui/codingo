import * as Haptics from 'expo-haptics';
import { play } from './sound';

export const good = () => { Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {}); play('correct'); };
export const bad = () => { Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(() => {}); play('wrong'); };
export const tap = () => { Haptics.selectionAsync().catch(() => {}); play('tap'); };
export const celebrate = () => { Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {}); play('complete'); };
export const levelUp = () => { Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {}); play('levelup'); };
