import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { furnitureApi } from "./rtk";

import { furnitureSlice } from "./slice";
import { thunk } from "redux-thunk";

export const rootReducer = combineReducers({
  furnitureToolkit: furnitureSlice.reducer,
});

const store = configureStore({
  reducer: {
    rootReducer,
    [furnitureApi.reducerPath]: furnitureApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(furnitureApi.middleware),
  thunk,
});
export default store;
