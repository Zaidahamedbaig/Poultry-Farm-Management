import { createAsyncThunk } from "@reduxjs/toolkit";
import { ISales } from "../../../models/sales";
import axios from "axios";
import { getAllSales } from "./getSales";

export const addSale = createAsyncThunk(
  "sales/addSales",
  async (data: ISales, { fulfillWithValue, rejectWithValue,dispatch }) => {
    try {
       await axios.post(
        "http://localhost:5000/api/sales/addSale",
        data
      );
      dispatch(getAllSales(data.batchName))
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
