import { techHuntAPI } from "../../utils";

export const getProducts = async () => {
  try {
    const response = await techHuntAPI.get("/product");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
