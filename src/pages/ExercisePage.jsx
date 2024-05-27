import React, { useState, useRef, useEffect } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import exercisesData from "../assets/exerciseData";
import ExercisePreInfo from "./ExercisePreInfo";
import './ExercisePage.css';
import { initHolistic } from "../utils/useHolistic";

const ExercisePage = () => {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const handleExerciseClick = (exerciseId) => {
    const exercise = exercisesData.find(ex => ex.id === exerciseId);
    setSelectedExercise(exercise);
  };

  const handleConfirm = () => {
    setSelectedExercise(null);
    setIsTracking(true);
  };

  useEffect(() => {
    let isComponentMounted = true;

    if (isTracking && videoRef.current && canvasRef.current) {
      initHolistic(videoRef.current, canvasRef.current);

      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          if (isComponentMounted) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
          }
        })
        .catch((err) => {
          console.error("Failed to acquire camera feed:", err);
        });
    }

    return () => {
      isComponentMounted = false;
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, [isTracking]);

  return (
    <Container className="centered-container">
      {isTracking ? (
        <div>
          <video ref={videoRef} style={{ display: 'block' }}></video>
          <canvas ref={canvasRef} style={{ width: '100%' }}></canvas>
        </div>
      ) : selectedExercise ? (
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
