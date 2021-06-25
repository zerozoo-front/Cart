import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  checkCount: 0,
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
    setSecondsLoop: (state) => {
      state.secondsLoop = true;
    },
    setIsClickedCheckBox: (state) => {
      state.isClickedCheckBox = true;
    },
  },
  extraReducers: {},
});

export const { setCheckCounter, setSecondsLoop, setIsClickedCheckBox } =
  counterSlice.actions;
export const selectCheckCounter = (state) => state.counter.checkCount;
export const selectSecondsLoop = (state) => state.counter.secondsLoop;
export const selectIsClickedCheckBox = (state) =>
  state.counter.isClickedCheckBox;
export default counterSlice.reducer;
