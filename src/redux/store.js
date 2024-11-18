import { createStore } from "redux";
import userReducer from "./userReducer";
import dummyUsers from "../data/dummyUsers";

// localStorage에서 Redux 상태를 복원하는 함수
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("reduxState");
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (err) {
    console.error("Could not load state", err);
    return undefined;
  }
};

// Redux 상태를 localStorage에 저장하는 함수
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("reduxState", serializedState);
  } catch (err) {
    console.error("Could not save state", err);
  }
};

// dummyUsers와 persistedState를 동기화하는 함수
export const syncWithDummyUsers = (persistedState) => {
  if (!persistedState || !persistedState.users) {
    return { users: dummyUsers }; // 로컬스토리지에 데이터가 없으면 dummyUsers 사용
  }

  // 로컬스토리지에 있는 사용자 목록과 dummyUsers를 병합
  const mergedUsers = dummyUsers.map((dummyUser) => {
    const existingUser = persistedState.users.find(
      (user) => user.id === dummyUser.id
    );
    return existingUser || dummyUser; // 기존 데이터가 있으면 사용, 없으면 dummyUsers 추가
  });

  return { ...persistedState, users: mergedUsers };
};

// Redux store 생성 시 복원된 상태를 사용
const persistedState = syncWithDummyUsers(loadState());
const store = createStore(userReducer, persistedState);

// 상태 변경 시 localStorage에 저장
store.subscribe(() => {
  console.log("Redux 상태 변경:", store.getState());
  saveState(store.getState());
});

export default store;
