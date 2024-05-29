import { useEffect, useState } from 'react'; // useState 추가
import { Holistic } from '@mediapipe/holistic';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { POSE_CONNECTIONS } from '@mediapipe/pose';
import { Camera } from '@mediapipe/camera_utils';
import { useExerciseFeedback } from '../Contexts/ExcerciseFeedback';
import { provideSquatFeedback } from '../components/feedback/squatFeedback';
import { providePushupFeedback } from '../components/feedback/pushupFeedback';
import { provideLungeFeedback } from '../components/feedback/lungeFeedback'; 
import { provideSideLungeFeedback } from '../components/feedback/sidelungeFeedback';


export function useHolistic(videoRef, canvasRef) {
  const { exerciseData, updateExerciseData, feedback, setFeedback, count, setCount } = useExerciseFeedback();
  const [camera, setCamera] = useState(null); // camera 상태 관리를 위한 useState

  useEffect(() => {
    const videoElement = videoRef.current;

    if (!videoElement) return;

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
      if (canvasRef.current) {
   
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

    try {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        videoElement.srcObject = stream;
        videoElement.onloadedmetadata = () => { // 비디오 메타데이터가 로드되었을 때 재생을 시도합니다.
          videoElement.play()
            .then(() => {
              // 비디오 재생 성공 시 로직
              const cameraInstance = new Camera(videoElement, {
                onFrame: async () => {
                  await holistic.send({ image: videoElement });
                },
                width: 1280,
                height: 720,
              });
              setCamera(cameraInstance);
              cameraInstance.start();
            })
            .catch(error => {
              console.error('비디오 재생을 시작할 수 없습니다:', error);
              // 여기에 사용자에게 알림을 제공하거나 재시도 로직을 추가할 수 있습니다.
            });
        };
      }).catch((error) => {
        console.error('웹캠 스트림을 가져올 수 없습니다:', error);
      });
    } catch (error) {
      console.error('웹캠 접근 중 예외 발생:', error);
    }

    // Cleanup 함수에서 카메라 정지
    return () => {
      if (camera) {
        camera.stop();
      }
    };
  }, [videoRef, canvasRef, exerciseData, updateExerciseData, feedback, setFeedback, count, setCount]);
}
