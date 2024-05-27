import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import TodayExerciseCard from './TodayExerciseCard';
import { useAuth } from '../../Contexts/AuthContext'; 
import { useExercise } from '../../Contexts/ExerciseContext'; 

const TodayExercise = () => {
  const { currentUser } = useAuth();
  const { exerciseStatus } = useExercise(); 

  const [burnedCalories, setBurnedCalories] = useState(0); // 태운 칼로리 상태
  const [waterIntake, setWaterIntake] = useState(0);
  const [exerciseDuration, setExerciseDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // 데이터 로딩 상태 관리

  useEffect(() => {
    if (!exerciseStatus) {
      setIsLoading(true);
      return;
    }

    const kstOptions = { timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit' };
    const todayKST = new Intl.DateTimeFormat('ko-KR', kstOptions).format(new Date());
    const today = todayKST.replace(/\. /g, '-').replace(/\./, '');

    const receivedRecords = exerciseStatus?.exerciseRecords;
    const todayRecords = receivedRecords?.find(record => record.date.startsWith(today));

    if (todayRecords) {
      const totalCalories = todayRecords.exercises.reduce((sum, ex) => sum + ex.calories, 0);
      const totalDuration = todayRecords.exercises.reduce((sum, ex) => sum + ex.duration, 0);

      setBurnedCalories(totalCalories);
      setExerciseDuration(totalDuration);
      // 수분 섭취량을 실제 데이터에서 가져오는 로직 필요 (예시로 0으로 설정)
      setWaterIntake(0); 
    } else {
      setBurnedCalories(0);
      setExerciseDuration(0);
      setWaterIntake(0);
    }

    setIsLoading(false);
  }, [exerciseStatus]);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <Container>
      <Row><h3 className='h3-subtitle'>오늘의 활동 요약</h3></Row>
      <Row>
        <TodayExerciseCard id="card-calories" title="칼로리 소모" value={`${burnedCalories} kcal`} icon="calories" />
        <TodayExerciseCard id="card-water" title="수분 섭취량" value={`${waterIntake} ml`} icon="water" />
        <TodayExerciseCard id="card-hours" title="운동 시간" value={`${exerciseDuration} 분`} icon="exercise" />
      </Row>
    </Container>
  );
};

export default TodayExercise;
