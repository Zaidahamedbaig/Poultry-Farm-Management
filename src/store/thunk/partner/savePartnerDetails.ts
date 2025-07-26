import { createAsyncThunk } from "@reduxjs/toolkit";
import { BasePartnerDetail } from "../../../models/partner";
import axios from "axios";

export const savePartnerDetails = createAsyncThunk(
  "partner/savePartners",
  async (data: BasePartnerDetail, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/partner/add",
        data
      );
      console.log(response);
      //   return fulfillWithValue(data);
    } catch (error: any) {
      console.log(error);
      //   return rejectWithValue(error.message);
    }
  }
);
