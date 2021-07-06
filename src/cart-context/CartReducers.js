export const initialState = {
  user: {
    cart: [],
    wishlist: [],
  },
  products: [],
  selectedProduct: {},
  finalProducts: [],
  cart: [],
  wishlist: [],
  category: "All",
  stock: true,
  fastDelivery: false,
  loading: false,
  priceDetails: {
    price: 0,
    discount: 0,
    deliveryCharges: 0,
    totalAmount: 0,
  },
};

export const reducerFunction = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SIGN_OUT": {
      localStorage.removeItem("_rtoken");
      return {
        ...state,
        user: {
          cart: [],
          wishlist: [],
        },
        cart: [],
        wishlist: [],
      };
    }
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };

    case "SET_SELECTED_PRODUCT":
      return { ...state, selectedProduct: action.payload };

    case "SET_FINALPRODUCTS":
      return { ...state, finalProducts: action.payload };

    case "SET_CART":
      return { ...state, cart: action.payload };

     case "INCREMENT_QNT":
      return {
        ...state,
        cart: state.cart.map((data) => {
          if (data.item._id === action.payload) {
            return { ...data, quantity: data.quantity + 1 };
          }
          return data;
        }),
      };

    case "DECREMENT_QNT":
      return {
        ...state,
        cart: state.cart.map((data) => {
          if (data.item._id === action.payload) {
            return { ...data, quantity: data.quantity - 1 };
          }
          return data;
        }),
      };

    case "DELETE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((data) => data.item._id !== action.payload),
      };

    case "SET_WISHLIST":
      return { ...state, wishlist: action.payload };

    case "SET_CATEGORY":
      return { ...state, category: action.payload };

    case "SORT_ASC":
      return {
        ...state,
        finalProducts: state.finalProducts.sort(
          (a, b) => parseFloat(a.price) - parseFloat(b.price)
        ),
      };

    case "SORT_DES":
      return {
        ...state,
        finalProducts: state.finalProducts.sort(
          (a, b) => parseFloat(b.price) - parseFloat(a.price)
        ),
      };

    case "FILTER_DELIVERY":
      return {
        ...state,
        fastDelivery: !state.fastDelivery,
      };

    case "FILTER_STOCK":
      return {
        ...state,
        stock: !state.stock,
      };

    case "FASTDELIVERY_OFF":
      return { ...state, fastDelivery: false };

    case "INSTOCK_ON":
      return { ...state, stock: true };

    case "PRICE_DETAILS":
      return {
        ...state,
        priceDetails: {
          price: action.payload.initialPrice,
          deliveryCharges: action.payload.isFastDelivery * 100,
          discount: Math.floor(action.payload.initialPrice * 0.1),
          totalAmount: action.payload.finalPrice,
        },
      };

    case "LOADING":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};
