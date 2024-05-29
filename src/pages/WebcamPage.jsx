import React, { useEffect, useRef } from 'react';
import { useHolistic } from '../utils/useHolistic';

const WebcamPage = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useHolistic(videoRef, canvasRef);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <video ref={videoRef} style={{ display: 'none' }} />
    <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
  </div>
  );
};

export default WebcamPage;
