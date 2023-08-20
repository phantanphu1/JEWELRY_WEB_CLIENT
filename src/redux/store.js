import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "./product/productSlice"
const store = configureStore({
  reducer: {
    Product:ProductReducer,
  },
});

export default store;
