import React, { createContext, useState, useContext } from 'react';

const ExerciseFeedbackContext = createContext();

export const ExerciseFeedbackProvider = ({ children }) => {
  const [exerciseData, setExerciseData] = useState({
    exercise: '',
    reps: '',
    score: 0, 
  });

  
  const updateExerciseData = (newExercise, newReps) => {
    setExerciseData({
      exercise: newExercise,
      reps: newReps,
      score: 0, // score는 업데이트 시에도 0으로 유지
    });
  };

  return (
    <ExerciseFeedbackContext.Provider value={{ exerciseData, updateExerciseData }}>
      {children}
    </ExerciseFeedbackContext.Provider>
  );
};

export const useExerciseFeedback = () => useContext(ExerciseFeedbackContext);
