import { createSlice } from "@reduxjs/toolkit";
import { IBodyHealthInfo, IUser, IUserWithBodyHealthInfo } from "../../models";

interface IGlobalState {
  user: IUser | null;
  requestedPlans: IBodyHealthInfo[] | null;
  allUsers: IUserWithBodyHealthInfo[] | null;
}

const initialState = {
  user: null,
  requestedPlans: null,
  allUsers: null
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
    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
    }
  },
});

export default globalSlice.reducer;

//Actions

export const { setUser, setRequestedPlans, setAllUsers } = globalSlice.actions;
