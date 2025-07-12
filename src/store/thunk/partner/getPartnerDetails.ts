import { createAsyncThunk } from "@reduxjs/toolkit";
import { PartnerDetail } from "../../../models/partner";
import axios from "axios";

export const getPartnerDetails = createAsyncThunk(
  "partner/fetchPartners",
  async (_, { rejectWithValue,fulfillWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/partner/details"
      );
      const data: PartnerDetail[] = response.data.data
      return fulfillWithValue(data);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
