import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { FaFire } from "react-icons/fa";
import { IoIosWater } from "react-icons/io";
import { FaRegClock } from "react-icons/fa";
import "./todayExerciseCard.css"
const TodayExerciseCard = ({ title, value, icon,id }) => {
  // 아이콘 선택
  const IconComponent = () => {
    switch(icon) {
      case 'calories':
        return <FaFire />;
      case 'water':
        return <IoIosWater />
      case 'exercise':
        return <FaRegClock />;
      default:
        return null; 
    }
  };

  return (
    <Col>
      <Card className='card-today' id={id}>
        <Card.Body>
         
          <Row>
            <Col xs={2}>
              <IconComponent />
            </Col>
            <Col xs={10}>
            <div className="card-title">{title}</div>
              <div className="card-value">{value}</div>
            
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default TodayExerciseCard;
