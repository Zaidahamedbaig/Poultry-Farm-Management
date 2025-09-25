import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Imortality } from "../../../models/stock";

export const addMortality = createAsyncThunk(
  "stock/addMortality",
  async (data: Imortality, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await axios.put(
        "http://localhost:5000/api/stock/addMortality",
        data
      );
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);
