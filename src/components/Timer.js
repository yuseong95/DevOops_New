import React, { useState, useEffect } from "react";
import "./css/Timer.css";

const Timer = () => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10); // 밀리초 단위
      }, 10); // 10ms마다 업데이트
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const formatTime = (time) => {
    const minutes = String(Math.floor((time / 60000) % 60)).padStart(2, "0");
    const seconds = String(Math.floor((time / 1000) % 60)).padStart(2, "0");
    const milliseconds = String((time % 1000) / 10).padStart(2, "0");
    return `${minutes}:${seconds}.${milliseconds}`;
  };

  return (
    <div className="timer">
      <h1>{formatTime(time)}</h1>
      <button onClick={toggleTimer}>{isActive ? "Pause" : "Start"}</button>
    </div>
  );
};

export default Timer;
