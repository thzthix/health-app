// ExerciseContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext'; 

const ExerciseContext = createContext();

export const useExercise = () => useContext(ExerciseContext);

export const ExerciseProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [exerciseStatus, setExerciseStatus] = useState({});

  useEffect(() => {
    const fetchExerciseStatus = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/exercise-status/${currentUser.id}`);
        setExerciseStatus({...response.data.exerciseStatus});
        
      
      } catch (error) {
        console.error("운동 상태 기록을 가져오는 데 실패했습니다:", error);
      }
    };

    if (currentUser) {
      fetchExerciseStatus();
    }
    
  }, [currentUser]);

  return (
    <ExerciseContext.Provider value={{ exerciseStatus }}>
      {children}
    </ExerciseContext.Provider>
  );
};
