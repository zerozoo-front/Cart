import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalCount: 1,
};
export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setTotalCounter: (state, action) => {
      state.totalCount = action.payload;
    },
  },
  extraReducers: {},
});

export const { setTotalCounter } = counterSlice.actions;
export const selectTotalCounter = (state) => state.counter.totalCount;

export default counterSlice.reducer;
