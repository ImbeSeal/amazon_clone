import axios from "axios";
import Cookies from "js-cookie";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT,
  CART_SAVE_SHIPPING,
} from "../constants/cartConstants";

export const addToCart = (productId, qty) => {
  return async function (dispatch, getState) {
    try {
      // THE TYPE WASNT GIVEN
      const { data } = await axios.get("/api/products/" + productId);
      dispatch({
        type: CART_ADD_ITEM,
        payload: {
          product: data._id,
          name: data.name,
          image: data.image,
          price: data.price,
          countInStock: data.countInStock,
          qty,
        },
      });

      const {
        cart: { cartItems },
      } = getState();
      Cookies.set("cartItems", JSON.stringify(cartItems), { expires: 7 });
    } catch (error) {}
  };
};

export const removeFromCart = (productId) => {
  return function (dispatch, getState) {
    dispatch({ type: CART_REMOVE_ITEM, payload: productId });

    const {
      cart: { cartItems },
    } = getState();
    Cookies.set("cartItems", JSON.stringify(cartItems), { expires: 7 });
  };
};
export const saveShipping = (data) => {
  return function (dispatch) {
    dispatch({ type: CART_SAVE_SHIPPING, payload: data });
  };
};
export const savePayment = (data) => {
  return function (dispatch) {
    dispatch({ type: CART_SAVE_PAYMENT, payload: data });
  };
};
