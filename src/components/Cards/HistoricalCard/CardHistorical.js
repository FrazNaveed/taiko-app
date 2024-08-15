import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import "./CardHistorical.css";

const CardHistorical = () => {
  const closedPrice = 1.987; // Example closed price
  const startPrice = 0.35; // Hardcoded reference price
  const prizePool = 591.35; // Example prize pool

  return (
    <div className="card disabled-card">
      <div className="card-heading">
        <span>Expired</span>
      </div>
      <div className="card-section">
        <div
          className={`multiplier-arrow-up-historical ${
            startPrice > closedPrice ? "background-green" : ""
          }`}
        >
          <span>UP</span>
        </div>
        <div className="card-body">
          <div className="card-body_price-font">
            <span>Closed Price</span>
          </div>

          <div className="card_body_round-result">
            <span
              className={`card-expired-round-price ${
                startPrice > closedPrice ? "price-above" : "price-below"
              }`}
            >
              ${closedPrice.toFixed(5)}
            </span>

            <div
              className={`card-expired-round-difference ${
                startPrice > closedPrice ? "background-green" : "background-red"
              }`}
            >
              {" "}
              <FontAwesomeIcon
                icon={startPrice > closedPrice ? faArrowUp : faArrowDown}
              />
              <span>${(closedPrice - startPrice).toFixed(3)}</span>
            </div>
          </div>

          <div className="card_body_locked-price">
            <span>Locked Price: </span>
            <span> ${startPrice}</span>
          </div>

          <div className="card_body_prize-section">
            <span>Prize Pool: </span>
            <span> {prizePool} ETH</span>
          </div>
        </div>
        <div
          className={`multiplier-arrow-down-historical ${
            closedPrice > startPrice ? "background-red" : ""
          }`}
        >
          <span>DOWN</span>
        </div>
      </div>
    </div>
  );
};

export default CardHistorical;
