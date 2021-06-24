import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  count: 0,
};
export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setCounter: (state, action) => {
      state.count = action.payload;
    },
  },
  extraReducers: {},
});

export const { setCounter } = counterSlice.actions;
export const selectCounter = (state) => state.counter.count;
export default counterSlice.reducer;
