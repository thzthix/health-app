import React, { useState,useContext } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { ExerciseFeedbackContext } from '../Contexts/ExcerciseFeedback';
const ExerciseForm = ({ onStartExercise }) => {
  const [formData, setFormData] = useState({
    pushup: 0,
    lunge: 0,
    sidelunge: 0,
    squat: 0,
  });
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = parseInt(value, 10);
    setFormData({
      ...formData,
      [name]: parsedValue >= 0 ? parsedValue : 0,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const values = Object.values(formData);
    const isValid = values.some(value => value > 0);

    if (!isValid) {
      alert('적어도 한 운동은 0보다 큰 숫자를 입력해야 합니다.');
      return;
    }

    onStartExercise(formData);
    // setReadyToStart(true)
 
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group controlId="formPushup">
              <Form.Label>Pushup</Form.Label>
              <Form.Control
                type="number"
                name="pushup"
                value={formData.pushup}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formLunge">
              <Form.Label>Lunge</Form.Label>
              <Form.Control
                type="number"
                name="lunge"
                value={formData.lunge}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="formSidelunge">
              <Form.Label>Sidelunge</Form.Label>
              <Form.Control
                type="number"
                name="sidelunge"
                value={formData.sidelunge}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formSquat">
              <Form.Label>Squat</Form.Label>
              <Form.Control
                type="number"
                name="squat"
                value={formData.squat}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit">
          입력 완료 혹은 운동 시작
        </Button>
      </Form>
    </Container>
  );
};

export default ExerciseForm;
