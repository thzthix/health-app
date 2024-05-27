import React from 'react';
import Header from '../Common/Header';
import { Row } from 'react-bootstrap';
import TodayExercise from './TodayExercise';
import WeeklyProgress from './WeeklyProgress';
import DailyGoals from './DailyGoals';
import "./dashboard.css";

const DashBoard = () => {
  return (
    <section className="contents">
      <Row style={{ marginBottom: '1.2rem' }}><Header /></Row>
      <Row style={{ marginBottom: '20px' }}><TodayExercise /></Row>
      <Row style={{ marginBottom: '20px' }}><DailyGoals /></Row>
      <Row style={{ marginBottom: '20px', flex: 1 }}><WeeklyProgress /></Row>
    </section>
  );
}

export default DashBoard;
