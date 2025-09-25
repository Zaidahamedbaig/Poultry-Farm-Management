import { Router } from "express";
import {
  addStock,
  addMoratlity,
  getAllStock,
  addMissing,
  addConsumedFeed,
} from "../controllers/stock/stock";

const stockRoutes = Router();

stockRoutes.post("/add", addStock);
stockRoutes.put("/addMortality", addMoratlity);
stockRoutes.get("/getStock", getAllStock);
stockRoutes.put("/addMissing", addMissing);
stockRoutes.put("/addConsumedFeed", addConsumedFeed);

export default stockRoutes;
