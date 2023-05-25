import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userRequest } from './requestMethod';
export const fetchCoupons = createAsyncThunk('fetchCoupons', async () => {
  const res = await userRequest.get('/coupon');
  return res.data;
});

const couponSlice = createSlice({
  name: 'coupon',
  initialState: {
    coupons: [],
    isFetching: null,
    isError: false,
  },
  reducers: {
    loading: (state) => {
      state.isFetching = true;
      state.isError = false;
    },
    error: (state) => {
      state.isError = true;
      state.isFetching = false;
    },
    createCoupon: (state, action) => {
      state.coupons.push(action.payload);
      state.isFetching = false;
    },
    deleteCoupon: (state, action) => {
      const { _id } = action.payload;
      const existingCoupon = state.coupons.find((coupon) => coupon._id === _id);
      if (existingCoupon) {
        state.coupons = state.coupons.filter((coupon) => coupon._id !== _id);
      }
    },
    updateCoupon: (state, action) => {
      state.coupons = action.payload;
      state.isFetching = false;
    },
  },
  extraReducers: {
    [fetchCoupons.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
    },
    [fetchCoupons.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.coupons = action.payload;
    },
    [fetchCoupons.rejected]: (state) => {
      state.isFetching = false;
      state.isError = true;
    },
  },
});

export const { loading, error, createCoupon, deleteCoupon, updateCoupon } =
  couponSlice.actions;
export default couponSlice.reducer;
