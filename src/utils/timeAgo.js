// src/utils/timeAgo.js

export const timeAgo = (date) => {
  const seconds = Math.floor((new Date() - date) / 1000); // 현재 시간과 입력 날짜의 차이를 초 단위로 계산

  // 각 시간 단위에 대한 레이블과 초 값을 정의
  const intervals = [
    { label: "년", seconds: 31536000 },
    { label: "개월", seconds: 2592000 },
    { label: "일", seconds: 86400 },
    { label: "시간", seconds: 3600 },
    { label: "분", seconds: 60 },
  ];

  // 큰 시간 단위부터 순차적으로 해당 단위로 나누어 떨어지면 해당 단위로 표기
  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) return `${count}${interval.label} 전`;
  }

  return "방금 전"; // 1분 미만의 경우 "방금 전"으로 표기
};

export default timeAgo;
