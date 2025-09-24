import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deletePartner = createAsyncThunk(
  "partner/deletePartner",
  async (id: string) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/partner/delete/${id}`
      );
      console.log(response);
    } catch (error: any) {
      console.log(error);
    }
  }
);
