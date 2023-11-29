import React from "react";
import Stock from "./Stock";

function PortfolioContainer({boughtStocks, handleClick}) {

  return (
    <div>
      <h2>My Portfolio</h2>
    {boughtStocks.map(stock => <Stock key={stock.id} stock={stock} handleClick={handleClick} />)}
    </div>
  );
}

export default PortfolioContainer;
