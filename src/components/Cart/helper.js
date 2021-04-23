import { API } from "./../../API";
export const getCartItems = () => {
  return fetch(`${API}/cart`, {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const addCartItem = (cart) => {
  return fetch(`${API}/cart`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body : cart
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const updateCartItem = (cartItemId,updatedValue) => {
return fetch(`${API}/cart/${cartItemId}`,{
  method : "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  body : updatedValue
}).then(res=>res.json())
.catch(err=>console.log(err))
}

export const deleteCartItem = (cartId) => {
  return fetch(`${API}/cart/${cartId}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
