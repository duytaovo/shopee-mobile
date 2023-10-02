import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface IProps {
  name: string;
}
const initialState: IProps = {
  name: "",
};

export const querySlice = createSlice({
  name: "query",
  initialState,
  reducers: {
    setQueries: (state, action: PayloadAction<IProps>) => {
      state.name = action.payload.name;
    },
  },
});

export const { setQueries } = querySlice.actions;
export default querySlice.reducer;
