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
    const ws = new WebSocket(`${process.env.REACT_APP_SOCKET_URL}`);
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setWebsocketMessage(data.message);
    };
    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
    return () => {
      ws.close();
    };
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
