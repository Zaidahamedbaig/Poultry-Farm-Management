import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IConsumedFeed } from "../../../models/stock";


export const addConsumedFeed = createAsyncThunk(
  "feed/addConsumedFeed",
  async (data: IConsumedFeed, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await axios.put(
        "http://localhost:5000/api/stock/addConsumedFeed",
        data
      );

      return fulfillWithValue(data);
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);
