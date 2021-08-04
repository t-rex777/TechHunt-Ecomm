import { techHuntAPI } from "../../utils";

export const getProducts = async () => {
  try {
    const response = await techHuntAPI.get("/product");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getProductById = async (productId) => {
  try {
    const response = await techHuntAPI.get(`/product/${productId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};


