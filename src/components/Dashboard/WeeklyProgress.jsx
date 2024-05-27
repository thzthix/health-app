import React from 'react';
import { Card, Row,Col } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const WeeklyProgress = () => {
  // 차트 데이터와 설정
  const data = {
    labels: ['월', '화', '수', '목', '금',"토","일"], // X축 레이블
    datasets: [
      {
        label: '운동 시간 (분)',
        data: [30, 45, 20, 50, 40, 34, 12], // 요일별 운동 시간
        backgroundColor: 'rgba(54, 162, 235, 0.6)', // 막대 색상
        borderColor: 'rgba(54, 162, 235, 1)', // 막대 테두리 색상
        borderRadius: 20, // 막대 둥근 모서리
        borderSkipped: false, // 모든 모서리에 둥근 효과 적용
        barThickness: 20, // 막대 두께 조절
      },
    ],
  };

  // 차트 옵션
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false
        }
      }
      
    },
    plugins: {
      legend: {
        display: false, // 범례 숨기기
      },
    },
  };

  return (
    <Col>
    <Row><h3 className='h3-subtitle'>주간 운동 현황</h3></Row>
    <Row>
      <Card>
        <Card.Body>
          {/* <div style={{ height: '300px', width: '100%' }}> */}
          <div>
            <Bar data={data} options={options} />
          </div>
        </Card.Body>
      </Card>
      </Row>
    </Col>
  );
};

export default WeeklyProgress;
