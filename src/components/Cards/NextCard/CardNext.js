import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CardNext.css";

const CardNext = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [betType, setBetType] = useState("");
  const [betAmount, setBetAmount] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  // Check if wallet is connected on component mount
  useEffect(() => {
    const checkWalletConnection = () => {
      const storedAddress = localStorage.getItem("walletAddress");
      if (storedAddress) {
        setWalletAddress(storedAddress);
      }
    };
    checkWalletConnection();
  }, []);

  const openModal = (type) => {
    setBetType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setBetType("");
    setBetAmount(""); // Clear bet amount when modal closes
  };

  const handleBetAmountChange = (event) => {
    setBetAmount(event.target.value);
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const account = accounts[0];
        localStorage.setItem("walletAddress", account);
        setWalletAddress(account);
        window.location.reload();
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      alert("MetaMask not detected. Please install MetaMask.");
    }
  };

  const betBull = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_URL}/betBull`, {
        amount: betAmount,
      });
      console.log(res);
    } catch (err) {
      console.error("Error placing bet:", err);
    }
    closeModal();
  };

  const betBear = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_URL}/betBear`, {
        amount: betAmount,
      });
      console.log(res);
    } catch (err) {
      console.error("Error placing bet:", err);
    }
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
            <input
              type="number"
              placeholder="Bet amount"
              value={betAmount}
              onChange={handleBetAmountChange}
              disabled={!walletAddress} // Disable input if wallet not connected
            />
            {walletAddress ? (
              <button onClick={betType === "UP" ? betBull : betBear}>
                Place Bet
              </button>
            ) : (
              <button onClick={connectWallet}>Connect Wallet</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CardNext;
