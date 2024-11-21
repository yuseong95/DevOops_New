// helpers.js
export const isKeyboardCodeAllowed = ({ code }) => {
  return true; // 모든 키 허용
};

export const countErrors = ({ actual, expected }) => {
  const maxLength = Math.max(actual.length, expected.length);
  let errors = 0;

  for (let i = 0; i < maxLength; i++) {
    if (actual[i] !== expected[i]) {
      errors++;
    }
  }

  return errors;
};

export const calcutateScore = ({ errors, total }) => {
  if (total > 0) {
    const corrects = total - errors;
    if (corrects < 0) return 0; // 오타 수정
    const score =
      total * (corrects / total) * (corrects / total) * (corrects / total) * 50;
    return parseFloat(score.toFixed(2)); // 소수점 2자리로 반올림
  }
  return 0;
};

export const calculateAccuracyPercentage = ({ errors, total }) => {
  if (total > 0) {
    const corrects = total - errors;
    if (total - errors < 0) return 0;
    return (corrects / total) * 100;
  }
  return 100; // total이 0일 때 100% 반환
};

export const formatPercentage = (props) => {
  const { percentage = 0 } = props; // 기본값을 0으로 설정
  return percentage.toFixed(0) + '%';
};

export const formatScore = (props) => {
  const { score = 0 } = props; // 기본값을 0으로 설정
  return score.toFixed(0);
};
