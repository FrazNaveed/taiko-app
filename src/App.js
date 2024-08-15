import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import InfoBar from "./components/InfoBar/InfoBar";
import CardWrapper from "./components/Cards/CardWrapper";
import { TimerProvider } from "./TimerContext";
import { PriceProvider } from "./PriceContext";

import "./App.css";

function App() {
  const [websocketMessage, setWebsocketMessage] = useState(null);

  useEffect(() => {
    const { ethereum } = window;

    if (ethereum) {
      const handleAccountsChanged = (accounts) => {
        if (accounts.length > 0) {
          const newAccount = accounts[0];
          localStorage.setItem("walletAddress", newAccount);
          window.location.reload();
        } else {
          localStorage.removeItem("walletAddress");
        }
      };
      ethereum.on("accountsChanged", handleAccountsChanged);
      return () => {
        ethereum.removeListener("accountsChanged", handleAccountsChanged);
      };
    }
  }, []);

  return (
    <TimerProvider>
      <PriceProvider>
        <div className="App">
          <div className="grid"></div>
          <Navbar />
          <div className="main-body-content">
            <InfoBar key={websocketMessage?.message} />
            <CardWrapper key={websocketMessage?.message} />
          </div>
        </div>
      </PriceProvider>
    </TimerProvider>
  );
}

export default App;
