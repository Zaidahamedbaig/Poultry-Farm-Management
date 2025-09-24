import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISales, SalesState } from "../../../models/sales";
import { getAllSales } from "../../thunk/sales/getSales";
import { RootState, useAppSelector } from "../../store";

const initialState: SalesState = {
  salesDetails: [],
  loading: false,
  error: "",
};

export const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllSales.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(
        getAllSales.fulfilled,
        (state, action: PayloadAction<ISales[]>) => {
          state.loading = false;
          state.salesDetails = action.payload;
        }
      )
      .addCase(getAllSales.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectSalesDetails = (state: RootState) =>
  state.sales.salesDetails;

export default salesSlice.reducer;
