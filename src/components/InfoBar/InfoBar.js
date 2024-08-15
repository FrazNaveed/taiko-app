import React from "react";
import { useTimer } from "../../TimerContext";
import { usePrice } from "../../PriceContext";
import "./InfoBar.css";

const InfoBar = () => {
  const { timeRemaining, formatTime } = useTimer();
  const price = usePrice();

  const formatTimeInMinutes = (milliseconds) => {
    // Convert milliseconds to seconds
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
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
                You need Hekla ETH for betting. You first need to{" "}
                <a
                  href="https://holesky-faucet.pk910.de/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="highlighted-link"
                >
                  mine Holesky ETH
                </a>{" "}
                from here.
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
        <span className="timer">
          Next in: {formatTimeInMinutes(timeRemaining)}
        </span>
        <img src="/assets/clock.webp" alt="Clock" className="clock-icon" />
      </div>
    </div>
  );
};

export default InfoBar;
