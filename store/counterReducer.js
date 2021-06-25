import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  checkCount: 0,
  secondsLoop: false,
};
export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setCheckCounter: (state, action) => {
      state.checkCount = action.payload;
    },
    setSecondsLoop: (state) => {
      state.secondsLoop = true;
    },
  },
  extraReducers: {},
});

export const { setCheckCounter } = counterSlice.actions;
export const selectCheckCounter = (state) => state.counter.checkCount;
export default counterSlice.reducer;

export const { setSecondsLoop } = counterSlice.actions;
export const selectSecondsLoop = (state) => state.counter.secondsLoop;
