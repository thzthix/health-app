// src/pages/SignupPage.js
import React, { useState, useContext } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './SignUpPage.css'; 

const SignupPage = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [userData, setUserData] = useState({
        firstname: '',
        lastname: '',
        height: '',
        weight: '',
        age: '',
        gender: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        register(userData);
        navigate('/');
    };

    return (
        <Container className="signup-container">
            
            <Form onSubmit={handleSubmit} className="signup-form">
            <h2 className="signup-title">회원가입</h2>
                <Row>
                    <Col>
                        <Form.Group controlId="formFirstName">
                            <Form.Label>성</Form.Label>
                            <Form.Control
                                type="text"
                                name="firstname"
                                value={userData.firstname}
                                onChange={handleChange}
                                placeholder="성"
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formLastName">
                            <Form.Label>이름</Form.Label>
                            <Form.Control
                                type="text"
                                name="lastname"
                                value={userData.lastname}
                                onChange={handleChange}
                                placeholder="이름"
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="formHeight">
                            <Form.Label>키(cm)</Form.Label>
                            <Form.Control
                                type="number"
                                name="height"
                                value={userData.height}
                                onChange={handleChange}
                                placeholder="키(cm)"
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formWeight">
                            <Form.Label>몸무게(kg)</Form.Label>
                            <Form.Control
                                type="number"
                                name="weight"
                                value={userData.weight}
                                onChange={handleChange}
                                placeholder="몸무게(kg)"
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formAge">
                            <Form.Label>나이</Form.Label>
                            <Form.Control
                                type="number"
                                name="age"
                                value={userData.age}
                                onChange={handleChange}
                                placeholder="나이"
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formGender">
                            <Form.Label>성별</Form.Label>
                            <Form.Control
                                as="select"
                                name="gender"
                                value={userData.gender}
                                onChange={handleChange}
                                required
                            >
                                <option value="">선택하세요</option>
                                <option value="male">남성</option>
                                <option value="female">여성</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="formEmail">
                            <Form.Label>이메일</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={userData.email}
                                onChange={handleChange}
                                placeholder="이메일"
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="formPassword">
                            <Form.Label>비밀번호</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={userData.password}
                                onChange={handleChange}
                                placeholder="비밀번호"
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Button type="submit" className="signup-button">가입하기</Button>
            </Form>
        </Container>
    );
};

export default SignupPage;
