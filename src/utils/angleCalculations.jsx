// src/utils/angles.js
const calculateAngle = (a, b, c) => {
    const aPoint = {x: a.x, y: a.y};
    const bPoint = {x: b.x, y: b.y};
    const cPoint = {x: c.x, y: c.y};
  
    const radians = Math.atan2(cPoint.y - bPoint.y, cPoint.x - bPoint.x) 
    - Math.atan2(aPoint.y - bPoint.y, aPoint.x - bPoint.x);
    let angle = Math.abs(radians * 180.0 / Math.PI);
  
    if (angle > 180.0) {
        angle = 360 - angle;
    }
  
    return angle;
  };
  export default calculateAngle