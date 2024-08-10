import { createSlice } from "@reduxjs/toolkit";
import { IBodyHealthInfo, IUser } from "../../models";

interface IGlobalState {
  user: IUser | null;
  requestedPlans: IBodyHealthInfo[] | null;
}

const initialState = {
  user: null,
  requestedPlans: null,
} satisfies IGlobalState as IGlobalState;

const globalSlice = createSlice({
  name: "global",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setRequestedPlans: (state, action) => {
      state.requestedPlans = action.payload;
    },
  },
});

export default globalSlice.reducer;

//Actions

export const { setUser, setRequestedPlans } = globalSlice.actions;
