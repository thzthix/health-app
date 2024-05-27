import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import DashBoard from '../components/Dashboard/DashBoard';
import Profile from "../components/Profile/Profile"
const MainPage = () => {
  return (
    <Container fluid>
      <Row className="align-items-stretch">
        {/* 메인 컨텐츠 영역 */}
        <Col xs={12} md={8} lg={9}>
          <DashBoard />
        </Col>
        
        {/* 프로필 영역 */}
        <Col xs={12} md={4} lg={3}>
          <Profile />
        </Col>
      </Row>
    </Container>
  );
}

export default MainPage