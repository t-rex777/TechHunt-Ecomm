import { API } from "./../../API";
export const getCartItems = () => {
  return fetch(`${API}/cart`, {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
