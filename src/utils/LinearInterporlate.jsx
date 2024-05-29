import React from 'react'

export const linearInterpolate = (x, x0, x1, y0, y1) => {
          // 선형 보간 함수
  
    return y0 + (x - x0) * (y1 - y0) / (x1 - x0);

 

}
