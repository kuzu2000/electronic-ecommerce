import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userRequest } from './requestMethod';
export const fetchCategories = createAsyncThunk('fetchCategories', async () => {
  const res = await userRequest.get('/category');
  return res.data;
});

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categories: [],
    isFetching: null,
    isError: false,
  },
  reducers: {
    LOADING: (state) => {
      state.isFetching = true;
      state.isError = false;
    },
    ERROR: (state) => {
      state.isError = true;
      state.isFetching = false;
    },
    createCategory: (state, action) => {
      state.categories.push(action.payload);
      state.isFetching = false;
    },
    deletecategory: (state, action) => {
      const { _id } = action.payload;
      const existingcategory = state.categories.find((category) => category._id === _id);
      if (existingcategory) {
        state.categories= state.categories.filter((category) => category._id !== _id);
      }
    },
    updatecategory: (state, action) => {
      state.categories= action.payload;
      state.isFetching = false;
    },
  },
  extraReducers: {
    [fetchCategories.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
    },
    [fetchCategories.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.categories= action.payload;
    },
    [fetchCategories.rejected]: (state) => {
      state.isFetching = false;
      state.isError = true;
    },
  },
});

export const { LOADING, ERROR, createCategory, deletecategory, updatecategory } =
  categorySlice.actions;
export default categorySlice.reducer;
