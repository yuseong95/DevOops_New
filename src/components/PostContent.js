import React from "react";

const PostContent = ({ content }) => (
  <div
    className="post-content"
    dangerouslySetInnerHTML={{ __html: content }} // HTML 형식의 내용을 직접 렌더링
  />
);

export default PostContent;
