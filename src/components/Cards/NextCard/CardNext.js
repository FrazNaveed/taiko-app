import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import "./CardNext.css";

const CardNext = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [betType, setBetType] = useState("");

  const openModal = (type) => {
    setBetType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setBetType("");
  };

  const betBull = () => {
    // Logic for betting on UP
    console.log("Betting on UP");
    closeModal();
  };

  const betBear = () => {
    // Logic for betting on DOWN
    console.log("Betting on DOWN");
    closeModal();
  };

  return (
    <div className="card">
      <div className="card-heading">
        <span>Next</span>
      </div>
      <div className="card-section">
        <div className="card-next-multiplier-arrow-up">
          <span>UP</span>
        </div>

        <div className="card-body">
          <div className="card_body_prize-section">
            <span>Prize Pool: </span>
            <span> 531.35 ETH</span>
          </div>

          <div className="card_body_invest-btns">
            <span className="invest-btn-up" onClick={() => openModal("UP")}>
              Enter UP
            </span>
            <span className="invest-btn-down" onClick={() => openModal("DOWN")}>
              Enter DOWN
            </span>
          </div>
        </div>
        <div className="card-next-multiplier-arrow-down">
          <span>DOWN</span>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>
              &times;
            </span>
            <h2>Bet on {betType}</h2>
            <p>Enter your bet amount:</p>
            <input type="number" placeholder="Bet amount" />
            <button onClick={betType === "UP" ? betBull : betBear}>
              Place Bet
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardNext;
