import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    isFetching: null,
    isError: false,
  },
  reducers: {
    startLoading: (state) => {
      state.isFetching = true;
      state.isError = false;
    },
    showError: (state) => {
      state.isError = true;
      state.isFetching = false;
    },
    reviewAction: (state, action) => {
      state.products = action.payload;
      state.isFetching = false;
    },
    getProduct: (state, action) => {
      state.products = action.payload;
      state.isFetching = false;
    },
  },
});

export const { startLoading, showError, getProduct, reviewAction } =
  productSlice.actions;
export default productSlice.reducer;
