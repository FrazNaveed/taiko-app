import React, { useState, useEffect } from "react";
import axios from "axios";

import "./InfoBar.css"; // Import CSS for styling

const InfoBar = () => {
  // Timer state
  const [seconds, setSeconds] = useState(0);
  const [price, setPrice] = useState(null);

  useEffect(() => {
    // Set up interval for timer
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Function to fetch the price
    const fetchPrice = async () => {
      try {
        const response = await axios.get(
          "https://hermes.pyth.network/v2/updates/price/latest?ids%5B%5D=0xd878b9766566a87675421e9b11992c1f2ca2438d5b7d841cb147308e1bd6bb99"
        );
        const priceData = response.data.parsed[0].price;
        const priceValue = Number(priceData.price);
        const expoValue = Number(priceData.expo);

        const adjustedPrice = priceValue * Math.pow(10, expoValue);
        console.log(adjustedPrice);
        setPrice(adjustedPrice);
      } catch (error) {
        console.error("Error fetching the price", error);
      }
    };

    // Fetch the price every 0.2 seconds
    const intervalId = setInterval(fetchPrice, 200);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
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
            <span className="token-name">TAIKO/USDT</span>
            <span className="token-price">
              {price ? `$${price.toFixed(5)}` : "Loading..."}
            </span>{" "}
            {/* Replace with dynamic price if needed */}
          </span>
        </div>
      </div>

      {/* Right Section */}
      <div className="info-bar-right">
        <span className="timer">Time left: {formatTime(seconds)}</span>
        <img src="/assets/clock.webp" alt="Clock" className="clock-icon" />
      </div>
    </div>
  );
};

export default InfoBar;
