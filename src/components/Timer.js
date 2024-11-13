import React, { useState, useEffect } from "react";
import "./css/Timer.css";

const Timer = ({ onStart, onStop }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval = null;
    if (onStart) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10); // ms 단위
      }, 10); // 10ms마다 업데이트
    } else {
      clearInterval(interval);
      onStop(time);
    }
    return () => clearInterval(interval);
  }, [onStart, onStop, time]);

  const formatTime = (time) => {
    const minutes = String(Math.floor((time / 60000) % 60)).padStart(2, "0");
    const seconds = String(Math.floor((time / 1000) % 60)).padStart(2, "0");
    const milliseconds = String((time % 1000) / 10).padStart(2, "0");
    return `${minutes}:${seconds}.${milliseconds}`;
  };

  return (
    <div className="timer">
      <h1>{formatTime(time)}</h1>
    </div>
  );
};

export default Timer;
