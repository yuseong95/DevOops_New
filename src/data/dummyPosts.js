// src/data/dummyPosts.js

const now = new Date();

export const dummyPosts = [
  {
    id: 1,
    title: "개발자 세미나 What We Work 1회에서 발표자를 모집합니다.",
    content:
      "큰돌의 제 1회 작은 개발자 세미나. What We Work 1회를 개최합니다...",
    boardType: "free",
    createdAt: new Date(now - 1000 * 60 * 60 * 24 * 2), // 2일 전
  },
  {
    id: 2,
    title: "requests 방식으로 휴대폰 인증을 자동화 하는 것",
    content:
      "이러한 작업이 불법에 해당되나요? 공부하며 개발 중인데 궁금합니다.",
    boardType: "free",
    createdAt: new Date(now - 1000 * 60 * 60 * 5), // 5시간 전
  },
  // 추가 더미 데이터
];

export default dummyPosts;
