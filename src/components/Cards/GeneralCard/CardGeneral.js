import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { usePrice } from "../../../PriceContext"; // Import usePrice
import "./CardGeneral.css";

const CardGeneral = () => {
  const price = usePrice(); // Get price from context
  const referencePrice = 1.92185; // Set reference price here

  return (
    <div className="card-general">
      <div className="card-general-heading">
        <span>Live</span>
      </div>
      <div className="card-general-section">
        <div className="card-general-arrow card-general-arrow-up">
          <span>UP</span>
        </div>
        <div
          className={`card-general-body ${
            price > referencePrice ? "border-green" : "border-red"
          }`}
        >
          <div className="card-general-price-font">
            <span>Closed Price</span>
          </div>

          <div className="card-general-round-result">
            <span
              className={`card-general-round-price ${
                price > referencePrice ? "price-above" : "price-below"
              }`}
            >
              {price ? `$${price.toFixed(5)}` : "Loading..."}
            </span>
            <div
              className={`card-general-price-difference ${
                price > referencePrice ? "background-green" : "background-red"
              }`}
            >
              {price && (
                <FontAwesomeIcon
                  icon={price > referencePrice ? faArrowUp : faArrowDown}
                  className="card-general-price-icon"
                />
              )}
              <span className="card-general-difference-value">
                {price && `$${(price - referencePrice).toFixed(3)}`}
              </span>
            </div>
          </div>

          <div className="card-general-locked-price">
            <span>Locked Price: </span>
            <span>{referencePrice}</span>
          </div>

          <div className="card-general-prize-section">
            <span>Prize Pool: </span>
            <span> 531.35 ETH</span>
          </div>
        </div>

        <div className="card-general-arrow card-general-arrow-down">
          <span>DOWN</span>
        </div>
      </div>
    </div>
  );
};

export default CardGeneral;
