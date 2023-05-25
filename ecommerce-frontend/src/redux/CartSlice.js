import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
    total: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.cart.find(
        (item) => item._id === action.payload._id
      );
      if (itemInCart) {
        if(itemInCart.qty < itemInCart.quantity)
        {
          itemInCart.quantity++;
        }
      } else {
        state.cart.push({ ...action.payload });
      }
    },
    clearCart: (state) => {
      state.cart = [];
      state.total = null
    },
    removeItem: (state, action) => {
      const removeItem = state.cart.filter(
        (item) => item._id !== action.payload
      );
      state.cart = removeItem;
    },
    increase: (state, action) => {
      const item = state.cart.find((item) => item._id === action.payload);
      item.quantity++;
    },
    decrease: (state, action) => {
      const item = state.cart.find((item) => item._id === action.payload);
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
    calculateTotals: (state) => {
      let total = 0;
      state.cart.forEach((item) => {
        total += item.quantity * item.final_price;
      });
      state.total = total;
    },
  },
});

export const {
  addToCart,
  increase,
  decrease,
  removeItem,
  calculateTotals,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
