import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IStockDetails, StockState } from "../../../models/stock";
import { getStock } from "../../thunk/stock/getStockDetail";
import { RootState } from "../../store";

const initialState: StockState = {
  stockDetails: [],
  loading: false,
  error: "",
};

export const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStock.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(
        getStock.fulfilled,
        (state, action: PayloadAction<IStockDetails[]>) => {
          state.loading = false;
          state.stockDetails = action.payload;
        }
      )
      .addCase(getStock.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectStock = (state: RootState) => state.stock.stockDetails;

export default stockSlice.reducer;
