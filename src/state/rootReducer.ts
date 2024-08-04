import { combineReducers } from "@reduxjs/toolkit";
import globalSlice from "./global/globalSlice";

const rootReducer = combineReducers({
  global: globalSlice,
});

export default rootReducer;
