import React, { createContext, useState, useContext } from 'react';

const ExerciseFeedbackContext = createContext();

export const ExerciseFeedbackProvider = ({ children }) => {
  const [exerciseData, setExerciseData] = useState({
    exercise: '',
    reps: '',
    score: 0,
  });
  const [feedback, setFeedback] = useState('');
  const [count, setCount] = useState(0); // 스쿼트 횟수를 관리할 상태 추가

  const updateExerciseData = (newExercise, newReps, newScore) => {
    setExerciseData({
      exercise: newExercise,
      reps: newReps,
      score: newScore,
    });
  };

  const updateCount = () => { // 스쿼트 횟수를 업데이트하는 함수 구현
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <ExerciseFeedbackContext.Provider value={{ exerciseData, updateExerciseData, feedback, setFeedback, count, updateCount }}>
      {children}
    </ExerciseFeedbackContext.Provider>
  );
};

export const useExerciseFeedback = () => useContext(ExerciseFeedbackContext);
