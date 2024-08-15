import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [timeRemaining, setTimeRemaining] = useState(0); // Time remaining in milliseconds

  useEffect(() => {
    const fetchTimeRemaining = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_URL}/timeRemaining`
        );
        const timeInMilliseconds = Number(response.data.timeUntilNextEpoch); // Ensure it's a number
        if (isNaN(timeInMilliseconds) || timeInMilliseconds < 0) {
          throw new Error("Invalid data received from backend");
        }
        setTimeRemaining(timeInMilliseconds);
      } catch (error) {
        console.error("Error fetching time remaining", error);
      }
    };

    fetchTimeRemaining();

    const interval = setInterval(() => {
      setTimeRemaining((prev) => Math.max(prev - 1000, 0)); // Decrement by 1000ms (1 second)
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (milliseconds) => {
    console.log("format time");
    if (isNaN(milliseconds) || milliseconds < 0) {
      return "0m 0s"; // Return a default value if there's an error
    }
    console.log("NDFKLDSJFDSKLJFKL");

    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    console.log("minutes", minutes);

    return `${minutes}m ${seconds}s`;
  };

  return (
    <TimerContext.Provider value={{ timeRemaining, formatTime }}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => useContext(TimerContext);
