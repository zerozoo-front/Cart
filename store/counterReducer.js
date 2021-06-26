import { createSlice } from '@reduxjs/toolkit';
import { cartLists, deliveryTypes } from '../data.js';

const initialState = {
  checkCount: 0,
  cartListCount: cartLists.length,
  secondsLoop: false,
  delivery: 0,
};
export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setCheckCounter: (state, action) => {
      state.checkCount = action.payload;
    },
    setCartListCount: (state, action) => {
      state.cartListCount = action.payload;
    },
    setSecondsLoop: (state) => {
      state.secondsLoop = true;
    },
    setDelivery: (state, action) => {
      let payload = parseInt(action.payload) + 1;

      switch (payload) {
        case deliveryTypes[0].id:
          state.delivery = deliveryTypes[0].delivery_price;
          return;
        case deliveryTypes[1].id:
          state.delivery = deliveryTypes[1].delivery_price;
          return;
        case deliveryTypes[2].id:
          state.delivery = deliveryTypes[2].delivery_price;
          return;
        default:
          state.delivery = 3000;
          return;
      }
    },
  },
  extraReducers: {},
});

export const {
  setCheckCounter,
  setCartListCount,
  setSecondsLoop,
  setDelivery,
} = counterSlice.actions;
export const selectCheckCounter = (state) => state.counter.checkCount;
export const selectCartListCount = (state) => state.counter.cartListCount;
export const selectSecondsLoop = (state) => state.counter.secondsLoop;
export const selectDelivery = (state) => state.counter.delivery;
export default counterSlice.reducer;
