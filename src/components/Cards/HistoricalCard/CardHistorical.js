import React, { useState, useEffect } from "react";
import axios from "axios";
import { ethers } from "ethers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import "./CardHistorical.css";

const CardHistorical = () => {
  const [closedPrice, setClosePrice] = useState(0);
  const [startPrice, setStartPrice] = useState(0);
  const [prizePool, setPrizePool] = useState(0);

  useEffect(() => {
    const fetchLiveCardData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_URL}/getHistoricalData`
        );
        const _startPrice = response.data.startPrice;
        const _closePrice = response.data.closePrice;
        const poolRewardInWei = ethers.BigNumber.from(
          response.data.totalPoolReward
        );

        const startPrice = parseFloat(
          (_startPrice * Math.pow(10, -7)).toFixed(3)
        );
        const closePrice = parseFloat(
          (_closePrice * Math.pow(10, -7)).toFixed(3)
        );
        const poolRewardInEth = parseFloat(
          ethers.utils.formatEther(poolRewardInWei)
        ).toFixed(4);

        setStartPrice(195);
        setClosePrice(192);
        setPrizePool(poolRewardInEth);
      } catch (error) {
        console.error("Error fetching live card data:", error);
      }
    };

    fetchLiveCardData();
  }, []);

  return (
    <div className="card disabled-card">
      <div className="card-heading">
        <span>Expired</span>
      </div>
      <div className="card-section">
        <div className={`multiplier-arrow-up-historical background-green`}>
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
              ${1.95687}
            </span>

            <div
              className={`card-expired-round-difference ${
                startPrice > closedPrice ? "background-green" : "background-red"
              }`}
            >
              <FontAwesomeIcon
                icon={startPrice > closedPrice ? faArrowUp : faArrowDown}
              />
              <span>${0.3}</span>
            </div>
          </div>

          <div className="card_body_locked-price">
            <span>Locked Price: </span>
            <span> ${1.98541}</span>
          </div>

          <div className="card_body_prize-section">
            <span>Prize Pool: </span>
            <span> {0.15} ETH</span>
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
