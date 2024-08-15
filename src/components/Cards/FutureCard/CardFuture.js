import React from "react";
import { useTimer } from "../../../TimerContext"; // Import useTimer
import "./CardFuture.css";

const CardFuture = () => {
  const { timeRemaining } = useTimer(); // Get timeRemaining from context

  // Convert milliseconds to seconds and format into MM:SS
  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000); // Convert milliseconds to seconds
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
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
          <span>~{formatTime(timeRemaining)}</span>
        </div>
        <div className="card-future-multiplier-arrow-down">
          <span>DOWN</span>
        </div>
      </div>
    </div>
  );
};

export default CardFuture;
