import React, { useState, useRef, useEffect } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import exercisesData from "../assets/exerciseData";
import ExercisePreInfo from "./ExercisePreInfo";
import './ExercisePage.css';
import { useExerciseFeedback } from '../Contexts/ExcerciseFeedback';
import { useNavigate } from 'react-router-dom'; 


const ExercisePage = () => {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const navigate = useNavigate();
  const { exerciseData, updateExerciseData } = useExerciseFeedback();
  const handleExerciseClick = (exerciseId) => {
    const exercise = exercisesData.find(ex => ex.id === exerciseId);
    setSelectedExercise(exercise);
  };

  const handleConfirm = (reps) => {
    updateExerciseData(selectedExercise.name, reps); // 수정: exercise 이름과 reps 함께 저장
    console.log(exerciseData)
    navigate('/webcam'); 
  };


  return (
    <Container className="centered-container">
      { selectedExercise ? (
        <ExercisePreInfo exercise={selectedExercise} onConfirm={handleConfirm} />
      ) : (
        <Row className="g-4 centered-row">
          {exercisesData.map((exercise) => (
            <Col xs={6} key={exercise.id}>
              <Card>
                <Card.Body onClick={() => handleExerciseClick(exercise.id)}>
                  <Card.Title>{exercise.name}</Card.Title>
                  <Card.Text>
                    {exercise.icon}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default ExercisePage;
