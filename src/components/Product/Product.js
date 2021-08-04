import React, { useEffect, useState } from "react";
import { useCart } from "../../cart-context/CartProvider";
import ProductCard from "./ProductCard";
import { BsFilterRight } from "react-icons/bs";
import Nav from "../../Nav/Nav";
import SideBar from "./../../Nav/SideBar";
import LoaderPage from "./../LoaderPage/LoaderPage";

function Product() {
  const { state, dispatch } = useCart();
  const { products, finalProducts, category } = state;
  const isInCart = (productName) =>
    state.cart.find(({ item }) => item.name === productName);

  const isInWishlist = (productName) => {
    let wishlistId;
    state.wishlist.find((cartItem) => {
      if (cartItem.name === productName) {
        wishlistId = cartItem._id;
      }
      return undefined;
    });
    return wishlistId;
  };

  const [viewFilter, setFilter] = useState(false);
  useEffect(() => {
    if (category === "Phone") {
      const filteredProducts = products.filter(
        (product) => product.category === "Phone"
      );
      dispatch({ type: "SET_FINALPRODUCTS", payload: filteredProducts });
      dispatch({ type: "SET_CATEGORYPRODUCTS", payload: filteredProducts });
    } else if (category === "Earphone") {
      const filteredProducts = products.filter(
        (product) => product.category === "Earphone"
      );
      dispatch({ type: "SET_CATEGORYPRODUCTS", payload: filteredProducts });
      dispatch({ type: "SET_FINALPRODUCTS", payload: filteredProducts });
    } else if (category === "TV") {
      const filteredProducts = products.filter(
        (product) => product.category === "TV"
      );
      dispatch({ type: "SET_CATEGORYPRODUCTS", payload: filteredProducts });
      dispatch({ type: "SET_FINALPRODUCTS", payload: filteredProducts });
    } else if (category === "Watch") {
      const filteredProducts = products.filter(
        (product) => product.category === "Watch"
      );
      dispatch({ type: "SET_CATEGORYPRODUCTS", payload: filteredProducts });
      dispatch({ type: "SET_FINALPRODUCTS", payload: filteredProducts });
    } else if (category === "Storage") {
      const filteredProducts = products.filter(
        (product) => product.category === "Storage"
      );
      dispatch({ type: "SET_CATEGORYPRODUCTS", payload: filteredProducts });
      dispatch({ type: "SET_FINALPRODUCTS", payload: filteredProducts });
    } else if (category === "All") {
      dispatch({ type: "SET_CATEGORYPRODUCTS", payload: products });
      dispatch({ type: "SET_FINALPRODUCTS", payload: products });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Nav />
      {state.loading && <LoaderPage />}
      <span
        className="filter mr-1 "
        onClick={() => {
          setFilter(!viewFilter);
        }}
      >
        <BsFilterRight size={20} />
        Filter
      </span>
      {
        <div style={viewFilter ? { display: "block" } : { display: "none" }}>
          <SideBar />
        </div>
      }
      <h1 className="text-center mb-2">{category}</h1>
      <div className="products">
        {finalProducts.map((item) => {
          isInCart(item.name);
          return (
            <ProductCard
              key={item._id}
              productId={item._id}
              item={item}
              title={item.name}
              img={item.img}
              price={item.price}
              quantity={item.quantity}
              isInCart={isInCart(item.name)}
              isInWishlist={isInWishlist(item.name)}
            />
          );
        })}
      </div>
    </>
  );
}

export default Product;
