import React, { useState, useEffect } from "react";
import axios from "axios";
import { ethers } from "ethers";
import { contractAddress, abi } from "../../../contractConfig/contractConfig";
import { ClipLoader } from "react-spinners";

import "./CardNext.css";

const minBet = 0.0001;

const CardNext = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [betType, setBetType] = useState("");
  const [betAmount, setBetAmount] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [error, setError] = useState("");
  const [prizePool, setPrizePool] = useState(0);
  const [loading, setLoading] = useState(false);
  const [txStatus, setTxStatus] = useState(null);
  const [txHash, setTxHash] = useState("");
  const [betted, setBetted] = useState(false);
  const [minBet, setMinBet] = useState(0);

  useEffect(() => {
    const checkWalletConnection = () => {
      const storedAddress = localStorage.getItem("walletAddress");
      if (storedAddress) {
        setWalletAddress(storedAddress);
        fetchBettedStatus(storedAddress);
      }
    };
    checkWalletConnection();
    fetchPrizePool();
    fetchMinBet();
  }, []);

  const fetchPrizePool = async () => {
    try {
      const config = {
        headers: {
          "ngrok-skip-browser-warning": "true",
          "Content-Type": "application/json",
        },
      };
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/getPrizePool`,
        config
      );
      const prizePoolInWei = response.data.prizePool;
      const prizePoolInEth = ethers.utils.formatEther(prizePoolInWei);
      const formattedPrizePool = Number(prizePoolInEth);
      setPrizePool(formattedPrizePool);
    } catch (error) {
      console.error("Error fetching prize pool data:", error);
    }
  };

  const fetchBettedStatus = async (address) => {
    try {
      const config = {
        headers: {
          "ngrok-skip-browser-warning": "true",
          "Content-Type": "application/json",
        },
      };
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/getAlreadyBetted?address=${address}`,
        config
      );
      setBetted(response.data.betted);
    } catch (error) {
      console.error("Error fetching betted status:", error);
    }
  };

  const fetchMinBet = async () => {
    try {
      const config = {
        headers: {
          "ngrok-skip-browser-warning": "true",
          "Content-Type": "application/json",
        },
      };
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/getMinimumBetAmount`,
        config
      );
      const minBetInWei = ethers.BigNumber.from(response.data.minBet);
      const minBetInEth = ethers.utils.formatEther(minBetInWei);
      setMinBet(minBetInEth);
    } catch (error) {
      console.error("Error fetching minimum bet data:", error);
    }
  };
  const openModal = (type) => {
    setBetType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setBetType("");
    setBetAmount("");
    setError("");
    setLoading(false);
    setTxStatus(null);
    setTxHash("");
    window.location.reload();
  };

  const handleBetAmountChange = (event) => {
    const value = event.target.value;
    setBetAmount(value);
    if (value === "" || parseFloat(value) >= minBet) {
      setError("");
    } else {
      setError(`Amount must be at least ${minBet}`);
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
        fetchBettedStatus(account); // Fetch betted status when wallet address is connected
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      alert("MetaMask not detected. Please install MetaMask.");
    }
  };

  const placeBet = async (betFunction) => {
    if (parseFloat(betAmount) >= minBet) {
      try {
        setLoading(true);
        const { ethereum } = window;
        if (ethereum) {
          const config = {
            headers: {
              "ngrok-skip-browser-warning": "true",
              "Content-Type": "application/json",
            },
          };
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(contractAddress, abi, signer);
          const epochResponse = await axios.get(
            `${process.env.REACT_APP_URL}/getCurrentEpochAndTime`,
            config
          );

          const tx = await betFunction(contract, epochResponse);
          if (tx) {
            await tx.wait();
            setTxStatus("success");
            setTxHash(tx.hash);
          } else {
            throw new Error("Transaction object is undefined.");
          }
        }
      } catch (err) {
        console.error("Error placing bet:", err);
        setTxStatus("failure");
      } finally {
        setLoading(false);
      }
    } else {
      setError(`Amount must be at least ${minBet}`);
    }
  };

  const betBull = () =>
    placeBet((contract, epochResponse) => {
      contract.betBull(epochResponse.data.currentEpoch + 1, {
        value: ethers.utils.parseEther(betAmount),
      });
    });

  const betBear = () =>
    placeBet((contract, epochResponse) =>
      contract.betBear(epochResponse.data.currentEpoch + 1, {
        value: ethers.utils.parseEther(betAmount),
      })
    );

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
            {betted ? (
              <p>
                You can place 1 bet per round. Please wait for the timer to end
                to bet on next round.
              </p>
            ) : (
              <>
                <p>Enter your bet amount:</p>
                <input
                  type="number"
                  placeholder={`Min amount: ${minBet}`}
                  value={betAmount}
                  onChange={handleBetAmountChange}
                  step={minBet}
                  disabled={!walletAddress}
                />
                {error && <p className="error-message">{error}</p>}{" "}
                {walletAddress ? (
                  <button
                    onClick={betType === "UP" ? betBull : betBear}
                    disabled={loading}
                  >
                    {loading ? (
                      <ClipLoader color="pink" size={20} />
                    ) : (
                      "Place Bet"
                    )}
                  </button>
                ) : (
                  <button onClick={connectWallet}>Connect Wallet</button>
                )}
                {txStatus === "success" && (
                  <p className="success-message">
                    Transaction successful! See on Explorer:{" "}
                    <a
                      href={`https://blockscoutapi.hekla.taiko.xyz/tx/${txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="custom-link"
                    >
                      here
                    </a>
                  </p>
                )}
                {txStatus === "failure" && (
                  <p className="error-message">Transaction failed.</p>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CardNext;
