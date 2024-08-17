import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [timeRemaining, setTimeRemaining] = useState(0); // Time remaining in milliseconds

  const fetchTimeRemaining = async () => {
    try {
      const config = {
        headers: {
          "ngrok-skip-browser-warning": "true",
          "Content-Type": "application/json",
        },
      };
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/getCurrentEpochAndTime`,
        config
      );
      const timeInMilliseconds = Number(response.data.timeRemaining);
      if (isNaN(timeInMilliseconds) || timeInMilliseconds < 0) {
        throw new Error("Invalid data received from backend");
      }
      setTimeRemaining(timeInMilliseconds);
    } catch (error) {
      console.error("Error fetching time remaining", error);
    }
  };

  useEffect(() => {
    fetchTimeRemaining(); // Initial fetch

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1000) {
          fetchTimeRemaining();
          window.alert(
            "Timer expired. New round started. Reload the page before betting"
          );
          return 0;
        }
        return Math.max(prev - 1000, 0);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (milliseconds) => {
    if (isNaN(milliseconds) || milliseconds < 0) {
      return "0m 0s"; // Return a default value if there's an error
    }

    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes}m ${seconds}s`;
  };

  return (
    <TimerContext.Provider value={{ timeRemaining, formatTime }}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => useContext(TimerContext);
