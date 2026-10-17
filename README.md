# Codingo

Duolingo-style phone app that teaches everything for the NeetCode 250 in 250 days.
One tiny lesson a day, streaks, XP, hearts, and bite-size questions you can finish on your phone.

## Stack
- Expo (React Native) + TypeScript, runs on iPhone/Android via Expo Go
- Local-first storage (progress, streak, XP) - no backend needed for v1

## Core loop (1 lesson ≈ 5 min)
1. Learn: a short card explaining the pattern
2. Practice: tap-to-answer questions (multiple choice, order the steps, fill the blank, spot the bug)
3. Solve: assemble the solution from code blocks (no keyboard typing on phone)
4. Reward: XP, streak, hearts, level-up animation

## Roadmap
- [x] v0: lesson screen + question types + XP/streak/hearts
- [x] v1: skill tree with all 150 core NeetCode problems in order, haptics, daily 7pm reminder
- [ ] Lessons written: days 1-5 of 250 (add more in `src/content/lessons.ts`)
- [ ] v2: spaced repetition review, daily reminder notifications
- [ ] v3: all 250 problems, one per day

## Content
Lessons live in `src/content/` as JSON/TS. See `src/content/types.ts`.

## Run
```
npm install
npx expo start
```
Scan the QR code with Expo Go.
