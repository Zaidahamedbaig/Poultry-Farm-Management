import { Router } from "express";
import {
  addPartner,
  deletePartner,
  editPartnerDetails,
  getAllPartners,
} from "../controllers/partner/partner";

const partnerRoutes = Router();

partnerRoutes.post("/add", addPartner);
partnerRoutes.get("/all", getAllPartners);
partnerRoutes.delete("/delete/:id", deletePartner);
partnerRoutes.put("/edit/:id", editPartnerDetails);

export default partnerRoutes;
