import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BasePartnerDetail } from "../../../models/partner";

export const editPartnerDetails = createAsyncThunk(
  "partner/deletePartner",
  async (data : BasePartnerDetail) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/partner/edit/${data["_id"]}`,data
      );
      console.log(response);
    } catch (error: any) {
      console.log(error);
    }
  }
);
