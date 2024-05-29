import React from 'react'

export const drawGaugeBar = (canvasCtx, angle, isLeft) => {
 
        const baseX = isLeft ? 550 : 8;
        const gaugeWidth = 43;
        const gaugeHeight = 200;
        const gaugeX = baseX;
        const gaugeY = 200; // 게이지 시작 위치 조정 필요 시 변경
        const colorNormal = '#FF0000'; // 정상 상태 색상 (빨간색)
        const colorWarning = '#00FF00'; // 경고 상태 색상 (녹색)
        
        // 각도에 따른 게이지의 높이 계산
        let gaugeValue = linearInterpolate(angle, 0, 100, gaugeY + gaugeHeight, gaugeY);
        
        // 게이지가 테두리 내부에만 채워지도록 gaugeValue의 범위를 제한
        gaugeValue = Math.max(gaugeValue, gaugeY);
        gaugeValue = Math.min(gaugeValue, gaugeY + gaugeHeight);
      
        // 게이지 테두리 그리기
        canvasCtx.strokeStyle = 'black'; // 테두리 색상
        canvasCtx.lineWidth = 4; // 테두리 두께
        canvasCtx.strokeRect(gaugeX, gaugeY, gaugeWidth, gaugeHeight);
      
        // 각도에 따라 색상 변경
        canvasCtx.fillStyle = angle >= 70 ? colorWarning : colorNormal;
      
        // 게이지 채우기 (테두리를 고려하여 채움)
        // 테두리 두께를 고려하여 fillRect의 x값 시작점과 너비를 조정
        const fillX = gaugeX + canvasCtx.lineWidth/2;
        const fillWidth = gaugeWidth - canvasCtx.lineWidth;
        const fillHeight = gaugeY + gaugeHeight - gaugeValue - canvasCtx.lineWidth/2;
        canvasCtx.fillRect(fillX, gaugeValue, fillWidth, fillHeight);

      
      

 
}

