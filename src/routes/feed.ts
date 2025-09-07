import { Router } from "express";
import { addFeedStock, getAllFeedStock } from "../controllers/feed/feed";

const feedRoutes = Router();
feedRoutes.post("/addFeedStock", addFeedStock);
feedRoutes.get("/getAllFeedStock", getAllFeedStock);

export default feedRoutes;
