import React, { useEffect, useState } from "react";
import Prism from "prismjs";
import "./css/ErrorGame.css";
import "prismjs/themes/prism-twilight.css"; // Prism CSS 포함
import "prismjs/components/prism-c.min.js";

const ErrorGame = () => {
  const [fileContent, setFileContent] = useState("");

  // test.txt 파일 내용 가져오기
  useEffect(() => {
    fetch("/test.txt")
      .then((response) => {
        if (!response.ok) {
          throw new Error("파일 불러오기 실패");
        }
        return response.text(); // 텍스트로 응답을 읽음
      })
      .then((text) => {
        setFileContent(text); // 파일 내용을 상태에 저장
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // 복사 이벤트 방지
  const handleCopy = (event) => {
    event.preventDefault();
    alert("복사는 불가능합니다.");
  };

  // 코드 하이라이팅
  useEffect(() => {
    Prism.highlightAll();
  }, [fileContent]);

  return (
    <div className="errorGame">
      <div className="top">
        <div className="title">오류/오타가 있는 라인의 숫자를 입력하세요.</div>
        <div className="timer">타이머</div>
      </div>
      {/* <div className="errorCode" onCopy={handleCopy} onCut={handleCopy}> */}
      {/* <textarea
          className="code-textarea"
          placeholder="문제코드"
          disabled
          onCopy={handleCopy} // 복사 이벤트 방지
          value={fileContent}
        /> */}
      <pre className="language-java" onCopy={handleCopy} onCut={handleCopy}>
        <code className="language-java">{fileContent}</code>
      </pre>
      {/* </div> */}
      <div className="input">
        <input type="text" className="input-field" placeholder="Line Number" />
        <button className="input-button">제출</button>
      </div>
    </div>
  );
};

export default ErrorGame;
