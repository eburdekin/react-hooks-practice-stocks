import React, { useState, useEffect } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

const stockAPI = 'http://localhost:3001/stocks'

function MainContainer() {

  const [stocks, setStocks] = useState([])
  const [filter, setFilter] = useState('All')

  const [sortBy, setSortBy] = useState()

  //pull in stock's type
  function handleFilterChange(value) {
    setFilter(value)
  }

  const filteredStocks = filter === 'All'
    ? [...stocks]
    : stocks.filter(stock => {
      return stock.type === filter
    })

  const boughtStocks = stocks.filter(stock => stock.bought)

  if(sortBy){
    if(sortBy === "Alphabetically"){
      filteredStocks.sort((a,b) => a.name.localeCompare(b.name))
      boughtStocks.sort((a,b) => a.name.localeCompare(b.name))
    } else {
      filteredStocks.sort((a,b) => a.price - b.price)
      boughtStocks.sort((a,b) => a.price - b.price)
    }
  }
  

  //use the stock's type, set as "filter", to filter through "stocks" state
  

  useEffect(() => {
    fetch(stockAPI)
      .then(r => r.json())
      .then(setStocks)
  }, [])

  function handleClick(clickedStock) {
    setStocks(stocks.map(stock => {
      return (clickedStock.id !== stock.id) ? stock
        : ({ ...stock, bought: !stock.bought })
    }
    ))
  }

  //use the FILTERED array for displaying. not changing "stocks" itself, just filtering through it before passing that data to components to display

  return (
    <div>
      <SearchBar handleFilterChange={handleFilterChange} sortBy={sortBy} setSortBy={setSortBy}/>
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={filteredStocks} handleClick={handleClick} />
        </div>
        <div className="col-4">
          <PortfolioContainer boughtStocks={boughtStocks} handleClick={handleClick} />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
