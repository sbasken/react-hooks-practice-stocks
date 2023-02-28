import React from "react";

function Stock({ stock, handleClick }) {
  const { name, price , ticker} = stock

  return (
      <div className="card" onClick={()=>handleClick(stock)}>
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{ticker}: {price}</p>
        </div>
      </div>
  );
}
export default Stock;
