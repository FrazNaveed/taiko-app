import React, { useEffect, useState } from "react";

const WebSocketComponent = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Connect to the WebSocket server
    const ws = new WebSocket(`${process.env.REACT_APP_SOCKET_URL}`);

    // Handle incoming messages
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Message received:", data.message); // Debug log
      setMessage(data.message);
    };

    // Handle errors
    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Clean up WebSocket connection on component unmount
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <h2 style={{ color: "white" }}>WebSocket Message</h2>
      <p style={{ color: "white" }}>Time: {message}</p>
    </div>
  );
};

export default WebSocketComponent;
