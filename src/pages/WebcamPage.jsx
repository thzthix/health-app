import React, { useEffect, useRef } from 'react';
import { initHolistic } from '../utils/useHolistic';

const WebcamPage = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    // 웹캠 스트림을 가져옵니다.
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      initHolistic(videoElement, canvasRef, stream, videoRef);
    }).catch((error) => {
      console.error('웹캠 스트림을 가져올 수 없습니다:', error);
    });
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <video ref={videoRef} style={{ display: 'none' }} />
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default WebcamPage;
