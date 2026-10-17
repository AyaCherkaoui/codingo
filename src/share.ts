import { Platform, Share } from 'react-native';

export const REPO = 'https://github.com/AyaCherkaoui/codingo';

export async function shareText(message: string) {
  try {
    if (Platform.OS === 'web') {
      const nav: any = typeof navigator !== 'undefined' ? navigator : null;
      if (nav?.share) await nav.share({ text: message });
      else if (nav?.clipboard) { await nav.clipboard.writeText(message); alert('Copied to clipboard!'); }
      return;
    }
    await Share.share({ message });
  } catch {}
}

export const progressMessage = (streak: number, done: number, xp: number) =>
  `🔥 ${streak}-day streak on Codingo! ${done}/250 problems learned, ${xp} XP. Learn LeetCode like Duolingo: ${REPO}`;

export const inviteMessage = (username: string | null) =>
  `Join me on Codingo, the Duolingo-style way to learn LeetCode (250 problems in 250 days)!${username ? ` Add me: @${username}.` : ''} ${REPO}`;
