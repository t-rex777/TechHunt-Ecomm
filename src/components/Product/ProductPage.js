import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../../cart-context/CartProvider";
import Nav from "./../../Nav/Nav";
import { getProductById } from "./helper";
import LoaderPage from "./../LoaderPage/LoaderPage";
import "./product.css";
import CartBtn from "./../Buttons/CartBtn";
import WishlistTextBtn from "../Buttons/WishlistTextBtn";

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
  const isInWishlist = () => state.wishlist.find((item) => item.name === name);

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
            <span className="discount-price">
              ₹{(price + price * 0.2).toFixed(2)}
            </span>
          </p>
          <p>
            Delivery : <span className="text-primary">{delivery} </span>
          </p>
          <p className="text-gray text-bold">{stock}</p>
          <span style={{width:"200px"}}>
            <CartBtn item={{ _id, stock }} isInCart={isInCart()} />
            <WishlistTextBtn item={{ _id }} isInWishlist={isInWishlist()} />
          </span>

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
