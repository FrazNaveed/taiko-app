import React, { useState, useEffect } from "react";
import axios from "axios";
import { ethers } from "ethers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { usePrice } from "../../../PriceContext"; // Import usePrice
import "./CardGeneral.css";

const CardGeneral = () => {
  const price = usePrice(); // Get price from context

  const [lockedPrice, setLockedPrice] = useState(null);
  const [prizePool, setPrizePool] = useState(null);

  useEffect(() => {
    const fetchLiveCardData = async () => {
      try {
        const response = await axios.get(
          `https://cors-anywhere.herokuapp.com/${process.env.REACT_APP_URL}/getLiveCardData`
        );
        const priceValue = response.data.lockedPrice;
        const expoValue = response.data.decimals;
        const poolRewardInWei = ethers.BigNumber.from(response.data.poolReward);

        const lockedPrice = priceValue * Math.pow(10, expoValue);
        const poolRewardInEth = ethers.utils.formatEther(poolRewardInWei);
        setLockedPrice(parseFloat(lockedPrice));
        setPrizePool(parseFloat(poolRewardInEth));
      } catch (error) {
        console.error("Error fetching live card data:", error);
      }
    };

    fetchLiveCardData();
  }, []);

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
            price > lockedPrice ? "border-green" : "border-red"
          }`}
        >
          <div className="card-general-price-font">
            <span>Closed Price</span>
          </div>

          <div className="card-general-round-result">
            <span
              className={`card-general-round-price ${
                price > lockedPrice ? "price-above" : "price-below"
              }`}
            >
              {price ? `$${price.toFixed(5)}` : "Loading..."}
            </span>
            <div
              className={`card-general-price-difference ${
                price > lockedPrice ? "background-green" : "background-red"
              }`}
            >
              {price && (
                <FontAwesomeIcon
                  icon={price > lockedPrice ? faArrowUp : faArrowDown}
                  className="card-general-price-icon"
                />
              )}
              <span className="card-general-difference-value">
                {price && `$${(price - lockedPrice).toFixed(3)}`}
              </span>
            </div>
          </div>

          <div className="card-general-locked-price">
            <span>Locked Price: </span>
            <span>${lockedPrice}</span>
          </div>

          <div className="card-general-prize-section">
            <span>Prize Pool: </span>
            <span> {prizePool} ETH</span>
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
