
import React from 'react'

export const drawLabels = (canvasCtx) => {

        // 텍스트 스타일 설정
        canvasCtx.fillStyle = 'black'; // 텍스트 색상
        canvasCtx.font = '20px Arial'; // 텍스트 폰트 및 크기
        canvasCtx.textAlign = 'center'; // 텍스트 정렬
      
        // 왼쪽 상태바 위에 "L" 표시
        canvasCtx.fillText('L', 550 + 21.5, 195); // 952는 왼쪽 상태바의 X 위치, 21.5는 상태바 너비의 절반
      
        // 오른쪽 상태바 위에 "R" 표시
        canvasCtx.fillText('R', 8 + 21, 195); // 8은 오른쪽 상태바의 X 위치, 21은 상태바 너비의 절반
      
}

