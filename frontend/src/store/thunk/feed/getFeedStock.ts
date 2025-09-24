import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IFeed } from "../../../models/feed";

export const getAllFeed = createAsyncThunk(
  "feed/fetchFeed",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/feed/getAllFeedStock"
      );
      const data: IFeed[] = response.data.data;
      return fulfillWithValue(data);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
