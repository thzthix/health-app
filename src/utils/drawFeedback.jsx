import React from 'react'

export const drawFeedback = (canvasCtx, feedbackMessages) => {
 
        // 피드백 메시지 출력
        canvasCtx.font = '30px Arial';
        canvasCtx.fillStyle = 'white';
        feedbackMessages.forEach((message, i) => {
          canvasCtx.fillText(message, 50, 50 + (i * 40)); // 메시지와 위치 조정 필요
        });
      
        requestAnimationFrame(draw);
   
}

export default drawFeedback