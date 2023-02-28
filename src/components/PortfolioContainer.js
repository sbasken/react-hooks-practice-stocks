import React from "react";
import Stock from "./Stock";

function PortfolioContainer({ myStocks, handleClick }) {

  return (
    <div>
      <h2>My Portfolio</h2>
      {myStocks.map(stock => <Stock stock={stock} key={stock.id} handleClick={handleClick}/>)}
    </div>
  );
}

export default PortfolioContainer;
