import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    products: null,
    address: null,
    user: null,
    userId: null,
    city: null,
    country: null,
    postalCode: null,
    tax: null,
    amount: null,
    totalPrice: null,
    shippingFee: null,
    loading: null,
    error: false,
  },
  reducers: {
    isLoading: (state) => {
      state.loading = true;
      state.error = false;
    },
    isError: (state) => {
      state.loading = false;
      state.error = true;
    },
    addOrder: (state, action) => {
      state.products = action.payload;
      state.loading = false;
    },
    getOrder: (state, action) => {
      state.products = action.payload
      state.loading = false
    },
    updateOrder: (state, action) => {
      state.products = action.payload
      state.loading = false
    },
    clearOrder: (state) => {
      state.products = null;
    },
  },
});

export const { addOrder, isLoading, isError, clearOrder, getOrder,  updateOrder } = orderSlice.actions;
export default orderSlice.reducer;
