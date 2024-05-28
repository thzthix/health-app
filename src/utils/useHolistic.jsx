import { Holistic } from '@mediapipe/holistic';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { POSE_CONNECTIONS } from '@mediapipe/pose';
import { Camera } from '@mediapipe/camera_utils';

export function initHolistic(videoElement, canvasRef, stream, videoRef) {
  const holistic = new Holistic({
    locateFile: (file) => {
      return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`;
    },
  });

  holistic.setOptions({
    modelComplexity: 1,
    smoothLandmarks: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5,
  });

  holistic.onResults((results) => {
   
   console.log("before current",canvasRef.current)
    if (canvasRef.current) {
      console.log("after current",canvasRef.current)
    const canvasCtx = canvasRef.current.getContext('2d');
    canvasCtx.save();
    

    // 캔버스 크기를 비디오 크기와 동일하게 설정
    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;

    // 캔버스를 지우고 비디오 프레임을 캔버스에 그리기
    canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    canvasCtx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
    
    // 포즈 랜드마크 그리기
   
    if (results.poseLandmarks) {
      
      drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, {
        color: '#00FF00',
        lineWidth: 4,
      });
      drawLandmarks(canvasCtx, results.poseLandmarks, {
        color: '#FF0000',
        lineWidth: 2,
      });
    }
    canvasCtx.restore();}
  });

    // 여기서 미디어 스트림을 직접 할당합니다.
    videoElement.srcObject = stream;
    videoElement.play().catch(error => console.error('비디오 재생을 시작할 수 없습니다:', error));
  
    const camera = new Camera(videoElement, {
      onFrame: async () => {
        await holistic.send({ image: videoElement });
      },
      width: 1280,
      height: 720,
    });
    camera.start();
}
