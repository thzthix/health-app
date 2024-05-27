// src/pages/LoginPage.js
import React, { useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { useAuth } from '../Contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GiRunningShoe } from 'react-icons/gi';
import './LoginPage.css'; 

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/auth/login', {
                email,
                password,
            });

            login(response.data);
            navigate('/');
        } catch (error) {
            console.error('로그인 실패:', error.response);
        }
    };

    return (
      <Container className="login-container">
          <Row className="justify-content-md-center">
              <Col xs={12}>
                  <Form onSubmit={handleSubmit} className="login-form">
                      {/* <h1 className="app-name">Health</h1>  */}
                      <div className="app-logo text-center mb-4">
                        <GiRunningShoe size="3em" /> {/* 아이콘 크기 조절 */}
                    </div>
                      <h2 className="text-center mb-4">로그인</h2>
                      <Form.Group id="email" className="form-group">
                          <Form.Label>이메일</Form.Label>
                          <Form.Control type="email" required onChange={(e) => setEmail(e.target.value)} />
                      </Form.Group>
                      <Form.Group id="password" className="form-group">
                          <Form.Label>비밀번호</Form.Label>
                          <Form.Control type="password" required onChange={(e) => setPassword(e.target.value)} />
                      </Form.Group>
                      <Button type="submit" className="w-100 login-button">로그인</Button>
                      <div className="w-100 text-center mt-3">
                          <Link to="/signup">회원가입</Link>
                      </div>
                  </Form>
              </Col>
          </Row>
      </Container>
  );
  
}
export default LoginPage
