import { createAsyncThunk } from "@reduxjs/toolkit";
import { PartnerDetail } from "../../../models/partner";
import axios from "axios";

export const getPartnerDetails = createAsyncThunk(
  "partner/fetchPartners",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<PartnerDetail[]>("/api/partners");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
