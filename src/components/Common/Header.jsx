import React from 'react'
import { useAuth } from '../../Contexts/AuthContext'; 
import { Container, Row, Col, Card } from 'react-bootstrap';
import "./header.css"
const Header = () => {
  const { currentUser } = useAuth();
  const today = new Date().toLocaleDateString();
  return (
   
      <Col className='div-header'>
        <h1>Hello, {currentUser.lastname}!</h1>
        <h2>{today}</h2>
      </Col>
  
  );
}

export default Header