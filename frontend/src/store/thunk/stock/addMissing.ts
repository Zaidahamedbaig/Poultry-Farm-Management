import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IMissing } from "../../../models/stock";

export const addMissing = createAsyncThunk(
  "stock/addMissing",
  async (data: IMissing, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await axios.put(
        "http://localhost:5000/api/stock/addMissing",
        data
      );
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);
