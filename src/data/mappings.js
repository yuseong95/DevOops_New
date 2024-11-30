// src/data/mappings.js
import java from "../images/java.png";

// 배지와 이모티콘 매핑
export const badgeIcons = {
  Typing1: "⌨️🥇",
  Typing2: "⌨️🥈",
  Typing3: "⌨️🥉",
  Error1: "🔍🥇",
  Error2: "🔍🥈",
  Error3: "🔍🥉",
  "1달 연속 접속": "📅",
  "1주 연속 접속": "🗓️",
};

// 기술 스택과 이미지 URL 매핑
export const skillIcons = {
  Java: java,
  Kotlin: "https://upload.wikimedia.org/wikipedia/commons/7/74/Kotlin_Icon.png",
  C: "https://upload.wikimedia.org/wikipedia/commons/1/18/C_Programming_Language.svg",
  "C++":
    "https://upload.wikimedia.org/wikipedia/commons/1/18/C_Programming_Language.svg", // 동일한 아이콘을 사용
  JavaScript:
    "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
  React: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
  "Node.js":
    "https://raw.githubusercontent.com/balena-io-examples/balena-nodejs-hello-world/master/logo.png",
  Python:
    "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
  Django:
    "https://i0.wp.com/blog.weirdx.io/wp-content/uploads/2016/07/django.png?fit=768%2C349&ssl=1",
  MachineLearning: "https://cdn-icons-png.flaticon.com/512/6361/6361009.png", // 이모티콘 사용 예시
};
