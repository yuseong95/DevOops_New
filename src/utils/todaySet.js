// ErrorGame 오늘의 문제 인덱스 계산
export const calculateTodaySetIndex = () => {
  const today = new Date();
  const dayNumber = Math.floor(today.getTime() / (1000 * 60 * 60 * 24));
  return dayNumber % 7;
};
