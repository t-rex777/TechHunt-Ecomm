import { techHuntAPI } from "../../utils";

export const getCartItems = async () => {
  try {
    const response = await techHuntAPI.get("/cart");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const addCartItem = async (cart) => {
  try {
    const response = await techHuntAPI.post("/cart", {
      ...cart,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateCartItem = async (cartItemId, updatedValue) => {
  try {
    const response = await techHuntAPI.post(`/cart/${cartItemId}`, {
      ...updatedValue,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteCartItem = async (cartId) => {
  try {
    const response = await techHuntAPI.delete(`cart/${cartId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
