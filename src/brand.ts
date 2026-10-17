export const NAME = 'Bracey';
export const TAGLINE = 'Ship one problem a day.';
export const pick = <T,>(a: T[]): T => a[Math.floor(Math.random() * a.length)];
export const WIN = ['Compiled ✔', 'Tests pass ✔', 'Ship it 🚀', 'Clean diff ✨', 'O(1) brain 🧠', 'Merged ✔'];
export const LOSE = ['Runtime error 💥', 'Off by one?', 'Stack overflow 😵', 'Segfault… try again', 'Null pointer 🫠'];
