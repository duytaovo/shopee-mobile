import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { ProductCartIProps, UUID_IProps } from "../../types/store";

export interface IProps {
  products: ProductCartIProps[] | [];
  isCheckAll: boolean;
}
const initialState: IProps = {
  products: [],
  isCheckAll: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    getProduct: (state, action: PayloadAction<UUID_IProps>) => {
      state.products.find((p: any) => p.uuid === action.payload.uuid);
    },

    // removeProduct: (state, action: PayloadAction<UUID_IProps>) => {
    //   state.products = state.products.filter(
    //     (p: any) => p.uuid !== action.payload.uuid
    //   );
    // },

    // addProduct: (state, action: PayloadAction<ProductCartIProps>) => {
    //   state.products = [...state.products, action.payload];
    // },

    // updateProduct: (state, action: PayloadAction<ProductCartIProps>) => {
    //   const newProducts = state.products.map((p) =>
    //     p.uuid === action.payload.uuid ? action.payload : p
    //   );
    //   state.products = newProducts;
    // },
  },
});

export const { getProduct } = cartSlice.actions;
export default cartSlice.reducer;
