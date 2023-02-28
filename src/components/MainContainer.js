import React, { useState, useEffect } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [ stocks, setStocks ] = useState([])
  const [ myStocks, setMyStocks ] = useState([])
  const [ selectedCategory, setSelectedCategory ] = useState("All")
  
  const [ sortBy, setSortBy ] = useState('')

  const sortStocks = (e) => {
    setSortBy(e.target.value)
  }

  useEffect(() => {
    if (sortBy === 'Alphabetically') {
      const sortedStocks= sortByName()
      setStocks(sortedStocks)
    } else {
      const sortedStocks = sortByPrice()
      setStocks(sortedStocks)

    }
  }, [ sortBy ])

  const sortByName = () => {
    return [...stocks].sort((a, b) => {
      const nameA = a.name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0
    });
  }

  const sortByPrice = () => {
    return [...stocks].sort((a,b) => {
      return a.price - b.price
    })
  }

  const handleOptionChange = (e) => {
    setSelectedCategory(e.target.value)
  }

  const filteredStocks = (selectedCategory === "All") ? stocks : stocks.filter(stock => stock.type === selectedCategory)

  // const sortedStocks = [...filteredStocks].sorted(sortBy)

  const buyStock = (stock) => {
    if (!myStocks.includes(stock)) {
      const updatedMyStocks = [...myStocks, stock]
      setMyStocks(updatedMyStocks)
    } else {
      alert("You already have it!! Chill.")
    }
  }

  const sellStock = (stock) => {
      const updatedStocks = myStocks.filter(myStock => (myStock.id !== stock.id))
      setMyStocks(updatedStocks)
  }
    

  useEffect(() => {
    fetch("http://localhost:3001/stocks")
      .then(res=>res.json())
      .then(data=>setStocks(data))
  }, [])

  return (
    <div>
      <SearchBar 
        onOptionChange={handleOptionChange} 
        sortStocks={sortStocks}
        sortBy={sortBy}
      />
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={filteredStocks} handleClick={buyStock}/>
        </div>
        <div className="col-4">
          <PortfolioContainer myStocks={myStocks} handleClick={sellStock}/>
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
