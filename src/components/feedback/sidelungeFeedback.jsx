// 현재 진행 중인 다리를 추적하기 위한 변수 (가정)
// 이 변수는 "right" 또는 "left" 값을 가질 수 있으며, 초기값으로 "right"를 설정할 수 있습니다.
let currentLeg = "right";

export const provideSideLungeFeedback = (pose, setFeedback, updateCount) => {
  const rightAnkle = pose[28];
  const leftAnkle = pose[27];
  const rightKnee = pose[26];
  const leftKnee = pose[25];
  const rightHip = pose[24];
  const leftHip = pose[23];
  const rightShoulder = pose[12];
  const leftShoulder = pose[11];

  // 각도 계산
  const rightLegAngle = calculateAngle(rightHip, rightKnee, rightAnkle); // 오른쪽 다리 각도
  const leftLegAngle = calculateAngle(leftHip, leftKnee, leftAnkle); // 왼쪽 다리 각도
  const upperBodyAngle = calculateAngle(leftShoulder, rightHip, rightKnee); // 상체 각도

  let feedbackMessage = '';
  let isSideLungeComplete = false;

  // 사이드 런지 시작 자세 확인
  if (rightLegAngle > 160 && leftLegAngle > 160) {
    feedbackMessage = "양 발을 힙 너비로 벌리고 시작하세요.";
  }
  // 현재 다리에 대한 사이드 런지 동작 확인
  else {
    if (currentLeg === "right" && rightLegAngle >= 70 && rightLegAngle <= 110) {
      // 오른쪽 다리로 사이드 런지 수행 중
      if (Math.abs(upperBodyAngle - 90) <= 20) {
        feedbackMessage = "올바른 자세입니다. 오른쪽 다리를 구부리고, 왼쪽 다리는 직선으로 유지하세요.";
        isSideLungeComplete = true;
        currentLeg = "left"; // 다음 번에는 왼쪽 다리로
      } else {
        feedbackMessage = "상체 자세를 확인해주세요. 상체가 너무 앞으로 기울어지거나 뒤로 젖혀져 있습니다.";
      }
    } else if (currentLeg === "left" && leftLegAngle >= 70 && leftLegAngle <= 110) {
      // 왼쪽 다리로 사이드 런지 수행 중
      if (Math.abs(upperBodyAngle - 90) <= 20) {
        feedbackMessage = "올바른 자세입니다. 왼쪽 다리를 구부리고, 오른쪽 다리는 직선으로 유지하세요.";
        isSideLungeComplete = true;
        currentLeg = "right"; // 다음 번에는 오른쪽 다리로
      } else {
        feedbackMessage = "상체 자세를 확인해주세요. 상체가 너무 앞으로 기울어지거나 뒤로 젖혀져 있습니다.";
      }
    } else {
      feedbackMessage = "다리 각도를 확인해주세요. ";
      if ((currentLeg === "right" && rightLegAngle < 70) || (currentLeg === "left" && leftLegAngle < 70)) {
        feedbackMessage += "무릎이 너무 많이 구부러졌습니다. ";
      }
      if ((currentLeg === "right" && rightLegAngle > 110) || (currentLeg === "left" && leftLegAngle > 110)) {
        feedbackMessage += "다리를 더 구부려주세요. ";
      }
    }
  }

  // 사이드 런지 완료 자세 확인 및 피드백
  if (isSideLungeComplete) {
    feedbackMessage += "천천히 시작 자세로 돌아가세요.";
    updateCount();
  }

  setFeedback(feedbackMessage); // 최종 피드백 메시지 설정
};
