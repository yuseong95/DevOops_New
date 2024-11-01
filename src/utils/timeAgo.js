// src/utils/timeAgo.js

export const timeAgo = (date) => {
  const seconds = Math.floor((new Date() - date) / 1000);
  const intervals = [
    { label: "년", seconds: 31536000 },
    { label: "개월", seconds: 2592000 },
    { label: "일", seconds: 86400 },
    { label: "시간", seconds: 3600 },
    { label: "분", seconds: 60 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) return `${count}${interval.label} 전`;
  }
  return "방금 전";
};

export default timeAgo;
