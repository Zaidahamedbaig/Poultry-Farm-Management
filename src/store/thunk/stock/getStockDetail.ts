import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IStockDetails } from "../../../models/stock";

export const getStock = createAsyncThunk(
  "stock/fetchStock",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/stock/getStock"
      );
      
      const data :IStockDetails[] =  response.data.data;           
      return  fulfillWithValue(data);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
