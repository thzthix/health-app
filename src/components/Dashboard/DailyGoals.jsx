import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import { FaDumbbell, FaRunning, FaWalking } from 'react-icons/fa';
import { useAuth } from '../../Contexts/AuthContext'; 
import { useExercise } from '../../Contexts/ExerciseContext'; 

// const exerciseIcons = {
//   pushup: FaDumbbell,
//   squat: FaRunning,
//   lunge: FaWalking,
//   sidelunge: FaDumbbell,
// };

const DailyGoals = () => {
  const { authToken} = useAuth();
  console.log(authToken)
  const { exerciseStatus } = useExercise(); 

  const [exerciseData, setExerciseData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExerciseData = async () => {
      
      try {
        const response = await axios.get(`http://localhost:3001/api/daily-goals`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        }); // 실제 API 엔드포인트로 변경
        
        const latestGoal = response.data[0].exercises; // 최신 목표 데이터 가져오기
        
        // _id 필드를 제외한 exercises 데이터를 추출합니다.
        const { _id, ...exercisesWithoutId } = latestGoal;
        
        setExerciseData(exercisesWithoutId);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchExerciseData();
  }, [exerciseStatus]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Col>
      <Card>
        <Card.Body>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            {Object.keys(exerciseData).map((exerciseKey) => {
              const exercise = exerciseData[exerciseKey];
              const percentage = (exercise.progress / exercise.goal) * 100;
              //const Icon = exerciseIcons[exerciseKey]; // 아이콘 컴포넌트

              return (
                <div style={{ width: 100, height: 100 }} key={exerciseKey}>
                  <CircularProgressbarWithChildren
                    value={percentage}
                    styles={buildStyles({
                      pathColor: exercise.isCompleted ? 'green' : 'red',
                      textColor: 'black',
                    })}
                  >
                    {/* <Icon size={24} style={{ marginBottom: 5 }} /> */}
                    <FaDumbbell />
                    <div style={{ fontSize: 12, marginTop: -5 }}>
                      {exerciseKey.charAt(0).toUpperCase() + exerciseKey.slice(1)}
                    </div>
                    <div style={{ fontSize: 12, marginTop: 5 }}>
                      {`${exercise.progress}/${exercise.goal}`}
                    </div>
                  </CircularProgressbarWithChildren>
                </div>
              );
            })}
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default DailyGoals;
