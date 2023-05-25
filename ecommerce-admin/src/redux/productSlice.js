import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { publicRequest } from './requestMethod';
export const fetchProducts = createAsyncThunk('fetchProducts', async () => {
  const res = await publicRequest.get('/products');
  return res.data.products;
});

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
    createProduct: (state, action) => {
      state.products.push(action.payload);
      state.isFetching = false;
    },
    deleteProduct: (state, action) => {
      const { _id } = action.payload;
      const existingProduct = state.products.find(
        (product) => product._id === _id
      );
      if (existingProduct) {
        state.products = state.products.filter(
          (product) => product._id !== _id
        );
      }
    },
    updateProduct: (state, action) => {
      state.isFetching = false;
      const { _id, product } = action.payload;
      state.products[
        state.products.findIndex((product) => product._id === _id)
      ] = product;    
    },
  },
  extraReducers: {
    [fetchProducts.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.products = action.payload;
    },
    [fetchProducts.rejected]: (state) => {
      state.isFetching = false;
      state.isError = true;
    },
  },
});

export const {
  startLoading,
  showError,
  createProduct,
  deleteProduct,
  updateProduct,
} = productSlice.actions;
export default productSlice.reducer;
