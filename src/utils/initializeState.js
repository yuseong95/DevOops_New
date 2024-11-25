import { syncWithDummyUsers } from "../redux/store";

// Redux와 로컬스토리지를 동기화

export const initializeState = () => {
  const reduxState = JSON.parse(localStorage.getItem("reduxState"));
  // Redux와 dummyUsers 동기화
  const updatedState = syncWithDummyUsers(reduxState);
  // 로컬스토리지에 저장
  localStorage.setItem("reduxState", JSON.stringify(updatedState));
};
