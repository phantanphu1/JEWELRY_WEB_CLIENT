import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listImage: [],
  productById: {},
  payload: {
    pageNumber: 1,
    limit: 6,
  },
};

const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    objectByIdProduct: (state, { payload }) => {
      state.productById = payload;
    },
    clearByIdProduct: (state, { payload }) => {
      state.productById = {};
    },
    changePayload: (state, { payload }) => {
      state.payload = payload;
    },
    resetPayload: (state, { payload }) => {
      state.payload = initialState.payload;
    },
    setListImage: (state, { payload }) => {
      state.listImage = payload;
    },
  },
});

export const {
  objectByIdProduct,
  clearByIdProduct,
  changePayload,
  resetPayload,
  setListImage,
} = ProductSlice.actions;

export default ProductSlice.reducer;
