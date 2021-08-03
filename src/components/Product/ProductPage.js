import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../../cart-context/CartProvider";
import Nav from "./../../Nav/Nav";
import { getProductById } from "./helper";
import LoaderPage from "./../LoaderPage/LoaderPage";
import { addCartItem, getCartItems } from "../Cart/helper";
import "./product.css";
import { throwToast } from "./../../App";
import {
  addWishlistItem,
  deleteWishlistItem,
  getWishlistItems,
} from "../Wishlist/helper";

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
  const isInWishlist = () => {
    let wishlistId;
    state.wishlist.find((cartItem) => {
      if (cartItem.name === name) {
        wishlistId = cartItem._id;
      }
      return undefined;
    });
    return wishlistId;
  };
  const addProductToWishlist = async () => {
    if (!state.user._id) {
      return throwToast(dispatch, {
        message: "please sign in first!",
        color: "warning",
      });
    }
    dispatch({ type: "LOADING", payload: true });

    await addWishlistItem(_id);
    try {
      const wishlistData = await getWishlistItems();
      dispatch({ type: "SET_WISHLIST", payload: wishlistData });
      dispatch({ type: "LOADING", payload: false });
      throwToast(dispatch, {
        message: "added to wishlist!",
        color: "success",
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: "LOADING", payload: false });
      throwToast(dispatch, {
        message: "didn't add to wishlist!",
        color: "danger",
      });
    }
  };

  const deleteProductFromWishlist = async () => {
    dispatch({ type: "LOADING", payload: true });
    await deleteWishlistItem(isInWishlist());
    try {
      const wishlistItems = await getWishlistItems();
      dispatch({ type: "SET_WISHLIST", payload: wishlistItems });
      dispatch({ type: "LOADING", payload: false });
      throwToast(dispatch, {
        message: "removed from wishlist!",
        color: "success",
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: "LOADING", payload: false });
      throwToast(dispatch, {
        message: "didn't removed from wishlist!",
        color: "danger",
      });
    }
  };
  const addProductToCart = async () => {
    if (!state.user._id) {
      return throwToast(dispatch, {
        message: "please sign in first!",
        color: "warning",
      });
    }
    dispatch({ type: "LOADING", payload: true });
    await addCartItem(_id);
    try {
      const cartData = await getCartItems();
      dispatch({ type: "SET_CART", payload: cartData });
      dispatch({ type: "LOADING", payload: false });
      throwToast(dispatch, {
        message: "added to cart!",
        color: "success",
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: "LOADING", payload: false });
      throwToast(dispatch, {
        message: "didn't add to cart!",
        color: "danger",
      });
    }
  };
  const wishlistButton = () => {
    if (isInWishlist() === undefined) {
      return (
        <button
          className={`card-btn wishlistBtn`}
          onClick={addProductToWishlist}
        >
          Add to wishlist
        </button>
      );
    }
    return (
      <button
        className={`card-btn wishlistBtn`}
        onClick={deleteProductFromWishlist}
      >
        Remove from wishlist
      </button>
    );
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
      <Nav />
      {state.loading && <LoaderPage />}
      <div className="wrapper">
        <div className="product-image">
          <img src={img} alt="product" />
        </div>
        <div className="product-data">
          <h1 className="text-l mb-1">{name}</h1>
          <div>
            <span className="rating">4.4 &#9733; </span>
            <span className="text-gray">707 ratings | 144 reviews</span>
          </div>
          <p className="text-md">
            Price : <span className="text-danger">₹{price}</span>
            <span className="discount-price">₹{(price + price*0.2).toFixed(2)}</span>
          </p>
          <p>
            Delivery : <span className="text-primary">{delivery} </span>
          </p>
          <p className="text-gray text-bold">{stock}</p>
          {cartButton()}
          {wishlistButton()}
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
