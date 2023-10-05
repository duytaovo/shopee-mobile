import { configureStore } from "@reduxjs/toolkit";
import queryReducer from "./slice/querySlice";
import cartReducer from "./slice/cartSlice";

export const store = configureStore({
  reducer: {
    query: queryReducer,
    cart: cartReducer,
  },
  devTools: true, // Enable Redux DevTools extension
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
