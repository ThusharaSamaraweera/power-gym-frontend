import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
};

const globalSlice = createSlice({
  name: "global",
  initialState: initialState,
  reducers: {},
});

export default globalSlice.reducer;

//Actions

// export const { } = globalSlice.actions;
