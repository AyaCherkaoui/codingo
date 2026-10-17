import { createAudioPlayer, setAudioModeAsync } from 'expo-audio';

const src = {
  correct: require('../assets/sounds/correct.wav'),
  wrong: require('../assets/sounds/wrong.wav'),
  complete: require('../assets/sounds/complete.wav'),
  levelup: require('../assets/sounds/levelup.wav'),
  tap: require('../assets/sounds/tap.wav'),
};
export type Sfx = keyof typeof src;

const players: Partial<Record<Sfx, ReturnType<typeof createAudioPlayer>>> = {};
let on = true;
let inited = false;

export const setSoundOn = (v: boolean) => { on = v; };

export async function play(name: Sfx) {
  if (!on) return;
  try {
    if (!inited) { inited = true; await setAudioModeAsync({ playsInSilentMode: true }); }
    const p = (players[name] ??= createAudioPlayer(src[name]));
    await p.seekTo(0);
    p.play();
  } catch {}
}
