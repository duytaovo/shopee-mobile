import { configureStore } from "@reduxjs/toolkit";
import queryReducer from "./slice/querySlice";

export const store = configureStore({
  reducer: {
    query: queryReducer,
  },
  devTools: true, // Enable Redux DevTools extension
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
