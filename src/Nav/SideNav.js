import React, { useState } from "react";
import { useCart } from "../cart-context/CartProvider";
import { brands, getProducts, useSortByBrand } from "./../components/Product/helper";
import "./nav.css";

function SideNav() {
  const { state, dispatch } = useCart();
  const { products, stock, fastDelivery } = state;
  const [brand, setBrand, handleBrandChange] = useSortByBrand();
  const [sort, setSort] = useState({
    hightolow: false,
    lowtohigh: false,
  });
  const sortByPrice = (e) => {
    if (e.target.value === "highToLow") {
      setSort({
        hightolow: true,
        lowtohigh: false,
      });
      dispatch({ type: "SORT_DES" });
    }
    if (e.target.value === "lowToHigh") {
      setSort({
        hightolow: false,
        lowtohigh: true,
      });
      dispatch({ type: "SORT_ASC" });
    }
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
    setSort({
      hightolow: false,
      lowtohigh: false,
    });
    dispatch({ type: "SET_FINALPRODUCTS", payload: products });
    dispatch({ type: "FASTDELIVERY_OFF" });
    dispatch({ type: "INSTOCK_ON" });
    setBrand([]);
  };



  return (
    <form className="sidenav pl-2 pr-2 mr-1">
      <h2 className="mb-1 mt-1">Filters</h2>
      <div className="sidenav-item mt-2 mb-2">
        <h1 className="text-md mb-1">Sort By</h1>
        <input
          type="radio"
          id="highToLow"
          name="sort"
          defaultChecked={sort.hightolow}
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
          defaultChecked={sort.lowtohigh}
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
          defaultChecked={stock}
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
          defaultChecked={fastDelivery}
          className="mb-1"
        />
        <label htmlFor="fastDelivery" className="text-sm ml-1">
          Fast Delivery
        </label>
      </div>
      <div className="sidenav-item mt-2">
        <h1 className="text-md mb-1">Brands</h1>
        {brands.map(({ id, name }) => (
          <div key={id}>
            <input
              type="checkbox"
              id={id}
              value={name}
              onChange={handleBrandChange}
              defaultChecked={brand.includes(name)}
              className="mb-1"
            />
            <label htmlFor={id} className="text-sm ml-1">
              {name}
            </label>
            <br />
          </div>
        ))}
      </div>
      <button className="clear-btn" type="reset" onClick={clearAll}>
        Clear
      </button>
    </form>
  );
}

export default SideNav;
