// 각 게임 점수 순으로 정렬
export const getSortedUsers = (users, scoreKey) => {
  return [...users].sort((a, b) => (b[scoreKey] || 0) - (a[scoreKey] || 0));
};

// 유저 1명의 랭킹과 점수 찾는 함수
export const getUserRankAndScore = (sortedUsers, userId) => {
  const index = sortedUsers.findIndex((user) => user.id === userId);
  const score =
    index !== -1
      ? sortedUsers[index][
          Object.keys(sortedUsers[0]).find((key) => key.endsWith("Score"))
        ]
      : null;
  return { rank: index !== -1 ? index + 1 : null, score };
};
