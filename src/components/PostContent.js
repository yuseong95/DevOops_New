// src/components/PostContent.js
import React from "react";

const PostContent = ({ content }) => (
  <div className="post-content" dangerouslySetInnerHTML={{ __html: content }} />
);

export default PostContent;
