import { reducerFunction } from "./CartReducers";
describe("Test cartReducer", () => {
  //test 1
  test("should set user data", () => {
    const state = {
      user: {},
    };
    const action = {
      type: "SET_USER",
      payload: {
        email: "admin@gmail.com",
        password: "admin@gmail.com",
        re_password: "admin@gmail.com",
      },
    };
    const reducedState = reducerFunction(state, action);

    expect(reducedState).toEqual({
      user: {
        email: "admin@gmail.com",
        password: "admin@gmail.com",
        re_password: "admin@gmail.com",
      },
    });
  });

  //test 2
  test("should sign out", () => {
    const state = {
      user: {
        _id: "60dec9143fd3ba2438cecaf8",
        email: "admin@gmail.com",
        name: "Admin",
        cart: [{ item: "60ded6595fd2493708bc19bc", quantity: 1 }],
        wishlist: [{ item: "60ded6595fd2493708bc19bc", quantity: 1 }],
      },
    };
    const action = {
      type: "SIGN_OUT",
    };
    const reducedState = reducerFunction(state, action);
    expect(reducedState).toEqual({
      user: {
        cart: [],
        wishlist: [],
      },
      cart: [],
      wishlist: [],
    });
  });

  //test 3
  test("should set products", () => {
    const state = {
      products: [],
    };
    const action = {
      type: "SET_PRODUCTS",
      payload: [
        { _id: "60ded6595fd2493708bc19bc" },
        { _id: "60ded6595fd2493708bc19bd" },
      ],
    };
    const reducedState = reducerFunction(state, action);
    expect(reducedState).toEqual({
      products: [
        { _id: "60ded6595fd2493708bc19bc" },
        { _id: "60ded6595fd2493708bc19bd" },
      ],
    });
  });

  //test 4
  test("should set cart items", () => {
    const state = {
      cart: [],
    };
    const action = {
      type: "SET_CART",
      payload: [
        { item: "60ded6595fd2493708bc19bc", quantity: 1 },
        { item: "60ded6595fd2493708bc19bd", quantity: 3 },
      ],
    };
    const reducedState = reducerFunction(state, action);
    expect(reducedState).toEqual({
      cart: [
        { item: "60ded6595fd2493708bc19bc", quantity: 1 },
        { item: "60ded6595fd2493708bc19bd", quantity: 3 },
      ],
    });
  });

  //test 5
  test("Increments quantity of the product in cart", () => {
    const state = {
      cart: [
        { item: { _id: "60ded6595fd2493708bc19bc" }, quantity: 1 },
        { item: { _id: "60ded6595fd2493708bc19bd" }, quantity: 3 },
      ],
    };
    const action = {
      type: "INCREMENT_QNT",
      payload: "60ded6595fd2493708bc19bd",
    };
    const reducedState = reducerFunction(state, action);
    expect(reducedState).toEqual({
      cart: [
        { item: { _id: "60ded6595fd2493708bc19bc" }, quantity: 1 },
        { item: { _id: "60ded6595fd2493708bc19bd" }, quantity: 4 },
      ],
    });
  });

  //test 6
  test("delete item from the cart", () => {
    const state = {
      cart: [
        { item: { _id: "60ded6595fd2493708bc19bc" }, quantity: 1 },
        { item: { _id: "60ded6595fd2493708bc19bd" }, quantity: 3 },
      ],
    };
    const action = {
      type: "DELETE_FROM_CART",
      payload: "60ded6595fd2493708bc19bd",
    };
    const reducedState = reducerFunction(state, action);
    expect(reducedState).toEqual({
      cart: [{ item: { _id: "60ded6595fd2493708bc19bc" }, quantity: 1 }],
    });
  });

  //test 7
  test("sort products in ascending order according to price", () => {
    const state = {
      finalProducts: [
        { _id: "60ded6595fd2493708bc19bc", price: "25000" },
        { _id: "60ded6595fd2493708bc19bd", price: "3700" },
        { _id: "60ded6595fd2493708bc19bd", price: "2500" },
        { _id: "60ded6595fd2493708bc19bd", price: "37000" },
      ],
    };
    const action = {
      type: "SORT_ASC",
    };
    const reducedState = reducerFunction(state, action);
    expect(reducedState).toEqual({
      finalProducts: [
        { _id: "60ded6595fd2493708bc19bd", price: "2500" },
        { _id: "60ded6595fd2493708bc19bd", price: "3700" },
        { _id: "60ded6595fd2493708bc19bc", price: "25000" },
        { _id: "60ded6595fd2493708bc19bd", price: "37000" },
      ],
    });
  });

  //test 8
  test("toggle fast delivery filter", () => {
    const reducedState = reducerFunction(
      {
        fastDelivery: false,
      },
      {
        type: "FILTER_DELIVERY",
      }
    );
    expect(reducedState).toEqual({ fastDelivery: true });
  });

  //test 9
  test("calculate price details in the cart", () => {
    const state = {
      priceDetails: {
        price: 0,
        discount: 0,
        deliveryCharges: 0,
        totalAmount: 0,
      },
    };
    const action = {
      type: "PRICE_DETAILS",
      payload: {
        initialPrice: 10000,
        isFastDelivery: 2,
        finalPrice: 9000,
      },
    };
    const reducedState = reducerFunction(state, action);
    expect(reducedState).toEqual({
      priceDetails: {
        price: 10000,
        discount: 1000,
        deliveryCharges: 200,
        totalAmount: 9000,
      },
    });
  });

  //test 10
  test("toggle loader", () => {
    const reducedState = reducerFunction(
      {
        loading: false,
      },
      {
        type: "LOADING",
        payload: true,
      }
    );
    expect(reducedState).toEqual({
      loading: true,
    });
  });
});
