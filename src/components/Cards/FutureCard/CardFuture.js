import React from "react";
import { useTimer } from "../../../TimerContext"; // Import useTimer
import "./CardFuture.css";

const CardFuture = () => {
  const { secondsRemaining } = useTimer(); // Get secondsRemaining from context

  // Format seconds into MM:SS
  const formatTime = (sec) => {
    const minutes = Math.floor(sec / 60);
    const seconds = sec % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div className="card-future">
      <div className="card-heading">
        <span>Later</span>
      </div>
      <div className="card-section">
        <div className="card-future-multiplier-arrow-up">
          <span>UP</span>
        </div>
        <div className="card-body-future">
          <span>Entry starts:</span>
          <span>~{formatTime(secondsRemaining)}</span>
        </div>
        <div className="card-future-multiplier-arrow-down">
          <span>DOWN</span>
        </div>
      </div>
    </div>
  );
};

export default CardFuture;
