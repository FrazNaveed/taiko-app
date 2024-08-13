import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [secondsRemaining, setSecondsRemaining] = useState(0);

  useEffect(() => {
    const fetchTimeRemaining = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_URL}/timeRemaining`
        );
        setSecondsRemaining(response.data.timeLeft);
      } catch (error) {
        console.error("Error fetching time remaining", error);
      }
    };

    fetchTimeRemaining(); // Fetch the time remaining once on mount

    const interval = setInterval(() => {
      setSecondsRemaining((prev) => Math.max(prev - 1, 0)); // Ensure seconds do not go below 0
    }, 1000);

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  return (
    <TimerContext.Provider value={{ secondsRemaining }}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => useContext(TimerContext);
