import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { day1 } from './src/content/day001-contains-duplicate';
import { Home } from './src/screens/Home';
import { LessonScreen } from './src/screens/Lesson';
import { Progress, empty, load, completeLesson } from './src/storage';

export default function App() {
  const [progress, setProgress] = useState<Progress>(empty);
  const [playing, setPlaying] = useState(false);
  useEffect(() => { load().then(setProgress); }, []);

  return (
    <>
      <StatusBar style="light" />
      {playing
        ? <LessonScreen key={Date.now()} lesson={day1} onExit={() => setPlaying(false)}
            onDone={async xp => { setProgress(await completeLesson(progress, day1.id, xp)); setPlaying(false); }} />
        : <Home lesson={day1} progress={progress} onStart={() => setPlaying(true)} />}
    </>
  );
}
