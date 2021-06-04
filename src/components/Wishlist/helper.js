import { techHuntAPI } from "../../utils";

export const getWishlistItems = async () => {
  try {
    const response = await techHuntAPI.get("/wishlist");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const addWishlistItem = async (wishlistId) => {
  try {
    const response = await techHuntAPI.post(`wishlist/create/${wishlistId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteWishlistItem = async (wishlistId) => {
  try {
    const response = await techHuntAPI.post(`/wishlist/delete/${wishlistId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
