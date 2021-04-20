import { API } from './../../API';

export const getProducts = () => {
  return fetch(`${API}/product`, {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
