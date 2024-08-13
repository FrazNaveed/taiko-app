import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const PriceContext = createContext();

export const usePrice = () => useContext(PriceContext);

export const PriceProvider = ({ children }) => {
  const [price, setPrice] = useState(null);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await axios.get(
          "https://hermes.pyth.network/v2/updates/price/latest?ids%5B%5D=0xd878b9766566a87675421e9b11992c1f2ca2438d5b7d841cb147308e1bd6bb99"
        );
        const priceData = response.data.parsed[0].price;
        const priceValue = Number(priceData.price);
        const expoValue = Number(priceData.expo);

        const adjustedPrice = priceValue * Math.pow(10, expoValue);
        setPrice(adjustedPrice);
      } catch (error) {
        console.error("Error fetching the price", error);
      }
    };

    fetchPrice();
    const intervalId = setInterval(fetchPrice, 200); // Fetch price every 0.2 seconds

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

  return (
    <PriceContext.Provider value={price}>{children}</PriceContext.Provider>
  );
};
