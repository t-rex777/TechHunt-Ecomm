import { API } from "./../../API";
export const getWishlistItems = () => {
  return fetch(`${API}/wishlist`, {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const addWishlistItem = (wishlist) => {
  return fetch(`${API}/wishlist`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body : wishlist
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const updateWishlistItem = (wishlistItemId,updatedValue) => {
return fetch(`${API}/wishlist/${wishlistItemId}`,{
  method : "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  body : updatedValue
}).then(res=>res.json())
.catch(err=>console.log(err))
}

export const deleteWishlistItem = (wishlistId) => {
  return fetch(`${API}/wishlist/${wishlistId}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
