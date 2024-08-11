import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import "./CardHistorical.css";

const CardHistorical = () => {
  return (
    <div className="card">
      <div className="card-heading">
        <span>Expired</span>
      </div>
      <div className="card-section">
        <div className="multiplier-arrow-up-historical">
          <span>UP</span>
        </div>
        <div className="card-body">
          <div className="card-body_price-font">
            <span>Closed Price</span>
          </div>

          <div className="card_body_round-result">
            <span className="round-price">$530.987</span>
            <div className="round-difference">
              {" "}
              <FontAwesomeIcon icon={faArrowUp} />
              <span>$-0.917</span>
            </div>
          </div>

          <div className="card_body_locked-price">
            <span>Locked Price: </span>
            <span> $531.35</span>
          </div>

          <div className="card_body_prize-section">
            <span>Prize Pool: </span>
            <span> 531.35 ETH</span>
          </div>
        </div>
        <div className="multiplier-arrow-down-historical">
          <span>DOWN</span>
        </div>
      </div>
    </div>
  );
};

export default CardHistorical;
