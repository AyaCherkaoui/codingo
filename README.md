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
- [ ] v0: lesson screen + question types + XP/streak (one hardcoded lesson)
- [ ] v1: skill tree (NeetCode topics in order), content loader
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
