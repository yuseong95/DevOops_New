// src/components/SelectBoardType.js
import React from "react";

const SelectBoardType = ({ boardType, setBoardType }) => (
  <select value={boardType} onChange={(e) => setBoardType(e.target.value)}>
    <option value="free">자유 게시판</option>
    <option value="team">팀원 모집 게시판</option>
  </select>
);

export default SelectBoardType;
