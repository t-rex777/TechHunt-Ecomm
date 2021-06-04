import { techHuntAPI } from "../../utils";

export const getCartItems = async () => {
  try {
    const response = await techHuntAPI.get("/cart");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const addCartItem = async (cartItemId) => {
  try {
    const response = await techHuntAPI.post(`/cart/create/${cartItemId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateCartItem = async (cartItemId, updatedValue) => {
  try {
    const response = await techHuntAPI.post(`/cart/update/${cartItemId}`, {
      ...updatedValue,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteCartItem = async (cartItemId) => {
  try {
    const response = await techHuntAPI.post(`cart/delete/${cartItemId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
