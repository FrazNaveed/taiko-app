import React, { useState, useEffect } from "react";
import "./InfoBar.css"; // Import CSS for styling

const InfoBar = () => {
  // Timer state
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // Set up interval for timer
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const formatTime = (sec) => {
    const minutes = Math.floor(sec / 60);
    const seconds = sec % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div className="info-bar">
      {/* Left Section */}
      <div className="info-bar-left">
        <img src="/assets/taiko.svg" alt="Taiko Logo" className="taiko-logo" />
        <div className="token-info-container">
          <span className="token-info">
            <span className="token-name">TAO/USDT</span>
            <span className="token-price">$10.00</span>{" "}
            {/* Replace with dynamic price if needed */}
          </span>
        </div>
      </div>

      {/* Middle Section */}
      <div className="info-bar-middle">
        <button className="arrow-button left">&lt;</button>
        <button className="arrow-button right">&gt;</button>
      </div>

      {/* Right Section */}
      <div className="info-bar-right">
        <span className="timer">{formatTime(seconds)}</span>
        <img src="/assets/clock.webp" alt="Clock" className="clock-icon" />
      </div>
    </div>
  );
};

export default InfoBar;
