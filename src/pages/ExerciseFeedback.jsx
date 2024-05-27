import React, { useEffect, useRef } from 'react';
import { initHolistic } from "../utils/useHolistic"

const ExerciseFeedback = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    initHolistic(videoRef, canvasRef);
  }, []);

  return (
    <div>
      <video ref={videoRef} style={{display: 'block'}}></video> {/* 화면에 비디오를 보여주지 않고, 인식만 할 경우 */}
      <canvas ref={canvasRef} /> {/* 인식된 동작을 그릴 캔버스 */}
    </div>
  );
};

export default ExerciseFeedback;
