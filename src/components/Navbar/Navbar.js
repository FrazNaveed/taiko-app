// Navbar.js
import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="/assets/taiko.svg" alt="Logo" className="logo-img" />
        <span className="logo-text">
          taiko <span className="small-text">(Hekla)</span>
        </span>
      </div>
      <h1 className="navbar-heading">Prediction Game</h1>
      <button className="connect-wallet">Connect Wallet</button>
    </nav>
  );
};

export default Navbar;
