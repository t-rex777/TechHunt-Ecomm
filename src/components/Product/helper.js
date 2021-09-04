import { useEffect, useState } from "react";
import { useCart } from "../../cart-context/CartProvider";
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

export const useSortCategory = () => {
  const { state, dispatch } = useCart();
  const { products, category } = state;

  useEffect(() => {
    dispatch({ type: "FASTDELIVERY_OFF" });
    dispatch({ type: "INSTOCK_ON" });
    if (category === "Phone") {
      const filteredProducts = products.filter(
        (product) => product.category === "Phone"
      );
      dispatch({ type: "SET_FINALPRODUCTS", payload: filteredProducts });
      dispatch({ type: "SET_CATEGORYPRODUCTS", payload: filteredProducts });
    } else if (category === "Earphone") {
      const filteredProducts = products.filter(
        (product) => product.category === "Earphone"
      );
      dispatch({ type: "SET_CATEGORYPRODUCTS", payload: filteredProducts });
      dispatch({ type: "SET_FINALPRODUCTS", payload: filteredProducts });
    } else if (category === "TV") {
      const filteredProducts = products.filter(
        (product) => product.category === "TV"
      );
      dispatch({ type: "SET_CATEGORYPRODUCTS", payload: filteredProducts });
      dispatch({ type: "SET_FINALPRODUCTS", payload: filteredProducts });
    } else if (category === "Watch") {
      const filteredProducts = products.filter(
        (product) => product.category === "Watch"
      );
      dispatch({ type: "SET_CATEGORYPRODUCTS", payload: filteredProducts });
      dispatch({ type: "SET_FINALPRODUCTS", payload: filteredProducts });
    } else if (category === "Storage") {
      const filteredProducts = products.filter(
        (product) => product.category === "Storage"
      );
      dispatch({ type: "SET_CATEGORYPRODUCTS", payload: filteredProducts });
      dispatch({ type: "SET_FINALPRODUCTS", payload: filteredProducts });
    } else if (category === "All") {
      dispatch({ type: "SET_CATEGORYPRODUCTS", payload: products });
      dispatch({ type: "SET_FINALPRODUCTS", payload: products });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const brands = [
  { id: "oneplus", name: "OnePlus" },
  { id: "samsung", name: "Samsung" },
  { id: "apple", name: "Apple" },
  { id: "sony", name: "Sony" },
  { id: "mi", name: "Mi" },
  { id: "sandisk", name: "SanDisk" },
  { id: "strontium", name: "Strontium" },
  { id: "hp", name: "HP" },
  { id: "wd", name: "WD" },
  { id: "boat", name: "boAt" },
  { id: "noise", name: "Noise" },
];

export const useSortByBrand = () => {
  const { state, dispatch } = useCart();
  const { categoryProducts } = state;
  const [brand, setBrand] = useState([]);
  const handleBrandChange = (e) => {
    const { value } = e.target;

    if (brand.includes(value)) {
      const filteredBrand = brand.filter((item) => item !== value);
      setBrand(filteredBrand);
    } else {
      setBrand((prevValue) => {
        return [...prevValue, value];
      });
    }
  };
  useEffect(() => {
    if (brand.length === 0) {
      dispatch({
        type: "SET_FINALPRODUCTS",
        payload: categoryProducts,
      });
    } else {
      const filteredFinalProducts = categoryProducts.filter((product) =>
        product.name.split(" ").some((pName) => brand.includes(pName))
      );
      dispatch({
        type: "SET_FINALPRODUCTS",
        payload: filteredFinalProducts,
      });
    }
  }, [brand]);

  return [brand, setBrand, handleBrandChange];
};


