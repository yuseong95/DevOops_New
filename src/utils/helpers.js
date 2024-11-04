export const isKeyboardCodeAllowed = ({ code }) => {
  return (
    code.startsWith('Key') ||
    code.startsWith('Digit') ||
    code === 'Backspace' ||
    code === 'Space'
  );
};
export const countErrors = (props) => {
  const { actual, expected } = props;
  const expectedCharacters = expected.split('');

  return expectedCharacters.reduce((errors, expectedChar, i) => {
    const actualChar = actual[i];
    if (actualChar !== expectedChar) {
      errors++;
    }
    return errors;
  }, 0);
};

export const calculateAccuracyPercentage = (props) => {
  const { errors, total } = props;
  if (total > 0) {
    const corrects = total - errors;
    return (corrects / total) * 100;
  }
  return 0;
};

export const formatPercentage = (props) => {
  const { percentage = 0 } = props; // 기본값을 0으로 설정
  return percentage.toFixed(0) + '%';
};
