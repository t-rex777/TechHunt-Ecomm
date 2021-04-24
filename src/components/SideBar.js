import React from "react";

function SideBar() {
  return (
    <>
      <div className="sort-by">
        <h1>Sort By :</h1>
        <h3>Price - High to low</h3>
        <h3>Price - Low to high</h3>
      </div>
      <div>
        <h1>Filter</h1>
        <h3>Include out of stock</h3>
        <h3>Fast delivery</h3>
      </div>
    </>
  );
}

export default SideBar;
