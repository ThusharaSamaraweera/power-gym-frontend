import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../models";

interface IGlobalState {
  user: IUser | null;
}

const initialState = {
  user: null,
} satisfies IGlobalState as IGlobalState;

const globalSlice = createSlice({
  name: "global",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    }
  },
});

export default globalSlice.reducer;

//Actions

export const { setUser } = globalSlice.actions;
