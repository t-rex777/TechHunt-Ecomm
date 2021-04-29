import React from "react";
import { useCart } from "../cart-context/CartContext";
import { getProducts } from "./Product/helper";

function SideBar() {
  const { state, dispatch } = useCart();
  const { products, stock, delivery } = state;
  const sortByPrice = (e) => {
    e.target.value === "highToLow" && dispatch({ type: "SORT_DES" });
    e.target.value === "lowToHigh" && dispatch({ type: "SORT_ASC" });
  };

  const filterProducts = (e) => {
    e.target.value === "outOfStock" && dispatch({ type: "FILTER_STOCK" });
    e.target.value === "fastDelivery" && dispatch({ type: "FILTER_DELIVERY" });
  };
  const clearAll = async () => {
    await getProducts()
      .then((data) => dispatch({ type: "PRODUCT", payload: data }))
      .catch((err) => console.log(err));
    dispatch({ type: "FINALPRODUCT", payload: products });
    dispatch({ type: "FASTDELIVERY_OFF" });
    dispatch({ type: "INSTOCK_ON" });
  };

  return (
    <form className="sidebar p-1">
      <div className="mr-4">
        <h1>Sort By</h1>
        <input
          type="radio"
          id="highToLow"
          name="sort"
          value="highToLow"
          onClick={sortByPrice}
        />
        <label htmlFor="highToLow" className="text-md ml-1">
          Price - High to low
        </label>
        <br />
        <input
          type="radio"
          id="lowToHigh"
          name="sort"
          value="lowToHigh"
          onClick={sortByPrice}
        />
        <label htmlFor="lowToHigh" className="text-md ml-1">
          Price - Low to high
        </label>
      </div>
      <div className="mr-4">
        <h1>Filter</h1>
        <input
          type="checkbox"
          id="outOfStock"
          value="outOfStock"
          onChange={filterProducts}
          checked={stock}
        />
        <label htmlFor="outOfStock" className="text-md ml-1">
          Include Out Of Stock{" "}
        </label>
        <br />
        <input
          type="checkbox"
          id="fastDelivery"
          value="fastDelivery"
          onChange={filterProducts}
          checked={delivery}
        />
        <label htmlFor="fastDelivery" className="text-md ml-1">
          Fast Delivery
        </label>
      </div>
      <button
        className="btn btn-secondary clear-btn"
        type="reset"
        onClick={clearAll}
      >
        Clear
      </button>
    </form>
  );
}

export default SideBar;
