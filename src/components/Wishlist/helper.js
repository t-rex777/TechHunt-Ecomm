import { techHuntAPI } from "../../utils";

export const getWishlistItems = async () => {
  try {
    const response = await techHuntAPI.get("/wishlist");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const addWishlistItem = async (wishlist) => {
  try {
    const response = await techHuntAPI.post("wishlist", {
      ...wishlist,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateWishlistItem = async (wishlistItemId, updatedValue) => {
  try {
    const response = await techHuntAPI.post(`/wishlist/${wishlistItemId}`, {
      ...updatedValue,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteWishlistItem = async (wishlistId) => {
  try {
    const response = await techHuntAPI.delete(`/wishlist/${wishlistId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
