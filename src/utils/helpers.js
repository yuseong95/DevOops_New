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
