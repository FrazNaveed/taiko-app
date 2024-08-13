import React from "react";
import Navbar from "./components/Navbar/Navbar";
import InfoBar from "./components/InfoBar/InfoBar";
import CardWrapper from "./components/Cards/CardWrapper";
import { TimerProvider } from "./TimerContext";
import { PriceProvider } from "./PriceContext"; // Import PriceProvider
import "./App.css";

function App() {
  return (
    <TimerProvider>
      <PriceProvider>
        <div className="App">
          <div className="grid"></div>
          <Navbar />
          <div className="main-body-content">
            <InfoBar />
            <CardWrapper />
          </div>
        </div>
      </PriceProvider>
    </TimerProvider>
  );
}

export default App;
