import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import "./CardFuture.css";

const CardFuture = () => {
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
          <span>~00:19</span>
        </div>
        <div className="card-future-multiplier-arrow-down">
          <span>DOWN</span>
        </div>
      </div>
    </div>
  );
};

export default CardFuture;
