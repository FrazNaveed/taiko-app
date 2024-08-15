import React, { useState, useEffect } from "react";
import axios from "axios";
import { ethers } from "ethers";
import { contractAddress, abi } from "../../../contractConfig/contractConfig";

import "./CardNext.css";

const MIN_BET_AMOUNT = 0.0001;

const CardNext = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [betType, setBetType] = useState("");
  const [betAmount, setBetAmount] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [error, setError] = useState("");
  const [prizePool, setPrizePool] = useState(0);

  // Check if wallet is connected on component mount
  useEffect(() => {
    const checkWalletConnection = () => {
      const storedAddress = localStorage.getItem("walletAddress");
      if (storedAddress) {
        setWalletAddress(storedAddress);
      }
    };
    checkWalletConnection();
    fetchPrizePool();
  }, []);

  const fetchPrizePool = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/prizePool`
      );
      const prizePoolInWei = response.data.prizePool;
      const prizePoolInEth = ethers.utils.formatEther(prizePoolInWei);
      const formattedPrizePool = Number(prizePoolInEth);
      setPrizePool(formattedPrizePool);
    } catch (error) {
      console.error("Error fetching prize pool data:", error);
    }
  };

  const openModal = (type) => {
    setBetType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setBetType("");
    setBetAmount(""); // Clear bet amount when modal closes
    setError(""); // Clear error message when modal closes
  };

  const handleBetAmountChange = (event) => {
    const value = event.target.value;
    setBetAmount(value);
    // Clear error if the input is valid or empty
    if (value === "" || parseFloat(value) >= MIN_BET_AMOUNT) {
      setError("");
    }
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
    if (
      parseFloat(betAmount) === 0 ||
      parseFloat(betAmount) >= MIN_BET_AMOUNT
    ) {
      try {
        const { ethereum } = window;
        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(contractAddress, abi, signer);
          const epochResponse = await axios.get(
            `${process.env.REACT_APP_URL}/currentEpoch`
          );
          const tx = await contract.betBull(
            parseInt(epochResponse.data.epoch) + 1,
            {
              value: ethers.utils.parseEther(betAmount),
            }
          );
          await tx.wait();
          // await axios.post(`${process.env.REACT_APP_URL}/dummyBets1`);
        }
      } catch (err) {
        console.error("Error placing bet:", err);
      }
      closeModal();
    } else {
      setError(`Amount must be at least ${MIN_BET_AMOUNT}`);
    }
  };

  const betBear = async () => {
    if (
      parseFloat(betAmount) === 0 ||
      parseFloat(betAmount) >= MIN_BET_AMOUNT
    ) {
      try {
        const { ethereum } = window;
        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(contractAddress, abi, signer);
          const epochResponse = await axios.get(
            `${process.env.REACT_APP_URL}/currentEpoch`
          );

          const tx = await contract.betBear(
            parseInt(epochResponse.data.epoch) + 1,
            {
              value: ethers.utils.parseEther(betAmount),
            }
          );
          await tx.wait();
          //  await axios.post(`${process.env.REACT_APP_URL}/dummyBets2`);
        }
      } catch (err) {
        console.error("Error placing bet:", err);
      }
      closeModal();
    } else {
      setError(`Amount must be at least ${MIN_BET_AMOUNT}`);
    }
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

        <div className="card-body-next">
          <div className="card_body_prize-section">
            <span>Prize Pool: </span>
            <span> {prizePool} ETH</span>
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
              placeholder={`Min amount: ${MIN_BET_AMOUNT}`}
              value={betAmount}
              onChange={handleBetAmountChange}
              disabled={!walletAddress} // Disable input if wallet not connected
            />
            {error && <p className="error-message">{error}</p>}
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
