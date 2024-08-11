import React from "react";
import Navbar from "./components/Navbar/Navbar";
import InfoBar from "./components/InfoBar/InfoBar";
import CardWrapper from "./components/Cards/CardWrapper";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="grid"></div>
      <Navbar />
      <div className="main-body-content">
        <InfoBar />
        <CardWrapper />
      </div>
    </div>
  );
}

export default App;
