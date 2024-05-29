export const provideSquatFeedback = (pose, setFeedback, updateCount) => {
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
  const hipAngle = calculateAngle(leftShoulder, leftHip, rightHip);
  const upperBodyAngle = calculateAngle(rightShoulder, rightHip, rightKnee);

  let feedbackMessage = '';
  let isSquatComplete = false; // 스쿼트 완료 여부를 체크하는 변수 추가

  // 1단계: 시작 자세 확인
  if (rightKneeAngle > 160 && leftKneeAngle > 160 && hipAngle > 160) {
    feedbackMessage = "양 발을 어깨너비로 벌리고 서세요.";
  }

  // 2단계: 스쿼트 하강 동작 확인
  else if ((rightKneeAngle >= 80 && rightKneeAngle <= 120) && (leftKneeAngle >= 80 && leftKneeAngle <= 120) && hipAngle >= 160 && Math.abs(upperBodyAngle - 90) <= 20) {
    feedbackMessage = "올바른 자세입니다. 엉덩이를 뒤로 빼면서 앉듯이 몸을 낮추세요.";
  } else {
    // 자세가 올바르지 않은 경우, 구체적인 피드백 제공
    feedbackMessage = "자세를 확인해주세요. ";
    if (rightKneeAngle < 80 || rightKneeAngle > 120) {
      feedbackMessage += rightKneeAngle < 80 ? "오른쪽 무릎이 너무 많이 구부러졌습니다. " : "오른쪽 무릎이 너무 펴졌습니다. ";
    }
    if (leftKneeAngle < 80 || leftKneeAngle > 120) {
      feedbackMessage += leftKneeAngle < 80 ? "왼쪽 무릎이 너무 많이 구부러졌습니다. " : "왼쪽 무릎이 너무 펴졌습니다. ";
    }
    if (hipAngle < 160) {
      feedbackMessage += "엉덩이를 더 낮추세요. ";
    }
    if (Math.abs(upperBodyAngle - 90) > 20) {
      feedbackMessage += upperBodyAngle < 70 ? "상체가 너무 앞으로 기울어졌습니다. " : "상체가 너무 뒤로 젖혀졌습니다. ";
    }
  }

  // 3단계: 상체 자세 피드백
  if (Math.abs(upperBodyAngle - 90) > 20) {
    feedbackMessage = upperBodyAngle < 70 ? "상체가 너무 앞으로 기울어졌습니다. 상체를 세우세요." : "상체가 너무 뒤로 젖혀졌습니다. 상체를 세우세요.";
  }

  // 4단계: 일어나기 동작 확인
  if ((rightKneeAngle > 160 && leftKneeAngle > 160) && hipAngle > 160) {
    feedbackMessage = "다리의 힘을 이용해 천천히 시작 자세로 돌아가세요.";
    isSquatComplete = true; // 사용자가 다시 시작 자세로 돌아왔다면 스쿼트 완료로 간주
  }

  setFeedback(feedbackMessage); // 최종 피드백 메시지 설정

  // 스쿼트 완료 시 횟수 증가
  if (isSquatComplete) {
    updateCount();
  }
};
