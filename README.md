# Bracey

Ship one problem a day. A phone app that teaches all 250 NeetCode problems in 250 days, with its own mascot (Bracey), streak freezes, combos, sounds and a friends leaderboard.
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
- [x] Skill tree with all 250 problems
- [x] Question types: choice, order, fill blank, spot the bug, code builder (order with code)
- [x] Hearts that refill (1 per 30 min), hints, XP, levels, streaks
- [x] Spaced review (1, 3, 7, 14, 30 days)
- [x] Badges, onboarding, settings, daily reminder
- [x] All 250 lessons written (3 questions each, hints on some)
- [x] Accounts, cloud sync, friends and leaderboard (Supabase)
- [x] Animations: confetti, shake, sliding feedback sheet, pulsing current node
- [x] Share progress and invite friends
- [ ] Sounds, streak freeze, TestFlight build
- [ ] More hints, richer questions per lesson

## Content
Lessons live in `src/content/` as JSON/TS. See `src/content/types.ts`.

## Run
```
npm install
npx expo start
```
Scan the QR code with Expo Go.

## Online features (Supabase)
1. Create a project at supabase.com and run `supabase/schema.sql` in the SQL editor (or `supabase db push`).
2. Copy `.env.example` to `.env` and fill in the project URL and anon key.
3. Restart `npx expo start`. Without these keys the app works fully offline.
