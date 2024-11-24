import dummyUsers from "./dummyUsers"; // dummyUsers 불러오기

const now = new Date();

// 자유 게시판 제목과 내용 예시
const freeBoardPosts = [
  {
    title: "개발자 세미나 What We Work 1회에서 발표자를 모집합니다.",
    content:
      "큰돌의 제 1회 작은 개발자 세미나. What We Work 1회를 개최합니다...",
  },
  {
    title: "API 서버 연결 문제 해결 방법",
    content:
      "API 서버와의 연결에서 발생할 수 있는 문제 해결 방법을 공유합니다...",
  },
  {
    title: "알고리즘 문제 해결 전략",
    content: "알고리즘 문제를 해결할 때 주의할 점에 대해 정리했습니다...",
  },
  {
    title: "클린 코드 작성법",
    content: "클린 코드를 작성하기 위한 팁과 방법을 소개합니다...",
  },
  {
    title: "프로젝트 관리 도구 추천",
    content: "다양한 프로젝트 관리 도구를 비교하고 추천합니다...",
  },
  {
    title: "최신 인공지능 트렌드 알아보기",
    content: "최근 주목받고 있는 인공지능 트렌드에 대해 분석해 보세요.",
  },
  {
    title: "백엔드 보안 강화 방법",
    content: "백엔드 개발에서 꼭 필요한 보안 강화 방법을 정리했습니다.",
  },
  {
    title: "리팩토링 실습 사례",
    content: "리팩토링을 통해 더 효율적인 코드 작성 방법을 실습해 보세요.",
  },
  {
    title: "코딩 테스트에서 자주 나오는 문제 유형",
    content: "코딩 테스트를 준비하며 알아두면 좋은 문제 유형을 정리했습니다.",
  },
];

// 팀원 모집 게시판 제목과 내용 예시
const teamBoardPosts = [
  {
    title: "React 개발자 구합니다!",
    content:
      "React를 활용한 웹 프로젝트에 함께할 팀원을 모집합니다. 관심 있으신 분은 연락 주세요!",
  },
  {
    title: "백엔드 개발자 모집 (Node.js, Spring)",
    content:
      "Node.js 또는 Spring을 다룰 수 있는 백엔드 개발자를 찾고 있습니다.",
  },
  {
    title: "UI/UX 디자이너 모집",
    content: "사용자 경험을 개선하기 위한 UI/UX 디자이너를 모집합니다.",
  },
  {
    title: "데이터 분석가 모집 (Python, R)",
    content: "데이터 시각화와 분석에 관심 있는 데이터 분석 전문가를 찾습니다.",
  },
  {
    title: "풀스택 개발자 구합니다",
    content:
      "프론트엔드와 백엔드를 모두 다룰 수 있는 풀스택 개발자를 모집합니다.",
  },
  {
    title: "모바일 앱 개발자 모집",
    content:
      "React Native 또는 Flutter를 사용해 앱 개발 경험이 있는 개발자를 찾습니다.",
  },
  {
    title: "DevOps 엔지니어 모집",
    content:
      "AWS 또는 GCP를 활용한 인프라 구축 경험이 있는 DevOps 엔지니어를 모집합니다.",
  },
  {
    title: "AI 모델링 엔지니어 모집",
    content: "딥러닝 모델 개발과 데이터 처리에 관심 있는 엔지니어를 찾습니다.",
  },
  {
    title: "게임 개발자 구합니다",
    content:
      "Unity 또는 Unreal Engine을 활용한 게임 개발 경험이 있는 분을 모집합니다.",
  },
];

// 더미 포스트 생성
const createDummyPosts = (postTemplates, boardType) => {
  const posts = [];
  const usedCombinations = new Set();

  for (let i = 0; i < postTemplates.length * dummyUsers.length; i++) {
    const userIndex = i % dummyUsers.length;
    const postIndex = Math.floor(i / dummyUsers.length) % postTemplates.length;
    const combinationKey = `${userIndex}-${postIndex}`;

    // 동일 사용자가 같은 게시글을 중복 작성하지 않도록 방지
    if (usedCombinations.has(combinationKey)) continue;

    usedCombinations.add(combinationKey);

    const authorData = dummyUsers[userIndex];
    const postTemplate = postTemplates[postIndex];

    posts.push({
      id: posts.length + 1,
      title: postTemplate.title,
      content: postTemplate.content,
      boardType,
      createdAt: new Date(now - 1000 * 60 * 60 * 24 * ((i % 10) + 1)), // 1~10일 전
      author: authorData.name, // 작성자 이름
      authorId: authorData.id, // 작성자 ID
      authorProfile: authorData.profileImage, // 작성자 프로필 이미지
    });
  }

  return posts;
};

// 자유 게시판과 팀원 모집 게시판의 더미 게시글 생성
export const dummyPosts = [
  ...createDummyPosts(freeBoardPosts, "free"),
  ...createDummyPosts(teamBoardPosts, "team"),
];

export default dummyPosts;
