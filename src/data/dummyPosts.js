// src/data/dummyPosts.js

const now = new Date();

// 게시글 제목과 내용의 예시 목록
const titles = [
  "개발자 세미나 What We Work 1회에서 발표자를 모집합니다.",
  "API 서버 연결 문제 해결 방법",
  "알고리즘 문제 해결 전략",
  "클린 코드 작성법",
  "프로젝트 관리 도구 추천",
  "인공지능 트렌드",
  "백엔드 보안 설정",
  "디자인 패턴 공부법",
  "리팩토링 실습",
  "코딩 테스트 준비",
];

const contents = [
  "큰돌의 제 1회 작은 개발자 세미나. What We Work 1회를 개최합니다...",
  "API 서버와의 연결에서 발생할 수 있는 문제 해결 방법을 공유합니다...",
  "알고리즘 문제를 해결할 때 주의할 점에 대해 정리했습니다...",
  "클린 코드를 작성하기 위한 팁과 방법을 소개합니다...",
  "다양한 프로젝트 관리 도구를 비교하고 추천합니다...",
  "최근 인공지능 분야에서 주목받고 있는 트렌드입니다...",
  "백엔드에서 보안을 강화하기 위한 방법에 대해 알아보겠습니다...",
  "디자인 패턴의 기초와 응용 방법을 소개합니다...",
  "리팩토링을 통해 더 좋은 코드를 작성하는 방법입니다...",
  "코딩 테스트를 준비하는 과정에서 도움이 된 자료입니다...",
];

// dummyUsers 파일에서 작성자 ID 가져오기
const authorIds = ["ckals413", "f", "d"];

// 더미 포스트 30개 생성
export const dummyPosts = Array.from({ length: 30 }, (_, index) => {
  const title = titles[index % titles.length]; // 10개의 제목 순환
  const content = contents[index % contents.length]; // 10개의 내용 순환
  const boardType = index % 2 === 0 ? "free" : "team"; // 짝수: free, 홀수: team
  const createdAt = new Date(now - 1000 * 60 * 60 * 24 * ((index % 5) + 1)); // 1~5일 전
  const author = authorIds[index % authorIds.length]; // 3명의 사용자 ID 순환

  return {
    id: index + 1,
    title,
    content,
    boardType,
    createdAt,
    author,
  };
});

export default dummyPosts;
