// Navbar.js
import React, { useEffect, useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [networkError, setNetworkError] = useState(false);

  // Updated network configuration
  const NETWORK_CHAIN_ID = "0x28c61"; // Hexadecimal for 167009
  const NETWORK_NAME = "Taiko Hekla L2";
  const NETWORK_RPC_URL = "https://taiko-hekla.blockpi.network/v1/rpc/public";
  const NETWORK_NATIVE_CURRENCY = {
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18,
  };
  const NETWORK_BLOCK_EXPLORER_URL = "https://blockscoutapi.hekla.taiko.xyz";

  useEffect(() => {
    const initializeWallet = async () => {
      const storedAddress = localStorage.getItem("walletAddress");
      if (storedAddress) {
        setWalletAddress(storedAddress);
        await checkNetwork();
      }
    };
    initializeWallet();
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const account = accounts[0];
        localStorage.setItem("walletAddress", account);
        setWalletAddress(account);
        await checkNetwork();
        window.location.reload();
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      alert("MetaMask not detected. Please install MetaMask.");
    }
  };

  const checkNetwork = async () => {
    try {
      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      if (chainId !== NETWORK_CHAIN_ID) {
        await switchNetwork();
      }
    } catch (error) {
      console.error("Error checking network:", error);
    }
  };

  const switchNetwork = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: NETWORK_CHAIN_ID }],
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        // Chain not added
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: NETWORK_CHAIN_ID,
                chainName: NETWORK_NAME,
                rpcUrls: [NETWORK_RPC_URL],
                nativeCurrency: NETWORK_NATIVE_CURRENCY,
                blockExplorerUrls: [NETWORK_BLOCK_EXPLORER_URL],
              },
            ],
          });
        } catch (addError) {
          console.error("Error adding network:", addError);
        }
      } else {
        console.error("Error switching network:", switchError);
      }
    }
  };

  const displayAddress = () => {
    if (walletAddress) {
      return `${walletAddress.substring(0, 6)}...${walletAddress.substring(
        walletAddress.length - 4
      )}`;
    }
    return "Connect Wallet";
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="/assets/taiko.svg" alt="Logo" className="logo-img" />
        <span className="logo-text">
          taiko <span className="small-text">(Hekla)</span>
        </span>
      </div>
      <h1 className="navbar-heading">Prediction Game</h1>
      <button className="connect-wallet" onClick={connectWallet}>
        {displayAddress()}
      </button>
      {networkError && (
        <p className="error-message">
          Please switch to the Taiko Hekla L2 network.
        </p>
      )}
    </nav>
  );
};

export default Navbar;
