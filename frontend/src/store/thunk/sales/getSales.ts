import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ISales } from "../../../models/sales";
import { getAllSalesAPI } from "../../../Services/sales";

export const getAllSales = createAsyncThunk<
  ISales[],
  string
>(
  "sales/getAllSales",
  async (batchName, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await getAllSalesAPI(batchName);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
