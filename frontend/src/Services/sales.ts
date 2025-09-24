import axios, { AxiosResponse } from "axios";
import { ISales } from "../models/sales";

export const getAllSalesAPI = (batchName: string):Promise<AxiosResponse<ISales[], any>> => {
  return axios.get("http://localhost:5000/api/sales/getAllSales", {
    params: { batchName: batchName },
  });
};
