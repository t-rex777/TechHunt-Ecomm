import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../../cart-context/CartProvider";
import Nav from "./../../Nav/Nav";
import { getProductById } from "./helper";
import LoaderPage from "./../LoaderPage/LoaderPage";
import { addCartItem, getCartItems } from "../Cart/helper";
import "./product.css";

function ProductPage() {
  const { productId } = useParams();
  const { state, dispatch } = useCart();
  const {
    selectedProduct: { _id, img, name, price, delivery, stock, details },
  } = state;

  useEffect(() => {
    (async () => {
      dispatch({ type: "LOADING", payload: true });
      const productData = await getProductById(productId);
      dispatch({ type: "SET_SELECTED_PRODUCT", payload: productData });
      dispatch({ type: "LOADING", payload: false });
    })();
  }, [dispatch, productId]);

  const isInCart = () => state.cart.find(({ item }) => item.name === name);

  const addProductToCart = async () => {
    dispatch({ type: "LOADING", payload: true });
    await addCartItem(_id);
    try {
      const cartData = await getCartItems();
      dispatch({ type: "SET_CART", payload: cartData });
      dispatch({ type: "LOADING", payload: false });
    } catch (error) {
      console.log(error);
      dispatch({ type: "LOADING", payload: false });
    }
  };
  const cartButton = () => {
    if (isInCart() === undefined) {
      return (
        <button
          className={
            stock === "In stock" ? `card-btn btn-secondary` : `card-btn`
          }
          style={{ maxWidth: "200px" }}
          onClick={addProductToCart}
          disabled={stock === "In stock" ? false : true}
        >
          Add to cart
        </button>
      );
    }
    return (
      <Link to="/cart">
        <button
          style={{ maxWidth: "200px" }}
          disabled={stock === "In stock" ? false : true}
          className={
            stock === "In stock" ? `card-btn btn-secondary` : `card-btn`
          }
        >
          Go to cart
        </button>
      </Link>
    );
  };
  return (
    <div>
      {state.loading && <LoaderPage />}
      <Nav />
      <div className="wrapper">
        <div className="product-image">
          <img src={img} alt="product" />
        </div>
        <div className="product-data">
          <h1 className="text-md">{name}</h1>
          <p className="text-s">
            Price : <span className="text-danger">₹{price}</span>
          </p>
          <p>
            Delivery : <span className="text-primary">{delivery} </span>
          </p>
          <p className="text-gray text-bold">{stock}</p>
          {cartButton()}
          <h3 className="mt-3">More about this product :</h3>
          <ul className="product-details">
            {details && details.map((data, i) => <li key={i}>{data}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
