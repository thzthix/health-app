import React from 'react';
import { Card, Col, ProgressBar } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import { useAuth } from '../../Contexts/AuthContext'; 
import "./profile.css"
const Profile = () => {
  const { currentUser } = useAuth();
  const profileData = {
    firstName: '홍',
    lastName: '길동',
    age: 25,
    height: 170,
    weight: 65,
    challenges: [
      {
        name: '한 달의 스쿼트 100회 하기',
        current: 50,
        total: 100,
        icon: '🏋️',
      },
      {
        name: '한 달의 스쿼트 100회 하기',
        current: 50,
        total: 100,
        icon: '🏋️',
      },
      {
        name: '한 달의 스쿼트 100회 하기',
        current: 50,
        total: 100,
        icon: '🏋️',
      },
      {
        name: '한 달의 스쿼트 100회 하기',
        current: 50,
        total: 100,
        icon: '🏋️',
      },
      {
        name: '한 달의 스쿼트 100회 하기',
        current: 50,
        total: 100,
        icon: '🏋️',
      },
      {
        name: '한 달의 스쿼트 100회 하기',
        current: 50,
        total: 100,
        icon: '🏋️',
      },
      // 추가적인 도전 과제를 이 배열에 넣어주세요.
    ],
  };

  return (
    <Col className="profile" style={{ height: '100%' }}>
      <Card >
        <Card.Body>
          <div className="profile-header text-center">
            {/* 유저 프로필 사진 (임시로 이모티콘으로 대체) */}
            <div className='image-holder'><Image src={currentUser.profileImageUrl} roundedCircle /></div>
            {/* 이름 */}
            <h2>{`${currentUser.firstname} ${currentUser.lastname}`}</h2>
            {/* 기본 정보 */}
            <p>{`${currentUser.height}cm / ${currentUser.weight}kg / ${currentUser.age}세`}</p>
          </div>
          <hr />
          {/* 도전 과제 목록 */}
          <div className="challenges">
            <h3>도전 과제</h3>
            {profileData.challenges.map((challenge, index) => (
              <div key={index} className="challenge my-3">
                <div className="d-flex align-items-center">
                  <span style={{ marginRight: '10px' }}>{challenge.icon}</span>
                  <span><strong>{challenge.name}</strong> ({challenge.current}/{challenge.total})</span>
                </div>
                <ProgressBar now={(challenge.current / challenge.total) * 100} />
              </div>
            ))}
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Profile;
