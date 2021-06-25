import { createSlice } from '@reduxjs/toolkit';
import { cartLists } from '../data.js';

const initialState = {
  checkCount: 0,
  cartListCount: cartLists.length,
  secondsLoop: false,
  isClickedCheckBox: false,
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
    setIsClickedCheckBox: (state) => {
      state.isClickedCheckBox = true;
    },
  },
  extraReducers: {},
});

export const {
  setCheckCounter,
  setCartListCount,
  setSecondsLoop,
  setIsClickedCheckBox,
} = counterSlice.actions;
export const selectCheckCounter = (state) => state.counter.checkCount;
export const selectCartListCount = (state) => state.counter.cartListCount;
export const selectSecondsLoop = (state) => state.counter.secondsLoop;
export const selectIsClickedCheckBox = (state) =>
  state.counter.isClickedCheckBox;
export default counterSlice.reducer;
