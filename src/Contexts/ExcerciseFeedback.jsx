import React, { createContext, useState, useContext } from 'react';

const ExerciseFeedbackContext = createContext();

export const ExerciseFeedbackProvider = ({ children }) => {
  const [exerciseData, setExerciseData] = useState({
    exercise: null,
    reps: '',
  });

  const updateExercise = (newExercise) => {
    setExerciseData((prevData) => ({
      ...prevData,
      exercise: newExercise,
    }));
  };

  const updateReps = (newReps) => {
    setExerciseData((prevData) => ({
      ...prevData,
      reps: newReps,
    }));
  };

  return (
    <ExerciseFeedbackContext.Provider value={{ exerciseData, updateExercise, updateReps }}>
      {children}
    </ExerciseFeedbackContext.Provider>
  );
};

export const useExerciseFeedback = () => useContext(ExerciseFeedbackContext);
