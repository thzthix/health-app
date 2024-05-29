export const providePushupFeedback = (pose, setFeedback, updateCount) => {
  const rightWrist = pose[16];
  const leftWrist = pose[15];
  const rightElbow = pose[14];
  const leftElbow = pose[13];
  const rightShoulder = pose[12];
  const leftShoulder = pose[11];
  const rightHip = pose[24];
  const leftHip = pose[23];
  const rightAnkle = pose[28];
  const leftAnkle = pose[27];

  // 각도 계산
  const rightElbowAngle = calculateAngle(rightShoulder, rightElbow, rightWrist);
  const leftElbowAngle = calculateAngle(leftShoulder, leftElbow, leftWrist);
  const bodyAngle = calculateAngle(rightShoulder, rightHip, rightAnkle);

  let feedbackMessage = '';
  let isPushupComplete = false;
  let isCurrentPushupCorrect = false;

  // 1단계: 시작 자세 확인
  if (rightElbowAngle > 160 && leftElbowAngle > 160 && bodyAngle > 160) {
    feedbackMessage = "양 손을 어깨너비로 벌리고 바닥에 두세요. 몸은 일직선을 유지하며 플랭크 자세를 취하세요.";
  }
  // 2단계: 푸쉬업 하강 동작 확인
  else if (rightElbowAngle <= 90 && leftElbowAngle <= 90) {
    feedbackMessage = "올바른 자세입니다. 팔꿈치를 구부리며 몸을 낮춰주세요. 몸은 일직선을 유지하세요.";
    if (bodyAngle < 160) {
      feedbackMessage += " 몸이 너무 내려갔습니다. 엉덩이를 약간 올리세요.";
    }
    isCurrentPushupCorrect = true;
  } else {
    // 자세가 올바르지 않은 경우, 구체적인 피드백 제공
    feedbackMessage = "자세를 다시 확인해주세요. ";
    if (rightElbowAngle > 90 || leftElbowAngle > 90) {
      feedbackMessage += "팔꿈치를 더 구부리세요. ";
    }
    if (bodyAngle < 160) {
      feedbackMessage += "몸이 일직선이 아닙니다. 엉덩이를 약간 올리세요.";
    }
  }

  // 3단계: 일어나기 동작 확인
  if (rightElbowAngle > 160 && leftElbowAngle > 160 && bodyAngle > 160) {
    if (isCurrentPushupCorrect) {
      feedbackMessage = "훌륭합니다! 천천히 시작 자세로 돌아가세요.";
      isPushupComplete = true;
    } else {
      feedbackMessage = "몸을 일직선으로 유지하며 시작 자세로 돌아가세요.";
    }
  }

  setFeedback(feedbackMessage); // 최종 피드백 메시지 설정

  // 푸쉬업 완료 시 횟수 증가
  if (isPushupComplete) {
    updateCount();
  }
};

// 각도 계산 함수 예시
const calculateAngle = (pointA, pointB, pointC) => {
  const AB = Math.sqrt(Math.pow(pointB.x - pointA.x, 2) + Math.pow(pointB.y - pointA.y, 2));
  const BC = Math.sqrt(Math.pow(pointC.x - pointB.x, 2) + Math.pow(pointC.y - pointB.y, 2));
  const AC = Math.sqrt(Math.pow(pointC.x - pointA.x, 2) + Math.pow(pointC.y - pointA.y, 2));
  const angle = Math.acos((AB * AB + BC * BC - AC * AC) / (2 * AB * BC));
  return angle * (180 / Math.PI);
};
