export const provideLungeFeedback = (pose, setFeedback, updateCount, lungeSide, setLungeSide) => {
  const rightAnkle = pose[28];
  const leftAnkle = pose[27];
  const rightKnee = pose[26];
  const leftKnee = pose[25];
  const rightHip = pose[24];
  const leftHip = pose[23];
  const rightShoulder = pose[12];
  const leftShoulder = pose[11];

  // 각도 계산
  const rightKneeAngle = calculateAngle(rightHip, rightKnee, rightAnkle);
  const leftKneeAngle = calculateAngle(leftHip, leftKnee, leftAnkle);
  const upperBodyAngle = calculateAngle(leftShoulder, leftHip, leftKnee);

  let feedbackMessage = '';
  let isLungeComplete = false;
  let isCurrentLungeCorrect = false;

  // 오른쪽 혹은 왼쪽 다리로 런지 수행 결정
  const isRightSideLunge = lungeSide === 'right';

  // 1단계: 시작 자세 확인
  if (rightKneeAngle > 160 && leftKneeAngle > 160) {
    feedbackMessage = "양 발을 어깨너비로 벌리고 서 있으세요. 한 발을 크게 앞으로 내디뎌주세요.";
  }
  // 2단계: 런지 하강 동작 확인
  else if ((isRightSideLunge && rightKneeAngle >= 90 && rightKneeAngle <= 110) || 
           (!isRightSideLunge && leftKneeAngle >= 90 && leftKneeAngle <= 110)) {
    feedbackMessage = "올바른 자세를 유지하고 있습니다. 앞발의 무릎은 발목 바로 위에, 뒷발의 무릎은 바닥 가까이 낮추되 바닥에 닿지 않게 하세요.";
    if (Math.abs(upperBodyAngle - 90) > 20) {
      feedbackMessage += upperBodyAngle < 70 ? " 상체가 너무 앞으로 기울었습니다. 상체를 더 세우세요." : " 상체가 너무 뒤로 기울었습니다. 상체를 앞으로 기울이세요.";
    }
    isCurrentLungeCorrect = true;
  } else {
    // 자세가 올바르지 않은 경우, 구체적인 피드백 제공
    feedbackMessage = "자세를 다시 확인해주세요. ";
    if (isRightSideLunge) {
      if (rightKneeAngle < 90 || rightKneeAngle > 110) {
        feedbackMessage += rightKneeAngle < 90 ? "앞발의 무릎을 적당히 구부리세요. " : "앞발의 무릎이 너무 펴져 있습니다. ";
      }
    } else {
      if (leftKneeAngle < 90 || leftKneeAngle > 110) {
        feedbackMessage += leftKneeAngle < 90 ? "뒷발의 무릎이 너무 많이 구부려져 있습니다. " : "뒷발의 무릎을 살짝 더 구부리세요. ";
      }
    }
    if (Math.abs(upperBodyAngle - 90) > 20) {
      feedbackMessage += upperBodyAngle < 70 ? "상체가 너무 앞으로 기울었습니다. 상체를 세우세요." : "상체가 너무 뒤로 기울었습니다. 상체를 앞으로 기울이세요.";
    }
  }

  // 3단계: 일어나기 동작 확인
  if ((isRightSideLunge && rightKneeAngle > 160 && leftKneeAngle > 160) || 
      (!isRightSideLunge && rightKneeAngle > 160 && leftKneeAngle > 160)) {
    feedbackMessage = "다리의 힘을 이용해 천천히 시작 자세로 돌아가세요.";
    isLungeComplete = true;
  }

  setFeedback(feedbackMessage); // 최종 피드백 메시지 설정

  // 런지 완료 시 횟수 증가 및 방향 전환
  if (isLungeComplete && isCurrentLungeCorrect) {
    updateCount();
    setLungeSide(isRightSideLunge ? 'left' : 'right'); // 방향 전환
  }
};
