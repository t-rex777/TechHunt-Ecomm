import React from "react";
import { useCart } from "../cart-context/CartProvider";
import { getProducts } from "./../components/Product/helper";
import "./nav.css";
function FilterModal({ setFilter }) {
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
    try {
      const data = await getProducts();
      dispatch({ type: "SET_PRODUCTS", payload: data });
    } catch (error) {
      console.log(error);
    }
    dispatch({ type: "SET_FINALPRODUCTS", payload: products });
    dispatch({ type: "FASTDELIVERY_OFF" });
    dispatch({ type: "INSTOCK_ON" });
    setFilter(false);
  };
  return (
    <form className="filter-modal">
      <h1 className="mb-1 mt-2 text-center">Filters</h1>
      <div className="sidenav-item mt-2 mb-2">
        <h1 className="text-md mb-1">Sort By</h1>
        <input
          type="radio"
          id="highToLow"
          name="sort"
          value="highToLow"
          onClick={sortByPrice}
          className="mb-1"
        />
        <label htmlFor="highToLow" className="text-sm ml-1">
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
        <label htmlFor="lowToHigh" className="text-sm ml-1">
          Price - Low to high
        </label>
      </div>

      <div className="sidenav-item">
        <h1 className="text-md mb-1">Filter</h1>
        <input
          type="checkbox"
          id="outOfStock"
          value="outOfStock"
          onChange={filterProducts}
          checked={stock}
          className="mb-1"
        />
        <label htmlFor="outOfStock" className="text-sm ml-1">
          Include Out Of Stock{" "}
        </label>
        <br />
        <input
          type="checkbox"
          id="fastDelivery"
          value="fastDelivery"
          onChange={filterProducts}
          checked={delivery}
          className="mb-1"
        />
        <label htmlFor="fastDelivery" className="text-sm ml-1">
          Fast Delivery
        </label>
      </div>
      <div>{/* <h1 className="text-md">Category</h1> */}</div>
      <button
        className="clear-btn mt-3"
        type="reset"
        onClick={() => setFilter(false)}
      >
        Apply
      </button>
      <button className="clear-btn mt-1" type="reset" onClick={clearAll}>
        Clear
      </button>
    </form>
  );
}

export default FilterModal;
