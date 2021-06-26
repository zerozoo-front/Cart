import { createSlice } from '@reduxjs/toolkit';
import { cartLists, deliveryTypes } from '../data.js';

const initialState = {
  checkCount: 0,
  cartListCount: cartLists.length,
  secondsLoop: false,
  delivery: 0,
  deliveryWay: '',
  productList: [],
  productCount: [],
  isOrder: false,
};
export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setIsOrder: (state) => {
      state.isOrder = true;
    },
    setProductCount: (state, action) => {
      state.productCount = [...state.productCount, action.payload];
    },
    setProductList: (state, action) => {
      state.productList = action.payload;
    },
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
      switch (action.payload) {
        case deliveryTypes[0].name:
          state.delivery = deliveryTypes[0].delivery_price;
          state.deliveryWay = deliveryTypes[0].name;
          return;
        case deliveryTypes[1].name:
          state.delivery = deliveryTypes[1].delivery_price;
          state.deliveryWay = deliveryTypes[1].name;
          return;
        case deliveryTypes[2].name:
          state.delivery = deliveryTypes[2].delivery_price;
          state.deliveryWay = deliveryTypes[2].name;
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
  setDeliveryWay,
  setProductList,
  setProductCount,
  setIsOrder,
} = counterSlice.actions;
export const selectCheckCounter = (state) => state.counter.checkCount;
export const selectCartListCount = (state) => state.counter.cartListCount;
export const selectSecondsLoop = (state) => state.counter.secondsLoop;
export const selectDelivery = (state) => state.counter.delivery;
export const selectDeliveryWay = (state) => state.counter.deliveryWay;
export const selectProductList = (state) => state.counter.productList;
export const selectProductCount = (state) => state.counter.productCount;
export const selectIsOrder = (state) => state.counter.isOrder;
export default counterSlice.reducer;
