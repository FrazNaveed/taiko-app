import React from "react";
import CardHistorical from "./HistoricalCard/CardHistorical";
import CardGeneral from "./GeneralCard/CardGeneral";
import CardNext from "./NextCard/CardNext";
import CardFuture from "./FutureCard/CardFuture";
import "./CardWrapper.css";

const CardWrapper = () => {
  return (
    <div className="cards-wrapper">
      <CardHistorical />
      <CardHistorical />
      <CardGeneral />
      <CardNext />
      <CardFuture />
    </div>
  );
};

export default CardWrapper;
