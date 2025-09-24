import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IStockDetails } from "../../../models/stock";

export const addStock = createAsyncThunk(
  "stock/addStock",
  async (data: IStockDetails, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/stock/add",
        data
      );
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
