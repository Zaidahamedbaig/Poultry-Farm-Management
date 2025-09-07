import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IFeed } from "../../../models/feed";

export const addFeedStock = createAsyncThunk(
  "feed/addFeed",
  async (data: IFeed, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/feed/addFeedStock",
        data
      );

      return fulfillWithValue(data);
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);
