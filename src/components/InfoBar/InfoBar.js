import React, { useState, useEffect } from "react";
import axios from "axios";

import "./InfoBar.css"; // Import CSS for styling

const InfoBar = () => {
  const [seconds, setSeconds] = useState(0);
  const [price, setPrice] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await axios.get(
          "https://hermes.pyth.network/v2/updates/price/latest?ids%5B%5D=0xd878b9766566a87675421e9b11992c1f2ca2438d5b7d841cb147308e1bd6bb99"
        );
        const priceData = response.data.parsed[0].price;
        const priceValue = Number(priceData.price);
        const expoValue = Number(priceData.expo);

        const adjustedPrice = priceValue * Math.pow(10, expoValue);
        setPrice(adjustedPrice);
      } catch (error) {
        console.error("Error fetching the price", error);
      }
    };

    const intervalId = setInterval(fetchPrice, 200);

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
      <div className="info-bar-left">
        <img src="/assets/taiko.svg" alt="Taiko Logo" className="taiko-logo" />
        <div className="token-info-container">
          <span className="token-info">
            <span className="token-name">TAIKO/USDT</span>
            <span className="token-price">
              {price ? `$${price.toFixed(5)}` : "Loading..."}
            </span>
          </span>
        </div>
      </div>

      <div className="info-bar-middle">
        <div className="tooltip">
          <span className="tooltip-text">
            <ol>
              <li>Bets are placed using ETH currency.</li>
              <li>
                Please add{" "}
                <a
                  href="https://chainlist.org/chain/167009"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="highlighted-link"
                >
                  Hekla network
                </a>{" "}
                to your metamask wallet.
              </li>
              <li>
                You need Hekla ETH for betting. You can{" "}
                <a
                  href="https://holesky-faucet.pk910.de/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="highlighted-link"
                >
                  mine Holesky ETH
                </a>{" "}
                here.
              </li>
              <li>
                Then{" "}
                <a
                  href="https://bridge.hekla.taiko.xyz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="highlighted-link"
                >
                  bridge
                </a>{" "}
                them to Hekla network.
              </li>
            </ol>
          </span>
          <span className="tooltip-trigger">Instructions for game</span>
        </div>
      </div>

      <div className="info-bar-right">
        <span className="timer">Time left: {formatTime(seconds)}</span>
        <img src="/assets/clock.webp" alt="Clock" className="clock-icon" />
      </div>
    </div>
  );
};

export default InfoBar;
