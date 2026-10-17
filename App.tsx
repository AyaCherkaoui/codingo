import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { lessonByDay } from './src/content/lessons';
import { Home } from './src/screens/Home';
import { LessonScreen } from './src/screens/Lesson';
import { Progress, empty, load, completeLesson } from './src/storage';
import { scheduleDailyReminder } from './src/notify';

export default function App() {
  const [progress, setProgress] = useState<Progress>(empty);
  const [playing, setPlaying] = useState<number | null>(null);
  useEffect(() => { load().then(setProgress); scheduleDailyReminder(); }, []);

  const lesson = playing ? lessonByDay.get(playing) : undefined;
  return (
    <>
      <StatusBar style="light" />
      {lesson
        ? <LessonScreen key={`${lesson.id}-${Date.now()}`} lesson={lesson} onExit={() => setPlaying(null)}
            onDone={async xp => { setProgress(await completeLesson(progress, lesson.id, xp)); setPlaying(null); }} />
        : <Home progress={progress} onStart={setPlaying} />}
    </>
  );
}
