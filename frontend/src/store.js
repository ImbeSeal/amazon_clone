import { configureStore } from "@reduxjs/toolkit";
import {
  productDeleteReducer,
  productDetailsReducer,
  productListReducer,
  productSaveReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
  userSigninReducer,
  userRegisterReducer,
} from "./reducers/userReducers";
import Cookies from "js-cookie";
//Cookies.getJSON does work anymore

const cartItems = localStorage.getItem("cartItems")
  ? JSON.parse(Cookies.get("cartItems"))
  : [];
const initialState = { cart: { cartItems, shipping: {}, payment: {} } };

const store = configureStore({
  reducer: {
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    productSave: productSaveReducer,
    productDelete: productDeleteReducer,
  },
  preloadedState: initialState,
});

export default store;

// import { createStore, combineReducers, applyMiddleware, compose } from "redux";
// import { thunk } from "redux-thunk";
// import { productListReducer } from "./reducers/productReducers";

// const initialState = {};
// const reducer = combineReducers({
//   productList: productListReducer,
// });
// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSER__ || compose;
// const store = createStore(
//   reducer,
//   initialState,
//   composeEnhancer(applyMiddleware(thunk))
// );

// export default store;
