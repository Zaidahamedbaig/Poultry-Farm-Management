import { Router } from "express";
import { addSale, getAllSales } from "../controllers/sales/sales";

const salesRoutes = Router();

salesRoutes.post("/addSale", addSale);
salesRoutes.get("/getAllSales", getAllSales);

export default salesRoutes;
