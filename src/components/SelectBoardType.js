import React from "react";

// 게시판 타입을 선택하는 드롭다운 컴포넌트
const SelectBoardType = ({ boardType, setBoardType }) => (
  <select value={boardType} onChange={(e) => setBoardType(e.target.value)}>
    <option value="free">자유 게시판</option>
    <option value="team">팀원 모집 게시판</option>
  </select>
);

export default SelectBoardType;
