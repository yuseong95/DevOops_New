// src/index.js

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store, { syncWithDummyUsers } from "./redux/store";

const initializeState = () => {
  const reduxState = JSON.parse(localStorage.getItem("reduxState"));
  // Redux와 dummyUsers 동기화
  const updatedState = syncWithDummyUsers(reduxState);
  // 로컬스토리지에 저장
  localStorage.setItem("reduxState", JSON.stringify(updatedState));
};

initializeState(); // 시작 시 Redux 동기화

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //<React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
