import React from "react";
import "./toast.css";
import { useCart } from "../../cart-context/CartProvider";
function Toast({ message, color }) {
  const { state } = useCart();

  return (
    <div className={`toast ${color}`} style={state.toastStyle}>
      <h3 className="text-center">{message}</h3>
    </div>
  );
}

export default Toast;
