import React from "react";
import Navbar from "./components/Navbar/Navbar";
import InfoBar from "./components/InfoBar/InfoBar";
import Card from "./components/Cards/Card";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="grid"></div>
      <Navbar />
      <InfoBar />
      <Card />
    </div>
  );
}

export default App;
